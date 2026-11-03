const fs = require('fs');
const path = require('path');

const servicesPath = path.resolve(__dirname, '../data/services.json');
const currentServices = JSON.parse(fs.readFileSync(servicesPath, 'utf-8'));

const AUTOMATION_SERVICES = [
  {
    id: 'srv-auto-fb-messenger',
    name: 'Facebook Messenger Automation',
    slug: 'facebook-messenger-automation',
    category: 'automation',
    categoryName: 'Automation Services',
    badge: 'AI CHATBOT',
    gigTitle: 'I will set up automated chatbot flows, FAQ responses, and lead capture systems for Facebook Messenger.',
    coverImage: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=1000&q=80',
    rating: '5.0',
    reviewsCount: 42,
    ordersInQueue: 3,
    description: 'High-converting Facebook Messenger chatbot automation to engage inbound leads instantly, answer common FAQs, collect contact details, and route qualified prospects directly to your sales team.',
    aboutNotes: [
      'Are you losing prospective customers because your Facebook page takes hours to reply to inbound messages? I engineer custom Facebook Messenger automated chatbot flows that respond within seconds, engage visitors with personalized conversations, and capture verified leads 24/7.',
      'Using industry-leading chatbot platforms like ManyChat and Chatfuel, I configure seamless FAQ flows, conditional branching based on user intent, calendar booking integration, and automatic notifications to your team when a hot lead wants human assistance.',
      'Every automation flow is designed to feel natural, interactive, and aligned with Meta\'s official Messenger Platform policies.'
    ],
    keyDeliverables: [
      'Complete Facebook Page & Messenger Chatbot Integration',
      'Welcome Message & Interactive Conversation Starter Menus',
      'Automated FAQ Branching Flows (Hours, Services, Pricing, Location)',
      'Lead Capture Flow with Email & Phone Number Validation',
      'Instant Email/SMS/Webhook Notification on New Lead Capture',
      'Live Chat Takeover Trigger for Human Agents',
      'Messenger Persistent Menu & Quick Reply Buttons',
      'Full Step-by-Step Video Walkthrough & 14-Day Warranty'
    ],
    whyChoose: [
      'Instant 24/7 Lead Response (Zero Missed Opportunities)',
      'ManyChat & Meta API Certified Best Practices',
      'Natural, High-Converting Conversational Copywriting',
      'Seamless CRM & Google Sheets Integration'
    ],
    workProcess: [
      { step: '01', title: 'Consultation & Flow Mapping', desc: 'Analyzing your customer inquiry patterns and designing the conversation logic flowchart.' },
      { step: '02', title: 'Chatbot Build & Branching', desc: 'Constructing automated messages, quick replies, and conditional logic.' },
      { step: '03', title: 'Lead Integration & Testing', desc: 'Connecting lead alerts to your email/CRM and testing all triggers on mobile.' },
      { step: '04', title: 'Deployment & Handover', desc: 'Launching live on your Facebook Page with complete admin documentation.' }
    ],
    tools: ['ManyChat', 'Meta Business Suite', 'Facebook Messenger API', 'Make / Zapier', 'Google Sheets'],
    faqs: [
      { q: 'Do I need a paid ManyChat account?', a: 'The basic package works on ManyChat Free. For advanced features (unlimited contacts, SMS, Zapier webhooks), ManyChat Pro ($15/mo) is recommended.' },
      { q: 'Will this comply with Facebook Messenger 24-hour messaging rules?', a: 'Yes! All chatbot flows are strictly designed within Meta\'s official messaging policy and standard tags.' },
      { q: 'Can my human team take over chats anytime?', a: 'Absolutely! The chatbot includes a smart pause feature whenever a human agent starts typing in Meta Business Suite.' }
    ],
    reviews: [
      { name: 'Marcus Sterling', country: 'United States', rating: 5, date: '2 days ago', comment: 'Our response time went from 3 hours to 2 seconds. Captured 37 qualified buyer leads in the first 48 hours!' },
      { name: 'Sophia Lin', country: 'Singapore', rating: 5, date: '1 week ago', comment: 'The chatbot flow is super smooth and human-like. Highly recommended for any active business page.' }
    ],
    packages: {
      basic: {
        name: 'Starter FAQ Bot',
        price: 35,
        deliveryDays: 3,
        expressFee: 15,
        expressDays: 1,
        desc: 'Welcome message, 5 core FAQ automated answers, persistent menu, and basic lead capture form.',
        features: ['Welcome Greeting Flow', '5 Automated FAQs', 'Contact Info Capture', 'Persistent Menu', '1 Revision']
      },
      standard: {
        name: 'Lead Gen Pro Bot',
        price: 75,
        deliveryDays: 5,
        expressFee: 25,
        expressDays: 2,
        desc: 'Advanced conversational flow: 12 FAQs, lead qualification scoring, Google Sheets CRM sync, and human live chat handover.',
        features: ['Full Lead Qualification Funnel', 'Up to 12 Automated FAQs', 'Google Sheets Sync', 'Human Takeover Triggers', 'Email Lead Alerts', '2 Revisions']
      },
      premium: {
        name: 'Omni-Sales Chatbot Funnel',
        price: 140,
        deliveryDays: 7,
        expressFee: 45,
        expressDays: 3,
        desc: 'Full-scale automated sales system: unlimited flows, broadcast tag setup, CRM/Calendly booking integration, and 30-day support.',
        features: ['Unlimited Flow Steps', 'Appointment / Calendly Booking', 'CRM Integration (HubSpot / Webhook)', 'Broadcasting Strategy', 'VIP Priority Support', 'Unlimited Revisions']
      }
    },
    addons: [
      { id: 'ad-fb-bot-1', name: 'Google Sheets Real-time CRM Sync', price: 20 },
      { id: 'ad-fb-bot-2', name: 'Calendly / Cal.com Appointment Booking Integration', price: 25 }
    ]
  },
  {
    id: 'srv-auto-whatsapp',
    name: 'WhatsApp Automation & Chatbot',
    slug: 'whatsapp-automation-chatbot',
    category: 'automation',
    categoryName: 'Automation Services',
    badge: 'HOT TREND',
    gigTitle: 'I will build WhatsApp business chatbots, auto-replies, and customer messaging workflows.',
    coverImage: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?auto=format&fit=crop&w=1000&q=80',
    rating: '5.0',
    reviewsCount: 51,
    ordersInQueue: 4,
    description: 'Professional WhatsApp Business API and cloud chatbot automation for instant customer inquiries, catalog browsing, automated greetings, order updates, and CRM sync.',
    aboutNotes: [
      'WhatsApp is the world\'s most direct and personal communication channel with a 98% open rate. I set up automated WhatsApp Business chatbots and messaging workflows that engage clients immediately, reduce customer support workload, and drive high-intent sales conversions.',
      'Whether you are using WhatsApp Business App or the official WhatsApp Cloud API via ManyChat, Wati, or Twilio, I configure interactive list messages, button menus, auto-replies for out-of-hours, and intelligent query routing.',
      'Get an automated customer assistant that works tirelessly 24 hours a day on your clients\' preferred messaging app.'
    ],
    keyDeliverables: [
      'WhatsApp Cloud API or WhatsApp Business Account Configuration',
      'Interactive List Menus & Quick Action Reply Buttons',
      'Automated Welcome Greeting & Away Messages',
      'Product / Service Catalog Inquiries & Quotation Flow',
      'Order Status Lookup & Milestone Notification Trigger',
      'Lead Capture & Google Sheets / CRM Webhook Sync',
      'Multi-Agent Team Routing & Human Escalation Rules',
      'Full Testing & Interactive Flow Walkthrough Video'
    ],
    whyChoose: [
      '98% Open Rate Channel Optimization',
      'Official Meta WhatsApp API Guidelines Compliant',
      'Interactive Menus & Clickable Action Buttons',
      'Fast 3 to 5-Day Turnaround'
    ],
    workProcess: [
      { step: '01', title: 'Setup & Platform Audit', desc: 'Reviewing your WhatsApp number status and choosing the best automation stack.' },
      { step: '02', title: 'Menu & Flow Architecture', desc: 'Crafting button menus, catalog queries, and auto-reply scripts.' },
      { step: '03', title: 'CRM & Alert Integration', desc: 'Syncing collected customer details with Google Sheets or your CRM.' },
      { step: '04', title: 'Live Testing & Launch', desc: 'Running live message tests across iOS and Android devices.' }
    ],
    tools: ['WhatsApp Cloud API', 'ManyChat WhatsApp', 'Wati / Twilio', 'Make / Zapier', 'Google Sheets'],
    faqs: [
      { q: 'Can this work with my existing WhatsApp number?', a: 'Yes! For WhatsApp Business App, standard auto-responders work right away. For WhatsApp Cloud API bots, you need a phone number that can receive an SMS verification code.' },
      { q: 'Can the bot send product catalogs and pictures?', a: 'Yes, the bot can send rich media including images, PDF brochures, location pins, and clickable payment/booking links.' },
      { q: 'Are there monthly messaging fees?', a: 'Meta provides 1,000 free service conversations per month on WhatsApp Cloud API. We will configure your bot to stay within the most cost-effective tier.' }
    ],
    reviews: [
      { name: 'Kareem Al-Mansoor', country: 'United Arab Emirates', rating: 5, date: '3 days ago', comment: 'Our restaurant gets 100+ WhatsApp inquiries daily. The automated menu bot handles 80% of them without any human intervention!' },
      { name: 'Mateo Rossi', country: 'Italy', rating: 5, date: '1 week ago', comment: 'Super fast delivery and flawless setup. The button menus make our customer support look ultra-professional.' }
    ],
    packages: {
      basic: {
        name: 'Starter WhatsApp Bot',
        price: 40,
        deliveryDays: 3,
        expressFee: 15,
        expressDays: 1,
        desc: 'Welcome message, out-of-office autoreply, and 6 core interactive button/list answers.',
        features: ['Welcome & Away Messages', '6 Interactive Menus / FAQs', 'Basic Contact Collection', 'Mobile Setup Guide', '1 Revision']
      },
      standard: {
        name: 'Pro Business Automation',
        price: 85,
        deliveryDays: 5,
        expressFee: 30,
        expressDays: 2,
        desc: 'Complete interactive workflow: catalog sharing, lead qualification, Google Sheets sync, and multi-agent routing.',
        features: ['Interactive Button & List Menus', 'Catalog & PDF Sharing', 'Google Sheets Lead Database', 'Multi-Agent Support Routing', '2 Revisions']
      },
      premium: {
        name: 'Enterprise Cloud API Funnel',
        price: 160,
        deliveryDays: 7,
        expressFee: 50,
        expressDays: 3,
        desc: 'Full WhatsApp Cloud API architecture: custom webhook triggers, CRM synchronization, broadcast templates, and priority maintenance.',
        features: ['Official WhatsApp Cloud API Setup', 'Custom Webhooks & CRM Sync', 'Pre-approved Broadcast Templates', 'Automated Reminder Workflows', 'Priority Support', 'Unlimited Revisions']
      }
    },
    addons: [
      { id: 'ad-wa-1', name: 'Google Sheets Real-time Order Logger', price: 25 },
      { id: 'ad-wa-2', name: 'Pre-Approved Meta Message Template Setup', price: 30 }
    ]
  },
  {
    id: 'srv-auto-gmail-workflow',
    name: 'Gmail / Email Workflow Automation',
    slug: 'gmail-email-workflow-automation',
    category: 'automation',
    categoryName: 'Automation Services',
    badge: 'PRODUCTIVITY',
    gigTitle: 'I will automate Gmail filters, automated cold outreach, follow-ups, and inbox organization.',
    coverImage: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=1000&q=80',
    rating: '5.0',
    reviewsCount: 38,
    ordersInQueue: 2,
    description: 'Streamline your email inbox with automated Gmail filters, smart label hierarchies, auto-responders, cold email sequences, automated follow-up sequences, and CRM pipeline triggers.',
    aboutNotes: [
      'Drowning in hundreds of unread emails or wasting hours manually following up on client proposals? I design clean, automated Gmail and Google Workspace workflows that organize your inbox effortlessly and put your follow-up sequence on complete autopilot.',
      'From automated lead intake parsing that extracts inquiry details straight into your spreadsheet, to multi-stage cold outreach campaigns with smart conditional follow-ups that stop when a prospect replies, everything is built for maximum productivity.',
      'Never let an important lead slip through the cracks again.'
    ],
    keyDeliverables: [
      'Complete Gmail Filter Rules & Smart Color-Coded Label Architecture',
      'Automated Email Intake Parser (extracting client details to Google Sheets)',
      'Multi-Step Automated Follow-Up Sequences (Day 1, Day 3, Day 7)',
      'Automatic Reply Stop when a prospect responds',
      'Professional Email Signature & Custom Template Canned Responses',
      'Spam Filter Tuning & Domain Deliverability Health Check (SPF, DKIM, DMARC)',
      'Zapier / Make / Google Apps Script Background Automation',
      'Comprehensive Video Tutorial for Your Team'
    ],
    whyChoose: [
      'Inbox Zero Daily Architecture',
      'Zero Missed Follow-ups on Proposals and Invoices',
      '100% Native Google Workspace & Apps Script Integration',
      'High Deliverability (SPF/DKIM/DMARC audited)'
    ],
    workProcess: [
      { step: '01', title: 'Inbox & Workflow Audit', desc: 'Identifying bottlenecks, repetitive emails, and lead tracking requirements.' },
      { step: '02', title: 'Filters & Label Structure', desc: 'Building automated rules to categorize and prioritize incoming correspondence.' },
      { step: '03', title: 'Sequencing & Apps Script', desc: 'Programming automated follow-ups and data extraction into Google Sheets.' },
      { step: '04', title: 'Deliverability & Training', desc: 'Verifying DNS email authentication and providing a step-by-step walkthrough.' }
    ],
    tools: ['Gmail & Google Workspace', 'Google Apps Script', 'Google Sheets', 'Make / Zapier', 'Mailmeteor / Instantly'],
    faqs: [
      { q: 'Will you need my Gmail password?', a: 'No! You never share passwords. We can use Google Workspace Delegate Access, Google Apps Script sharing, or a brief screenshare session.' },
      { q: 'Does this work with custom domain emails (e.g., name@mycompany.com)?', a: 'Yes! Both free personal @gmail.com accounts and paid Google Workspace business accounts are fully supported.' },
      { q: 'Can follow-up emails stop automatically when someone replies?', a: 'Yes! The sequence detects incoming replies and instantly cancels further follow-up drafts for that contact.' }
    ],
    reviews: [
      { name: 'David Hensley', country: 'Canada', rating: 5, date: '4 days ago', comment: 'Ruddranil saved me at least 10 hours a week! My inbox is finally organized and cold leads are getting automated follow-ups on time.' },
      { name: 'Claire Dupont', country: 'France', rating: 5, date: '2 weeks ago', comment: 'The email parsing into Google Sheets works like magic. Very impressed with the technical execution.' }
    ],
    packages: {
      basic: {
        name: 'Inbox Zero & Filters',
        price: 30,
        deliveryDays: 2,
        expressFee: 15,
        expressDays: 1,
        desc: '10 custom Gmail filter rules, 5 color-coded labels, canned templates, and inbox cleanup strategy.',
        features: ['10 Automated Filters', '5 Color-coded Labels', '3 Canned Response Templates', 'Inbox Zero Setup Guide', '1 Revision']
      },
      standard: {
        name: 'Outreach & Follow-Up System',
        price: 65,
        deliveryDays: 4,
        expressFee: 25,
        expressDays: 2,
        desc: 'Automated 3-step follow-up email sequence, lead parsing to Google Sheets, and domain deliverability audit.',
        features: ['3-Step Follow-Up Sequence', 'Auto-Stop on Reply', 'Email to Google Sheets Parser', 'SPF / DKIM Health Audit', '2 Revisions']
      },
      premium: {
        name: 'Full Automation Ecosystem',
        price: 120,
        deliveryDays: 6,
        expressFee: 40,
        expressDays: 3,
        desc: 'End-to-end email engine: custom Google Apps Script automation, multi-campaign outreach setup, CRM sync, and team training.',
        features: ['Custom Google Apps Script Engine', 'Multi-Campaign Outreach Setup', 'Two-Way CRM Integration', 'DNS Deliverability Optimization', 'Video Tutorial & Handover', 'Unlimited Revisions']
      }
    },
    addons: [
      { id: 'ad-gm-1', name: 'SPF, DKIM & DMARC DNS Deliverability Setup', price: 25 },
      { id: 'ad-gm-2', name: 'Custom Google Apps Script Function Extension', price: 35 }
    ]
  }
];

