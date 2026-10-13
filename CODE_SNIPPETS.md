# Code Snippets - Live Operations Stream Enhancement

## Quick Reference Guide

---

## 1. Metric Tab Switching

### HTML (Template)
```html
<!-- Metric Selection Tabs -->
<div class="flex gap-2 bg-gray-950/40 p-2 rounded-lg border border-gray-800/30 overflow-x-auto">
    <button onclick="switchStreamMetric('gross-sales')" 
            id="metric-btn-gross-sales" 
            class="metric-tab-btn active px-3 py-1.5 text-[10px] font-bold uppercase rounded transition-all cursor-pointer bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 whitespace-nowrap flex items-center gap-1">
        <span class="material-icons text-xs">trending_up</span> Gross Sales
    </button>
    <button onclick="switchStreamMetric('cash-flow')" 
            id="metric-btn-cash-flow" 
            class="metric-tab-btn px-3 py-1.5 text-[10px] font-bold uppercase rounded transition-all cursor-pointer border border-gray-700/50 text-gray-400 hover:border-emerald-500/30 hover:text-emerald-400 whitespace-nowrap flex items-center gap-1">
        <span class="material-icons text-xs">paid</span> Net Cash Flow
    </button>
    <!-- Additional buttons... -->
</div>
```

### JavaScript Function
```javascript
// Global state
let currentStreamMetric = 'gross-sales';

// Metric dataset configuration
const metricDatasets = {
    'gross-sales': {
        label: 'Gross Sales',
        color: '#6366f1',
        altColor: '#4f46e5',
        path: 'M 0,90 Q 75,70 150,100 T 300,40 T 450,120',
        forecastPath: 'M 450,120 Q 525,60 600,15',
        gradientUrl: 'url(#chartGlowGross)'
    },
    'cash-flow': {
        label: 'Net Cash Flow',
        color: '#10b981',
        altColor: '#059669',
        path: 'M 0,110 Q 75,85 150,95 T 300,50 T 450,130',
        forecastPath: 'M 450,130 Q 525,70 600,25',
        gradientUrl: 'url(#chartGlowCash)'
    },
    'hourly-volume': {
        label: 'Hourly Volume',
        color: '#06b6d4',
        altColor: '#0891b2',
        path: 'M 0,75 Q 75,55 150,85 T 300,45 T 450,110',
        forecastPath: 'M 450,110 Q 525,50 600,10',
        gradientUrl: 'url(#chartGlowVolume)'
    },
    'ai-variance': {
        label: 'AI Variance',
        color: '#a855f7',
        altColor: '#9333ea',
        path: 'M 0,95 Q 75,75 150,105 T 300,55 T 450,125',
        forecastPath: 'M 450,125 Q 525,65 600,20',
        gradientUrl: 'url(#chartGlowVariance)'
    }
};

function switchStreamMetric(metricId) {
    currentStreamMetric = metricId;
    const dataset = metricDatasets[metricId];

    // Update button states
    document.querySelectorAll('.metric-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`metric-btn-${metricId}`).classList.add('active');

    // Update chart SVG elements
    const trendLine = document.getElementById('graph-trend-line');
    const forecastLine = document.getElementById('graph-forecast-line');
    const areaBase = document.getElementById('area-graph-base');
    const nodeGroup = document.getElementById('chart-nodes-group');

    trendLine.setAttribute('stroke', dataset.color);
    trendLine.setAttribute('d', dataset.path);

    forecastLine.setAttribute('stroke', '#a855f7');
    forecastLine.setAttribute('d', dataset.forecastPath);

    areaBase.setAttribute('d', dataset.path.replace(/Z/, '') + ' Z');
    areaBase.setAttribute('fill', dataset.gradientUrl);

    // Update node colors
    const nodes = nodeGroup.querySelectorAll('circle:not([stroke])');
    nodes.forEach((node, idx) => {
        if (idx < 4) {
            node.setAttribute('fill', dataset.color);
        }
    });

    // Update stroke circles
    const strokeCircles = nodeGroup.querySelectorAll('circle[stroke]');
    strokeCircles.forEach((circle, idx) => {
        if (idx < 4) {
            circle.setAttribute('stroke', dataset.color);
        }
    });

    // Audio & visual feedback
    playPositiveSound();
    showSystemToast('success', 'Metric Changed', `Now viewing: ${dataset.label}`, 2000);
}
```

---

## 2. Time Horizon Switching

