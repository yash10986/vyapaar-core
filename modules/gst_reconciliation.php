<?php
class GSTReconciliationService
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
        $this->ensureTables();
    }

    private function ensureTables(): void
    {
        $this->pdo->exec("CREATE TABLE IF NOT EXISTS purchase_invoices (
            id INT AUTO_INCREMENT PRIMARY KEY,
            supplier_name VARCHAR(255) NOT NULL,
            gstin VARCHAR(20) NOT NULL,
            invoice_no VARCHAR(100) NOT NULL,
            invoice_amount DECIMAL(12,2) NOT NULL,
            tax_amount DECIMAL(12,2) NOT NULL,
            source VARCHAR(50) NOT NULL DEFAULT 'local',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE KEY uniq_invoice (invoice_no)
        )");
    }

    public function parseGstr2bFeed($payload): array
    {
        if (is_string($payload)) {
            $payload = json_decode($payload, true);
        }

        if (!is_array($payload)) {
            return [];
        }

        $records = [];
        $this->walkPayload($payload, $records);
        return $records;
    }

    public function reconcile($payload): array
    {
        $feedRecords = $this->parseGstr2bFeed($payload);
        $localRecords = $this->getLocalPurchaseRecords();
        $mismatches = [];
        $itcShortfall = 0.0;

        foreach ($feedRecords as $record) {
            $match = $this->findLocalMatch($record, $localRecords);
            if (!$match) {
                $mismatches[] = [
                    'invoice_no' => $record['invoice_no'],
                    'status' => 'missing_local_purchase_record',
                    'shortfall' => $record['tax_amount'],
                ];
                $itcShortfall += (float) $record['tax_amount'];
                continue;
            }

            $amountDifference = (float) $record['invoice_amount'] - (float) $match['invoice_amount'];
            $taxDifference = (float) $record['tax_amount'] - (float) $match['tax_amount'];
            $gstinMatches = strtoupper((string) ($record['gstin'] ?? '')) === strtoupper((string) ($match['gstin'] ?? ''));

            if (!$gstinMatches || abs($amountDifference) > 0.01 || abs($taxDifference) > 0.01) {
                $mismatches[] = [
                    'invoice_no' => $record['invoice_no'],
                    'status' => 'mismatch',
                    'feed_amount' => (float) $record['invoice_amount'],
                    'local_amount' => (float) $match['invoice_amount'],
                    'feed_tax' => (float) $record['tax_amount'],
                    'local_tax' => (float) $match['tax_amount'],
                    'shortfall' => max(0, $taxDifference),
                ];
                $itcShortfall += max(0, $taxDifference);
            }
        }

        return [
            'status' => empty($mismatches) ? 'clean' : 'mismatch_detected',
            'feed_records' => count($feedRecords),
            'local_records' => count($localRecords),
            'mismatches' => $mismatches,
            'itc_shortfall' => round($itcShortfall, 2),
            'generated_at' => date('c'),
        ];
    }

    public function getLocalPurchaseRecords(): array
    {
        $stmt = $this->pdo->query("SELECT invoice_no, supplier_name, gstin, invoice_amount, tax_amount FROM purchase_invoices ORDER BY created_at DESC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function saveLocalPurchaseRecord(array $record): void
    {
        $stmt = $this->pdo->prepare("INSERT INTO purchase_invoices (supplier_name, gstin, invoice_no, invoice_amount, tax_amount, source) VALUES (:supplier_name, :gstin, :invoice_no, :invoice_amount, :tax_amount, :source)
            ON DUPLICATE KEY UPDATE supplier_name = VALUES(supplier_name), gstin = VALUES(gstin), invoice_amount = VALUES(invoice_amount), tax_amount = VALUES(tax_amount), source = VALUES(source)");
        $stmt->execute([
            ':supplier_name' => $record['supplier_name'] ?? 'Unknown Supplier',
            ':gstin' => $record['gstin'] ?? '',
            ':invoice_no' => $record['invoice_no'] ?? '',
            ':invoice_amount' => (float) ($record['invoice_amount'] ?? 0),
            ':tax_amount' => (float) ($record['tax_amount'] ?? 0),
            ':source' => $record['source'] ?? 'local',
        ]);
    }

    private function walkPayload($value, array &$records, string $path = 'root'): void
    {
        if (is_array($value)) {
            if ($this->looksLikeInvoice($value)) {
                $record = $this->extractInvoiceRecord($value);
                if (!empty($record['invoice_no']) || !empty($record['gstin'])) {
                    $records[] = $record;
                }
            }

            foreach ($value as $key => $item) {
                $this->walkPayload($item, $records, $path . '.' . $key);
            }
        }
    }

    private function looksLikeInvoice(array $value): bool
    {
        $invoiceKeys = ['invoice_no', 'invoiceNo', 'invoiceNumber', 'invoiceno', 'inv_no', 'invoice_id', 'ctin', 'gstin'];
        foreach ($invoiceKeys as $key) {
            if (array_key_exists($key, $value)) {
                return true;
            }
        }
        return false;
    }

    private function extractInvoiceRecord(array $value): array
    {
        $invoiceNo = $this->readValue($value, ['invoice_no', 'invoiceNo', 'invoiceNumber', 'invoiceno', 'inv_no', 'invoice_id']);
        $gstin = $this->readValue($value, ['gstin', 'ctin']);
        $invoiceAmount = $this->readNumericValue($value, ['invoice_amount', 'total_amount', 'invoiceAmount', 'amount', 'totalAmount', 'taxable_value', 'taxableValue']);
        $taxAmount = $this->readNumericValue($value, ['tax_amount', 'taxAmount', 'igst', 'cgst', 'sgst', 'total_tax', 'totalTax']);

        if ($taxAmount <= 0) {
            $taxAmount = max(0, (float) $invoiceAmount * 0.18);
        }

        return [
            'invoice_no' => (string) $invoiceNo,
            'gstin' => (string) $gstin,
            'invoice_amount' => (float) $invoiceAmount,
            'tax_amount' => (float) $taxAmount,
        ];
    }

    private function readValue(array $value, array $keys)
    {
        foreach ($keys as $key) {
            if (isset($value[$key])) {
                return $value[$key];
            }
        }
        return '';
    }

    private function readNumericValue(array $value, array $keys): float
    {
        foreach ($keys as $key) {
            if (isset($value[$key])) {
                return (float) $value[$key];
            }
        }
        return 0.0;
    }

    private function findLocalMatch(array $record, array $localRecords): ?array
    {
        foreach ($localRecords as $row) {
            if ($row['invoice_no'] === $record['invoice_no']) {
                return $row;
            }
        }
        return null;
    }
}
