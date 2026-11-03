const fs = require('fs');
const path = require('path');

const PORTFOLIO_PROJECTS = [
  // 1. Digital Marketing Projects
  {
    id: 'proj-01',
    title: 'Targeted Ads & Campaign Setup',
    category: 'Digital Marketing',
    categorySlug: 'marketing',
    badge: 'Project 01',
    description: 'High-converting Facebook and Instagram advertising campaign built for laser-focused audience targeting, brand awareness, and positive ROI.',
    details: 'Full-funnel campaign structure featuring pixel tracking, custom audience segments, high-converting ad copy, mobile-optimized creative sets, and ROAS optimization.',
    author: 'Ruddranil',
    mediaUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
    likesCount: 34,
    commentsCount: 6,
    serviceSlug: 'Facebook & Instagram Ads Campaign',
    createdAt: '2026-10-25T10:00:00Z'
  },
  {
    id: 'proj-02',
    title: 'Full-Suite SEO & Web Ranking',
    category: 'Digital Marketing',
    categorySlug: 'marketing',
    badge: 'Project 02',
    description: 'Comprehensive on-page, technical, and off-page SEO optimization structured to increase organic traffic and rank key search terms on Google.',
    details: 'Complete site audit, schema markup injection, core web vitals speed optimization, keyword cannibalization fixes, and high-authority contextual backlink strategy.',
    author: 'Ruddranil',
    mediaUrl: 'https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
    likesCount: 29,
    commentsCount: 4,
    serviceSlug: 'Search Engine Optimization (SEO)',
    createdAt: '2026-10-25T11:00:00Z'
  },
  {
    id: 'proj-03',
    title: 'Social Media Growth & Management',
    category: 'Digital Marketing',
    categorySlug: 'marketing',
    badge: 'Project 03',
    description: 'End-to-end social media profile handling, consistent content scheduling, and community engagement strategies to build an active following.',
    details: 'Curated monthly content calendars, aesthetic grid layout, hashtag taxonomy, community DM responses, and organic audience engagement protocols.',
    author: 'Ruddranil',
    mediaUrl: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
    likesCount: 42,
    commentsCount: 7,
    serviceSlug: 'Social Media Management',
    createdAt: '2026-10-25T12:00:00Z'
  },
  {
    id: 'proj-04',
    title: 'Google Ads & PPC Lead Generation',
    category: 'Digital Marketing',
    categorySlug: 'marketing',
    badge: 'Project 04',
    description: 'High-intent Google Search and Display ad campaign configured for lower cost-per-click and maximized inbound leads.',
    details: 'Exact match keyword architecture, negative keyword blocklists, dynamic sitelink assets, responsive search ad copywriting, and conversion action tracking.',
    author: 'Ruddranil',
    mediaUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
    likesCount: 38,
    commentsCount: 5,
    serviceSlug: 'Google Ads / PPC Expert',
    createdAt: '2026-10-25T13:00:00Z'
  },
  {
    id: 'proj-05',
    title: 'Email Marketing & Drip Campaign',
    category: 'Digital Marketing',
    categorySlug: 'marketing',
    badge: 'Project 05',
    description: 'Responsive newsletter layouts and automated behavioral drip workflows built to retain subscribers and boost repeat conversions.',
    details: 'Welcome sequences, abandoned cart triggers, promotional broadcast templates, mobile-first responsive HTML design, and SPF/DKIM inbox placement optimization.',
    author: 'Ruddranil',
    mediaUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
    likesCount: 27,
    commentsCount: 3,
    serviceSlug: 'Email Marketing Automation',
    createdAt: '2026-10-25T14:00:00Z'
  },

  // 2. YouTube Projects
  {
    id: 'proj-06',
    title: 'YouTube Video SEO & Tag Optimization',
    category: 'YouTube Services',
    categorySlug: 'youtube',
    badge: 'Project 06',
    description: 'Complete metadata overhaul including VidIQ optimization, keyword-focused titles, detailed descriptions, and targeted tags for algorithmic reach.',
    details: 'Algorithmic search term ranking, VidIQ SEO 50/50 score compliance, timestamps chapter structure, info cards, and end screen viewer retention loop.',
    author: 'Ruddranil',
    mediaUrl: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
    likesCount: 45,
    commentsCount: 8,
    serviceSlug: 'YouTube Video SEO & Optimization',
    createdAt: '2026-10-26T10:00:00Z'
  },
  {
    id: 'proj-07',
    title: 'YouTube Channel Organic Growth',
    category: 'YouTube Services',
    categorySlug: 'youtube',
    badge: 'Project 07',
    description: 'Full channel management strategy covering regular schedule optimization, playlist architecture, and organic viewer retention methods.',
    details: 'Channel homepage redesign, featured trailer placement, topical playlist grouping, community tab polls, and viewer engagement moderation.',
    author: 'Ruddranil',
    mediaUrl: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
    likesCount: 52,
    commentsCount: 9,
    serviceSlug: 'YouTube Channel Growth & Management',
    createdAt: '2026-10-26T11:00:00Z'
  },
  {
    id: 'proj-08',
    title: 'High-CTR Thumbnail Design',
    category: 'YouTube Services',
    categorySlug: 'youtube',
    badge: 'Project 08',
    description: 'Bold, eye-catching, and click-optimized thumbnail art created to significantly raise impression click-through rates.',
    details: 'High-contrast typography, facial expression cutout enhancement, glowing outlines, color grading, and A/B tested visual psychology layout.',
    author: 'Ruddranil',
    mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
    likesCount: 61,
    commentsCount: 12,
    serviceSlug: 'YouTube Thumbnail Design',
    createdAt: '2026-10-26T12:00:00Z'
  },
  {
    id: 'proj-09',
    title: 'YouTube Long-Form Video Editing',
    category: 'YouTube Services',
    categorySlug: 'youtube',
    badge: 'Project 09',
    description: 'Dynamic video editing featuring clean transitions, motion graphics, audio mastering, subtitles, and engaging B-roll pacing.',
    details: 'Premiere Pro & After Effects workflow with multi-cam sync, color grading, SFX sound design, narrative pacing, and YouTube compression export.',
    author: 'Ruddranil',
    mediaUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
    likesCount: 48,
    commentsCount: 6,
    serviceSlug: 'YouTube Video Editing',
    createdAt: '2026-10-26T13:00:00Z'
  },
  {
    id: 'proj-10',
    title: 'YouTube Video Ads Campaign',
    category: 'YouTube Services',
    categorySlug: 'youtube',
    badge: 'Project 10',
    description: 'Targeted YouTube discovery and in-stream ad setups designed to accelerate channel subscriber growth and video view velocity.',
    details: 'Google Ads video campaign setup, in-feed discovery placement, competitor channel targeting, low CPV bid strategy, and audience exclusions.',
    author: 'Ruddranil',
    mediaUrl: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
    likesCount: 39,
    commentsCount: 4,
    serviceSlug: 'YouTube Ads Campaign Setup',
    createdAt: '2026-10-26T14:00:00Z'
  },
  {
    id: 'proj-11',
    title: 'Viral Shorts & Reels Production',
    category: 'YouTube Services',
    categorySlug: 'youtube',
    badge: 'Project 11',
    description: 'Fast-paced vertical short-form video creation with kinetic typography, hooks, and sound effects tailored for viral distribution.',
    details: '9:16 vertical framing, 3-second visual hook, animated word-by-word captions, sound effects, trending audio syncing, and seamless loop design.',
    author: 'Ruddranil',
    mediaUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
    likesCount: 57,
    commentsCount: 11,
    serviceSlug: 'YouTube Shorts & Automation',
    createdAt: '2026-10-26T15:00:00Z'
  },

  // 3. Graphic Design Projects
  {
    id: 'proj-12',
    title: 'Modern Logo & Brand Identity',
    category: 'Creative Design',
    categorySlug: 'design',
    badge: 'Project 12',
    description: 'Distinctive logo creation backed by full brand guidelines, color palettes, and typographic styling for consistent business branding.',
    details: 'Vector primary logo, monochrome variant, favicon, official color codes (HEX/CMYK), typography pairings, and brand presentation deck.',
    author: 'Ruddranil',
    mediaUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
    likesCount: 64,
    commentsCount: 14,
    serviceSlug: 'Logo & Brand Identity',
    createdAt: '2026-10-27T10:00:00Z'
  },
  {
    id: 'proj-13',
    title: 'Social Media Creative Assets',
    category: 'Creative Design',
    categorySlug: 'design',
    badge: 'Project 13',
    description: 'Creative visual banners, feed posts, and promotional templates designed to maintain visual authority across all digital networks.',
    details: 'Cohesive multi-platform banner pack (LinkedIn, Twitter/X, Facebook, YouTube), carousel post templates, and high-impact promo ads.',
    author: 'Ruddranil',
    mediaUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
    likesCount: 46,
    commentsCount: 8,
    serviceSlug: 'Social Media Post & Banner Design',
    createdAt: '2026-10-27T11:00:00Z'
  },
  {
    id: 'proj-14',
    title: 'UI/UX Interface Prototype',
    category: 'Creative Design',
    categorySlug: 'design',
    badge: 'Project 14',
    description: 'Modern, clean, and responsive web/mobile interface designs developed in Figma with user-centric interaction models.',
    details: 'Wireframing, auto-layout component library, design tokens, micro-interactions, clickable high-fidelity prototype, and developer handover specs.',
    author: 'Ruddranil',
    mediaUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
    likesCount: 73,
    commentsCount: 16,
    serviceSlug: 'UI/UX Web & Mobile App Design',
    createdAt: '2026-10-27T12:00:00Z'
  },
  {
    id: 'proj-15',
    title: 'Print-Ready Marketing Collateral',
    category: 'Creative Design',
    categorySlug: 'design',
    badge: 'Project 15',
    description: 'High-resolution flyers, tri-fold brochures, packaging layouts, and corporate business cards prepared with accurate bleed marks.',
    details: 'CMYK 300 DPI print-ready PDFs, safe margin alignments, spot UV layers, custom die-cut guidelines, and tactile paper stock recommendations.',
    author: 'Ruddranil',
    mediaUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
    likesCount: 33,
    commentsCount: 5,
    serviceSlug: 'Print Media Design',
    createdAt: '2026-10-27T13:00:00Z'
  },
  {
    id: 'proj-16',
    title: 'Custom Vector Art & Illustration',
    category: 'Creative Design',
    categorySlug: 'design',
    badge: 'Project 16',
    description: 'Hand-crafted digital vector illustrations and clean raster-to-vector tracings optimized for web, print, and digital merchandise.',
    details: 'Scalable SVG & Adobe Illustrator source assets, custom mascot characters, isometric editorial scenes, and infinite resolution vector paths.',
    author: 'Ruddranil',
    mediaUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
    likesCount: 51,
    commentsCount: 9,
    serviceSlug: 'Vector Art & Illustration',
    createdAt: '2026-10-27T14:00:00Z'
  },

  // 4. Data Entry & Virtual Assistant Projects
  {
    id: 'proj-17',
    title: 'Spreadsheet & Database Data Entry',
    category: 'Data Operations',
    categorySlug: 'data',
    badge: 'Project 17',
    description: 'High-accuracy spreadsheet data entry, automated cell calculations, and clean database record updating across Excel and Google Sheets.',
    details: 'Error-free manual transcription, formula automation (VLOOKUP, INDEX/MATCH, XLOOKUP), conditional formatting, and organized tab hierarchy.',
    author: 'Ruddranil',
    mediaUrl: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
    likesCount: 37,
    commentsCount: 6,
    serviceSlug: 'Excel & Google Sheets Data Entry',
    createdAt: '2026-10-28T10:00:00Z'
  },
  {
    id: 'proj-18',
    title: 'B2B Lead Generation & Web Research',
    category: 'Data Operations',
    categorySlug: 'data',
    badge: 'Project 18',
    description: 'Targeted corporate research delivering verified contact lists, decision-maker emails, company profiles, and structured spreadsheets.',
    details: 'Prospect research via LinkedIn Sales Navigator, corporate directory verification, direct dial & verified work email extraction with zero bounce audit.',
    author: 'Ruddranil',
    mediaUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
    likesCount: 44,
    commentsCount: 7,
    serviceSlug: 'Web Research & B2B Lead Generation',
    createdAt: '2026-10-28T11:00:00Z'
  },
  {
    id: 'proj-19',
    title: 'Data Cleaning & Duplicate Removal',
    category: 'Data Operations',
    categorySlug: 'data',
    badge: 'Project 19',
    description: 'Large-scale dataset scrubbing, column normalization, formatting standardization, and duplicate elimination for error-free reporting.',
    details: 'Regex pattern matching, white-space trimming, case standardization, fuzzy duplicate merging, address normalization, and validation rules.',
    author: 'Ruddranil',
    mediaUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
    likesCount: 31,
    commentsCount: 4,
    serviceSlug: 'Data Cleaning & Formatting',
    createdAt: '2026-10-28T12:00:00Z'
  },
  {
    id: 'proj-20',
    title: 'Document Conversion & Transcription',
    category: 'Data Operations',
    categorySlug: 'data',
    badge: 'Project 20',
    description: 'Accurate data extraction and conversion from scanned PDFs, images, and handwritten records into structured Word and Excel formats.',
    details: 'OCR verification, table layout reconstruction, footnote alignment, mathematical equation formatting, and 100% typographic proofreading.',
    author: 'Ruddranil',
    mediaUrl: 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
    likesCount: 28,
    commentsCount: 3,
    serviceSlug: 'PDF to Excel / Word Conversion',
    createdAt: '2026-10-28T13:00:00Z'
  },
  {
    id: 'proj-21',
    title: 'E-commerce Catalog Management',
    category: 'Data Operations',
    categorySlug: 'data',
    badge: 'Project 21',
    description: 'Complete product listing creation, SKU assignment, variant configuration, and SEO description updates for online stores.',
    details: 'Shopify and WooCommerce bulk CSV uploads, high-resolution product image alt-tagging, inventory threshold tracking, and collection categorization.',
    author: 'Ruddranil',
    mediaUrl: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
    likesCount: 36,
    commentsCount: 5,
    serviceSlug: 'E-commerce Product Listing',
    createdAt: '2026-10-28T14:00:00Z'
  },

  // 5. Automation Projects
  {
    id: 'proj-22',
    title: 'Messenger Chatbot & Lead System',
    category: 'Business Automation',
    categorySlug: 'automation',
    badge: 'Project 22',
    description: 'Interactive Facebook Messenger automation system featuring predefined instant replies, automated booking flows, and real-time lead capture.',
    details: 'ManyChat conversational branching, 24/7 instant FAQ answers, email & phone input validation, webhook dispatch to CRM, and live human agent handoff.',
    author: 'Ruddranil',
    mediaUrl: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
    likesCount: 49,
    commentsCount: 10,
    serviceSlug: 'Facebook Messenger Automation',
    createdAt: '2026-10-29T10:00:00Z'
  },
  {
    id: 'proj-23',
    title: 'WhatsApp Business Chat Automation',
    category: 'Business Automation',
    categorySlug: 'automation',
    badge: 'Project 23',
    description: 'Automated customer service workflows, scheduled follow-ups, and interactive catalog messaging for 24/7 client response.',
    details: 'WhatsApp Cloud API integration, clickable interactive action buttons, PDF product brochure dispatch, out-of-office autoreply, and Google Sheets order logger.',
    author: 'Ruddranil',
    mediaUrl: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
    likesCount: 55,
    commentsCount: 12,
    serviceSlug: 'WhatsApp Automation & Chatbot',
    createdAt: '2026-10-29T11:00:00Z'
  },
  {
    id: 'proj-24',
    title: 'Gmail & Cold Outreach Automation',
    category: 'Business Automation',
    categorySlug: 'automation',
    badge: 'Project 24',
    description: 'Multi-tier email workflow setup including inbox filtering, automatic triggers, personalized outreach follow-ups, and organization rules.',
    details: 'Google Apps Script engine, automated 3-stage drip sequences with reply detection stop, color-coded label routing, and SPF/DKIM deliverability health check.',
    author: 'Ruddranil',
    mediaUrl: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
    likesCount: 41,
    commentsCount: 7,
    serviceSlug: 'Gmail / Email Workflow Automation',
    createdAt: '2026-10-29T12:00:00Z'
  }
];

