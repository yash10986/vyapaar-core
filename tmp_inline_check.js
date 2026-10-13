

        // High-Fidelity LocalStorage State Synchronizer with Audio Synthesis Enabled
        const defaultAppState = {
            theme: 'indigo',
            soundEnabled: true,
            voiceEnabled: true,
            dynamicPricing: {
                minMargin: 15,
                supplierCostTrigger: 12,
                bulkBracket: 25,
                autoAdjust: true,
                bulkTierEnabled: true,
                sensitivity: 12,
                autoSyncMedian: true,
                marketCompetitors: [
                    { sku: 'Basmati Rice Premium', marketMedian: 420, competitorLow: 405, competitorHigh: 445 },
                    { sku: 'Tata Salt Premium', marketMedian: 28, competitorLow: 26, competitorHigh: 30 },
                    { sku: 'Fortune Mustard Oil', marketMedian: 180, competitorLow: 170, competitorHigh: 195 },
                    { sku: 'Ashirvaad Atta 10kg', marketMedian: 390, competitorLow: 370, competitorHigh: 410 },
                    { sku: 'Catch Turmeric Powder', marketMedian: 45, competitorLow: 42, competitorHigh: 48 }
                ]
            },
            scratchpad: "Reminders:\n- Verify GSTIN accounts for Apex Hyperlocal.\n- Call Indo-Aryan for next delivery schedule.",
            revenue: 51143.2,
            expenses: 12000,
            activeStaff: 2,
            lowStockCount: 3,
            lowStockThreshold: 8,
            cart: [],
            catalog: [
                { name: "Basmati Rice Premium", price: 420, category: "Grains", costPrice: 350, mrp: 450 },
                { name: "Tata Salt Premium", price: 28, category: "Condiments", costPrice: 20, mrp: 30 },
                { name: "Fortune Mustard Oil", price: 185, category: "Edibles", costPrice: 150, mrp: 200 },
                { name: "Ashirvaad Atta 10kg", price: 390, category: "Grains", costPrice: 320, mrp: 410 },
                { name: "Catch Turmeric Powder", price: 45, category: "Spices", costPrice: 35, mrp: 50 }
            ],
            inventory: [
                { name: "Basmati Rice Premium", stock: 15 },
                { name: "Tata Salt Premium", stock: 92 },
                { name: "Fortune Mustard Oil", stock: 4 },
                { name: "Ashirvaad Atta 10kg", stock: 2 },
                { name: "Catch Turmeric Powder", stock: 3 }
            ],
            ledger: [
                { ref: "TX-001-OPEN", time: "11 Jul 2026, 09:00 AM", debit: "Cash-in-Hand", credit: "Equity Capital", type: "inflow", amount: 48500 },
                { ref: "TX-002-RENT", time: "12 Jul 2026, 11:00 AM", debit: "Real Estate Inc", credit: "Shop Rent", type: "expense", amount: 12000 }
            ],
            purchases: [
                { ref: "PO-775-DEPT", supplier: "Indo-Aryan Wholesale Foods", product: "Basmati Rice Premium", qty: 50, mrp: 450, cost: 350, sellRate: 420, gst: 18, scheme: "10+1", discount: 5, total: 15950, batch: "B-RICE-02", time: "12 Jul 2026, 02:30 PM" }
            ],
            sales: [
                { ref: "SO-101-COM", client: "Rahul Sharma", product: "Fortune Mustard Oil", qty: 20, rate: 185, gst: 18, discount: 5, total: 3600, payment: "Paid", time: "12 Jul 2026, 04:15 PM" }
            ],
            staff: [
                { name: "Rajesh Kumar", role: "Accountant", present: true, lastEvent: "Clock-In (09:00 AM)", clockIn: "09:00 AM", clockOut: null },
                { name: "Amit Singh", role: "Floor Manager", present: true, lastEvent: "Clock-In (09:12 AM)", clockIn: "09:12 AM", clockOut: null },
                { name: "Prerna Sharma", role: "Inventory Lead", present: false, lastEvent: "N/A", clockIn: null, clockOut: null }
            ],
            customers: [
                { name: "Rahul Sharma", balance: 4200, tel: "+91 98765 43210" },
                { name: "Karan Verma", balance: 1850, tel: "+91 87654 32109" },
                { name: "Suresh Gupta", balance: 0, tel: "+91 76543 21098" }
            ],
            dealers: [
                { name: "Indo-Aryan Wholesale Foods", gst: "27AAACA1111A1Z1", address: "Plot 12, APMC Market, Vashi, Mumbai", phone: "+91 98200 12345", bank: "State Bank of India", acc: "30129044111", ifsc: "SBIN0000512", outstanding: 15000 },
                { name: "Saraswati Agro Importers", gst: "27AAACS2222B2Z2", address: "Grains Yard, Nagpur, Maharashtra", phone: "+91 99300 54321", bank: "HDFC Bank Ltd", acc: "501002221144", ifsc: "HDFC0000060", outstanding: 0 }
            ],
            regionalMarketRates: [
                { commodity: "Basmati Rice Premium", unit: "₹/kg", currentRate: 142, change: 1.5, region: "Indore Grain Hub" },
                { commodity: "Tata Salt Premium", unit: "₹/kg", currentRate: 29, change: -0.7, region: "Mumbai Salt Yards" },
                { commodity: "Fortune Mustard Oil", unit: "₹/L", currentRate: 182, change: 0.8, region: "Pune Oil Depot" },
                { commodity: "Ashirvaad Atta 10kg", unit: "₹/kg", currentRate: 41, change: -0.2, region: "Nagpur Grain Exchange" },
                { commodity: "Catch Turmeric Powder", unit: "₹/100g", currentRate: 46, change: 0.9, region: "Kolhapur Spice Market" }
            ],
            companyProfile: {
                tenantCode: "VYAPAARCORE",
                companyName: "Vyapaar Core Technologies Pvt. Ltd.",
                tradeName: "Vyapaar Core",
                ownerName: "Satkar Sharma",
                gstin: "27AAACA1111A1Z1",
                pan: "AAACA1111A",
                cin: "U74999MH2024PTC123456",
                licenseNumber: "LIC-IND-2026-001",
                licenseValidTill: "2027-12-31",
                address: "Plot 12, APMC Market, Vashi, Mumbai, Maharashtra, 400703",
                email: "contact@vyapaarcore.in",
                phone: "+91 98200 12345",
                bankName: "State Bank of India",
                bankAccount: "30129044111",
                ifscCode: "SBIN0000512",
                invoicePrefix: "VY-",
                footerNote: "This invoice is computer generated and does not require a signature."
            },
            retailers: [
                { name: "Karan Kirana Store", gst: "27AABCK3333C3Z3", address: "Shop 4, Satkarsthal Bazaar, Wardha", phone: "+91 87654 32109", bank: "ICICI Bank", acc: "000401552211", ifsc: "ICIC0000004", balance: 1850 },
                { name: "Apex Hyperlocal Mart", gst: "27AABCA4444D4Z4", address: "Civil Lines, Nagpur", phone: "+91 91200 98765", bank: "Axis Bank", acc: "9140100022211", ifsc: "UTIB0000052", balance: 12500 }
            ],
            logs: [
                { type: "success", message: "Invoice #INV-2026-081 Paid via UPI", time: "10:42 PM", detail: "₹4,200" },
                { type: "warning", message: 'Item "Fortune Mustard Oil" reached critical warning', time: "10:15 PM", detail: "4 Packets Remaining" }
            ],
            ledgerFilter: 'all',
            activeDirTab: 'dealers',
            // ===== NEW MODULES DOCK SYNCHRONIZATION =====
            returns: [
                { ref: "RET-081", originalInvoice: "SO-101-COM", product: "Fortune Mustard Oil", qty: 2, reason: "Defective / Damaged Item", value: 370, time: "16 Jul 2026, 11:20 AM" }
            ],
            auditLog: [
                { action: "Core OS Init Session", module: "SYSTEM", timestamp: "16 Jul 2026, 09:00 AM", integrityCode: "SEC-9B8A" },
                { action: "Inflow POS Gateway Enabled", module: "BILLING", timestamp: "16 Jul 2026, 09:02 AM", integrityCode: "GATE-002" }
            ],
            commissions: [
                { staffName: "Rajesh Kumar", reason: "Target Completed Bonus", time: "16 Jul 2026, 03:30 PM", amount: 1500 }
            ]
        };

        let AppState = JSON.parse(localStorage.getItem('VYAPAAR_CORE_STATE_V3'));
        if (!AppState || !AppState.catalog || !AppState.purchases || !AppState.dealers || !AppState.retailers) {
            AppState = defaultAppState;
        }

        // Initialize state variables safely
        if (!AppState.returns) AppState.returns = defaultAppState.returns;
        if (!AppState.auditLog) AppState.auditLog = defaultAppState.auditLog;
        if (!AppState.commissions) AppState.commissions = defaultAppState.commissions;
        if (!AppState.regionalMarketRates) AppState.regionalMarketRates = defaultAppState.regionalMarketRates;
        if (!Array.isArray(AppState.staff)) AppState.staff = Array.isArray(defaultAppState.staff) ? defaultAppState.staff : [];
        AppState.staff = AppState.staff.map(member => {
            const lastEventValue = String(member.lastEvent || '');
            const inMatch = lastEventValue.match(/Clock-In \((.+?)\)/);
            const outMatch = lastEventValue.match(/Clock-Out \((.+?)\)/);

            if (typeof member.clockIn !== 'string') {
                member.clockIn = inMatch ? inMatch[1] : (member.present && lastEventValue && lastEventValue !== 'N/A' ? lastEventValue : null);
            }
            if (typeof member.clockOut !== 'string') {
                member.clockOut = outMatch ? outMatch[1] : null;
            }
            return member;
        });
        if (!AppState.companyProfile) AppState.companyProfile = defaultAppState.companyProfile;
        if (!AppState.dynamicPricing) AppState.dynamicPricing = defaultAppState.dynamicPricing;

        window.AppState = AppState;

        function getDynamicPricingState() {
            return AppState.dynamicPricing || defaultAppState.dynamicPricing;
        }

        function computeMarginPercent(cost, sell) {
            if (!sell || sell <= 0 || !cost || cost < 0) return 0;
            return ((sell - cost) / sell) * 100;
        }

        function renderDynamicPricingTable() {
            const tableBody = document.getElementById('dynamic-pricing-table-body');
            if (!tableBody) return;

            const pricingState = getDynamicPricingState();
            const items = Array.isArray(AppState.catalog) ? AppState.catalog : [];
            const minFloor = Number(pricingState.minMargin || 15);

            tableBody.innerHTML = items.map((item) => {
                const cost = Number(item.costPrice || item.price || 0);
                const sell = Number(item.price || item.mrp || 0);
                const margin = computeMarginPercent(cost, sell);
                const belowFloor = margin < minFloor;
                const status = belowFloor ? 'Protected' : 'Healthy';
                const statusClass = belowFloor ? 'text-amber-300 bg-amber-500/10 border border-amber-500/20' : 'text-emerald-300 bg-emerald-500/10 border border-emerald-500/20';

                return `
                    <tr class="hover:bg-slate-900/40 transition-colors">
                        <td class="px-4 py-3 font-medium text-white">${item.name}</td>
                        <td class="px-4 py-3 text-slate-300">₹${cost.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                        <td class="px-4 py-3 text-slate-300">₹${sell.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                        <td class="px-4 py-3 font-bold ${belowFloor ? 'text-amber-300' : 'text-emerald-300'}">${margin.toFixed(1)}%</td>
                        <td class="px-4 py-3">
                            <span class="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${statusClass}">${status}</span>
                        </td>
                    </tr>
                `;
            }).join('');

            const summary = document.getElementById('dynamic-pricing-summary');
            if (summary) {
                const risky = items.filter(item => computeMarginPercent(Number(item.costPrice || item.price || 0), Number(item.price || item.mrp || 0)) < minFloor).length;
                const healthy = items.length - risky;
                summary.innerHTML = `
                    <div class="space-y-2">
                        <div class="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
                            <div class="text-[10px] uppercase tracking-[0.18em] text-slate-500">Healthy SKUs</div>
                            <div class="mt-1 text-xl font-bold text-emerald-200">${healthy}</div>
                        </div>
                        <div class="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3">
                            <div class="text-[10px] uppercase tracking-[0.18em] text-slate-500">Needs protection</div>
                            <div class="mt-1 text-xl font-bold text-amber-200">${risky}</div>
                        </div>
                        <div class="text-xs text-slate-400 mt-2">
                            Recommended action: ${risky ? 'review below-floor SKUs and raise selling prices using the active bulk or surge rule.' : 'pricing guardrails are aligned and no immediate adjustments are required.'}
                        </div>
                    </div>
                `;
            }

            const floorBadge = document.getElementById('dynamic-pricing-floor-badge');
            const floorValue = document.getElementById('dynamic-pricing-floor-value');
            if (floorBadge) floorBadge.textContent = `${minFloor}%`;
            if (floorValue) floorValue.textContent = `${minFloor}%`;

            const boardStatus = document.getElementById('dynamic-pricing-ops-status');
            if (boardStatus) {
                boardStatus.innerHTML = `
                    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    ${risky ? 'Review' : 'Protected'}
                `;
            }

            renderMarketCompetitorIndex();
        }

        function updateDynamicPricingGuardrail(value) {
            const pricingState = getDynamicPricingState();
            pricingState.minMargin = Number(value || 15);
            const input = document.getElementById('dynamic-pricing-floor-input');
            if (input) input.value = pricingState.minMargin;
            renderDynamicPricingTable();
            saveState();
        }

        function updateDynamicPricingSensitivity(value) {
            const pricingState = getDynamicPricingState();
            pricingState.sensitivity = Number(value || 12);
            const sensitivityValue = document.getElementById('dynamic-pricing-sensitivity-value');
            if (sensitivityValue) sensitivityValue.textContent = `${pricingState.sensitivity}%`;
            renderDynamicPricingTable();
            saveState();
        }

        function renderMarketCompetitorIndex() {
            const tbody = document.getElementById('market-competitor-tbody');
            const toggle = document.getElementById('market-auto-sync-toggle');
            if (!tbody) return;

            const pricingState = getDynamicPricingState();
            const catalog = Array.isArray(AppState.catalog) ? AppState.catalog : [];
            const rows = Array.isArray(pricingState.marketCompetitors) && pricingState.marketCompetitors.length
                ? pricingState.marketCompetitors
                : catalog.map((item, idx) => ({
                    sku: item.name,
                    marketMedian: Number(item.price || item.mrp || 0),
                    competitorLow: Number(item.price || item.mrp || 0) * 0.97,
                    competitorHigh: Number(item.price || item.mrp || 0) * 1.03
                }));

            if (toggle) toggle.checked = pricingState.autoSyncMedian !== false;

            const enrichedRows = rows.map((row) => {
                const item = catalog.find((entry) => entry.name === row.sku) || catalog[0] || {};
                const yourPrice = Number(item.price || row.marketMedian || 0);
                const marketMedian = Number(row.marketMedian || yourPrice || 0);
                const variancePct = marketMedian ? ((yourPrice - marketMedian) / marketMedian) * 100 : 0;
                const isAbove = variancePct > 0;
                const varianceLabel = `${variancePct >= 0 ? '+' : ''}${variancePct.toFixed(1)}%`;
                const varianceClass = variancePct > 3 ? 'text-amber-300' : variancePct < -3 ? 'text-emerald-300' : 'text-cyan-200';
                const priceStatus = variancePct > 3 ? 'Above median' : variancePct < -3 ? 'Below median' : 'Aligned';
                return {
                    ...row,
                    sku: row.sku || item.name || 'SKU',
                    yourPrice,
                    marketMedian,
                    variancePct,
                    varianceLabel,
                    varianceClass,
                    priceStatus
                };
            });

            tbody.innerHTML = enrichedRows.map((row) => `
                <tr class="hover:bg-slate-900/40 transition-colors">
                    <td class="px-3 py-2.5 font-medium text-white">${row.sku}</td>
                    <td class="px-3 py-2.5 text-slate-300">₹${Number(row.marketMedian).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                    <td class="px-3 py-2.5 text-slate-300">₹${Number(row.yourPrice).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                    <td class="px-3 py-2.5 font-bold ${row.varianceClass}">${row.varianceLabel}</td>
                </tr>
            `).join('');
        }

        function toggleMarketAutoSync(enabled = true) {
            const pricingState = getDynamicPricingState();
            pricingState.autoSyncMedian = Boolean(enabled);

            if (pricingState.autoSyncMedian) {
                const catalog = Array.isArray(AppState.catalog) ? AppState.catalog : [];
                pricingState.marketCompetitors.forEach((row) => {
                    const item = catalog.find((entry) => entry.name === row.sku);
                    if (item) {
                        const syncedPrice = Number(row.marketMedian || item.price || 0);
                        item.price = syncedPrice;
                        item.mrp = syncedPrice;
                    }
                });
                showSystemToast('success', 'Market sync enabled', 'Local pricing has been aligned to the current market median.');
            }

            renderDynamicPricingTable();
            saveState();
        }

        function syncDynamicPricingControls() {
            const pricingState = getDynamicPricingState();
            const floorInput = document.getElementById('dynamic-pricing-floor-input');
            const supplierTrigger = document.getElementById('dynamic-pricing-supplier-trigger');
            const bulkBracket = document.getElementById('dynamic-pricing-bulk-bracket');
            const surgeToggle = document.getElementById('dynamic-pricing-surge-toggle');
            const bulkToggle = document.getElementById('dynamic-pricing-bulk-toggle');
            const sensitivity = document.getElementById('dynamic-pricing-sensitivity');

            if (floorInput) floorInput.value = pricingState.minMargin ?? 15;
            if (supplierTrigger) supplierTrigger.value = pricingState.supplierCostTrigger ?? 12;
            if (bulkBracket) bulkBracket.value = pricingState.bulkBracket ?? 25;
            if (surgeToggle) surgeToggle.checked = pricingState.autoAdjust !== false;
            if (bulkToggle) bulkToggle.checked = pricingState.bulkTierEnabled !== false;
            if (sensitivity) sensitivity.value = pricingState.sensitivity ?? 12;

            const sensitivityValue = document.getElementById('dynamic-pricing-sensitivity-value');
            if (sensitivityValue) sensitivityValue.textContent = `${pricingState.sensitivity ?? 12}%`;
            const floorValue = document.getElementById('dynamic-pricing-floor-value');
            if (floorValue) floorValue.textContent = `${pricingState.minMargin ?? 15}%`;
        }

        function applyDynamicPricingRules() {
            const pricingState = getDynamicPricingState();
            pricingState.minMargin = Number(document.getElementById('dynamic-pricing-floor-input')?.value || pricingState.minMargin || 15);
            pricingState.supplierCostTrigger = Number(document.getElementById('dynamic-pricing-supplier-trigger')?.value || pricingState.supplierCostTrigger || 12);
            pricingState.bulkBracket = Number(document.getElementById('dynamic-pricing-bulk-bracket')?.value || pricingState.bulkBracket || 25);
            pricingState.autoAdjust = document.getElementById('dynamic-pricing-surge-toggle')?.checked ?? true;
            pricingState.bulkTierEnabled = document.getElementById('dynamic-pricing-bulk-toggle')?.checked ?? true;
            pricingState.sensitivity = Number(document.getElementById('dynamic-pricing-sensitivity')?.value || pricingState.sensitivity || 12);

            const catalog = Array.isArray(AppState.catalog) ? AppState.catalog : [];
            catalog.forEach((item) => {
                const cost = Number(item.costPrice || item.price || 0);
                const margin = computeMarginPercent(cost, Number(item.price || item.mrp || 0));
                const protectedFloor = pricingState.minMargin;
                if (margin < protectedFloor) {
                    const safePrice = Number((cost / (1 - protectedFloor / 100)).toFixed(2));
                    item.price = Math.max(item.price || 0, safePrice);
                    item.mrp = Math.max(item.mrp || 0, safePrice);
                }
            });

            if (pricingState.autoSyncMedian) {
                pricingState.marketCompetitors.forEach((row) => {
                    const item = catalog.find((entry) => entry.name === row.sku);
                    if (item) {
                        const medianValue = Number(row.marketMedian || item.price || 0);
                        item.price = medianValue;
                        item.mrp = medianValue;
                    }
                });
            }

            renderDynamicPricingTable();
            syncDynamicPricingControls();
            saveState();
            showSystemToast('success', 'Pricing rules applied', 'Dynamic pricing floor and market sync controls have been synchronized across the catalog.');
        }

        const clientPaymentsHub = {
            selectedClient: null,
            pendingBills: [],
            clients: [],
            selectedBillKeys: new Set(),
        };

        function buildSavedClientProfiles() {
            const appState = window.AppState || {};
            const customers = Array.isArray(appState.customers) ? appState.customers : [];
            const retailers = Array.isArray(appState.retailers) ? appState.retailers : [];

            return [
                ...customers.map((cust, index) => ({
                    id: `B2C-${index + 1}`,
                    name: cust.name,
                    type: 'B2C',
                    balance: Number(cust.balance || 0),
                    phone: cust.tel || 'N/A',
                    due: Number(cust.balance || 0),
                })),
                ...retailers.map((rtl, index) => ({
                    id: `B2B-${index + 1}`,
                    name: rtl.name,
                    type: 'B2B',
                    balance: Number(rtl.balance || 0),
                    phone: rtl.phone || 'N/A',
                    due: Number(rtl.balance || 0),
                })),
            ];
        }

        function buildClientBills(client) {
            const appState = window.AppState || {};
            const sales = Array.isArray(appState.sales) ? appState.sales : [];
            const clientSales = sales.filter(sale => sale.client === client.name && String(sale.payment).toLowerCase() === 'credit');

            if (clientSales.length) {
                return clientSales.map((sale, index) => {
                    const dateObj = new Date(sale.time || Date.now());
                    const dueDays = 30;
                    const dueDate = new Date(dateObj.getTime() + dueDays * 86400000);
                    return {
                        billNumber: sale.ref || `${client.id}-BILL-${index + 1}`,
                        dueDate: dueDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
                        age: `${Math.max(1, Math.floor((Date.now() - dateObj.getTime()) / 86400000))} days`,
                        amount: Number(sale.total || client.due || 0),
                        priority: 'High',
                    };
                });
            }

            if (client.due > 0) {
                const now = new Date();
                const dueDate = new Date(now.getTime() + 10 * 86400000);
                return [{
                    billNumber: `${client.id}-OPEN-01`,
                    dueDate: dueDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
                    age: '30 days',
                    amount: client.due,
                    priority: 'Standard',
                }];
            }

            return [];
        }

        function generateBarcodeSvg(payload) {
            const encoder = new TextEncoder();
            const bytes = encoder.encode(payload);
            const size = 220;
            const innerWidth = 180;
            const innerHeight = 148;
            const left = (size - innerWidth) / 2;
            const top = (size - innerHeight) / 2;

            let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges">`;
            svg += `<rect width="${size}" height="${size}" fill="#020617"/>`;
            svg += `<rect x="${left}" y="${top}" width="${innerWidth}" height="${innerHeight}" rx="18" fill="#12203c" stroke="#2563eb" stroke-width="1"/>`;

            let x = left + 12;
            const barArea = innerWidth - 24;
            const bandHeight = innerHeight - 32;
            for (let i = 0; i < bytes.length; i += 1) {
                const byte = bytes[i];
                for (let bit = 7; bit >= 0; bit -= 1) {
                    const filled = (byte >> bit) & 1;
                    const width = filled ? 4 : 2;
                    if (x + width > left + innerWidth - 12) break;
                    if (filled) {
                        const barHeight = bandHeight - ((i % 3) * 8);
                        svg += `<rect x="${x}" y="${top + 16 + (bandHeight - barHeight) / 2}" width="${width}" height="${barHeight}" fill="#38bdf8"/>`;
                    }
                    x += width;
                }
                x += 1;
                if (x > left + innerWidth - 12) break;
            }

            svg += `<text x="${size / 2}" y="${size - 18}" fill="#cbd5e1" font-family="JetBrains Mono, monospace" font-size="10" text-anchor="middle" letter-spacing="0.05em">${payload.slice(0, 24)}</text>`;
            svg += `</svg>`;
            return svg;
        }

        function generateQrSvg(payload) {
            const encoder = new TextEncoder();
            const bytes = encoder.encode(payload);
            const grid = 27;
            const size = 220;
            let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${grid} ${grid}" shape-rendering="crispEdges">`;
            svg += `<rect width="${grid}" height="${grid}" fill="#020617"/>`;
            svg += `<rect x="1" y="1" width="${grid - 2}" height="${grid - 2}" fill="none" stroke="#4f46e5" stroke-width="0.5"/>`;

            const getCell = (row, col) => {
                const idx = (row * grid + col) % bytes.length;
                const bit = (bytes[idx] >> ((row + col) % 8)) & 1;
                return bit === 1;
            };

            const drawFinder = (x, y) => {
                const squares = [];
                for (let dy = 0; dy < 7; dy += 1) {
                    for (let dx = 0; dx < 7; dx += 1) {
                        const isOuter = dx === 0 || dx === 6 || dy === 0 || dy === 6;
                        const isInner = dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4;
                        if (isOuter || isInner) {
                            squares.push({ x: x + dx, y: y + dy });
                        }
                    }
                }
                return squares;
            };

            const patterns = [
                ...drawFinder(0, 0),
                ...drawFinder(grid - 7, 0),
                ...drawFinder(0, grid - 7),
            ];

            for (let row = 0; row < grid; row += 1) {
                for (let col = 0; col < grid; col += 1) {
                    const isFinder = patterns.some((p) => p.x === col && p.y === row);
                    if (isFinder || getCell(row, col)) {
                        svg += `<rect x="${col}" y="${row}" width="1" height="1" fill="#818cf8"/>`;
                    }
                }
            }

            svg += `</svg>`;
            return svg;
        }

        function formatCurrency(value) {
            return '₹' + Number(value).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }

        function renderClientPaymentsSearchResults(filter = '') {
            const container = document.getElementById('client-payments-search-results');
            if (!container) return;

            const normalized = filter.trim().toLowerCase();
            const results = clientPaymentsHub.clients.filter(client =>
                client.name.toLowerCase().includes(normalized) ||
                client.id.toLowerCase().includes(normalized) ||
                String(client.phone || '').toLowerCase().includes(normalized),
            );

            if (!results.length) {
                container.innerHTML = '<div class="rounded-3xl border border-dashed border-slate-700 bg-slate-950/90 p-6 text-center text-sm text-slate-500">No matching clients found. Try another search term.</div>';
                return;
            }

            container.innerHTML = results.map(client => `
                <button type="button" class="w-full rounded-3xl border border-slate-700 bg-slate-900/80 p-4 text-left transition hover:border-cyan-400/20 hover:bg-slate-800" data-client-id="${client.id}">
                    <div class="flex items-center justify-between gap-3">
                        <div>
                            <p class="font-semibold text-white">${client.name}</p>
                            <p class="text-xs uppercase tracking-[0.25em] text-slate-500">${client.type} • ${client.id}</p>
                        </div>
                        <span class="rounded-full bg-cyan-500/10 px-3 py-1 text-[11px] font-semibold uppercase text-cyan-200">${formatCurrency(client.due)} Due</span>
                    </div>
                    <p class="mt-3 text-xs text-slate-400">Contact: ${client.phone}</p>
                </button>
            `).join('');

            container.querySelectorAll('button[data-client-id]').forEach(btn => {
                btn.addEventListener('click', function () {
                    const clientId = this.getAttribute('data-client-id');
                    if (clientId) selectClientForPayments(clientId);
                });
            });
        }

        function selectClientForPayments(clientId) {
            const client = clientPaymentsHub.clients.find(item => item.id === clientId);
            if (!client) return;
            clientPaymentsHub.selectedClient = client;
            clientPaymentsHub.pendingBills = buildClientBills(client);
            clientPaymentsHub.selectedBillKeys = new Set(clientPaymentsHub.pendingBills.map(bill => bill.billNumber));
            renderClientPaymentsBills();
            renderClientPaymentsSearchResults(document.getElementById('client-payments-search-input')?.value || '');
            showSystemToast('success', 'Client Selected', `${client.name} is ready for receivables collection.`);
        }

        function renderClientPaymentsBills() {
            const container = document.getElementById('client-payments-bills-container');
            const emptyState = document.getElementById('client-payments-empty-state');
            const barcodeSection = document.getElementById('client-payments-barcode-section');
            if (!container || !emptyState || !barcodeSection) return;

            const client = clientPaymentsHub.selectedClient;
            if (!client) {
                container.innerHTML = '';
                barcodeSection.classList.add('hidden');
                emptyState.classList.remove('hidden');
                emptyState.textContent = 'No client selected yet. Use the search field to choose a saved client and load pending bills.';
                return;
            }

            if (!clientPaymentsHub.pendingBills.length) {
                container.innerHTML = '';
                barcodeSection.classList.add('hidden');
                emptyState.classList.remove('hidden');
                emptyState.textContent = 'No pending bills found for the selected client. Ensure receivables are registered in the sales ledger.';
                return;
            }

            emptyState.classList.add('hidden');
            container.innerHTML = clientPaymentsHub.pendingBills.map(bill => `
                <label class="flex cursor-pointer items-start gap-3 rounded-3xl border border-slate-800 bg-slate-900/80 p-4 transition hover:border-cyan-400/20">
                    <input type="checkbox" class="mt-2 h-5 w-5 rounded border-slate-700 bg-slate-900 text-cyan-400 focus:ring-cyan-400" ${clientPaymentsHub.selectedBillKeys.has(bill.billNumber) ? 'checked' : ''} data-bill-key="${bill.billNumber}" />
                    <div class="w-full space-y-2">
                        <div class="flex items-center justify-between gap-3">
                            <div>
                                <p class="font-semibold text-slate-100">${bill.billNumber}</p>
                                <p class="text-xs uppercase tracking-[0.25em] text-slate-500">Due ${bill.dueDate}</p>
                            </div>
                            <span class="rounded-full ${bill.priority === 'High' ? 'bg-rose-500/10 text-rose-200' : 'bg-cyan-500/10 text-cyan-200'} px-3 py-1 text-[11px] font-semibold uppercase">${bill.priority}</span>
                        </div>
                        <div class="grid grid-cols-2 gap-4 text-sm text-slate-400">
                            <div>
                                <p class="text-slate-500">Age</p>
                                <p class="mt-1 text-slate-100">${bill.age}</p>
                            </div>
                            <div>
                                <p class="text-slate-500">Amount</p>
                                <p class="mt-1 text-slate-100">${formatCurrency(bill.amount)}</p>
                            </div>
                        </div>
                    </div>
                </label>
            `).join('');

            container.querySelectorAll('input[data-bill-key]').forEach(input => {
                input.addEventListener('change', function () {
                    const billKey = this.getAttribute('data-bill-key');
                    if (!billKey) return;
                    if (this.checked) {
                        clientPaymentsHub.selectedBillKeys.add(billKey);
                    } else {
                        clientPaymentsHub.selectedBillKeys.delete(billKey);
                    }
                });
            });
        }

        function getSelectedBillsTotal() {
            return clientPaymentsHub.pendingBills
                .filter(bill => clientPaymentsHub.selectedBillKeys.has(bill.billNumber))
                .reduce((sum, bill) => sum + bill.amount, 0);
        }

        function generateSecureCollectionLink() {
            const client = clientPaymentsHub.selectedClient;
            if (!client) {
                showSystemToast('error', 'No client selected', 'Please choose a client before generating a link.');
                return;
            }
            const total = getSelectedBillsTotal();
            if (!total) {
                showSystemToast('error', 'No bills selected', 'Select at least one pending bill to generate a payment collection link.');
                return;
            }

            const secureToken = Math.random().toString(36).slice(2, 12).toUpperCase();
            const collectionUrl = `https://vyapaar.pay/collect/${client.id}/${secureToken}`;
            const payload = JSON.stringify({
                client: client.name,
                clientId: client.id,
                amount: total.toFixed(2),
                bills: Array.from(clientPaymentsHub.selectedBillKeys),
                url: collectionUrl,
                timestamp: new Date().toISOString(),
            });

            showSystemToast('success', 'Secure Link Generated', `Link created for ₹${total.toLocaleString('en-IN')}.`);

            const linkInfo = document.createElement('div');
            linkInfo.className = 'rounded-3xl border border-cyan-500/20 bg-slate-900/95 p-4 text-sm text-cyan-100';
            linkInfo.innerHTML = `<p class="mb-2 text-slate-300">Secure collection link created for <strong>${client.name}</strong>.</p><a href="${collectionUrl}" target="_blank" class="text-cyan-300 underline break-all">${collectionUrl}</a>`;
            const container = document.getElementById('client-payments-bills-container');
            if (container) container.prepend(linkInfo);

            const barcodeSection = document.getElementById('client-payments-barcode-section');
            const barcodeOutput = document.getElementById('client-payments-barcode-output');
            const qrOutput = document.getElementById('client-payments-qr-output');
            if (barcodeSection && barcodeOutput && qrOutput) {
                barcodeSection.classList.remove('hidden');
                barcodeOutput.innerHTML = generateBarcodeSvg(payload);
                qrOutput.innerHTML = generateQrSvg(payload);
            }
        }

        function openPaymentReceiptHub() {
            showSystemToast('info', 'Payment Receipt Hub', 'The receipt module is available as a React TSX component in /modules/ClientPaymentHub.tsx.');
        }

        function setupClientPaymentsHub() {
            clientPaymentsHub.clients = buildSavedClientProfiles();

            const searchInput = document.getElementById('client-payments-search-input');
            if (searchInput) {
                searchInput.addEventListener('input', (event) => {
                    renderClientPaymentsSearchResults(event.target.value);
                });
            }

            const generateLinkBtn = document.getElementById('client-payments-generate-link');
            if (generateLinkBtn) {
                generateLinkBtn.addEventListener('click', generateSecureCollectionLink);
            }

            const openReceiptBtn = document.getElementById('client-payments-open-receipt');
            if (openReceiptBtn) {
                openReceiptBtn.addEventListener('click', openPaymentReceiptHub);
            }

            renderClientPaymentsSearchResults();
            renderClientPaymentsBills();
        }

        // Sound Synthesis Engine utilizing Web Audio API
        let audioCtx = null;
        function playSynthFrequency(freq, type, duration) {
            if (!AppState.soundEnabled) return;
            try {
                if (!audioCtx) {
                    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                }
                const osc = audioCtx.createOscillator();
                const gainNode = audioCtx.createGain();
                
                osc.type = type || 'sine';
                osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
                
                gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
                
                osc.connect(gainNode);
                gainNode.connect(audioCtx.destination);
                
                osc.start();
                osc.stop(audioCtx.currentTime + duration);
            } catch (err) {
                console.warn("Web Audio API not supported inside sandbox.");
            }
        }

        function playPositiveSound() { playSynthFrequency(587.33, 'triangle', 0.2); setTimeout(() => playSynthFrequency(880, 'sine', 0.25), 100); }
        function playWarningSound() { playSynthFrequency(293.66, 'sawtooth', 0.35); }
        function playSuccessSound() { playSynthFrequency(440, 'sine', 0.15); setTimeout(() => playSynthFrequency(554.37, 'sine', 0.15), 80); setTimeout(() => playSynthFrequency(659.25, 'sine', 0.3), 160); }
        function playTypingClick() { playSynthFrequency(1200, 'square', 0.03); }

        function toggleChetanVoiceSynthesis() {
            AppState.voiceEnabled = !AppState.voiceEnabled;
            const btnIcon = document.getElementById('voice-icon-element');
            if (AppState.voiceEnabled) {
                btnIcon.textContent = "keyboard_voice";
                announceWithChetanVoice("Chetan voice synthesis system activated.");
            } else {
                btnIcon.textContent = "mic_off";
            }
            saveState();
        }

        function announceWithChetanVoice(phraseText) {
            if (!AppState.voiceEnabled) return;
            try {
                window.speechSynthesis.cancel(); 
                const speech = new SpeechSynthesisUtterance(phraseText);
                const voices = window.speechSynthesis.getVoices();
                const standardVoice = voices.find(v => v.lang.includes('IN') || v.lang.includes('en-GB') || v.name.includes('Google'));
                if (standardVoice) speech.voice = standardVoice;
                
                speech.rate = 1.05; 
                speech.pitch = 0.95; 
                window.speechSynthesis.speak(speech);
            } catch (err) {
                console.warn("Speech Synthesis restricted by sandbox frame.");
            }
        }

        function persistScratchpadNotes(textVal) {
            AppState.scratchpad = textVal;
            saveState();
        }

        function modelSandboxProfitmargins(markupVal) {
            document.getElementById('sandbox-markup-label').textContent = `${markupVal}% Margin`;
            
            // Core database projection modeling logic
            const inflows = AppState.ledger.filter(x => x.type === 'inflow').reduce((sum, x) => sum + x.amount, 0);
            const calculatedProjectedIncome = Math.round(inflows * (1 + (markupVal / 100)));
            const cashRunwayDays = Math.round((calculatedProjectedIncome / (AppState.expenses || 1)) * 30);

            document.getElementById('sandbox-proj-payout').textContent = `₹${calculatedProjectedIncome.toLocaleString()}`;
            document.getElementById('sandbox-proj-runway').textContent = `${cashRunwayDays} Days`;
        }

        function startSTTVoiceCommand() {
            if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
                showSystemToast('error', 'Voice Capture Offline', 'Browser speech recognition not supported in this frame.');
                return;
            }

            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const commandRecognizer = new SpeechRecognition();
            commandRecognizer.lang = 'en-IN'; 
            commandRecognizer.interimResults = false;
            commandRecognizer.maxAlternatives = 1;

            const micBtn = document.getElementById('hud-mic-btn');
            micBtn.classList.add('text-rose-500', 'animate-pulse');
            playSynthFrequency(600, 'sine', 0.1);

            commandRecognizer.onresult = function(event) {
                const vocalCommand = event.results[0][0].transcript;
                const hudInput = document.getElementById('hud-command-input');
                
                hudInput.value = '/' + vocalCommand.replace(/^\//, '');
                showSystemToast('success', 'Vocal Input Parsed', `Parsed: "${vocalCommand}"`);
                
                executeHudCommand(hudInput.value);
                hudInput.value = '';
            };

            commandRecognizer.onerror = function() {
                micBtn.classList.remove('text-rose-500', 'animate-pulse');
            };

            commandRecognizer.onend = function() {
                micBtn.classList.remove('text-rose-500', 'animate-pulse');
            };

            commandRecognizer.start();
        }

        function switchConsoleTab(targetTab) {
            playTypingClick();
            ['feed', 'scratchpad', 'sandbox'].forEach(tab => {
                const btn = document.getElementById(`tab-btn-${tab}`);
                const pane = document.getElementById(`console-pane-${tab}`);
                
                if (tab === targetTab) {
                    btn.className = "flex-1 py-1 px-2 text-[10px] font-bold uppercase rounded text-indigo-300 bg-indigo-500/10 cursor-pointer transition-all";
                    pane.classList.remove('hidden');
                } else {
                    btn.className = "flex-1 py-1 px-2 text-[10px] font-bold uppercase rounded text-gray-400 hover:text-white cursor-pointer transition-all bg-transparent";
                    pane.classList.add('hidden');
                }
            });
        }

        function saveState() {
            localStorage.setItem('VYAPAAR_CORE_STATE_V3', JSON.stringify(AppState));
        }

        window.onload = function() {
            setInterval(updateDigitalClock, 1000);
            updateDigitalClock();
            
            // Render dynamically managed components
            renderCatalog();
            rebuildLedger();
            fetchDashboardData();
            rebuildVaultInventory();
            rebuildStaffRoster();
            rebuildDirectoriesUI();
            rebuildPurchasesRegistry();
            rebuildSalesRegistry();
            rebuildTaxLedger();
            rebuildVaultInventory();
            renderInventoryAlertPanel();
            switchSystemTheme(AppState.theme);
            setupClientPaymentsHub();
            loadCompanyProfile();
            
            // Synchronize Dropdowns with Customers & Products
            populatePurchaseDeskDropdowns();
            populateSalesDeskDropdowns();

            // Run initial calculations
            calculatePurchaseTotal();
            calculateSalesTotal();
            updateWorkspaceScorecard();

            // Build newly integrated panel features
            populateReturnsDropdown();
            rebuildReturnsRegistry();
            rebuildComplianceAuditRegistry();
            populateCommissionStaffDropdown();
            rebuildCommissionsRegistry();
            rebuildProductMasterGrid();
            rebuildLabourRegistry();
            rebuildAnalyticsRatios();

            // Initialize Scratchpad persistent note and sandbox slider values
            document.getElementById('operator-scratchpad-text').value = AppState.scratchpad;
            modelSandboxProfitmargins(15);

            // Synchronize Speaking Toggle icon
            const btnIcon = document.getElementById('voice-icon-element');
            if (btnIcon) {
                btnIcon.textContent = AppState.voiceEnabled ? "keyboard_voice" : "mic_off";
            }

            // Set up HUD Command Bar Event Listener
            document.getElementById('hud-command-input').addEventListener('keydown', function(e) {
                playTypingClick();
                if (e.key === 'Enter') {
                    executeHudCommand(this.value);
                    this.value = '';
                }
            });
        };

        function switchSystemTheme(theme) {
            AppState.theme = theme;
            document.body.className = "text-slate-200 h-screen flex flex-col justify-between selection:bg-indigo-500/20 antialiased relative overflow-hidden select-none";
            document.body.classList.remove('theme-matrix', 'theme-solar', 'theme-cosmic', 'theme-aurora', 'theme-ember');
            
            const dropdown = document.getElementById('theme-selector');
            if (dropdown) dropdown.value = theme;

            if (theme === 'matrix') {
                document.body.classList.add('theme-matrix');
                applyAccentColorCSS("#10b981", "rgba(16, 185, 129, 0.25)");
            } else if (theme === 'solar') {
                document.body.classList.add('theme-solar');
                applyAccentColorCSS("#f59e0b", "rgba(245, 158, 11, 0.25)");
            } else if (theme === 'cosmic') {
                document.body.classList.add('theme-cosmic');
                applyAccentColorCSS("#8b5cf6", "rgba(139, 92, 246, 0.25)");
            } else if (theme === 'aurora') {
                document.body.classList.add('theme-aurora');
                applyAccentColorCSS("#0ea5e9", "rgba(14, 165, 233, 0.25)");
            } else if (theme === 'ember') {
                document.body.classList.add('theme-ember');
                applyAccentColorCSS("#ec4899", "rgba(236, 72, 153, 0.25)");
            } else {
                applyAccentColorCSS("#6366f1", "rgba(99, 102, 241, 0.25)");
            }
            saveState();
        }

        function applyAccentColorCSS(primaryHex, glowVal) {
            const statusBubble = document.getElementById('status-bubble-accent');
            if (statusBubble) statusBubble.style.backgroundColor = primaryHex;

            const fastBill = document.getElementById('fast-bill-btn-accent');
            if (fastBill) fastBill.style.backgroundColor = primaryHex;

            const hudWrapper = document.getElementById('hud-command-wrapper');
            if (hudWrapper) hudWrapper.style.borderColor = primaryHex + "20";

            const hudIcon = document.getElementById('hud-icon-accent');
            if (hudIcon) hudIcon.style.color = primaryHex;

            const hudPrefix = document.getElementById('hud-prefix-accent');
            if (hudPrefix) hudPrefix.style.color = primaryHex;

            const activeStaffIcon = document.getElementById('active-staff-icon-wrapper');
            if (activeStaffIcon) {
                activeStaffIcon.style.borderColor = primaryHex + "20";
                activeStaffIcon.style.color = primaryHex;
            }

            const consolePulse = document.getElementById('console-pulse-accent');
            if (consolePulse) consolePulse.style.backgroundColor = primaryHex;

            const dockHome = document.getElementById('dock-btn-home');
            if (dockHome) {
                dockHome.style.color = primaryHex;
                dockHome.style.borderColor = primaryHex + "30";
            }

            const qrNode = document.getElementById('qr-center-node');
            if (qrNode) qrNode.setAttribute('fill', primaryHex);

            const chetanPanelIcon = document.getElementById('chetan-panel-icon');
            if (chetanPanelIcon) chetanPanelIcon.style.color = primaryHex;

            const chetanMetaAccent = document.getElementById('chetan-meta-accent');
            if (chetanMetaAccent) chetanMetaAccent.style.color = primaryHex;

            const chetanChatSend = document.getElementById('chetan-ai-chat-send-btn');
            if (chetanChatSend) chetanChatSend.style.backgroundColor = primaryHex;

            const compileSwot = document.getElementById('compile-swot-btn');
            if (compileSwot) compileSwot.style.backgroundColor = primaryHex;

            const floatAiHeader = document.getElementById('floating-ai-header');
            if (floatAiHeader) floatAiHeader.style.backgroundImage = `linear-gradient(to right, ${primaryHex}20, transparent)`;

            const floatHeaderIcon = document.getElementById('floating-header-icon');
            if (floatHeaderIcon) floatHeaderIcon.style.color = primaryHex;

            const floatWelcomeIcon = document.getElementById('floating-welcome-icon');
            if (floatWelcomeIcon) floatWelcomeIcon.style.color = primaryHex;

            const floatSendBtn = document.getElementById('floating-send-btn');
            if (floatSendBtn) floatSendBtn.style.backgroundColor = primaryHex;

            const floatAiTrigger = document.getElementById('floating-ai-trigger-btn');
            if (floatAiTrigger) floatAiTrigger.style.backgroundImage = `linear-gradient(to top right, ${primaryHex}, #a855f7)`;

            const gradStop1 = document.getElementById('gradient-stop-1');
            if (gradStop1) gradStop1.setAttribute('stop-color', primaryHex);

            const gradStop2 = document.getElementById('gradient-stop-2');
            if (gradStop2) gradStop2.setAttribute('stop-color', primaryHex);

            const graphTrend = document.getElementById('graph-trend-line');
            if (graphTrend) graphTrend.setAttribute('stroke', primaryHex);

            const areaGraph = document.getElementById('area-graph-base');
            if (areaGraph) areaGraph.setAttribute('fill', 'url(#chartGlow)');

            const dot1 = document.getElementById('node-dot-1');
            if (dot1) dot1.setAttribute('fill', primaryHex);

            const dot2 = document.getElementById('node-dot-2');
            if (dot2) dot2.setAttribute('fill', primaryHex);

            const dot3 = document.getElementById('node-dot-3');
            if (dot3) dot3.setAttribute('fill', primaryHex);

            const dot4 = document.getElementById('node-dot-4');
            if (dot4) dot4.setAttribute('fill', primaryHex);

            const dot5 = document.getElementById('node-dot-5');
            if (dot5) dot5.setAttribute('fill', primaryHex);

            const healthRing = document.getElementById('health-ring-score');
            if (healthRing) {
                healthRing.className.baseVal = primaryHex === "#10b981" ? "text-emerald-500" : primaryHex === "#f59e0b" ? "text-amber-500" : "text-indigo-500";
            }
        }

        function toggleSystemSounds() {
            AppState.soundEnabled = !AppState.soundEnabled;
            const toggleIcon = document.getElementById('sound-icon-element');
            if (AppState.soundEnabled) {
                toggleIcon.textContent = "volume_up";
                playPositiveSound();
            } else {
                toggleIcon.textContent = "volume_off";
            }
            saveState();
        }

        function exportStateJSON() {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(AppState, null, 2));
            const downloadAnchor = document.createElement('a');
            downloadAnchor.setAttribute("href", dataStr);
            downloadAnchor.setAttribute("download", "vyapaar_core_state_backup.json");
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();
            showSystemToast('success', 'Backup Exported', 'Workspace JSON downloaded successfully.');
        }

        function importStateJSON(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const parsedState = JSON.parse(e.target.result);
                    if (parsedState.catalog && parsedState.inventory && parsedState.ledger) {
                        AppState = parsedState;
                        saveState();
                        playSuccessSound();
                        showSystemToast('success', 'Backup Restored', 'System state successfully hot-swapped.');
                        setTimeout(() => location.reload(), 1500);
                    } else {
                        playWarningSound();
                        showSystemToast('error', 'Import Mismatch', 'Missing required Vyapaar system structures.');
                    }
                } catch (err) {
                    playWarningSound();
                    showSystemToast('error', 'Parse Failure', 'Uploaded file is corrupted.');
                }
            };
            reader.readAsText(file);
        }

        function showSystemToast(type, title, message) {
            const container = document.getElementById('toast-container');
            if (!container) return;

            const icon = type === 'success' ? 'check_circle' : type === 'error' ? 'cancel' : 'warning';
            const accent = type === 'success' ? 'border-emerald-500/20 text-emerald-400' : type === 'error' ? 'border-rose-500/20 text-rose-400' : 'border-amber-500/20 text-amber-400';

            const toastHTML = `
                <div class="toast-slide bg-[#0a1020]/90 border ${accent} rounded-xl p-4 flex gap-3 shadow-2xl relative pointer-events-auto w-80">
                    <span class="material-icons text-xl shrink-0 mt-0.5">${icon}</span>
                    <div class="flex-1">
                        <strong class="text-xs text-white block font-bold">${title}</strong>
                        <p class="text-[11px] text-gray-400 mt-0.5 leading-relaxed">${message}</p>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', toastHTML);
            const addedToast = container.lastElementChild;
            setTimeout(() => {
                addedToast.style.transition = 'all 0.3s ease';
                addedToast.style.opacity = '0';
                addedToast.style.transform = 'translateY(-10px)';
                setTimeout(() => addedToast.remove(), 300);
            }, 4000);
        }

        function inspectChartNode(timeLabel, simulatedRevenue, featuredProduct) {
            const inspector = document.getElementById('chart-inspector-pane');
            const desc = document.getElementById('inspector-desc');
            const val = document.getElementById('inspector-val');
            const time = document.getElementById('inspector-time');
            
            playTypingClick();
            inspector.classList.remove('hidden');
            desc.innerHTML = `Cumulative interval verified. Featured product: <strong class="text-slate-100 font-bold">${featuredProduct}</strong>`;
            val.textContent = `₹${simulatedRevenue.toLocaleString()}`;
            time.textContent = `Timestamp: ${timeLabel}`;
        }

        function updateWorkspaceScorecard() {
            const stockoutRiskFactor = Math.max(0, 100 - (AppState.lowStockCount * 8));
            const ledgerInflows = AppState.ledger.filter(x => x.type === 'inflow').reduce((sum, x) => sum + x.amount, 0);
            const ledgerExpenses = AppState.ledger.filter(x => x.type === 'expense').reduce((sum, x) => sum + x.amount, 0);
            
            let profitMarginRatio = 100;
            if (ledgerInflows > 0) {
                profitMarginRatio = Math.round(((ledgerInflows - ledgerExpenses) / ledgerInflows) * 100);
            }
            
            const totalOutstandingCRM = AppState.customers.reduce((sum, c) => sum + c.balance, 0);
            const liquidityDebtHealth = Math.max(20, Math.round(100 - (totalOutstandingCRM / (ledgerInflows || 1)) * 100));

            const cumulativeHealth = Math.min(100, Math.max(10, Math.round((stockoutRiskFactor * 0.4) + (profitMarginRatio * 0.3) + (liquidityDebtHealth * 0.3))));
            
            let grade = "F";
            if (cumulativeHealth >= 95) grade = "A+";
            else if (cumulativeHealth >= 90) grade = "A";
            else if (cumulativeHealth >= 80) grade = "B+";
            else if (cumulativeHealth >= 70) grade = "B";
            else if (cumulativeHealth >= 60) grade = "C";
            else if (cumulativeHealth >= 50) grade = "D";

            document.getElementById('health-ring-score').setAttribute('stroke-dasharray', `${cumulativeHealth}, 100`);
            document.getElementById('health-score-grade').textContent = grade;
            document.getElementById('health-percentage-label').textContent = `${cumulativeHealth}%`;
        }

        async function fetchDashboardData() {
            try {
                AppState.lowStockCount = AppState.inventory.filter(item => item.stock <= AppState.lowStockThreshold).length;
                updateDashboardCounters();
            } catch (err) {
                console.warn("Telemetry Node offline - sandbox environment maintained");
            }
        }

        function updateDigitalClock() {
            const date = new Date();
            let hours = date.getHours();
            let minutes = date.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            const timeStr = `${hours}:${minutes} ${ampm}`;
            const clockEl = document.getElementById('digital-clock');
            if (clockEl) clockEl.textContent = timeStr;
        }

        function openModal(id) {
            playPositiveSound();
            const modal = document.getElementById(id);
            if (!modal) {
                console.warn(`Modal target "${id}" missing from DOM workspace.`);
                return;
            }
            modal.classList.remove('translate-y-full', 'opacity-0', 'pointer-events-none');
            modal.classList.add('translate-y-0', 'opacity-100');
            
            if (id === 'modal-roster') {
                populateRosterEmployeeOptions();
                rebuildStaffRoster();
            }
            if (id === 'modal-labour-onboard') {
                rebuildLabourRegistry();
            }
            if(id === 'modal-chetan') {
                const revEl = document.getElementById('ai-panel-revenue');
                const defEl = document.getElementById('ai-panel-deficits');
                const staffEl = document.getElementById('ai-panel-staff');
                if (revEl) revEl.textContent = `₹${AppState.revenue.toLocaleString()}`;
                if (defEl) defEl.textContent = `${AppState.lowStockCount} Items Low`;
                if (staffEl) staffEl.textContent = `${AppState.activeStaff} Active`;
            }
            if (id === 'modal-analytics') {
                rebuildAnalyticsRatios();
            }
            if (id === 'modal-client-payments') {
                renderClientPaymentsSearchResults();
                renderClientPaymentsBills();
            }
            if (id === 'modal-company-setup') {
                loadCompanyProfiles();
                populateCompanySetupForm();
            }
            // E-Way and Audit modals removed
        }

        function getCompanyProfileForPrint() {
            const profile = AppState.companyProfile || {};
            return {
                companyName: profile.companyName || '',
                tradeName: profile.tradeName || '',
                gstin: profile.gstin || '',
                pan: profile.pan || '',
                cin: profile.cin || '',
                fssai: profile.fssai || '',
                licenseNumber: profile.licenseNumber || '',
                licenseValidTill: profile.licenseValidTill || '',
                address: profile.address || '',
                email: profile.email || '',
                phone: profile.phone || '',
                bankName: profile.bankName || '',
                bankAccount: profile.bankAccount || '',
                ifscCode: profile.ifscCode || '',
                invoicePrefix: profile.invoicePrefix || '',
                footerNote: profile.footerNote || '',
                tenantCode: profile.tenantCode || ''
            };
        }

        function populateCompanySetupForm() {
            const profile = AppState.companyProfile || {};
            const fields = {
                'company-id': profile.id ? profile.id.toString() : '0',
                'company-tenant-code': profile.tenantCode || '',
                'company-name': profile.companyName || '',
                'company-trade-name': profile.tradeName || '',
                'company-owner-name': profile.ownerName || '',
                'company-gstin': profile.gstin || '',
                'company-pan': profile.pan || '',
                'company-cin': profile.cin || '',
                'company-license-number': profile.licenseNumber || '',
                'company-license-valid-till': profile.licenseValidTill || '',
                'company-address': profile.address || '',
                'company-email': profile.email || '',
                'company-phone': profile.phone || '',
                'company-bank-name': profile.bankName || '',
                'company-bank-account': profile.bankAccount || '',
                'company-ifsc-code': profile.ifscCode || '',
                'company-invoice-prefix': profile.invoicePrefix || '',
                'company-footer-note': profile.footerNote || ''
            };
            Object.entries(fields).forEach(([id, value]) => {
                const el = document.getElementById(id);
                if (el) el.value = value;
            });
        }

        function resetCompanyProfileForm() {
            AppState.companyProfile = null;
            saveState();
            const fieldIds = [
                'company-id', 'company-tenant-code', 'company-name', 'company-trade-name', 'company-owner-name',
                'company-gstin', 'company-pan', 'company-cin', 'company-license-number', 'company-license-valid-till',
                'company-address', 'company-email', 'company-phone', 'company-bank-name', 'company-bank-account',
                'company-ifsc-code', 'company-invoice-prefix', 'company-footer-note'
            ];
            fieldIds.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.value = id === 'company-id' ? '0' : '';
            });
        }

        function escapeHtml(text) {
            return String(text)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }

        function sanitizeCompanyField(fieldId, fieldType) {
            const input = document.getElementById(fieldId);
            if (!input) return;
            let value = input.value.toString().trim().toUpperCase();
            if (fieldType === 'gstin') {
                value = value.replace(/[^0-9A-Z]/g, '');
            } else if (fieldType === 'pan') {
                value = value.replace(/[^A-Z0-9]/g, '');
            } else if (fieldType === 'ifsc') {
                value = value.replace(/[^A-Z0-9]/g, '');
            }
            input.value = value;
        }

        function validateCompanyProfileForm() {
            const gstin = document.getElementById('company-gstin')?.value.trim().toUpperCase() || '';
            const pan = document.getElementById('company-pan')?.value.trim().toUpperCase() || '';
            const ifsc = document.getElementById('company-ifsc-code')?.value.trim().toUpperCase() || '';
            const tenantCode = document.getElementById('company-tenant-code')?.value.trim() || '';
            const companyName = document.getElementById('company-name')?.value.trim() || '';

            if (!tenantCode || !companyName) {
                showSystemToast('error', 'Missing Required Fields', 'Tenant code and company name are required.');
                return false;
            }
            const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
            const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
            const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;

            if (gstin && !gstinRegex.test(gstin)) {
                showSystemToast('error', 'Invalid GSTIN', 'Please enter a valid GSTIN in the correct format.');
                return false;
            }
            if (pan && !panRegex.test(pan)) {
                showSystemToast('error', 'Invalid PAN', 'Please enter a valid PAN in the correct format.');
                return false;
            }
            if (ifsc && !ifscRegex.test(ifsc)) {
                showSystemToast('error', 'Invalid IFSC Code', 'Please enter a valid IFSC code in the correct format.');
                return false;
            }
            return true;
        }

        function getCompanyCsrfToken() {
            return document.getElementById('company-csrf-token')?.value || '';
        }

        async function loadCompanyProfile() {
            try {
                const response = await fetch('api.php?action=get_company_profile');
                if (!response.ok) throw new Error('Failed to fetch company profile');
                const payload = await response.json();
                if (payload.success && payload.profile) {
                    AppState.companyProfile = payload.profile;
                    saveState();
                }
            } catch (err) {
                console.warn('Company profile load failed:', err);
            }
        }

        async function loadCompanyProfiles() {
            try {
                const tenantCode = document.getElementById('company-tenant-code')?.value.trim().toUpperCase() || '';
                const query = tenantCode ? `&tenantCode=${encodeURIComponent(tenantCode)}` : '';
                const response = await fetch(`api.php?action=get_company_profiles${query}`);
                if (!response.ok) throw new Error('Failed to load company profiles');
                const payload = await response.json();
                if (payload.success && Array.isArray(payload.profiles)) {
                    window.companyProfilesCache = payload.profiles;
                    renderCompanyProfiles(payload.profiles);
                }
            } catch (err) {
                console.warn('Company profiles load failed:', err);
                const listEl = document.getElementById('company-profiles-list');
                if (listEl) {
                    listEl.innerHTML = `<div class="rounded-3xl border border-dashed border-rose-500/30 bg-slate-950/50 text-rose-300 p-5 text-sm">Unable to load saved tenant profiles.</div>`;
                }
            }
        }

        function renderCompanyProfiles(profiles) {
            const listEl = document.getElementById('company-profiles-list');
            if (!listEl) return;
            if (!profiles || profiles.length === 0) {
                listEl.innerHTML = `<div class="rounded-3xl border border-dashed border-violet-500/20 bg-slate-950/50 text-slate-400 p-5 text-sm">No company profiles found. Create a new profile using the form on the left.</div>`;
                return;
            }
            listEl.innerHTML = profiles.map(profile => {
                const companyName = profile.companyName || 'Untitled';
                const tenantCode = profile.tenantCode || '—';
                const gstin = profile.gstin || '—';
                const licenseValidTill = profile.licenseValidTill || 'N/A';
                const active = AppState.companyProfile && AppState.companyProfile.id === profile.id;
                return `
                    <div class="rounded-3xl border border-white/10 bg-slate-950/70 p-4 shadow-inner shadow-violet-500/5">
                        <div class="flex items-start justify-between gap-4">
                            <div>
                                <div class="text-sm font-semibold text-white">${escapeHtml(companyName)}</div>
                                <div class="text-[11px] text-slate-400 mt-1">${escapeHtml(tenantCode)} • ${escapeHtml(gstin)}</div>
                            </div>
                            <span class="text-[10px] uppercase tracking-[0.28em] ${active ? 'text-emerald-300' : 'text-slate-500'}">${active ? 'Active' : 'Saved'}</span>
                        </div>
                        <div class="mt-3 text-[11px] text-slate-400">License expires: <span class="text-slate-200">${escapeHtml(licenseValidTill)}</span></div>
                        <div class="mt-4 flex flex-wrap items-center gap-2">
                            <button type="button" onclick="editCompanyProfile(${profile.id})" class="rounded-xl bg-violet-600 px-3 py-2 text-[11px] font-semibold text-white hover:bg-violet-500 transition">Edit</button>
                            <button type="button" onclick="updateCompanyProfileFromList(${profile.id})" class="rounded-xl border border-violet-500/30 bg-slate-900 px-3 py-2 text-[11px] font-semibold text-violet-200 hover:bg-slate-800 transition">Update</button>
                            <button type="button" onclick="deleteCompanyProfile(${profile.id})" class="rounded-xl border border-rose-500/30 bg-transparent px-3 py-2 text-[11px] font-semibold text-rose-300 hover:bg-rose-950/80 transition">Delete</button>
                        </div>
                    </div>`;
            }).join('');
        }

        function editCompanyProfile(profileId) {
            const cached = (window.companyProfilesCache || []).find(item => item.id === profileId);
            const tenantCode = document.getElementById('company-tenant-code')?.value.trim().toUpperCase() || '';
            if (cached) {
                AppState.companyProfile = cached;
                saveState();
                populateCompanySetupForm();
                return;
            }
            const query = tenantCode ? `&tenantCode=${encodeURIComponent(tenantCode)}` : '';
            fetch(`api.php?action=get_company_profile&id=${profileId}${query}`)
                .then(response => response.ok ? response.json() : Promise.reject('Failed to fetch profile'))
                .then(payload => {
                    if (payload.success && payload.profile) {
                        AppState.companyProfile = payload.profile;
                        saveState();
                        populateCompanySetupForm();
                    }
                })
                .catch(err => console.warn('Edit company profile failed:', err));
        }

        function updateCompanyProfileFromList(profileId) {
            const currentId = parseInt(document.getElementById('company-id')?.value || '0', 10);
            if (currentId === profileId) {
                saveCompanyProfile();
                return;
            }
            editCompanyProfile(profileId);
        }

        async function deleteCompanyProfile(profileId) {
            if (!confirm('Delete this company profile? This action cannot be undone.')) return;
            try {
                const tenantCode = document.getElementById('company-tenant-code')?.value.trim().toUpperCase() || '';
                const response = await fetch('api.php?action=delete_company_profile', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: profileId, tenantCode, csrfToken: getCompanyCsrfToken() })
                });
                if (!response.ok) throw new Error('Failed to delete');
                const payload = await response.json();
                if (payload.success) {
                    if (AppState.companyProfile && AppState.companyProfile.id === profileId) {
                        AppState.companyProfile = null;
                        saveState();
                        resetCompanyProfileForm();
                    }
                    await loadCompanyProfiles();
                    showSystemToast('success', 'Account deleted successfully', 'Company profile removed from the live directory.');
                } else {
                    throw new Error(payload.error || 'Unable to delete profile');
                }
            } catch (err) {
                console.warn('Company profile delete failed:', err);
                showSystemToast('error', 'Delete Failed', 'Unable to delete the selected profile.');
            }
        }

        function extractCompanyProfileForm() {
            return {
                id: parseInt(document.getElementById('company-id')?.value || '0', 10) || 0,
                tenantCode: document.getElementById('company-tenant-code')?.value.trim() || '',
                companyName: document.getElementById('company-name')?.value.trim() || '',
                tradeName: document.getElementById('company-trade-name')?.value.trim() || '',
                ownerName: document.getElementById('company-owner-name')?.value.trim() || '',
                gstin: document.getElementById('company-gstin')?.value.trim().toUpperCase() || '',
                pan: document.getElementById('company-pan')?.value.trim().toUpperCase() || '',
                cin: document.getElementById('company-cin')?.value.trim().toUpperCase() || '',
                licenseNumber: document.getElementById('company-license-number')?.value.trim() || '',
                licenseValidTill: document.getElementById('company-license-valid-till')?.value || '',
                address: document.getElementById('company-address')?.value.trim() || '',
                email: document.getElementById('company-email')?.value.trim() || '',
                phone: document.getElementById('company-phone')?.value.trim() || '',
                bankName: document.getElementById('company-bank-name')?.value.trim() || '',
                bankAccount: document.getElementById('company-bank-account')?.value.trim() || '',
                ifscCode: document.getElementById('company-ifsc-code')?.value.trim().toUpperCase() || '',
                invoicePrefix: document.getElementById('company-invoice-prefix')?.value.trim() || 'VY-',
                footerNote: document.getElementById('company-footer-note')?.value.trim() || 'This invoice is computer generated and does not require a signature.'
            };
        }

        async function saveCompanyProfile() {
            sanitizeCompanyField('company-gstin', 'gstin');
            sanitizeCompanyField('company-pan', 'pan');
            sanitizeCompanyField('company-ifsc-code', 'ifsc');
            if (!validateCompanyProfileForm()) return;

            const profile = extractCompanyProfileForm();
            profile.csrfToken = getCompanyCsrfToken();
            profile.tenantCode = profile.tenantCode.toUpperCase();
            AppState.companyProfile = profile;
            saveState();
            try {
                const response = await fetch('api.php?action=save_company_profile', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ profile })
                });
                const payload = await response.json();
                if (payload.success && payload.profile) {
                    AppState.companyProfile = payload.profile;
                    saveState();
                    await loadCompanyProfiles();
                    populateCompanySetupForm();
                    const isNew = profile.id === 0 || !profile.id;
                    showSystemToast('success', isNew ? 'Account created successfully' : 'Account updated successfully', 'Company profile and license details have been persisted to the database.');
                    logToSystem('success', 'Company profile updated', 'Company metadata persisted in database.');
                    return;
                }
                throw new Error(payload.error || 'Unable to save profile');
            } catch (err) {
                console.warn('Company profile save failed:', err);
                showSystemToast('error', 'Save Failed', 'Unable to persist company profile to the database.');
            }
        }

        function closeModal(id) {
            const modal = document.getElementById(id);
            if (!modal) return;
            modal.classList.remove('translate-y-0', 'opacity-100');
            modal.classList.add('translate-y-full', 'opacity-0', 'pointer-events-none');
        }

        function closeAllOverlays() {
            const overlays = document.querySelectorAll('.overlay-slide');
            overlays.forEach(overlay => {
                overlay.classList.remove('translate-y-0', 'opacity-100');
                overlay.classList.add('translate-y-full', 'opacity-0', 'pointer-events-none');
            });
            // Also explicitly hide bank settlement
            const settle = document.getElementById('modal-bank-settlement');
            if (settle) settle.classList.add('hidden');
        }

        function toggleElement(id) {
            const target = document.getElementById(id);
            if (!target) return;
            if (target.classList.contains('hidden')) {
                target.classList.remove('hidden');
                target.classList.add('flex');
            } else {
                target.classList.add('hidden');
                target.classList.remove('flex');
            }
        }

        function renderCatalog() {
            const grid = document.getElementById('pos-catalog-grid');
            if (!grid) return;
            
            grid.innerHTML = AppState.catalog.map(item => `
                <div onclick="addBillingItem('${item.name}', ${item.price})" class="glass-card rounded-xl p-4 cursor-pointer flex justify-between items-center">
                    <div>
                        <h4 class="font-bold text-white text-sm">${item.name}</h4>
                        <span class="code-font text-xs text-gray-400">₹${item.price.toFixed(2)}</span>
                    </div>
                    <span class="material-icons text-indigo-400 hover:text-white" style="color: var(--accent-primary)">add_circle</span>
                </div>
            `).join('');
        }

        function filterCatalog() {
            const query = document.getElementById('catalog-search-input').value.toLowerCase();
            const cards = document.querySelectorAll('#pos-catalog-grid > div');
            
            cards.forEach(card => {
                const title = card.querySelector('h4').textContent.toLowerCase();
                if (title.includes(query)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        function triggerBarcodeHardwareSim() {
            const scanner = document.getElementById('barcode-hardware-scanner');
            if (scanner.classList.contains('hidden')) {
                scanner.classList.remove('hidden');
                scanner.classList.add('flex');
                playPositiveSound();
            } else {
                scanner.classList.add('hidden');
                scanner.classList.remove('flex');
            }
        }

        function simulateOpticalTrigger() {
            const randomIndex = Math.floor(Math.random() * AppState.catalog.length);
            const item = AppState.catalog[randomIndex];
            addBillingItem(item.name, item.price);
            
            playSuccessSound();
            showSystemToast('success', 'Optical Tag Decoded', `${item.name} read successfully from tag.`);
            triggerBarcodeHardwareSim();
        }

        function registerCustomProduct() {
            const nameInput = document.getElementById('custom-prod-name');
            const priceInput = document.getElementById('custom-prod-price');
            
            if (!nameInput || !priceInput) return;
            const name = nameInput.value.trim();
            const price = parseFloat(priceInput.value);
            
            if (!name || isNaN(price) || price <= 0) {
                logToSystem('warning', 'Product registration failed: Invalid descriptors.');
                return;
            }
            
            AppState.catalog.push({ name, price, category: "Custom", costPrice: Math.round(price * 0.8), mrp: Math.round(price * 1.1) });
            AppState.inventory.push({ name, stock: 15 });
            
            nameInput.value = '';
            priceInput.value = '';
            toggleElement('custom-product-form');
            
            renderCatalog();
            rebuildVaultInventory();
            populatePurchaseDeskDropdowns();
            populateSalesDeskDropdowns();
            populateReturnsDropdown();
            updateWorkspaceScorecard();
            saveState();
            logToSystem('success', `Product "${name}" registered into catalog`, `Sells at ₹${price}`);
            
            logComplianceAudit("Product catalog additions", "INVENTORY");
        }

        function addBillingItem(name, price) {
            const item = AppState.cart.find(c => c.name === name);
            if (item) {
                item.qty++;
            } else {
                AppState.cart.push({ name, price, qty: 1 });
            }
            playTypingClick();
            rebuildCartUI();
        }

        function changeCartQty(index, offset) {
            AppState.cart[index].qty += offset;
            if (AppState.cart[index].qty <= 0) {
                AppState.cart.splice(index, 1);
            }
            rebuildCartUI();
        }

        function rebuildCartUI() {
            const tbody = document.getElementById('billing-items-tbody');
            if (!tbody) return;
            
            if (AppState.cart.length === 0) {
                tbody.innerHTML = `
                    <tr id="empty-cart-message">
                        <td colspan="4" class="text-center py-8 text-gray-500">Inflow Cart is empty. Click items above to insert.</td>
                    </tr>
                `;
                const subEl = document.getElementById('pos-subtotal');
                const taxEl = document.getElementById('pos-tax');
                const grandEl = document.getElementById('pos-grand-total');
                if (subEl) subEl.textContent = '₹0.00';
                if (taxEl) taxEl.textContent = '₹0.00';
                if (grandEl) grandEl.textContent = '₹0.00';
                return;
            }

            let html = '';
            let subtotal = 0;
            AppState.cart.forEach((item, idx) => {
                const itemTotal = item.price * item.qty;
                subtotal += itemTotal;
                html += `
                    <tr class="text-gray-300">
                        <td class="py-3 font-semibold">${item.name}</td>
                        <td class="py-3 code-font">₹${item.price.toFixed(2)}</td>
                        <td class="py-3 text-center">
                            <div class="inline-flex items-center gap-2">
                                <button onclick="changeCartQty(${idx}, -1)" class="w-5 h-5 rounded bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer">-</button>
                                <span class="code-font text-xs w-6 block text-center">${item.qty}</span>
                                <button onclick="changeCartQty(${idx}, 1)" class="w-5 h-5 rounded bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer">+</button>
                            </div>
                        </td>
                        <td class="py-3 text-right code-font font-bold">₹${itemTotal.toFixed(2)}</td>
                    </tr>
                `;
            });
            tbody.innerHTML = html;

            const tax = subtotal * 0.18;
            const grandTotal = subtotal + tax;

            const subEl = document.getElementById('pos-subtotal');
            const taxEl = document.getElementById('pos-tax');
            const grandEl = document.getElementById('pos-grand-total');
            if (subEl) subEl.textContent = `₹${subtotal.toLocaleString()}`;
            if (taxEl) taxEl.textContent = `₹${tax.toLocaleString()}`;
            if (grandEl) grandEl.textContent = `₹${grandTotal.toLocaleString()}`;
        }

        function commitInflowCheckout() {
            if (AppState.cart.length === 0) {
                logToSystem('warning', 'Billing aborted: POS terminal cart is empty.');
                return;
            }

            let purchaseTotal = 0;
            AppState.cart.forEach(item => {
                purchaseTotal += item.price * item.qty;
                const invItem = AppState.inventory.find(i => i.name === item.name);
                if (invItem) {
                    invItem.stock = Math.max(0, invItem.stock - item.qty);
                }
            });

            const simulatedTax = purchaseTotal * 0.18;
            const simulatedTotal = purchaseTotal + simulatedTax;
            
            AppState.revenue += simulatedTotal;
            
            const refID = `TX-${Math.floor(100 + Math.random() * 900)}-INFLOW`;
            const timeStr = new Date().toLocaleString();
            AppState.ledger.push({
                ref: refID,
                time: timeStr,
                debit: "Cash/UPI Account",
                credit: "Inventory Sales",
                type: "inflow",
                amount: parseFloat(simulatedTotal.toFixed(2))
            });

            announceWithChetanVoice(`Checkout complete. Collected ${Math.round(simulatedTotal)} Rupees.`);

            generateThermalSlip(refID, timeStr, purchaseTotal, simulatedTax, simulatedTotal);
            logToSystem('success', `Invoice checkout compiled dynamically`, `Value: ₹${simulatedTotal.toLocaleString()} &bull; Balance added`);
            
            logComplianceAudit(`POS Billing checkout committed. ID: ${refID}`, "BILLING");

            AppState.cart = [];
            rebuildCartUI();
            closeModal('modal-inflow');

            AppState.lowStockCount = AppState.inventory.filter(item => item.stock <= AppState.lowStockThreshold).length;
            rebuildVaultInventory();
            rebuildLedger();
            rebuildSalesRegistry();
            rebuildTaxLedger();
            updateWorkspaceScorecard();
            updateDashboardCounters();
            saveState();
        }

        function generateThermalSlip(refID, timeStr, subtotal, tax, grandTotal) {
            const refEl = document.getElementById('receipt-invoice-ref');
            const timeEl = document.getElementById('receipt-invoice-time');
            const subEl = document.getElementById('receipt-subtotal');
            const taxEl = document.getElementById('receipt-gst');
            const grandEl = document.getElementById('receipt-grand');
            
            if (refEl) refEl.textContent = `REF: ${refID}`;
            if (timeEl) timeEl.textContent = timeStr;
            
            const listContainer = document.getElementById('receipt-items-list');
            if (listContainer) {
                listContainer.innerHTML = AppState.cart.map(item => `
                    <tr class="text-[10px]">
                        <td class="py-1 font-bold">${item.name}</td>
                        <td class="py-1 text-center font-bold">${item.qty}</td>
                        <td class="py-1 text-right font-bold">₹${(item.price * item.qty).toLocaleString()}</td>
                    </tr>
                `).join('');
            }

            if (subEl) subEl.textContent = `₹${subtotal.toLocaleString()}`;
            if (taxEl) taxEl.textContent = `₹${tax.toLocaleString()}`;
            if (grandEl) grandEl.textContent = `₹${grandTotal.toLocaleString()}`;
            
            openModal('modal-thermal-receipt');
            playSuccessSound();
        }

        function copyRawReceipt() {
            const refEl = document.getElementById('receipt-invoice-ref');
            const timeEl = document.getElementById('receipt-invoice-time');
            const grandEl = document.getElementById('receipt-grand');
            
            const rawText = `
VYAPAAR CORE - ENTERPRISE COGNITIVE RECEIPT
${refEl ? refEl.textContent : 'REF: TX-XXX-INFLOW'}
${timeEl ? timeEl.textContent : new Date().toLocaleString()}
---------------------------------------------
Items Total: ${grandEl ? grandEl.textContent : '₹0.00'}
---------------------------------------------
THANK YOU FOR YOUR TRANSACTION
            `;
            const tempTextArea = document.createElement("textarea");
            tempTextArea.value = rawText;
            document.body.appendChild(tempTextArea);
            tempTextArea.select();
            document.execCommand('copy');
            document.body.removeChild(tempTextArea);
            showSystemToast('success', 'Copied', 'Raw text receipt saved to clipboard.');
        }

        function rebuildLedger() {
            const tbody = document.getElementById('ledger-items-tbody');
            if (!tbody) return;

            const grossInflows = AppState.ledger.filter(x => x.type === 'inflow').reduce((sum, x) => sum + x.amount, 0);
            const grossExpenses = AppState.ledger.filter(x => x.type === 'expense').reduce((sum, x) => sum + x.amount, 0);
            const netCash = grossInflows - grossExpenses;
            const profitMargin = grossInflows > 0 ? Math.round((netCash / grossInflows) * 100) : 100;

            document.getElementById('ledger-inflows-sum').textContent = `₹${grossInflows.toLocaleString()}`;
            document.getElementById('ledger-expenses-sum').textContent = `₹${grossExpenses.toLocaleString()}`;
            document.getElementById('ledger-net-cash').textContent = `₹${netCash.toLocaleString()}`;
            document.getElementById('ledger-profit-margin').textContent = `${profitMargin}%`;

            let filteredLedger = AppState.ledger;
            if (AppState.ledgerFilter === 'inflow') filteredLedger = AppState.ledger.filter(x => x.type === 'inflow');
            if (AppState.ledgerFilter === 'expense') filteredLedger = AppState.ledger.filter(x => x.type === 'expense');

            tbody.innerHTML = filteredLedger.map(item => `
                <tr class="text-gray-300">
                    <td class="py-3 code-font ${item.type === 'expense' ? 'text-rose-400' : 'text-indigo-400'}" style="color: ${item.type === 'expense' ? '#f43f5e' : 'var(--accent-primary)'}">${item.ref}</td>
                    <td class="py-3">${item.time}</td>
                    <td class="py-3 font-semibold ${item.type === 'expense' ? 'text-rose-400' : 'text-emerald-400'}">${item.debit}</td>
                    <td class="py-3">${item.credit}</td>
                    <td class="py-3 text-right code-font font-bold ${item.type === 'expense' ? 'text-rose-400' : 'text-emerald-400'}">₹${item.amount.toLocaleString()}</td>
                </tr>
            `).join('');
        }

        function setLedgerFilter(type) {
            AppState.ledgerFilter = type;
            ['all', 'inflow', 'expense'].forEach(t => {
                const el = document.getElementById(`filter-${t}`);
                if (t === type) {
                    el.className = "px-3 py-1.5 text-xs font-bold rounded-lg bg-indigo-600 text-white cursor-pointer transition";
                    el.style.backgroundColor = "var(--accent-primary)";
                } else {
                    el.className = "px-3 py-1.5 text-xs font-bold rounded-lg bg-gray-900 border border-gray-800 text-gray-400 hover:text-white cursor-pointer transition";
                    el.style.backgroundColor = "";
                }
            });
            rebuildLedger();
        }

        function registerCustomExpense() {
            const descInput = document.getElementById('expense-desc');
            const valInput = document.getElementById('expense-val');

            const desc = descInput.value.trim();
            const val = parseFloat(valInput.value);

            if (!desc || isNaN(val) || val <= 0) {
                logToSystem('warning', 'Expense registration rejected: Missing descriptor.');
                return;
            }

            const refID = `TX-${Math.floor(100 + Math.random() * 900)}-EXPENSE`;
            const timeStr = new Date().toLocaleString();

            AppState.ledger.push({
                ref: refID,
                time: timeStr,
                debit: "Expense Control Account",
                credit: desc,
                type: "expense",
                amount: val
            });

            descInput.value = '';
            valInput.value = '';
            toggleElement('custom-expense-form');

            rebuildLedger();
            updateWorkspaceScorecard();
            logToSystem('warning', `Registered direct capital expense: ${desc}`, `Outflow: ₹${val.toLocaleString()}`);
            
            logComplianceAudit(`Registered manual capital expense: ${desc}`, "EXPENSES");
            
            saveState();
        }

        function validateLiveGstin(inputId, badgeId) {
            const inputEl = document.getElementById(inputId);
            const badge = document.getElementById(badgeId);
            if (!inputEl || !badge) return;
            const val = inputEl.value.trim();
            const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
            
            if (!val) {
                badge.textContent = "";
                return;
            }
            if (gstRegex.test(val.toUpperCase())) {
                badge.textContent = "VERIFIED";
                badge.className = "absolute right-3 top-3 text-[9px] text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-500/20 font-bold uppercase tracking-wider";
            } else {
                badge.textContent = "INVALID FORMAT";
                badge.className = "absolute right-3 top-3 text-[9px] text-rose-400 bg-rose-950/40 px-1.5 py-0.5 rounded border border-rose-500/20 font-bold uppercase tracking-wider";
            }
        }

        function switchDirectoryTab(tab) {
            AppState.activeDirTab = tab;
            ['dealers', 'retailers', 'clients'].forEach(t => {
                const btn = document.getElementById(`dir-tab-${t}`);
                const form = document.getElementById(`dir-form-${t}`);
                const grid = document.getElementById(`dir-grid-${t}`);
                
                if (btn) {
                    if(t === tab) {
                        btn.className = "px-4 py-2 text-xs font-bold rounded-lg bg-indigo-600 text-white cursor-pointer transition flex items-center gap-1";
                        btn.style.backgroundColor = "var(--accent-primary)";
                        if(form) form.classList.remove('hidden');
                        if(grid) grid.classList.remove('hidden');
                    } else {
                        btn.className = "px-4 py-2 text-xs font-bold rounded-lg bg-gray-900 text-gray-400 hover:text-white cursor-pointer transition flex items-center gap-1";
                        btn.style.backgroundColor = "";
                        if(form) form.classList.add('hidden');
                        if(grid) grid.classList.add('hidden');
                    }
                }
            });
            saveState();
        }

        function rebuildDirectoriesUI() {
            rebuildDealersGrid();
            rebuildRetailersGrid();
            rebuildCRM();
            switchDirectoryTab(AppState.activeDirTab);
        }

        function rebuildDealersGrid() {
            const tbody = document.getElementById('dir-dealers-tbody');
            if (!tbody || !AppState.dealers) return;

            tbody.innerHTML = AppState.dealers.map((dlr, idx) => `
                <tr class="text-slate-300 align-top">
                    <td class="py-3 px-2 align-top min-w-0 w-[26%]">
                        <strong class="text-white text-xs block whitespace-nowrap truncate">${dlr.name}</strong>
                        <span class="code-font text-[10px] text-indigo-400 block mt-0.5 whitespace-nowrap truncate">${dlr.gst || "No GST Registration"}</span>
                    </td>
                    <td class="py-3 px-2 align-top text-xs w-[26%] min-w-0">
                        <span class="block text-gray-400 font-medium whitespace-nowrap truncate">${dlr.phone}</span>
                        <span class="block text-[10px] text-gray-500 truncate" title="${dlr.address}">${dlr.address}</span>
                    </td>
                    <td class="py-3 px-2 align-top w-[26%] min-w-0">
                        <div class="bg-gray-950/40 border border-gray-900 rounded p-1.5 text-[10px] leading-relaxed whitespace-nowrap overflow-hidden">
                            <span class="text-indigo-400 font-bold block truncate">${dlr.bank || "No bank data"}</span>
                            <span class="text-slate-300 block truncate">Acc: ${dlr.acc || "--"}</span>
                            <span class="text-slate-500 block code-font truncate">IFSC: ${dlr.ifsc || "--"}</span>
                        </div>
                    </td>
                    <td class="py-3 px-2 align-top text-right w-[13%] min-w-0">
                        <span class="block code-font font-bold text-rose-400 mb-1 whitespace-nowrap">₹${(dlr.outstanding || 0).toLocaleString()}</span>
                        <button onclick="openBankSettlement('dealers', ${idx})" class="px-2 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded text-[9px] font-bold cursor-pointer transition whitespace-nowrap">
                            Pay NEFT/RTGS
                        </button>
                    </td>
                    <td class="py-3 px-2 align-top text-center w-[9%] min-w-[80px]">
                        <div class="flex items-center justify-center gap-1">
                            <button title="Edit wholesaler" onclick="startDirectoryEdit('dealers', ${idx})" class="p-1 rounded bg-indigo-500/10 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 transition cursor-pointer">
                                <span class="material-icons text-[13px]">edit</span>
                            </button>
                            <button title="Delete wholesaler" onclick="deleteDirectoryRecord('dealers', ${idx})" class="p-1 rounded bg-rose-500/10 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 transition cursor-pointer">
                                <span class="material-icons text-[13px]">delete</span>
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('');
        }

        function rebuildRetailersGrid() {
            const tbody = document.getElementById('dir-retailers-tbody');
            if (!tbody || !AppState.retailers) return;

            tbody.innerHTML = AppState.retailers.map((rtl, idx) => `
                <tr class="text-slate-300 align-top">
                    <td class="py-3 px-2 align-top min-w-0 w-[26%]">
                        <strong class="text-white text-xs block whitespace-nowrap truncate">${rtl.name}</strong>
                        <span class="code-font text-[10px] text-emerald-400 block mt-0.5 whitespace-nowrap truncate">${rtl.gst || "No GST Registered"}</span>
                    </td>
                    <td class="py-3 px-2 align-top text-xs w-[26%] min-w-0">
                        <span class="block text-gray-400 font-medium whitespace-nowrap truncate">${rtl.phone}</span>
                        <span class="block text-[10px] text-gray-500 truncate" title="${rtl.address}">${rtl.address}</span>
                    </td>
                    <td class="py-3 px-2 align-top w-[26%] min-w-0">
                        <div class="bg-gray-950/40 border border-gray-900 rounded p-1.5 text-[10px] leading-relaxed whitespace-nowrap overflow-hidden">
                            <span class="text-indigo-400 font-bold block truncate">${rtl.bank || "No bank data"}</span>
                            <span class="text-slate-300 block truncate">Acc: ${rtl.acc || "--"}</span>
                            <span class="text-slate-500 block code-font truncate">IFSC: ${rtl.ifsc || "--"}</span>
                        </div>
                    </td>
                    <td class="py-3 px-2 align-top text-right w-[13%] min-w-0">
                        <span class="block code-font font-bold text-emerald-400 mb-1 whitespace-nowrap">₹${(rtl.balance || 0).toLocaleString()}</span>
                        <button onclick="openBankSettlement('retailers', ${idx})" class="px-2 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 rounded text-[9px] font-bold cursor-pointer transition whitespace-nowrap">
                            Settle Inward
                        </button>
                    </td>
                    <td class="py-3 px-2 align-top text-center w-[9%] min-w-[80px]">
                        <div class="flex items-center justify-center gap-1">
                            <button title="Edit retailer" onclick="startDirectoryEdit('retailers', ${idx})" class="p-1 rounded bg-emerald-500/10 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 transition cursor-pointer">
                                <span class="material-icons text-[13px]">edit</span>
                            </button>
                            <button title="Delete retailer" onclick="deleteDirectoryRecord('retailers', ${idx})" class="p-1 rounded bg-rose-500/10 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 transition cursor-pointer">
                                <span class="material-icons text-[13px]">delete</span>
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('');
        }

        let activeSettlementTarget = null; 

        function openBankSettlement(type, idx) {
            playPositiveSound();
            activeSettlementTarget = { type, idx };
            const item = AppState[type][idx];
            
            const nameEl = document.getElementById('settle-target-name');
            const gstEl = document.getElementById('settle-target-gst');
            const bankEl = document.getElementById('settle-target-bank');
            const ifscEl = document.getElementById('settle-target-ifsc');
            const amtIn = document.getElementById('settle-amount-input');
            const modalSettle = document.getElementById('modal-bank-settlement');

            if (nameEl) nameEl.textContent = item.name;
            if (gstEl) gstEl.textContent = item.gst || "UNREGISTERED";
            if (bankEl) bankEl.textContent = `${item.bank || '--'} (Acc: ${item.acc || '--'})`;
            if (ifscEl) ifscEl.textContent = item.ifsc || "N/A";
            if (amtIn) amtIn.value = type === 'dealers' ? item.outstanding : item.balance;
            
            if (modalSettle) modalSettle.classList.remove('hidden');
        }

        function closeBankSettlementModal() {
            const modalSettle = document.getElementById('modal-bank-settlement');
            if (modalSettle) modalSettle.classList.add('hidden');
            activeSettlementTarget = null;
        }

        function commitBankSettlement() {
            if(!activeSettlementTarget) return;
            const amtIn = document.getElementById('settle-amount-input');
            const amt = amtIn ? (parseFloat(amtIn.value) || 0) : 0;
            if(amt <= 0) {
                showSystemToast('error', 'Invalid Sum', 'Ensure settlement amount registers above ₹0.00');
                return;
            }

            const { type, idx } = activeSettlementTarget;
            const entity = AppState[type][idx];

            const refID = `TX-${Math.floor(100 + Math.random() * 900)}-BANKSETTLE`;
            const timeStr = new Date().toLocaleString();

            if (type === 'dealers') {
                entity.outstanding = Math.max(0, entity.outstanding - amt);
                AppState.expenses += amt;
                AppState.ledger.push({
                    ref: refID,
                    time: timeStr,
                    debit: "Procurement clearing account",
                    credit: `Bank Outward Wire to Wholesaler: ${entity.name}`,
                    type: "expense",
                    amount: amt
                });
                logToSystem('warning', `Dispatched NEFT payout wire to ${entity.name}`, `Amount: ₹${amt.toLocaleString()}`);
                logComplianceAudit(`Dispatched bank outstanding settlement payload to wholesaler: ${entity.name}`, "DEALERS");
            } else {
                entity.balance = Math.max(0, entity.balance - amt);
                AppState.revenue += amt;
                AppState.ledger.push({
                    ref: refID,
                    time: timeStr,
                    debit: "Secure Settlement Bank Clearing",
                    credit: `Inward Settlement from Retail Partner: ${entity.name}`,
                    type: "inflow",
                    amount: amt
                });
                logToSystem('success', `Settlement cleared from retailer: ${entity.name}`, `Amount: ₹${amt.toLocaleString()}`);
                logComplianceAudit(`Received bank settlement balance payload from retailer: ${entity.name}`, "RETAILERS");
            }

            closeBankSettlementModal();
            rebuildDirectoriesUI();
            rebuildLedger();
            updateWorkspaceScorecard();
            updateDashboardCounters();
            saveState();
            showSystemToast('success', 'IMPS/RTGS Secure Settlement Confirmed', 'The dynamic balance clearing process has updated ledger state variables.');
        }

        function addNewDealer() {
            const name = document.getElementById('dealer-add-name').value.trim();
            const gst = document.getElementById('dealer-add-gst').value.trim();
            const address = document.getElementById('dealer-add-address').value.trim();
            const phone = document.getElementById('dealer-add-phone').value.trim();
            const bank = document.getElementById('dealer-add-bank-name').value.trim();
            const acc = document.getElementById('dealer-add-bank-acc').value.trim();
            const ifsc = document.getElementById('dealer-add-bank-ifsc').value.trim();
            const editIndex = parseInt(document.getElementById('dealer-edit-index').value || '-1', 10);

            if (!name || !phone) {
                showSystemToast('error', 'Missing Data Fields', 'Onboarding requires at least dealer name and contact coordinates.');
                return;
            }

            const payload = { name, gst, address, phone, bank, acc, ifsc, outstanding: 0 };
            if (editIndex >= 0 && AppState.dealers[editIndex]) {
                AppState.dealers[editIndex] = { ...AppState.dealers[editIndex], ...payload };
                showSystemToast('success', 'Dealer updated', `${name} is synchronized in the directory.`);
                logComplianceAudit(`Updated wholesale dealer profile: ${name}`, "DEALERS");
            } else {
                AppState.dealers.push(payload);
                logToSystem('success', `Onboarded wholesale dealer: ${name}`, `GSTIN: ${gst || 'No GST registry'}`);
                logComplianceAudit(`Onboarded wholesale dealer profile: ${name}`, "DEALERS");
            }
            
            document.getElementById('dealer-add-name').value = '';
            document.getElementById('dealer-add-gst').value = '';
            document.getElementById('dealer-add-address').value = '';
            document.getElementById('dealer-add-phone').value = '';
            document.getElementById('dealer-add-bank-name').value = '';
            document.getElementById('dealer-add-bank-acc').value = '';
            document.getElementById('dealer-add-bank-ifsc').value = '';
            document.getElementById('dealer-gst-status').textContent = '';
            document.getElementById('dealer-edit-index').value = '';
            document.getElementById('dealer-submit-btn').textContent = 'Onboard Wholesaler';
            document.getElementById('dealer-cancel-edit-btn').classList.add('hidden');

            rebuildDirectoriesUI();
            populatePurchaseDeskDropdowns();
            saveState();
        }

        function addNewRetailer() {
            const name = document.getElementById('retailer-add-name').value.trim();
            const gst = document.getElementById('retailer-add-gst').value.trim();
            const address = document.getElementById('retailer-add-address').value.trim();
            const phone = document.getElementById('retailer-add-phone').value.trim();
            const bank = document.getElementById('retailer-add-bank-name').value.trim();
            const acc = document.getElementById('retailer-add-bank-acc').value.trim();
            const ifsc = document.getElementById('retailer-add-bank-ifsc').value.trim();
            const editIndex = parseInt(document.getElementById('retailer-edit-index').value || '-1', 10);

            if (!name || !phone) {
                showSystemToast('error', 'Missing Data Fields', 'Onboarding requires retailer name and direct contact coordinates.');
                return;
            }

            const payload = { name, gst, address, phone, bank, acc, ifsc, balance: 0 };
            if (editIndex >= 0 && AppState.retailers[editIndex]) {
                AppState.retailers[editIndex] = { ...AppState.retailers[editIndex], ...payload };
                showSystemToast('success', 'Retailer updated', `${name} is synchronized in the directory.`);
                logComplianceAudit(`Updated retailer partner profile: ${name}`, "RETAILERS");
            } else {
                AppState.retailers.push(payload);
                logToSystem('success', `Onboarded retailer / small vendor partner: ${name}`, `GSTIN: ${gst || 'Non-GST B2B Partner'}`);
                logComplianceAudit(`Onboarded retailer partner profile: ${name}`, "RETAILERS");
            }

            document.getElementById('retailer-add-name').value = '';
            document.getElementById('retailer-add-gst').value = '';
            document.getElementById('retailer-add-address').value = '';
            document.getElementById('retailer-add-phone').value = '';
            document.getElementById('retailer-add-bank-name').value = '';
            document.getElementById('retailer-add-bank-acc').value = '';
            document.getElementById('retailer-add-bank-ifsc').value = '';
            document.getElementById('retailer-gst-status').textContent = '';
            document.getElementById('retailer-edit-index').value = '';
            document.getElementById('retailer-submit-btn').textContent = 'Onboard Retailer';
            document.getElementById('retailer-cancel-edit-btn').classList.add('hidden');

            rebuildDirectoriesUI();
            populateSalesDeskDropdowns();
            saveState();
        }

        function populatePurchaseDeskDropdowns() {
            const pSel = document.getElementById('pur-item-select');
            const dlrSel = document.getElementById('pur-dealer-select');
            if (pSel) {
                pSel.innerHTML = AppState.catalog.map(item => `
                    <option value="${item.name}">${item.name}</option>
                `).join('');
                autoFillPurchaseRates();
            }
            if (dlrSel) {
                dlrSel.innerHTML = AppState.dealers.map(dlr => `
                    <option value="${dlr.name}">${dlr.name}</option>
                `).join('');
                updateDealerTelemetry();
            }
            renderPurchaseBatch();
            calculatePurchaseBatchTotals();
            renderPurchaseInventoryTable();
        }

        function updateDealerTelemetry() {
            const dlrSel = document.getElementById('pur-dealer-select');
            if (!dlrSel) return;
            const name = dlrSel.value;
            const dealer = AppState.dealers.find(d => d.name === name);
            if(dealer) {
                const gstLabel = document.getElementById('pur-dealer-meta-gst');
                const bankLabel = document.getElementById('pur-dealer-meta-bank');
                if (gstLabel) gstLabel.textContent = dealer.gst || "Unregistered (B2C)";
                if (bankLabel) bankLabel.textContent = dealer.bank ? `${dealer.bank} (A/C: ${dealer.acc})` : "No bank linked";
            }
        }

        function autoFillPurchaseRates() {
            const itemSel = document.getElementById('pur-item-select');
            if (!itemSel) return;
            const name = itemSel.value;
            const item = AppState.catalog.find(x => x.name === name);
            if (item) {
                const mrpEl = document.getElementById('pur-mrp');
                const rateEl = document.getElementById('pur-rate');
                const sRateEl = document.getElementById('pur-selling-rate');
                
                if (mrpEl) mrpEl.value = item.mrp || Math.round(item.price * 1.1);
                if (rateEl) rateEl.value = item.costPrice || Math.round(item.price * 0.8);
                if (sRateEl) sRateEl.value = item.price;
                calculatePurchaseTotal();
            }
        }

        function calculatePurchaseTotal() {
            const qtyEl = document.getElementById('pur-qty');
            const rateEl = document.getElementById('pur-rate');
            const sellingRateEl = document.getElementById('pur-selling-rate');
            const discountEl = document.getElementById('pur-discount');
            const gstEl = document.getElementById('pur-gst');
            const schemeEl = document.getElementById('pur-scheme');

            if (!qtyEl || !rateEl) return; // Defensive guard

            const qty = parseInt(qtyEl.value) || 0;
            const rate = parseFloat(rateEl.value) || 0;
            const sellingRate = sellingRateEl ? (parseFloat(sellingRateEl.value) || 0) : 0;
            const discountPercent = discountEl ? (parseFloat(discountEl.value) || 0) : 0;
            const gstPercent = gstEl ? (parseFloat(gstEl.value) || 0) : 0;
            const scheme = schemeEl ? schemeEl.value : 'none';

            let basePrice = qty * rate;

            let schemeDeduction = 0;
            if (scheme === '10+1' && qty >= 11) {
                const freeUnits = Math.floor(qty / 11);
                schemeDeduction = freeUnits * rate;
            } else if (scheme === '20+1' && qty >= 21) {
                const freeUnits = Math.floor(qty / 21);
                schemeDeduction = freeUnits * rate;
            } else if (scheme === 'bulk_10') {
                schemeDeduction = basePrice * 0.10;
            }

            let priceAfterScheme = basePrice - schemeDeduction;
            const discountDeduction = priceAfterScheme * (discountPercent / 100);
            let priceAfterDiscount = priceAfterScheme - discountDeduction;

            const gstAmount = priceAfterDiscount * (gstPercent / 100);
            const finalTotal = priceAfterDiscount + gstAmount;

            let marginPercent = 0;
            if (rate > 0) {
                marginPercent = ((sellingRate - rate) / rate) * 100;
            }

            const baseLabel = document.getElementById('calc-pur-base');
            const discLabel = document.getElementById('calc-pur-disc');
            const gstLabel = document.getElementById('calc-pur-gst');
            const marginLabel = document.getElementById('calc-pur-margin');
            const grandTotalLabel = document.getElementById('pur-grand-total');

            if (baseLabel) baseLabel.textContent = `₹${basePrice.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}`;
            if (discLabel) discLabel.textContent = `-₹${(schemeDeduction + discountDeduction).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}`;
            if (gstLabel) gstLabel.textContent = `+₹${gstAmount.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}`;
            
            if (marginLabel) {
                marginLabel.textContent = `${marginPercent.toFixed(1)}% Markup`;
                if (sellingRate < rate) {
                    marginLabel.className = 'text-rose-400 font-bold';
                    marginLabel.textContent = `${marginPercent.toFixed(1)}% LOSS WARNING`;
                } else {
                    marginLabel.className = 'text-emerald-400 font-bold';
                }
            }

            if (grandTotalLabel) {
                const lineTotalText = `₹${finalTotal.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}`;
                grandTotalLabel.textContent = purchaseCartItems.length ? document.getElementById('pur-batch-net')?.textContent || lineTotalText : lineTotalText;
            }

            calculatePurchaseBatchTotals();
        }

        function renderPurchaseInventoryTable() {
            const tbody = document.getElementById('purchase-desk-products-tbody');
            if (!tbody) return;
            if (!AppState.catalog || !AppState.catalog.length) {
                tbody.innerHTML = `<tr><td colspan="6" class="py-6 text-center text-gray-500">No products are currently saved in the system catalog.</td></tr>`;
                return;
            }

            tbody.innerHTML = AppState.catalog.map(item => {
                const invItem = AppState.inventory.find(inv => inv.name === item.name) || { stock: 0 };
                return `
                    <tr class="border-b border-gray-800">
                        <td class="px-3 py-3 text-white text-[12px]">${item.name}</td>
                        <td class="px-3 py-3 text-gray-300">₹${item.mrp?.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2}) || '0.00'}</td>
                        <td class="px-3 py-3 text-gray-300">₹${item.costPrice?.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2}) || '0.00'}</td>
                        <td class="px-3 py-3 text-gray-300">₹${item.price?.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2}) || '0.00'}</td>
                        <td class="px-3 py-3 text-gray-300">${item.gst ?? '0'}%</td>
                        <td class="px-3 py-3 text-center font-semibold ${invItem.stock <= AppState.lowStockThreshold ? 'text-amber-300' : 'text-slate-200'}">${invItem.stock}</td>
                    </tr>
                `;
            }).join('');
        }

        function togglePurchaseProductPanel() {
            const panel = document.getElementById('purchase-desk-product-panel');
            if (!panel) return;
            panel.classList.toggle('hidden');
            if (!panel.classList.contains('hidden')) {
                setTimeout(() => document.getElementById('pd-name')?.focus(), 100);
            }
        }

        function resetPurchaseDeskProductForm() {
            ['pd-name','pd-mrp','pd-purchase-rate','pd-selling-rate','pd-gst','pd-discount','pd-qty'].forEach(id => {
                const input = document.getElementById(id);
                if (!input) return;
                if (id === 'pd-qty') input.value = '1';
                else if (id === 'pd-gst') input.value = '18';
                else if (id === 'pd-discount') input.value = '0';
                else input.value = '';
            });
        }

        function addNewPurchaseProduct() {
            const name = document.getElementById('pd-name')?.value.trim() || '';
            const mrp = parseFloat(document.getElementById('pd-mrp')?.value) || 0;
            const purchaseRate = parseFloat(document.getElementById('pd-purchase-rate')?.value) || 0;
            const sellingRate = parseFloat(document.getElementById('pd-selling-rate')?.value) || 0;
            const gst = parseFloat(document.getElementById('pd-gst')?.value) || 0;
            const scheme = document.getElementById('pd-scheme')?.value || 'none';
            const discount = parseFloat(document.getElementById('pd-discount')?.value) || 0;
            const qty = parseInt(document.getElementById('pd-qty')?.value) || 0;

            if (!name || mrp <= 0 || purchaseRate <= 0 || sellingRate <= 0 || qty <= 0) {
                showSystemToast('error', 'Incomplete product data', 'Please complete all fields and enter valid numeric values.');
                return;
            }

            const existingProduct = AppState.catalog.find(item => item.name === name);
            if (existingProduct) {
                existingProduct.mrp = mrp;
                existingProduct.costPrice = purchaseRate;
                existingProduct.price = sellingRate;
                existingProduct.gst = gst;
                existingProduct.scheme = scheme;
                existingProduct.discount = discount;
            } else {
                AppState.catalog.push({
                    name,
                    mrp,
                    costPrice: purchaseRate,
                    price: sellingRate,
                    gst,
                    scheme,
                    discount
                });
            }

            const inventoryEntry = AppState.inventory.find(inv => inv.name === name);
            if (inventoryEntry) {
                inventoryEntry.stock = Math.max(0, inventoryEntry.stock + qty);
            } else {
                AppState.inventory.push({ name, stock: qty });
            }

            resetPurchaseDeskProductForm();
            renderPurchaseInventoryTable();
            populatePurchaseDeskDropdowns();
            populateSalesDeskDropdowns();
            renderCatalog();
            rebuildVaultInventory();
            updateWorkspaceScorecard();
            saveState();

            showSystemToast('success', 'Product registered', `${name} is now saved in the live product catalog.`);
            logComplianceAudit(`Purchase Desk registered product: ${name}`, 'INVENTORY');
        }

        function renderPurchaseBatch() {
            const tbody = document.getElementById('pur-batch-items-tbody');
            const countLabel = document.getElementById('pur-batch-summary-count');
            if (!tbody) return;

            if (!purchaseCartItems.length) {
                tbody.innerHTML = `<tr><td colspan="9" class="py-4 text-center text-gray-500">No batch items added yet</td></tr>`;
                if (countLabel) countLabel.textContent = '0 items';
                return;
            }

            tbody.innerHTML = purchaseCartItems.map((item, idx) => {
                const base = item.qty * item.cost;
                let schemeDeduction = 0;
                if (item.scheme === '10+1' && item.qty >= 11) schemeDeduction = Math.floor(item.qty / 11) * item.cost;
                else if (item.scheme === '20+1' && item.qty >= 21) schemeDeduction = Math.floor(item.qty / 21) * item.cost;
                else if (item.scheme === 'bulk_10') schemeDeduction = base * 0.10;
                const discountDeduction = (base - schemeDeduction) * (item.discount / 100);
                const taxable = base - schemeDeduction - discountDeduction;
                const gstAmount = taxable * (item.gst / 100);
                const lineTotal = taxable + gstAmount;

                return `
                    <tr class="border-b border-gray-800">
                        <td class="px-2 py-2 font-medium text-white">${item.product}</td>
                        <td class="px-2 py-2 text-gray-400">${item.batch}</td>
                        <td class="px-2 py-2 text-center text-gray-300">${item.qty}</td>
                        <td class="px-2 py-2 text-right text-gray-300">₹${item.cost.toLocaleString()}</td>
                        <td class="px-2 py-2 text-center text-gray-300">${item.scheme === 'none' ? 'None' : item.scheme}</td>
                        <td class="px-2 py-2 text-center text-gray-300">${item.discount}%</td>
                        <td class="px-2 py-2 text-center text-gray-300">${item.gst}%</td>
                        <td class="px-2 py-2 text-right text-emerald-400">₹${lineTotal.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
                        <td class="px-2 py-2 text-center"><button onclick="removePurchaseBatchItem(${idx})" class="text-rose-400 hover:text-rose-300 text-xs">Remove</button></td>
                    </tr>
                `;
            }).join('');

            if (countLabel) countLabel.textContent = `${purchaseCartItems.length} item${purchaseCartItems.length === 1 ? '' : 's'}`;
        }

        function calculatePurchaseBatchTotals() {
            let batchBase = 0;
            let batchDiscount = 0;
            let batchGst = 0;
            let batchNet = 0;

            purchaseCartItems.forEach(item => {
                const base = item.qty * item.cost;
                let schemeDeduction = 0;
                if (item.scheme === '10+1' && item.qty >= 11) schemeDeduction = Math.floor(item.qty / 11) * item.cost;
                else if (item.scheme === '20+1' && item.qty >= 21) schemeDeduction = Math.floor(item.qty / 21) * item.cost;
                else if (item.scheme === 'bulk_10') schemeDeduction = base * 0.10;

                const discountDeduction = (base - schemeDeduction) * (item.discount / 100);
                const taxable = base - schemeDeduction - discountDeduction;
                const gstAmount = taxable * (item.gst / 100);
                const lineTotal = taxable + gstAmount;

                batchBase += base;
                batchDiscount += schemeDeduction + discountDeduction;
                batchGst += gstAmount;
                batchNet += lineTotal;
            });

            const baseLabel = document.getElementById('pur-batch-base');
            const discLabel = document.getElementById('pur-batch-disc');
            const gstLabel = document.getElementById('pur-batch-gst');
            const netLabel = document.getElementById('pur-batch-net');
            const grandTotalLabel = document.getElementById('pur-grand-total');

            if (baseLabel) baseLabel.textContent = `₹${batchBase.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}`;
            if (discLabel) discLabel.textContent = `-₹${batchDiscount.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}`;
            if (gstLabel) gstLabel.textContent = `+₹${batchGst.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}`;
            if (netLabel) netLabel.textContent = `₹${batchNet.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}`;
            if (grandTotalLabel && purchaseCartItems.length) grandTotalLabel.textContent = netLabel.textContent;
        }

        function addProductToBatch() {
            const product = document.getElementById('pur-item-select').value;
            const batch = document.getElementById('pur-batch').value.trim() || 'B-GEN-01';
            const qty = parseInt(document.getElementById('pur-qty').value) || 0;
            const cost = parseFloat(document.getElementById('pur-rate').value) || 0;
            const mrp = parseFloat(document.getElementById('pur-mrp').value) || 0;
            const sellRate = parseFloat(document.getElementById('pur-selling-rate').value) || 0;
            const scheme = document.getElementById('pur-scheme').value;
            const discount = parseFloat(document.getElementById('pur-discount').value) || 0;
            const gst = parseFloat(document.getElementById('pur-gst').value) || 0;

            if (!product || qty <= 0 || cost <= 0) {
                showSystemToast('error', 'Batch Add Failed', 'Select an item, quantity, and valid wholesale cost before adding to batch.');
                return;
            }

            purchaseCartItems.push({ product, batch, qty, cost, mrp, sellRate, scheme, discount, gst });
            renderPurchaseBatch();
            calculatePurchaseBatchTotals();
            calculatePurchaseTotal();
            showSystemToast('success', 'Batch Updated', `${product} queued in the current purchase batch.`);
        }

        function removePurchaseBatchItem(index) {
            if (index < 0 || index >= purchaseCartItems.length) return;
            purchaseCartItems.splice(index, 1);
            renderPurchaseBatch();
            calculatePurchaseBatchTotals();
            calculatePurchaseTotal();
        }

        function clearPurchaseBatch() {
            purchaseCartItems = [];
            renderPurchaseBatch();
            calculatePurchaseBatchTotals();
            calculatePurchaseTotal();
            showSystemToast('success', 'Batch Cleared', 'All queued purchase items have been removed.');
        }

        function commitPurchaseOrder() {
            const dealerName = document.getElementById('pur-dealer-select').value;
            if (!dealerName) {
                showSystemToast('error', 'Purchase Refused', 'Select a supplier before posting the batch.');
                return;
            }

            if (!purchaseCartItems.length) {
                showSystemToast('error', 'Purchase Refused', 'Add at least one product to the procurement batch before posting.');
                return;
            }

            let totalQty = 0;
            let totalBase = 0;
            let totalDiscount = 0;
            let totalGst = 0;
            let totalNet = 0;

            purchaseCartItems.forEach(item => {
                const base = item.qty * item.cost;
                let schemeDeduction = 0;
                if (item.scheme === '10+1' && item.qty >= 11) schemeDeduction = Math.floor(item.qty / 11) * item.cost;
                else if (item.scheme === '20+1' && item.qty >= 21) schemeDeduction = Math.floor(item.qty / 21) * item.cost;
                else if (item.scheme === 'bulk_10') schemeDeduction = base * 0.10;

                const discountDeduction = (base - schemeDeduction) * (item.discount / 100);
                const taxable = base - schemeDeduction - discountDeduction;
                const gstAmount = taxable * (item.gst / 100);
                const lineTotal = taxable + gstAmount;

                totalQty += item.qty;
                totalBase += base;
                totalDiscount += schemeDeduction + discountDeduction;
                totalGst += gstAmount;
                totalNet += lineTotal;
            });

            const refID = `PO-${Math.floor(100 + Math.random() * 900)}-DEPT`;
            const timeStr = new Date().toLocaleString();
            const summaryName = purchaseCartItems.map(item => item.product).join(', ');

            AppState.purchases.push({
                ref: refID,
                supplier: dealerName,
                product: summaryName,
                qty: totalQty,
                mrp: 0,
                cost: totalBase,
                sellRate: 0,
                gst: 0,
                scheme: 'Batch',
                discount: 0,
                total: parseFloat(totalNet.toFixed(2)),
                batch: `BATCH-${refID}`,
                items: purchaseCartItems.map(item => ({ ...item })),
                time: timeStr
            });
            AppState.expenses += totalNet;

            const dealer = AppState.dealers.find(d => d.name === dealerName);
            if (dealer) {
                dealer.outstanding = (dealer.outstanding || 0) + totalNet;
            }

            purchaseCartItems.forEach(item => {
                const invItem = AppState.inventory.find(i => i.name === item.product);
                if (invItem) invItem.stock += item.qty;
            });

            AppState.ledger.push({
                ref: refID,
                time: timeStr,
                debit: `Accrued Wholesaler Liability: ${dealerName}`,
                credit: `Purchased batch: ${summaryName}`,
                type: "expense",
                amount: parseFloat(totalNet.toFixed(2))
            });

            purchaseCartItems = [];
            renderPurchaseBatch();
            calculatePurchaseBatchTotals();

            rebuildPurchasesRegistry();
            rebuildVaultInventory();
            rebuildLedger();
            rebuildDirectoriesUI();
            updateWorkspaceScorecard();
            updateDashboardCounters();
            logToSystem('success', `Inward Wholesaler Batch Committed`, `Batch Totals: ₹${totalNet.toLocaleString()}`);
            logComplianceAudit(`Procurement batch committed for supplier: ${dealerName}`, "PURCHASE");
            closeModal('modal-purchase-desk');
            saveState();
        }

        function rebuildPurchasesRegistry() {
            const tbody = document.getElementById('purchases-registry-tbody');
            if (!tbody) return;

            tbody.innerHTML = AppState.purchases.map(row => `
                <tr class="text-gray-300">
                    <td class="py-2.5 pr-2">
                        <span class="code-font text-amber-400 block">${row.ref} (${row.batch})</span>
                        <span class="text-[10px] text-gray-500 block">Dealer: ${row.supplier || "Direct Procurement"}</span>
                    </td>
                    <td class="py-2.5 font-medium">${row.product}</td>
                    <td class="py-2.5 text-center code-font">${row.qty} Units</td>
                    <td class="py-2.5 text-center code-font text-gray-400">₹${row.cost}/₹${row.mrp}</td>
                    <td class="py-2.5 text-center text-gray-400">${row.gst}%</td>
                    <td class="py-2.5 text-right code-font font-bold text-rose-400">₹${row.total.toLocaleString()}</td>
                </tr>
            `).join('');
        }

        function printPurchaseSlip() {
            const supplierName = document.getElementById('pur-dealer-select').value;
            const supplier = AppState.dealers.find(d => d.name === supplierName) || {};
            const company = getCompanyProfileForPrint();
            const currentItems = purchaseCartItems.length ? purchaseCartItems : [{
                product: document.getElementById('pur-item-select').value,
                batch: document.getElementById('pur-batch').value || 'B-GEN-01',
                qty: parseInt(document.getElementById('pur-qty').value) || 0,
                cost: parseFloat(document.getElementById('pur-rate').value) || 0,
                mrp: parseFloat(document.getElementById('pur-mrp').value) || 0,
                sellRate: parseFloat(document.getElementById('pur-selling-rate').value) || 0,
                scheme: document.getElementById('pur-scheme').value,
                discount: parseFloat(document.getElementById('pur-discount').value) || 0,
                gst: parseFloat(document.getElementById('pur-gst').value) || 0
            }];

            if (!supplierName || !currentItems.length || currentItems.some(item => !item.product || item.qty <= 0 || item.cost <= 0)) {
                showSystemToast('error', 'Print Aborted', 'Select a supplier and add at least one valid acquisition item first.');
                return;
            }

            let totalBase = 0;
            let totalDiscount = 0;
            let totalGst = 0;
            let totalNet = 0;

            const rowsHtml = currentItems.map(item => {
                const productCatalog = AppState.catalog.find(prod => prod.name === item.product) || {};
                const base = item.qty * item.cost;
                let schemeDeduction = 0;
                if (item.scheme === '10+1' && item.qty >= 11) schemeDeduction = Math.floor(item.qty / 11) * item.cost;
                else if (item.scheme === '20+1' && item.qty >= 21) schemeDeduction = Math.floor(item.qty / 21) * item.cost;
                else if (item.scheme === 'bulk_10') schemeDeduction = base * 0.10;

                const discountDeduction = (base - schemeDeduction) * (item.discount / 100);
                const taxable = base - schemeDeduction - discountDeduction;
                const gstAmount = taxable * (item.gst / 100);
                const lineTotal = taxable + gstAmount;

                totalBase += base;
                totalDiscount += schemeDeduction + discountDeduction;
                totalGst += gstAmount;
                totalNet += lineTotal;

                return `
                    <tr style="border-top: 1px solid #e5e7eb;">
                        <td style="padding: 10px 12px; font-weight: 700; color: #111827;">${item.product}</td>
                        <td style="padding: 10px 12px; color: #374151;">${productCatalog.hsn || 'HSN-1001'}</td>
                        <td style="padding: 10px 12px; color: #374151;">${item.batch || 'B-GEN-01'}</td>
                        <td style="padding: 10px 12px; text-align: right; color: #374151;">₹${(item.mrp || productCatalog.mrp || 0).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
                        <td style="padding: 10px 12px; text-align: center; color: #374151;">${item.qty}</td>
                        <td style="padding: 10px 12px; text-align: right; color: #374151;">₹${item.cost.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
                        <td style="padding: 10px 12px; text-align: center; color: #374151;">${item.gst}%</td>
                        <td style="padding: 10px 12px; text-align: center; color: #374151;">${item.scheme === 'none' ? 'None' : item.scheme}</td>
                        <td style="padding: 10px 12px; text-align: center; color: #374151;">${item.discount}%</td>
                        <td style="padding: 10px 12px; text-align: right; font-weight: 700; color: #111827;">₹${lineTotal.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
                    </tr>
                `;
            }).join('');

            const refID = `PO-${Math.floor(100 + Math.random() * 900)}-SLIP`;
            const timeStr = new Date().toLocaleString();
            const companyHeaderDetail = [
                company.address,
                company.phone ? `Phone: ${company.phone}` : '',
                company.email ? `Email: ${company.email}` : ''
            ].filter(Boolean).join(' • ');

            const companyBankDetail = [
                company.bankName,
                company.bankAccount ? `A/C: ${company.bankAccount}` : '',
                company.ifscCode ? `IFSC: ${company.ifscCode}` : ''
            ].filter(Boolean).join(' • ');

            const printArea = document.getElementById('purchase-slip-print-area');
            if (!printArea) return;

            printArea.innerHTML = `
                <div class="print-document-page" style="background: #ffffff; color: #111827; font-size: 13px; font-family: Inter, system-ui, sans-serif; border: 1px solid #e5e7eb; border-radius: 12px; display: flex; flex-direction: column;">
                    <div style="flex: 1 1 auto; display: flex; flex-direction: column; padding: 24px;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 18px; border-bottom: 1px solid #e5e7eb; padding-bottom: 16px; margin-bottom: 18px;">
                            <div style="min-width: 45%;">
                                <div style="font-size: 26px; font-weight: 800; color: #111827;">${company.companyName || ''}</div>
                                <div style="font-size: 12px; color: #475569; margin-top: 6px;">${company.tradeName || ''}</div>
                                <div style="font-size: 11px; color: #475569; margin-top: 8px; line-height: 1.6;">${companyHeaderDetail}</div>
                                <div style="font-size: 11px; color: #475569; margin-top: 8px; line-height: 1.6;">
                                    ${company.gstin ? `GSTIN: ${company.gstin}` : ''}
                                    ${company.gstin && company.pan ? ' • ' : ''}
                                    ${company.pan ? `PAN: ${company.pan}` : ''}
                                    ${company.fssai ? ' • ' : ''}
                                    ${company.fssai ? `FSSAI: ${company.fssai}` : ''}
                                </div>
                            </div>
                            <div style="text-align: right; min-width: 30%;">
                                <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b;">Procurement Slip</div>
                                <div style="font-size: 13px; font-weight: 700; margin-top: 6px; color: #111827;">${refID}</div>
                                <div style="font-size: 12px; color: #64748b; margin-top: 4px;">${timeStr}</div>
                                <div style="font-size: 11px; color: #64748b; margin-top: 12px; line-height: 1.6;">${companyBankDetail}</div>
                            </div>
                        </div>

                        <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 14px; margin-bottom: 16px;">
                            <div style="background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 12px; padding: 14px;">
                                <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b;">Supplier</div>
                                <div style="font-size: 13px; font-weight: 700; margin-top: 8px; color: #111827;">${supplier.name || supplierName}</div>
                                <div style="font-size: 12px; color: #475569; margin-top: 6px;">${supplier.address || 'Address not available'}</div>
                                <div style="font-size: 12px; color: #475569; margin-top: 6px;">GSTIN: ${supplier.gst || 'N/A'}</div>
                            </div>
                            <div style="background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 12px; padding: 14px;">
                                <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b;">Bank Details</div>
                                <div style="font-size: 12px; color: #475569; margin-top: 6px;">${supplier.bank || 'Bank not linked'}</div>
                                <div style="font-size: 12px; color: #475569; margin-top: 4px;">A/C: ${supplier.acc || '--'}</div>
                                <div style="font-size: 12px; color: #475569; margin-top: 4px;">IFSC: ${supplier.ifsc || '--'}</div>
                            </div>
                        </div>

                        <div style="border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; margin-bottom: 16px;" class="print-break-inside-avoid">
                            <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                                <thead style="background: #f8fafc; color: #111827;">
                                    <tr>
                                        <th style="text-align: left; padding: 10px 12px; font-weight: 700;">Product</th>
                                        <th style="text-align: left; padding: 10px 12px; font-weight: 700;">HSN</th>
                                        <th style="text-align: left; padding: 10px 12px; font-weight: 700;">Batch</th>
                                        <th style="text-align: right; padding: 10px 12px; font-weight: 700;">MRP</th>
                                        <th style="text-align: center; padding: 10px 12px; font-weight: 700;">Qty</th>
                                        <th style="text-align: right; padding: 10px 12px; font-weight: 700;">Rate</th>
                                        <th style="text-align: center; padding: 10px 12px; font-weight: 700;">GST %</th>
                                        <th style="text-align: center; padding: 10px 12px; font-weight: 700;">Scheme</th>
                                        <th style="text-align: center; padding: 10px 12px; font-weight: 700;">Discount</th>
                                        <th style="text-align: right; padding: 10px 12px; font-weight: 700;">Total</th>
                                    </tr>
                                </thead>
                                <tbody>${rowsHtml}</tbody>
                            </table>
                        </div>

                        <div style="display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 14px; align-items: start;">
                            <div style="border: 1px solid #e5e7eb; border-radius: 12px; padding: 12px; background: #f9fafb;" class="print-break-inside-avoid">
                                <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; margin-bottom: 8px;">Acquisition Summary</div>
                                <div style="display: flex; justify-content: space-between; font-size: 12px; color: #475569; margin-bottom: 6px;"><span>Gross Base</span><span>₹${totalBase.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</span></div>
                                <div style="display: flex; justify-content: space-between; font-size: 12px; color: #475569; margin-bottom: 6px;"><span>Scheme / Discount</span><span>-₹${totalDiscount.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</span></div>
                                <div style="display: flex; justify-content: space-between; font-size: 12px; color: #475569; margin-bottom: 6px;"><span>GST Claimable</span><span>₹${totalGst.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</span></div>
                                <div style="display: flex; justify-content: space-between; font-size: 14px; font-weight: 800; color: #111827; padding-top: 8px; border-top: 1px solid #d1d5db;"><span>Acquisition Net</span><span>₹${totalNet.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</span></div>
                            </div>
                            <div style="border: 1px solid #e5e7eb; border-radius: 12px; padding: 12px; background: #ffffff;" class="print-break-inside-avoid">
                                <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; margin-bottom: 8px;">Notes</div>
                                <div style="font-size: 12px; color: #475569; line-height: 1.6;">
                                    This slip confirms receipt of the above inward purchase lots from the selected supplier. Ensure bank settlement is completed against the outstanding liability shown in the supplier directory.
                                </div>
                            </div>
                        </div>

                        <div style="margin-top: 18px; border-top: 1px dashed #d1d5db; padding-top: 10px; font-size: 11px; color: #6b7280; display: flex; justify-content: space-between;">
                            <span>Prepared by Vyapaar Core Procurement Desk</span>
                            <span>Single-page purchase slip for filing</span>
                        </div>
                    </div>
                    <div class="print-footer-fixed">POWERED BY VYAPAAR CORE ENTERPRISE OS</div>
                </div>
            `;

            document.body.classList.add('is-printing', 'print-purchase');
            document.body.classList.remove('print-sale');
            setTimeout(() => {
                window.print();
                setTimeout(() => {
                    document.body.classList.remove('is-printing', 'print-purchase');
                }, 600);
            }, 150);
        }

        function populateSalesDeskDropdowns() {
            const sItemSel = document.getElementById('sales-item-select');
            const sCustSel = document.getElementById('sales-cust-select');

            if (sItemSel) {
                sItemSel.innerHTML = AppState.catalog.map(item => `
                    <option value="${item.name}">${item.name}</option>
                `).join('');
                autoFillSalesRates();
            }

            if (sCustSel) {
                let optionsHtml = '';
                
                if (AppState.retailers && AppState.retailers.length > 0) {
                    optionsHtml += `<optgroup label="B2B Retail Partner Networks">`;
                    optionsHtml += AppState.retailers.map(rtl => `
                        <option value="B2B:${rtl.name}">${rtl.name} (B2B)</option>
                    `).join('');
                    optionsHtml += `</optgroup>`;
                }

                if (AppState.customers && AppState.customers.length > 0) {
                    optionsHtml += `<optgroup label="Standard B2C Retail Clients">`;
                    optionsHtml += AppState.customers.map(cust => `
                        <option value="B2C:${cust.name}">${cust.name} (B2C)</option>
                    `).join('');
                    optionsHtml += `</optgroup>`;
                }

                sCustSel.innerHTML = optionsHtml;
                updateSalesCustomerTelemetry();
            }
        }

        function updateSalesCustomerTelemetry() {
            const custSel = document.getElementById('sales-cust-select');
            if(!custSel) return;
            const selectVal = custSel.value;
            if(!selectVal) return;

            const [type, name] = selectVal.split(':');
            const gstLabel = document.getElementById('sales-cust-meta-gst');
            const typeLabel = document.getElementById('sales-cust-meta-type');

            if (type === 'B2B') {
                const partner = AppState.retailers.find(r => r.name === name);
                if (gstLabel) gstLabel.textContent = partner ? partner.gst : "Verified (B2B)";
                if (typeLabel) typeLabel.textContent = "B2B Retailer Network";
            } else {
                if (gstLabel) gstLabel.textContent = "Exempt / Standard Tax";
                if (typeLabel) typeLabel.textContent = "Standard Client (B2C)";
            }
        }

        let salesCartItems = [];
        let purchaseCartItems = [];

        function autoFillSalesRates() {
            const selectEl = document.getElementById('sales-item-select');
            if (!selectEl) return;
            const name = selectEl.value;
            const item = AppState.catalog.find(x => x.name === name);
            if (item) {
                const rateEl = document.getElementById('sales-rate');
                if (rateEl) rateEl.value = item.price;
                calculateSalesTotal();
            }
        }

        function addItemToSalesCart() {
            const selectEl = document.getElementById('sales-item-select');
            const qtyEl = document.getElementById('sales-qty');
            const rateEl = document.getElementById('sales-rate');
            const discountEl = document.getElementById('sales-discount');
            const gstEl = document.getElementById('sales-gst');
            const product = selectEl ? selectEl.value : '';
            const qty = parseInt(qtyEl ? qtyEl.value : '') || 0;
            const rate = parseFloat(rateEl ? rateEl.value : '') || 0;
            const discount = discountEl ? parseFloat(discountEl.value) || 0 : 0;
            const gst = gstEl ? parseFloat(gstEl.value) || 0 : 0;

            if (!product || qty <= 0 || rate <= 0) {
                showSystemToast('error', 'Cart Update Failed', 'Select an item and enter a valid quantity and rate.');
                return;
            }

            salesCartItems.push({ product, qty, rate, discount, gst });
            renderSalesCart();
            calculateSalesTotal();
            showSystemToast('success', 'Item Added', `${product} added to the dispatch cart.`);
        }

        function removeSalesCartItem(index) {
            salesCartItems.splice(index, 1);
            renderSalesCart();
            calculateSalesTotal();
        }

        function clearSalesCart() {
            salesCartItems = [];
            renderSalesCart();
            calculateSalesTotal();
        }

        function renderSalesCart() {
            const tbody = document.getElementById('sales-cart-tbody');
            if (!tbody) return;

            if (!salesCartItems.length) {
                tbody.innerHTML = `<tr><td colspan="7" class="py-3 text-center text-gray-500">No items added yet</td></tr>`;
                return;
            }

            tbody.innerHTML = salesCartItems.map((item, idx) => {
                const basePrice = item.qty * item.rate;
                const discountDeduction = basePrice * (item.discount / 100);
                const priceAfterDiscount = basePrice - discountDeduction;
                const gstAmount = priceAfterDiscount * (item.gst / 100);
                const lineTotal = priceAfterDiscount + gstAmount;

                return `
                    <tr class="text-gray-300">
                        <td class="py-2 px-2 font-medium">${item.product}</td>
                        <td class="py-2 px-2 text-center code-font">${item.qty}</td>
                        <td class="py-2 px-2 text-right code-font">₹${item.rate.toLocaleString()}</td>
                        <td class="py-2 px-2 text-center code-font">${item.discount}%</td>
                        <td class="py-2 px-2 text-center code-font">${item.gst}%</td>
                        <td class="py-2 px-2 text-right flex items-center justify-end gap-2">
                            <span class="text-emerald-400 font-semibold">₹${lineTotal.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</span>
                        </td>
                        <td class="py-2 px-2 text-center"><button onclick="removeSalesCartItem(${idx})" class="text-[10px] text-rose-400 hover:text-rose-300 transition cursor-pointer">Remove</button></td>
                    </tr>
                `;
            }).join('');
        }

        function calculateSalesTotal() {
            const qtyEl = document.getElementById('sales-qty');
            const rateEl = document.getElementById('sales-rate');
            const discountEl = document.getElementById('sales-discount');
            const gstEl = document.getElementById('sales-gst');

            if (!qtyEl || !rateEl) return; // Defensive guard

            const discountPercent = discountEl ? (parseFloat(discountEl.value) || 0) : 0;
            const gstPercent = gstEl ? (parseFloat(gstEl.value) || 0) : 0;

            const itemsToTotal = salesCartItems.length ? salesCartItems : [];
            let basePrice = 0;
            let discountDeduction = 0;
            let gstAmount = 0;
            let finalTotal = 0;

            itemsToTotal.forEach(item => {
                const lineBasePrice = item.qty * item.rate;
                const lineDiscountDeduction = lineBasePrice * (discountPercent / 100);
                const linePriceAfterDiscount = lineBasePrice - lineDiscountDeduction;
                const lineGstAmount = linePriceAfterDiscount * (gstPercent / 100);
                const lineFinalTotal = linePriceAfterDiscount + lineGstAmount;

                basePrice += lineBasePrice;
                discountDeduction += lineDiscountDeduction;
                gstAmount += lineGstAmount;
                finalTotal += lineFinalTotal;
            });

            const baseLabel = document.getElementById('calc-sales-base');
            const discLabel = document.getElementById('calc-sales-disc');
            const gstLabel = document.getElementById('calc-sales-gst');
            const grandTotalLabel = document.getElementById('sales-grand-total');

            if (baseLabel) baseLabel.textContent = `₹${basePrice.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}`;
            if (discLabel) discLabel.textContent = `-₹${discountDeduction.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}`;
            if (gstLabel) gstLabel.textContent = `+₹${gstAmount.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}`;
            if (grandTotalLabel) grandTotalLabel.textContent = `₹${finalTotal.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}`;
        }

        function printSaleBill() {
            const selectVal = document.getElementById('sales-cust-select').value;
            const discount = parseFloat(document.getElementById('sales-discount').value) || 0;
            const gst = parseFloat(document.getElementById('sales-gst').value) || 0;
            const payStatus = document.getElementById('sales-payment-status').value;
            const cartItems = salesCartItems.length ? salesCartItems : [];
            const company = getCompanyProfileForPrint();

            if (!selectVal || !cartItems.length) {
                showSystemToast('error', 'Print Aborted', 'Add at least one item to the dispatch cart before printing.');
                return;
            }

            const client = selectVal.includes(':') ? selectVal.split(':').slice(1).join(':') : selectVal;
            let basePrice = 0;
            let discountDeduction = 0;
            let gstAmount = 0;
            let finalTotal = 0;
            const rowsHtml = cartItems.map(item => {
                const productCatalog = AppState.catalog.find(prod => prod.name === item.product) || {};
                const lineBasePrice = item.qty * item.rate;
                const lineDiscountDeduction = lineBasePrice * (discount / 100);
                const linePriceAfterDiscount = lineBasePrice - lineDiscountDeduction;
                const lineGstAmount = linePriceAfterDiscount * (gst / 100);
                const lineFinalTotal = linePriceAfterDiscount + lineGstAmount;
                basePrice += lineBasePrice;
                discountDeduction += lineDiscountDeduction;
                gstAmount += lineGstAmount;
                finalTotal += lineFinalTotal;

                return `
                    <tr style="border-top: 1px solid #e5e7eb;">
                        <td style="padding: 10px 12px; font-weight: 700; color: #111827;">${item.product}</td>
                        <td style="padding: 10px 12px; color: #374151;">${productCatalog.hsn || 'HSN-1001'}</td>
                        <td style="padding: 10px 12px; color: #374151; text-align: right;">₹${(productCatalog.mrp || 0).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
                        <td style="padding: 10px 12px; text-align: center; color: #374151;">${item.qty}</td>
                        <td style="padding: 10px 12px; text-align: right; color: #374151;">₹${item.rate.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
                        <td style="padding: 10px 12px; text-align: center; color: #374151;">${gst}%</td>
                        <td style="padding: 10px 12px; text-align: center; color: #374151;">${item.scheme || 'None'}</td>
                        <td style="padding: 10px 12px; text-align: center; color: #374151;">${item.discount}%</td>
                        <td style="padding: 10px 12px; text-align: right; font-weight: 700; color: #111827;">₹${lineFinalTotal.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
                    </tr>
                `;
            }).join('');
            const sgst = gstAmount / 2;
            const cgst = gstAmount / 2;
            const prefix = company.invoicePrefix ? company.invoicePrefix.replace(/\s+/g, '').toUpperCase() : 'SO-';
            const refID = `${prefix}${Math.floor(100 + Math.random() * 900)}-COM`;
            const timeStr = new Date().toLocaleString();
            const summaryQty = cartItems.reduce((sum, item) => sum + item.qty, 0);
            const printArea = document.getElementById('sale-bill-print-area');
            if (!printArea) return;

            const companyHeaderDetail = [
                company.address,
                company.phone ? `Phone: ${company.phone}` : '',
                company.email ? `Email: ${company.email}` : ''
            ].filter(Boolean).join(' • ');

            const companyBankDetail = [
                company.bankName,
                company.bankAccount ? `A/C: ${company.bankAccount}` : '',
                company.ifscCode ? `IFSC: ${company.ifscCode}` : ''
            ].filter(Boolean).join(' • ');

            printArea.innerHTML = `
    <div class="print-document-page" style="background: #ffffff; color: #111827; font-size: 13px; font-family: Inter, system-ui, sans-serif; border: 1px solid #e5e7eb; border-radius: 12px; display: flex; flex-direction: column;">
        <div style="flex: 1 1 auto; display: flex; flex-direction: column; padding: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 18px; border-bottom: 1px solid #e5e7eb; padding-bottom: 16px; margin-bottom: 18px;">
                <div style="min-width: 45%;">
                    <div style="font-size: 26px; font-weight: 800; color: #111827;">${company.companyName || ''}</div>
                    <div style="font-size: 12px; color: #475569; margin-top: 6px;">${company.tradeName || ''}</div>
                    <div style="font-size: 11px; color: #475569; margin-top: 8px; line-height: 1.6;">${companyHeaderDetail}</div>
                    <div style="font-size: 11px; color: #475569; margin-top: 8px; line-height: 1.6;">
                        ${company.gstin ? `GSTIN: ${company.gstin}` : ''}
                        ${company.gstin && company.pan ? ' • ' : ''}
                        ${company.pan ? `PAN: ${company.pan}` : ''}
                        ${company.fssai ? ' • ' : ''}
                        ${company.fssai ? `FSSAI: ${company.fssai}` : ''}
                    </div>
                </div>
                <div style="text-align: right; min-width: 30%;">
                    <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b;">Tax Invoice</div>
                    <div style="font-size: 13px; font-weight: 700; margin-top: 6px; color: #111827;">${refID}</div>
                    <div style="font-size: 12px; color: #64748b; margin-top: 4px;">${timeStr}</div>
                    <div style="font-size: 11px; color: #64748b; margin-top: 12px; line-height: 1.6;">${companyBankDetail}</div>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 14px; margin-bottom: 16px;">
                <div style="background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 12px; padding: 14px;">
                    <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b;">Bill To</div>
                    <div style="font-size: 13px; font-weight: 700; margin-top: 8px; color: #111827;">${client}</div>
                    <div style="font-size: 12px; color: #475569; margin-top: 6px;">${selectVal.includes('B2B') ? 'B2B / Trade Client' : 'Retail Customer'}</div>
                </div>
                <div style="background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 12px; padding: 14px;">
                    <div style="display: flex; justify-content: space-between; font-size: 12px; color: #64748b; margin-bottom: 6px;"><span>Payment Mode</span><span style="color: #111827; font-weight: 700;">${payStatus}</span></div>
                    <div style="display: flex; justify-content: space-between; font-size: 12px; color: #64748b; margin-bottom: 6px;"><span>Dispatch Ref</span><span style="color: #111827; font-weight: 700;">${refID}</span></div>
                    <div style="display: flex; justify-content: space-between; font-size: 12px; color: #64748b;"><span>Total Qty</span><span style="color: #111827; font-weight: 700;">${summaryQty} Units</span></div>
                </div>
            </div>

            <div style="border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; margin-bottom: 16px;" class="print-break-inside-avoid">
                <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                    <thead style="background: #f8fafc; color: #111827;">
                        <tr>
                            <th style="text-align: left; padding: 10px 12px; font-weight: 700;">Product</th>
                            <th style="text-align: left; padding: 10px 12px; font-weight: 700;">HSN</th>
                            <th style="text-align: right; padding: 10px 12px; font-weight: 700;">MRP</th>
                            <th style="text-align: center; padding: 10px 12px; font-weight: 700;">Qty</th>
                            <th style="text-align: right; padding: 10px 12px; font-weight: 700;">Rate</th>
                            <th style="text-align: center; padding: 10px 12px; font-weight: 700;">GST %</th>
                            <th style="text-align: center; padding: 10px 12px; font-weight: 700;">Scheme</th>
                            <th style="text-align: center; padding: 10px 12px; font-weight: 700;">Discount</th>
                            <th style="text-align: right; padding: 10px 12px; font-weight: 700;">Total</th>
                        </tr>
                    </thead>
                    <tbody>${rowsHtml}</tbody>
                </table>
            </div>

            <div style="display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 14px; align-items: start;">
                <div style="border: 1px solid #e5e7eb; border-radius: 12px; padding: 12px; background: #f9fafb;" class="print-break-inside-avoid">
                    <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; margin-bottom: 8px;">Summary</div>
                    <div style="display:flex; justify-content:space-between; font-size:12px; color:#475569; margin-bottom:6px;"><span>Base Value</span><span>₹${basePrice.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</span></div>
                    <div style="display:flex; justify-content:space-between; font-size:12px; color:#475569; margin-bottom:6px;"><span>Trade Discounts</span><span>-₹${discountDeduction.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</span></div>
                    <div style="display:flex; justify-content:space-between; font-size:12px; color:#475569; margin-bottom:6px;"><span>CGST (${gst / 2}%)</span><span>₹${cgst.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</span></div>
                    <div style="display:flex; justify-content:space-between; font-size:12px; color:#475569; margin-bottom:8px;"><span>SGST (${gst / 2}%)</span><span>₹${sgst.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</span></div>
                    <div style="display:flex; justify-content:space-between; font-size:14px; font-weight:800; color:#111827; padding-top:8px; border-top:1px solid #d1d5db;">
                        <span>Outbound Net</span><span>₹${finalTotal.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</span>
                    </div>
                </div>
                <div style="border: 1px solid #e5e7eb; border-radius: 12px; padding: 12px; background: #ffffff;" class="print-break-inside-avoid">
                    <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; margin-bottom: 8px;">Notes</div>
                    <div style="font-size: 12px; color: #475569; line-height: 1.5;">Commercial outward sale logged for ${cartItems.map(item => item.product).join(', ')} through the automated sales desk.</div>
                    <div style="font-size: 12px; color: #475569; margin-top: 8px;">Reference: <span style="font-weight:700; color:#111827;">${refID}</span></div>
                </div>
            </div>

            <div style="margin-top: 16px; border-top: 1px dashed #d1d5db; padding-top: 10px; font-size: 11px; color: #6b7280; display: flex; justify-content: space-between;">
                <span>Thank you for your business.</span>
                <span>${company.footerNote || 'Generated by Vyapaar Core'}</span>
            </div>
        </div>

        <div class="print-footer-fixed" style="margin-top: 18px; text-align: center; font-size: 10px; color: #7c83a1; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.8;">
            POWERED BY VYAPAAR CORE ENTERPRISE OS
        </div>
    </div>
            `;

            document.body.classList.add('is-printing', 'print-sale');
            document.body.classList.remove('print-purchase');
            setTimeout(() => {
                window.print();
                setTimeout(() => {
                    document.body.classList.remove('is-printing', 'print-sale');
                }, 600);
            }, 150);
        }

        function commitBulkSaleInvoice() {
            const selectVal = document.getElementById('sales-cust-select').value;
            if(!selectVal) return;

            const [type, client] = selectVal.split(':');
            const discount = parseFloat(document.getElementById('sales-discount').value) || 0;
            const gst = parseFloat(document.getElementById('sales-gst').value) || 0;
            const payStatus = document.getElementById('sales-payment-status').value;
            const cartItems = salesCartItems.length ? salesCartItems : [];

            if (!cartItems.length) {
                showSystemToast('error', 'Sales Aborted', 'Add at least one item to the dispatch cart before posting.');
                return;
            }

            let basePrice = 0;
            let discountDeduction = 0;
            let finalTotal = 0;
            for (const item of cartItems) {
                const lineBasePrice = item.qty * item.rate;
                const lineDiscountDeduction = lineBasePrice * (discount / 100);
                const linePriceAfterDiscount = lineBasePrice - lineDiscountDeduction;
                const lineGstAmount = linePriceAfterDiscount * (gst / 100);
                const lineFinalTotal = linePriceAfterDiscount + lineGstAmount;

                basePrice += lineBasePrice;
                discountDeduction += lineDiscountDeduction;
                finalTotal += lineFinalTotal;
            }

            for (const item of cartItems) {
                const invItem = AppState.inventory.find(i => i.name === item.product);
                if (!invItem || invItem.stock < item.qty) {
                    logToSystem('warning', `Stock deficient warning: Not enough inventory in vault to sell ${item.qty} units of ${item.product}.`);
                    return;
                }
            }

            cartItems.forEach(item => {
                const invItem = AppState.inventory.find(i => i.name === item.product);
                if (invItem) invItem.stock -= item.qty;
            });

            const refID = `SO-${Math.floor(100 + Math.random() * 900)}-COM`;
            const timeStr = new Date().toLocaleString();
            const productSummary = cartItems.map(item => `${item.product} (${item.qty})`).join(', ');

            AppState.sales.push({
                ref: refID,
                client,
                product: productSummary,
                qty: cartItems.reduce((sum, item) => sum + item.qty, 0),
                rate: 0,
                gst,
                discount,
                items: cartItems.map(item => ({ ...item })),
                total: parseFloat(finalTotal.toFixed(2)),
                payment: payStatus,
                time: timeStr
            });
            AppState.revenue += finalTotal;

            if (payStatus === "Credit") {
                if (type === 'B2B') {
                    const retailer = AppState.retailers.find(r => r.name === client);
                    if(retailer) retailer.balance = (retailer.balance || 0) + finalTotal;
                } else {
                    const customerProfile = AppState.customers.find(c => c.name === client);
                    if (customerProfile) {
                        customerProfile.balance += finalTotal;
                    }
                }
            }

            AppState.ledger.push({
                ref: refID,
                time: timeStr,
                debit: payStatus === "Credit" ? `Trade Receivables (${client})` : "UPI / Central Cash Drawer",
                credit: `Commercial Bulk Sale: ${productSummary}`,
                type: "inflow",
                amount: parseFloat(finalTotal.toFixed(2))
            });

            salesCartItems = [];
            renderSalesCart();
            calculateSalesTotal();
            rebuildSalesRegistry();
            rebuildCRM();
            rebuildDirectoriesUI();
            rebuildLedger();
            rebuildTaxLedger();
            rebuildVaultInventory();
            updateWorkspaceScorecard();
            updateDashboardCounters();
            logToSystem('success', `Commercial Outbound Sale Logged`, `Recipient: ${client} &bull; Total: ₹${finalTotal.toLocaleString()}`);
            logComplianceAudit(`Commercial Bulk sales committed. Invoice ID: ${refID}`, "SALES");
            closeModal('modal-sales-desk');
            saveState();
        }

        function rebuildSalesRegistry() {
            const tbody = document.getElementById('sales-registry-tbody');
            if (!tbody) return;

            tbody.innerHTML = AppState.sales.map(row => {
                const productSummary = Array.isArray(row.items) && row.items.length
                    ? row.items.map(item => `${item.product} (${item.qty})`).join(', ')
                    : (row.product || '—');
                const totalQty = Array.isArray(row.items) && row.items.length
                    ? row.items.reduce((sum, item) => sum + item.qty, 0)
                    : (row.qty || 0);

                return `
                    <tr class="text-gray-300">
                        <td class="py-2.5 code-font text-emerald-400" style="color: var(--accent-primary)">${row.ref}</td>
                        <td class="py-2.5 font-medium">${row.client}</td>
                        <td class="py-2.5">${productSummary}</td>
                        <td class="py-2.5 text-center code-font">${totalQty} Units</td>
                        <td class="py-2.5 text-center">
                            <span class="px-2 py-0.5 rounded-full text-[9px] font-bold ${row.payment === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}">
                                ${row.payment === 'Paid' ? 'PAID CASH' : 'DEBIT LINE'}
                            </span>
                        </td>
                        <td class="py-2.5 text-right code-font font-bold text-emerald-400" style="color: var(--accent-primary)">₹${row.total.toLocaleString()}</td>
                    </tr>
                `;
            }).join('');
        }

        function updateVaultThreshold(val) {
            AppState.lowStockThreshold = parseInt(val);
            const label = document.getElementById('threshold-val-label');
            if (label) label.textContent = `${val} Packets`;
            fetchDashboardData();
            updateWorkspaceScorecard();
            saveState();
        }

        function renderInventoryAlertPanel() {
            const container = document.getElementById('inventory-alert-list');
            if (!container || !AppState.inventory) return;

            AppState.lowStockCount = AppState.inventory.filter(item => item.stock <= AppState.lowStockThreshold).length;

            const alerts = AppState.inventory.filter(item => item.stock <= AppState.lowStockThreshold);
            if (!alerts.length) {
                container.innerHTML = `
                    <div class="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-3 text-sm text-emerald-200">
                        All reserve buffers are currently above the safety threshold.
                    </div>
                `;
                return;
            }

            container.innerHTML = alerts.map(item => {
                const actualIdx = AppState.inventory.findIndex(inv => inv.name === item.name);
                const severity = item.stock === 0 ? 'Critical' : item.stock <= Math.max(2, Math.floor(AppState.lowStockThreshold / 2)) ? 'Urgent' : 'Watch';
                const severityStyles = item.stock === 0
                    ? 'border-rose-500/20 bg-rose-950/20 text-rose-200'
                    : item.stock <= Math.max(2, Math.floor(AppState.lowStockThreshold / 2))
                        ? 'border-amber-500/20 bg-amber-950/20 text-amber-200'
                        : 'border-cyan-500/20 bg-cyan-950/20 text-cyan-200';

                return `
                    <div class="rounded-xl border border-white/10 bg-slate-950/30 p-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div class="flex items-center gap-2">
                                <span class="font-semibold text-white">${item.name}</span>
                                <span class="text-[9px] px-2 py-0.5 rounded-full border ${severityStyles}">${severity}</span>
                            </div>
                            <div class="mt-1 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-gray-400">
                                <span class="code-font text-emerald-100">${item.stock} units</span>
                                <span>threshold ${AppState.lowStockThreshold}</span>
                            </div>
                        </div>
                        <button onclick="replenishProductStock(${actualIdx})" class="rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-300 hover:bg-amber-500/20 transition-all cursor-pointer">
                            Queue Restock
                        </button>
                    </div>
                `;
            }).join('');
        }

        function rebuildVaultInventory() {
            const tbody = document.getElementById('vault-inventory-tbody');
            if (!tbody) return;
            if (!AppState.inventory) return;

            tbody.innerHTML = AppState.inventory.map((item, idx) => {
                const isLow = item.stock <= AppState.lowStockThreshold;
                return `
                    <tr class="text-slate-300">
                        <td class="py-3 font-semibold">${item.name}</td>
                        <td class="py-3 text-center code-font font-bold ${isLow ? 'text-amber-400' : 'text-gray-300'}">${item.stock} / 100</td>
                        <td class="py-3">
                            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${isLow ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}">
                                ${isLow ? 'REORDER WARNING' : 'STABLE LEVEL'}
                            </span>
                        </td>
                        <td class="py-3 text-right">
                            <button onclick="replenishProductStock(${idx})" class="px-2.5 py-1 text-[10px] font-bold bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 border border-indigo-500/20 rounded-lg cursor-pointer transition" style="border-color: var(--accent-primary); color: var(--accent-primary)">
                                Restock +20
                            </button>
                        </td>
                    </tr>
                `;
            }).join('');

            // Safely update flagged reserves count card if found
            const flaggedCard = document.getElementById('vault-flagged-count');
            if (flaggedCard) {
                flaggedCard.textContent = `${AppState.lowStockCount} Items Deficient`;
            }

            renderInventoryAlertPanel();
        }

        function replenishProductStock(idx) {
            const item = AppState.inventory[idx];
            if (!item) return;
            item.stock += 20;

            const costValue = 20 * (item.costPrice || 10);
            const refID = `TX-${Math.floor(100 + Math.random() * 900)}-RESTOCK`;
            const timeStr = new Date().toLocaleString();

            AppState.ledger.push({
                ref: refID,
                time: timeStr,
                debit: "Restock Logistics",
                credit: `${item.name} Warehouse`,
                type: "expense",
                amount: costValue
            });

            logToSystem('success', `Restocked product: ${item.name}`, `Added +20 units. Recorded restock expense.`);
            logComplianceAudit(`Logistics Warehouse restock of +20 units: ${item.name}`, "INVENTORY");
            
            AppState.lowStockCount = AppState.inventory.filter(item => item.stock <= AppState.lowStockThreshold).length;
            rebuildVaultInventory();
            rebuildLedger();
            updateWorkspaceScorecard();
            updateDashboardCounters();
            saveState();
        }

        function populateRosterEmployeeOptions() {
            const select = document.getElementById('staff-roster-select');
            if (!select) return;

            const previousValue = select.value;
            const staffMembers = Array.isArray(AppState.staff) ? AppState.staff : [];
            select.innerHTML = '';

            if (!staffMembers.length) {
                const emptyOption = document.createElement('option');
                emptyOption.value = '';
                emptyOption.textContent = 'No staff onboarded';
                select.appendChild(emptyOption);
                return;
            }

            staffMembers.forEach(member => {
                const option = document.createElement('option');
                option.value = member.name;
                option.textContent = `${member.name} (${member.role || 'Staff'})`;
                if (previousValue && member.name === previousValue) {
                    option.selected = true;
                }
                select.appendChild(option);
            });

            if (!select.value) {
                select.value = staffMembers[0].name;
            }
        }

        function rebuildStaffRoster() {
            const tbody = document.getElementById('staff-attendance-tbody');
            if (!tbody) return;
            
            const staffMembers = Array.isArray(AppState.staff) ? AppState.staff : [];
            let presentCount = 0;
            let html = '';

            staffMembers.forEach(member => {
                if (member.present) presentCount++;
                html += `
                    <tr class="text-gray-300">
                        <td class="py-3 font-semibold">${member.name} (${member.role})</td>
                        <td class="py-3">
                            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${member.present ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-gray-500/10 text-gray-400 border border-gray-800'}">
                                ${member.present ? 'ON DUTY' : 'OUT OF SHIFT'}
                            </span>
                        </td>
                        <td class="py-3 code-font">${member.clockIn || 'N/A'}</td>
                        <td class="py-3 code-font">${member.clockOut || 'N/A'}</td>
                    </tr>
                `;
            });
            tbody.innerHTML = html;
            AppState.activeStaff = presentCount;
            populateRosterEmployeeOptions();
        }

        function commitStaffCheckIn(isCheckIn) {
            const name = document.getElementById('staff-roster-select').value;
            const employee = AppState.staff.find(s => s.name === name);
            if (!employee) return;

            const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
            employee.present = isCheckIn;
            if (isCheckIn) {
                employee.clockIn = timeStr;
            } else {
                employee.clockOut = timeStr;
            }
            employee.lastEvent = isCheckIn ? `Clock-In (${timeStr})` : `Clock-Out (${timeStr})`;

            rebuildStaffRoster();
            populateCommissionStaffDropdown();
            updateWorkspaceScorecard();
            updateDashboardCounters();
            logToSystem(isCheckIn ? 'success' : 'info', `Employee check-in processed for ${name}.`, isCheckIn ? 'Status: ON DUTY' : 'Status: OUT OF SHIFT');
            logComplianceAudit(`Employee shift state updated: ${name} (${isCheckIn ? 'CLOCK_IN' : 'CLOCK_OUT'})`, "ROSTER");
            closeModal('modal-roster');
            saveState();
        }

        function rebuildCRM() {
            const tbody = document.getElementById('crm-customers-tbody');
            if(!tbody) return;

            tbody.innerHTML = AppState.customers.map((cust, idx) => `
                <tr class="text-gray-300 align-top">
                    <td class="py-3 px-2 align-top font-semibold w-[24%] min-w-0">
                        <span class="block whitespace-nowrap truncate">${cust.name}</span>
                    </td>
                    <td class="py-3 px-2 align-top w-[24%] min-w-0">
                        <span class="block whitespace-nowrap truncate">${cust.tel}</span>
                    </td>
                    <td class="py-3 px-2 align-top text-right code-font font-bold ${cust.balance > 0 ? 'text-amber-400' : 'text-emerald-400'} w-[18%] min-w-0">
                        <span class="block whitespace-nowrap">₹${Number(cust.balance || 0).toLocaleString()}</span>
                    </td>
                    <td class="py-3 px-2 align-top text-right w-[23%] min-w-0">
                        <button onclick="dispatchCRMWarning(${idx})" class="px-2 py-1 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 rounded-lg text-[10px] font-bold border border-indigo-500/20 cursor-pointer whitespace-nowrap" style="border-color: var(--accent-primary); color: var(--accent-primary)">WhatsApp Dues</button>
                    </td>
                    <td class="py-3 px-2 align-top text-center w-[11%] min-w-[88px]">
                        <div class="flex items-center justify-center gap-1">
                            <button title="Edit client" onclick="startDirectoryEdit('clients', ${idx})" class="p-1 rounded bg-cyan-500/10 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 transition cursor-pointer">
                                <span class="material-icons text-[13px]">edit</span>
                            </button>
                            <button title="Delete client" onclick="deleteDirectoryRecord('clients', ${idx})" class="p-1 rounded bg-rose-500/10 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 transition cursor-pointer">
                                <span class="material-icons text-[13px]">delete</span>
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('');
        }

        function addNewCustomer() {
            const name = document.getElementById('cust-add-name').value.trim();
            const phone = document.getElementById('cust-add-phone').value.trim();
            const balance = parseFloat(document.getElementById('cust-add-balance').value) || 0;
            const editIndex = parseInt(document.getElementById('client-edit-index').value || '-1', 10);

            if(!name || !phone) {
                showSystemToast('error', 'Missing Coordinates', 'Onboarding requires customer name and phone numbers.');
                return;
            }

            if (editIndex >= 0 && AppState.customers[editIndex]) {
                AppState.customers[editIndex] = { name, tel: phone, balance };
                showSystemToast('success', 'Client updated', `${name} was synchronized with the directory.`);
                logComplianceAudit(`Updated customer B2C profile: ${name}`, "DIRECTORIES");
            } else {
                AppState.customers.push({ name, tel: phone, balance });
                logToSystem('success', `Onboarded new client: ${name}`, `Opening Ledger Dues: ₹${balance}`);
                logComplianceAudit(`Registered customer B2C profile: ${name}`, "DIRECTORIES");
            }

            document.getElementById('cust-add-name').value = '';
            document.getElementById('cust-add-phone').value = '';
            document.getElementById('cust-add-balance').value = '';
            document.getElementById('client-edit-index').value = '';

            rebuildCRM();
            rebuildDirectoriesUI();
            populateSalesDeskDropdowns();
            updateWorkspaceScorecard();
            saveState();
        }

        function startDirectoryEdit(type, idx) {
            if (type === 'dealers') {
                const dealer = AppState.dealers[idx];
                if (!dealer) return;
                document.getElementById('dealer-add-name').value = dealer.name || '';
                document.getElementById('dealer-add-gst').value = dealer.gst || '';
                document.getElementById('dealer-add-address').value = dealer.address || '';
                document.getElementById('dealer-add-phone').value = dealer.phone || '';
                document.getElementById('dealer-add-bank-name').value = dealer.bank || '';
                document.getElementById('dealer-add-bank-acc').value = dealer.acc || '';
                document.getElementById('dealer-add-bank-ifsc').value = dealer.ifsc || '';
                document.getElementById('dealer-edit-index').value = idx;
                document.getElementById('dealer-submit-btn').textContent = 'Update Wholesaler';
                document.getElementById('dealer-cancel-edit-btn').classList.remove('hidden');
                switchDirectoryTab('dealers');
            }

            if (type === 'retailers') {
                const retailer = AppState.retailers[idx];
                if (!retailer) return;
                document.getElementById('retailer-add-name').value = retailer.name || '';
                document.getElementById('retailer-add-gst').value = retailer.gst || '';
                document.getElementById('retailer-add-address').value = retailer.address || '';
                document.getElementById('retailer-add-phone').value = retailer.phone || '';
                document.getElementById('retailer-add-bank-name').value = retailer.bank || '';
                document.getElementById('retailer-add-bank-acc').value = retailer.acc || '';
                document.getElementById('retailer-add-bank-ifsc').value = retailer.ifsc || '';
                document.getElementById('retailer-edit-index').value = idx;
                document.getElementById('retailer-submit-btn').textContent = 'Update Retailer';
                document.getElementById('retailer-cancel-edit-btn').classList.remove('hidden');
                switchDirectoryTab('retailers');
            }

            if (type === 'clients') {
                const client = AppState.customers[idx];
                if (!client) return;
                document.getElementById('cust-add-name').value = client.name || '';
                document.getElementById('cust-add-phone').value = client.tel || '';
                document.getElementById('cust-add-balance').value = client.balance || 0;
                document.getElementById('client-edit-index').value = idx;
                document.getElementById('client-submit-btn').textContent = 'Update Client';
                document.getElementById('client-cancel-edit-btn').classList.remove('hidden');
                switchDirectoryTab('clients');
            }
        }

        function cancelDirectoryEdit(type) {
            if (type === 'dealers') {
                document.getElementById('dealer-add-name').value = '';
                document.getElementById('dealer-add-gst').value = '';
                document.getElementById('dealer-add-address').value = '';
                document.getElementById('dealer-add-phone').value = '';
                document.getElementById('dealer-add-bank-name').value = '';
                document.getElementById('dealer-add-bank-acc').value = '';
                document.getElementById('dealer-add-bank-ifsc').value = '';
                document.getElementById('dealer-edit-index').value = '';
                document.getElementById('dealer-submit-btn').textContent = 'Onboard Wholesaler';
                document.getElementById('dealer-cancel-edit-btn').classList.add('hidden');
            }

            if (type === 'retailers') {
                document.getElementById('retailer-add-name').value = '';
                document.getElementById('retailer-add-gst').value = '';
                document.getElementById('retailer-add-address').value = '';
                document.getElementById('retailer-add-phone').value = '';
                document.getElementById('retailer-add-bank-name').value = '';
                document.getElementById('retailer-add-bank-acc').value = '';
                document.getElementById('retailer-add-bank-ifsc').value = '';
                document.getElementById('retailer-edit-index').value = '';
                document.getElementById('retailer-submit-btn').textContent = 'Onboard Retailer';
                document.getElementById('retailer-cancel-edit-btn').classList.add('hidden');
            }

            if (type === 'clients') {
                document.getElementById('cust-add-name').value = '';
                document.getElementById('cust-add-phone').value = '';
                document.getElementById('cust-add-balance').value = '';
                document.getElementById('client-edit-index').value = '';
                document.getElementById('client-submit-btn').textContent = 'Onboard Client';
                document.getElementById('client-cancel-edit-btn').classList.add('hidden');
            }
        }

        function deleteDirectoryRecord(type, idx) {
            const records = {
                'dealers': AppState.dealers,
                'retailers': AppState.retailers,
                'clients': AppState.customers
            };

            const collection = records[type];
            if (!Array.isArray(collection) || !collection[idx]) return;

            const record = collection[idx];
            if (!confirm(`Delete ${record.name || 'this record'} from the ${type} directory?`)) return;

            collection.splice(idx, 1);

            if (type === 'dealers') {
                populatePurchaseDeskDropdowns();
                logToSystem('warning', `Deleted wholesaler: ${record.name}`, `Directory sync applied.`);
            } else if (type === 'retailers') {
                populateSalesDeskDropdowns();
                logToSystem('warning', `Deleted retailer: ${record.name}`, `Directory sync applied.`);
            } else {
                populateSalesDeskDropdowns();
                logToSystem('warning', `Deleted client: ${record.name}`, `Directory sync applied.`);
            }

            rebuildDirectoriesUI();
            updateWorkspaceScorecard();
            saveState();
            showSystemToast('success', 'Directory record removed', `${record.name} has been deleted.`);
        }

        function dispatchCRMWarning(idx) {
            const cust = AppState.customers[idx];
            if(cust.balance <= 0) {
                logToSystem('info', `Dues bypass: Customer ${cust.name} balance clear.`);
                return;
            }
            logToSystem('success', `GSTR-Reminder WhatsApp alert dispatched to ${cust.name}`, `Target link: ${cust.tel}`);
        }

        function syncGSTRSummaryTotals() {
            const inflows = AppState.ledger.filter(x => x.type === 'inflow');
            const grossInflows = inflows.reduce((sum, x) => sum + (Number(x.amount) || 0), 0);
            const cgst = inflows.reduce((sum, x) => sum + (Number(x.cgst) || ((Number(x.amount) || 0) * 0.09)), 0);
            const sgst = inflows.reduce((sum, x) => sum + (Number(x.sgst) || ((Number(x.amount) || 0) * 0.09)), 0);
            const totalGSTR = cgst + sgst;

            const grossEl = document.getElementById('tax-gross-sales');
            const cgstEl = document.getElementById('tax-cgst-sum');
            const sgstEl = document.getElementById('tax-sgst-sum');
            const totalEl = document.getElementById('tax-total-gstr');

            if (grossEl) grossEl.textContent = `₹${grossInflows.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
            if (cgstEl) cgstEl.textContent = `₹${cgst.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
            if (sgstEl) sgstEl.textContent = `₹${sgst.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
            if (totalEl) totalEl.textContent = `₹${totalGSTR.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
        }

        function closeTaxEditor() {
            const panel = document.getElementById('tax-editor-panel');
            if (panel) panel.classList.add('hidden');
        }

        function openTaxRowEditor(ref) {
            const item = AppState.ledger.find(entry => entry.ref === ref);
            if (!item) return;

            const editor = document.getElementById('tax-editor-panel');
            if (!editor) return;

            document.getElementById('tax-edit-ref').value = item.ref || '';
            document.getElementById('tax-edit-base').value = Number(item.amount || 0);
            document.getElementById('tax-edit-cgst').value = Number(item.cgst ?? ((Number(item.amount) || 0) * 0.09));
            document.getElementById('tax-edit-sgst').value = Number(item.sgst ?? ((Number(item.amount) || 0) * 0.09));
            document.getElementById('tax-edit-state').value = item.taxStatus || 'PRE-AUDITED';
            editor.dataset.editingRef = ref;
            editor.classList.remove('hidden');
        }

        function saveTaxRowEdit() {
            const panel = document.getElementById('tax-editor-panel');
            if (!panel) return;

            const currentRef = panel.dataset.editingRef;
            const target = AppState.ledger.find(entry => entry.ref === currentRef);
            if (!target) return;

            const nextRef = document.getElementById('tax-edit-ref').value.trim();
            const nextBase = Math.max(0, Number(document.getElementById('tax-edit-base').value) || 0);
            const nextCgst = Math.max(0, Number(document.getElementById('tax-edit-cgst').value) || 0);
            const nextSgst = Math.max(0, Number(document.getElementById('tax-edit-sgst').value) || 0);
            const nextStatus = document.getElementById('tax-edit-state').value || 'PRE-AUDITED';

            if (!nextRef) {
                showSystemToast('warning', 'Validation error', 'Transaction reference cannot be empty.');
                return;
            }

            target.ref = nextRef;
            target.amount = nextBase;
            target.cgst = nextCgst;
            target.sgst = nextSgst;
            target.taxStatus = nextStatus;

            closeTaxEditor();
            rebuildTaxLedger();
            updateWorkspaceScorecard();
            saveState();
            showSystemToast('success', 'GSTR record updated', `Transaction ${nextRef} has been revised.`);
        }

        function deleteTaxRow(ref) {
            const item = AppState.ledger.find(entry => entry.ref === ref);
            if (!item) return;

            const confirmed = window.confirm(`Delete GSTR claim point ${ref}? This will remove the transaction from the compliance desk.`);
            if (!confirmed) return;

            AppState.ledger = AppState.ledger.filter(entry => entry.ref !== ref);
            AppState.revenue = Math.max(0, (Number(AppState.revenue) || 0) - (Number(item.amount) || 0));

            rebuildTaxLedger();
            rebuildLedger();
            updateWorkspaceScorecard();
            saveState();
            showSystemToast('success', 'GSTR row deleted', `${ref} has been removed from the current ledger.`);
        }

        function rebuildTaxLedger() {
            const tbody = document.getElementById('tax-items-tbody');
            if (!tbody) return;

            syncGSTRSummaryTotals();

            const salesInflows = AppState.ledger.filter(x => x.type === 'inflow');
            tbody.innerHTML = salesInflows.map(item => {
                const baseValue = Number(item.amount) || 0;
                const subCgst = Number(item.cgst ?? (baseValue * 0.09));
                const subSgst = Number(item.sgst ?? (baseValue * 0.09));
                const statusText = item.taxStatus || 'PRE-AUDITED';
                const statusClass = statusText === 'REJECTED'
                    ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    : statusText === 'UNDER REVIEW'
                        ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';

                return `
                    <tr class="text-gray-300 align-middle">
                        <td class="py-3 px-2 code-font text-indigo-400 truncate" style="color: var(--accent-primary)">${item.ref || 'TX-UNKNOWN'}</td>
                        <td class="py-3 px-2 code-font whitespace-nowrap">₹${baseValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                        <td class="py-3 px-2 text-center code-font text-indigo-300 whitespace-nowrap">₹${subCgst.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                        <td class="py-3 px-2 text-center code-font text-indigo-300 whitespace-nowrap">₹${subSgst.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                        <td class="py-3 px-2 text-right">
                            <span class="inline-flex items-center justify-end px-2 py-0.5 rounded-full text-[9px] font-bold ${statusClass}">${statusText}</span>
                        </td>
                        <td class="py-3 px-2">
                            <div class="flex items-center justify-end gap-2">
                                <button type="button" onclick="openTaxRowEditor('${item.ref}')" class="inline-flex h-7 w-7 items-center justify-center rounded-md border border-gray-700 bg-gray-900 text-slate-300 hover:text-white hover:border-indigo-500/50 transition cursor-pointer" title="Edit tax record">
                                    <span class="material-icons text-sm">edit</span>
                                </button>
                                <button type="button" onclick="deleteTaxRow('${item.ref}')" class="inline-flex h-7 w-7 items-center justify-center rounded-md border border-gray-700 bg-gray-900 text-slate-300 hover:text-rose-400 hover:border-rose-500/30 transition cursor-pointer" title="Delete tax record">
                                    <span class="material-icons text-sm">delete</span>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            }).join('');
        }

        async function runAIBusinessSimulation() {
            const pricing = document.getElementById('sim-pricing').value;
            const supply = document.getElementById('sim-supply').value;
            const macro = document.getElementById('sim-macro').value;

            const outBox = document.getElementById('ai-simulator-output');
            outBox.innerHTML = `
                <div class="flex flex-col items-center justify-center py-4 gap-2">
                    <span class="material-icons text-purple-400 animate-spin text-xl">sync</span>
                    <p class="text-[11px] text-gray-400">Running forward modeling algorithms on parameters: ${pricing}, ${supply}, ${macro}...</p>
                </div>
            `;

            const databaseContextPrompt = `
                Act as Chetan AI, the Vyapaar Core system intelligence officer.
                Run a predictive "What-If" business simulation with these parameters:
                - Pricing policy change: ${pricing}
                - Supply chain disruption: ${supply}
                - Macro climate factor: ${macro}

                Current baseline dashboard:
                - Gross Inflow Revenue: ₹${AppState.revenue}
                - Total Expenses: ₹${AppState.expenses}
                - Low Stock Warning alerts: ${AppState.lowStockCount} items
                
                Respond in professional business language. Estimate projected sales trends, GSTR tax liability shift, and inventory risk in a neat, bulleted summary (Max 3-4 bullets).
            `;

            try {
                const apiKey = ""; 
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;
                
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ contents: [{ parts: [{ text: databaseContextPrompt }] }] })
                });

                const result = await response.json();
                const aiResultText = result?.candidates?.[0]?.content?.parts?.[0]?.text || "handshake query error: No output retrieved from simulation networks.";

                outBox.innerHTML = `
                    <div class="text-[11px] text-slate-300 leading-relaxed space-y-1.5">
                        <div class="flex items-center gap-1 text-purple-400 font-bold uppercase">
                            <span class="material-icons text-xs">analytics</span> Simulation Modeling Complete
                        </div>
                        <p class="whitespace-pre-wrap">${aiResultText}</p>
                    </div>
                `;
                logToSystem('success', 'Predictive modeling simulation executed successfully.', 'Results cached.');

            } catch(e) {
                console.error("Simulation failed:", e);
                outBox.innerHTML = `<p class="text-xs text-rose-400">Simulation interface channel loss.</p>`;
            }
        }

        function triggerGSTRFiling() {
            logToSystem('success', 'GST Compliance GSTR-1 File simulation compiled', 'Handshake completed with central GST networks.');
            logComplianceAudit("Completed annual standard GSTR tax returns filing", "TAXATION");
            closeModal('modal-tax-compliance');
        }

        // E-Way Bill and Audit Sentinel features removed

        function switchAITab(tab) {
            ['chat', 'simulator', 'scanner', 'audit'].forEach(t => {
                const btn = document.getElementById(`ai-tab-${t}-btn`);
                const pnl = document.getElementById(`ai-panel-${t}`);
                if (t === tab) {
                    btn.className = "px-4 py-2 text-xs font-bold rounded-lg bg-indigo-600 text-white cursor-pointer transition";
                    btn.style.backgroundColor = "var(--accent-primary)";
                    pnl.classList.remove('hidden');
                    pnl.classList.add('flex');
                } else {
                    btn.className = "px-4 py-2 text-xs font-bold rounded-lg bg-gray-900 border border-gray-800 text-gray-400 hover:text-white cursor-pointer transition";
                    btn.style.backgroundColor = "";
                    pnl.classList.add('hidden');
                    pnl.classList.remove('flex');
                }
            });
        }

        function quickAIPrompt(promptText) {
            document.getElementById('ai-chat-input').value = promptText;
            sendQueryToChetanAI();
        }

        async function sendQueryToChetanAI() {
            const input = document.getElementById('ai-chat-input');
            const queryText = input.value.trim();
            if(!queryText) return;

            const chatScroller = document.getElementById('ai-chat-scroller');
            
            chatScroller.insertAdjacentHTML('beforeend', `
                <div class="flex gap-2 text-xs justify-end">
                    <div class="bg-indigo-950/40 border border-indigo-900/60 p-3 rounded-xl rounded-tl-none max-w-[85%] text-slate-200">
                        <p>${queryText}</p>
                    </div>
                </div>
            `);
            
            input.value = '';
            chatScroller.scrollTop = chatScroller.scrollHeight;

            const loadingID = "thinking-" + Date.now();
            chatScroller.insertAdjacentHTML('beforeend', `
                <div class="flex gap-2 text-xs" id="${loadingID}">
                    <span class="material-icons text-indigo-400 text-sm mt-0.5 animate-spin">sync</span>
                    <div class="bg-gray-900 border border-gray-800/60 p-3 rounded-xl rounded-tl-none max-w-[85%] text-slate-400">
                        <p class="italic">Chetan AI is analyzing system database variables...</p>
                    </div>
                </div>
            `);
            chatScroller.scrollTop = chatScroller.scrollHeight;

            const databaseContextPrompt = `
                Act as Chetan AI, the Vyapaar Core system intelligence officer.
                You have access to the current live business dashboard state:
                - Gross Inflow Revenue: ₹${AppState.revenue}
                - Total Expenses recorded: ₹${AppState.expenses}
                - Low Stock Warning alerts count: ${AppState.lowStockCount} (Threshold is set to ${AppState.lowStockThreshold})
                - Active personnel checking-in: ${AppState.activeStaff}
                - Customer accounts active: ${JSON.stringify(AppState.customers)}
                - Wholesaler dealers list: ${JSON.stringify(AppState.dealers)}
                - Retailers & Vendors list: ${JSON.stringify(AppState.retailers)}
                - Current Stock Inventory profile: ${JSON.stringify(AppState.inventory)}
                
                Respond in brief, concise, and professional business analytics language. Keep the answers helpful, direct, and under 3-4 lines if possible.
                User operational query: "${queryText}"
            `;

            try {
                const apiKey = ""; 
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;
                
                const payload = {
                    contents: [{ parts: [{ text: databaseContextPrompt }] }]
                };

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const result = await response.json();
                const aiResultText = result?.candidates?.[0]?.content?.parts?.[0]?.text || "handshake query error: No output retrieved from cognitive networks.";

                document.getElementById(loadingID).remove();
                chatScroller.insertAdjacentHTML('beforeend', `
                    <div class="flex gap-2 text-xs">
                        <span class="material-icons text-indigo-400 text-sm mt-0.5">auto_awesome</span>
                        <div class="bg-gray-900 border border-gray-800/60 p-3 rounded-xl rounded-tl-none max-w-[85%] text-slate-300">
                            <p>${aiResultText}</p>
                        </div>
                    </div>
                `);
                chatScroller.scrollTop = chatScroller.scrollHeight;

            } catch(e) {
                console.error("Gemini context pipeline failure:", e);
                document.getElementById(loadingID).remove();
                chatScroller.insertAdjacentHTML('beforeend', `
                    <div class="flex gap-2 text-xs">
                        <span class="material-icons text-rose-500 text-sm mt-0.5">error</span>
                        <div class="bg-gray-900 border border-gray-800/60 p-3 rounded-xl rounded-tl-none max-w-[85%] text-rose-300">
                            <p>Handshake pipeline disrupted. Check connectivity logs.</p>
                        </div>
                    </div>
                `);
            }
        }

        async function generateAuditReport() {
            const outBox = document.getElementById('ai-audit-output');
            outBox.innerHTML = `
                <div class="flex flex-col items-center justify-center py-8 gap-2">
                    <span class="material-icons text-indigo-400 animate-spin text-2xl">sync</span>
                    <p class="text-xs text-gray-400">Synthesizing SWOT matrix reports across tax liabilities and customer credit pools...</p>
                </div>
            `;

            const strategicContext = `
                Perform a high-level operational business audit of current operations.
                Dashboard Metrics Context:
                - Gross Revenue: ₹${AppState.revenue}
                - Total Costs Outflow: ₹${AppState.expenses}
                - Deficits alerts: ${AppState.lowStockCount}
                - Wholesaler suppliers: ${JSON.stringify(AppState.dealers)}
                - Retailer partners: ${JSON.stringify(AppState.retailers)}
                
                Please structure your output as highly actionable SWOT bullet points:
                S (Strengths), W (Weaknesses), O (Opportunities), T (Threats).
                Keep the total output concise and fit for visual displays. Format neatly in HTML.
            `;

            try {
                const apiKey = "";
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;
                
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ contents: [{ parts: [{ text: strategicContext }] }] })
                });

                const result = await response.json();
                const textOutput = result?.candidates?.[0]?.content?.parts?.[0]?.text || "Audit collation mismatch.";
                
                outBox.innerHTML = `
                    <div class="text-xs text-slate-300 leading-relaxed space-y-2">
                        <div class="border-b border-gray-800 pb-2 flex items-center gap-1 text-emerald-400 font-bold uppercase">
                            <span class="material-icons text-xs">verified</span> Compiled Cognitive SWOT Report
                        </div>
                        <p class="whitespace-pre-wrap">${textOutput}</p>
                    </div>
                `;
            } catch(e) {
                outBox.innerHTML = `<p class="text-xs text-rose-400">Audit execution caught exception channel loss.</p>`;
            }
        }

        function toggleFloatingAI() {
            const box = document.getElementById('floating-ai-box');
            if (box.classList.contains('hidden')) {
                box.classList.remove('hidden');
                setTimeout(() => {
                    box.classList.remove('translate-y-4', 'opacity-0');
                    box.classList.add('translate-y-0', 'opacity-100');
                }, 10);
            } else {
                box.classList.remove('translate-y-0', 'opacity-100');
                box.classList.add('translate-y-4', 'opacity-0');
                setTimeout(() => box.classList.add('hidden'), 300);
            }
        }

        function quickAIPromptFloating(text) {
            document.getElementById('floating-ai-input').value = text;
            sendFloatingQuery();
        }

        async function sendFloatingQuery() {
            const input = document.getElementById('floating-ai-input');
            const queryText = input.value.trim();
            if(!queryText) return;

            const scroller = document.getElementById('floating-ai-scroller');
            
            scroller.insertAdjacentHTML('beforeend', `
                <div class="flex gap-2 text-[11px] justify-end">
                    <div class="bg-indigo-950/40 border border-indigo-900/60 p-2 rounded-xl rounded-tl-none text-slate-200 max-w-[85%]">
                        <p>${queryText}</p>
                    </div>
                </div>
            `);
            
            input.value = '';
            scroller.scrollTop = scroller.scrollHeight;

            const loadingID = "float-thinking-" + Date.now();
            scroller.insertAdjacentHTML('beforeend', `
                <div class="flex gap-2 text-[11px]" id="${loadingID}">
                    <span class="material-icons text-indigo-400 text-xs mt-0.5 animate-spin">sync</span>
                    <div class="bg-gray-900 border border-gray-800 p-2 rounded-xl rounded-tl-none text-slate-400 max-w-[85%]">
                        <p class="italic">Chetan AI is analyzing system variables...</p>
                    </div>
                </div>
            `);
            scroller.scrollTop = scroller.scrollHeight;

            const databaseContextPrompt = `
                Act as Chetan AI, the Vyapaar Core system intelligence officer.
                Current state overview:
                - Gross Inflow Revenue: ₹${AppState.revenue}
                - Outflow Expenses: ₹${AppState.expenses}
                - Low Stock Warning alerts count: ${AppState.lowStockCount}
                - Dealers list: ${JSON.stringify(AppState.dealers)}
                - Retailer partners: ${JSON.stringify(AppState.retailers)}
                
                Respond in brief, concise, and professional business analytics language. Keep the answers helpful, direct, and under 2-3 lines max.
                User operational query: "${queryText}"
            `;

            try {
                const apiKey = "";
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;
                
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ contents: [{ parts: [{ text: databaseContextPrompt }] }] })
                });

                const result = await response.json();
                const aiResultText = result?.candidates?.[0]?.content?.parts?.[0]?.text || "Connection handshake failed.";

                document.getElementById(loadingID).remove();
                scroller.insertAdjacentHTML('beforeend', `
                    <div class="flex gap-2 text-[11px]">
                        <span class="material-icons text-indigo-400 text-xs mt-0.5">auto_awesome</span>
                        <div class="bg-gray-900 border border-gray-800 p-2 rounded-xl rounded-tl-none text-slate-300 max-w-[85%] leading-relaxed">
                            <p>${aiResultText}</p>
                        </div>
                    </div>
                `);
                scroller.scrollTop = scroller.scrollHeight;

            } catch(e) {
                console.error(e);
                document.getElementById(loadingID).remove();
            }
        }

        function toggleAICopilotDrawer() {
            const drawer = document.getElementById('ai-copilot-drawer');
            const overlay = document.getElementById('ai-copilot-drawer-overlay');
            if (!drawer || !overlay) return;

            const isOpen = !drawer.classList.contains('translate-x-full');
            if (isOpen) {
                drawer.classList.add('translate-x-full');
                overlay.classList.add('hidden');
            } else {
                drawer.classList.remove('translate-x-full');
                overlay.classList.remove('hidden');
            }
        }

        function closeAICopilotDrawer() {
            const drawer = document.getElementById('ai-copilot-drawer');
            const overlay = document.getElementById('ai-copilot-drawer-overlay');
            if (!drawer || !overlay) return;
            drawer.classList.add('translate-x-full');
            overlay.classList.add('hidden');
        }

        const localAssistantKnowledge = {
            en: {
                'add retailer': 'To add a retailer: Open the Customers modal → Click "Add Retailer" → Fill name, GST, address, and save.',
                'add product': 'To add a product: Open Product Master → Click "Add Product" → Enter name, HSN, MRP, stock unit, and save.',
                'manage inventory': 'Use the Warehouse Vault to adjust stock, run Reports → Inventory Audit, and update product reorder levels.',
                'print sale bill': 'From Sales Desk, finalize the bill and click Print. Choose the A4 sale bill or thermal receipt option.',
                'add purchase batch': 'In Purchase Desk, use the Batch panel to add batch number, expiry, quantity, and rates, then commit purchase to update stock.',
                'greeting': 'Hello! I am your Vyapaar assistant. Ask me how to add retailers, manage inventory, print bills, or use any module.',
                'how are you': 'I am here and ready to help with Vyapaar operations. What would you like to do today?',
                'who are you': 'I am the Vyapaar AI Copilot. I can help you use the software, answer common questions, or guide you through features.',
                'what can you do': 'I can help you add retailers, products, manage inventory, print bills, close purchases, and also chat about general questions if you want.',
                'joke': 'Why did the accountant bring a ladder to work? To reach the high profits! 😄',
                'random chat': 'I can chat about Vyapaar features, show you how to use sales, purchase, inventory, or just answer general questions.',
                'general fallback': 'I can answer both Vyapaar software questions and general chat. Ask me anything, and I will do my best to help.'
            },
            mr: {
                'add retailer': 'रिटेलर जोडण्यासाठी: Customers modal उघडा → "Add Retailer" क्लिक करा → नाव, GST, पत्ता भरा आणि सेव्ह करा.',
                'add product': 'उत्पादन जोडण्यासाठी: Product Master उघडा → "Add Product" क्लिक करा → नाव, HSN, MRP, युनिट भरा आणि सेव्ह करा.',
                'manage inventory': 'Warehouse Vault वापरा, Reports → Inventory Audit चालवा, आणि reorder स्तर सेट करा.',
                'print sale bill': 'Sales Desk मध्ये बिल Finalize करून Print क्लिक करा. A4 किंवा thermal पर्याय निवडा.',
                'add purchase batch': 'Purchase Desk मध्ये Batch पॅनेलमध्ये batch no., expiry, qty, rate भरा आणि commit करा.',
                'greeting': 'नमस्कार! मी तुमचा Vyapaar सहायक आहे. मला रिटेलर, इन्व्हेंटरी, बिले किंवा अन्य मॉड्यूल कसे वापरायचे ते विचारा.',
                'how are you': 'मी तयार आहे आणि मदतीसाठी येथे आहे. आज तुम्हाला काय करायचे आहे?',
                'who are you': 'मी Vyapaar AI Copilot आहे. मी तुम्हाला सॉफ्टवेअर वापरण्यात मदत करू शकतो तसेच सामान्य प्रश्नांची उत्तरे देऊ शकतो.',
                'what can you do': 'मी तुम्हाला रिटेलर, उत्पादने जोडण्यास, इन्व्हेंटरी व्यवस्थापित करण्यास, बिले प्रिंट करण्यास आणि सामान्य प्रश्नांना उत्तर देण्यास मदत करू शकतो.',
                'joke': 'लीज एक जोक: व्यापारीने त्याच्या बिलात एक चांगली फकीर लिहिली — "हिसाब ठिक - चालतो आहे!" 😄',
                'random chat': 'मी Vyapaar वैशिष्ट्यांवर चर्चा करू शकतो, विक्री, खरेदी, इन्व्हेंटरी वापरण्यावर मार्गदर्शन करू शकतो, किंवा सामान्य प्रश्नांना उत्तर देऊ शकतो.',
                'general fallback': 'मी Vyapaar आणि सामान्य प्रश्न दोन्हींची उत्तरे देऊ शकतो. काहीही विचारा, आणि मी मदत करण्याचा प्रयत्न करेन.'
            },
            hi: {
                'add retailer': 'रिटेलर जोड़ने के लिए: Customers modal खोलें → "Add Retailer" पर क्लिक करें → नाम, GST, पता भरें और सेव करें।',
                'add product': 'प्रोडक्ट जोड़ने के लिए: Product Master खोलें → "Add Product" पर क्लिक करें → नाम, HSN, MRP, यूनिट भरें और सेव करें।',
                'manage inventory': 'Warehouse Vault का उपयोग करें, Reports → Inventory Audit चलाएँ, और reorder स्तर सेट करें।',
                'print sale bill': 'Sales Desk से बिल finalize करें और Print पर क्लिक करें। A4 या thermal विकल्प चुनें।',
                'add purchase batch': 'Purchase Desk में Batch पैनल में batch no., expiry, qty, rate भरें और commit करें।',
                'greeting': 'नमस्ते! मैं आपका Vyapaar सहायक हूँ। मुझसे रिटेलर जोड़ना, इन्वेंटरी प्रबंधित करना, बिल प्रिंट करना या कोई अन्य मदद पूछें।',
                'how are you': 'मैं यहां आपकी Vyapaar मदद के लिए तैयार हूँ। आज आप क्या करना चाहेंगे?',
                'random chat': 'मैं Vyapaar फीचर्स पर बात कर सकता हूँ, बिक्री, खरीद, इन्वेंटरी या सामान्य सवालों के जवाब दे सकता हूँ।'
            }
        };

        function setCopilotLanguage(lang) {
            const title = document.getElementById('ai-welcome-title');
            const desc = document.getElementById('ai-welcome-desc');
            const input = document.getElementById('ai-copilot-input');
            if (!title || !desc || !input) return;
            if (lang === 'mr') {
                title.textContent = 'स्वागत आहे';
                desc.textContent = 'कॅश-फ्लो, स्टॉक किंवा सिस्टम बद्दल विचारा.';
                input.placeholder = 'काही विचारायचे आहे?';
            } else if (lang === 'hi') {
                title.textContent = 'स्वागत है';
                desc.textContent = 'कैश-फ्लो, स्टॉक या सिस्टम के उपयोग के बारे में पूछें।';
                input.placeholder = 'कोई प्रश्न पूछें?';
            } else {
                title.textContent = 'Welcome';
                desc.textContent = 'Ask for cash-flow insights, stock risk summaries, or next-best actions for the day.';
                input.placeholder = 'Type a command or question...';
            }
        }

        function onAICopilotQuick(text) {
            const input = document.getElementById('ai-copilot-input');
            if (!input) return;
            input.value = text;
            sendAICopilotMessage();
        }

        function localAnswerFor(text, lang) {
            if (!text) return null;
            const normalized = text.toLowerCase();
            const kb = localAssistantKnowledge[lang] || localAssistantKnowledge.en;

            // Flexible greeting matching
            const greetingWords = ['hi', 'hii', 'hello', 'hey', 'namaste', 'namaskar', 'whatsup', "what's up"];
            if (greetingWords.some(word => normalized.includes(word))) {
                return kb['greeting'];
            }

            if (normalized.includes('how are you')) {
                return kb['how are you'];
            }

            if (normalized.includes('who are you') || normalized.includes('what are you')) {
                return kb['who are you'];
            }

            if (normalized.includes('what can you do') || normalized.includes('help me') || normalized.includes('what can i ask')) {
                return kb['what can you do'];
            }

            if (normalized.includes('tell me a joke') || normalized.includes('joke')) {
                return kb['joke'];
            }

            for (const phrase of Object.keys(kb)) {
                if (normalized.includes(phrase)) {
                    return kb[phrase];
                }
            }

            // Fallback for any other chat or random question
            if (normalized.includes('?') || normalized.match(/\b(who|what|when|where|why|how|tell|say|do|can|should)\b/)) {
                return kb['general fallback'];
            }

            // For any other free-form input, still return a friendly acknowledgment
            return kb['general fallback'];
        }

        async function sendAICopilotMessage() {
            const input = document.getElementById('ai-copilot-input');
            const messages = document.getElementById('ai-copilot-messages');
            const langSelect = document.getElementById('ai-lang-select');
            const lang = langSelect ? langSelect.value : 'en';
            if (!input || !messages) return;

            const text = input.value.trim();
            if (!text) return;

            const userBubble = document.createElement('div');
            userBubble.className = 'ml-auto max-w-[85%] rounded-2xl bg-white/10 p-3 text-sm text-white';
            userBubble.innerHTML = `<p>${text}</p>`;
            messages.appendChild(userBubble);

            const localReply = localAnswerFor(text, lang);
            if (localReply) {
                const assistantBubble = document.createElement('div');
                assistantBubble.className = 'max-w-[85%] rounded-2xl border border-white/10 bg-slate-900/80 p-3 text-sm text-slate-200';
                assistantBubble.innerHTML = `<p>${localReply}</p>`;
                messages.appendChild(assistantBubble);
                messages.scrollTop = messages.scrollHeight;
                input.value = '';
                return;
            }

            const loadingBubble = document.createElement('div');
            loadingBubble.className = 'max-w-[85%] rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-3 text-sm text-cyan-100';
            loadingBubble.innerHTML = '<p>Thinking...</p>';
            messages.appendChild(loadingBubble);
            messages.scrollTop = messages.scrollHeight;
            input.value = '';

            try {
                const formData = new FormData();
                formData.append('message', text);
                formData.append('lang', lang);

                const response = await fetch('api/ai_copilot_stream.php', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();
                loadingBubble.remove();

                const assistantBubble = document.createElement('div');
                assistantBubble.className = 'max-w-[85%] rounded-2xl border border-white/10 bg-slate-900/80 p-3 text-sm text-slate-200';
                assistantBubble.innerHTML = `<p>${data.reply || 'Assistant response unavailable.'}</p>`;
                messages.appendChild(assistantBubble);
            } catch (error) {
                loadingBubble.remove();
                const assistantBubble = document.createElement('div');
                assistantBubble.className = 'max-w-[85%] rounded-2xl border border-rose-500/20 bg-rose-500/10 p-3 text-sm text-rose-100';
                assistantBubble.innerHTML = '<p>Unable to reach the copilot endpoint right now. I am still here to help with Vyapaar commands like add product, add retailer, print bill, or manage inventory.</p>';
                messages.appendChild(assistantBubble);
            }

            messages.scrollTop = messages.scrollHeight;
        }

        function logToSystem(type, message, detail = "") {
            const stream = document.getElementById('activity-log-stream');
            if (!stream) return;

            const icon = type === 'success' ? 'check_circle' : type === 'warning' ? 'warning' : 'info';
            const iconColor = type === 'success' ? 'text-emerald-400' : type === 'warning' ? 'text-amber-500' : 'text-indigo-400';
            
            const logHTML = `
                <div class="flex items-start gap-3 text-xs bg-gray-900/20 border border-gray-900 p-2.5 rounded-lg">
                    <span class="material-icons ${iconColor} text-sm mt-0.5">${icon}</span>
                    <div>
                        <p class="text-gray-300 font-medium">${message}</p>
                        <span class="text-gray-500 text-[10px] code-font">${new Date().toLocaleTimeString()} ${detail ? '• ' + detail : ''}</span>
                    </div>
                </div>
            `;
            stream.insertAdjacentHTML('afterbegin', logHTML);
            
            while (stream.children.length > 10) {
                stream.removeChild(stream.lastChild);
            }
        }

        function clearSystemConsole() {
            document.getElementById('activity-log-stream').innerHTML = `
                <div class="text-center py-8 text-gray-500 text-xs">Console history cleared. Listening for actions...</div>
            `;
        }

        function updateRunwayTelemetry() {
            const liquidReserves = Number(AppState.revenue || 0);
            const supplierPayables = (AppState.purchases || []).reduce((sum, purchase) => sum + Number(purchase.total || 0), 0);
            const clientReceivables = [(AppState.customers || []), (AppState.dealers || []), (AppState.retailers || [])]
                .flat()
                .reduce((sum, entry) => sum + Number(entry.balance || entry.outstanding || 0), 0);
            const netWorkingCapital = liquidReserves + clientReceivables - supplierPayables;
            const monthlyBurn = Math.max(Number(AppState.expenses || 0), 1000);
            const runwayMonths = monthlyBurn > 0 ? netWorkingCapital / monthlyBurn : 0;

            const liquidEl = document.getElementById('runway-liquid-reserves');
            const payableEl = document.getElementById('runway-supplier-payables');
            const receivableEl = document.getElementById('runway-client-receivables');
            const netEl = document.getElementById('runway-net-working-capital');
            const monthsEl = document.getElementById('runway-months');
            const ringEl = document.getElementById('runway-health-ring');

            if (liquidEl) liquidEl.textContent = `₹${liquidReserves.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
            if (payableEl) payableEl.textContent = `₹${supplierPayables.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
            if (receivableEl) receivableEl.textContent = `₹${clientReceivables.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
            if (netEl) netEl.textContent = `₹${netWorkingCapital.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
            if (monthsEl) monthsEl.textContent = runwayMonths.toFixed(1);
            if (ringEl) {
                const normalized = Math.max(0, Math.min(100, Math.round((runwayMonths / 18) * 100)));
                ringEl.setAttribute('stroke-dasharray', `${(normalized / 100) * 97.4}, 100`);
                ringEl.setAttribute('stroke', normalized > 60 ? '#34d399' : normalized > 30 ? '#f59e0b' : '#f43f5e');
            }

            renderCashRunwayBufferRecommendations({ liquidReserves, supplierPayables, clientReceivables, netWorkingCapital, monthlyBurn, runwayMonths });
        }

        function renderCashRunwayBufferRecommendations({ liquidReserves, supplierPayables, clientReceivables, netWorkingCapital, monthlyBurn, runwayMonths }) {
            const statusEl = document.getElementById('runway-buffering-status');
            const summaryEl = document.getElementById('runway-buffering-summary');
            const deferralEl = document.getElementById('runway-buffering-deferral');
            const incentiveEl = document.getElementById('runway-buffering-incentive');

            const runwayTarget = 2.5;
            const runwayRisk = runwayMonths < runwayTarget;
            const shortfall = Math.max(0, monthlyBurn * runwayTarget - netWorkingCapital);
            const recommendedDeferral = runwayRisk ? Math.min(supplierPayables * 0.25, shortfall * 0.75) : 0;
            const incentivePercent = runwayRisk && clientReceivables > 0 ? Math.min(4, Math.max(1, Math.round((shortfall / clientReceivables) * 100))) : 0;

            if (statusEl) {
                statusEl.textContent = runwayRisk ? 'Buffer mode active — runway under 2.5 months' : 'Cash runway healthy and stable';
            }
            if (summaryEl) {
                summaryEl.textContent = runwayRisk
                    ? `Short-term stress detected. Raise cash by accelerating receivable collection and delaying non-critical payables.`
                    : `Net working capital covers ${runwayMonths.toFixed(1)} months. Continue monitoring supplier and client flows.`;
            }
            if (deferralEl) {
                deferralEl.textContent = recommendedDeferral > 0
                    ? `Defer up to ₹${recommendedDeferral.toLocaleString('en-IN', {maximumFractionDigits:2})} of supplier invoices for 10–14 days.`
                    : 'No payable deferral recommended at this time.';
            }
            if (incentiveEl) {
                incentiveEl.textContent = incentivePercent > 0
                    ? `Offer a ${incentivePercent}% early-payment incentive to clients for faster receivable conversion.`
                    : 'Keep current receivable terms; no incentive needed.';
            }
        }

        function updateDashboardCounters() {
            AppState.lowStockCount = AppState.inventory.filter(item => item.stock <= AppState.lowStockThreshold).length;

            const revCard = document.getElementById('total-revenue-card');
            const lowCard = document.getElementById('low-stock-count-card');
            const staffCard = document.getElementById('active-staff-card');

            if (revCard) revCard.textContent = `₹${AppState.revenue.toLocaleString()}`;
            if (lowCard) lowCard.textContent = `${AppState.lowStockCount} Items Low`;
            if (staffCard) staffCard.textContent = `${AppState.activeStaff} / 15 Checked In`;

            const warningIndicator = document.getElementById('vault-card-indicator');
            const warningSubtext = document.getElementById('vault-card-subtext');
            const dockVaultBtn = document.getElementById('dock-btn-vault');

            if (warningIndicator) {
                if (AppState.lowStockCount > 0) {
                    warningIndicator.classList.add('pulse-warning');
                    warningIndicator.classList.remove('border-gray-800');
                    warningIndicator.classList.add('border-amber-500/40');
                    if (warningSubtext) warningSubtext.classList.remove('hidden');
                    if (dockVaultBtn) dockVaultBtn.classList.add('animate-bounce');
                    
                    announceWithChetanVoice(`Alert. ${AppState.lowStockCount} inventory items reached warning reserves.`);
                } else {
                    warningIndicator.classList.remove('pulse-warning');
                    warningIndicator.classList.add('border-gray-800');
                    warningIndicator.classList.remove('border-amber-500/40');
                    if (warningSubtext) warningSubtext.classList.add('hidden');
                    if (dockVaultBtn) dockVaultBtn.classList.remove('animate-bounce');
                }
            }

            const liveGraphTag = document.getElementById('live-graph-tag');
            const telemetryCashBubble = document.getElementById('telemetry-cash-bubble');

            updateRunwayTelemetry();

            if (liveGraphTag) liveGraphTag.textContent = `₹${AppState.revenue.toLocaleString()}`;
            if (telemetryCashBubble) telemetryCashBubble.textContent = `₹${AppState.revenue.toLocaleString()} REAL-TIME`;
        }

        function executeHudCommand(cmdText) {
            cmdText = cmdText.trim();
            if (!cmdText.startsWith('/')) {
                logToSystem('info', `Unrecognized protocol input. Type "/help" for commands list.`);
                return;
            }

            const parts = cmdText.split(' ');
            const command = parts[0].toLowerCase();
            const argString = parts.slice(1).join(' ');

            if (command === '/help') {
                logToSystem('info', 'Vyapaar OS HUD Terminal Commands', 
                    '<b>/bill [name]</b> - Quick Bill Item<br><b>/restock [name] [qty]</b> - Fill Stock<br><b>/additem [name] [price]</b> - Add Product<br><b>/status</b> - Run System Diagnostics');
            } else if (command === '/bill') {
                const target = AppState.catalog.find(x => x.name.toLowerCase().includes(argString.toLowerCase()));
                if (target) {
                    addBillingItem(target.name, target.price);
                    openModal('modal-inflow');
                    logToSystem('success', `HUD Cmd added item to cart: ${target.name}`);
                } else {
                    logToSystem('warning', `HUD Cmd failed: Item "${argString}" not found in catalog.`);
                }
            } else if (command === '/restock') {
                const words = argString.split(' ');
                const qty = parseInt(words[words.length - 1]);
                const prodQuery = words.slice(0, words.length - 1).join(' ');
                
                if (isNaN(qty) || !prodQuery) {
                    logToSystem('warning', 'HUD Cmd syntax error. Use: /restock [name] [qty]');
                    return;
                }

                const item = AppState.inventory.find(i => i.name.toLowerCase().includes(prodQuery.toLowerCase()));
                if (item) {
                    item.stock += qty;
                    rebuildVaultInventory();
                    updateWorkspaceScorecard();
                    updateDashboardCounters();
                    saveState();
                    logToSystem('success', `HUD Cmd Stock replenished: ${item.name}`, `Added +${qty} units`);
                } else {
                    logToSystem('warning', `HUD Cmd failed: Product matching "${prodQuery}" not found.`);
                }
            } else if (command === '/additem') {
                const words = argString.split(' ');
                const price = parseFloat(words[words.length - 1]);
                const name = words.slice(0, words.length - 1).join(' ');

                if (isNaN(price) || !name) {
                    logToSystem('warning', 'HUD Cmd syntax error. Use: /additem [name] [price]');
                    return;
                }

                AppState.catalog.push({ name, price, category: "Custom" });
                AppState.inventory.push({ name, stock: 20 });
                renderCatalog();
                rebuildVaultInventory();
                populatePurchaseDeskDropdowns();
                populateSalesDeskDropdowns();
                populateReturnsDropdown();
                updateWorkspaceScorecard();
                saveState();
                logToSystem('success', `HUD Cmd Product registered: ${name}`, `Price: ₹${price}`);
            } else if (command === '/status') {
                logToSystem('success', 'Diagnostics Complete. Node health optimal.', `Revenue: ₹${AppState.revenue} | Staff checked-in: ${AppState.activeStaff}/15`);
            } else {
                logToSystem('warning', `Invalid terminal command pattern: "${command}".`);
            }
        }

        function exportLedgerCSV() {
            let csvContent = "Transaction Ref,Date,Debit Account,Credit Account,Type,Amount\n";
            AppState.ledger.forEach(row => {
                csvContent += `"${row.ref}","${row.time}","${row.debit}","${row.credit}","${row.type}",${row.amount}\n`;
            });

            const tempTextArea = document.createElement("textarea");
            tempTextArea.value = csvContent;
            document.body.appendChild(tempTextArea);
            tempTextArea.select();
            document.execCommand('copy');
            document.body.removeChild(tempTextArea);

            logToSystem('success', 'Double-entry ledger data compiled successfully!', 'Clean CSV dataset copied to system clipboard.');
        }

        function logComplianceAudit(actionStr, targetModule) {
            const codeHex = "SEC-" + Math.floor(1000 + Math.random() * 9000).toString(16).toUpperCase();
            const timestamp = new Date().toLocaleString();
            AppState.auditLog.unshift({
                action: actionStr,
                module: targetModule,
                timestamp: timestamp,
                integrityCode: codeHex
            });
            if(AppState.auditLog.length > 30) AppState.auditLog.pop();
            rebuildComplianceAuditRegistry();
            saveState();
        }

        function rebuildComplianceAuditRegistry() {
            const tbody = document.getElementById('compliance-audit-tbody');
            if (!tbody) return;
            tbody.innerHTML = AppState.auditLog.map(row => `
                <tr class="text-slate-300">
                    <td class="py-2.5 font-semibold text-white">${row.action}</td>
                    <td class="py-2.5"><span class="px-2 py-0.5 rounded text-[10px] bg-purple-500/10 text-purple-300 border border-purple-500/20 uppercase font-bold">${row.module}</span></td>
                    <td class="py-2.5 text-gray-400 font-medium">${row.timestamp}</td>
                    <td class="py-2.5 text-right code-font text-purple-400 font-bold">${row.integrityCode}</td>
                </tr>
            `).join('');
        }

        function populateReturnsDropdown() {
            const retSel = document.getElementById('return-item-select');
            if (retSel) {
                retSel.innerHTML = AppState.catalog.map(item => `
                    <option value="${item.name}">${item.name}</option>
                `).join('');
            }
        }

        function commitProductReturn() {
            const invoiceRef = document.getElementById('return-invoice-ref').value.trim();
            const productName = document.getElementById('return-item-select').value;
            const qty = parseInt(document.getElementById('return-qty').value) || 0;
            const reason = document.getElementById('return-reason').value;

            if (!invoiceRef || qty <= 0) {
                showSystemToast('error', 'Fields Invalid', 'Ensure return quantity registers above 0 and Invoice ID is set.');
                return;
            }

            const catalogItem = AppState.catalog.find(i => i.name === productName);
            const valueReleased = catalogItem ? (catalogItem.price * qty) : 0;

            const returnID = `RET-${Math.floor(100 + Math.random() * 900)}`;
            const timeStr = new Date().toLocaleString();

            AppState.returns.unshift({
                ref: returnID,
                originalInvoice: invoiceRef,
                product: productName,
                qty: qty,
                reason: reason,
                value: valueReleased,
                time: timeStr
            });

            // Adjust stock inventory back inside the vault
            const invItem = AppState.inventory.find(i => i.name === productName);
            if (invItem) {
                invItem.stock += qty;
            }

            // Adjust financial ledger
            AppState.revenue -= valueReleased;
            AppState.ledger.push({
                ref: returnID,
                time: timeStr,
                debit: `Refund Issued: Standard Exchanges`,
                credit: `Returned ${qty} units of ${productName}`,
                type: "expense",
                amount: valueReleased
            });

            rebuildReturnsRegistry();
            rebuildVaultInventory();
            rebuildLedger();
            updateWorkspaceScorecard();
            updateDashboardCounters();
            saveState();

            logToSystem('warning', `Processed Return request ID: ${returnID}`, `Value refunded: ₹${valueReleased.toLocaleString()}`);
            logComplianceAudit(`Processed return slip. Return ID: ${returnID}. Reason: ${reason}`, "RETURNS");
            
            showSystemToast('success', 'Inward Return slips processed', `Inventory updated and ₹${valueReleased} value refund slips committed.`);
            
            // Clear inputs
            document.getElementById('return-invoice-ref').value = '';
            document.getElementById('return-qty').value = '1';
            closeModal('modal-returns');
        }

        function rebuildReturnsRegistry() {
            const tbody = document.getElementById('returns-registry-tbody');
            if (!tbody) return;
            if (AppState.returns.length === 0) {
                tbody.innerHTML = `<tr><td colspan="5" class="text-center py-6 text-gray-500">No inward returns slips registered.</td></tr>`;
                return;
            }
            tbody.innerHTML = AppState.returns.map(row => `
                <tr class="text-slate-300">
                    <td class="py-2.5 font-semibold text-rose-400">${row.ref}</td>
                    <td class="py-2.5 code-font">${row.originalInvoice}</td>
                    <td class="py-2.5">${row.product}</td>
                    <td class="py-2.5 text-center font-bold">${row.qty}</td>
                    <td class="py-2.5 text-right font-bold text-rose-400">-₹${row.value.toLocaleString()}</td>
                </tr>
            `).join('');
        }

        function populateCommissionStaffDropdown() {
            const comSel = document.getElementById('com-staff-select');
            if (comSel) {
                comSel.innerHTML = AppState.staff.map(member => `
                    <option value="${member.name}">${member.name} (${member.role})</option>
                `).join('');
            }
        }

        function commitStaffCommission() {
            const staffName = document.getElementById('com-staff-select').value;
            const amount = parseFloat(document.getElementById('com-payout-val').value) || 0;
            const reason = document.getElementById('com-payout-desc').value.trim() || "Commission payout";

            if (amount <= 0 || !staffName) {
                showSystemToast('error', 'Payload Invalid', 'Disbursed commission must register above ₹0.00.');
                return;
            }

            const timeStr = new Date().toLocaleString();
            AppState.commissions.unshift({
                staffName: staffName,
                reason: reason,
                time: timeStr,
                amount: amount
            });

            // Expense registration on central double-entry ledger
            const refID = `TX-${Math.floor(100 + Math.random() * 900)}-PAYROLL`;
            AppState.expenses += amount;
            AppState.ledger.push({
                ref: refID,
                time: timeStr,
                debit: `Operating Payroll / Commissions`,
                credit: `Staff Disbursal: ${staffName}`,
                type: "expense",
                amount: amount
            });

            rebuildCommissionsRegistry();
            rebuildLedger();
            updateWorkspaceScorecard();
            updateDashboardCounters();
            saveState();

            logToSystem('warning', `Disbursed performance reward to ${staffName}`, `Value: ₹${amount}`);
            logComplianceAudit(`Recorded performance commission payout of ₹${amount} to ${staffName}`, "PAYROLL");

            showSystemToast('success', 'Payroll slip generated successfully', `Amount ₹${amount} has been added to operational costs.`);
            
            document.getElementById('com-payout-val').value = '';
            document.getElementById('com-payout-desc').value = '';
            closeModal('modal-commission');
        }

        function rebuildCommissionsRegistry() {
            const tbody = document.getElementById('commissions-registry-tbody');
            if (!tbody) return;
            if (AppState.commissions.length === 0) {
                tbody.innerHTML = `<tr><td colspan="4" class="text-center py-6 text-gray-500">No payroll or target rewards documented.</td></tr>`;
                return;
            }
            tbody.innerHTML = AppState.commissions.map(row => `
                <tr class="text-slate-300">
                    <td class="py-2.5 font-semibold text-white">${row.staffName}</td>
                    <td class="py-2.5 text-gray-400 font-medium">${row.reason}</td>
                    <td class="py-2.5 text-gray-400">${row.time}</td>
                    <td class="py-2.5 text-right font-bold text-amber-400">₹${row.amount.toLocaleString()}</td>
                </tr>
            `).join('');
        }

        function rebuildAnalyticsRatios() {
            const grossInflows = AppState.ledger.filter(x => x.type === 'inflow').reduce((sum, x) => sum + x.amount, 0);
            const grossExpenses = AppState.ledger.filter(x => x.type === 'expense').reduce((sum, x) => sum + x.amount, 0);
            const netCash = grossInflows - grossExpenses;
            
            const totalCommissions = AppState.commissions.reduce((sum, x) => sum + x.amount, 0);
            const totalOrders = AppState.sales.length + AppState.purchases.length;

            let marginPercent = 100;
            if (grossInflows > 0) {
                marginPercent = Math.round((netCash / grossInflows) * 100);
            }

            const inflowEl = document.getElementById('analytics-gross-inflow');
            const expenseEl = document.getElementById('analytics-gross-expense');
            const marginEl = document.getElementById('analytics-gross-margin');
            const ordersEl = document.getElementById('analytics-orders-logged');

            if (inflowEl) inflowEl.textContent = `₹${grossInflows.toLocaleString()}`;
            if (expenseEl) expenseEl.textContent = `₹${grossExpenses.toLocaleString()}`;
            if (marginEl) marginEl.textContent = `${marginPercent}%`;
            if (ordersEl) ordersEl.textContent = totalOrders;

            // Fill top performing products list
            const pList = document.getElementById('analytics-products-list');
            if (pList) {
                const groupedSales = {};
                AppState.sales.forEach(s => {
                    groupedSales[s.product] = (groupedSales[s.product] || 0) + s.qty;
                });

                const sorted = Object.entries(groupedSales).sort((a,b) => b[1] - a[1]);
                if (sorted.length === 0) {
                    pList.innerHTML = `<div class="text-gray-500 text-xs text-center py-6">No outbound sales logged for volume analysis.</div>`;
                } else {
                    pList.innerHTML = sorted.map(([prod, qty]) => `
                        <div class="flex justify-between items-center bg-gray-900/40 border border-white/[0.02] p-2.5 rounded-lg text-xs">
                            <span class="text-white font-medium">${prod}</span>
                            <span class="code-font text-cyan-400 font-bold">${qty} Units Sold</span>
                        </div>
                    `).join('');
                }
            }

            // Fill svg circle center text
            const percentageCenter = document.getElementById('analytics-percentage-center');
            const circleFill = document.getElementById('analytics-circle-fill');
            if (percentageCenter && circleFill) {
                let share = 100;
                if (grossInflows + grossExpenses > 0) {
                    share = Math.round((grossInflows / (grossInflows + grossExpenses)) * 100);
                }
                percentageCenter.textContent = `${share}%`;
                circleFill.setAttribute('stroke-dasharray', `${share}, 100`);
            }
        }

        // Hotkey bindings engine
        window.addEventListener('keydown', function(e) {
            if (e.key === 'F2') {
                e.preventDefault();
                openModal('modal-inflow');
            } else if (e.key === 'F9') {
                e.preventDefault();
                openModal('modal-sales-desk');
            } else if (e.key === '/') {
                if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'SELECT') {
                    e.preventDefault();
                    document.getElementById('hud-command-input').focus();
                }
            } else if (e.key === 'Escape') {
                e.preventDefault();
                closeAllOverlays();
            }
        });

        // ===== ANALYTICS & REPORTS =====
        function openModal(id) {
            playPositiveSound();
            const modal = document.getElementById(id);
            modal.classList.remove('translate-y-full', 'opacity-0', 'pointer-events-none');
            modal.classList.add('translate-y-0', 'opacity-100');
            
            if (id === 'modal-roster') {
                populateRosterEmployeeOptions();
                rebuildStaffRoster();
            }
            if(id === 'modal-chetan') {
                document.getElementById('ai-panel-revenue').textContent = `₹${AppState.revenue.toLocaleString()}`;
                document.getElementById('ai-panel-deficits').textContent = `${AppState.lowStockCount} Items Low`;
                document.getElementById('ai-panel-staff').textContent = `${AppState.activeStaff} Active`;
            }
            if (id === 'modal-analytics') {
                rebuildAnalyticsRatios();
            }
            if (id === 'modal-returns') {
                populateReturnsDropdown();
                rebuildReturnsRegistry();
            }
            if (id === 'modal-audit') {
                rebuildComplianceAuditRegistry();
            }
            if (id === 'modal-commission') {
                populateCommissionStaffDropdown();
                rebuildCommissionsRegistry();
            }
            if (id === 'modal-product-master') {
                rebuildProductMasterGrid();
            }
            if (id === 'modal-product-master') {
                rebuildProductMasterGrid();
            }
            if (id === 'modal-labour-onboard') {
                rebuildLabourRegistry();
            }
        }

        function rebuildAnalyticsRatios() {
            const grossInflows = AppState.ledger.filter(x => x.type === 'inflow').reduce((sum, x) => sum + x.amount, 0);
            const grossExpenses = AppState.ledger.filter(x => x.type === 'expense').reduce((sum, x) => sum + x.amount, 0);
            const netCash = grossInflows - grossExpenses;
            
            const totalOrders = AppState.sales.length + AppState.purchases.length;
            let marginPercent = 100;
            if (grossInflows > 0) {
                marginPercent = Math.round((netCash / grossInflows) * 100);
            }

            document.getElementById('analytics-gross-inflow').textContent = `₹${grossInflows.toLocaleString()}`;
            document.getElementById('analytics-gross-expense').textContent = `₹${grossExpenses.toLocaleString()}`;
            document.getElementById('analytics-gross-margin').textContent = `${marginPercent}%`;
            document.getElementById('analytics-orders-logged').textContent = totalOrders;

            // Fill top performing products list
            const pList = document.getElementById('analytics-products-list');
            if (pList) {
                const groupedSales = {};
                AppState.sales.forEach(s => {
                    groupedSales[s.product] = (groupedSales[s.product] || 0) + s.qty;
                });

                const sorted = Object.entries(groupedSales).sort((a,b) => b[1] - a[1]);
                if (sorted.length === 0) {
                    pList.innerHTML = `<div class="text-gray-500 text-xs text-center py-6">No outbound sales logged for volume analysis.</div>`;
                } else {
                    pList.innerHTML = sorted.map(([prod, qty]) => `
                        <div class="flex justify-between items-center bg-gray-900/40 border border-white/[0.02] p-2.5 rounded-lg text-xs">
                            <span class="text-white font-medium">${prod}</span>
                            <span class="code-font text-cyan-400 font-bold">${qty} Units Sold</span>
                        </div>
                    `).join('');
                }
            }

            // Fill svg circle center text
            const percentageCenter = document.getElementById('analytics-percentage-center');
            const circleFill = document.getElementById('analytics-circle-fill');
            if (percentageCenter && circleFill) {
                let share = 100;
                if (grossInflows + grossExpenses > 0) {
                    share = Math.round((grossInflows / (grossInflows + grossExpenses)) * 100);
                }
                percentageCenter.textContent = `${share}%`;
                circleFill.setAttribute('stroke-dasharray', `${share}, 100`);
            }
        }

        // ===== LABOUR / STAFF ONBOARDING =====
        let editingLabourIndex = null;

        function setLabourFormMode(isEditing) {
            const submitBtn = document.getElementById('labour-submit-btn');
            const submitIcon = document.getElementById('labour-submit-icon');
            const submitLabel = document.getElementById('labour-submit-label');
            if (!submitBtn || !submitIcon || !submitLabel) return;

            if (isEditing) {
                submitBtn.classList.remove('bg-cyan-600', 'hover:bg-cyan-500');
                submitBtn.classList.add('bg-amber-600', 'hover:bg-amber-500');
                submitIcon.textContent = 'save';
                submitLabel.textContent = 'Save Changes';
            } else {
                submitBtn.classList.remove('bg-amber-600', 'hover:bg-amber-500');
                submitBtn.classList.add('bg-cyan-600', 'hover:bg-cyan-500');
                submitIcon.textContent = 'person_add';
                submitLabel.textContent = 'Onboard Staff Member';
            }
        }

        function resetLabourForm() {
            document.getElementById('lab-add-name').value = '';
            document.getElementById('lab-add-role').value = '';
            document.getElementById('lab-add-phone').value = '';
            document.getElementById('lab-add-wage').value = '';
            editingLabourIndex = null;
            setLabourFormMode(false);
        }

        function populateLabourForm(index) {
            const member = AppState.staff[index];
            if (!member) return;

            editingLabourIndex = index;
            document.getElementById('lab-add-name').value = member.name || '';
            document.getElementById('lab-add-role').value = member.role || '';
            document.getElementById('lab-add-phone').value = member.phone || '';
            document.getElementById('lab-add-wage').value = member.wage || 0;
            setLabourFormMode(true);
            showSystemToast('info', 'Editing Staff Record', `Update ${member.name}'s details and save.`);
        }

        function registerNewLabour() {
            const name = document.getElementById('lab-add-name').value.trim();
            const role = document.getElementById('lab-add-role').value.trim();
            const phone = document.getElementById('lab-add-phone').value.trim();
            const wage = parseFloat(document.getElementById('lab-add-wage').value) || 0;

            if (!name || !role) {
                showSystemToast('error', 'Missing Data', 'Staff Name and Role are mandatory fields.');
                return;
            }

            if (editingLabourIndex !== null && AppState.staff[editingLabourIndex]) {
                const member = AppState.staff[editingLabourIndex];
                member.name = name;
                member.role = role;
                member.phone = phone;
                member.wage = wage;

                resetLabourForm();
                rebuildStaffRoster();
                rebuildLabourRegistry();
                populateCommissionStaffDropdown();
                updateDashboardCounters();
                saveState();

                logToSystem('success', `Updated staff record: ${name}`, `Role: ${role}`);
                logComplianceAudit(`Labour update: ${name} (${role})`, "ROSTER");
                showSystemToast('success', 'Staff Updated', `${name} record saved successfully.`);
                return;
            }

            AppState.staff.push({
                name: name,
                role: role,
                phone: phone,
                wage: wage,
                present: false,
                lastEvent: "N/A"
            });

            resetLabourForm();
            rebuildStaffRoster();
            rebuildLabourRegistry();
            populateCommissionStaffDropdown();
            updateDashboardCounters();
            saveState();

            logToSystem('success', `Onboarded new staff: ${name}`, `Role: ${role}`);
            logComplianceAudit(`Labour onboarding: ${name} (${role})`, "ROSTER");
            showSystemToast('success', 'Staff Onboarded', `${name} added to labour roster.`);
        }

        function rebuildLabourRegistry() {
            const tbody = document.getElementById('labour-registry-tbody');
            if (!tbody) return;

            tbody.innerHTML = AppState.staff.map((member, idx) => `
                <tr class="text-slate-300">
                    <td class="py-2.5 pr-2">
                        <strong class="text-white text-xs block">${member.name}</strong>
                        <span class="text-[10px] text-gray-500 block">${member.role}</span>
                    </td>
                    <td class="py-2.5 text-[10px]">
                        <span class="block text-gray-400">${member.phone || 'No contact'}</span>
                        <span class="block text-cyan-400 font-bold">₹${(member.wage || 0).toLocaleString()}/mo</span>
                    </td>
                    <td class="py-2.5 text-center">
                        <span class="px-2 py-0.5 rounded-full text-[9px] font-bold ${member.present ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-gray-500/10 text-gray-400 border border-gray-800'}">
                            ${member.present ? 'ON DUTY' : 'OFF DUTY'}
                        </span>
                    </td>
                    <td class="py-2.5 text-right">
                        <div class="flex items-center justify-end gap-1.5">
                            <button onclick="populateLabourForm(${idx})" class="px-2 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 rounded text-[9px] font-bold cursor-pointer transition">
                                Edit
                            </button>
                            <button onclick="removeLabourMember(${idx})" class="px-2 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded text-[9px] font-bold cursor-pointer transition">
                                Remove
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('');
        }

        function removeLabourMember(idx) {
            const member = AppState.staff[idx];
            if (!member) return;
            AppState.staff.splice(idx, 1);

            if (editingLabourIndex !== null) {
                if (editingLabourIndex === idx) {
                    resetLabourForm();
                } else if (editingLabourIndex > idx) {
                    editingLabourIndex -= 1;
                }
            }

            rebuildStaffRoster();
            rebuildLabourRegistry();
            populateCommissionStaffDropdown();
            updateDashboardCounters();
            saveState();
            logToSystem('warning', `Removed staff member: ${member.name}`);
            logComplianceAudit(`Labour removal: ${member.name}`, "ROSTER");
        }

        // ===== PRODUCT MASTER (ADD NEW PRODUCTS) =====
        let editingProductMasterIndex = null;

        function resetProductMasterForm() {
            editingProductMasterIndex = null;
            document.getElementById('pm-name').value = '';
            document.getElementById('pm-company').value = '';
            document.getElementById('pm-type').value = '';
            document.getElementById('pm-stock').value = '0';
            document.getElementById('pm-mrp').value = '';
            document.getElementById('pm-purchase-rate').value = '';
            document.getElementById('pm-selling-rate').value = '';
            document.getElementById('pm-discount').value = '0';
            document.getElementById('pm-scheme').value = 'none';
            const saveBtn = document.getElementById('pm-save-btn');
            if (saveBtn) {
                saveBtn.innerHTML = '<span class="material-icons">save</span> Save Product to Master Catalog';
            }
        }

        function editProductMasterItem(idx) {
            const item = AppState.catalog[idx];
            if (!item) return;
            editingProductMasterIndex = idx;
            const inventoryItem = AppState.inventory.find(i => i.name === item.name);
            const displayName = item.name;
            const [companyPart, ...nameParts] = displayName.split(' ');
            document.getElementById('pm-name').value = nameParts.length ? nameParts.join(' ') : displayName;
            document.getElementById('pm-company').value = item.company || '';
            document.getElementById('pm-type').value = item.category || 'General';
            document.getElementById('pm-stock').value = inventoryItem ? String(inventoryItem.stock) : '0';
            document.getElementById('pm-mrp').value = item.mrp || '';
            document.getElementById('pm-purchase-rate').value = item.costPrice || '';
            document.getElementById('pm-selling-rate').value = item.price || '';
            document.getElementById('pm-discount').value = item.discount || '0';
            document.getElementById('pm-scheme').value = item.scheme || 'none';
            const saveBtn = document.getElementById('pm-save-btn');
            if (saveBtn) {
                saveBtn.innerHTML = '<span class="material-icons">edit</span> Update Product';
            }
            openModal('modal-product-master');
            showSystemToast('info', 'Edit Product', `Editing ${item.name} in the master catalog.`);
        }

        function registerProductMaster() {
            const name = document.getElementById('pm-name').value.trim();
            const company = document.getElementById('pm-company').value.trim();
            const type = document.getElementById('pm-type').value.trim() || 'General';
            const stock = parseInt(document.getElementById('pm-stock').value, 10) || 0;
            const mrp = parseFloat(document.getElementById('pm-mrp').value) || 0;
            const purchaseRate = parseFloat(document.getElementById('pm-purchase-rate').value) || 0;
            const sellingRate = parseFloat(document.getElementById('pm-selling-rate').value) || 0;
            const discount = parseFloat(document.getElementById('pm-discount').value) || 0;
            const scheme = document.getElementById('pm-scheme').value;

            if (!name || sellingRate <= 0) {
                showSystemToast('error', 'Missing Data', 'Product Name and Selling Rate are mandatory fields.');
                return;
            }

            const displayName = company ? `${company} ${name}` : name;

            if (editingProductMasterIndex !== null && AppState.catalog[editingProductMasterIndex]) {
                const item = AppState.catalog[editingProductMasterIndex];
                const oldItemName = item.name;
                item.name = displayName;
                item.price = sellingRate;
                item.category = type;
                item.costPrice = purchaseRate;
                item.mrp = mrp;
                item.company = company;
                item.discount = discount;
                item.scheme = scheme;

                const inventoryItem = AppState.inventory.find(i => i.name === oldItemName);
                if (inventoryItem) {
                    inventoryItem.name = displayName;
                    inventoryItem.stock = stock;
                } else {
                    AppState.inventory.push({ name: displayName, stock: stock });
                }

                showSystemToast('success', 'Product Updated', `${displayName} was updated in the master catalog.`);
                logToSystem('success', `Product Master: updated "${displayName}"`, `Sells at ₹${sellingRate}`);
                logComplianceAudit(`Product Master update: ${displayName}`, 'INVENTORY');
            } else {
                AppState.catalog.push({
                    name: displayName,
                    price: sellingRate,
                    category: type,
                    costPrice: purchaseRate,
                    mrp: mrp,
                    company: company,
                    discount: discount,
                    scheme: scheme
                });
                AppState.inventory.push({ name: displayName, stock: stock });

                showSystemToast('success', 'Product Saved', `${displayName} added to master catalog.`);
                logToSystem('success', `Product Master: registered "${displayName}"`, `Sells at ₹${sellingRate}`);
                logComplianceAudit(`Product Master addition: ${displayName}`, 'INVENTORY');
            }

            resetProductMasterForm();
            renderCatalog();
            rebuildVaultInventory();
            rebuildProductMasterGrid();
            populatePurchaseDeskDropdowns();
            populateSalesDeskDropdowns();
            populateReturnsDropdown();
            updateWorkspaceScorecard();
            saveState();
        }

        function rebuildProductMasterGrid() {
            const tbody = document.getElementById('product-master-tbody');
            if (!tbody) return;

            tbody.innerHTML = AppState.catalog.map((item, idx) => {
                const invItem = AppState.inventory.find(i => i.name === item.name);
                const stock = invItem ? invItem.stock : 0;
                return `
                    <tr class="text-slate-300">
                        <td class="py-2.5 pr-2">
                            <strong class="text-white text-xs block">${item.name}</strong>
                            <span class="text-[10px] text-gray-500 block">${item.company || 'No Brand Set'}</span>
                        </td>
                        <td class="py-2.5">${item.category || 'General'}</td>
                        <td class="py-2.5 text-center code-font text-[10px]">₹${item.mrp || 0} / ₹${item.costPrice || 0} / ₹${item.price}</td>
                        <td class="py-2.5 text-center font-bold ${stock <= AppState.lowStockThreshold ? 'text-amber-400' : 'text-gray-300'}">${stock}</td>
                        <td class="py-2.5 text-right flex justify-end items-center gap-2">
                            <button onclick="editProductMasterItem(${idx})" class="px-2 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/20 rounded text-[9px] font-bold cursor-pointer transition">
                                Edit
                            </button>
                            <button onclick="deleteProductMasterItem(${idx})" class="px-2 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded text-[9px] font-bold cursor-pointer transition">
                                Remove
                            </button>
                        </td>
                    </tr>
                `;
            }).join('');
        }

        function deleteProductMasterItem(idx) {
            const item = AppState.catalog[idx];
            if (!item) return;
            AppState.catalog.splice(idx, 1);
            AppState.inventory = AppState.inventory.filter(i => i.name !== item.name);

            renderCatalog();
            rebuildVaultInventory();
            rebuildProductMasterGrid();
            populatePurchaseDeskDropdowns();
            populateSalesDeskDropdowns();
            populateReturnsDropdown();
            saveState();
            logToSystem('warning', `Product removed from master catalog: ${item.name}`);
            logComplianceAudit(`Product Master removal: ${item.name}`, "INVENTORY");
        }

        function filterProductMasterGrid() {
            const query = document.getElementById('pm-search').value.toLowerCase();
            const rows = document.querySelectorAll('#product-master-tbody > tr');
            rows.forEach(row => {
                row.style.display = row.textContent.toLowerCase().includes(query) ? '' : 'none';
            });
        }

        // ===== RETURNS & EXCHANGES =====
        function populateReturnsDropdown() {
            const retSel = document.getElementById('return-item-select');
            if (retSel) {
                retSel.innerHTML = AppState.catalog.map(item => `
                    <option value="${item.name}">${item.name}</option>
                `).join('');
            }
        }

        function commitProductReturn() {
            const invoiceRef = document.getElementById('return-invoice-ref').value.trim();
            const productName = document.getElementById('return-item-select').value;
            const qty = parseInt(document.getElementById('return-qty').value) || 0;
            const reason = document.getElementById('return-reason').value;

            if (!invoiceRef || qty <= 0) {
                showSystemToast('error', 'Fields Invalid', 'Ensure return quantity registers above 0 and Invoice ID is set.');
                return;
            }

            const catalogItem = AppState.catalog.find(i => i.name === productName);
            const valueReleased = catalogItem ? (catalogItem.price * qty) : 0;

            const returnID = `RET-${Math.floor(100 + Math.random() * 900)}`;
            const timeStr = new Date().toLocaleString();

            AppState.returns.unshift({
                ref: returnID,
                originalInvoice: invoiceRef,
                product: productName,
                qty: qty,
                reason: reason,
                value: valueReleased,
                time: timeStr
            });

            // Adjust stock inventory back inside the vault
            const invItem = AppState.inventory.find(i => i.name === productName);
            if (invItem) {
                invItem.stock += qty;
            }

            // Adjust financial ledger
            AppState.revenue -= valueReleased;
            AppState.ledger.push({
                ref: returnID,
                time: timeStr,
                debit: `Refund Issued: Standard Exchanges`,
                credit: `Returned ${qty} units of ${productName}`,
                type: "expense",
                amount: valueReleased
            });

            rebuildReturnsRegistry();
            rebuildVaultInventory();
            rebuildLedger();
            updateWorkspaceScorecard();
            updateDashboardCounters();
            saveState();

            logToSystem('warning', `Processed Return request ID: ${returnID}`, `Value refunded: ₹${valueReleased.toLocaleString()}`);
            logComplianceAudit(`Processed return slip. Return ID: ${returnID}. Reason: ${reason}`, "RETURNS");
            
            showSystemToast('success', 'Inward Return slips processed', `Inventory updated and ₹${valueReleased} value refund slips committed.`);
            
            // Clear inputs
            document.getElementById('return-invoice-ref').value = '';
            document.getElementById('return-qty').value = '1';
            closeModal('modal-returns');
        }

        function rebuildReturnsRegistry() {
            const tbody = document.getElementById('returns-registry-tbody');
            if (!tbody) return;
            if (AppState.returns.length === 0) {
                tbody.innerHTML = `<tr><td colspan="5" class="text-center py-6 text-gray-500">No inward returns slips registered.</td></tr>`;
                return;
            }
            tbody.innerHTML = AppState.returns.map(row => `
                <tr class="text-slate-300">
                    <td class="py-2.5 font-semibold text-rose-400">${row.ref}</td>
                    <td class="py-2.5 code-font">${row.originalInvoice}</td>
                    <td class="py-2.5">${row.product}</td>
                    <td class="py-2.5 text-center font-bold">${row.qty}</td>
                    <td class="py-2.5 text-right font-bold text-rose-400">-₹${row.value.toLocaleString()}</td>
                </tr>
            `).join('');
        }

        // ===== COMPLIANCE SECURITY AUDIT TRAIL =====
        function logComplianceAudit(actionStr, targetModule) {
            const codeHex = "SEC-" + Math.floor(1000 + Math.random() * 9000).toString(16).toUpperCase();
            const timestamp = new Date().toLocaleString();
            AppState.auditLog.unshift({
                action: actionStr,
                module: targetModule,
                timestamp: timestamp,
                integrityCode: codeHex
            });
            if(AppState.auditLog.length > 30) AppState.auditLog.pop();
            rebuildComplianceAuditRegistry();
            saveState();
        }

        function rebuildComplianceAuditRegistry() {
            const tbody = document.getElementById('compliance-audit-tbody');
            if (!tbody) return;
            tbody.innerHTML = AppState.auditLog.map(row => `
                <tr class="text-slate-300">
                    <td class="py-2.5 font-semibold text-white">${row.action}</td>
                    <td class="py-2.5"><span class="px-2 py-0.5 rounded text-[10px] bg-purple-500/10 text-purple-300 border border-purple-500/20 uppercase font-bold">${row.module}</span></td>
                    <td class="py-2.5 text-gray-400 font-medium">${row.timestamp}</td>
                    <td class="py-2.5 text-right code-font text-purple-400 font-bold">${row.integrityCode}</td>
                </tr>
            `).join('');
        }

        // ===== COMMISSION & STAFF PAYROLL =====
        function populateCommissionStaffDropdown() {
            const comSel = document.getElementById('com-staff-select');
            if (comSel) {
                comSel.innerHTML = AppState.staff.map(member => `
                    <option value="${member.name}">${member.name} (${member.role})</option>
                `).join('');
            }
        }

        function commitStaffCommission() {
            const staffName = document.getElementById('com-staff-select').value;
            const amount = parseFloat(document.getElementById('com-payout-val').value) || 0;
            const reason = document.getElementById('com-payout-desc').value.trim() || "Commission payout";

            if (amount <= 0 || !staffName) {
                showSystemToast('error', 'Payload Invalid', 'Disbursed commission must register above ₹0.00.');
                return;
            }

            const timeStr = new Date().toLocaleString();
            AppState.commissions.unshift({
                staffName: staffName,
                reason: reason,
                time: timeStr,
                amount: amount
            });

            // Expense registration on central double-entry ledger
            const refID = `TX-${Math.floor(100 + Math.random() * 900)}-PAYROLL`;
            AppState.expenses += amount;
            AppState.ledger.push({
                ref: refID,
                time: timeStr,
                debit: `Operating Payroll / Commissions`,
                credit: `Staff Disbursal: ${staffName}`,
                type: "expense",
                amount: amount
            });

            rebuildCommissionsRegistry();
            rebuildLedger();
            updateWorkspaceScorecard();
            updateDashboardCounters();
            saveState();

            logToSystem('warning', `Disbursed performance reward to ${staffName}`, `Value: ₹${amount}`);
            logComplianceAudit(`Recorded performance commission payout of ₹${amount} to ${staffName}`, "PAYROLL");

            showSystemToast('success', 'Payroll slip generated successfully', `Amount ₹${amount} has been added to operational costs.`);
            
            document.getElementById('com-payout-val').value = '';
            document.getElementById('com-payout-desc').value = '';
            closeModal('modal-commission');
        }

        function rebuildCommissionsRegistry() {
            const tbody = document.getElementById('commissions-registry-tbody');
            if (!tbody) return;
            if (AppState.commissions.length === 0) {
                tbody.innerHTML = `<tr><td colspan="4" class="text-center py-6 text-gray-500">No payroll or target rewards documented.</td></tr>`;
                return;
            }
            tbody.innerHTML = AppState.commissions.map(row => `
                <tr class="text-slate-300">
                    <td class="py-2.5 font-semibold text-white">${row.staffName}</td>
                    <td class="py-2.5 text-gray-400 font-medium">${row.reason}</td>
                    <td class="py-2.5 text-gray-400">${row.time}</td>
                    <td class="py-2.5 text-right font-bold text-amber-400">₹${row.amount.toLocaleString()}</td>
                </tr>
            `).join('');
        }

        function handlePettyCashSubmit(event, form) {
            event = event || (typeof window !== 'undefined' ? window.event : null);
            if (event && typeof event.preventDefault === 'function') {
                event.preventDefault();
            }
            if (!form || form.tagName !== 'FORM') {
                const source = event && event.target ? event.target : null;
                form = source && source.tagName === 'FORM' ? source : source && source.closest ? source.closest('form') : document.getElementById('petty-cash-form');
            }
            if (!form || form.tagName !== 'FORM') return false;

            const transactionType = form.querySelector('select[name="transaction_type"]');
            const amount = form.querySelector('input[name="amount"]');
            const narration = form.querySelector('textarea[name="narration"]');

            if (!transactionType || !amount || !narration) return false;

            if (!transactionType.value || !amount.value || !narration.value.trim()) {
                showSystemToast('error', 'Incomplete petty cash entry', 'Please fill the transaction type, amount, and narration.');
                return false;
            }

            const entryAmount = parseFloat(amount.value) || 0;
            const entryType = transactionType.value === 'Cash In' ? 'inflow' : 'expense';
            const entry = {
                ref: `PC-${Math.floor(1000 + Math.random() * 9000)}`,
                time: new Date().toLocaleString(),
                debit: entryType === 'inflow' ? 'Petty Cash Drawer' : narration.value.trim(),
                credit: entryType === 'inflow' ? 'Cash In Hand' : 'Petty Cash Expense',
                type: entryType,
                amount: entryAmount
            };

            AppState.ledger = Array.isArray(AppState.ledger) ? AppState.ledger : [];
            AppState.ledger.push(entry);
            AppState.revenue = (AppState.revenue || 0) + (entryType === 'inflow' ? entryAmount : 0);
            AppState.expenses = (AppState.expenses || 0) + (entryType === 'expense' ? entryAmount : 0);

            saveState();
            rebuildLedger();
            if (typeof rebuildTaxLedger === 'function') rebuildTaxLedger();

            showSystemToast('success', 'Petty cash entry saved', 'The day-book logger has stored your entry in the ledger.');
            closeModal('modal-petty-cash');
            form.reset();
            return true;
        }
    

        (function () {
            const rootId = 'vyapaar-finance-calc-root';

            function ensureRoot() {
                let root = document.getElementById(rootId);
                if (!root) {
                    root = document.createElement('div');
                    root.id = rootId;
                    document.body.appendChild(root);
                }
                return root;
            }

            function calculatorHTML() {
                return `
                    <div class="fixed bottom-6 right-6 z-50">
                        <div class="relative max-w-[440px] rounded-[28px] border border-cyan-500/40 bg-slate-950/95 p-6 shadow-2xl shadow-cyan-500/25 backdrop-blur-md">
                            <div class="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),transparent_42%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.14),transparent_38%)]"></div>

                            <div class="relative">
                                <div class="mb-5 flex items-center justify-between">
                                    <div class="flex items-center gap-3">
                                        <div class="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 shadow-lg shadow-cyan-500/10">
                                            <span class="material-icons text-2xl">calculate</span>
                                        </div>
                                        <div>
                                            <div class="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-300/80">Vyapaar Core</div>
                                            <div class="mt-0.5 text-lg font-black tracking-tight text-white">Finance & GST</div>
                                        </div>
                                    </div>

                                    <button type="button" class="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 text-slate-300 transition hover:text-white" aria-label="Close calculator" data-action="close">
                                        <span class="material-icons text-lg">close</span>
                                    </button>
                                </div>

                                <div class="rounded-2xl border border-cyan-500/20 bg-slate-900/80 p-4 shadow-inner shadow-cyan-500/5">
                                    <div class="flex items-center justify-between">
                                        <div class="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Live computation</div>
                                        <div id="vc-mem-indicator" class="hidden rounded-full border border-amber-500/25 bg-amber-500/10 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-amber-300">M</div>
                                    </div>

                                    <div id="vc-expression" class="mt-3 min-h-[22px] text-right text-xs font-medium text-cyan-200/75 code-font">0</div>
                                    <div id="vc-display" class="mt-1 min-h-[54px] overflow-hidden break-all text-right text-4xl font-black tracking-tight text-white code-font">0</div>
                                </div>

                                <div class="mt-5 grid grid-cols-2 gap-2">
                                    <button type="button" class="rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-3 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-200 transition hover:bg-cyan-500/15" data-gst="5">+5% GST</button>
                                    <button type="button" class="rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-3 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-200 transition hover:bg-cyan-500/15" data-gst="12">+12% GST</button>
                                    <button type="button" class="rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-3 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-200 transition hover:bg-cyan-500/15" data-gst="18">+18% GST</button>
                                    <button type="button" class="rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-3 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-200 transition hover:bg-cyan-500/15" data-gst="28">+28% GST</button>
                                    <button type="button" class="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-200 transition hover:bg-emerald-500/15" data-quick="margin">+20% Margin</button>
                                    <button type="button" class="rounded-xl border border-rose-500/20 bg-rose-500/10 px-3 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-rose-200 transition hover:bg-rose-500/15" data-clear="all">Clear</button>
                                </div>

                                <div class="mt-5 grid grid-cols-4 gap-2">
                                    <button type="button" class="rounded-xl border border-white/10 bg-slate-900/80 px-2 py-3 text-sm font-bold text-slate-200 transition hover:border-cyan-500/30 hover:bg-slate-800" data-memory="mc">MC</button>
                                    <button type="button" class="rounded-xl border border-white/10 bg-slate-900/80 px-2 py-3 text-sm font-bold text-slate-200 transition hover:border-cyan-500/30 hover:bg-slate-800" data-memory="mr">MR</button>
                                    <button type="button" class="rounded-xl border border-white/10 bg-slate-900/80 px-2 py-3 text-sm font-bold text-slate-200 transition hover:border-cyan-500/30 hover:bg-slate-800" data-memory="mplus">M+</button>
                                    <button type="button" class="rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-2 py-3 text-lg font-bold text-cyan-200 transition hover:bg-cyan-500/15" data-op="/">÷</button>

                                    <button type="button" class="rounded-xl border border-white/10 bg-slate-900/80 px-2 py-3 text-lg font-bold text-white transition hover:border-cyan-500/30 hover:bg-slate-800" data-digit="7">7</button>
                                    <button type="button" class="rounded-xl border border-white/10 bg-slate-900/80 px-2 py-3 text-lg font-bold text-white transition hover:border-cyan-500/30 hover:bg-slate-800" data-digit="8">8</button>
                                    <button type="button" class="rounded-xl border border-white/10 bg-slate-900/80 px-2 py-3 text-lg font-bold text-white transition hover:border-cyan-500/30 hover:bg-slate-800" data-digit="9">9</button>
                                    <button type="button" class="rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-2 py-3 text-lg font-bold text-cyan-200 transition hover:bg-cyan-500/15" data-op="*">×</button>

                                    <button type="button" class="rounded-xl border border-white/10 bg-slate-900/80 px-2 py-3 text-lg font-bold text-white transition hover:border-cyan-500/30 hover:bg-slate-800" data-digit="4">4</button>
                                    <button type="button" class="rounded-xl border border-white/10 bg-slate-900/80 px-2 py-3 text-lg font-bold text-white transition hover:border-cyan-500/30 hover:bg-slate-800" data-digit="5">5</button>
                                    <button type="button" class="rounded-xl border border-white/10 bg-slate-900/80 px-2 py-3 text-lg font-bold text-white transition hover:border-cyan-500/30 hover:bg-slate-800" data-digit="6">6</button>
                                    <button type="button" class="rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-2 py-3 text-lg font-bold text-cyan-200 transition hover:bg-cyan-500/15" data-op="-">−</button>

                                    <button type="button" class="rounded-xl border border-white/10 bg-slate-900/80 px-2 py-3 text-lg font-bold text-white transition hover:border-cyan-500/30 hover:bg-slate-800" data-digit="1">1</button>
                                    <button type="button" class="rounded-xl border border-white/10 bg-slate-900/80 px-2 py-3 text-lg font-bold text-white transition hover:border-cyan-500/30 hover:bg-slate-800" data-digit="2">2</button>
                                    <button type="button" class="rounded-xl border border-white/10 bg-slate-900/80 px-2 py-3 text-lg font-bold text-white transition hover:border-cyan-500/30 hover:bg-slate-800" data-digit="3">3</button>
                                    <button type="button" class="rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-2 py-3 text-lg font-bold text-cyan-200 transition hover:bg-cyan-500/15" data-op="+">+</button>

                                    <button type="button" class="rounded-xl border border-white/10 bg-slate-900/80 px-2 py-3 text-lg font-bold text-white transition hover:border-cyan-500/30 hover:bg-slate-800" data-digit=".">.</button>
                                    <button type="button" class="rounded-xl border border-white/10 bg-slate-900/80 px-2 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:border-cyan-500/30 hover:bg-slate-800" data-action="percent">%</button>
                                    <button type="button" class="rounded-xl border border-white/10 bg-slate-900/80 px-2 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:border-cyan-500/30 hover:bg-slate-800" data-clear="current">CE</button>
                                    <button type="button" class="row-span-2 h-full rounded-xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500 to-cyan-500 px-2 py-3 text-3xl font-black text-white shadow-lg shadow-emerald-500/20 transition hover:brightness-110" data-action="equals">=</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }

            function attachCalculatorBehavior() {
                const root = ensureRoot();
                root.innerHTML = calculatorHTML();

                const state = {
                    display: '0',
                    stored: null,
                    operator: null,
                    waitingForSecondValue: false,
                    memory: 0,
                    expression: ''
                };

                const displayEl = document.getElementById('vc-display');
                const expressionEl = document.getElementById('vc-expression');
                const memoryIndicator = document.getElementById('vc-mem-indicator');

                function formatValue(value) {
                    if (!Number.isFinite(value)) return 'Error';
                    const abs = Math.abs(value);
                    if (abs >= 1e9 || (abs > 0 && abs < 1e-9)) {
                        return value.toExponential(6).replace(/\.?0+e/, 'e');
                    }
                    return Number(value.toFixed(10)).toString();
                }

                function updateUI() {
                    displayEl.textContent = state.display;
                    expressionEl.textContent = state.expression || '0';
                    memoryIndicator.classList.toggle('hidden', state.memory === 0);
                }

                function clearAll() {
                    state.display = '0';
                    state.stored = null;
                    state.operator = null;
                    state.waitingForSecondValue = false;
                    state.expression = '';
                    state.memory = 0;
                    updateUI();
                }

                function clearCurrent() {
                    state.display = '0';
                    state.stored = null;
                    state.operator = null;
                    state.waitingForSecondValue = false;
                    state.expression = '';
                    updateUI();
                }

                function inputDigit(digit) {
                    if (state.waitingForSecondValue) {
                        state.display = String(digit);
                        state.waitingForSecondValue = false;
                    } else {
                        state.display = state.display === '0' ? String(digit) : state.display + String(digit);
                    }
                    updateUI();
                }

                function inputDecimal() {
                    if (state.waitingForSecondValue) {
                        state.display = '0.';
                        state.waitingForSecondValue = false;
                    } else if (!state.display.includes('.')) {
                        state.display += '.';
                    }
                    updateUI();
                }

                function backspace() {
                    if (state.display === 'Error') {
                        clearCurrent();
                        return;
                    }
                    state.display = state.display.length <= 1 ? '0' : state.display.slice(0, -1);
                    updateUI();
                }

                function calculate(a, b, op) {
                    switch (op) {
                        case '+': return a + b;
                        case '-': return a - b;
                        case '*': return a * b;
                        case '/': return b === 0 ? 'Error' : a / b;
                        default: return b;
                    }
                }

                function applyOperator(nextOperator) {
                    const currentValue = Number(state.display);

                    if (state.stored !== null && state.operator && state.waitingForSecondValue) {
                        state.operator = nextOperator;
                        state.expression = `${state.stored} ${nextOperator}`;
                        updateUI();
                        return;
                    }

                    if (state.stored === null) {
                        state.stored = currentValue;
                    } else if (state.operator) {
                        const result = calculate(state.stored, currentValue, state.operator);
                        if (result === 'Error') {
                            state.display = 'Error';
                            state.stored = null;
                            state.operator = null;
                            state.waitingForSecondValue = false;
                            state.expression = 'Error';
                            updateUI();
                            return;
                        }
                        state.stored = Number(result);
                        state.display = formatValue(result);
                    }

                    state.waitingForSecondValue = true;
                    state.operator = nextOperator;
                    state.expression = `${state.stored} ${nextOperator}`;
                    updateUI();
                }

                function evaluate() {
                    if (state.operator === null || state.stored === null || state.waitingForSecondValue) {
                        return;
                    }

                    const result = calculate(state.stored, Number(state.display), state.operator);
                    if (result === 'Error') {
                        state.display = 'Error';
                        state.expression = 'Error';
                        state.stored = null;
                        state.operator = null;
                        state.waitingForSecondValue = false;
                        updateUI();
                        return;
                    }

                    state.expression = `${state.stored} ${state.operator} ${state.display} =`;
                    state.display = formatValue(result);
                    state.stored = Number(result);
                    state.operator = null;
                    state.waitingForSecondValue = false;
                    updateUI();
                }

                function applyTax(rate) {
                    const value = Number(state.display) || 0;
                    state.display = formatValue(value * (1 + rate / 100));
                    updateUI();
                }

                function applyMargin() {
                    const value = Number(state.display) || 0;
                    state.display = formatValue(value * 1.2);
                    updateUI();
                }

                function applyPercent() {
                    const value = Number(state.display) || 0;
                    state.display = formatValue(value / 100);
                    updateUI();
                }

                function memoryClear() {
                    state.memory = 0;
                    updateUI();
                }

                function memoryRecall() {
                    state.display = formatValue(state.memory);
                    updateUI();
                }

                function memoryAdd() {
                    state.memory += Number(state.display) || 0;
                    updateUI();
                }

                function memorySubtract() {
                    state.memory -= Number(state.display) || 0;
                    updateUI();
                }

                function closeCalculator() {
                    root.style.display = 'none';
                }

                document.querySelector('[data-action="close"]').addEventListener('click', closeCalculator);

                document.querySelectorAll('[data-digit]').forEach((button) => {
                    button.addEventListener('click', () => {
                        const digit = button.dataset.digit;
                        if (digit === '.') inputDecimal();
                        else inputDigit(digit);
                    });
                });

                document.querySelectorAll('[data-op]').forEach((button) => {
                    button.addEventListener('click', () => applyOperator(button.dataset.op));
                });

                document.querySelectorAll('[data-gst]').forEach((button) => {
                    button.addEventListener('click', () => applyTax(Number(button.dataset.gst)));
                });

                document.querySelectorAll('[data-quick]').forEach((button) => {
                    button.addEventListener('click', () => {
                        if (button.dataset.quick === 'margin') applyMargin();
                    });
                });

                document.querySelectorAll('[data-memory]').forEach((button) => {
                    button.addEventListener('click', () => {
                        const action = button.dataset.memory;
                        if (action === 'mc') memoryClear();
                        if (action === 'mr') memoryRecall();
                        if (action === 'mplus') memoryAdd();
                        if (action === 'mminus') memorySubtract();
                    });
                });

                document.querySelectorAll('[data-clear]').forEach((button) => {
                    button.addEventListener('click', () => {
                        const action = button.dataset.clear;
                        if (action === 'all') clearAll();
                        if (action === 'current') clearCurrent();
                    });
                });

                document.querySelector('[data-action="equals"]').addEventListener('click', evaluate);
                document.querySelector('[data-action="percent"]').addEventListener('click', applyPercent);

                document.addEventListener('keydown', (event) => {
                    const key = event.key;

                    if (/^[0-9]$/.test(key)) {
                        event.preventDefault();
                        inputDigit(key);
                    } else if (key === '.') {
                        event.preventDefault();
                        inputDecimal();
                    } else if (['+', '-', '*', '/'].includes(key)) {
                        event.preventDefault();
                        applyOperator(key);
                    } else if (key === 'Enter' || key === '=' || key === 'NumpadEnter') {
                        event.preventDefault();
                        evaluate();
                    } else if (key === 'Backspace') {
                        event.preventDefault();
                        backspace();
                    } else if (key === 'Escape' || key === 'Delete') {
                        event.preventDefault();
                        closeCalculator();
                    }
                });

                updateUI();
            }

            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', attachCalculatorBehavior, { once: true });
            } else {
                attachCalculatorBehavior();
            }
        })();
    

