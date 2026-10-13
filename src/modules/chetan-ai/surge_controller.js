(function () {
    if (typeof window === 'undefined') return;

    window.fetchSurgePricingRecommendations = async function () {
        try {
            const response = await fetch('api.php?action=surge_pricing');
            const payload = await response.json();
            if (!payload.success) {
                return [];
            }
            return payload.recommendations || [];
        } catch (error) {
            return [];
        }
    };
})();
