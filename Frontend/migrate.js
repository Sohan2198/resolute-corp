// migrate.js — Run once to upload all hardcoded blog posts to Firebase Firestore
// Usage: node migrate.js
// Run from: d:\Desktop\New folder\Resolute\Frontend

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc, getDocs } = require('firebase/firestore');
const fs = require('fs');
const path = require('path');

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBvN-q_RzizPAGhmMLqAhh9ogjj3nxujbg",
  authDomain: "resolutecorp-web.firebaseapp.com",
  projectId: "resolutecorp-web",
  storageBucket: "resolutecorp-web.firebasestorage.app",
  messagingSenderId: "645878397637",
  appId: "1:645878397637:web:de2faeaee9987fd24a0eac"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ── Map every import variable → public URL path ────────────────────────────
const bannerMap = {
  blog1:       '/assets/blog/Blog Banner.jpg',
  blog2:       '/assets/blog/Diwali-2024.jpg',
  blog3:       '/assets/blog/Evolution.jpg',
  blog4:       '/assets/blog/Unlock-Prosperity.jpg',
  blog5:       '/assets/blog/No-Shave.jpg',
  blog6:       '/assets/blog/Sectors Likely.jpg',
  blog7:       '/assets/blog/Indian-Wedding-Season.jpg',
  blog8:       '/assets/blog/DirectTax.jpg',
  blog9:       '/assets/blog/Investment.jpg',
  blog10:      '/assets/blog/SMP.jpg',
  blog11:      '/assets/blog/People Analytics HR.jpg',
  blog12:      '/assets/blog/HRTrends.jpg',
  blog13:      '/assets/blog/EthicsofHRAutomation.jpg',
  blog14:      '/assets/blog/TopAITools.jpg',
  blog15:      '/assets/blog/StrongEmployerBrand.jpg',
  blog16:      '/assets/blog/AIAutomation.jpg',
  blog17:      '/assets/blog/PortfolioCompanies.jpg',
  blog18:      '/assets/blog/TopHR.jpg',
  blog19:      '/assets/blog/AIVsHuman.jpg',
  blog20:      '/assets/blog/HDCFashion.jpg',
  blog21:      '/assets/blog/3NewWays.webp',
  blog22:      '/assets/blog/DubaiRealEstateVsRest.webp',
  blog23:      '/assets/blog/FractionalRealEstate.webp',
  blog24:      '/assets/blog/RealEstateSector.webp',
  blog25:      '/assets/blog/FractionalReal.webp',
  blog26:      '/assets/blog/WhatisFractional.webp',
  blog27:      '/assets/blog/WhyFractionalOwnership.webp',
  blog28:      '/assets/blog/10Reasons.jpg',
  blog29:      '/assets/blog/InvestinginDubai.jpg',
  blog30:      '/assets/blog/MostPromising.jpg',
  blog31:      '/assets/blog/Neighbourhoods.jpg',
  blog32:      '/assets/blog/Understanding.jpg',
  blog33:      '/assets/blog/FutureofSport.jpg',
  blog34:      '/assets/blog/Boardroom.jpg',
  blog35:      '/assets/blog/FutureofWork.jpg',
  blog36:      '/assets/blog/LuxuryMeetsStrategy.jpg',
  blog37:      '/assets/blog/Champions.jpg',
  blog38:      '/assets/blog/FamilyOffice.jpg',
  blog39:      '/assets/blog/TheTalentWar.jpg',
  blog40:      '/assets/blog/WomenEntrepreneurs.jpg',
  blog41:      '/assets/blog/BehindtheBrand.jpg',
  blog42:      '/assets/blog/WhyFamilyOffices.jpg',
  blog43:      '/assets/blog/FamilyOfficeModels.jpg',
  blog44:      '/assets/blog/Diversification.jpg',
  blog45:      '/assets/blog/WhyIsDubai.jpg',
  blog46:      '/assets/blog/Multi-Generational.jpg',
  bicycle:     '/assets/blog/BicycleLaunchpad.jpg',
  blog47:      '/assets/blog/FrontierBanner.jpg',
  Dubai:       '/assets/blog/Dubai.jpg',
  Singapore:   '/assets/blog/Singapore.jpg',
  HongKong:    '/assets/blog/HongKong.jpg',
  blog48:      '/assets/blog/TheRiseFamily.jpg',
  blog49:      '/assets/blog/India-UK-FTA.jpg',
  blog50:      '/assets/blog/Hair-Accessories.jpg',
  blog51:      '/assets/blog/Mortgage.jpg',
  Training1:   '/assets/blog/Training1.jpg',
  Training2:   '/assets/blog/Training2.jpg',
  blog52:      '/assets/blog/TrainingCamp.jpg',
  blog53:      '/assets/blog/RedefiningAI.jpg',
  blog54:      '/assets/blog/MuhuratTrading.jpg',
  blog55:      '/assets/blog/StrategicAllocation.jpg',
  blog56:      '/assets/blog/PVLSeason.jpg',
  blog57:      "/assets/blog/India'sFestival.jpg",
  blog58:      '/assets/blog/ImportertoInnovator.jpg',
  blog59:      '/assets/blog/BeyondSkills.jpg',
  blog60:      '/assets/blog/BeautyBoom.jpeg',
  blog61:      '/assets/blog/Acquisitions.jpg',
  blog62:      '/assets/blog/YenCarryTrade.jpg',
  blog63:      '/assets/blog/GoldmanSachs.jpg',
  blog64:      '/assets/blog/Data-Led.jpg',
  blog65:      '/assets/blog/SportsSponsorship.jpg',
  blog66:      '/assets/blog/NewLeagues.jpg',
  blog67:      '/assets/blog/IPOs.jpeg',
  blog68:      '/assets/blog/Union_Budget.jpg',
  ipo:         '/assets/blog/ipo.jpg',
  blog69:      '/assets/blog/Long-Term-Growth.jpeg',
  blog70:      '/assets/blog/Consumer.jpeg',
  blog71:      '/assets/blog/DubaiRealEstate.jpeg',
  ProjectedAI: '/assets/blog/ProjectedAI.jpg',
  blog72:      '/assets/blog/IndiaImpact.jpeg',
  blog73:      '/assets/blog/Billion-DollarDeals.jpg',
  Acquisition: '/assets/blog/Acquisition.jpg',
  Hormuz:      '/assets/blog/Hormuz.jpg',
  blog74:      '/assets/blog/indian-energy-needs.jpeg',
  GASPS:       '/assets/blog/GASPS.jpg',
  blog75:      '/assets/blog/GASPSS.jpeg',
  Oilimport:   '/assets/blog/Oil_Imports.jpg',
  Oilimport2:  '/assets/blog/Oil_Importss.jpg',
  blog76:      '/assets/blog/Diversification.jpeg',
  blog77:      '/assets/blog/Decoding_Market.jpg',
  blog78:      '/assets/blog/Nifty-Fell.jpeg',
  blog79:      '/assets/blog/NewIncome.jpg',
  blog80:      '/assets/blog/Wealth_ How.jpg',
  blog81:      '/assets/blog/PsychologyBehindSpendingandInvesting.jpg',
  blog82:      '/assets/blog/SIPvsLumpSum.jpeg',
  Reuters:     '/assets/blog/Reuters.jpg',
  blog83:      '/assets/blog/InterestRates.jpeg',
  blog84:      '/assets/blog/StockMarket.jpeg',
  Real:        '/assets/blog/Real.jpg',
  blog85:      '/assets/blog/smart-investors.jpeg',
  blog86:      '/assets/blog/Aerospace.jpg',
  PIB:         '/assets/blog/PIB.jpg',
  blog87:      '/assets/blog/FY2027.jpg',
  GoldMan:     '/assets/blog/Goldman.jpg',
  TOI:         '/assets/blog/TOI.jpg',
  blog88:      '/assets/blog/Post-War.jpeg',
  blog89:      '/assets/blog/Sports-Invest.jpeg',
  blog90:      '/assets/blog/BiggestInvestors.jpg',
  DLD:         '/assets/blog/DLD.jpg',
  blog91:      '/assets/blog/10-MinuteWardrobe.jpg',
  Bain:        '/assets/blog/Bain.jpg',
  blog92:      '/assets/blog/FashionGlobal.jpg',
  Leagues:     '/assets/blog/Leagues.jpg',
};

