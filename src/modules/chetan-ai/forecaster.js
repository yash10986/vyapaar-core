(function () {
    function getForecast(appState) {
        const inflows = (appState?.ledger || []).filter(entry => entry.type === 'inflow').reduce((sum, entry) => sum + (Number(entry.amount) || 0), 0);
        const expenses = (appState?.ledger || []).filter(entry => entry.type === 'expense').reduce((sum, entry) => sum + (Number(entry.amount) || 0), 0);
        const inventoryItems = appState?.inventory || [];
        const averageStock = inventoryItems.reduce((sum, item) => sum + (Number(item.stock) || 0), 0) / Math.max(1, inventoryItems.length);
        const lowStockCount = inventoryItems.filter(item => (Number(item.stock) || 0) <= (appState?.lowStockThreshold || 8)).length;

        const projection = {
            expectedRevenue: Math.round(inflows * 1.12),
            expectedExpense: Math.round(expenses * 1.04),
            expectedCash: Math.round(inflows * 1.12 - expenses * 1.04),
            averageStock,
            lowStockCount,
            recommendation: lowStockCount > 0
                ? 'Replenish stock before the next billing spike to avoid lost sales.'
                : 'Inventory is stable; keep price discipline and collection focus.'
        };

        return projection;
    }

    function renderForecast(appState, targetId) {
        const target = document.getElementById(targetId);
        if (!target) return getForecast(appState);

        const forecast = getForecast(appState);
        target.innerHTML = `
            <div class="grid gap-2 md:grid-cols-3">
                <div class="rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-3">
                    <p class="text-[10px] uppercase tracking-[0.2em] text-indigo-300">Projected revenue</p>
                    <p class="text-sm font-semibold text-white">₹${forecast.expectedRevenue.toLocaleString()}</p>
                </div>
                <div class="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3">
                    <p class="text-[10px] uppercase tracking-[0.2em] text-emerald-300">Projected cash</p>
                    <p class="text-sm font-semibold text-white">₹${forecast.expectedCash.toLocaleString()}</p>
                </div>
                <div class="rounded-xl border border-amber-500/20 bg-amber-500/10 p-3">
                    <p class="text-[10px] uppercase tracking-[0.2em] text-amber-300">Stock check</p>
                    <p class="text-sm font-semibold text-white">${forecast.lowStockCount} low stock items</p>
                </div>
            </div>
            <p class="text-[11px] text-slate-400 mt-3">${forecast.recommendation}</p>
        `;

        return forecast;
    }

    window.VyapaarForecaster = {
        getForecast,
        renderForecast
    };
})();