// 1. Write data/projects.json
const projectsPath = path.resolve(__dirname, '../data/projects.json');
fs.writeFileSync(projectsPath, JSON.stringify(PORTFOLIO_PROJECTS, null, 2), 'utf-8');
console.log(`Updated data/projects.json: now contains ${PORTFOLIO_PROJECTS.length} showcase projects.`);

// 2. Update DEFAULT_PORTFOLIO_PROJECTS in script.js
const scriptPath = path.resolve(__dirname, '../script.js');
let scriptContent = fs.readFileSync(scriptPath, 'utf-8');

const startMarker = 'var DEFAULT_PORTFOLIO_PROJECTS = window.DEFAULT_PORTFOLIO_PROJECTS || [';
const endMarker = 'window.DEFAULT_PORTFOLIO_PROJECTS = DEFAULT_PORTFOLIO_PROJECTS;';

const sIdx = scriptContent.indexOf(startMarker);
const eIdx = scriptContent.indexOf(endMarker);

if (sIdx !== -1 && eIdx !== -1) {
  const replacement = `var DEFAULT_PORTFOLIO_PROJECTS = ${JSON.stringify(PORTFOLIO_PROJECTS, null, 2)};\nwindow.DEFAULT_PORTFOLIO_PROJECTS = DEFAULT_PORTFOLIO_PROJECTS;`;
  scriptContent = scriptContent.slice(0, sIdx) + replacement + scriptContent.slice(eIdx + endMarker.length);
  fs.writeFileSync(scriptPath, scriptContent, 'utf-8');
  console.log(`Updated DEFAULT_PORTFOLIO_PROJECTS in script.js with all ${PORTFOLIO_PROJECTS.length} showcase projects.`);
} else {
  console.warn('Could not find DEFAULT_PORTFOLIO_PROJECTS markers in script.js');
}