### HTML (Template)
```html
<!-- Time Range Selector -->
<div class="flex gap-2 bg-gray-950/40 p-2 rounded-lg border border-gray-800/30">
    <span class="text-[9px] text-gray-500 font-bold uppercase tracking-wider px-2 py-1.5 self-center">Range:</span>
    <button onclick="switchTimeHorizon('1h')" id="range-btn-1h" 
            class="range-select-btn px-2.5 py-1.5 text-[9px] font-bold rounded transition-all cursor-pointer border border-gray-700/50 text-gray-400 hover:border-indigo-500/30 hover:text-indigo-400">1H</button>
    <button onclick="switchTimeHorizon('24h')" id="range-btn-24h" 
            class="range-select-btn active px-2.5 py-1.5 text-[9px] font-bold rounded transition-all cursor-pointer bg-indigo-500/20 border border-indigo-500/40 text-indigo-300">24H</button>
    <button onclick="switchTimeHorizon('7d')" id="range-btn-7d" 
            class="range-select-btn px-2.5 py-1.5 text-[9px] font-bold rounded transition-all cursor-pointer border border-gray-700/50 text-gray-400 hover:border-amber-500/30 hover:text-amber-400">7D</button>
    <button onclick="switchTimeHorizon('30d')" id="range-btn-30d" 
            class="range-select-btn px-2.5 py-1.5 text-[9px] font-bold rounded transition-all cursor-pointer border border-gray-700/50 text-gray-400 hover:border-rose-500/30 hover:text-rose-400">30D</button>
</div>
```

### JavaScript Function
```javascript
// Global state
let currentTimeHorizon = '24h';

// Time horizon label configurations
const timeHorizonLabels = {
    '1h': ['00:00', '15:00', '30:00', '45:00', '60:00', 'FORECAST'],
    '24h': ['09:00', '12:00', '15:00', '18:00', '21:00', 'FORECAST'],
    '7d': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'FORECAST'],
    '30d': ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'FORECAST']
};

function switchTimeHorizon(horizon) {
    currentTimeHorizon = horizon;

    // Update button states
    document.querySelectorAll('.range-select-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`range-btn-${horizon}`).classList.add('active');

    // Update time axis labels
    const timeLabels = timeHorizonLabels[horizon];
    const axisContainer = document.querySelector(
        '.flex.justify-between.items-center.text-\\[8px\\]'
    );
    
    if (axisContainer && timeLabels) {
        axisContainer.innerHTML = timeLabels
            .map((label, idx) => `<span>${label}</span>`)
            .join('');
    }

    // Audio & visual feedback
    playPositiveSound();
    showSystemToast('info', 'Timeframe Updated', `Displaying data for: ${horizon.toUpperCase()}`, 1500);
}
```

---

## 3. Anomaly Detection Badge Animation

### CSS Animations
```css
@keyframes anomalyPulse {
    0%, 100% { 
        r: 7px; 
        filter: drop-shadow(0 0 4px rgba(249, 115, 22, 0.6)); 
    }
    50% { 
        r: 9px; 
        filter: drop-shadow(0 0 8px rgba(249, 115, 22, 0.9)); 
    }
}

@keyframes anomalyBadgeSlide {
    0% { 
        transform: translateY(-20px); 
        opacity: 0; 
    }
    100% { 
        transform: translateY(0); 
        opacity: 1; 
    }
}

.animate-anomaly-pulse {
    animation: anomalyPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.anomaly-badge {
    animation: anomalyBadgeSlide 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### HTML (Node with Animation)
```html
<!-- Node with Anomaly Pulse -->
<circle cx="300" cy="40" r="7" fill="#f97316" 
        class="hover:r-9 transition-all duration-150 node-anomaly" 
        onclick="inspectChartNode('03:00 PM', 31000, 'Fortune Mustard Oil')" 
        id="node-dot-3" 
        filter="url(#anomalyGlow)" />
<circle cx="300" cy="40" r="7" fill="none" stroke="#f97316" 
        stroke-width="2" opacity="0.5" 
        class="animate-anomaly-pulse" />
