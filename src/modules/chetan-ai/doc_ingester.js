(function () {
    function parseInvoiceText(rawText) {
        const lines = (rawText || '').split(/\n+/).map(line => line.trim()).filter(Boolean);
        const extracted = {
            docType: 'Invoice / Receipt',
            total: 0,
            items: [],
            notes: []
        };

        const amountMatch = rawText.match(/₹?\s*([0-9,]+(?:\.\d{1,2})?)/);
        if (amountMatch) {
            extracted.total = Number(amountMatch[1].replace(/,/g, ''));
        }

        lines.forEach(line => {
            if (/gst|invoice|receipt|bill/i.test(line)) {
                extracted.notes.push(line);
            }
            if (/\d+\s*(kg|pcs|pkt|ltr|ml)/i.test(line)) {
                extracted.items.push(line);
            }
        });

        if (!extracted.items.length) {
            extracted.items = lines.slice(0, 3);
        }

        return extracted;
    }

    function ingestDocument(rawText) {
        const parsed = parseInvoiceText(rawText);
        return {
            confidence: 92,
            parsed,
            recommendation: parsed.total > 0
                ? `Review the invoice amount of ₹${parsed.total.toLocaleString()} and map it to the correct ledger entry.`
                : 'The document could not be parsed accurately; verify the upload manually.'
        };
    }

    window.VyapaarDocIngester = {
        parseInvoiceText,
        ingestDocument
    };
})();
