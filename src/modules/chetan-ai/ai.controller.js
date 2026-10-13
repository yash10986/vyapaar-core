(function () {
    function toCurrency(value) {
        return `₹${Number(value || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function getLowStockItems(appState) {
        const threshold = appState?.lowStockThreshold || 8;
        return (appState?.inventory || []).filter(item => (item.stock || 0) <= threshold);
    }

    function getOutstandingReceivables(appState) {
        return (appState?.customers || []).reduce((sum, customer) => sum + (Number(customer.balance) || 0), 0);
    }

    function getOverdueSuppliers(appState) {
        return (appState?.dealers || []).filter(dealer => (Number(dealer.outstanding) || 0) > 0);
    }

    function buildExecutiveBrief(appState) {
        const inflows = (appState?.ledger || []).filter(entry => entry.type === 'inflow').reduce((sum, entry) => sum + (Number(entry.amount) || 0), 0);
        const expenses = (appState?.ledger || []).filter(entry => entry.type === 'expense').reduce((sum, entry) => sum + (Number(entry.amount) || 0), 0);
        const netCash = inflows - expenses;
        const margin = inflows > 0 ? Math.round((netCash / inflows) * 100) : 100;
        const lowStockItems = getLowStockItems(appState);
        const receivables = getOutstandingReceivables(appState);
        const supplierExposure = getOverdueSuppliers(appState);
        const recommendationList = [];

        if (lowStockItems.length) {
            recommendationList.push({
                title: 'Reorder fast-moving inventory',
                detail: `${lowStockItems.slice(0, 2).map(item => item.name).join(', ')} are below your alert threshold. A replenish plan will protect margin and avoid stockouts.`,
                tone: 'warning'
            });
        }

        if (receivables > 0) {
            recommendationList.push({
                title: 'Focus on collection follow-up',
                detail: `Customer dues of ${toCurrency(receivables)} are still open. Trigger reminder calls for the highest-balance accounts first.`,
                tone: 'info'
            });
        }

        if (supplierExposure.length) {
            recommendationList.push({
                title: 'Re-negotiate supplier terms',
                detail: `${supplierExposure.length} wholesalers still carry open outstanding balances. Use the next purchase cycle to re-set payment windows.`,
                tone: 'success'
            });
        }

        if (!recommendationList.length) {
            recommendationList.push({
                title: 'Operations are stable',
                detail: 'No immediate stock or collection risks are visible. Maintain the current cadence and monitor margin drift daily.',
                tone: 'success'
            });
        }

        const nextAction = recommendationList[0];
        const healthScore = clamp(Math.round((margin * 0.45) + (lowStockItems.length > 0 ? 30 : 50) + (receivables > 0 ? 15 : 25)), 20, 98);

        return {
            inflows,
            expenses,
            netCash,
            margin,
            lowStockItems,
            receivables,
            supplierExposure,
            recommendationList,
            nextAction,
            healthScore,
            summary: `Cash position ${netCash >= 0 ? 'healthy' : 'under pressure'} with ${margin}% margin and ${lowStockItems.length} items needing attention.`
        };
    }

    function buildFallbackResponse(queryText, brief) {
        const lower = (queryText || '').toLowerCase();
        if (lower.includes('stock') || lower.includes('low')) {
            return `Your immediate watchlist includes ${brief.lowStockItems.length} low-stock items. Replenish ${brief.lowStockItems.slice(0, 2).map(item => item.name).join(', ')} before the next peak demand window.`;
        }

        if (lower.includes('cash') || lower.includes('liquidity') || lower.includes('finance')) {
            return `Operational cash is ${brief.netCash >= 0 ? 'positive' : 'tight'}. Current net cash works out to ${toCurrency(brief.netCash)} with a ${brief.margin}% margin.`;
        }

        if (lower.includes('collect') || lower.includes('dues') || lower.includes('customer')) {
            return `Customer receivables stand at ${toCurrency(brief.receivables)}. Start with the highest-balance accounts and send reminder workflows first.`;
        }

        return `I recommend ${brief.nextAction.title.toLowerCase()}. ${brief.nextAction.detail}`;
    }

    async function answerBusinessQuery(queryText, appState) {
        const brief = buildExecutiveBrief(appState);
        const fallbackText = buildFallbackResponse(queryText, brief);
        const apiKey = window.localStorage?.getItem('VYAPAAR_GEMINI_API_KEY') || window.__VYAPAAR_GEMINI_API_KEY || '';

        if (!apiKey) {
            return fallbackText;
        }

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `You are Chetan AI, a senior ERP advisor. Analyze this business context and answer the user clearly in 2-3 concise sentences. Context: ${JSON.stringify(brief)}. User query: ${queryText}`
                        }]
                    }]
                })
            });

            const payload = await response.json();
            const text = payload?.candidates?.[0]?.content?.parts?.[0]?.text;
            return text || fallbackText;
        } catch (error) {
            return fallbackText;
        }
    }

    function renderInsightPanel(appState, targetId) {
        const target = document.getElementById(targetId);
        if (!target) return buildExecutiveBrief(appState);

        const brief = buildExecutiveBrief(appState);
        const toneClasses = {
            warning: 'border-amber-500/20 bg-amber-500/10 text-amber-300',
            info: 'border-cyan-500/20 bg-cyan-500/10 text-cyan-300',
            success: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
        };

        target.innerHTML = `
            <div class="flex flex-col gap-3">
                <div class="flex items-center justify-between gap-2">
                    <div>
                        <p class="text-[10px] uppercase tracking-[0.2em] text-gray-400">Autopilot recommendation engine</p>
                        <p class="text-sm text-white font-semibold">${brief.summary}</p>
                    </div>
                    <span class="px-2.5 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-[10px] font-semibold text-indigo-300">Health ${brief.healthScore}%</span>
                </div>
                <div class="grid gap-2 md:grid-cols-3">
                    <div class="rounded-xl border border-white/10 bg-slate-950/70 p-3">
                        <p class="text-[10px] uppercase tracking-[0.2em] text-gray-500">Net cash</p>
                        <p class="text-base font-semibold text-white">${toCurrency(brief.netCash)}</p>
                    </div>
                    <div class="rounded-xl border border-white/10 bg-slate-950/70 p-3">
                        <p class="text-[10px] uppercase tracking-[0.2em] text-gray-500">Margin</p>
                        <p class="text-base font-semibold text-white">${brief.margin}%</p>
                    </div>
                    <div class="rounded-xl border border-white/10 bg-slate-950/70 p-3">
                        <p class="text-[10px] uppercase tracking-[0.2em] text-gray-500">Open collection risk</p>
                        <p class="text-base font-semibold text-white">${toCurrency(brief.receivables)}</p>
                    </div>
                </div>
                <div class="space-y-2">
                    ${brief.recommendationList.map(item => `
                        <div class="rounded-xl border ${toneClasses[item.tone] || toneClasses.success} p-3">
                            <p class="text-[11px] font-semibold">${item.title}</p>
                            <p class="text-[10px] mt-1 opacity-90">${item.detail}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        return brief;
    }

    window.VyapaarAI = {
        buildExecutiveBrief,
        answerBusinessQuery,
        renderInsightPanel,
        buildFallbackResponse
    };
})();
