import fs from 'fs';

let content = fs.readFileSync('C:\\AI\\BrewTech-SG\\src\\site-builder.js', 'utf-8');

// 1. CSS fixes for card-media-wrapper, card-media-link, and card-img
content = content.replace(
  /\.card-media-wrapper\s*\{[\s\S]*?\.ergo-card:hover \.card-img\s*\{[^}]*\}/,
  `.card-media-wrapper {
  position: relative;
  height: 270px;
  background: #ffffff;
  overflow: hidden;
  border-bottom: 1px solid var(--ergo-border-light);
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-media-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 42px 18px 16px 18px;
  box-sizing: border-box;
  text-decoration: none;
}

.card-img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  margin: auto;
  display: block;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.ergo-card:hover .card-img {
  transform: scale(1.05);
}`
);

// 2. CSS fixes for detail-gallery and detail-img
content = content.replace(
  /\.detail-gallery\s*\{[\s\S]*?\.detail-img\s*\{[^}]*\}/,
  `.detail-gallery {
  background: #ffffff;
  border: 1px solid var(--ergo-border);
  border-radius: 20px;
  padding: 30px 20px;
  text-align: center;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 340px;
  box-sizing: border-box;
}

.detail-img {
  max-width: 100%;
  max-height: 420px;
  width: auto;
  height: auto;
  object-fit: contain;
  margin: 0 auto;
  display: block;
}`
);

// 3. Responsive media queries
content = content.replace(
  /@media \(max-width: 860px\)\s*\{[\s\S]*?z-index: 999;\s*\}\s*\}/,
  `@media (max-width: 860px) {
  .product-detail-layout { grid-template-columns: 1fr; }
  .hero-title { font-size: 2.2rem; }
  .product-grid { grid-template-columns: 1fr; }
  .card-media-wrapper {
    height: 240px;
  }
  .card-media-link {
    padding: 38px 14px 12px 14px;
  }
  .card-img {
    max-height: 185px;
  }
  .detail-gallery {
    padding: 20px 14px;
    min-height: 260px;
  }
  .detail-img {
    max-height: 280px;
  }
  .mobile-sticky-cta {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.96);
    backdrop-filter: blur(15px);
    border-top: 1px solid var(--ergo-border);
    padding: 12px 18px;
    align-items: center;
    justify-content: space-between;
    z-index: 999;
  }
}

@media (max-width: 480px) {
  .card-media-wrapper {
    height: 220px;
  }
  .card-media-link {
    padding: 36px 10px 10px 10px;
  }
  .card-img {
    max-height: 170px;
  }
  .detail-gallery {
    min-height: 230px;
    padding: 16px 10px;
  }
  .detail-img {
    max-height: 230px;
  }
}`
);

// 4. renderProductCard link class
content = content.replace(
  /<a href="\$\{detailLink\}">\s*<img src="\$\{imgSrc\}"/,
  '<a href="${detailLink}" class="card-media-link">\n          <img src="${imgSrc}"'
);

// 5. Head meta tags
content = content.replace(
  /<title>BrewTech SG[\s\S]*?<\/title>[\s\S]*?<meta name="description" content="[\s\S]*?">[\s\S]*?"description": "Singapore's Premier Smart Beauty & Personal Care Tech Authority"/,
  `<title>BrewTech SG - Best Compact Espresso Machines, Conical Burr Grinders & Home Barista Tech Singapore (2026)</title>
  <meta name="description" content="Singapore's premier home barista tech authority. Independent reviews of 15-bar compact espresso machines, conical burr coffee grinders, precision 0.1g digital scales, and gooseneck temperature-kettles.">
  <link rel="stylesheet" href="./assets/styles.css">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "BrewTech SG",
    "url": "https://brewtech-sg.netlify.app",
    "description": "Singapore's Premier Home Barista & Specialty Coffee Tech Authority"`
);

// 6. Guides section header
content = content.replace(
  /Singapore Clinical Skincare & Beauty Tech Guides[\s\S]*?Dermatologist-backed buying blueprints designed specifically for Singapore tropical humidity, sun exposure, and hair frizz\./,
  `Singapore Home Barista & Specialty Coffee Guides
        </h2>
        <p style="color: var(--ergo-text-secondary); font-size: 1.05rem; margin-top: 6px;">
          Barista-crafted buying blueprints designed specifically for Singapore kitchen countertops, high ambient humidity coffee bean storage, and espresso extraction.`
);