// ── Parse blogData.js without bundler ─────────────────────────────────────
function parseBlogData() {
  let raw = fs.readFileSync(
    path.join(__dirname, 'src', 'data', 'blogData.js'),
    'utf8'
  );

  // 1. Remove import lines
  raw = raw.replace(/^import\s+.*?from\s+['"][^'"]+['"];?\s*$/gm, '');

  // 2. Remove ES export keyword
  raw = raw.replace(/^export\s+const\s+/gm, 'const ');

  // 3. Replace ${variable} inside template literals in content (inline images)
  //    e.g. <img src="${bicycle}"> → <img src="/assets/blog/BicycleLaunchpad.jpg">
  for (const [varName, urlPath] of Object.entries(bannerMap)) {
    // Template literal interpolation: ${varName}
    const templatePattern = new RegExp(`\\$\\{${varName}\\}`, 'g');
    raw = raw.replace(templatePattern, urlPath);

    // Unquoted src attribute: src=${varName}  (some entries use this without quotes)
    const unquotedSrcPattern = new RegExp(`src=${varName}([\\s>])`, 'g');
    raw = raw.replace(unquotedSrcPattern, `src="${urlPath}"$1`);
  }

  // 4. Replace banner field values: `banner: blog1,` → `banner: "/assets/blog/..."`,`
  for (const [varName, urlPath] of Object.entries(bannerMap)) {
    const pattern = new RegExp(`(banner\\s*:\\s*)${varName}([,\\s}\\]])`, 'g');
    raw = raw.replace(pattern, `$1"${urlPath}"$2`);
  }

  // 5. Evaluate — wrap in IIFE so `const blogPosts` is returned
  const fn = new Function(`${raw}\n return blogPosts;`);
  return fn();
}

