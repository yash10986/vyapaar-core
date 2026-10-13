import React, { useEffect, useMemo, useRef, useState } from 'react';

type PaymentMode = 'UPI' | 'Bank Transfer' | 'Cash' | 'Card';

type ReceiptData = {
    payer: string;
    mode: PaymentMode;
    amount: string;
    remarks: string;
    timestamp: string;
};

const defaultReceiptData: ReceiptData = {
    payer: 'Select payer...',
    mode: 'UPI',
    amount: '',
    remarks: '',
    timestamp: new Date().toLocaleString(),
};

async function computeAuditHash(payload: string): Promise<string> {
    if (!window.crypto || !window.crypto.subtle) {
        return 'unsupported-browser';
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(payload);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

function generateTransactionReference(merchantId: string, amount: string, timestamp: string): string {
    const normalized = `${merchantId}|${amount}|${timestamp}`;
    const hash = Array.from(new TextEncoder().encode(normalized)).reduce((acc, byte) => acc + byte, 0);
    const token = Math.floor((hash + Date.now()) % 1000000).toString().padStart(6, '0');
    return `TX-${timestamp.replace(/[^0-9]/g, '').slice(0, 12)}-${token}`;
}

function buildPaymentQrString(merchantId: string, amount: string, timestamp: string, txRef: string): string {
    return JSON.stringify({
        merchantId,
        amount: amount || '0.00',
        timestamp,
        transactionRef: txRef,
    });
}

function generateQrSvg(content: string, size = 220): string {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(content);
    const grid = 21;
    const moduleSize = Math.floor(size / grid);
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${grid} ${grid}" shape-rendering="crispEdges">`;

    const getCell = (row: number, col: number) => {
        const idx = (row * grid + col) % bytes.length;
        const bit = (bytes[idx] >> ((row + col) % 8)) & 1;
        return bit === 1;
    };

    const drawFinder = (x: number, y: number) => {
        const finder = [0, 1, 2].flatMap((dy) => [0, 1, 2].map((dx) => ({ x: x + dx, y: y + dy, fill: dy !== 1 || dx !== 1 })));
        finder.push(...[0, 1, 2, 3, 4, 5, 6].flatMap((d) => [
            { x: x + d, y },
            { x, y: y + d },
            { x: x + d, y: y + 6 },
            { x: x + 6, y: y + d },
        ]));
        return finder;
    };

    const patterns = [
        ...drawFinder(0, 0),
        ...drawFinder(grid - 7, 0),
        ...drawFinder(0, grid - 7),
    ];

    for (let row = 0; row < grid; row += 1) {
        for (let col = 0; col < grid; col += 1) {
            const finderCell = patterns.find((pattern) => pattern.x === col && pattern.y === row);
            const fill = finderCell ? finderCell.fill : getCell(row, col);
            if (fill) {
                svg += `<rect x="${col}" y="${row}" width="1" height="1" fill="#8b5cf6"/>`;
            }
        }
    }

    svg += `<rect x="0" y="0" width="${grid}" height="${grid}" fill="none" stroke="#a78bfa" stroke-width="0.15"/>`;
    svg += `</svg>`;
    return svg;
}

function renderBarcodeCanvas(canvas: HTMLCanvasElement | null, payload: string) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#0ea5e9';
    ctx.fillRect(0, 0, width, height);

    const bytes = new TextEncoder().encode(payload || 'PAY-000');
    const quietZone = 12;
    const available = width - quietZone * 2;
    const segmentWidth = Math.max(2, Math.floor(available / (bytes.length * 3)));
    let x = quietZone;

    bytes.forEach((byte, idx) => {
        const weight = 1 + (byte % 4);
        const barHeight = height * (0.7 + ((byte % 5) * 0.05));
        const isBlack = idx % 2 === 0;
        ctx.fillStyle = isBlack ? '#0f172a' : '#eef2ff';
        ctx.fillRect(x, height - barHeight - 8, segmentWidth * weight, barHeight);
        x += segmentWidth * weight + 2;
    });

    ctx.fillStyle = '#111827';
    ctx.fillRect(0, height - 8, width, 8);
    ctx.fillStyle = '#ffffff';
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText(payload.slice(-16), width / 2, height - 2);
}

const PaymentReceiptHub: React.FC = () => {
    const [receipt, setReceipt] = useState<ReceiptData>(defaultReceiptData);
    const [auditHash, setAuditHash] = useState<string>('waiting-for-input');
    const [qrSvg, setQrSvg] = useState<string>('');
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const merchantId = 'INDIGO-MERCHANT-001';

    useEffect(() => {
        setReceipt((current) => ({
            ...current,
            timestamp: new Date().toLocaleString(),
        }));
    }, []);

    useEffect(() => {
        if (!receipt.amount) return;
        setReceipt((current) => ({
            ...current,
            timestamp: new Date().toLocaleString(),
        }));
    }, [receipt.amount]);

    const transactionReference = useMemo(() => {
        return receipt.amount
            ? generateTransactionReference(merchantId, receipt.amount, receipt.timestamp)
            : 'TX-PENDING-000000';
    }, [merchantId, receipt.amount, receipt.timestamp]);

    const transactionSummary = useMemo(() => {
        return `${receipt.payer}|${receipt.mode}|${receipt.amount}|${receipt.remarks}|${receipt.timestamp}|${transactionReference}`;
    }, [receipt, transactionReference]);

    const paymentQrString = useMemo(() => {
        return buildPaymentQrString(merchantId, receipt.amount, receipt.timestamp, transactionReference);
    }, [merchantId, receipt.amount, receipt.timestamp, transactionReference]);

    useEffect(() => {
        let isMounted = true;
        if (!receipt.amount) {
            setAuditHash('enter-amount-to-generate-hash');
            setQrSvg('');
            renderBarcodeCanvas(canvasRef.current, 'PAY-000');
            return;
        }

        computeAuditHash(transactionSummary).then((hash) => {
            if (isMounted) {
                setAuditHash(hash.slice(0, 16).toUpperCase());
            }
        });

        setQrSvg(generateQrSvg(paymentQrString));
        renderBarcodeCanvas(canvasRef.current, transactionReference);

        return () => {
            isMounted = false;
        };
    }, [transactionSummary, receipt.amount, paymentQrString, transactionReference]);

    const updateField = (field: keyof ReceiptData, value: string) => {
        setReceipt((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <section className="min-h-[680px] rounded-[32px] border border-white/10 bg-slate-950/95 shadow-[0_24px_80px_-30px_rgba(15,23,42,0.8)] backdrop-blur-xl overflow-hidden font-sans text-slate-100">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 p-6">
                <div className="space-y-6 rounded-3xl border border-cyan-500/20 bg-slate-900/70 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                    <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-cyan-200">
                        <span className="material-icons text-cyan-300">payments</span>
                        <h2 className="text-base font-semibold">Transaction Input</h2>
                    </div>
                    <div className="grid gap-5">
                        <label className="block text-sm text-slate-300">
                            Payer Select
                            <select
                                value={receipt.payer}
                                onChange={(e) => updateField('payer', e.target.value)}
                                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-slate-100 shadow-sm outline-none transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/20"
                            >
                                <option>Select payer...</option>
                                <option>Corporate Client</option>
                                <option>Retail Partner</option>
                                <option>Internal Treasury</option>
                                <option>Vendor Settlement</option>
                            </select>
                        </label>
                        <label className="block text-sm text-slate-300">
                            Payment Mode
                            <div className="mt-2 grid grid-cols-2 gap-3">
                                {(['UPI', 'Bank Transfer', 'Cash', 'Card'] as PaymentMode[]).map((mode) => (
                                    <button
                                        key={mode}
                                        type="button"
                                        onClick={() => updateField('mode', mode)}
                                        className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                                            receipt.mode === mode
                                                ? 'border-cyan-400/70 bg-cyan-500/10 text-cyan-100 shadow-[0_12px_30px_-24px_rgba(34,211,238,0.7)]'
                                                : 'border-white/10 bg-slate-950/70 text-slate-300 hover:border-cyan-500/20 hover:bg-slate-900/90'
                                        }`}
                                    >
                                        {mode}
                                    </button>
                                ))}
                            </div>
                        </label>
                        <label className="block text-sm text-slate-300">
                            Amount
                            <input
                                type="number"
                                min="0"
                                value={receipt.amount}
                                onChange={(e) => updateField('amount', e.target.value)}
                                placeholder="0.00"
                                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-slate-100 shadow-sm outline-none transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/20"
                            />
                        </label>
                        <label className="block text-sm text-slate-300">
                            Remarks
                            <textarea
                                value={receipt.remarks}
                                onChange={(e) => updateField('remarks', e.target.value)}
                                rows={4}
                                placeholder="Enter transaction notes or reference details"
                                className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-slate-100 shadow-sm outline-none transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/20"
                            />
                        </label>
                    </div>
                </div>

                <div className="rounded-3xl border border-violet-500/15 bg-gradient-to-br from-slate-950/90 via-slate-900/85 to-slate-950/95 p-6 shadow-[0_20px_90px_-40px_rgba(99,102,241,0.65)]">
                    <div className="flex items-center justify-between gap-3 text-sm uppercase tracking-[0.3em] text-violet-200">
                        <div className="flex items-center gap-2">
                            <span className="material-icons text-violet-300">receipt_long</span>
                            <h2 className="text-base font-semibold">Live Receipt Preview</h2>
                        </div>
                        <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-100">
                            Quantum Indigo</span>
                    </div>
                    <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/95 p-6 shadow-inner shadow-slate-950/30">
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                            <div>
                                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Receipt ID</p>
                                <p className="mt-2 font-mono text-base font-semibold text-slate-100">PAY-{receipt.timestamp.replace(/[^0-9]/g, '').slice(0, 12)}</p>
                            </div>
                            <div className="rounded-3xl bg-slate-900/80 px-3 py-2 text-[11px] uppercase tracking-[0.25em] text-cyan-200 border border-cyan-500/20">
                                {receipt.mode}
                            </div>
                        </div>
                        <div className="mt-6 space-y-4 text-sm text-slate-300">
                            <div className="grid grid-cols-2 gap-3 rounded-3xl bg-slate-900/60 p-4 border border-white/5">
                                <span className="text-slate-500">Payer</span>
                                <span className="font-medium text-slate-100 text-right">{receipt.payer}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-3 rounded-3xl bg-slate-900/60 p-4 border border-white/5">
                                <span className="text-slate-500">Amount</span>
                                <span className="font-medium text-slate-100 text-right">₹{receipt.amount || '0.00'}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-3 rounded-3xl bg-slate-900/60 p-4 border border-white/5">
                                <span className="text-slate-500">Remarks</span>
                                <span className="font-medium text-slate-100 text-right">{receipt.remarks || 'No remarks provided'}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-3 rounded-3xl bg-slate-900/60 p-4 border border-white/5">
                                <span className="text-slate-500">Issued</span>
                                <span className="font-medium text-slate-100 text-right">{receipt.timestamp}</span>
                            </div>
                        </div>
                        <div className="mt-6 rounded-3xl border border-white/10 bg-slate-900/80 p-4 text-sm text-slate-300">
                            <div className="flex items-center justify-between text-slate-400 uppercase tracking-[0.25em] text-[10px] font-semibold">
                                <span>Cryptographic Audit Hash</span>
                                <span className="text-emerald-300">SHA-256</span>
                            </div>
                            <p className="mt-3 break-all font-mono text-xs leading-5 text-slate-200">{auditHash}</p>
                        </div>
                        <div className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
                                <div className="flex items-center justify-between text-slate-400 uppercase tracking-[0.25em] text-[10px] font-semibold mb-3">
                                    <span>Secure 1D Barcode</span>
                                    <span className="text-cyan-300">{transactionReference.slice(-8)}</span>
                                </div>
                                <canvas
                                    ref={canvasRef}
                                    width={340}
                                    height={96}
                                    className="w-full rounded-3xl bg-slate-950/90"
                                />
                            </div>
                            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
                                <div className="flex items-center justify-between text-slate-400 uppercase tracking-[0.25em] text-[10px] font-semibold mb-3">
                                    <span>Dynamic Payment QR</span>
                                    <span className="text-violet-300">{receipt.mode}</span>
                                </div>
                                <div className="rounded-3xl bg-slate-950/95 p-3">
                                    {qrSvg ? (
                                        <div
                                            className="mx-auto w-full overflow-hidden rounded-2xl"
                                            dangerouslySetInnerHTML={{ __html: qrSvg }}
                                        />
                                    ) : (
                                        <div className="flex h-48 items-center justify-center rounded-2xl border border-dashed border-slate-700 text-xs uppercase tracking-[0.3em] text-slate-500">
                                            Enter amount for QR payload
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-3 text-xs text-slate-400">
                            <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-2">Secure proof-of-payment layer</span>
                            <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-2">Immutable receipt fingerprint</span>
                            <span className="rounded-full border border-slate-400/10 bg-slate-900/70 px-3 py-2">Live preview with audit trace</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PaymentReceiptHub;
