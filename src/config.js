import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Automatically load .env across all system scripts
const envPath = path.join(ROOT_DIR, '.env');
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf-8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx !== -1) {
      const key = trimmed.slice(0, idx).trim();
      let val = trimmed.slice(idx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      process.env[key] = val;
    }
  }
}

export const CONFIG = {
  paths: {
    root: ROOT_DIR,
    data: path.join(ROOT_DIR, 'data'),
    dist: path.join(ROOT_DIR, 'dist'),
    dashboard: path.join(ROOT_DIR, 'dashboard'),
    budgetLedger: path.join(ROOT_DIR, 'data', 'api-budget-ledger.json'),
    affiliateMetrics: path.join(ROOT_DIR, 'data', 'affiliate-metrics.json'),
    productFeed: path.join(ROOT_DIR, 'data', 'products-seed.json'),
    assets: path.join(ROOT_DIR, 'assets')
  },
  amazon: {
    associateTag: process.env.AMAZON_ASSOCIATE_TAG || 'pettechsg-22',
    accessKey: process.env.AMAZON_ACCESS_KEY || '',
    secretKey: process.env.AMAZON_SECRET_KEY || '',
    host: process.env.AMAZON_HOST || 'webservices.amazon.sg',
    region: process.env.AMAZON_REGION || 'fe-west-1',
    marketplaceId: 'A19VAU5U5O7RUS',
    domain: 'amazon.sg',
    currency: 'SGD',
    commissionRateAvg: 0.10
  },
  gemini: {
    apiKey: process.env.GEMINI_API_KEY || '',
    model: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
    apiEndpoint: 'https://generativelanguage.googleapis.com/v1beta/models',
    inputCostPer1M: 0.075,
    outputCostPer1M: 0.30
  },
  budget: {
    maxBudgetSgd: parseFloat(process.env.MAX_API_BUDGET_SGD || '5.00'),
    haltThresholdPercent: parseFloat(process.env.HALT_THRESHOLD_PERCENT || '85'),
    sgdUsdRate: parseFloat(process.env.SGD_USD_EXCHANGE_RATE || '1.34')
  },
  site: {
    name: 'BrewTech SG',
    tagline: 'Singapore Home Barista, Compact Espresso Machines & Precision Burr Grinders',
    url: 'https://brew.auraequip.com',
    locale: 'en-SG',
    contactEmail: 'rezavirtual@gmail.com',
    defaultTag: 'pettechsg-22'
  },
  categories: [
    { slug: 'espresso-machines', name: 'Espresso Machines', icon: '☕', desc: 'Slim 15-20 bar semi-automatic and multi-capsule machines for HDB countertops.' },
    { slug: 'burr-grinders', name: 'Precision Burr Grinders', icon: '⚙️', desc: 'Conical steel burr grinders delivering uniform particle size for café-grade crema.' },
    { slug: 'kettles-scales', name: 'Smart Kettles & Scales', icon: '⚖️', desc: 'Variable PID gooseneck kettles and 0.1g digital scales with auto-brew timers.' },
    { slug: 'barista-accessories', name: 'Barista Accessories', icon: '✨', desc: 'Bottomless portafilters, calibrated tampers, milk frothers, and puck screens.' }
  ]
};
