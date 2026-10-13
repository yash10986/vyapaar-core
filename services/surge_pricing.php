<?php
class SurgePricingService
{
    public function fetchMarketRates(): array
    {
        $url = 'https://api.coindesk.com/v1/bpi/currentprice/INR.json';
        $context = stream_context_create(['http' => ['timeout' => 5]]);
        $payload = @file_get_contents($url, false, $context);

        if ($payload === false) {
            return [];
        }

        $decoded = json_decode($payload, true);
        if (!is_array($decoded)) {
            return [];
        }

        $rate = $decoded['bpi']['INR']['rate_float'] ?? 0;
        return [
            'source' => 'coindesk',
            'rate' => (float) $rate,
            'currency' => 'INR',
        ];
    }

    public function recommendPrices(array $inventory, array $market): array
    {
        $recommendations = [];
        foreach ($inventory as $item) {
            $cost = (float) ($item['costPrice'] ?? 0);
            $currentPrice = (float) ($item['price'] ?? $cost);
            $rateFactor = isset($market['rate']) && $market['rate'] > 0 ? (float) $market['rate'] / 100000 : 1;
            $grossMargin = $currentPrice > 0 ? (($currentPrice - $cost) / $currentPrice) * 100 : 0;
            $recommendedPrice = $currentPrice * (1 + max(-0.10, min(0.20, $rateFactor)));
            $recommendedWholesale = round($recommendedPrice * 0.95, 2);
            $recommendedRetail = round($recommendedPrice, 2);

            $recommendations[] = [
                'name' => $item['name'],
                'current_price' => round($currentPrice, 2),
                'gross_margin_percent' => round($grossMargin, 2),
                'recommended_wholesale' => $recommendedWholesale,
                'recommended_retail' => $recommendedRetail,
            ];
        }
        return $recommendations;
    }
}