// ── Upload to Firestore ────────────────────────────────────────────────────
async function migrate() {
  console.log('🚀 Starting migration to Firebase Firestore...\n');

  // Get existing slugs from Firestore (skip posts already uploaded)
  const existingSnapshot = await getDocs(collection(db, 'blogs'));
  const existingSlugs = new Set();
  existingSnapshot.forEach(d => existingSlugs.add(d.id));
  console.log(`ℹ  Found ${existingSlugs.size} existing documents in Firestore.\n`);

  let posts;
  try {
    posts = parseBlogData();
    console.log(`📦 Parsed ${posts.length} posts from blogData.js\n`);
  } catch (err) {
    console.error('❌ Failed to parse blogData.js:', err.message);
    console.error(err);
    process.exit(1);
  }

  let uploaded = 0;
  let skipped  = 0;
  let errors   = 0;

  for (const post of posts) {
    if (!post.slug) {
      console.warn(`⚠  Skipping post without slug: "${post.title}"`);
      skipped++;
      continue;
    }

    if (existingSlugs.has(post.slug)) {
      console.log(`⏭  Already in Firestore: ${post.slug}`);
      skipped++;
      continue;
    }

    const cleanPost = {
      id:       post.id || null,
      slug:     post.slug,
      title:    post.title || '',
      author:   post.author || 'Resolute Corp',
      date:     post.date || '',
      category: post.category || '',
      excerpt:  post.excerpt || '',
      content:  post.content || '',
      banner:   typeof post.banner === 'string' ? post.banner : '',
    };

    try {
      await setDoc(doc(db, 'blogs', cleanPost.slug), cleanPost);
      console.log(`✅ Uploaded: ${cleanPost.slug}`);
      uploaded++;
    } catch (err) {
      console.error(`❌ Failed: ${cleanPost.slug} — ${err.message}`);
      errors++;
    }
  }

  console.log('\n─────────────────────────────────');
  console.log(`✅ Uploaded : ${uploaded}`);
  console.log(`⏭  Skipped  : ${skipped}`);
  console.log(`❌ Errors   : ${errors}`);
  console.log('─────────────────────────────────');
  console.log('\n🎉 Migration complete! All posts are now in Firebase Firestore.');
  process.exit(0);
}

migrate().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