```

### JavaScript (Auto-Update)
```javascript
function updateStreamAnomalyDetection() {
    const anomalyBadge = document.querySelector('.anomaly-badge');
    const anomalyChance = Math.random();
    
    if (anomalyChance > 0.7) {
        anomalyBadge.innerHTML = `
            <span class="material-icons text-[10px]">warning</span> SURGE DETECTED
        `;
        anomalyBadge.className = 
            'bg-orange-600/90 text-white text-[8px] code-font px-2 py-1 ' +
            'rounded-full border border-orange-400/50 shadow-lg shadow-orange-600/40 ' +
            'font-bold flex items-center gap-1 anomaly-badge';
    } else if (anomalyChance > 0.4) {
        anomalyBadge.innerHTML = `
            <span class="material-icons text-[10px]">trending_down</span> DIP DETECTED
        `;
        anomalyBadge.className = 
            'bg-amber-600/90 text-white text-[8px] code-font px-2 py-1 ' +
            'rounded-full border border-amber-400/50 shadow-lg shadow-amber-600/40 ' +
            'font-bold flex items-center gap-1 anomaly-badge';
    } else {
        anomalyBadge.innerHTML = `
            <span class="material-icons text-[10px]">check_circle</span> NORMAL FLOW
        `;
        anomalyBadge.className = 
            'bg-emerald-600/90 text-white text-[8px] code-font px-2 py-1 ' +
            'rounded-full border border-emerald-400/50 shadow-lg shadow-emerald-600/40 ' +
            'font-bold flex items-center gap-1 anomaly-badge';
    }
}

// Auto-update every 10 seconds
setInterval(() => {
    updateStreamAnomalyDetection();
}, 10000);
```

---

## 4. Expandable Trend Decomposition Panel

### HTML Structure
```html
<!-- Predictive Trend Decomposition Panel -->
<div id="trend-decomposition-panel" 
     class="hidden lg:col-span-2 glass-panel rounded-2xl p-5 flex flex-col transition-all duration-300">
    
    <div class="flex justify-between items-center border-b border-gray-800/60 pb-4 mb-4">
        <div>
            <h3 class="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-1.5">
                <span class="material-icons text-sm text-purple-400">trending_up</span>
                Predictive Trend Decomposition
            </h3>
            <p class="text-gray-400 text-[10px] mt-0.5">
                AI-powered trend projection, moving averages, and volatility analysis
            </p>
        </div>
        <button onclick="toggleTrendDecomposition()" class="text-gray-400 hover:text-white transition-all">
            <span class="material-icons text-sm">close</span>
        </button>
    </div>

    <!-- 3-Column Analytics -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
        
        <!-- Column 1: Linear Trend -->
        <div class="bg-gray-950/40 border border-indigo-500/20 rounded-lg p-4">
            <div class="flex items-center gap-2 mb-3">
                <span class="material-icons text-sm text-indigo-400">show_chart</span>
                <span class="text-xs font-bold text-white uppercase tracking-wider">Linear Trend</span>
            </div>
            
            <svg class="w-full h-20 mb-3" viewBox="0 0 100 50" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#6366f1" stop-opacity="0.4"/>
                        <stop offset="100%" stop-color="#6366f1" stop-opacity="0.0"/>
                    </linearGradient>
                </defs>
                <path d="M 0,40 L 0,30 L 25,25 L 50,20 L 75,15 L 100,5" 
                      fill="none" stroke="#6366f1" stroke-width="1.5" />
                <path d="M 0,50 L 0,40 L 25,30 L 50,20 L 75,15 L 100,5 L 100,50 Z" 
                      fill="url(#trendGrad)" />
            </svg>

            <div class="space-y-2 text-[10px]">
                <div class="flex justify-between">
                    <span class="text-gray-400">Slope:</span>
                    <span class="text-indigo-300 font-bold">+12.4% / hour</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-400">R² Fit:</span>
                    <span class="text-emerald-400 font-bold">0.947</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-400">Projected (24H):</span>
                    <span class="text-cyan-300 font-bold">₹62,500</span>
                </div>
                <div class="mt-3 p-2 bg-indigo-950/30 rounded border border-indigo-500/20 text-indigo-300 text-[9px]">
                    ⬆ Strong upward trajectory with minimal deviation
                </div>
            </div>
        </div>

        <!-- Column 2: Moving Averages -->
        <div class="bg-gray-950/40 border border-emerald-500/20 rounded-lg p-4">
            <!-- Similar structure with MA charts -->
        </div>

        <!-- Column 3: Volatility -->
        <div class="bg-gray-950/40 border border-rose-500/20 rounded-lg p-4">
            <!-- Similar structure with volatility data -->
        </div>
    </div>

    <!-- Summary Stats Row -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-gray-800/40">
        <div class="bg-gray-950/30 p-3 rounded-lg">
            <span class="text-[9px] text-gray-500 uppercase font-bold">24H Change</span>
            <p class="text-emerald-400 font-bold text-xs mt-1">+18.4% ↑</p>
        </div>
        <div class="bg-gray-950/30 p-3 rounded-lg">
            <span class="text-[9px] text-gray-500 uppercase font-bold">Confidence</span>
            <p class="text-indigo-400 font-bold text-xs mt-1">98.3%</p>
        </div>
        <div class="bg-gray-950/30 p-3 rounded-lg">
            <span class="text-[9px] text-gray-500 uppercase font-bold">Next Update</span>
            <p class="text-cyan-400 font-bold text-xs mt-1">5 mins</p>
        </div>
        <div class="bg-gray-950/30 p-3 rounded-lg">
            <span class="text-[9px] text-gray-500 uppercase font-bold">Model</span>
            <p class="text-purple-400 font-bold text-xs mt-1">ARIMA 2.1</p>
        </div>
    </div>