// Merge existing services without duplicating
const existingIds = new Set(currentServices.map(s => s.id));
const updatedServices = [...currentServices];

for (const autoSrv of AUTOMATION_SERVICES) {
  if (!existingIds.has(autoSrv.id)) {
    updatedServices.push(autoSrv);
  } else {
    const idx = updatedServices.findIndex(s => s.id === autoSrv.id);
    updatedServices[idx] = autoSrv;
  }
}

// 1. Write data/services.json
fs.writeFileSync(servicesPath, JSON.stringify(updatedServices, null, 2), 'utf-8');
console.log(`Updated data/services.json: now contains ${updatedServices.length} services.`);

// 2. Write services-data.js
const servicesDataJsPath = path.resolve(__dirname, '../services-data.js');
const servicesDataJsContent = `window.DEFAULT_SERVICES = ${JSON.stringify(updatedServices, null, 2)};\n`;
fs.writeFileSync(servicesDataJsPath, servicesDataJsContent, 'utf-8');
console.log(`Updated services-data.js: now contains ${updatedServices.length} services.`);

// 3. Update script.js
const scriptPath = path.resolve(__dirname, '../script.js');
let scriptContent = fs.readFileSync(scriptPath, 'utf-8');

const startMarker = 'var DEFAULT_SERVICES = (typeof window !== \'undefined\' && window.DEFAULT_SERVICES && window.DEFAULT_SERVICES.length >= ';
const endMarker = 'window.DEFAULT_SERVICES = DEFAULT_SERVICES;';

const sIdx = scriptContent.indexOf(startMarker);
if (sIdx !== -1) {
  const eIdx = scriptContent.indexOf(endMarker, sIdx);
  if (eIdx !== -1) {
    const replacement = `var DEFAULT_SERVICES = (typeof window !== 'undefined' && window.DEFAULT_SERVICES && window.DEFAULT_SERVICES.length >= 24) \n  ? window.DEFAULT_SERVICES \n  : ${JSON.stringify(updatedServices, null, 2)};\nwindow.DEFAULT_SERVICES = DEFAULT_SERVICES;`;
    scriptContent = scriptContent.slice(0, sIdx) + replacement + scriptContent.slice(eIdx + endMarker.length);
    fs.writeFileSync(scriptPath, scriptContent, 'utf-8');
    console.log(`Updated script.js with all ${updatedServices.length} default services.`);
  }
}
