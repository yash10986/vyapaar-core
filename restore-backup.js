#!/usr/bin/env node
'use strict';

/**
 * Merge two Vyapaar Core browser-state backups into one importable state file.
 *
 * Usage:
 *   node restore-backup.js "backup-one.json" "backup-two.json" "vyapaar_core_state_merged.json"
 *
 * The output is compatible with index.php's Import State action and is not
 * written over either source backup.
 */

const fs = require('fs');
const path = require('path');

const DEFAULT_OUTPUT = 'vyapaar_core_state_merged.json';
const TENANT_CODE = 'JOGESHWARI-ENTERPRISES';
const TENANT_NAME = 'Jogeshwari Enterprises';

const COLLECTION_ALIASES = {
  catalog: ['catalog', 'products', 'productCatalog', 'product_master'],
  inventory: ['inventory', 'stock', 'stockItems', 'warehouse'],
  ledger: ['ledger', 'transactions', 'cashBook', 'journal'],
  purchases: ['purchases', 'purchaseOrders', 'procurements'],
  sales: ['sales', 'saleOrders', 'outwardSales', 'invoices'],
  customers: ['customers', 'clients', 'customerAccounts'],
  retailers: ['retailers', 'retailerPartners', 'vendors'],
  dealers: ['dealers', 'suppliers', 'wholesalers'],
  staff: ['staff', 'employees', 'labour', 'personnel'],
  logs: ['logs', 'activityLog', 'systemLogs'],
  returns: ['returns', 'salesReturns'],
  auditLog: ['auditLog', 'auditTrail', 'complianceAudit'],
  commissions: ['commissions', 'payroll', 'staffCommissions']
};

const COLLECTION_DEFAULTS = {
  catalog: [], inventory: [], ledger: [], purchases: [], sales: [],
  customers: [], retailers: [], dealers: [], staff: [], logs: [],
  returns: [], auditLog: [], commissions: []
};

function usage(message) {
  if (message) console.error(`Error: ${message}\n`);
  console.error('Usage: node restore-backup.js <backup-1.json> <backup-2.json> [output.json] [--force]');
  process.exitCode = 1;
}