// 7. Guides data
const newGuides = `  getSeoGuidesData(products) {
    return [
      {
        slug: 'compact-espresso-machine-singapore-kitchen-guide',
        seoTitle: 'Best Compact Espresso Machines for Small Singapore Kitchens & HDB Countertops (2026)',
        summary: 'Breville Bambino vs De\\'Longhi Dedica: How to pull café-quality double shots in under 3 seconds without sacrificing limited Singapore kitchen prep counter space.',
        heroProduct: products.find(p => p.asin === 'B0H1SGCMNG') || products[0],
        content: \`
          <p>With Singapore commercial café flat whites and oat lattes easily commanding S$7.50 to S$9.00 a cup, building a home espresso station pays for itself within three to four months. However, the primary constraint in modern Singapore BTO flats and condominiums is limited kitchen countertop depth.</p>
          <p>Traditional E61 commercial dual-boiler machines weigh 30kg and require 40cm of counter clearance. Modern ultra-compact thermo-coil machines like the Breville Bambino and De\\'Longhi Dedica measure under 15cm wide, feature instant 3-second PID thermal heat-up, and deliver 9 to 15 bars of regulated pressure for rich, velvety crema.</p>
          <h3>What to Look for in a Compact Singapore Espresso Machine</h3>
          <ul>
            <li><strong>Width Under 16cm:</strong> Fits comfortably beside your air fryer and induction hob without crowding prep space.</li>
            <li><strong>ThermoJet / ThermoBlock Heating:</strong> Ready to pull shots in 3 to 40 seconds without wasting 20 minutes preheating in Singapore morning rush hours.</li>
            <li><strong>Commercial 54mm Portafilter & Steam Wand:</strong> Microfoam texture capable of silky latte art rather than bubbly aerator froth.</li>
          </ul>
        \`
      },
      {
        slug: 'conical-burr-grinder-espresso-dialing-singapore',
        seoTitle: 'Why Pre-Ground Coffee Ruins Your Espresso: Conical Burr Grinder Dialing Guide for Singapore',
        summary: 'How Singapore\\'s high 85% humidity causes pre-ground coffee to absorb atmospheric moisture and channel. Why low-retention 40mm conical burrs are essential for consistent espresso crema.',
        heroProduct: products.find(p => p.asin === 'B0CR8245D9') || products[4],
        content: \`
          <p>In Singapore\\'s humid tropical atmosphere (80%+ RH), finely ground specialty coffee oxidizes and absorbs atmospheric moisture within 15 minutes of opening a bag. Damp grounds clump irregularly in the portafilter basket, causing high-pressure water channeling that yields sour, under-extracted espresso shots.</p>
          <p>Investing in a dedicated conical or flat burr electric grinder transforms your morning cup. Heavy stainless steel 40mm burrs slice beans uniformly with minimal heat generation, allowing precision micro-step adjustment to dial in medium-roast Colombian and Ethiopian beans to within half a second of target brew time.</p>
          <h3>Key Features for Singapore Home Coffee Grinders</h3>
          <ul>
            <li><strong>Stepless or 30+ Micro-Settings:</strong> Precision fine-tuning between 18 and 22-second espresso extraction windows.</li>
            <li><strong>Anti-Static Ion Technology:</strong> Prevents ground coffee from clinging to the chute and scattering over countertops in dry air-conditioned rooms.</li>
            <li><strong>Low Retention Chute:</strong> Bypasses stale coffee accumulation, ensuring every gram in equals freshly ground coffee out.</li>
          </ul>
        \`
      },
      {
        slug: 'smart-gooseneck-kettle-precision-scale-singapore-pourover',
        seoTitle: 'The Precision Pour-Over Setup: PID Temperature Kettles & 0.1g Smart Scales in Singapore',
        summary: 'Dialing in specialty Geisha and light-roast Ethiopian origins with ±1°C PID temperature stability and auto-timing Bluetooth coffee scales for the ultimate morning brew.',
        heroProduct: products.find(p => p.asin === 'B0CXQCV646') || products[8],
        content: \`
          <p>Specialty pour-over coffee requires absolute repeatability across three core variables: brew water temperature, water-to-coffee ratio, and flow rate. Boiling tap water at 100°C scorches delicate light-roast notes, extracting bitter tannins.</p>
          <p>Smart variable-temperature gooseneck kettles maintain water exactly between 90°C and 94°C with ±1°C PID precision. Paired with a 0.1g high-precision digital scale with built-in auto-timer, you can execute flawless 4:6 extraction methods and V60 brews with effortless consistency.</p>
          <h3>Essential Pour-Over Gear Checklist</h3>
          <ul>
            <li><strong>Counterbalanced Ergonomic Gooseneck:</strong> Allows steady 3ml/sec vertical laminar water flow without hand fatigue.</li>
            <li><strong>Waterproof Silicone Scale Pad:</strong> Protects high-precision strain gauges from hot water spills and thermal drift.</li>
            <li><strong>Compact Footprint:</strong> Minimalist aesthetic that doubles as a stylish kitchen display piece.</li>
          </ul>
        \`
      }
    ];
  }`;

content = content.replace(/getSeoGuidesData\(products\) \{[\s\S]*?\}\s*renderGuidePage/, `${newGuides}\n\n  renderGuidePage`);

// 8. Detail page headers
content = content.replace(/Key Ergonomic Features/g, 'Key Barista & Extraction Features');
content = content.replace(/Singapore Technical & Climate Specifications/g, 'Singapore Technical & Countertop Specifications');
content = content.replace(/Singapore HDB Ergonomics Blueprint/g, 'Singapore Home Barista Blueprint');
content = content.replace(/independent ergonomic research publication/g, 'independent home barista and specialty coffee research publication');

fs.writeFileSync('C:\\AI\\BrewTech-SG\\src\\site-builder.js', content, 'utf-8');
console.log('BrewTech SG site-builder.js successfully patched!');