</div>
```

### JavaScript Toggle Function
```javascript
function toggleTrendDecomposition() {
    const panel = document.getElementById('trend-decomposition-panel');
    const isHidden = panel.classList.contains('hidden');

    if (isHidden) {
        panel.classList.remove('hidden');
        panel.classList.add('show');
        
        const decompBtn = document.getElementById('decomp-toggle-btn');
        decompBtn.innerHTML = '<span class="material-icons text-xs">unfold_less</span> Analytics';
        
        playPositiveSound();
        showSystemToast('success', 'Analytics Expanded', 
                       'Predictive decomposition panel opened', 1500);
    } else {
        panel.classList.add('hidden');
        panel.classList.remove('show');
        
        const decompBtn = document.getElementById('decomp-toggle-btn');
        decompBtn.innerHTML = '<span class="material-icons text-xs">unfold_more</span> Analytics';
        
        playWarningSound();
        showSystemToast('info', 'Analytics Collapsed', 
                       'Decomposition panel closed', 1000);
    }
}
```

### CSS Animation
```css
@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
        max-height: 0;
    }
    to {
        opacity: 1;
        transform: translateY(0);
        max-height: 600px;
    }
}

#trend-decomposition-panel.show {
    animation: slideDown 0.3s ease-out;
}
```

---

## 5. SVG Gradient Definitions

### Multi-Metric Gradients
```html
<svg>
    <defs>
        <!-- Gross Sales Gradient -->
        <linearGradient id="chartGlowGross" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#6366f1" stop-opacity="0.35"/>
            <stop offset="60%" stop-color="#6366f1" stop-opacity="0.15"/>
            <stop offset="100%" stop-color="#6366f1" stop-opacity="0.0"/>
        </linearGradient>

        <!-- Cash Flow Gradient -->
        <linearGradient id="chartGlowCash" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#10b981" stop-opacity="0.35"/>
            <stop offset="60%" stop-color="#10b981" stop-opacity="0.15"/>
            <stop offset="100%" stop-color="#10b981" stop-opacity="0.0"/>
        </linearGradient>

        <!-- Hourly Volume Gradient -->
        <linearGradient id="chartGlowVolume" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.35"/>
            <stop offset="60%" stop-color="#06b6d4" stop-opacity="0.15"/>
            <stop offset="100%" stop-color="#06b6d4" stop-opacity="0.0"/>
        </linearGradient>

        <!-- Confidence Heatmap Gradient -->
        <linearGradient id="confidenceHeat" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#ef4444" stop-opacity="0.4"/>
            <stop offset="25%" stop-color="#f97316" stop-opacity="0.35"/>
            <stop offset="50%" stop-color="#eab308" stop-opacity="0.3"/>
            <stop offset="75%" stop-color="#84cc16" stop-opacity="0.25"/>
            <stop offset="100%" stop-color="#22c55e" stop-opacity="0.2"/>
        </linearGradient>

        <!-- Anomaly Glow Filter -->
        <filter id="anomalyGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
    </defs>
</svg>
```

---

## Integration Checklist

- [ ] Copy all HTML markup from chart section
- [ ] Copy all CSS keyframes and classes
- [ ] Copy all JavaScript functions
- [ ] Copy SVG gradient definitions
- [ ] Add metric dataset configuration
- [ ] Link button onclick handlers
- [ ] Test metric switching
- [ ] Test time horizon changes
- [ ] Test panel toggle
- [ ] Verify audio feedback works
- [ ] Verify toast notifications display
- [ ] Check responsive layout on mobile
- [ ] Validate JavaScript syntax

---

## Dependencies

- Tailwind CSS (already in Vyapaar Core)
- Material Icons (already in Vyapaar Core)
- Existing functions: `playPositiveSound()`, `playWarningSound()`, `showSystemToast()`

**No external libraries required!**