function readJson(fileName) {
  const filePath = path.resolve(fileName);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Backup file not found: ${filePath}`);
  }

  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    throw new Error(`Invalid JSON in ${filePath}: ${error.message}`);
  }

  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error(`Backup root must be a JSON object: ${filePath}`);
  }
  return parsed;
}

function firstObject(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  for (const key of ['AppState', 'appState', 'state', 'data', 'payload', 'backup']) {
    if (value[key] && typeof value[key] === 'object' && !Array.isArray(value[key])) {
      return value[key];
    }
  }
  return value;
}

function getCollection(source, collectionName) {
  const state = firstObject(source);
  for (const alias of COLLECTION_ALIASES[collectionName]) {
    if (Array.isArray(state[alias])) return state[alias];
  }
  return [];
}

function normalizeNumber(value, fallback = 0) {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim() !== '') {
    const number = Number(value.replace(/[^0-9.-]/g, ''));
    return Number.isFinite(number) ? number : fallback;
  }
  return fallback;
}

function normalizeRecord(collectionName, input) {
  const record = input && typeof input === 'object' && !Array.isArray(input) ? { ...input } : {};
  const hasAny = (...keys) => keys.some(key => record[key] !== undefined && record[key] !== null && record[key] !== '');

  if (collectionName === 'catalog') {
    record.name = record.name || record.product || record.productName || '';
    if (hasAny('price', 'sellingPrice', 'selling_price')) {
      record.price = normalizeNumber(record.price ?? record.sellingPrice ?? record.selling_price);
    }
    if (hasAny('costPrice', 'purchasePrice', 'purchase_price')) {
      record.costPrice = normalizeNumber(record.costPrice ?? record.purchasePrice ?? record.purchase_price);
    }
    if (hasAny('mrp', 'mrpPrice')) {
      record.mrp = normalizeNumber(record.mrp ?? record.mrpPrice, record.price);
    }
  }
  if (collectionName === 'inventory') {
    record.name = record.name || record.product || record.productName || '';
    if (hasAny('stock', 'currentStock', 'current_stock')) {
      record.stock = normalizeNumber(record.stock ?? record.currentStock ?? record.current_stock);
    }
    if (record.reorderLevel !== undefined) record.reorderLevel = normalizeNumber(record.reorderLevel);
  }
  if (collectionName === 'ledger') {
    record.ref = record.ref || record.reference || record.transactionRef || record.invoiceRef || '';
    if (hasAny('amount', 'total', 'value')) {
      record.amount = normalizeNumber(record.amount ?? record.total ?? record.value);
    }
    record.type = record.type || (record.kind === 'expense' ? 'expense' : 'inflow');
  }
  if (collectionName === 'purchases' || collectionName === 'sales') {
    record.ref = record.ref || record.reference || record.invoiceRef || record.id || '';
    if (hasAny('amount', 'total', 'value')) {
      record.amount = normalizeNumber(record.amount ?? record.total ?? record.value);
      record.total = normalizeNumber(record.total ?? record.amount ?? record.value);
    }
    if (hasAny('qty', 'quantity')) {
      record.qty = normalizeNumber(record.qty ?? record.quantity);
    }
  }
  if (collectionName === 'customers' || collectionName === 'retailers' || collectionName === 'dealers') {
    record.name = record.name || record.customerName || record.supplierName || record.companyName || '';
    if (record.balance !== undefined) record.balance = normalizeNumber(record.balance);
    if (record.outstanding !== undefined) record.outstanding = normalizeNumber(record.outstanding);
  }
  return record;
}

function recordKey(collectionName, record, index) {
  const normalized = normalizeRecord(collectionName, record);
  const text = (value) => String(value || '').trim().toLowerCase();

  if (collectionName === 'ledger') {
    if (normalized.ref) return `ref:${text(normalized.ref)}`;
    return `ledger:${text(normalized.time)}|${text(normalized.debit)}|${text(normalized.credit)}|${normalized.amount}`;
  }
  if (['purchases', 'sales', 'returns'].includes(collectionName) && normalized.ref) {
    return `ref:${text(normalized.ref)}`;
  }
  if (collectionName === 'inventory' && (normalized.id || normalized.sku)) {
    return `id:${normalized.id || text(normalized.sku)}`;
  }
  if (collectionName === 'catalog' && (normalized.id || normalized.sku)) {
    return `id:${normalized.id || text(normalized.sku)}`;
  }
  if (['customers', 'retailers', 'dealers', 'staff'].includes(collectionName)) {
    return `person:${text(normalized.name)}|${text(normalized.gst || normalized.tel || normalized.phone)}`;
  }
  if (collectionName === 'auditLog') {
    return `audit:${text(normalized.action)}|${text(normalized.module)}|${text(normalized.timestamp)}`;
  }
  if (collectionName === 'commissions') {
    return `commission:${text(normalized.staffName || normalized.name)}|${text(normalized.time)}|${normalized.amount}`;
  }
  if (collectionName === 'logs') {
    return `log:${text(normalized.message)}|${text(normalized.time)}`;
  }
  return `fallback:${JSON.stringify(normalized)}:${index}`;
}

function mergeRecords(collectionName, sources) {
  const merged = new Map();
  let duplicates = 0;

  sources.flatMap(source => getCollection(source, collectionName)).forEach((rawRecord, index) => {
    const record = normalizeRecord(collectionName, rawRecord);
    const key = recordKey(collectionName, record, index);
    if (merged.has(key)) {
      merged.set(key, { ...merged.get(key), ...record });
      duplicates += 1;
    } else {
      merged.set(key, record);
    }
  });

  return { records: [...merged.values()], duplicates };
}

function findProfile(sources) {
  for (const source of sources) {
    const state = firstObject(source);
    const profile = state.companyProfile || state.company || state.tenantProfile;
    if (profile && typeof profile === 'object') return { ...profile };
  }
  return {};
}

function updateTenantReferences(value) {
  if (Array.isArray(value)) return value.map(updateTenantReferences);
  if (!value || typeof value !== 'object') return value;

  const updated = {};
  for (const [key, current] of Object.entries(value)) {
    if (['tenantCode', 'tenant_code', 'companyTenantCode'].includes(key)) {
      updated[key] = TENANT_CODE;
    } else if (['tenantName', 'tenant_name', 'companyTenantName'].includes(key)) {
      updated[key] = TENANT_NAME;
    } else {
      updated[key] = updateTenantReferences(current);
    }
  }
  return updated;
}

function buildMergedState(sources) {
  const state = {};
  const stats = { sourceRecords: 0, mergedRecords: 0, duplicatesCollapsed: 0 };

  for (const collectionName of Object.keys(COLLECTION_DEFAULTS)) {
    const result = mergeRecords(collectionName, sources);
    state[collectionName] = result.records;
    stats.sourceRecords += sources.reduce((sum, source) => sum + getCollection(source, collectionName).length, 0);
    stats.mergedRecords += result.records.length;
    stats.duplicatesCollapsed += result.duplicates;
  }

  const profile = findProfile(sources);
  state.companyProfile = updateTenantReferences({
    ...profile,
    tenantCode: TENANT_CODE,
    companyName: TENANT_NAME,
    tradeName: profile.tradeName || TENANT_NAME
  });

  const threshold = normalizeNumber(
    firstObject(sources[1]).lowStockThreshold ?? firstObject(sources[0]).lowStockThreshold,
    8
  );
  state.lowStockThreshold = threshold;
  state.lowStockCount = state.inventory.filter(item => normalizeNumber(item.stock) <= threshold).length;
  state.activeStaff = state.staff.filter(member => member.present === true || member.status === 'active').length;
  state.revenue = Number(state.ledger
    .filter(item => item.type === 'inflow')
    .reduce((sum, item) => sum + normalizeNumber(item.amount), 0)
    .toFixed(2));
  state.expenses = Number(state.ledger
    .filter(item => item.type === 'expense')
    .reduce((sum, item) => sum + normalizeNumber(item.amount), 0)
    .toFixed(2));

  const outstandingDealerLiabilities = Number(state.dealers
    .reduce((sum, dealer) => sum + normalizeNumber(dealer.outstanding), 0)
    .toFixed(2));
  state.metrics = {
    ...(firstObject(sources[1]).metrics || {}),
    tenantCode: TENANT_CODE,
    tenantName: TENANT_NAME,
    revenueInflows: state.revenue,
    expenseOutflows: state.expenses,
    outstandingDealerLiabilities,
    customerReceivables: Number(state.customers.reduce((sum, item) => sum + normalizeNumber(item.balance), 0).toFixed(2)),
    retailerReceivables: Number(state.retailers.reduce((sum, item) => sum + normalizeNumber(item.balance), 0).toFixed(2)),
    lowStockCount: state.lowStockCount,
    activeStaff: state.activeStaff
  };

  state.theme = firstObject(sources[1]).theme || firstObject(sources[0]).theme || 'indigo';
  state.soundEnabled = firstObject(sources[1]).soundEnabled ?? true;
  state.voiceEnabled = firstObject(sources[1]).voiceEnabled ?? true;
  state.ledgerFilter = 'all';
  state.activeDirTab = 'dealers';

  return { state: updateTenantReferences(state), stats };
}

function main() {
  const positional = process.argv.slice(2).filter(argument => argument !== '--force');
  if (positional.length < 2 || positional.length > 3) {
    usage('Provide both backup paths and optionally an output path.');
    return;
  }

  const [firstBackup, secondBackup, outputName = DEFAULT_OUTPUT] = positional;
  const outputPath = path.resolve(outputName);
  if (fs.existsSync(outputPath) && !process.argv.includes('--force')) {
    usage(`Output already exists: ${outputPath}. Use --force to replace it.`);
    return;
  }

  try {
    const sources = [readJson(firstBackup), readJson(secondBackup)];
    const { state, stats } = buildMergedState(sources);
    fs.writeFileSync(outputPath, `${JSON.stringify(state, null, 2)}\n`, 'utf8');

    console.log(`Merged backup written to: ${outputPath}`);
    console.log(`Records read: ${stats.sourceRecords}`);
    console.log(`Records written: ${stats.mergedRecords}`);
    console.log(`Duplicates collapsed: ${stats.duplicatesCollapsed}`);
    console.log(`Tenant: ${TENANT_NAME} (${TENANT_CODE})`);
    console.log(`Revenue inflows: INR ${state.revenue.toFixed(2)}`);
    console.log(`Dealer liabilities: INR ${state.metrics.outstandingDealerLiabilities.toFixed(2)}`);
    console.log('Next step: import this JSON through the dashboard Export/Import State control.');
  } catch (error) {
    usage(error.message);
  }
}

main();
