/**
 * Ruddranil.io - Core JavaScript (script.js)
 * Clean Responsive Navigation, Fiverr-Style Order Flow, State Management,
 * Package Pricing, Add-ons, Coupons, Work Tracking & Portfolio Interactivity
 */

// Default Authoritative Services & Multi-Tier Packages
var DEFAULT_SERVICES = (typeof window !== 'undefined' && window.DEFAULT_SERVICES && window.DEFAULT_SERVICES.length >= 24) 
  ? window.DEFAULT_SERVICES 
  : [
  {
    "id": "srv-dm-fb-ads",
    "name": "Facebook & Instagram Ads Campaign",
    "slug": "facebook-instagram-ads",
    "category": "digital-marketing",
    "categoryName": "Digital Marketing",
    "badge": "TOP RATED",
    "gigTitle": "I will setup and manage high-converting Facebook and Instagram ad campaigns.",
    "coverImage": "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1000&q=80",
    "rating": "5.0",
    "reviewsCount": 68,
    "ordersInQueue": 5,
    "description": "Data-driven Meta advertising engineered for high ROAS, laser audience targeting, custom conversion tracking, and scalable lead generation.",
    "aboutNotes": [
      "Are you struggling to generate qualified leads, profitable sales, or reliable customer acquisition through Meta? I architect and manage full-funnel Facebook and Instagram advertising campaigns tailored to your specific niche.",
      "From competitor ad research and custom Meta Pixel CAPI tracking to scroll-stopping video/image ad creatives, every component is engineered to maximize conversion rate while lowering your cost per acquisition (CPA).",
      "Whether you are an e-commerce brand, SaaS company, or service provider, I deliver transparent daily tracking and ongoing bid optimization to scale your revenue."
    ],
    "keyDeliverables": [
      "Comprehensive Target Audience & Demographic Persona Research",
      "Meta Business Suite, Ad Account & Pixel Setup with Conversion API",
      "High-CTR Ad Copywriting with compelling Call-To-Actions (CTAs)",
      "Custom Graphic & Video Ad Creatives optimized for mobile feeds",
      "A/B Split Testing for headlines, hooks, and creative variations",
      "Full Re-targeting Funnel Setup for warm visitors and abandoned carts",
      "Lookalike Audience (LAL) creation from highest value customers",
      "Weekly ROAS (Return On Ad Spend) and Bid Optimization Reports"
    ],
    "whyChoose": [
      "5+ Years of Certified Meta Performance Marketing Experience",
      "Data-driven approach with transparent, real-time ROI tracking",
      "Fast, clear communication with 100% on-time delivery record",
      "Dedicated post-launch support and weekly optimization reviews"
    ],
    "workProcess": [
      {
        "step": "01",
        "title": "Niche & Competitor Audit",
        "desc": "Analyzing your industry, customer profile, and top competitor ad angles."
      },
      {
        "step": "02",
        "title": "Tracking & Pixel Setup",
        "desc": "Configuring Meta Pixel, Conversion API (CAPI), and custom event triggers."
      },
      {
        "step": "03",
        "title": "Creative & Ad Copywriting",
        "desc": "Designing high-converting ad graphics and compelling sales copy."
      },
      {
        "step": "04",
        "title": "Launch & Scaling",
        "desc": "A/B testing ad sets, killing underperformers, and scaling winners for maximum ROI."
      }
    ],
    "tools": [
      "Meta Ads Manager",
      "Meta Business Suite",
      "Meta Pixel & CAPI",
      "Canva Pro",
      "Google Analytics 4",
      "Figma"
    ],
    "faqs": [
      {
        "q": "Is ad spend included in the package price?",
        "a": "No, the package covers my professional management, campaign strategy, creative design, and optimization. Ad spend is billed directly by Meta."
      },
      {
        "q": "What do you need to get started?",
        "a": "Access to your Facebook Page, Meta Business Manager/Ad Account, website link, and any brand assets you have."
      },
      {
        "q": "How fast do we see results?",
        "a": "Traffic and initial click data start within 24 hours. Conversion optimization matures within 48 to 72 hours as the algorithm gathers event data."
      }
    ],
    "reviews": [
      {
        "name": "Michael Vance",
        "country": "United States",
        "rating": 5,
        "date": "3 days ago",
        "comment": "Ruddranil completely transformed our Facebook ad performance. CPA dropped by 38% in the first week!"
      },
      {
        "name": "Elena Rostova",
        "country": "United Kingdom",
        "rating": 5,
        "date": "1 week ago",
        "comment": "Exceptional creatives and audience setup. Got our first 20 sales within 48 hours of campaign launch."
      }
    ],
    "packages": {
      "basic": {
        "name": "Starter Setup",
        "price": 30,
        "deliveryDays": 4,
        "expressFee": 15,
        "expressDays": 2,
        "desc": "Page audit, audience research, 1 targeted campaign setup, and 3 high-converting ad creatives.",
        "features": [
          "1 Campaign Setup",
          "Target Audience Research",
          "3 Custom Ad Creatives",
          "Meta Pixel Verification",
          "1 Week Support"
        ]
      },
      "standard": {
        "name": "Growth Funnel",
        "price": 65,
        "deliveryDays": 7,
        "expressFee": 25,
        "expressDays": 3,
        "desc": "Full-funnel setup (prospecting + retargeting), CAPI tracking, 7 ad creatives, and A/B split testing.",
        "features": [
          "Full Funnel Setup",
          "Retargeting Campaign",
          "Meta CAPI Tracking",
          "7 Custom Creatives",
          "A/B Split Testing",
          "Weekly Optimization"
        ]
      },
      "premium": {
        "name": "Scaling Domination",
        "price": 130,
        "deliveryDays": 14,
        "expressFee": 45,
        "expressDays": 7,
        "desc": "Complete 30-day campaign management, 15 custom ad creatives, lookalike audiences, and weekly live calls.",
        "features": [
          "Full Funnel + Lookalikes",
          "15 Graphic & Video Creatives",
          "Daily Bid Optimization",
          "Custom Conversion Dashboard",
          "30-Day Dedicated Support"
        ]
      }
    },
    "addons": [
      {
        "id": "ad-fb-1",
        "name": "Extra Fast 24h Kickoff",
        "price": 20
      },
      {
        "id": "ad-fb-2",
        "name": "Custom 30s Video Ad Creative",
        "price": 35
      }
    ]
  },
  {
    "id": "srv-dm-seo",
    "name": "Search Engine Optimization (SEO)",
    "slug": "search-engine-optimization-seo",
    "category": "digital-marketing",
    "categoryName": "Digital Marketing",
    "badge": "HIGH DEMAND",
    "gigTitle": "I will provide on-page, off-page, and technical SEO to rank your website.",
    "coverImage": "https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?auto=format&fit=crop&w=1000&q=80",
    "rating": "5.0",
    "reviewsCount": 54,
    "ordersInQueue": 4,
    "description": "Complete white-hat SEO strategy: technical site health audit, high-volume keyword optimization, schema markup, and authoritative backlink building.",
    "aboutNotes": [
      "Want steady, organic Google search traffic that converts into paying customers without paying for ads? I deliver complete end-to-end Search Engine Optimization (SEO) engineered for top rankings.",
      "We fix underlying technical crawl errors, optimize page load speed, inject high-intent transactional keywords into metadata and headers, and establish authoritative backlinks.",
      "All techniques adhere strictly to Google Helpful Content Guidelines and Search Essentials for safe, long-term organic authority."
    ],
    "keyDeliverables": [
      "Deep Technical SEO & Core Web Vitals Audit",
      "High-Intent Buyer Keyword Research & Mapping",
      "On-Page Title Tags, Meta Descriptions & Header (H1-H3) Optimization",
      "Image Alt Tags & Internal Linking Structure Optimization",
      "Schema.org Rich Snippet Structured Data Markup (JSON-LD)",
      "XML Sitemap & Robots.txt Configuration in Google Search Console",
      "High-Authority Niche Contextual Backlinks Strategy",
      "Rank Tracking & Traffic Growth Monthly Report"
    ],
    "whyChoose": [
      "100% White-Hat Google Algorithm Safe Strategy",
      "Proven Track Record with First-Page Rankings",
      "Detailed Pre/Post Optimization Benchmark Reports",
      "Transparent Action Plan with Zero Fluff"
    ],
    "workProcess": [
      {
        "step": "01",
        "title": "Technical Audit",
        "desc": "Crawling site for 404s, redirect chains, mobile errors, and speed bottlenecks."
      },
      {
        "step": "02",
        "title": "Keyword Mapping",
        "desc": "Identifying low-competition, high-volume search queries for your primary pages."
      },
      {
        "step": "03",
        "title": "On-Page Optimization",
        "desc": "Writing click-worthy meta tags, content headings, and implementing schema markup."
      },
      {
        "step": "04",
        "title": "Authority & Indexing",
        "desc": "Submitting sitemaps to Search Console and building contextual backlinks."
      }
    ],
    "tools": [
      "Google Search Console",
      "Ahrefs",
      "SEMrush",
      "Screaming Frog",
      "Google Analytics 4",
      "Yoast/RankMath"
    ],
    "faqs": [
      {
        "q": "How long does SEO take to show rankings?",
        "a": "Technical indexing updates within days. Competitive ranking shifts typically compound over 30 to 60 days."
      },
      {
        "q": "Do you provide reports?",
        "a": "Yes, full before-and-after audit reports, keyword ranking positions, and traffic charts are provided."
      }
    ],
    "reviews": [
      {
        "name": "Sarah Jenkins",
        "country": "United States",
        "rating": 5,
        "date": "5 days ago",
        "comment": "Our organic search impressions tripled within 3 weeks of Ruddranil fixing our technical SEO errors!"
      }
    ],
    "packages": {
      "basic": {
        "name": "Technical SEO Audit & Fix",
        "price": 40,
        "deliveryDays": 4,
        "expressFee": 20,
        "expressDays": 2,
        "desc": "Audit of up to 5 pages, meta tags, schema markup, and Google Search Console sitemap indexing.",
        "features": [
          "5 Pages Optimized",
          "Technical Audit",
          "Meta Titles & Descriptions",
          "XML Sitemap & Robots.txt",
          "Search Console Setup"
        ]
      },
      "standard": {
        "name": "Full On-Page & Speed SEO",
        "price": 80,
        "deliveryDays": 8,
        "expressFee": 30,
        "expressDays": 4,
        "desc": "Deep on-page optimization for 12 pages, Core Web Vitals speed tuning, and competitor keyword gap analysis.",
        "features": [
          "12 Pages Optimized",
          "Keyword Research (30 Keywords)",
          "Core Web Vitals Speed Fix",
          "Schema Markup Integration",
          "Competitor Gap Report"
        ]
      },
      "premium": {
        "name": "Complete Authority Dominance",
        "price": 150,
        "deliveryDays": 14,
        "expressFee": 50,
        "expressDays": 7,
        "desc": "Comprehensive 25-page SEO, high-authority backlink strategy, full content optimization, and monthly rank tracking.",
        "features": [
          "25 Pages Optimized",
          "Full Backlink Strategy",
          "Content Optimization",
          "Internal Link Architecture",
          "Dedicated Rank Tracking"
        ]
      }
    },
    "addons": [
      {
        "id": "ad-seo-1",
        "name": "Competitor Keyword Gap Analysis",
        "price": 20
      },
      {
        "id": "ad-seo-2",
        "name": "Schema Markup for 5 Extra Pages",
        "price": 25
      }
    ]
  },
  {
    "id": "srv-dm-smm",
    "name": "Social Media Management",
    "slug": "social-media-management",
    "category": "digital-marketing",
    "categoryName": "Digital Marketing",
    "badge": "POPULAR",
    "gigTitle": "I will manage your business profiles, schedule posts, and grow organic audience.",
    "coverImage": "https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&w=1000&q=80",
    "rating": "5.0",
    "reviewsCount": 42,
    "ordersInQueue": 3,
    "description": "End-to-end social media growth: branded content creation, strategic hashtag research, scheduled posting, and active community engagement.",
    "aboutNotes": [
      "Consistency is the secret to building trust, authority, and loyal buyers on social platforms. I will take complete charge of your brand presence across Facebook, Instagram, LinkedIn, and Twitter/X.",
      "I design visually stunning, brand-aligned post graphics, craft engaging captions with strong calls to action, research trending niche hashtags, and schedule everything seamlessly.",
      "Free up your valuable time while your brand maintains an active, professional, and growing social footprint."
    ],
    "keyDeliverables": [
      "Custom Branded Feed Post & Story Designs",
      "Engaging, Conversion-Focused Copywriting",
      "Niche-Targeted Hashtag Sets for Maximum Organic Reach",
      "Automated Scheduling at Peak Engagement Hours",
      "Bio & Profile Optimization (Call-To-Actions, Highlights)",
      "Community Engagement & Follower Interaction Guidance",
      "Monthly Growth & Engagement Analytics Report"
    ],
    "whyChoose": [
      "Custom Brand-Aligned Visual Aesthetics",
      "100% Original Graphics & Tailored Captions",
      "Reliable Content Calendar Delivered Ahead of Time",
      "Active Follower Growth Focus"
    ],
    "workProcess": [
      {
        "step": "01",
        "title": "Brand Aesthetic Discovery",
        "desc": "Reviewing your colors, logo, typography, and target customer demographic."
      },
      {
        "step": "02",
        "title": "Content Calendar Creation",
        "desc": "Developing weekly themes, educational carousels, and promotional posts."
      },
      {
        "step": "03",
        "title": "Design & Approval",
        "desc": "Crafting high-resolution graphics and sharing drafts for your approval."
      },
      {
        "step": "04",
        "title": "Scheduling & Publishing",
        "desc": "Queuing content via Meta Business Suite / Buffer at optimal engagement hours."
      }
    ],
    "tools": [
      "Canva Pro",
      "Photoshop",
      "Meta Business Suite",
      "Buffer",
      "Later",
      "Notion"
    ],
    "faqs": [
      {
        "q": "Which platforms do you manage?",
        "a": "Facebook, Instagram, LinkedIn, and Twitter/X."
      },
      {
        "q": "Do I get to approve the posts before they go live?",
        "a": "Yes! All graphics and captions are submitted for your review and approval prior to scheduling."
      }
    ],
    "reviews": [
      {
        "name": "David Lee",
        "country": "Canada",
        "rating": 5,
        "date": "1 week ago",
        "comment": "Our Instagram looks so professional now! Consistent posting brought us 350+ organic followers in 2 weeks."
      }
    ],
    "packages": {
      "basic": {
        "name": "Weekly Starter",
        "price": 35,
        "deliveryDays": 5,
        "expressFee": 15,
        "expressDays": 2,
        "desc": "7 custom designed feed posts + captions + hashtag research for 1 platform.",
        "features": [
          "7 Branded Posts",
          "Engaging Captions",
          "Hashtags Research",
          "Scheduling Included",
          "1 Platform"
        ]
      },
      "standard": {
        "name": "Monthly Growth Pack",
        "price": 75,
        "deliveryDays": 10,
        "expressFee": 30,
        "expressDays": 5,
        "desc": "15 feed posts + 5 stories + bio revamp across 2 platforms with hashtag sets.",
        "features": [
          "15 Feed Posts",
          "5 Story Creatives",
          "Profile/Bio Optimization",
          "2 Platforms",
          "Scheduling & Content Calendar"
        ]
      },
      "premium": {
        "name": "Full Brand Authority",
        "price": 140,
        "deliveryDays": 20,
        "expressFee": 50,
        "expressDays": 10,
        "desc": "30 feed posts + 15 stories + 4 reels covers across 3 platforms with monthly growth report.",
        "features": [
          "30 Branded Posts",
          "15 Story Creatives",
          "4 Reels Covers",
          "3 Platforms",
          "Full Month Scheduling",
          "Monthly Analytics Report"
        ]
      }
    },
    "addons": [
      {
        "id": "ad-smm-1",
        "name": "5 Animated Story Graphics",
        "price": 20
      },
      {
        "id": "ad-smm-2",
        "name": "Highlight Icons & Cover Kit",
        "price": 15
      }
    ]
  },
  {
    "id": "srv-dm-google-ads",
    "name": "Google Ads / PPC Expert",
    "slug": "google-ads-ppc-expert",
    "category": "digital-marketing",
    "categoryName": "Digital Marketing",
    "badge": "VERIFIED",
    "gigTitle": "I will set up profitable Google search and display ads to generate leads.",
    "coverImage": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
    "rating": "5.0",
    "reviewsCount": 39,
    "ordersInQueue": 3,
    "description": "Certified Google Ads specialist delivering high-intent Search, Display, and Performance Max campaigns with negative keyword filtering for maximum ROI.",
    "aboutNotes": [
      "Stop burning budget on irrelevant clicks! I create high-converting Google Ads Search and Display campaigns targeted exclusively to users actively searching for your exact products and services.",
      "I perform rigorous negative keyword filtering, set up conversion tracking in Google Tag Manager, write responsive search ads (RSAs) with 90%+ ad strength, and configure callouts, sitelinks, and snippet extensions.",
      "Every cent of your advertising budget is directed toward high-commercial-intent keywords that drive sales and phone calls."
    ],
    "keyDeliverables": [
      "High-Intent Buyer Keyword & Negative Keyword Research",
      "Google Ads Campaign Architecture (Single-Theme Ad Groups)",
      "Responsive Search Ads (RSAs) with Excellent Ad Strength",
      "Conversion Tracking via Google Tag Manager & GA4",
      "All Ad Assets & Extensions (Sitelinks, Callouts, Call Assets)",
      "Smart Bidding Strategy (Target CPA / Target ROAS setup)",
      "Location, Device & Schedule Bid Adjustments",
      "Negative Keyword Blocklist of 500+ generic terms"
    ],
    "whyChoose": [
      "Google Ads Certified Performance Specialist",
      "Negative Keyword Discipline (Zero Wasted Ad Spend)",
      "Precise Conversion Tracking Guaranteed",
      "Detailed Performance Video Walkthrough"
    ],
    "workProcess": [
      {
        "step": "01",
        "title": "Search Intent Analysis",
        "desc": "Extracting buyer search terms and compiling negative keywords."
      },
      {
        "step": "02",
        "title": "Ad Group Architecture",
        "desc": "Structuring tightly themed ad groups with high Quality Scores."
      },
      {
        "step": "03",
        "title": "Ad Copywriting & Extensions",
        "desc": "Writing compelling headlines and attaching all sitelinks and snippet assets."
      },
      {
        "step": "04",
        "title": "Conversion Tracking & Launch",
        "desc": "Verifying purchase/lead triggers and initiating smart bidding."
      }
    ],
    "tools": [
      "Google Ads",
      "Google Tag Manager",
      "Google Analytics 4",
      "Google Keyword Planner",
      "SpyFu"
    ],
    "faqs": [
      {
        "q": "Is ad budget included?",
        "a": "No, ad spend is paid directly to Google through your billing profile."
      },
      {
        "q": "Will you set up conversion tracking?",
        "a": "Yes, full conversion setup via Google Tag Manager is included in standard and premium packages."
      }
    ],
    "reviews": [
      {
        "name": "Brian Miller",
        "country": "Australia",
        "rating": 5,
        "date": "4 days ago",
        "comment": "Ruddranil eliminated our wasted clicks and doubled our inbound phone leads within 5 days. Fantastic PPC manager!"
      }
    ],
    "packages": {
      "basic": {
        "name": "Starter PPC Campaign",
        "price": 45,
        "deliveryDays": 4,
        "expressFee": 20,
        "expressDays": 2,
        "desc": "1 Search campaign, 2 ad groups, 20 keywords, negative keyword list, and 4 ad extensions.",
        "features": [
          "1 Search Campaign",
          "2 Ad Groups",
          "20 Intent Keywords",
          "Negative Keyword List",
          "Sitelink Extensions"
        ]
      },
      "standard": {
        "name": "Advanced Conversion PPC",
        "price": 85,
        "deliveryDays": 7,
        "expressFee": 35,
        "expressDays": 3,
        "desc": "2 Search campaigns + GTM conversion tracking + 50 keywords + 5 ad groups + competitor bid audit.",
        "features": [
          "2 Search Campaigns",
          "5 Ad Groups",
          "GTM Conversion Tracking",
          "50 Keywords",
          "All Extensions Included",
          "Quality Score Optimization"
        ]
      },
      "premium": {
        "name": "Full Performance Max Suite",
        "price": 160,
        "deliveryDays": 14,
        "expressFee": 60,
        "expressDays": 6,
        "desc": "Search + Display + Performance Max campaigns, complete conversion funnel, and 30 days bid management.",
        "features": [
          "Search + PMax Campaigns",
          "Display Remarketing",
          "Full GTM & GA4 Tracking",
          "Unlimited Keywords",
          "30 Days Bid Optimization"
        ]
      }
    },
    "addons": [
      {
        "id": "ad-ppc-1",
        "name": "Google Tag Manager Event Setup",
        "price": 25
      },
      {
        "id": "ad-ppc-2",
        "name": "Competitor Keyword Conquesting Report",
        "price": 20
      }
    ]
  },
  {
    "id": "srv-dm-email-mkt",
    "name": "Email Marketing Automation",
    "slug": "email-marketing-automation",
    "category": "digital-marketing",
    "categoryName": "Digital Marketing",
    "badge": "HIGH ROI",
    "gigTitle": "I will design newsletter templates and set up automated email marketing workflows.",
    "coverImage": "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=1000&q=80",
    "rating": "5.0",
    "reviewsCount": 36,
    "ordersInQueue": 2,
    "description": "High-converting email flows: Welcome Series, Abandoned Cart, Post-Purchase, and responsive HTML newsletter templates designed in Klaviyo and Mailchimp.",
    "aboutNotes": [
      "Email marketing consistently delivers the highest ROI of any digital channel ($36 for every $1 spent). I create automated email sequences and gorgeous responsive newsletter templates that generate passive revenue.",
      "Specializing in Klaviyo and Mailchimp, I design branded, mobile-responsive layouts, craft persuasive copy that bypasses spam filters, and establish behavioral triggers that nurture leads on autopilot.",
      "From welcome discounts to abandoned checkout recovery, your automated sequences will convert visitors into repeat customers."
    ],
    "keyDeliverables": [
      "Custom Responsive HTML / Drag-and-Drop Email Template Designs",
      "Welcome Series Automation Workflow (3-part sequence)",
      "Abandoned Cart Recovery Sequence with dynamic discount codes",
      "Customer Winback & Post-Purchase Thank You Flows",
      "List Segmentation & Clean Tagging Architecture",
      "Spam Score Verification & DKIM/SPF Authentication Assistance",
      "Compelling Subject Lines & Preview Text for 40%+ Open Rates"
    ],
    "whyChoose": [
      "Klaviyo & Mailchimp Certified Specialist",
      "Mobile-First Responsive Layouts",
      "High Inbox Deliverability Expertise",
      "Clean Code & Seamless E-commerce Integration"
    ],
    "workProcess": [
      {
        "step": "01",
        "title": "Audience & Strategy Review",
        "desc": "Understanding your customer lifecycle and email platform."
      },
      {
        "step": "02",
        "title": "Template Design",
        "desc": "Designing responsive branded templates with modern typographic hierarchy."
      },
      {
        "step": "03",
        "title": "Flow Configuration",
        "desc": "Setting up behavioral triggers, delay timers, and dynamic cart links."
      },
      {
        "step": "04",
        "title": "Test & Launch",
        "desc": "Running deliverability tests across Gmail, Apple Mail, and Outlook before go-live."
      }
    ],
    "tools": [
      "Klaviyo",
      "Mailchimp",
      "Brevo",
      "Figma",
      "ActiveCampaign",
      "HTML/CSS"
    ],
    "faqs": [
      {
        "q": "Which email platforms do you support?",
        "a": "Klaviyo, Mailchimp, Brevo (Sendinblue), ActiveCampaign, and Omnisend."
      },
      {
        "q": "Do you write the email copy as well?",
        "a": "Yes! Compelling subject lines, preview text, and body copy are included in all packages."
      }
    ],
    "reviews": [
      {
        "name": "Jessica Taylor",
        "country": "United States",
        "rating": 5,
        "date": "1 week ago",
        "comment": "Our abandoned cart recovery rate rose from 4% to 19% after Ruddranil built our Klaviyo flows!"
      }
    ],
    "packages": {
      "basic": {
        "name": "Single Newsletter Template",
        "price": 30,
        "deliveryDays": 3,
        "expressFee": 15,
        "expressDays": 1,
        "desc": "1 custom branded responsive newsletter template + compelling copy + mobile test.",
        "features": [
          "1 Responsive Template",
          "Branded Visual Design",
          "Compelling Copywriting",
          "Tested Across Email Clients"
        ]
      },
      "standard": {
        "name": "Core Flow Automation",
        "price": 70,
        "deliveryDays": 6,
        "expressFee": 25,
        "expressDays": 2,
        "desc": "Welcome Series (3 emails) + Abandoned Cart (2 emails) + custom templates + trigger setup.",
        "features": [
          "Welcome Series (3 Emails)",
          "Abandoned Cart (2 Emails)",
          "Custom Branded Templates",
          "Behavioral Triggers Setup",
          "List Segmentation"
        ]
      },
      "premium": {
        "name": "Full E-commerce Revenue Machine",
        "price": 130,
        "deliveryDays": 10,
        "expressFee": 40,
        "expressDays": 4,
        "desc": "Complete 5-flow automation suite (Welcome, Cart, Winback, Post-Purchase, Browse Abandonment) + 12 custom emails.",
        "features": [
          "5 Full Automated Flows",
          "12 Designed Emails",
          "Full Lifecycle Segmentation",
          "A/B Subject Line Testing",
          "Deliverability Setup Guide"
        ]
      }
    },
    "addons": [
      {
        "id": "ad-em-1",
        "name": "Extra Automated Flow (2 emails)",
        "price": 25
      },
      {
        "id": "ad-em-2",
        "name": "Custom Countdown Timer Integration",
        "price": 15
      }
    ]
  },
  {
    "id": "srv-yt-seo",
    "name": "YouTube Video SEO & Optimization",
    "slug": "youtube-video-seo-optimization",
    "category": "youtube",
    "categoryName": "YouTube Services",
    "badge": "BESTSELLER",
    "gigTitle": "I will do complete video SEO, keyword tags, VidIQ ranking, and title optimization.",
    "coverImage": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
    "rating": "5.0",
    "reviewsCount": 76,
    "ordersInQueue": 6,
    "description": "Get your YouTube videos ranked in search and recommended by the algorithm with VidIQ 95+ score, high-volume search tags, click-driven titles, and rich descriptions.",
    "aboutNotes": [
      "Struggling with low views and zero search traffic on your YouTube channel? I deliver complete white-hat YouTube Video SEO designed to rank your videos at the top of YouTube and Google search results.",
      "Using VidIQ Pro and TubeBuddy, I conduct deep keyword extraction to find high-search, low-competition tags, write CTR-optimized titles, and craft keyword-rich descriptions with chapters and hashtags.",
      "Every optimization signals the YouTube algorithm to push your video into Recommended and Suggested video feeds."
    ],
    "keyDeliverables": [
      "High Search Volume, Low Competition Keyword Tag Research",
      "High-CTR Click-Driven Video Titles (Curiosity + Keyword Formula)",
      "SEO-Optimized Description Architecture (with naturally woven keywords)",
      "Timestamp Chapters, Hashtags (#), and Social Links Structure",
      "VidIQ & TubeBuddy SEO Score Guaranteed 90+",
      "End Screen & Info Cards Strategy for Higher Viewer Retention",
      "Niche Playlist SEO Structure to Increase Channel Binge-Watching"
    ],
    "whyChoose": [
      "Certified YouTube SEO & Growth Specialist",
      "Over 500+ Videos Ranked on YouTube Search",
      "Strictly 100% White-Hat Algorithm Compliance",
      "No Channel Passwords Needed (Easy Manager Invite or Document Delivery)"
    ],
    "workProcess": [
      {
        "step": "01",
        "title": "Competitor Keyword Spy",
        "desc": "Analyzing top ranking competitor videos to extract high-traffic keyword tags."
      },
      {
        "step": "02",
        "title": "Title & Hook Crafting",
        "desc": "Writing 3 clickable title options designed to maximize CTR."
      },
      {
        "step": "03",
        "title": "Description & Tag Assembly",
        "desc": "Building comprehensive description text with timestamps, hashtags, and tags."
      },
      {
        "step": "04",
        "title": "Application & Proof",
        "desc": "Applying metadata to YouTube Studio and sharing VidIQ score before/after screenshots."
      }
    ],
    "tools": [
      "VidIQ Pro",
      "TubeBuddy Legend",
      "Google Trends",
      "YouTube Studio",
      "Ahrefs YouTube Explorer"
    ],
    "faqs": [
      {
        "q": "Do you need my Google account password?",
        "a": "No! You can easily invite me as a \"Viewer\" or \"Manager\" via YouTube Studio permissions, or I can provide all text in an organized file."
      },
      {
        "q": "How fast do rankings improve?",
        "a": "Search rankings update within 24 to 48 hours. Evergreen search traffic builds consistently over weeks."
      }
    ],
    "reviews": [
      {
        "name": "Robert Fox",
        "country": "Australia",
        "rating": 5,
        "date": "2 days ago",
        "comment": "VidIQ score jumped from 44 to 98! Ranked #2 for my main keyword within 24 hours. Phenomenal job."
      }
    ],
    "packages": {
      "basic": {
        "name": "Starter 2 Videos SEO",
        "price": 25,
        "deliveryDays": 3,
        "expressFee": 10,
        "expressDays": 1,
        "desc": "Complete SEO optimization for 2 videos: click titles, high-volume tags, description, and hashtags.",
        "features": [
          "2 Videos Optimized",
          "High-Volume Tags",
          "Click-Driven Titles",
          "SEO Description",
          "VidIQ 90+ Score"
        ]
      },
      "standard": {
        "name": "Growth 5 Videos SEO",
        "price": 50,
        "deliveryDays": 5,
        "expressFee": 20,
        "expressDays": 2,
        "desc": "Deep SEO optimization for 5 videos, competitor keyword spy, playlist SEO, and end screens setup.",
        "features": [
          "5 Videos Optimized",
          "Competitor Keyword Spying",
          "Playlist Optimization",
          "Timestamps & Chapters",
          "VidIQ 95+ Score"
        ]
      },
      "premium": {
        "name": "Channel Surge 12 Videos",
        "price": 110,
        "deliveryDays": 9,
        "expressFee": 35,
        "expressDays": 4,
        "desc": "Full channel SEO overhaul for 12 videos + complete default channel tags and keyword architecture.",
        "features": [
          "12 Videos Optimized",
          "Channel Keyword Architecture",
          "Full Playlist SEO",
          "Channel Default Tags",
          "Detailed Growth Audit"
        ]
      }
    },
    "addons": [
      {
        "id": "ad-yt-1",
        "name": "Competitor Video Tag Gap Audit",
        "price": 15
      },
      {
        "id": "ad-yt-2",
        "name": "Channel Default Tags Overhaul",
        "price": 20
      }
    ]
  },
  {
    "id": "srv-yt-growth",
    "name": "YouTube Channel Growth & Management",
    "slug": "youtube-channel-growth-management",
    "category": "youtube",
    "categoryName": "YouTube Services",
    "badge": "EXCLUSIVE",
    "gigTitle": "I will manage your YouTube channel, upload videos, and optimize for organic audience reach.",
    "coverImage": "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1000&q=80",
    "rating": "5.0",
    "reviewsCount": 45,
    "ordersInQueue": 3,
    "description": "Complete hands-off YouTube channel management: video scheduling, title/thumbnail optimization, community tab engagement, and audience retention analysis.",
    "aboutNotes": [
      "Focus purely on creating content while I handle everything else to grow your YouTube channel. From uploading and formatting metadata to managing end screens, cards, and community posts, I run your channel with professional precision.",
      "I monitor your YouTube Analytics weekly, tracking Average Percentage Viewed (APV), Click-Through Rate (CTR), and traffic sources to continuously refine your channel strategy.",
      "Transform your YouTube channel into an organic traffic and subscriber generation powerhouse."
    ],
    "keyDeliverables": [
      "Full Video Upload & Metadata Scheduling in YouTube Studio",
      "Thumbnail Upload & High-CTR Title Placement",
      "End Screens, Info Cards & Pinned Comments Setup",
      "Community Tab Posts Creation to keep subscribers active",
      "Playlist Management & Channel Homepage Layout Optimization",
      "Weekly Analytics Audit (CTR, Watch-Time, Traffic Sources)",
      "Competitor Video Topic & Content Gap Recommendations"
    ],
    "whyChoose": [
      "Certified YouTube Channel Growth Manager",
      "Hands-off execution: save 15+ hours weekly",
      "Strict adherence to YouTube Community Guidelines",
      "Weekly strategic insights and topic ideas"
    ],
    "workProcess": [
      {
        "step": "01",
        "title": "Channel Assessment",
        "desc": "Auditing past video analytics, audience drop-off points, and branding layout."
      },
      {
        "step": "02",
        "title": "Publishing Schedule",
        "desc": "Establishing consistent upload frequency and best publishing time."
      },
      {
        "step": "03",
        "title": "Upload & Packaging",
        "desc": "Uploading video files, attaching metadata, end cards, and scheduling."
      },
      {
        "step": "04",
        "title": "Community & Growth",
        "desc": "Posting community polls, monitoring comments, and tracking CTR performance."
      }
    ],
    "tools": [
      "YouTube Studio",
      "VidIQ Pro",
      "TubeBuddy",
      "Canva Pro",
      "Google Sheets"
    ],
    "faqs": [
      {
        "q": "How do you access my channel?",
        "a": "You grant \"Manager\" or \"Editor\" permissions via YouTube Studio settings. You never share your password."
      }
    ],
    "reviews": [
      {
        "name": "Marcus Sterling",
        "country": "United Kingdom",
        "rating": 5,
        "date": "1 week ago",
        "comment": "Ruddranil has been managing our company channel for 2 months. Watch time is up 140% and our workflow is completely stress-free!"
      }
    ],
    "packages": {
      "basic": {
        "name": "Weekly Channel Pilot",
        "price": 45,
        "deliveryDays": 7,
        "expressFee": 20,
        "expressDays": 3,
        "desc": "Management of 2 video uploads, complete SEO, cards, end screens, and 2 community posts.",
        "features": [
          "2 Video Uploads & Setup",
          "Full Video SEO",
          "End Screens & Cards",
          "2 Community Tab Posts",
          "Weekly Performance Check"
        ]
      },
      "standard": {
        "name": "Monthly Pro Management",
        "price": 95,
        "deliveryDays": 14,
        "expressFee": 35,
        "expressDays": 7,
        "desc": "Management of 6 video uploads, playlist structure, community management, and weekly analytics review.",
        "features": [
          "6 Video Uploads & Setup",
          "Full SEO on Every Video",
          "End Screens & Cards",
          "Weekly Community Polls",
          "Channel Layout Optimization",
          "Bi-Weekly Analytics Call"
        ]
      },
      "premium": {
        "name": "Full Channel Domination",
        "price": 180,
        "deliveryDays": 30,
        "expressFee": 60,
        "expressDays": 15,
        "desc": "Complete 30-day channel management: up to 12 video uploads, daily moderation, video topic research, and growth roadmap.",
        "features": [
          "Up to 12 Video Uploads",
          "Complete End-to-End SEO",
          "Daily Comment Moderation",
          "10 Viral Topic Recommendations",
          "Weekly Analytics Reports",
          "Dedicated Priority Manager"
        ]
      }
    },
    "addons": [
      {
        "id": "ad-ytm-1",
        "name": "Channel Banner & Watermark Redesign",
        "price": 25
      },
      {
        "id": "ad-ytm-2",
        "name": "5 Viral Video Topic Scripts",
        "price": 30
      }
    ]
  },
  {
    "id": "srv-yt-thumb",
    "name": "YouTube Thumbnail Design",
    "slug": "youtube-thumbnail-design",
    "category": "youtube",
    "categoryName": "YouTube Services",
    "badge": "HIGH CTR",
    "gigTitle": "I will design high-CTR, click-worthy, and eye-catching custom YouTube thumbnails.",
    "coverImage": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80",
    "rating": "5.0",
    "reviewsCount": 88,
    "ordersInQueue": 5,
    "description": "Custom high-contrast, click-worthy YouTube thumbnails engineered with MrBeast-style visual psychology, bold typography, facial emotion pop, and 10%+ CTR.",
    "aboutNotes": [
      "The thumbnail is the single most important factor determining whether someone clicks your video or scrolls past it. I design custom, vibrant, high-CTR YouTube thumbnails that grab viewer attention instantly.",
      "Using visual psychology, expressive facial cutouts, high-contrast color palettes, 3D text pop, and minimalist focal points, my designs are built to stand out on crowded mobile feeds.",
      "Stop losing thousands of views to mediocre graphics. Get professional thumbnails designed for maximum click-through rates."
    ],
    "keyDeliverables": [
      "Full HD 1920x1080 Thumbnail Files in PNG & JPEG",
      "Advanced Subject Cutout & Facial Retouching with Edge Glow",
      "Bold, Readable 3D Typography with High Contrast Outline",
      "Visual Storytelling & Curiosity Trigger Design",
      "Mobile Feed Contrast Optimization (Looks sharp on small screens)",
      "PSD Source File with organized layers (Standard/Premium)",
      "Free Revisions until 100% satisfied"
    ],
    "whyChoose": [
      "Expertise in High-CTR Visual Psychology",
      "Fast Turnaround (Under 24 Hours available)",
      "Ultra Sharp 1080p Export",
      "Unlimited Revisions Guarantee"
    ],
    "workProcess": [
      {
        "step": "01",
        "title": "Video Theme & Hook",
        "desc": "Understanding your video title, core concept, and emotional angle."
      },
      {
        "step": "02",
        "title": "Subject Retouching",
        "desc": "Cutting out faces/objects, enhancing lighting, and adding pop outlines."
      },
      {
        "step": "03",
        "title": "Typography & Layout",
        "desc": "Adding 2-3 bold, high-contrast words for instant readability."
      },
      {
        "step": "04",
        "title": "Mobile Testing & Handover",
        "desc": "Testing visibility at small thumbnail preview sizes and delivering in full HD."
      }
    ],
    "tools": [
      "Adobe Photoshop",
      "Lightroom",
      "Figma",
      "Midjourney",
      "Canva Pro"
    ],
    "faqs": [
      {
        "q": "What do I need to send?",
        "a": "Your video title, preferred text on thumbnail (max 3-4 words), and high-resolution photo/subject image (if applicable)."
      },
      {
        "q": "How fast do you deliver?",
        "a": "Standard delivery is within 24 to 48 hours. Express 12h delivery is available!"
      }
    ],
    "reviews": [
      {
        "name": "Chris Evans",
        "country": "United States",
        "rating": 5,
        "date": "Yesterday",
        "comment": "CTR went from 3.2% to 11.4% with Ruddranil’s thumbnail! The visual quality is top-tier MrBeast level."
      }
    ],
    "packages": {
      "basic": {
        "name": "Single Viral Thumbnail",
        "price": 15,
        "deliveryDays": 2,
        "expressFee": 10,
        "expressDays": 1,
        "desc": "1 custom high-CTR thumbnail in Full HD 1080p + 2 revisions + fast delivery.",
        "features": [
          "1 Custom Thumbnail",
          "1080p Full HD PNG/JPG",
          "Subject Retouching & Glow",
          "High Contrast Colors",
          "2 Revisions"
        ]
      },
      "standard": {
        "name": "Pack of 3 Thumbnails",
        "price": 35,
        "deliveryDays": 3,
        "expressFee": 15,
        "expressDays": 1,
        "desc": "3 custom high-CTR thumbnails + editable PSD source files + unlimited revisions.",
        "features": [
          "3 Custom Thumbnails",
          "1080p Full HD",
          "Editable PSD Files",
          "Unlimited Revisions",
          "A/B Testing Advice"
        ]
      },
      "premium": {
        "name": "Pack of 7 Creator Bundle",
        "price": 75,
        "deliveryDays": 5,
        "expressFee": 25,
        "expressDays": 2,
        "desc": "7 custom thumbnails + all PSD source files + priority VIP turnaround + channel style guide.",
        "features": [
          "7 Custom Thumbnails",
          "All PSD Source Files",
          "Channel Visual Consistency",
          "VIP Priority Delivery",
          "Unlimited Revisions"
        ]
      }
    },
    "addons": [
      {
        "id": "ad-th-1",
        "name": "Ultra-Fast 12h Delivery",
        "price": 10
      },
      {
        "id": "ad-th-2",
        "name": "Alternative A/B Test Variation",
        "price": 10
      }
    ]
  },
  {
    "id": "srv-yt-edit",
    "name": "YouTube Video Editing",
    "slug": "youtube-video-editing",
    "category": "youtube",
    "categoryName": "YouTube Services",
    "badge": "HIGH RETENTION",
    "gigTitle": "I will edit engaging YouTube videos with captions, b-roll, motion graphics, and sound design.",
    "coverImage": "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1000&q=80",
    "rating": "5.0",
    "reviewsCount": 51,
    "ordersInQueue": 4,
    "description": "High-retention YouTube video editing: dynamic pacing, sound design, engaging b-roll, animated kinetic captions, zoom transitions, and color grading.",
    "aboutNotes": [
      "High viewer retention is the #1 metric YouTube rewards with millions of views. I edit dynamic, engaging, and fast-paced YouTube videos designed to keep viewers hooked from the first second to the final screen.",
      "I cut out dead air, add context-relevant B-roll, animate kinetic text captions, incorporate punchy sound effects, execute smooth zoom-ins, and apply professional audio mastering.",
      "Whether you produce talking head videos, vlogs, tutorials, or documentary-style essays, my editing elevates your production quality to top creator standards."
    ],
    "keyDeliverables": [
      "Pacing & Dead Air Elimination for Maximum Watch Time",
      "Dynamic Animated Kinetic Captions & Highlight Popups",
      "High-Quality Relevant B-Roll Footage & Stock Assets",
      "Immersive Sound Design (Whooshes, Pops, Risers, Background Music)",
      "Smooth Camera Zooms, Motion Graphics & Transitions",
      "Audio Enhancement (Noise Reduction, EQ, Compression)",
      "Color Correction & Cinematic Grading",
      "Exported in Crystal Clear 1080p or 4K 60fps"
    ],
    "whyChoose": [
      "Premiere Pro & After Effects Master",
      "Pacing Optimized for High Audience Retention",
      "Copyright-Free Music & Stock Assets Library",
      "Quick Turnaround with Revisions Included"
    ],
    "workProcess": [
      {
        "step": "01",
        "title": "Footage Ingestion & Cut",
        "desc": "Trimming silent gaps, mistakes, and pacing down to the core narrative."
      },
      {
        "step": "02",
        "title": "B-Roll & Motion Graphics",
        "desc": "Layering visual cutaways, screenshot zooms, and kinetic captions."
      },
      {
        "step": "03",
        "title": "Sound Design & Audio Mix",
        "desc": "Mixing background music, balancing dialogue levels, and adding SFX."
      },
      {
        "step": "04",
        "title": "Color Grade & Export",
        "desc": "Color correction, rendering in crisp Full HD, and delivering for review."
      }
    ],
    "tools": [
      "Adobe Premiere Pro",
      "Adobe After Effects",
      "DaVinci Resolve",
      "Audition",
      "Envato Elements"
    ],
    "faqs": [
      {
        "q": "How do I share my raw video footage?",
        "a": "You can upload your files to Google Drive, Dropbox, or WeTransfer and share the link."
      },
      {
        "q": "Do you provide background music?",
        "a": "Yes, 100% royalty-free, copyright-safe music that will never get a copyright claim."
      }
    ],
    "reviews": [
      {
        "name": "Anthony Brooks",
        "country": "United States",
        "rating": 5,
        "date": "3 days ago",
        "comment": "The retention on my video jumped from 32% to 58%! The sound effects and b-roll placements were spot-on."
      }
    ],
    "packages": {
      "basic": {
        "name": "Short Video Edit (Up to 5 Min)",
        "price": 35,
        "deliveryDays": 3,
        "expressFee": 15,
        "expressDays": 1,
        "desc": "Professional editing for raw footage up to 5 minutes: cuts, basic captions, b-roll, and music.",
        "features": [
          "Up to 5 Min Final Length",
          "Cuts & Dead Air Removal",
          "Kinetic Captions",
          "Sound Effects & Music",
          "1080p Export"
        ]
      },
      "standard": {
        "name": "Pro YouTube Edit (Up to 10 Min)",
        "price": 70,
        "deliveryDays": 5,
        "expressFee": 30,
        "expressDays": 2,
        "desc": "Advanced editing for up to 10 minutes: motion graphics, zooms, color grading, premium SFX, and high retention pacing.",
        "features": [
          "Up to 10 Min Final Length",
          "Dynamic Zooms & Transitions",
          "Motion Graphics & Titles",
          "Color Grading",
          "Advanced Audio Mastering",
          "2 Revisions"
        ]
      },
      "premium": {
        "name": "Documentary Master (Up to 20 Min)",
        "price": 130,
        "deliveryDays": 7,
        "expressFee": 50,
        "expressDays": 3,
        "desc": "Full cinematic production up to 20 minutes: custom animations, deep soundscape design, 4K rendering, and unlimited revisions.",
        "features": [
          "Up to 20 Min Final Length",
          "Cinematic Soundscapes & SFX",
          "Custom 2D Motion Graphics",
          "4K 60fps Master Export",
          "Unlimited Revisions"
        ]
      }
    },
    "addons": [
      {
        "id": "ad-ve-1",
        "name": "Extract 3 Viral YouTube Shorts from Video",
        "price": 25
      },
      {
        "id": "ad-ve-2",
        "name": "4K Ultra HD Export",
        "price": 15
      }
    ]
  },
  {
    "id": "srv-yt-ads",
    "name": "YouTube Ads Campaign Setup",
    "slug": "youtube-ads-campaign-setup",
    "category": "youtube",
    "categoryName": "YouTube Services",
    "badge": "GROWTH",
    "gigTitle": "I will set up targeted Google Video Ads to get genuine views and channel subscribers.",
    "coverImage": "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=1000&q=80",
    "rating": "5.0",
    "reviewsCount": 34,
    "ordersInQueue": 2,
    "description": "Grow your channel with genuine, targeted viewers using Google Video Ads: In-Feed video discovery ads, Skippable in-stream ads, and precise niche audience targeting.",
    "aboutNotes": [
      "Want to jumpstart a new video or promote your flagship channel content to thousands of interested viewers? I set up laser-targeted Google Video Ads campaigns that drive genuine subscribers and watch hours.",
      "Unlike shady third-party view bots that risk channel termination, Google Video Ads are 100% compliant and managed directly inside your official Google Ads dashboard.",
      "I target viewers based on relevant YouTube channels, specific keywords, topics, and demographic affinities to guarantee low Cost Per View (CPV) and authentic engagement."
    ],
    "keyDeliverables": [
      "In-Feed Video Discovery & Skippable In-Stream Campaign Setup",
      "Competitor Channel & Relevant Placement Targeting",
      "Target Demographic (Age, Gender, Interests, Locations) Setup",
      "Bid Strategy Optimization for Lowest Cost Per View ($0.01 - $0.03 CPV)",
      "Negative Placements Blocklist to eliminate low-quality kid channels",
      "Audience Retargeting Segment Creation for future campaigns",
      "Full Campaign Performance Summary & ROI Report"
    ],
    "whyChoose": [
      "100% Legit Google Ads Views (Safe for Monetization)",
      "Ultra Low CPV Bid Management",
      "Clean Targeting of Real Human Viewers",
      "Transparent Account Setup"
    ],
    "workProcess": [
      {
        "step": "01",
        "title": "Video & Audience Selection",
        "desc": "Identifying your best-converting video and compiling competitor channel placements."
      },
      {
        "step": "02",
        "title": "Ad Campaign Creation",
        "desc": "Configuring In-Feed discovery ads with click-worthy headline text."
      },
      {
        "step": "03",
        "title": "Placement Filtering",
        "desc": "Excluding bot-heavy and irrelevant children channel placements."
      },
      {
        "step": "04",
        "title": "Launch & Optimization",
        "desc": "Monitoring CPV, subscriber acquisition rate, and optimizing budget."
      }
    ],
    "tools": [
      "Google Ads",
      "YouTube Studio",
      "Google Analytics",
      "Google Keyword Planner"
    ],
    "faqs": [
      {
        "q": "Will these views count toward monetization?",
        "a": "Google Ads views do not count directly towards the 4,000 public watch hours requirement, but they generate permanent subscribers and organic follow-up views that DO count!"
      }
    ],
    "reviews": [
      {
        "name": "Daniel Craig",
        "country": "United States",
        "rating": 5,
        "date": "1 week ago",
        "comment": "Gained over 480 real subscribers from my initial test campaign! Average CPV was under $0.02."
      }
    ],
    "packages": {
      "basic": {
        "name": "Starter In-Feed Ad Setup",
        "price": 40,
        "deliveryDays": 3,
        "expressFee": 15,
        "expressDays": 1,
        "desc": "1 targeted YouTube In-Feed ad campaign, 20 placement channels, demographic setup, and bid optimization.",
        "features": [
          "1 Video Ad Campaign",
          "Targeted Placements",
          "Audience Demographics",
          "CPV Bid Setup",
          "Negative Placement Exclusions"
        ]
      },
      "standard": {
        "name": "Growth Ads Multi-Target",
        "price": 75,
        "deliveryDays": 6,
        "expressFee": 25,
        "expressDays": 2,
        "desc": "2 Video ad campaigns (In-Feed + In-Stream), 50 competitor channel placements, retargeting setup, and 7-day monitoring.",
        "features": [
          "2 Ad Campaigns",
          "In-Feed + In-Stream",
          "50 Placement Channels",
          "Audience Retargeting",
          "7 Days Bid Monitoring"
        ]
      },
      "premium": {
        "name": "Channel Scaling Powerpack",
        "price": 130,
        "deliveryDays": 10,
        "expressFee": 40,
        "expressDays": 4,
        "desc": "Full channel video promotion suite: up to 4 campaigns, keyword + placement targeting, and 14 days active management.",
        "features": [
          "Up to 4 Campaigns",
          "Unlimited Placements",
          "Full Audience Retargeting",
          "14 Days Active Bid Management",
          "Comprehensive Growth Report"
        ]
      }
    },
    "addons": [
      {
        "id": "ad-yts-1",
        "name": "Extra 7 Days Active Bid Management",
        "price": 25
      },
      {
        "id": "ad-yts-2",
        "name": "Video Ad Thumbnail Customization",
        "price": 15
      }
    ]
  },
  {
    "id": "srv-yt-shorts",
    "name": "YouTube Shorts & Automation",
    "slug": "youtube-shorts-automation",
    "category": "youtube",
    "categoryName": "YouTube Services",
    "badge": "VIRAL FORMAT",
    "gigTitle": "I will create viral YouTube Shorts with trending audio, animations, and voiceovers.",
    "coverImage": "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1000&q=80",
    "rating": "5.0",
    "reviewsCount": 62,
    "ordersInQueue": 4,
    "description": "Viral 9:16 vertical shorts, reels, and TikToks designed with Alex Hormozi style animated captions, sound effects, trending hooks, and realistic AI voiceovers.",
    "aboutNotes": [
      "Shorts are the fastest way to get millions of impressions and thousands of subscribers on YouTube today. I create high-retention 9:16 vertical shorts tailored to ignite the algorithm.",
      "Featuring colorful kinetic subtitles (Alex Hormozi style), dynamic background footage, punchy sound effects, emojis, and professional AI voiceovers, each Short is engineered for maximum loop rate.",
      "Perfect for repurposing long-form podcasts, faceless automation channels, business tips, or viral trivia niches."
    ],
    "keyDeliverables": [
      "9:16 Vertical Video Formatted for Shorts, Reels & TikTok",
      "Dynamic Colored Kinetic Subtitles with Emojis & Popups",
      "Engaging 3-Second Hook to Stop Viewer Swiping",
      "Realistic Ultra-Natural AI Voiceover (or sync with your audio)",
      "High-Definition Background Footage & Visual Assets",
      "Sound Effects (Whooshes, Pops, Risers) & Trending Music",
      "Title, Description & Tags Ready to Copy-Paste"
    ],
    "whyChoose": [
      "Specialized in Short-Form Retention Triggers",
      "High-Converting Hormozi-Style Captions",
      "Commercial Rights Included for all Media",
      "Fast Delivery & Bulk Order Discounts"
    ],
    "workProcess": [
      {
        "step": "01",
        "title": "Script & Hook Creation",
        "desc": "Drafting viral 30-50 second script with a powerful curiosity opening hook."
      },
      {
        "step": "02",
        "title": "Voiceover & Timing",
        "desc": "Generating crisp studio-quality voiceover with perfect pacing."
      },
      {
        "step": "03",
        "title": "Editing & Dynamic Captions",
        "desc": "Syncing kinetic animated subtitles, emojis, and vibrant cutaways."
      },
      {
        "step": "04",
        "title": "SFX & Delivery",
        "desc": "Layering immersive sound effects and exporting in crystal-clear 1080x1920 HD."
      }
    ],
    "tools": [
      "CapCut Pro",
      "Premiere Pro",
      "ElevenLabs",
      "After Effects",
      "Canva"
    ],
    "faqs": [
      {
        "q": "Can you repurpose my existing YouTube videos into Shorts?",
        "a": "Yes! Simply send your video link and I will identify the most viral moments and convert them into shorts."
      }
    ],
    "reviews": [
      {
        "name": "Liam O’Connor",
        "country": "Ireland",
        "rating": 5,
        "date": "2 days ago",
        "comment": "Ordered 5 shorts, posted the first one and it hit 18k views in 6 hours! The captions and pacing are brilliant."
      }
    ],
    "packages": {
      "basic": {
        "name": "Single Viral Short",
        "price": 20,
        "deliveryDays": 2,
        "expressFee": 10,
        "expressDays": 1,
        "desc": "1 custom 9:16 viral short (up to 45s) + animated captions + voiceover + sound effects.",
        "features": [
          "1 Viral Short (30-45s)",
          "Hormozi Kinetic Captions",
          "Studio AI Voiceover",
          "Sound Effects & Music",
          "1080x1920 Full HD"
        ]
      },
      "standard": {
        "name": "5 Viral Shorts Pack",
        "price": 55,
        "deliveryDays": 4,
        "expressFee": 20,
        "expressDays": 2,
        "desc": "5 high-retention shorts + engaging scripts + animated subtitles + full commercial rights.",
        "features": [
          "5 Viral Shorts",
          "Scripts Included",
          "Custom Voiceover Sync",
          "Trending Sound Effects",
          "Full Commercial Rights",
          "2 Revisions"
        ]
      },
      "premium": {
        "name": "15 Viral Shorts Automation Suite",
        "price": 130,
        "deliveryDays": 8,
        "expressFee": 40,
        "expressDays": 4,
        "desc": "15 viral shorts for an entire month of daily publishing + hashtag research + thumbnail covers.",
        "features": [
          "15 Viral Shorts",
          "Full Monthly Strategy",
          "Custom Brand Colors",
          "15 Cover Thumbnails",
          "Keyword & Hashtag Guide",
          "Unlimited Revisions"
        ]
      }
    },
    "addons": [
      {
        "id": "ad-sh-1",
        "name": "Custom Thumbnail Cover for Each Short",
        "price": 15
      },
      {
        "id": "ad-sh-2",
        "name": "Script Writing for 5 Shorts",
        "price": 20
      }
    ]
  },
  {
    "id": "srv-gd-logo",
    "name": "Logo & Brand Identity",
    "slug": "logo-brand-identity",
    "category": "graphic-design",
    "categoryName": "Graphic Design",
    "badge": "SIGNATURE",
    "gigTitle": "I will design a unique modern logo and complete brand identity guide.",
    "coverImage": "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1000&q=80",
    "rating": "5.0",
    "reviewsCount": 82,
    "ordersInQueue": 5,
    "description": "Memorable, modern, vector logo design crafted with golden ratio balance, brand guidelines book, color palette, typography pairing, and 3D mockups.",
    "aboutNotes": [
      "Your logo is the visual cornerstone of your entire business. I design distinctive, minimalist, and timeless brand marks that establish instant credibility and leave an indelible impression.",
      "Every concept is 100% custom-crafted from original vector sketches—no clip-art, no generic stock templates. You receive full commercial rights, comprehensive vector formats (AI, EPS, SVG, PNG, PDF), and a brand guidelines manual.",
      "From Silicon Valley tech startups to luxury boutique brands, I give your company the visual identity it deserves."
    ],
    "keyDeliverables": [
      "Original Vector Logo Concepts (No Templates or Clip-Art)",
      "Vector Master Files (AI, EPS, SVG, PDF, High-Res PNG, JPEG)",
      "Transparent Background PNG Exports (Light & Dark Variants)",
      "Complete Brand Style Guide (Color Hex Codes, Typography Pairing)",
      "Social Media Profile Avatars & Banner Headers Kit",
      "Realistic 3D Stationery & Signage Mockups",
      "100% Full Commercial Copyright Ownership"
    ],
    "whyChoose": [
      "Master of Modern Minimalist & Geometric Aesthetics",
      "100% Original Vector Vector Artworks",
      "Clean Typography Pairing Guidelines",
      "Unlimited Revisions for Complete Peace of Mind"
    ],
    "workProcess": [
      {
        "step": "01",
        "title": "Creative Briefing",
        "desc": "Understanding your brand values, target audience, and stylistic preferences."
      },
      {
        "step": "02",
        "title": "Vector Sketching & Ideation",
        "desc": "Developing distinct logo concepts with typographic harmony."
      },
      {
        "step": "03",
        "title": "Refinement & Colors",
        "desc": "Polishing your selected concept and pairing primary/secondary brand colors."
      },
      {
        "step": "04",
        "title": "Brand Guide & Handover",
        "desc": "Assembling all vector source files, exports, and style guide manual."
      }
    ],
    "tools": [
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Figma",
      "InDesign"
    ],
    "faqs": [
      {
        "q": "Will I own the copyright to my logo?",
        "a": "Yes! Upon order completion, full commercial copyright ownership belongs 100% to you."
      },
      {
        "q": "What vector source files are included?",
        "a": "AI (Adobe Illustrator), EPS, SVG, PDF, and high-resolution 300 DPI transparent PNGs."
      }
    ],
    "reviews": [
      {
        "name": "Sophie Martin",
        "country": "France",
        "rating": 5,
        "date": "4 days ago",
        "comment": "Ruddranil designed our agency logo. Elegant, modern, and perfectly aligned with our vision. The brand book is fantastic!"
      }
    ],
    "packages": {
      "basic": {
        "name": "Essential Brand Logo",
        "price": 30,
        "deliveryDays": 3,
        "expressFee": 15,
        "expressDays": 1,
        "desc": "2 original modern logo concepts + transparent PNG + high-res JPEG + 3 revisions.",
        "features": [
          "2 Logo Concepts",
          "High-Res 300 DPI PNG/JPG",
          "Transparent Background",
          "3 Revisions"
        ]
      },
      "standard": {
        "name": "Professional Brand Suite",
        "price": 65,
        "deliveryDays": 5,
        "expressFee": 25,
        "expressDays": 2,
        "desc": "3 premium logo concepts + AI/EPS vector files + social media kit + 3D mockup + brand color guide.",
        "features": [
          "3 Unique Concepts",
          "All Vector Files (AI, EPS, SVG)",
          "Social Media Kit",
          "Color Palette & Typography",
          "Unlimited Revisions"
        ]
      },
      "premium": {
        "name": "Complete Corporate Identity",
        "price": 130,
        "deliveryDays": 8,
        "expressFee": 45,
        "expressDays": 3,
        "desc": "5 concepts + full brand guideline book + stationery design (business cards, letterhead) + all vector assets.",
        "features": [
          "5 Concepts",
          "Complete Brand Style Guide (PDF)",
          "Stationery Design Pack",
          "Favicon & App Icon",
          "All Vector Files",
          "Lifetime File Support"
        ]
      }
    },
    "addons": [
      {
        "id": "ad-lg-1",
        "name": "Matching Business Card Design",
        "price": 20
      },
      {
        "id": "ad-lg-2",
        "name": "Social Media Kit (5 Profile & Banner Sizes)",
        "price": 25
      }
    ]
  },
  {
    "id": "srv-gd-social",
    "name": "Social Media Post & Banner Design",
    "slug": "social-media-post-banner-design",
    "category": "graphic-design",
    "categoryName": "Graphic Design",
    "badge": "POPULAR",
    "gigTitle": "I will create eye-catching social media graphics, covers, and promotional banners.",
    "coverImage": "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=1000&q=80",
    "rating": "5.0",
    "reviewsCount": 58,
    "ordersInQueue": 3,
    "description": "High-converting visual assets: Instagram carousel slides, Facebook promotional banners, LinkedIn banners, YouTube channel art, and web headers.",
    "aboutNotes": [
      "Stop scrolling with mediocre generic templates. I design high-impact, custom graphic designs tailored to your brand identity that build authority and drive high engagement across your digital channels.",
      "Every banner, carousel, and promotional flyer is designed with strategic contrast, balanced typographic hierarchy, and crisp color science that looks stunning on desktop and mobile screens.",
      "From seasonal sales promotions to educational carousels, I deliver pixel-perfect graphics ready to post."
    ],
    "keyDeliverables": [
      "High-Resolution 300 DPI Web Graphics (PNG & JPEG)",
      "Multi-Slide Educational & Promotional Carousel Designs",
      "Platform-Specific Aspect Ratios (1:1 Square, 4:5 Portrait, 16:9 Landscape, 9:16 Story)",
      "Editable PSD or Figma Source Files",
      "Brand Consistent Typography & Color Coordination",
      "Commercial Rights Included for all Visuals"
    ],
    "whyChoose": [
      "Senior Graphic Designer with 5+ Years Experience",
      "Pixel-Perfect Contrast & Modern Typography",
      "Clean Organized Source Files",
      "Fast Turnaround with Unlimited Revisions"
    ],
    "workProcess": [
      {
        "step": "01",
        "title": "Content & Dimensions",
        "desc": "Confirming your copy, platform dimensions, and key promotional message."
      },
      {
        "step": "02",
        "title": "Visual Composition",
        "desc": "Crafting layout with bold focal point and balanced white space."
      },
      {
        "step": "03",
        "title": "Review & Polish",
        "desc": "Adjusting shadows, colors, and typography based on your feedback."
      },
      {
        "step": "04",
        "title": "Final Handover",
        "desc": "Exporting optimized web assets and delivering layered editable files."
      }
    ],
    "tools": [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Figma",
      "Canva"
    ],
    "faqs": [
      {
        "q": "Can you match my existing brand colors?",
        "a": "Yes! Send your color hex codes and font guidelines, and I will ensure 100% brand consistency."
      }
    ],
    "reviews": [
      {
        "name": "Hannah Wright",
        "country": "Canada",
        "rating": 5,
        "date": "5 days ago",
        "comment": "Ruddranil designed 6 promotional banners for our product launch. They look ultra-premium and boosted our CTR significantly!"
      }
    ],
    "packages": {
      "basic": {
        "name": "Single Premium Banner / Post",
        "price": 20,
        "deliveryDays": 2,
        "expressFee": 10,
        "expressDays": 1,
        "desc": "1 custom high-resolution social graphic or web banner + PNG/JPG + 2 revisions.",
        "features": [
          "1 Custom Graphic",
          "Platform Dimensions",
          "High-Res 300 DPI",
          "2 Revisions"
        ]
      },
      "standard": {
        "name": "Pack of 5 Social Graphics",
        "price": 50,
        "deliveryDays": 4,
        "expressFee": 20,
        "expressDays": 1,
        "desc": "5 custom social media posts or carousel slides + layered PSD/Figma source file.",
        "features": [
          "5 Custom Graphics / Carousel",
          "Figma/PSD Source Files",
          "Multiple Ratios (Feed & Story)",
          "Unlimited Revisions"
        ]
      },
      "premium": {
        "name": "Brand Campaign Pack of 12",
        "price": 110,
        "deliveryDays": 7,
        "expressFee": 35,
        "expressDays": 3,
        "desc": "12 custom banners/posts across all platforms + full editable files + priority delivery.",
        "features": [
          "12 Custom Graphics",
          "Cover Banners for All Channels",
          "All Source Files Included",
          "VIP Priority Delivery",
          "Unlimited Revisions"
        ]
      }
    },
    "addons": [
      {
        "id": "ad-sm-1",
        "name": "Matching Story/Reel Vertical Resizes",
        "price": 15
      },
      {
        "id": "ad-sm-2",
        "name": "Animated GIF/MP4 Banner Version",
        "price": 20
      }
    ]
  },
  {
    "id": "srv-gd-uiux",
    "name": "UI/UX Web & Mobile App Design",
    "slug": "ui-ux-web-mobile-app-design",
    "category": "graphic-design",
    "categoryName": "Graphic Design",
    "badge": "PREMIUM",
    "gigTitle": "I will design clean, responsive UI/UX prototypes using Figma.",
    "coverImage": "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1000&q=80",
    "rating": "5.0",
    "reviewsCount": 41,
    "ordersInQueue": 3,
    "description": "Modern, high-conversion user interfaces for websites, SaaS dashboards, and mobile apps crafted in Figma with design systems, auto-layout, and interactive clickable prototypes.",
    "aboutNotes": [
      "Great UI/UX isn’t just about looking beautiful—it’s about intuitive user flow, high conversion rates, and seamless usability. I design modern, clean, and responsive UI/UX interfaces for websites, web applications, and mobile apps in Figma.",
      "Every screen is built using modern Figma best practices: 8pt grid system, auto-layout 5.0, reusable component libraries, global design tokens (colors, typography, shadows), and interactive clickable prototypes.",
      "Developers love working with my Figma files because they are meticulously organized, commented, and ready for instant code implementation."
    ],
    "keyDeliverables": [
      "Complete High-Fidelity Figma Design File (.fig & cloud access)",
      "Clean Component Design System (Buttons, Inputs, Modals, Cards)",
      "Responsive Mobile, Tablet & Desktop Grid Breakpoints",
      "Interactive Clickable Figma Prototype for User Testing",
      "Developer-Ready Handover (Organized layers, tokens, exports)",
      "Free Commercial Google Fonts & Icon Sets Included"
    ],
    "whyChoose": [
      "Figma Master with Auto-Layout & Design Tokens Expertise",
      "User-Centric Architecture Focused on Conversions",
      "Developer-Friendly Layer Organization",
      "Interactive Prototype Included"
    ],
    "workProcess": [
      {
        "step": "01",
        "title": "Wireframing & UX Flow",
        "desc": "Mapping user journeys, screen hierarchy, and core interaction steps."
      },
      {
        "step": "02",
        "title": "Design System & Style Guide",
        "desc": "Creating typography scale, color tokens, and atomic components."
      },
      {
        "step": "03",
        "title": "High-Fidelity UI Screens",
        "desc": "Designing polished screens with auto-layout and responsive constraints."
      },
      {
        "step": "04",
        "title": "Interactive Prototype",
        "desc": "Connecting interactions, transitions, and conducting developer handoff."
      }
    ],
    "tools": [
      "Figma",
      "FigJam",
      "Adobe XD",
      "Illustrator",
      "Maze"
    ],
    "faqs": [
      {
        "q": "Do you provide code or HTML/CSS?",
        "a": "This gig provides the complete Figma UI/UX design and interactive prototype. Frontend code development can be added as a custom service!"
      }
    ],
    "reviews": [
      {
        "name": "Alexander Wright",
        "country": "Germany",
        "rating": 5,
        "date": "1 week ago",
        "comment": "Ruddranil designed our SaaS dashboard in Figma. Outstanding UX intuition, gorgeous modern aesthetics, and super clean component architecture!"
      }
    ],
    "packages": {
      "basic": {
        "name": "Landing Page UI (1 Screen)",
        "price": 50,
        "deliveryDays": 4,
        "expressFee": 20,
        "expressDays": 2,
        "desc": "1 responsive homepage or landing page UI design in Figma + responsive mobile view + design tokens.",
        "features": [
          "1 Landing Page UI",
          "Desktop & Mobile Views",
          "Figma Source File",
          "Component Library",
          "2 Revisions"
        ]
      },
      "standard": {
        "name": "Web / App Suite (Up to 5 Screens)",
        "price": 110,
        "deliveryDays": 7,
        "expressFee": 40,
        "expressDays": 3,
        "desc": "Up to 5 custom screens (Dashboard / Web App / Mobile) + interactive prototype + complete design system.",
        "features": [
          "5 High-Fidelity Screens",
          "Interactive Clickable Prototype",
          "Figma Design System",
          "Responsive Breakpoints",
          "Unlimited Revisions"
        ]
      },
      "premium": {
        "name": "Full Product Platform (Up to 12 Screens)",
        "price": 220,
        "deliveryDays": 14,
        "expressFee": 70,
        "expressDays": 7,
        "desc": "Complete product UI/UX up to 12 screens: full user journey, advanced component variants, micro-interactions, and developer specs.",
        "features": [
          "12 High-Fidelity Screens",
          "Full Interactive Prototype",
          "Advanced Component Variants",
          "Developer Handoff Specs",
          "User Journey Map",
          "Priority Support"
        ]
      }
    },
    "addons": [
      {
        "id": "ad-ui-1",
        "name": "Additional High-Fidelity Screen",
        "price": 25
      },
      {
        "id": "ad-ui-2",
        "name": "Dark / Light Mode Version",
        "price": 40
      }
    ]
  },
  {
    "id": "srv-gd-print",
    "name": "Print Media Design",
    "slug": "print-media-design",
    "category": "graphic-design",
    "categoryName": "Graphic Design",
    "badge": "CMYK READY",
    "gigTitle": "I will design print-ready flyers, brochures, packaging, and business cards.",
    "coverImage": "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1000&q=80",
    "rating": "5.0",
    "reviewsCount": 37,
    "ordersInQueue": 2,
    "description": "Flawless print-ready materials: 300 DPI CMYK files with bleed and margin crop marks for flyers, bi-fold/tri-fold brochures, product packaging boxes, and luxury business cards.",
    "aboutNotes": [
      "Print design requires strict technical discipline to guarantee that colors, bleed margins, and paper cuts look just as stunning in physical reality as on your computer screen. I deliver 100% print-ready design assets formatted for local or commercial printers (Vistaprint, MOO, etc.).",
      "All files are formatted in CMYK color mode at 300 DPI resolution with standard bleed lines (0.125” / 3mm) and safety margins, preventing cut-off text or unexpected color shifts.",
      "From corporate stationery and trade show brochures to premium cosmetic product packaging, I bring your brand to physical life."
    ],
    "keyDeliverables": [
      "Print-Ready 300 DPI CMYK PDF with Bleeds & Crop Marks",
      "Editable Adobe Illustrator / InDesign / Photoshop Source Files",
      "Single, Bi-Fold, or Tri-Fold Brochure Formats",
      "Product Packaging Box Dieline Layout & Mockups",
      "Luxury Business Cards with Spot UV / Foil Mockup Visualization",
      "Vistaprint & Commercial Printer Specification Compliance"
    ],
    "whyChoose": [
      "Deep Knowledge of Print Production & CMYK Color Spaces",
      "Zero Printing Errors Guaranteed",
      "Layered Vector Source Files Included",
      "Realistic 3D Print Mockups"
    ],
    "workProcess": [
      {
        "step": "01",
        "title": "Printer Specs & Dieline",
        "desc": "Verifying paper dimensions, fold style, and printer bleed specifications."
      },
      {
        "step": "02",
        "title": "Typesetting & Layout",
        "desc": "Structuring body text, margins, and placing high-resolution vector logos."
      },
      {
        "step": "03",
        "title": "Color Mode & Prepress",
        "desc": "Converting colors to CMYK and setting rich blacks and vector lines."
      },
      {
        "step": "04",
        "title": "Export & Handover",
        "desc": "Generating press-quality PDF with crop marks and supplying layered source files."
      }
    ],
    "tools": [
      "Adobe InDesign",
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Acrobat Pro"
    ],
    "faqs": [
      {
        "q": "Will these files work with Vistaprint or local printers?",
        "a": "Yes! All files are formatted with exact bleed and trim specs compatible with Vistaprint, MOO, and professional offset printers."
      }
    ],
    "reviews": [
      {
        "name": "Claire Dubois",
        "country": "Switzerland",
        "rating": 5,
        "date": "1 week ago",
        "comment": "Printed 2,000 tri-fold brochures for our annual expo. Colors were rich and cuts were 100% accurate. Fantastic prepress work!"
      }
    ],
    "packages": {
      "basic": {
        "name": "Single Sided Flyer / Card",
        "price": 25,
        "deliveryDays": 3,
        "expressFee": 10,
        "expressDays": 1,
        "desc": "Single-sided flyer or business card + 300 DPI CMYK print PDF + bleed marks.",
        "features": [
          "1-Sided Flyer or Card",
          "300 DPI CMYK Print PDF",
          "Bleed & Crop Marks",
          "Print-Ready",
          "2 Revisions"
        ]
      },
      "standard": {
        "name": "Double-Sided Brochure / Flyer",
        "price": 55,
        "deliveryDays": 5,
        "expressFee": 20,
        "expressDays": 2,
        "desc": "Double-sided flyer, postcard, or bi-fold brochure + editable vector AI source file + 3D mockup.",
        "features": [
          "Double-Sided Design / Bi-Fold",
          "AI / InDesign Source File",
          "300 DPI CMYK PDF",
          "3D Realistic Mockup",
          "Unlimited Revisions"
        ]
      },
      "premium": {
        "name": "Tri-Fold / Packaging Suite",
        "price": 110,
        "deliveryDays": 8,
        "expressFee": 35,
        "expressDays": 3,
        "desc": "Tri-fold brochure or custom packaging box with dielines + full source files + commercial rights.",
        "features": [
          "Tri-Fold Brochure or Box Packaging",
          "Dieline Preparation",
          "All Vector Source Files",
          "3D Product Rendering",
          "Unlimited Revisions",
          "Printer Support"
        ]
      }
    },
    "addons": [
      {
        "id": "ad-pr-1",
        "name": "Matching Business Card (Double Sided)",
        "price": 15
      },
      {
        "id": "ad-pr-2",
        "name": "Gold Foil / Spot UV Print Layer",
        "price": 20
      }
    ]
  },
  {
    "id": "srv-gd-vector",
    "name": "Vector Art & Illustration",
    "slug": "vector-art-illustration",
    "category": "graphic-design",
    "categoryName": "Graphic Design",
    "badge": "CRISP QUALITY",
    "gigTitle": "I will convert raster images to clean vector format and draw custom illustrations.",
    "coverImage": "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80",
    "rating": "5.0",
    "reviewsCount": 48,
    "ordersInQueue": 3,
    "description": "Manual 100% vector tracing and custom digital illustrations in Adobe Illustrator: infinitely scalable SVG, AI, EPS files with crisp lines, smooth curves, and zero pixelation.",
    "aboutNotes": [
      "Have a blurry low-resolution logo, sketch, or raster image that pixelates when enlarged? I manually vectorize your artwork using Adobe Illustrator pen tool precision—guaranteeing smooth curves, clean anchor points, and infinite scalability.",
      "Unlike sloppy auto-trace tools that create jagged edges and thousands of messy anchor points, every path is manually drawn, grouped, and colored for laser-sharp clarity on giant billboards or tiny business cards.",
      "I also create bespoke 2D vector illustrations, flat art icons, and custom vector character designs for websites and apps."
    ],
    "keyDeliverables": [
      "100% Manual Vector Tracing (Zero Automated Trace Flaws)",
      "Infinitely Scalable Vector Source Files (AI, EPS, SVG, PDF)",
      "High-Resolution 300 DPI Transparent PNG (Up to 10,000px)",
      "Clean Anchor Points & Organized Color Layers",
      "Color Palette Adjustments & Typographic Corrections",
      "Ready for Laser Engraving, Vinyl Plotters, Screen Printing & Embroidery"
    ],
    "whyChoose": [
      "Manual Pen Tool Precision (Never Sloppy Auto-Trace)",
      "Screen Printing & Laser Cutting File Expertise",
      "Ultra-Clean Anchor Point Optimization",
      "Super Fast Turnaround"
    ],
    "workProcess": [
      {
        "step": "01",
        "title": "Image Inspection",
        "desc": "Inspecting your raster image resolution and identifying critical curves."
      },
      {
        "step": "02",
        "title": "Manual Pen Tracing",
        "desc": "Drawing every outline manually with balanced bezier curve handles."
      },
      {
        "step": "03",
        "title": "Color Matching & Layers",
        "desc": "Applying exact Pantone/Hex colors and organizing vector shapes."
      },
      {
        "step": "04",
        "title": "Export in All Formats",
        "desc": "Exporting in AI, EPS, SVG, PDF, and high-res transparent PNG."
      }
    ],
    "tools": [
      "Adobe Illustrator",
      "CorelDRAW",
      "Inkscape",
      "Photoshop"
    ],
    "faqs": [
      {
        "q": "Will the vector scale to any size without losing quality?",
        "a": "Yes! Vector graphics use mathematical lines instead of pixels, meaning you can scale it from a coin to a skyscraper with zero blurriness."
      }
    ],
    "reviews": [
      {
        "name": "Markus Lindberg",
        "country": "Sweden",
        "rating": 5,
        "date": "3 days ago",
        "comment": "Had a 20-year-old blurry logo that needed to be printed on a giant van. Ruddranil vectorized it in 4 hours. Absolute perfection!"
      }
    ],
    "packages": {
      "basic": {
        "name": "Simple Vector Trace",
        "price": 20,
        "deliveryDays": 2,
        "expressFee": 10,
        "expressDays": 1,
        "desc": "Manual vector redraw of 1 simple logo or icon + SVG, AI, EPS + high-res PNG.",
        "features": [
          "1 Simple Logo / Icon",
          "Manual Pen Tool Tracing",
          "AI, EPS, SVG, PDF Files",
          "Transparent PNG (300 DPI)",
          "2 Revisions"
        ]
      },
      "standard": {
        "name": "Complex Artwork Vectorization",
        "price": 45,
        "deliveryDays": 3,
        "expressFee": 15,
        "expressDays": 1,
        "desc": "Vectorization of complex graphics, character art, or detailed badge with color separations.",
        "features": [
          "Complex Detailed Artwork",
          "Color Separation for Screen Printing",
          "AI, EPS, SVG, PDF, DXF",
          "Ultra-High Res PNG",
          "Unlimited Revisions"
        ]
      },
      "premium": {
        "name": "Custom Vector Illustration",
        "price": 85,
        "deliveryDays": 6,
        "expressFee": 30,
        "expressDays": 2,
        "desc": "Original bespoke 2D vector illustration designed from scratch + full commercial rights + all source files.",
        "features": [
          "Original Vector Illustration",
          "Bespoke Custom Artwork",
          "Full Commercial Rights",
          "All Source & Vector Formats",
          "Unlimited Revisions"
        ]
      }
    },
    "addons": [
      {
        "id": "ad-vc-1",
        "name": "Laser Cutter / Plotter DXF File Export",
        "price": 10
      },
      {
        "id": "ad-vc-2",
        "name": "Super Fast 6h Turnaround",
        "price": 15
      }
    ]
  },
  {
    "id": "srv-va-excel",
    "name": "Excel & Google Sheets Data Entry",
    "slug": "excel-google-sheets-data-entry",
    "category": "data-entry",
    "categoryName": "Data Entry & Virtual Assistant",
    "badge": "100% ACCURACY",
    "gigTitle": "I will do fast and accurate copy-paste and spreadsheet data entry work.",
    "coverImage": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80",
    "rating": "5.0",
    "reviewsCount": 71,
    "ordersInQueue": 4,
    "description": "Fast, accurate, confidential data entry into Microsoft Excel and Google Sheets: copy-paste, data typing, record indexing, spreadsheet formatting, and formula cleanup.",
    "aboutNotes": [
      "Drowning in tedious spreadsheet tasks, raw receipts, or piles of unorganized data? I provide fast, reliable, and 100% accurate data entry services in Excel and Google Sheets.",
      "With a 75+ WPM typing speed and rigorous quality control checks, I guarantee error-free data transfer, clean column formatting, formula implementation (VLOOKUP, XLOOKUP, IF, SUMIFS), and strict client confidentiality.",
      "Outsource your routine data workload to an expert and focus your energy on high-value business operations."
    ],
    "keyDeliverables": [
      "100% Error-Free Data Typing & Copy-Paste Work",
      "Clean Formatting, Consistent Capitalization & Column Alignment",
      "Excel Formulas & Automated Functions (VLOOKUP, XLOOKUP, INDEX/MATCH)",
      "Data Consolidation from Multiple Files into One Master Sheet",
      "Duplicate Removal & Incomplete Entry Flagging",
      "Strict Data Privacy & NDA Adherence Guaranteed"
    ],
    "whyChoose": [
      "75+ Words Per Minute Typing Speed with 99.9% Accuracy",
      "Master of Excel Shortcuts & Google Sheets Functions",
      "Rigorous Double-Check Quality Process",
      "Strict Non-Disclosure & Data Confidentiality"
    ],
    "workProcess": [
      {
        "step": "01",
        "title": "Data Review & Samples",
        "desc": "Inspecting raw files, fields, headers, and understanding formatting requirements."
      },
      {
        "step": "02",
        "title": "Data Entry Execution",
        "desc": "Carefully inputting records with high typing speed and attention to detail."
      },
      {
        "step": "03",
        "title": "Quality & Formula Audit",
        "desc": "Running validation checks, eliminating duplicates, and testing formulas."
      },
      {
        "step": "04",
        "title": "Final Handover",
        "desc": "Delivering structured .xlsx and Google Sheets files on schedule."
      }
    ],
    "tools": [
      "Microsoft Excel",
      "Google Sheets",
      "Excel Power Query",
      "Notepad++",
      "Adobe Acrobat"
    ],
    "faqs": [
      {
        "q": "Is my data secure and confidential?",
        "a": "Yes, 100%. I treat all client data with strict confidentiality and delete files immediately after your project approval."
      },
      {
        "q": "How many rows/entries are included in a package?",
        "a": "Basic includes up to 250 rows/entries, Standard up to 800 rows, and Premium up to 2,000 rows."
      }
    ],
    "reviews": [
      {
        "name": "Jason Miller",
        "country": "United States",
        "rating": 5,
        "date": "2 days ago",
        "comment": "Ruddranil entered 800+ customer records into Google Sheets with zero mistakes. Fast, communicative, and super reliable!"
      }
    ],
    "packages": {
      "basic": {
        "name": "Starter Data Entry (Up to 250 Rows)",
        "price": 15,
        "deliveryDays": 2,
        "expressFee": 10,
        "expressDays": 1,
        "desc": "Up to 250 rows of copy-paste or data typing into Excel/Google Sheets with clean formatting.",
        "features": [
          "Up to 250 Rows / Records",
          "Clean Column Formatting",
          "Duplicate Check",
          "Excel (.xlsx) & Sheets",
          "1 Revision"
        ]
      },
      "standard": {
        "name": "Business Spreadsheets (Up to 800 Rows)",
        "price": 35,
        "deliveryDays": 4,
        "expressFee": 15,
        "expressDays": 2,
        "desc": "Up to 800 rows of data entry + formula implementation + data consolidation from multiple sources.",
        "features": [
          "Up to 800 Rows / Records",
          "Excel Formulas (VLOOKUP, etc.)",
          "Data Merging / Splitting",
          "Error Proofing Check",
          "2 Revisions"
        ]
      },
      "premium": {
        "name": "Enterprise Bulk Data (Up to 2,000 Rows)",
        "price": 75,
        "deliveryDays": 6,
        "expressFee": 30,
        "expressDays": 3,
        "desc": "Up to 2,000 rows of complex data entry + pivot tables + automated cleanup + priority turnaround.",
        "features": [
          "Up to 2,000 Rows / Records",
          "Pivot Tables & Summary Dashboard",
          "Multi-Source Data Consolidation",
          "Priority VIP Delivery",
          "Unlimited Revisions"
        ]
      }
    },
    "addons": [
      {
        "id": "ad-ex-1",
        "name": "Extra 500 Rows Data Entry",
        "price": 15
      },
      {
        "id": "ad-ex-2",
        "name": "Automated Pivot Table & Chart Dashboard",
        "price": 20
      }
    ]
  },
  {
    "id": "srv-va-leadgen",
    "name": "Web Research & B2B Lead Generation",
    "slug": "web-research-b2b-lead-generation",
    "category": "data-entry",
    "categoryName": "Data Entry & Virtual Assistant",
    "badge": "VERIFIED LEADS",
    "gigTitle": "I will collect targeted business leads, verified emails, and contact details.",
    "coverImage": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80",
    "rating": "5.0",
    "reviewsCount": 56,
    "ordersInQueue": 3,
    "description": "High-quality targeted B2B lead generation: company name, decision-maker name, job title, 100% verified business email, LinkedIn URL, website, phone, and location.",
    "aboutNotes": [
      "Fuel your sales pipeline with laser-targeted B2B prospects. I conduct thorough web research and prospect mining using LinkedIn Sales Navigator, Apollo.io, and Hunter to compile verified decision-maker contact lists.",
      "Every email is run through multi-step MX record and SMTP ping verification tools to guarantee near 0% bounce rate, safeguarding your sender reputation.",
      "Filter prospects by industry, company head-count, revenue, geographical location, or specific job title (CEOs, Founders, CMOs, Directors)."
    ],
    "keyDeliverables": [
      "First & Last Name of Decision Maker",
      "Job Title (CEO, Founder, Director, Manager, etc.)",
      "100% Verified Valid Email Address (Zero Bounce Guarantee)",
      "Company Name & Official Website URL",
      "Company LinkedIn Profile & Personal LinkedIn URL",
      "Phone Number & Physical Business Address (where available)",
      "Organized Excel / Google Sheets Format Ready for Cold Outreach"
    ],
    "whyChoose": [
      "LinkedIn Sales Navigator & Apollo Pro User",
      "0% Bounce Rate Email Verification Guarantee",
      "Custom Targeted to Your Exact Buyer Persona",
      "Clean Formatting with Zero Duplicate Leads"
    ],
    "workProcess": [
      {
        "step": "01",
        "title": "Target Criteria Mapping",
        "desc": "Defining your target niche, location, company size, and executive titles."
      },
      {
        "step": "02",
        "title": "Prospect Mining",
        "desc": "Extracting matching profiles through LinkedIn Sales Navigator and industry directories."
      },
      {
        "step": "03",
        "title": "Email Verification",
        "desc": "Validating every email address using NeverBounce and ZeroBounce."
      },
      {
        "step": "04",
        "title": "Data Formatting & Delivery",
        "desc": "Organizing contact details into clean spreadsheet columns."
      }
    ],
    "tools": [
      "LinkedIn Sales Navigator",
      "Apollo.io",
      "Hunter.io",
      "NeverBounce",
      "Google Sheets"
    ],
    "faqs": [
      {
        "q": "How do you verify the email addresses?",
        "a": "I run every email through automated SMTP ping validation tools to ensure the inbox is active and will not bounce."
      },
      {
        "q": "Can you target specific countries or cities?",
        "a": "Yes! USA, UK, Canada, Australia, Europe, or any specific global city or postal region."
      }
    ],
    "reviews": [
      {
        "name": "Greg Stevens",
        "country": "United States",
        "rating": 5,
        "date": "4 days ago",
        "comment": "Ordered 250 real estate leads in Florida. Bounced 0 emails! Our sales team booked 8 calls in the first week."
      }
    ],
    "packages": {
      "basic": {
        "name": "Starter 100 Verified Leads",
        "price": 25,
        "deliveryDays": 3,
        "expressFee": 10,
        "expressDays": 1,
        "desc": "100 targeted B2B leads: Name, Title, Verified Email, Company, Website, LinkedIn URL.",
        "features": [
          "100 Verified B2B Leads",
          "Decision Maker Names & Titles",
          "100% Valid Emails",
          "Company Website & LinkedIn",
          "Excel / Sheets Format"
        ]
      },
      "standard": {
        "name": "Growth 250 Verified Leads",
        "price": 55,
        "deliveryDays": 5,
        "expressFee": 20,
        "expressDays": 2,
        "desc": "250 targeted B2B leads + phone numbers (where available) + industry tags + zero bounce check.",
        "features": [
          "250 Verified B2B Leads",
          "Phone Numbers (when public)",
          "Verified Zero Bounce",
          "Detailed Location & Company Size",
          "2 Revisions"
        ]
      },
      "premium": {
        "name": "Scaling 600 Verified Leads",
        "price": 110,
        "deliveryDays": 8,
        "expressFee": 40,
        "expressDays": 4,
        "desc": "600 high-tier executive leads + full data enrichment + personalized icebreaker notes assistance.",
        "features": [
          "600 Verified B2B Leads",
          "C-Level & VP Targeting",
          "Full Data Enrichment",
          "Priority Delivery",
          "Unlimited Revisions"
        ]
      }
    },
    "addons": [
      {
        "id": "ad-lg-1",
        "name": "Direct Phone Numbers Search",
        "price": 20
      },
      {
        "id": "ad-lg-2",
        "name": "Custom Personalized First Line / Icebreaker",
        "price": 30
      }
    ]
  },
  {
    "id": "srv-va-cleaning",
    "name": "Data Cleaning & Formatting",
    "slug": "data-cleaning-formatting",
    "category": "data-entry",
    "categoryName": "Data Entry & Virtual Assistant",
    "badge": "ORGANIZED",
    "gigTitle": "I will clean, re-format, organize, and remove duplicates from large datasets.",
    "coverImage": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
    "rating": "5.0",
    "reviewsCount": 39,
    "ordersInQueue": 2,
    "description": "Transform messy, corrupted, duplicate-ridden datasets into pristine, properly formatted, standardized databases: deduplication, text splitting, phone/address standardization.",
    "aboutNotes": [
      "Messy data leads to bad business decisions, wasted ad spend, and system import errors. I clean, standardize, and reformat large datasets into flawless spreadsheets ready for CRM import or business analysis.",
      "I remove duplicate records, split combined names (First Name / Last Name), parse addresses into separate city/state/zip columns, normalize phone number formats, fix capitalization, and remove broken characters.",
      "Upload your messy CSV or Excel file and receive a clean, harmonized, and validated dataset."
    ],
    "keyDeliverables": [
      "Duplicate Record Identification & Complete Removal",
      "Text Column Splitting (e.g. Full Name into First / Last Name)",
      "Address Parsing (Street, City, State, ZIP into separate columns)",
      "Phone Number & Date Format Standardization",
      "Capitalization Normalization (Proper Title Case vs ALL CAPS/lowercase)",
      "Removal of Extra Whitespace, Non-ASCII Characters & Line Breaks",
      "Blank Cell & Missing Data Handling with Summary Log"
    ],
    "whyChoose": [
      "Excel Power Query & Regex Data Cleansing Expert",
      "Guaranteed Zero Data Loss of Critical Records",
      "CRM Import-Ready Formatting (Salesforce, HubSpot, Zoho)",
      "Fast Turnaround on Massive Datasets"
    ],
    "workProcess": [
      {
        "step": "01",
        "title": "Data Health Diagnosis",
        "desc": "Analyzing column inconsistency, corrupt entries, and format variations."
      },
      {
        "step": "02",
        "title": "Rule-Based Cleaning",
        "desc": "Executing Power Query transforms, regex string parsing, and deduplication."
      },
      {
        "step": "03",
        "title": "Format Standardization",
        "desc": "Normalizing dates, phone country codes, and text casing."
      },
      {
        "step": "04",
        "title": "Validation & Handover",
        "desc": "Verifying record count matches and delivering clean CSV/Excel files."
      }
    ],
    "tools": [
      "Microsoft Excel Power Query",
      "Python Pandas",
      "Google Sheets",
      "OpenRefine"
    ],
    "faqs": [
      {
        "q": "Will I lose any important data during cleaning?",
        "a": "No! I always preserve your original raw file and deliver the cleaned file separately alongside a summary change log."
      }
    ],
    "reviews": [
      {
        "name": "Rachel Adams",
        "country": "United Kingdom",
        "rating": 5,
        "date": "1 week ago",
        "comment": "Cleaned a messy 5,000-row email database in 24 hours. Split names and removed duplicates effortlessly. Saved us days of work!"
      }
    ],
    "packages": {
      "basic": {
        "name": "Basic Cleanup (Up to 1,000 Rows)",
        "price": 20,
        "deliveryDays": 2,
        "expressFee": 10,
        "expressDays": 1,
        "desc": "Deduplication, case normalization, and formatting for up to 1,000 rows.",
        "features": [
          "Up to 1,000 Rows Cleaned",
          "Remove Duplicates",
          "Proper Casing & Trimming",
          "Excel / CSV Export",
          "1 Revision"
        ]
      },
      "standard": {
        "name": "Advanced Clean & Parse (Up to 5,000 Rows)",
        "price": 45,
        "deliveryDays": 3,
        "expressFee": 20,
        "expressDays": 1,
        "desc": "Up to 5,000 rows: address/name splitting, phone formatting, deduplication, and CRM compatibility.",
        "features": [
          "Up to 5,000 Rows",
          "Name & Address Column Splitting",
          "Phone & Date Normalization",
          "CRM Import Ready (HubSpot/Salesforce)",
          "2 Revisions"
        ]
      },
      "premium": {
        "name": "Enterprise Deep Clean (Up to 15,000 Rows)",
        "price": 90,
        "deliveryDays": 5,
        "expressFee": 35,
        "expressDays": 2,
        "desc": "Up to 15,000 rows: multi-source consolidation, custom regex rules, missing value audit, and priority delivery.",
        "features": [
          "Up to 15,000 Rows Cleaned",
          "Multi-Table Merging",
          "Detailed Error & Fix Log",
          "Priority Turnaround",
          "Unlimited Revisions"
        ]
      }
    },
    "addons": [
      {
        "id": "ad-dc-1",
        "name": "Extra 5,000 Rows Cleaned",
        "price": 20
      },
      {
        "id": "ad-dc-2",
        "name": "Automated Excel Cleaning Macro Script",
        "price": 25
      }
    ]
  },
  {
    "id": "srv-va-pdf",
    "name": "PDF to Excel / Word Conversion",
    "slug": "pdf-to-excel-word-conversion",
    "category": "data-entry",
    "categoryName": "Data Entry & Virtual Assistant",
    "badge": "FAST CONVERT",
    "gigTitle": "I will convert PDF, scanned files, or hand-written notes into editable documents.",
    "coverImage": "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=1000&q=80",
    "rating": "5.0",
    "reviewsCount": 65,
    "ordersInQueue": 3,
    "description": "Accurate manual and OCR conversion of PDF, scanned papers, bank statements, invoices, and images into fully editable Microsoft Word, Excel, or Google Docs files.",
    "aboutNotes": [
      "Need to extract tabular financial data from scanned PDF bank statements, or convert a locked legal document into an editable Word document? I provide flawless PDF conversion and transcription.",
      "Unlike free online converters that distort margins, break tables, and misalign fonts, I review every single converted page by hand to ensure numbers, tables, bullet points, and headers match the original document 1:1.",
      "Bank statements, invoices, product catalogs, legal contracts, or handwritten notes—all converted cleanly and accurately."
    ],
    "keyDeliverables": [
      "PDF to Microsoft Excel (.xlsx) / Google Sheets with Dynamic Cells",
      "PDF to Microsoft Word (.docx) / Google Docs with Matching Formatting",
      "Scanned Document OCR Text Extraction with Error Checking",
      "Bank Statement Financial Table Extraction to Clean Rows/Columns",
      "Preservation of Original Fonts, Margins, Table Borders & Layout",
      "Password Removal Assistance (for documents you own)"
    ],
    "whyChoose": [
      "Manual Proofreading of Every Single Page",
      "100% Matching Layout & Formatting",
      "Table Alignment & Math Formulas Verification",
      "Strict Privacy & Immediate File Deletion After Handover"
    ],
    "workProcess": [
      {
        "step": "01",
        "title": "Document Inspection",
        "desc": "Evaluating scan clarity, table structures, and page count."
      },
      {
        "step": "02",
        "title": "High-Accuracy OCR Extraction",
        "desc": "Running enterprise OCR engine to extract editable characters."
      },
      {
        "step": "03",
        "title": "Manual Formatting & Audit",
        "desc": "Aligning columns, adjusting typography, and proofreading numbers against original."
      },
      {
        "step": "04",
        "title": "Final Handover",
        "desc": "Delivering editable .docx / .xlsx files ready for immediate use."
      }
    ],
    "tools": [
      "Adobe Acrobat Pro DC",
      "ABBYY FineReader",
      "Microsoft Word",
      "Microsoft Excel",
      "Google Docs"
    ],
    "faqs": [
      {
        "q": "Can you convert bank statements into Excel with formulas?",
        "a": "Yes! All debit, credit, date, and description fields are formatted into proper individual cells ready for accounting software."
      },
      {
        "q": "Can you work with scanned handwritten notes?",
        "a": "Yes, as long as the handwriting is reasonably legible, I will manually transcribe it into Word."
      }
    ],
    "reviews": [
      {
        "name": "Emily Clark",
        "country": "Australia",
        "rating": 5,
        "date": "2 days ago",
        "comment": "Converted 45 pages of scanned financial statements into Excel. Every single number matched the bank balance perfectly. Incredible attention to detail!"
      }
    ],
    "packages": {
      "basic": {
        "name": "Up to 15 Pages Conversion",
        "price": 15,
        "deliveryDays": 2,
        "expressFee": 10,
        "expressDays": 1,
        "desc": "Up to 15 pages of PDF converted to clean Word or Excel with identical formatting.",
        "features": [
          "Up to 15 Pages",
          "PDF to Word or Excel",
          "Table & Margin Matching",
          "Spelling & Number Check",
          "1 Revision"
        ]
      },
      "standard": {
        "name": "Up to 45 Pages Conversion",
        "price": 35,
        "deliveryDays": 3,
        "expressFee": 15,
        "expressDays": 1,
        "desc": "Up to 45 pages converted: scanned documents, bank statements, or product catalogs.",
        "features": [
          "Up to 45 Pages",
          "Scanned / OCR Processing",
          "Complex Table Formatting",
          "Word / Excel / Docs Format",
          "2 Revisions"
        ]
      },
      "premium": {
        "name": "Up to 100 Pages Book / Report",
        "price": 70,
        "deliveryDays": 5,
        "expressFee": 25,
        "expressDays": 2,
        "desc": "Up to 100 pages of comprehensive document conversion with manual proofreading and priority delivery.",
        "features": [
          "Up to 100 Pages",
          "Deep OCR & Manual Formatting",
          "Table of Contents Preservation",
          "Priority Turnaround",
          "Unlimited Revisions"
        ]
      }
    },
    "addons": [
      {
        "id": "ad-pdf-1",
        "name": "Extra 20 Pages Conversion",
        "price": 15
      },
      {
        "id": "ad-pdf-2",
        "name": "Formula Integration in Converted Excel",
        "price": 15
      }
    ]
  },
  {
    "id": "srv-va-ecommerce",
    "name": "E-commerce Product Listing",
    "slug": "ecommerce-product-listing",
    "category": "data-entry",
    "categoryName": "Data Entry & Virtual Assistant",
    "badge": "SALES READY",
    "gigTitle": "I will upload and optimize products with tags and descriptions on Shopify or WooCommerce.",
    "coverImage": "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1000&q=80",
    "rating": "5.0",
    "reviewsCount": 44,
    "ordersInQueue": 3,
    "description": "Accurate e-commerce product uploads and SEO optimization for Shopify, WooCommerce, Amazon, and Etsy: title, SKU, variant options, pricing, tags, and image formatting.",
    "aboutNotes": [
      "Launching new inventory or migrating an entire store? I handle comprehensive e-commerce product uploads with surgical accuracy on Shopify, WooCommerce, Amazon, eBay, and Etsy.",
      "I configure product titles, persuasive sales descriptions, multi-tiered variants (Sizes, Colors, Materials), SKU codes, barcode numbers, inventory counts, high-resolution product image gallery uploads, and search tags.",
      "Every listing is formatted with clean SEO metadata to help your products rank organically on Google Shopping and marketplace search bars."
    ],
    "keyDeliverables": [
      "Product Title Optimization with Keywords",
      "Clean Formatting of Bullet Deliverables & Product Descriptions",
      "Variant Matrix Setup (Colors, Sizes, Pricing per SKU)",
      "High-Resolution Product Image Uploads & Image Alt Tag Setup",
      "Product Tagging, Category Assignment & Collection Mapping",
      "Inventory Stock Quantity & Barcode/UPC/SKU Management",
      "SEO Meta Title & URL Handle Configuration"
    ],
    "whyChoose": [
      "Shopify & WooCommerce Specialist with 4+ Years Experience",
      "100% Accurate Pricing, SKU and Variant Mapping",
      "SEO Keyword Rich Descriptions",
      "Fast Turnaround for Bulk Catalogs"
    ],
    "workProcess": [
      {
        "step": "01",
        "title": "Catalog Ingestion",
        "desc": "Reviewing supplier CSV, dropshipping feed, or image folders."
      },
      {
        "step": "02",
        "title": "Product Creation & Variants",
        "desc": "Inputting titles, descriptions, pricing, and building variant dropdowns."
      },
      {
        "step": "03",
        "title": "Image Attachment & SEO",
        "desc": "Uploading product images, setting alt tags, and assigning collections."
      },
      {
        "step": "04",
        "title": "Storefront Verification",
        "desc": "Testing live product pages on mobile and desktop to guarantee checkout readiness."
      }
    ],
    "tools": [
      "Shopify",
      "WooCommerce",
      "Etsy",
      "Amazon Seller Central",
      "Excel / CSV",
      "Canva"
    ],
    "faqs": [
      {
        "q": "Which platforms do you work with?",
        "a": "Shopify, WooCommerce (WordPress), Amazon, Etsy, eBay, BigCommerce, and Wix."
      },
      {
        "q": "Can you write the product descriptions for me?",
        "a": "Yes! Compelling, SEO-optimized product bullet points and descriptions are included."
      }
    ],
    "reviews": [
      {
        "name": "Nathan Scott",
        "country": "United States",
        "rating": 5,
        "date": "3 days ago",
        "comment": "Ruddranil uploaded 100 fashion products to our Shopify store with all size and color variants configured flawlessly. Highly recommended!"
      }
    ],
    "packages": {
      "basic": {
        "name": "Starter 20 Product Uploads",
        "price": 25,
        "deliveryDays": 3,
        "expressFee": 10,
        "expressDays": 1,
        "desc": "Upload 20 simple or variant products + title, description, images, price, SKU, and tags.",
        "features": [
          "20 Products Uploaded",
          "Variants Setup (Size/Color)",
          "Image Uploads & Alt Tags",
          "Categories & Tags",
          "1 Revision"
        ]
      },
      "standard": {
        "name": "Growth 60 Product Uploads",
        "price": 60,
        "deliveryDays": 5,
        "expressFee": 25,
        "expressDays": 2,
        "desc": "Upload 60 products + SEO optimized titles + bullet descriptions + collection organization.",
        "features": [
          "60 Products Uploaded",
          "SEO Title Optimization",
          "Bullet Point Descriptions",
          "Variant Pricing & SKUs",
          "2 Revisions"
        ]
      },
      "premium": {
        "name": "Catalog Overhaul 150 Products",
        "price": 130,
        "deliveryDays": 8,
        "expressFee": 45,
        "expressDays": 4,
        "desc": "Upload 150 products + bulk CSV mapping + image resizing + complete store collection architecture.",
        "features": [
          "150 Products Uploaded",
          "Bulk CSV Data Mapping",
          "Complete Collection Setup",
          "Image Optimization & Resizing",
          "Priority Turnaround",
          "Unlimited Revisions"
        ]
      }
    },
    "addons": [
      {
        "id": "ad-ec-1",
        "name": "Extra 50 Products Upload",
        "price": 35
      },
      {
        "id": "ad-ec-2",
        "name": "Product Image Background Removal (White BG)",
        "price": 20
      }
    ]
  },
  {
    "id": "srv-auto-fb-messenger",
    "name": "Facebook Messenger Automation",
    "slug": "facebook-messenger-automation",
    "category": "automation",
    "categoryName": "Automation Services",
    "badge": "AI CHATBOT",
    "gigTitle": "I will set up automated chatbot flows, FAQ responses, and lead capture systems for Facebook Messenger.",
    "coverImage": "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=1000&q=80",
    "rating": "5.0",
    "reviewsCount": 42,
    "ordersInQueue": 3,
    "description": "High-converting Facebook Messenger chatbot automation to engage inbound leads instantly, answer common FAQs, collect contact details, and route qualified prospects directly to your sales team.",
    "aboutNotes": [
      "Are you losing prospective customers because your Facebook page takes hours to reply to inbound messages? I engineer custom Facebook Messenger automated chatbot flows that respond within seconds, engage visitors with personalized conversations, and capture verified leads 24/7.",
      "Using industry-leading chatbot platforms like ManyChat and Chatfuel, I configure seamless FAQ flows, conditional branching based on user intent, calendar booking integration, and automatic notifications to your team when a hot lead wants human assistance.",
      "Every automation flow is designed to feel natural, interactive, and aligned with Meta's official Messenger Platform policies."
    ],
    "keyDeliverables": [
      "Complete Facebook Page & Messenger Chatbot Integration",
      "Welcome Message & Interactive Conversation Starter Menus",
      "Automated FAQ Branching Flows (Hours, Services, Pricing, Location)",
      "Lead Capture Flow with Email & Phone Number Validation",
      "Instant Email/SMS/Webhook Notification on New Lead Capture",
      "Live Chat Takeover Trigger for Human Agents",
      "Messenger Persistent Menu & Quick Reply Buttons",
      "Full Step-by-Step Video Walkthrough & 14-Day Warranty"
    ],
    "whyChoose": [
      "Instant 24/7 Lead Response (Zero Missed Opportunities)",
      "ManyChat & Meta API Certified Best Practices",
      "Natural, High-Converting Conversational Copywriting",
      "Seamless CRM & Google Sheets Integration"
    ],
    "workProcess": [
      {
        "step": "01",
        "title": "Consultation & Flow Mapping",
        "desc": "Analyzing your customer inquiry patterns and designing the conversation logic flowchart."
      },
      {
        "step": "02",
        "title": "Chatbot Build & Branching",
        "desc": "Constructing automated messages, quick replies, and conditional logic."
      },
      {
        "step": "03",
        "title": "Lead Integration & Testing",
        "desc": "Connecting lead alerts to your email/CRM and testing all triggers on mobile."
      },
      {
        "step": "04",
        "title": "Deployment & Handover",
        "desc": "Launching live on your Facebook Page with complete admin documentation."
      }
    ],
    "tools": [
      "ManyChat",
      "Meta Business Suite",
      "Facebook Messenger API",
      "Make / Zapier",
      "Google Sheets"
    ],
    "faqs": [
      {
        "q": "Do I need a paid ManyChat account?",
        "a": "The basic package works on ManyChat Free. For advanced features (unlimited contacts, SMS, Zapier webhooks), ManyChat Pro ($15/mo) is recommended."
      },
      {
        "q": "Will this comply with Facebook Messenger 24-hour messaging rules?",
        "a": "Yes! All chatbot flows are strictly designed within Meta's official messaging policy and standard tags."
      },
      {
        "q": "Can my human team take over chats anytime?",
        "a": "Absolutely! The chatbot includes a smart pause feature whenever a human agent starts typing in Meta Business Suite."
      }
    ],
    "reviews": [
      {
        "name": "Marcus Sterling",
        "country": "United States",
        "rating": 5,
        "date": "2 days ago",
        "comment": "Our response time went from 3 hours to 2 seconds. Captured 37 qualified buyer leads in the first 48 hours!"
      },
      {
        "name": "Sophia Lin",
        "country": "Singapore",
        "rating": 5,
        "date": "1 week ago",
        "comment": "The chatbot flow is super smooth and human-like. Highly recommended for any active business page."
      }
    ],
    "packages": {
      "basic": {
        "name": "Starter FAQ Bot",
        "price": 35,
        "deliveryDays": 3,
        "expressFee": 15,
        "expressDays": 1,
        "desc": "Welcome message, 5 core FAQ automated answers, persistent menu, and basic lead capture form.",
        "features": [
          "Welcome Greeting Flow",
          "5 Automated FAQs",
          "Contact Info Capture",
          "Persistent Menu",
          "1 Revision"
        ]
      },
      "standard": {
        "name": "Lead Gen Pro Bot",
        "price": 75,
        "deliveryDays": 5,
        "expressFee": 25,
        "expressDays": 2,
        "desc": "Advanced conversational flow: 12 FAQs, lead qualification scoring, Google Sheets CRM sync, and human live chat handover.",
        "features": [
          "Full Lead Qualification Funnel",
          "Up to 12 Automated FAQs",
          "Google Sheets Sync",
          "Human Takeover Triggers",
          "Email Lead Alerts",
          "2 Revisions"
        ]
      },
      "premium": {
        "name": "Omni-Sales Chatbot Funnel",
        "price": 140,
        "deliveryDays": 7,
        "expressFee": 45,
        "expressDays": 3,
        "desc": "Full-scale automated sales system: unlimited flows, broadcast tag setup, CRM/Calendly booking integration, and 30-day support.",
        "features": [
          "Unlimited Flow Steps",
          "Appointment / Calendly Booking",
          "CRM Integration (HubSpot / Webhook)",
          "Broadcasting Strategy",
          "VIP Priority Support",
          "Unlimited Revisions"
        ]
      }
    },
    "addons": [
      {
        "id": "ad-fb-bot-1",
        "name": "Google Sheets Real-time CRM Sync",
        "price": 20
      },
      {
        "id": "ad-fb-bot-2",
        "name": "Calendly / Cal.com Appointment Booking Integration",
        "price": 25
      }
    ]
  },
  {
    "id": "srv-auto-whatsapp",
    "name": "WhatsApp Automation & Chatbot",
    "slug": "whatsapp-automation-chatbot",
    "category": "automation",
    "categoryName": "Automation Services",
    "badge": "HOT TREND",
    "gigTitle": "I will build WhatsApp business chatbots, auto-replies, and customer messaging workflows.",
    "coverImage": "https://images.unsplash.com/photo-1614680376593-902f749f7ffc?auto=format&fit=crop&w=1000&q=80",
    "rating": "5.0",
    "reviewsCount": 51,
    "ordersInQueue": 4,
    "description": "Professional WhatsApp Business API and cloud chatbot automation for instant customer inquiries, catalog browsing, automated greetings, order updates, and CRM sync.",
    "aboutNotes": [
      "WhatsApp is the world's most direct and personal communication channel with a 98% open rate. I set up automated WhatsApp Business chatbots and messaging workflows that engage clients immediately, reduce customer support workload, and drive high-intent sales conversions.",
      "Whether you are using WhatsApp Business App or the official WhatsApp Cloud API via ManyChat, Wati, or Twilio, I configure interactive list messages, button menus, auto-replies for out-of-hours, and intelligent query routing.",
      "Get an automated customer assistant that works tirelessly 24 hours a day on your clients' preferred messaging app."
    ],
    "keyDeliverables": [
      "WhatsApp Cloud API or WhatsApp Business Account Configuration",
      "Interactive List Menus & Quick Action Reply Buttons",
      "Automated Welcome Greeting & Away Messages",
      "Product / Service Catalog Inquiries & Quotation Flow",
      "Order Status Lookup & Milestone Notification Trigger",
      "Lead Capture & Google Sheets / CRM Webhook Sync",
      "Multi-Agent Team Routing & Human Escalation Rules",
      "Full Testing & Interactive Flow Walkthrough Video"
    ],
    "whyChoose": [
      "98% Open Rate Channel Optimization",
      "Official Meta WhatsApp API Guidelines Compliant",
      "Interactive Menus & Clickable Action Buttons",
      "Fast 3 to 5-Day Turnaround"
    ],
    "workProcess": [
      {
        "step": "01",
        "title": "Setup & Platform Audit",
        "desc": "Reviewing your WhatsApp number status and choosing the best automation stack."
      },
      {
        "step": "02",
        "title": "Menu & Flow Architecture",
        "desc": "Crafting button menus, catalog queries, and auto-reply scripts."
      },
      {
        "step": "03",
        "title": "CRM & Alert Integration",
        "desc": "Syncing collected customer details with Google Sheets or your CRM."
      },
      {
        "step": "04",
        "title": "Live Testing & Launch",
        "desc": "Running live message tests across iOS and Android devices."
      }
    ],
    "tools": [
      "WhatsApp Cloud API",
      "ManyChat WhatsApp",
      "Wati / Twilio",
      "Make / Zapier",
      "Google Sheets"
    ],
    "faqs": [
      {
        "q": "Can this work with my existing WhatsApp number?",
        "a": "Yes! For WhatsApp Business App, standard auto-responders work right away. For WhatsApp Cloud API bots, you need a phone number that can receive an SMS verification code."
      },
      {
        "q": "Can the bot send product catalogs and pictures?",
        "a": "Yes, the bot can send rich media including images, PDF brochures, location pins, and clickable payment/booking links."
      },
      {
        "q": "Are there monthly messaging fees?",
        "a": "Meta provides 1,000 free service conversations per month on WhatsApp Cloud API. We will configure your bot to stay within the most cost-effective tier."
      }
    ],
    "reviews": [
      {
        "name": "Kareem Al-Mansoor",
        "country": "United Arab Emirates",
        "rating": 5,
        "date": "3 days ago",
        "comment": "Our restaurant gets 100+ WhatsApp inquiries daily. The automated menu bot handles 80% of them without any human intervention!"
      },
      {
        "name": "Mateo Rossi",
        "country": "Italy",
        "rating": 5,
        "date": "1 week ago",
        "comment": "Super fast delivery and flawless setup. The button menus make our customer support look ultra-professional."
      }
    ],
    "packages": {
      "basic": {
        "name": "Starter WhatsApp Bot",
        "price": 40,
        "deliveryDays": 3,
        "expressFee": 15,
        "expressDays": 1,
        "desc": "Welcome message, out-of-office autoreply, and 6 core interactive button/list answers.",
        "features": [
          "Welcome & Away Messages",
          "6 Interactive Menus / FAQs",
          "Basic Contact Collection",
          "Mobile Setup Guide",
          "1 Revision"
        ]
      },
      "standard": {
        "name": "Pro Business Automation",
        "price": 85,
        "deliveryDays": 5,
        "expressFee": 30,
        "expressDays": 2,
        "desc": "Complete interactive workflow: catalog sharing, lead qualification, Google Sheets sync, and multi-agent routing.",
        "features": [
          "Interactive Button & List Menus",
          "Catalog & PDF Sharing",
          "Google Sheets Lead Database",
          "Multi-Agent Support Routing",
          "2 Revisions"
        ]
      },
      "premium": {
        "name": "Enterprise Cloud API Funnel",
        "price": 160,
        "deliveryDays": 7,
        "expressFee": 50,
        "expressDays": 3,
        "desc": "Full WhatsApp Cloud API architecture: custom webhook triggers, CRM synchronization, broadcast templates, and priority maintenance.",
        "features": [
          "Official WhatsApp Cloud API Setup",
          "Custom Webhooks & CRM Sync",
          "Pre-approved Broadcast Templates",
          "Automated Reminder Workflows",
          "Priority Support",
          "Unlimited Revisions"
        ]
      }
    },
    "addons": [
      {
        "id": "ad-wa-1",
        "name": "Google Sheets Real-time Order Logger",
        "price": 25
      },
      {
        "id": "ad-wa-2",
        "name": "Pre-Approved Meta Message Template Setup",
        "price": 30
      }
    ]
  },
  {
    "id": "srv-auto-gmail-workflow",
    "name": "Gmail / Email Workflow Automation",
    "slug": "gmail-email-workflow-automation",
    "category": "automation",
    "categoryName": "Automation Services",
    "badge": "PRODUCTIVITY",
    "gigTitle": "I will automate Gmail filters, automated cold outreach, follow-ups, and inbox organization.",
    "coverImage": "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=1000&q=80",
    "rating": "5.0",
    "reviewsCount": 38,
    "ordersInQueue": 2,
    "description": "Streamline your email inbox with automated Gmail filters, smart label hierarchies, auto-responders, cold email sequences, automated follow-up sequences, and CRM pipeline triggers.",
    "aboutNotes": [
      "Drowning in hundreds of unread emails or wasting hours manually following up on client proposals? I design clean, automated Gmail and Google Workspace workflows that organize your inbox effortlessly and put your follow-up sequence on complete autopilot.",
      "From automated lead intake parsing that extracts inquiry details straight into your spreadsheet, to multi-stage cold outreach campaigns with smart conditional follow-ups that stop when a prospect replies, everything is built for maximum productivity.",
      "Never let an important lead slip through the cracks again."
    ],
    "keyDeliverables": [
      "Complete Gmail Filter Rules & Smart Color-Coded Label Architecture",
      "Automated Email Intake Parser (extracting client details to Google Sheets)",
      "Multi-Step Automated Follow-Up Sequences (Day 1, Day 3, Day 7)",
      "Automatic Reply Stop when a prospect responds",
      "Professional Email Signature & Custom Template Canned Responses",
      "Spam Filter Tuning & Domain Deliverability Health Check (SPF, DKIM, DMARC)",
      "Zapier / Make / Google Apps Script Background Automation",
      "Comprehensive Video Tutorial for Your Team"
    ],
    "whyChoose": [
      "Inbox Zero Daily Architecture",
      "Zero Missed Follow-ups on Proposals and Invoices",
      "100% Native Google Workspace & Apps Script Integration",
      "High Deliverability (SPF/DKIM/DMARC audited)"
    ],
    "workProcess": [
      {
        "step": "01",
        "title": "Inbox & Workflow Audit",
        "desc": "Identifying bottlenecks, repetitive emails, and lead tracking requirements."
      },
      {
        "step": "02",
        "title": "Filters & Label Structure",
        "desc": "Building automated rules to categorize and prioritize incoming correspondence."
      },
      {
        "step": "03",
        "title": "Sequencing & Apps Script",
        "desc": "Programming automated follow-ups and data extraction into Google Sheets."
      },
      {
        "step": "04",
        "title": "Deliverability & Training",
        "desc": "Verifying DNS email authentication and providing a step-by-step walkthrough."
      }
    ],
    "tools": [
      "Gmail & Google Workspace",
      "Google Apps Script",
      "Google Sheets",
      "Make / Zapier",
      "Mailmeteor / Instantly"
    ],
    "faqs": [
      {
        "q": "Will you need my Gmail password?",
        "a": "No! You never share passwords. We can use Google Workspace Delegate Access, Google Apps Script sharing, or a brief screenshare session."
      },
      {
        "q": "Does this work with custom domain emails (e.g., name@mycompany.com)?",
        "a": "Yes! Both free personal @gmail.com accounts and paid Google Workspace business accounts are fully supported."
      },
      {
        "q": "Can follow-up emails stop automatically when someone replies?",
        "a": "Yes! The sequence detects incoming replies and instantly cancels further follow-up drafts for that contact."
      }
    ],
    "reviews": [
      {
        "name": "David Hensley",
        "country": "Canada",
        "rating": 5,
        "date": "4 days ago",
        "comment": "Ruddranil saved me at least 10 hours a week! My inbox is finally organized and cold leads are getting automated follow-ups on time."
      },
      {
        "name": "Claire Dupont",
        "country": "France",
        "rating": 5,
        "date": "2 weeks ago",
        "comment": "The email parsing into Google Sheets works like magic. Very impressed with the technical execution."
      }
    ],
    "packages": {
      "basic": {
        "name": "Inbox Zero & Filters",
        "price": 30,
        "deliveryDays": 2,
        "expressFee": 15,
        "expressDays": 1,
        "desc": "10 custom Gmail filter rules, 5 color-coded labels, canned templates, and inbox cleanup strategy.",
        "features": [
          "10 Automated Filters",
          "5 Color-coded Labels",
          "3 Canned Response Templates",
          "Inbox Zero Setup Guide",
          "1 Revision"
        ]
      },
      "standard": {
        "name": "Outreach & Follow-Up System",
        "price": 65,
        "deliveryDays": 4,
        "expressFee": 25,
        "expressDays": 2,
        "desc": "Automated 3-step follow-up email sequence, lead parsing to Google Sheets, and domain deliverability audit.",
        "features": [
          "3-Step Follow-Up Sequence",
          "Auto-Stop on Reply",
          "Email to Google Sheets Parser",
          "SPF / DKIM Health Audit",
          "2 Revisions"
        ]
      },
      "premium": {
        "name": "Full Automation Ecosystem",
        "price": 120,
        "deliveryDays": 6,
        "expressFee": 40,
        "expressDays": 3,
        "desc": "End-to-end email engine: custom Google Apps Script automation, multi-campaign outreach setup, CRM sync, and team training.",
        "features": [
          "Custom Google Apps Script Engine",
          "Multi-Campaign Outreach Setup",
          "Two-Way CRM Integration",
          "DNS Deliverability Optimization",
          "Video Tutorial & Handover",
          "Unlimited Revisions"
        ]
      }
    },
    "addons": [
      {
        "id": "ad-gm-1",
        "name": "SPF, DKIM & DMARC DNS Deliverability Setup",
        "price": 25
      },
      {
        "id": "ad-gm-2",
        "name": "Custom Google Apps Script Function Extension",
        "price": 35
      }
    ]
  }
];
window.DEFAULT_SERVICES = DEFAULT_SERVICES;

// Default Authoritative Coupons
var DEFAULT_COUPONS = window.DEFAULT_COUPONS || [
  {
    code: 'WELCOME10',
    type: 'percentage', // percentage | fixed
    value: 10,
    minOrder: 20,
    maxDiscount: 50,
    active: true,
    timesUsed: 0
  },
  {
    code: 'RUDDRA20',
    type: 'fixed',
    value: 20,
    minOrder: 60,
    maxDiscount: null,
    active: true,
    timesUsed: 0
  },
  {
    code: 'FIRSTORDER',
    type: 'percentage',
    value: 15,
    minOrder: 25,
    maxDiscount: 40,
    active: true,
    timesUsed: 0
  }
];
window.DEFAULT_COUPONS = DEFAULT_COUPONS;

// Active State for Order Modal Session
var currentOrderState = window.currentOrderState || {
  service: null,
  packageTier: 'basic', // basic | standard | premium
  isExpress: false,
  selectedAddons: [], // array of addon ids
  couponCode: '',
  discountAmount: 0,
  uploadedFiles: []
};
window.currentOrderState = currentOrderState;

// Default Showcase Portfolio Projects (My Work & Latest Updates)
var DEFAULT_PORTFOLIO_PROJECTS = [
  {
    "id": "proj-01",
    "title": "Targeted Ads & Campaign Setup",
    "category": "Digital Marketing",
    "categorySlug": "marketing",
    "badge": "Project 01",
    "description": "High-converting Facebook and Instagram advertising campaign built for laser-focused audience targeting, brand awareness, and positive ROI.",
    "details": "Full-funnel campaign structure featuring pixel tracking, custom audience segments, high-converting ad copy, mobile-optimized creative sets, and ROAS optimization.",
    "author": "Ruddranil",
    "mediaUrl": "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80",
    "mediaType": "image",
    "likesCount": 34,
    "commentsCount": 6,
    "serviceSlug": "Facebook & Instagram Ads Campaign",
    "createdAt": "2026-10-25T10:00:00Z"
  },
  {
    "id": "proj-02",
    "title": "Full-Suite SEO & Web Ranking",
    "category": "Digital Marketing",
    "categorySlug": "marketing",
    "badge": "Project 02",
    "description": "Comprehensive on-page, technical, and off-page SEO optimization structured to increase organic traffic and rank key search terms on Google.",
    "details": "Complete site audit, schema markup injection, core web vitals speed optimization, keyword cannibalization fixes, and high-authority contextual backlink strategy.",
    "author": "Ruddranil",
    "mediaUrl": "https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?auto=format&fit=crop&w=800&q=80",
    "mediaType": "image",
    "likesCount": 29,
    "commentsCount": 4,
    "serviceSlug": "Search Engine Optimization (SEO)",
    "createdAt": "2026-10-25T11:00:00Z"
  },
  {
    "id": "proj-03",
    "title": "Social Media Growth & Management",
    "category": "Digital Marketing",
    "categorySlug": "marketing",
    "badge": "Project 03",
    "description": "End-to-end social media profile handling, consistent content scheduling, and community engagement strategies to build an active following.",
    "details": "Curated monthly content calendars, aesthetic grid layout, hashtag taxonomy, community DM responses, and organic audience engagement protocols.",
    "author": "Ruddranil",
    "mediaUrl": "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=800&q=80",
    "mediaType": "image",
    "likesCount": 42,
    "commentsCount": 7,
    "serviceSlug": "Social Media Management",
    "createdAt": "2026-10-25T12:00:00Z"
  },
  {
    "id": "proj-04",
    "title": "Google Ads & PPC Lead Generation",
    "category": "Digital Marketing",
    "categorySlug": "marketing",
    "badge": "Project 04",
    "description": "High-intent Google Search and Display ad campaign configured for lower cost-per-click and maximized inbound leads.",
    "details": "Exact match keyword architecture, negative keyword blocklists, dynamic sitelink assets, responsive search ad copywriting, and conversion action tracking.",
    "author": "Ruddranil",
    "mediaUrl": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    "mediaType": "image",
    "likesCount": 38,
    "commentsCount": 5,
    "serviceSlug": "Google Ads / PPC Expert",
    "createdAt": "2026-10-25T13:00:00Z"
  },
  {
    "id": "proj-05",
    "title": "Email Marketing & Drip Campaign",
    "category": "Digital Marketing",
    "categorySlug": "marketing",
    "badge": "Project 05",
    "description": "Responsive newsletter layouts and automated behavioral drip workflows built to retain subscribers and boost repeat conversions.",
    "details": "Welcome sequences, abandoned cart triggers, promotional broadcast templates, mobile-first responsive HTML design, and SPF/DKIM inbox placement optimization.",
    "author": "Ruddranil",
    "mediaUrl": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    "mediaType": "image",
    "likesCount": 27,
    "commentsCount": 3,
    "serviceSlug": "Email Marketing Automation",
    "createdAt": "2026-10-25T14:00:00Z"
  },
  {
    "id": "proj-06",
    "title": "YouTube Video SEO & Tag Optimization",
    "category": "YouTube Services",
    "categorySlug": "youtube",
    "badge": "Project 06",
    "description": "Complete metadata overhaul including VidIQ optimization, keyword-focused titles, detailed descriptions, and targeted tags for algorithmic reach.",
    "details": "Algorithmic search term ranking, VidIQ SEO 50/50 score compliance, timestamps chapter structure, info cards, and end screen viewer retention loop.",
    "author": "Ruddranil",
    "mediaUrl": "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80",
    "mediaType": "image",
    "likesCount": 45,
    "commentsCount": 8,
    "serviceSlug": "YouTube Video SEO & Optimization",
    "createdAt": "2026-10-26T10:00:00Z"
  },
  {
    "id": "proj-07",
    "title": "YouTube Channel Organic Growth",
    "category": "YouTube Services",
    "categorySlug": "youtube",
    "badge": "Project 07",
    "description": "Full channel management strategy covering regular schedule optimization, playlist architecture, and organic viewer retention methods.",
    "details": "Channel homepage redesign, featured trailer placement, topical playlist grouping, community tab polls, and viewer engagement moderation.",
    "author": "Ruddranil",
    "mediaUrl": "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=800&q=80",
    "mediaType": "image",
    "likesCount": 52,
    "commentsCount": 9,
    "serviceSlug": "YouTube Channel Growth & Management",
    "createdAt": "2026-10-26T11:00:00Z"
  },
  {
    "id": "proj-08",
    "title": "High-CTR Thumbnail Design",
    "category": "YouTube Services",
    "categorySlug": "youtube",
    "badge": "Project 08",
    "description": "Bold, eye-catching, and click-optimized thumbnail art created to significantly raise impression click-through rates.",
    "details": "High-contrast typography, facial expression cutout enhancement, glowing outlines, color grading, and A/B tested visual psychology layout.",
    "author": "Ruddranil",
    "mediaUrl": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    "mediaType": "image",
    "likesCount": 61,
    "commentsCount": 12,
    "serviceSlug": "YouTube Thumbnail Design",
    "createdAt": "2026-10-26T12:00:00Z"
  },
  {
    "id": "proj-09",
    "title": "YouTube Long-Form Video Editing",
    "category": "YouTube Services",
    "categorySlug": "youtube",
    "badge": "Project 09",
    "description": "Dynamic video editing featuring clean transitions, motion graphics, audio mastering, subtitles, and engaging B-roll pacing.",
    "details": "Premiere Pro & After Effects workflow with multi-cam sync, color grading, SFX sound design, narrative pacing, and YouTube compression export.",
    "author": "Ruddranil",
    "mediaUrl": "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
    "mediaType": "image",
    "likesCount": 48,
    "commentsCount": 6,
    "serviceSlug": "YouTube Video Editing",
    "createdAt": "2026-10-26T13:00:00Z"
  },
  {
    "id": "proj-10",
    "title": "YouTube Video Ads Campaign",
    "category": "YouTube Services",
    "categorySlug": "youtube",
    "badge": "Project 10",
    "description": "Targeted YouTube discovery and in-stream ad setups designed to accelerate channel subscriber growth and video view velocity.",
    "details": "Google Ads video campaign setup, in-feed discovery placement, competitor channel targeting, low CPV bid strategy, and audience exclusions.",
    "author": "Ruddranil",
    "mediaUrl": "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=800&q=80",
    "mediaType": "image",
    "likesCount": 39,
    "commentsCount": 4,
    "serviceSlug": "YouTube Ads Campaign Setup",
    "createdAt": "2026-10-26T14:00:00Z"
  },
  {
    "id": "proj-11",
    "title": "Viral Shorts & Reels Production",
    "category": "YouTube Services",
    "categorySlug": "youtube",
    "badge": "Project 11",
    "description": "Fast-paced vertical short-form video creation with kinetic typography, hooks, and sound effects tailored for viral distribution.",
    "details": "9:16 vertical framing, 3-second visual hook, animated word-by-word captions, sound effects, trending audio syncing, and seamless loop design.",
    "author": "Ruddranil",
    "mediaUrl": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    "mediaType": "image",
    "likesCount": 57,
    "commentsCount": 11,
    "serviceSlug": "YouTube Shorts & Automation",
    "createdAt": "2026-10-26T15:00:00Z"
  },
  {
    "id": "proj-12",
    "title": "Modern Logo & Brand Identity",
    "category": "Creative Design",
    "categorySlug": "design",
    "badge": "Project 12",
    "description": "Distinctive logo creation backed by full brand guidelines, color palettes, and typographic styling for consistent business branding.",
    "details": "Vector primary logo, monochrome variant, favicon, official color codes (HEX/CMYK), typography pairings, and brand presentation deck.",
    "author": "Ruddranil",
    "mediaUrl": "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
    "mediaType": "image",
    "likesCount": 64,
    "commentsCount": 14,
    "serviceSlug": "Logo & Brand Identity",
    "createdAt": "2026-10-27T10:00:00Z"
  },
  {
    "id": "proj-13",
    "title": "Social Media Creative Assets",
    "category": "Creative Design",
    "categorySlug": "design",
    "badge": "Project 13",
    "description": "Creative visual banners, feed posts, and promotional templates designed to maintain visual authority across all digital networks.",
    "details": "Cohesive multi-platform banner pack (LinkedIn, Twitter/X, Facebook, YouTube), carousel post templates, and high-impact promo ads.",
    "author": "Ruddranil",
    "mediaUrl": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
    "mediaType": "image",
    "likesCount": 46,
    "commentsCount": 8,
    "serviceSlug": "Social Media Post & Banner Design",
    "createdAt": "2026-10-27T11:00:00Z"
  },
  {
    "id": "proj-14",
    "title": "UI/UX Interface Prototype",
    "category": "Creative Design",
    "categorySlug": "design",
    "badge": "Project 14",
    "description": "Modern, clean, and responsive web/mobile interface designs developed in Figma with user-centric interaction models.",
    "details": "Wireframing, auto-layout component library, design tokens, micro-interactions, clickable high-fidelity prototype, and developer handover specs.",
    "author": "Ruddranil",
    "mediaUrl": "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80",
    "mediaType": "image",
    "likesCount": 73,
    "commentsCount": 16,
    "serviceSlug": "UI/UX Web & Mobile App Design",
    "createdAt": "2026-10-27T12:00:00Z"
  },
  {
    "id": "proj-15",
    "title": "Print-Ready Marketing Collateral",
    "category": "Creative Design",
    "categorySlug": "design",
    "badge": "Project 15",
    "description": "High-resolution flyers, tri-fold brochures, packaging layouts, and corporate business cards prepared with accurate bleed marks.",
    "details": "CMYK 300 DPI print-ready PDFs, safe margin alignments, spot UV layers, custom die-cut guidelines, and tactile paper stock recommendations.",
    "author": "Ruddranil",
    "mediaUrl": "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80",
    "mediaType": "image",
    "likesCount": 33,
    "commentsCount": 5,
    "serviceSlug": "Print Media Design",
    "createdAt": "2026-10-27T13:00:00Z"
  },
  {
    "id": "proj-16",
    "title": "Custom Vector Art & Illustration",
    "category": "Creative Design",
    "categorySlug": "design",
    "badge": "Project 16",
    "description": "Hand-crafted digital vector illustrations and clean raster-to-vector tracings optimized for web, print, and digital merchandise.",
    "details": "Scalable SVG & Adobe Illustrator source assets, custom mascot characters, isometric editorial scenes, and infinite resolution vector paths.",
    "author": "Ruddranil",
    "mediaUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
    "mediaType": "image",
    "likesCount": 51,
    "commentsCount": 9,
    "serviceSlug": "Vector Art & Illustration",
    "createdAt": "2026-10-27T14:00:00Z"
  },
  {
    "id": "proj-17",
    "title": "Spreadsheet & Database Data Entry",
    "category": "Data Operations",
    "categorySlug": "data",
    "badge": "Project 17",
    "description": "High-accuracy spreadsheet data entry, automated cell calculations, and clean database record updating across Excel and Google Sheets.",
    "details": "Error-free manual transcription, formula automation (VLOOKUP, INDEX/MATCH, XLOOKUP), conditional formatting, and organized tab hierarchy.",
    "author": "Ruddranil",
    "mediaUrl": "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=800&q=80",
    "mediaType": "image",
    "likesCount": 37,
    "commentsCount": 6,
    "serviceSlug": "Excel & Google Sheets Data Entry",
    "createdAt": "2026-10-28T10:00:00Z"
  },
  {
    "id": "proj-18",
    "title": "B2B Lead Generation & Web Research",
    "category": "Data Operations",
    "categorySlug": "data",
    "badge": "Project 18",
    "description": "Targeted corporate research delivering verified contact lists, decision-maker emails, company profiles, and structured spreadsheets.",
    "details": "Prospect research via LinkedIn Sales Navigator, corporate directory verification, direct dial & verified work email extraction with zero bounce audit.",
    "author": "Ruddranil",
    "mediaUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    "mediaType": "image",
    "likesCount": 44,
    "commentsCount": 7,
    "serviceSlug": "Web Research & B2B Lead Generation",
    "createdAt": "2026-10-28T11:00:00Z"
  },
  {
    "id": "proj-19",
    "title": "Data Cleaning & Duplicate Removal",
    "category": "Data Operations",
    "categorySlug": "data",
    "badge": "Project 19",
    "description": "Large-scale dataset scrubbing, column normalization, formatting standardization, and duplicate elimination for error-free reporting.",
    "details": "Regex pattern matching, white-space trimming, case standardization, fuzzy duplicate merging, address normalization, and validation rules.",
    "author": "Ruddranil",
    "mediaUrl": "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80",
    "mediaType": "image",
    "likesCount": 31,
    "commentsCount": 4,
    "serviceSlug": "Data Cleaning & Formatting",
    "createdAt": "2026-10-28T12:00:00Z"
  },
  {
    "id": "proj-20",
    "title": "Document Conversion & Transcription",
    "category": "Data Operations",
    "categorySlug": "data",
    "badge": "Project 20",
    "description": "Accurate data extraction and conversion from scanned PDFs, images, and handwritten records into structured Word and Excel formats.",
    "details": "OCR verification, table layout reconstruction, footnote alignment, mathematical equation formatting, and 100% typographic proofreading.",
    "author": "Ruddranil",
    "mediaUrl": "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=800&q=80",
    "mediaType": "image",
    "likesCount": 28,
    "commentsCount": 3,
    "serviceSlug": "PDF to Excel / Word Conversion",
    "createdAt": "2026-10-28T13:00:00Z"
  },
  {
    "id": "proj-21",
    "title": "E-commerce Catalog Management",
    "category": "Data Operations",
    "categorySlug": "data",
    "badge": "Project 21",
    "description": "Complete product listing creation, SKU assignment, variant configuration, and SEO description updates for online stores.",
    "details": "Shopify and WooCommerce bulk CSV uploads, high-resolution product image alt-tagging, inventory threshold tracking, and collection categorization.",
    "author": "Ruddranil",
    "mediaUrl": "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80",
    "mediaType": "image",
    "likesCount": 36,
    "commentsCount": 5,
    "serviceSlug": "E-commerce Product Listing",
    "createdAt": "2026-10-28T14:00:00Z"
  },
  {
    "id": "proj-22",
    "title": "Messenger Chatbot & Lead System",
    "category": "Business Automation",
    "categorySlug": "automation",
    "badge": "Project 22",
    "description": "Interactive Facebook Messenger automation system featuring predefined instant replies, automated booking flows, and real-time lead capture.",
    "details": "ManyChat conversational branching, 24/7 instant FAQ answers, email & phone input validation, webhook dispatch to CRM, and live human agent handoff.",
    "author": "Ruddranil",
    "mediaUrl": "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=800&q=80",
    "mediaType": "image",
    "likesCount": 49,
    "commentsCount": 10,
    "serviceSlug": "Facebook Messenger Automation",
    "createdAt": "2026-10-29T10:00:00Z"
  },
  {
    "id": "proj-23",
    "title": "WhatsApp Business Chat Automation",
    "category": "Business Automation",
    "categorySlug": "automation",
    "badge": "Project 23",
    "description": "Automated customer service workflows, scheduled follow-ups, and interactive catalog messaging for 24/7 client response.",
    "details": "WhatsApp Cloud API integration, clickable interactive action buttons, PDF product brochure dispatch, out-of-office autoreply, and Google Sheets order logger.",
    "author": "Ruddranil",
    "mediaUrl": "https://images.unsplash.com/photo-1614680376593-902f749f7ffc?auto=format&fit=crop&w=800&q=80",
    "mediaType": "image",
    "likesCount": 55,
    "commentsCount": 12,
    "serviceSlug": "WhatsApp Automation & Chatbot",
    "createdAt": "2026-10-29T11:00:00Z"
  },
  {
    "id": "proj-24",
    "title": "Gmail & Cold Outreach Automation",
    "category": "Business Automation",
    "categorySlug": "automation",
    "badge": "Project 24",
    "description": "Multi-tier email workflow setup including inbox filtering, automatic triggers, personalized outreach follow-ups, and organization rules.",
    "details": "Google Apps Script engine, automated 3-stage drip sequences with reply detection stop, color-coded label routing, and SPF/DKIM deliverability health check.",
    "author": "Ruddranil",
    "mediaUrl": "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=800&q=80",
    "mediaType": "image",
    "likesCount": 41,
    "commentsCount": 7,
    "serviceSlug": "Gmail / Email Workflow Automation",
    "createdAt": "2026-10-29T12:00:00Z"
  }
];
window.DEFAULT_PORTFOLIO_PROJECTS = DEFAULT_PORTFOLIO_PROJECTS;

// Helper: Detect video media URL
function isVideoMediaUrl(url) {
  if (!url) return false;
  const clean = url.trim().toLowerCase();
  return clean.endsWith('.mp4') || clean.endsWith('.webm') || clean.endsWith('.ogg') || clean.endsWith('.mov') ||
         clean.includes('youtube.com') || clean.includes('youtu.be') || clean.includes('vimeo.com');
}
window.isVideoMediaUrl = isVideoMediaUrl;

// Helper: Extract YouTube embed URL
function getYouTubeEmbedUrl(url) {
  if (!url) return '';
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}?rel=0&modestbranding=1`;
  }
  return url;
}
window.getYouTubeEmbedUrl = getYouTubeEmbedUrl;

// Helper: Render Media Preview HTML (Image or Video)
function renderMediaHtml(mediaUrl, title, isThumbnail = false) {
  const safeTitle = typeof escapeHtmlText === 'function' ? escapeHtmlText(title) : (title || '');
  if (!mediaUrl) {
    return `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--text-dark-gray);font-size:12px;">No Media Preview</div>`;
  }
  let cleanUrl = mediaUrl.trim();
  if (cleanUrl.startsWith('public/')) {
    cleanUrl = '/' + cleanUrl;
  }
  const isVideo = isVideoMediaUrl(cleanUrl);

  if (isVideo) {
    if (cleanUrl.includes('youtube.com') || cleanUrl.includes('youtu.be')) {
      const match = cleanUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
      if (isThumbnail && match && match[1]) {
        return `
          <img src="https://img.youtube.com/vi/${match[1]}/hqdefault.jpg" alt="${safeTitle}" loading="lazy" style="width:100%;height:100%;object-fit:cover;">
          <span class="work-media-badge">▶ Video</span>
        `;
      }
      const embedUrl = getYouTubeEmbedUrl(cleanUrl);
      return `
        <iframe src="${embedUrl}" title="${safeTitle}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy" style="width:100%;height:100%;border:none;"></iframe>
        <span class="work-media-badge">▶ Video</span>
      `;
    }
    return `
      <video src="${cleanUrl}" ${isThumbnail ? 'muted playsinline preload="metadata"' : 'controls playsinline preload="metadata"'} title="${safeTitle}" style="width:100%;height:100%;object-fit:cover;"></video>
      <span class="work-media-badge">▶ Video</span>
    `;
  }

  return `
    <img src="${cleanUrl}" alt="${safeTitle}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=80';" style="width:100%;height:100%;object-fit:cover;">
  `;
}
window.renderMediaHtml = renderMediaHtml;

// Cross-Device Server Fetch & Real-Time Sync
async function syncStoreWithServer() {
  // 1. Independent Services Sync
  try {
    if (typeof window.fetchServicesFromCloud === 'function') {
      const cloudServices = await window.fetchServicesFromCloud();
      if (Array.isArray(cloudServices) && cloudServices.length > 0) {
        localStorage.setItem('ruddranil_services', JSON.stringify(cloudServices));
        if (typeof syncPublicServicesGrid === 'function') syncPublicServicesGrid();
        window.dispatchEvent(new CustomEvent('ruddranil_services_updated', { detail: cloudServices }));
        window.dispatchEvent(new CustomEvent('ruddranil_packages_updated', { detail: cloudServices }));
      }
    } else {
      const resServ = await fetch('/api/services?t=' + Date.now());
      if (resServ.ok) {
        const serverServices = await resServ.json();
        if (Array.isArray(serverServices) && serverServices.length > 0) {
          localStorage.setItem('ruddranil_services', JSON.stringify(serverServices));
          if (typeof syncPublicServicesGrid === 'function') syncPublicServicesGrid();
          window.dispatchEvent(new CustomEvent('ruddranil_services_updated', { detail: serverServices }));
          window.dispatchEvent(new CustomEvent('ruddranil_packages_updated', { detail: serverServices }));
        }
      }
    }
  } catch (servErr) {
    console.warn('Services sync fallback notice:', servErr);
  }

  // 2. Independent Projects Showcase Sync
  try {
    const resProj = await fetch('/api/projects?t=' + Date.now());
    if (resProj.ok) {
      const serverProjects = await resProj.json();
      if (Array.isArray(serverProjects) && serverProjects.length > 0) {
        localStorage.setItem('ruddranil_portfolio_projects', JSON.stringify(serverProjects));
        if (typeof syncPublicPortfolioGrid === 'function') syncPublicPortfolioGrid();
      }
    }
  } catch (projErr) {
    console.warn('Projects sync fallback notice:', projErr);
  }
}
window.syncStoreWithServer = syncStoreWithServer;

// 1. Initialize Seed Data (Preserves all existing orders & adds services/coupons)
function initRuddranilStore() {
  syncStoreWithServer();
  // Sync Showcase Portfolio Projects (My Work & Latest Updates)
  const storedProjects = JSON.parse(localStorage.getItem('ruddranil_portfolio_projects') || '[]');
  if (!storedProjects || storedProjects.length === 0) {
    localStorage.setItem('ruddranil_portfolio_projects', JSON.stringify(DEFAULT_PORTFOLIO_PROJECTS));
  } else {
    const missingDefaults = DEFAULT_PORTFOLIO_PROJECTS.filter(def => !storedProjects.some(p => p.id === def.id));
    if (missingDefaults.length > 0) {
      localStorage.setItem('ruddranil_portfolio_projects', JSON.stringify([...storedProjects, ...missingDefaults]));
    }
  }

  // Sync Services with rich Fiverr metadata
  const storedServices = JSON.parse(localStorage.getItem('ruddranil_services') || '[]');
  if (!storedServices || storedServices.length === 0) {
    localStorage.setItem('ruddranil_services', JSON.stringify(DEFAULT_SERVICES));
  } else {
    const customServices = storedServices.filter(s => !DEFAULT_SERVICES.some(def => def.id === s.id || (def.name && s.name && def.name.toLowerCase() === s.name.toLowerCase())));
    const merged = DEFAULT_SERVICES.map(def => {
      const match = storedServices.find(s => s.id === def.id || (s.name && s.name.toLowerCase() === def.name.toLowerCase()));
      return match ? { 
        ...def, 
        ...match, 
        packages: match.packages || def.packages, 
        gigTitle: match.gigTitle || def.gigTitle, 
        description: match.description || def.description,
        coverImage: match.coverImage || def.coverImage,
        aboutNotes: (match.aboutNotes && match.aboutNotes.length > 0) ? match.aboutNotes : def.aboutNotes, 
        keyDeliverables: (match.keyDeliverables && match.keyDeliverables.length > 0) ? match.keyDeliverables : def.keyDeliverables, 
        whyChoose: (match.whyChoose && match.whyChoose.length > 0) ? match.whyChoose : def.whyChoose,
        workProcess: (match.workProcess && match.workProcess.length > 0) ? match.workProcess : def.workProcess, 
        rating: match.rating || def.rating, 
        reviewsCount: match.reviewsCount || def.reviewsCount, 
        ordersInQueue: match.ordersInQueue !== undefined ? match.ordersInQueue : def.ordersInQueue,
        faqs: (match.faqs && match.faqs.length > 0) ? match.faqs : def.faqs, 
        tools: (match.tools && match.tools.length > 0) ? match.tools : def.tools, 
        reviews: (match.reviews && match.reviews.length > 0) ? match.reviews : def.reviews 
      } : def;
    });
    localStorage.setItem('ruddranil_services', JSON.stringify([...merged, ...customServices]));
  }

  // Sync Coupons
  if (!localStorage.getItem('ruddranil_coupons')) {
    localStorage.setItem('ruddranil_coupons', JSON.stringify(DEFAULT_COUPONS));
  }

  // Sync Existing Orders with Backward Compatibility
  if (!localStorage.getItem('ruddranil_orders')) {
    const initialOrders = [
      {
        id: 'RUD-20261014-54A82697',
        customerName: 'Sanjit',
        customerEmail: 'sanjitrooy733@gmail.com',
        service: 'Facebook Marketing',
        serviceSlug: 'fb-marketing',
        packageTier: 'basic',
        packageName: 'Starter Growth',
        packagePrice: 30,
        subtotal: 30,
        discountAmount: 0,
        finalTotal: 30,
        deliveryDays: 4,
        isExpress: false,
        expressFee: 0,
        selectedAddons: [],
        addonsTotal: 0,
        couponCode: '',
        orderDate: 'Oct 14, 2026, 08:18 PM',
        lastUpdated: 'Oct 14, 2026, 08:19 PM',
        request: 'not yet',
        status: 'Pending',
        progress: 0,
        price: '$30.00'
      },
      {
        id: 'RUD-20261013-757726A3',
        customerName: 'Sanjit',
        customerEmail: 'sanjitrooy733@gmail.com',
        service: 'Facebook Marketing',
        serviceSlug: 'fb-marketing',
        packageTier: 'basic',
        packageName: 'Starter Growth',
        packagePrice: 30,
        subtotal: 30,
        discountAmount: 0,
        finalTotal: 30,
        deliveryDays: 4,
        isExpress: false,
        expressFee: 0,
        selectedAddons: [],
        addonsTotal: 0,
        couponCode: '',
        orderDate: 'Oct 13, 2026, 09:41 PM',
        lastUpdated: 'Oct 13, 2026, 09:41 PM',
        request: 'Govt add need',
        status: 'Pending',
        progress: 0,
        price: '$30.00'
      },
      {
        id: 'RUD-20261013-DB9C17B5',
        customerName: 'Sanjit',
        customerEmail: 'sanjitrooy733@gmail.com',
        service: 'Facebook Marketing',
        serviceSlug: 'fb-marketing',
        packageTier: 'basic',
        packageName: 'Starter Growth',
        packagePrice: 30,
        subtotal: 30,
        discountAmount: 0,
        finalTotal: 30,
        deliveryDays: 4,
        isExpress: false,
        expressFee: 0,
        selectedAddons: [],
        addonsTotal: 0,
        couponCode: '',
        orderDate: 'Oct 13, 2026, 09:07 PM',
        lastUpdated: 'Oct 13, 2026, 09:07 PM',
        request: 'fb page boost',
        status: 'Pending',
        progress: 0,
        price: '$30.00'
      },
      {
        id: 'RUD-2026-001',
        customerName: 'Sanjit',
        customerEmail: 'sanjitrooy733@gmail.com',
        service: 'Website Design',
        serviceSlug: 'website-design',
        packageTier: 'basic',
        packageName: 'One-Page Modern Landing',
        packagePrice: 100,
        subtotal: 100,
        discountAmount: 0,
        finalTotal: 100,
        deliveryDays: 7,
        isExpress: false,
        expressFee: 0,
        selectedAddons: [],
        addonsTotal: 0,
        couponCode: '',
        orderDate: 'Oct 10, 2026, 11:30 AM',
        lastUpdated: 'Oct 12, 2026, 04:00 PM',
        request: 'Responsive corporate agency website',
        status: 'In Progress',
        progress: 60,
        price: '$100.00'
      }
    ];
    localStorage.setItem('ruddranil_orders', JSON.stringify(initialOrders));
  }

  // Reviews
  if (!localStorage.getItem('app_reviews')) {
    const initialReviews = [
      {
        id: 'REV-101',
        name: 'Sanjit',
        role: 'Business Owner',
        rating: 5,
        comment: 'Outstanding web development work and Facebook marketing! Super responsive and delivered ahead of schedule.',
        date: 'Oct 15, 2026',
        verified: true
      },
      {
        id: 'REV-102',
        name: 'Sarah Jenkins',
        role: 'Marketing Director',
        rating: 5,
        comment: 'The YouTube SEO service doubled our organic reach within two weeks. Highly recommended!',
        date: 'Oct 11, 2026',
        verified: true
      },
      {
        id: 'REV-103',
        name: 'Alex Rivera',
        role: 'Creative Lead',
        rating: 5,
        comment: 'Clean aesthetics, high conversion design, and fantastic communication throughout the project.',
        date: 'Oct 08, 2026',
        verified: true
      }
    ];
    localStorage.setItem('app_reviews', JSON.stringify(initialReviews));
  }

  // Current session user initialized only upon actual user login via login.html
}

// 2. Global Toast Notification
function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast-notice');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-notice';
  if (type === 'error') {
    toast.style.borderLeftColor = 'var(--status-danger)';
  }
  toast.innerHTML = `<span>${message}</span>`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(15px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
window.showToast = showToast;

// 3. Document Initialization
document.addEventListener('DOMContentLoaded', () => {
  setupTheme();
  setupScrollProgress();
  initRuddranilStore();
  setupNavigation();
  setupAuthButtons();
  setupContactForm();
  setupWorkTracking();
  syncPublicServicesGrid();
  syncPublicPortfolioGrid();

  // Check if URL has ?order=service-slug to open order modal immediately ONLY on homepage (index.html or root)
  // Never run on login.html, customer-dashboard.html, or admin.html
  const currentPath = window.location.pathname || '';
  const isHomePage = currentPath.endsWith('index.html') || currentPath === '/' || currentPath.endsWith('/') || currentPath === '';

  const params = new URLSearchParams(window.location.search);
  const orderTarget = params.get('order');
  const tierTarget = params.get('tier') || 'basic';

  if (orderTarget && isHomePage) {
    // Immediately sanitize URL to eliminate infinite reload/back-button modal loops
    try {
      const cleanUrl = window.location.pathname + (window.location.hash || '');
      window.history.replaceState({}, document.title, cleanUrl);
    } catch (e) {}

    setTimeout(async () => {
      let loggedIn = false;
      if (typeof isCustomerLoggedIn === 'function') {
        loggedIn = isCustomerLoggedIn();
      }

      // Check active Supabase session if localStorage was not populated yet
      if (!loggedIn && window.sbClient && window.sbClient.auth) {
        try {
          const { data: { session } } = await window.sbClient.auth.getSession();
          if (session?.user) {
            loggedIn = true;
            if (typeof window.getCurrentCustomerSession === 'function') {
              await window.getCurrentCustomerSession();
            }
          }
        } catch (e) {}
      }

      if (loggedIn) {
        if (typeof openFiverrOrderModal === 'function') {
          openFiverrOrderModal(orderTarget, tierTarget);
        }
      } else if (typeof openOrderLoginPromptModal === 'function') {
        openOrderLoginPromptModal(orderTarget, tierTarget);
      }
    }, 250);
  }
});

// 4. Responsive Navigation & Animated Hamburger
function setupNavigation() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  let navBackdrop = document.getElementById('navBackdrop');

  if (!navBackdrop) {
    navBackdrop = document.createElement('div');
    navBackdrop.id = 'navBackdrop';
    navBackdrop.className = 'nav-backdrop';
    document.body.appendChild(navBackdrop);
  }

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    navBackdrop.addEventListener('click', closeMobileMenu);

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  function openMobileMenu() {
    navMenu.classList.add('open');
    menuToggle.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
    navBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    navMenu.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    navBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// 5. Auth Buttons Synchronization
function setupAuthButtons() {
  let currentUser = null;
  try {
    currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  } catch (e) {
    currentUser = null;
  }

  const navLoginBtn = document.getElementById('navLoginBtn');
  const mobileAuthContainer = document.getElementById('navMobileAuthContainer');

  const isLoggedIn = Boolean(currentUser && currentUser.email);
  const authLabel = isLoggedIn 
    ? (currentUser.role === 'admin' ? '🔐 Admin Console' : 'Profile')
    : 'Login Now';

  const authTarget = isLoggedIn 
    ? (currentUser.role === 'admin' ? 'admin.html' : 'customer-dashboard.html')
    : 'login.html';

  if (navLoginBtn) {
    navLoginBtn.textContent = authLabel;
    if (isLoggedIn && currentUser.role === 'admin') {
      navLoginBtn.classList.add('btn-admin');
    } else {
      navLoginBtn.classList.remove('btn-admin');
    }
    navLoginBtn.onclick = () => {
      window.location.href = authTarget;
    };
  }

  if (mobileAuthContainer) {
    mobileAuthContainer.innerHTML = `
      <a href="${authTarget}" class="btn btn-primary btn-block" style="justify-content: center; font-weight: 700;">
        ${authLabel}
      </a>
      ${isLoggedIn ? `
        <button onclick="logoutUser()" class="btn btn-secondary btn-block btn-sm" style="margin-top: 4px; justify-content: center;">
          Sign Out (${currentUser.name || 'Account'})
        </button>
      ` : ''}
    `;
  }
}

// 5b. Dual Theme Management (Dark & Light Mode)
function setupTheme() {
  let savedTheme = 'dark';
  try {
    savedTheme = localStorage.getItem('ruddranil_theme') || 'dark';
  } catch (e) {
    savedTheme = 'dark';
  }

  applyTheme(savedTheme, false);

  const toggles = document.querySelectorAll('.btn-theme-toggle');
  toggles.forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      toggleTheme();
    };
  });
}

function toggleTheme() {
  const active = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = active === 'light' ? 'dark' : 'light';
  applyTheme(next, true);
  if (typeof showToast === 'function') {
    showToast(next === 'light' ? 'Switched to Light Theme ☀️' : 'Switched to Dark Theme 🌙');
  }
}
window.toggleTheme = toggleTheme;

function applyTheme(theme, animate = true) {
  if (animate) {
    document.documentElement.classList.add('theme-transitioning');
  }

  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem('ruddranil_theme', theme);
  } catch (e) {}

  // Update all toggles on the page
  const toggles = document.querySelectorAll('.btn-theme-toggle');
  toggles.forEach(btn => {
    const icon = btn.querySelector('.theme-icon-indicator');
    const label = btn.querySelector('.theme-text-label');
    if (theme === 'light') {
      if (icon) icon.textContent = '☀️';
      if (label) label.textContent = 'Light';
      btn.setAttribute('aria-label', 'Switch to dark theme');
      btn.title = 'Switch to Dark Theme 🌙';
    } else {
      if (icon) icon.textContent = '🌙';
      if (label) label.textContent = 'Dark';
      btn.setAttribute('aria-label', 'Switch to light theme');
      btn.title = 'Switch to Light Theme ☀️';
    }
  });

  if (animate) {
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 320);
  }
}
window.applyTheme = applyTheme;

// Subtle Scroll Progress Bar
function setupScrollProgress() {
  let bar = document.getElementById('readingProgressBar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'readingProgressBar';
    bar.className = 'reading-progress-bar';
    document.body.prepend(bar);
  }

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      const scrolled = (scrollTop / docHeight) * 100;
      bar.style.width = `${Math.min(100, Math.max(0, scrolled))}%`;
    }
  }, { passive: true });
}

// ============================================================================
// 6. Fiverr-Style Customer Order Experience (Fix #2, #5, #11)
// ============================================================================

function escapeHtmlText(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Filter Public Services by Category Tab
window.activeServiceCategory = window.activeServiceCategory || 'all';

window.filterServices = function(category) {
  window.activeServiceCategory = category;
  const cards = document.querySelectorAll('#servicesGrid .service-card');
  const buttons = document.querySelectorAll('.service-filter-btn');

  buttons.forEach(btn => {
    if (btn.getAttribute('data-category') === category) {
      btn.classList.add('active');
      btn.classList.remove('btn-secondary');
      btn.classList.add('btn-primary');
    } else {
      btn.classList.remove('active');
      btn.classList.remove('btn-primary');
      btn.classList.add('btn-secondary');
    }
  });

  cards.forEach(card => {
    const cardCat = (card.getAttribute('data-category') || '').toLowerCase();
    const target = (category || 'all').toLowerCase();
    let isMatch = target === 'all';
    if (!isMatch) {
      if (target === 'digital-marketing') {
        isMatch = cardCat.includes('market') || cardCat.includes('seo') || cardCat.includes('digital');
      } else if (target === 'youtube') {
        isMatch = cardCat.includes('youtube');
      } else if (target === 'graphic-design') {
        isMatch = cardCat.includes('design') || cardCat.includes('graphic');
      } else if (target === 'data-entry') {
        isMatch = cardCat.includes('data') || cardCat.includes('entry') || cardCat.includes('va') || cardCat.includes('assistant');
      } else {
        isMatch = cardCat === target || cardCat.includes(target);
      }
    }
    card.style.display = isMatch ? 'flex' : 'none';
  });
};

// Dynamically sync and display all services (including newly published gigs) on the public site
function syncPublicServicesGrid() {
  const grid = document.getElementById('servicesGrid') || (document.getElementById('services') ? document.getElementById('services').querySelector('.services-grid') : null);
  if (!grid || grid.id === 'reviewsFeedContainer' || document.getElementById('reviewsFeedContainer') === grid) return;

  const services = JSON.parse(localStorage.getItem('ruddranil_services') || '[]');
  if (!services || services.length === 0) return;

  // Re-render all services cleanly and uniformly (no raw description on card, as requested by user)
  grid.innerHTML = services.map(s => {
    const slug = s.slug || (s.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const basic = s.packages?.basic || { price: 30, deliveryDays: 3 };
    const cover = s.coverImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80';
    const badge = s.badge ? `<span class="service-badge" style="position: absolute; top: 12px; right: 12px; background: #0284c7; color: #fff; padding: 3px 8px; border-radius: 4px; font-size: 10px; font-weight: 700; z-index: 2;">${escapeHtmlText(s.badge)}</span>` : '';
    const catLabel = escapeHtmlText(s.categoryName || (s.category || 'Service').replace(/-/g, ' '));
    const safeId = escapeHtmlText(s.id || s.name);
    const safeName = escapeHtmlText(s.name);
    const safeTitle = escapeHtmlText(s.gigTitle || ('I will provide professional ' + s.name + ' services'));
    const catSlug = (s.category || 'other').toLowerCase();

    return `
      <div class="service-card" id="service-${slug}" data-category="${catSlug}">
        <div class="service-cover-wrap" style="position: relative;">
          <span class="service-category-badge" style="position: absolute; top: 12px; left: 12px; z-index: 2; font-size: 10px; font-weight: 700; background: rgba(15, 23, 42, 0.88); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.35); padding: 3px 8px; border-radius: 4px; text-transform: uppercase;">${catLabel}</span>
          ${badge}
          <img src="${cover}" alt="${safeName}" class="service-cover-img" loading="lazy">
        </div>
        <div class="service-card-body">
          <h3 class="service-name">${safeName}</h3>
          <h4 class="service-gig-title">${safeTitle}</h4>
          <div class="service-footer-divider"></div>
          <div class="service-footer-meta">
            <div class="service-price-block">
              <span class="meta-label">STARTING FROM</span>
              <span class="meta-price">$${basic.price}</span>
            </div>
            <div class="service-delivery-block">
              <svg class="delivery-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <div class="delivery-text-group">
                <span class="meta-label">DELIVERY</span>
                <span class="meta-delivery-val">${basic.deliveryDays} Days</span>
              </div>
            </div>
          </div>
          <div class="service-card-actions">
            <button type="button" onclick="openServiceDetails('${safeId}')" class="btn btn-service-details" aria-label="View ${safeName} details">Details</button>
            <button type="button" onclick="orderServiceDirect('${safeId}')" class="btn btn-service-order" aria-label="Order ${safeName}">Order Now</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Re-apply active category filter
  if (typeof window.filterServices === 'function') {
    window.filterServices(window.activeServiceCategory || 'all');
  }

  // Dynamically update the Contact form select dropdown so new gigs are orderable via inquiry
  const contactSelect = document.getElementById('contactService');
  if (contactSelect) {
    const currentVal = contactSelect.value;
    contactSelect.innerHTML = `
      <option value="Select a service">Select a service</option>
      ${services.map(s => {
        const bp = s.packages?.basic?.price || 30;
        const bd = s.packages?.basic?.deliveryDays || 3;
        return `<option value="${escapeHtmlText(s.name)}" ${s.name === currentVal ? 'selected' : ''}>${escapeHtmlText(s.name)} ($${bp} · ${bd} Days)</option>`;
      }).join('')}
    `;
  }
}
window.syncPublicServicesGrid = syncPublicServicesGrid;
window.addEventListener('ruddranil_services_updated', () => {
  if (typeof syncPublicServicesGrid === 'function') syncPublicServicesGrid();
});
window.addEventListener('storage', (e) => {
  if (e.key === 'ruddranil_services' && typeof syncPublicServicesGrid === 'function') {
    syncPublicServicesGrid();
  }
});

// Dynamically sync and display all portfolio showcase projects (My Work & Latest Updates)
async function syncPublicPortfolioGrid() {
  const containers = [
    document.querySelector('.portfolio-grid:not(#portfolioContainer)'),
    document.getElementById('portfolioContainer')
  ].filter(Boolean);

  if (containers.length === 0) return;

  const renderCards = (projects) => {
    if (!Array.isArray(projects) || projects.length === 0) return;

    containers.forEach(container => {
      container.innerHTML = projects.map((p, idx) => {
        const pid = p.id || `proj-${idx + 1}`;
        const title = p.title || 'Showcase Project';
        const category = p.category || 'Creative Work';
        
        // Normalize slug so filters work seamlessly across all 5 portfolio categories
        let rawSlug = (p.categorySlug || category.toLowerCase().replace(/[^a-z0-9]+/g, '-')).toLowerCase();
        let catSlug = rawSlug;
        if (rawSlug.includes('market') || rawSlug.includes('digital') || rawSlug.includes('social') || rawSlug.includes('seo') || rawSlug.includes('ads') || rawSlug.includes('email')) catSlug = 'marketing';
        else if (rawSlug.includes('youtube') || rawSlug.includes('video') || rawSlug.includes('shorts') || rawSlug.includes('thumbnail')) catSlug = 'youtube';
        else if (rawSlug.includes('design') || rawSlug.includes('graphic') || rawSlug.includes('brand') || rawSlug.includes('logo') || rawSlug.includes('vector') || rawSlug.includes('ui')) catSlug = 'design';
        else if (rawSlug.includes('data') || rawSlug.includes('operations') || rawSlug.includes('entry') || rawSlug.includes('sheet') || rawSlug.includes('catalog')) catSlug = 'data';
        else if (rawSlug.includes('auto') || rawSlug.includes('business') || rawSlug.includes('bot') || rawSlug.includes('chat') || rawSlug.includes('workflow')) catSlug = 'automation';
        else if (rawSlug.includes('web') || rawSlug.includes('dev')) catSlug = 'web';

        const desc = p.description || '';
        const fullDetails = p.details || desc;
        const mediaUrl = p.mediaUrl || '';
        const author = p.author || 'Ruddranil';
        const badge = p.badge || `Project 0${idx + 1}`;
        const serviceSlug = p.serviceSlug || 'Website Design';

        // Live likes & comments
        let likeCount = typeof window.getProjectLikeCount === 'function' ? window.getProjectLikeCount(pid, p.likesCount || 10) : (p.likesCount || 10);
        let isLiked = typeof window.isProjectLiked === 'function' ? window.isProjectLiked(pid) : false;

        let commentCount = p.commentsCount || 0;
        try {
          const commStore = JSON.parse(localStorage.getItem('ruddranil_portfolio_comments_v1') || '{}');
          if (commStore[pid] && Array.isArray(commStore[pid])) {
            commentCount = commStore[pid].length;
          }
        } catch (e) {}

        const mediaHtml = renderMediaHtml(mediaUrl, title);

        return `
          <div class="work-card" id="${pid}" data-cat="${catSlug}">
            <div>
              <div class="work-header">
                <div class="work-avatar">R</div>
                <div class="work-author">
                  <h4>${escapeHtmlText(author)}</h4>
                  <p>${escapeHtmlText(category)} • ${escapeHtmlText(badge)}</p>
                </div>
              </div>
              <div class="work-preview-box">
                ${mediaHtml}
              </div>
              <h3 class="work-title">${escapeHtmlText(title)}</h3>
              <p class="work-desc">${escapeHtmlText(desc)}</p>
            </div>
            <div>
              <div class="work-social-bar">
                <span id="likeBtn-${pid}" data-like-project="${pid}" onclick="likePost(this, '${pid}', ${likeCount})" class="work-social-btn like-btn ${isLiked ? 'liked' : ''}" role="button" tabindex="0" title="Like Project" style="${isLiked ? 'color: #ef4444; font-weight: 700;' : ''}">${isLiked ? '❤️' : '🤍'} Like (<span>${likeCount}</span>)</span>
                <span data-comment-id="${pid}" onclick="commentPost('${pid}')" role="button" tabindex="0">💬 Comment (${commentCount})</span>
                <span onclick="sharePost('${pid}')" role="button" tabindex="0">↗ Share</span>
              </div>
              <div class="work-actions">
                <button type="button" onclick="openModal('${pid}')" class="btn btn-secondary btn-sm">View Project</button>
                <button type="button" onclick="orderServiceDirect('${escapeHtmlText(serviceSlug)}')" class="btn btn-primary btn-sm">Order Similar</button>
              </div>
            </div>
          </div>
        `;
      }).join('');
    });

    // Re-sync Supabase project like buttons if active
    if (typeof window.initProjectLikeButtons === 'function') {
      try { window.initProjectLikeButtons(); } catch (e) {}
    }
  };

  // 1. Instant render from local cache or defaults (zero layout flash)
  const raw = localStorage.getItem('ruddranil_portfolio_projects');
  let currentProjects = [];
  try {
    currentProjects = raw ? JSON.parse(raw) : (window.DEFAULT_PORTFOLIO_PROJECTS || []);
  } catch (e) {
    currentProjects = window.DEFAULT_PORTFOLIO_PROJECTS || [];
  }
  if (!currentProjects || currentProjects.length === 0) {
    currentProjects = window.DEFAULT_PORTFOLIO_PROJECTS || [];
  }
  renderCards(currentProjects);

  // 2. Fetch latest authoritative projects from backend API (/api/projects)
  try {
    const res = await fetch('/api/projects?t=' + Date.now());
    if (res.ok) {
      const serverProjects = await res.json();
      if (Array.isArray(serverProjects) && serverProjects.length > 0) {
        localStorage.setItem('ruddranil_portfolio_projects', JSON.stringify(serverProjects));
        renderCards(serverProjects);
      }
    }
  } catch (err) {
    console.warn('Projects live sync notice:', err);
  }
}
window.syncPublicPortfolioGrid = syncPublicPortfolioGrid;

window.addEventListener('ruddranil_projects_updated', () => {
  if (typeof syncPublicPortfolioGrid === 'function') syncPublicPortfolioGrid();
});
window.addEventListener('storage', (e) => {
  if (e.key === 'ruddranil_portfolio_projects' && typeof syncPublicPortfolioGrid === 'function') {
    syncPublicPortfolioGrid();
  }
});

// Get Authoritative Service by ID, Name or Slug (Guaranteed rich descriptions and deliverables)
function getServiceData(nameOrSlugOrId) {
  const query = (nameOrSlugOrId || '').toLowerCase().trim();
  let services = [];
  try {
    services = JSON.parse(localStorage.getItem('ruddranil_services') || '[]');
  } catch (e) {
    services = [];
  }

  const foundLocal = Array.isArray(services) ? services.find(s => 
    s && (
      s.id === nameOrSlugOrId ||
      (s.name && s.name.toLowerCase() === query) ||
      (s.slug && s.slug.toLowerCase() === query)
    )
  ) : null;

  const foundDefault = DEFAULT_SERVICES.find(s => 
    s && (
      s.id === nameOrSlugOrId ||
      (s.name && s.name.toLowerCase() === query) ||
      (s.slug && s.slug.toLowerCase() === query)
    )
  ) || DEFAULT_SERVICES[0];

  if (!foundLocal) {
    return foundDefault;
  }

  // Merge local edits with authoritative defaults so rich aboutNotes/keyDeliverables are never lost
  const merged = Object.assign({}, foundDefault, foundLocal);

  // Guarantee aboutNotes array has readable text
  if (!Array.isArray(merged.aboutNotes) || merged.aboutNotes.length === 0 || !merged.aboutNotes[0]) {
    if (typeof merged.aboutNotes === 'string' && merged.aboutNotes.trim()) {
      merged.aboutNotes = merged.aboutNotes.split('\n').map(p => p.trim()).filter(Boolean);
    } else if (foundDefault && Array.isArray(foundDefault.aboutNotes) && foundDefault.aboutNotes.length > 0) {
      merged.aboutNotes = foundDefault.aboutNotes;
    } else if (merged.description) {
      merged.aboutNotes = [merged.description];
    } else {
      merged.aboutNotes = [foundDefault.description || 'Professional digital service solutions engineered to scale your business.'];
    }
  }

  // Guarantee keyDeliverables array
  if (!Array.isArray(merged.keyDeliverables) || merged.keyDeliverables.length === 0) {
    merged.keyDeliverables = (foundDefault && Array.isArray(foundDefault.keyDeliverables) && foundDefault.keyDeliverables.length > 0)
      ? foundDefault.keyDeliverables
      : (merged.packages?.basic?.features || foundDefault.packages?.basic?.features || []);
  }

  // Guarantee whyChoose array
  if (!Array.isArray(merged.whyChoose) || merged.whyChoose.length === 0) {
    merged.whyChoose = foundDefault.whyChoose || [];
  }

  return merged;
}

// Helper: Check if visitor is currently logged in as a verified customer
function isCustomerLoggedIn() {
  try {
    const raw = localStorage.getItem('currentUser');
    if (raw) {
      const user = JSON.parse(raw);
      if (user && user.email && user.email.includes('@')) {
        return true;
      }
    }

    // Secondary synchronous fallback: Inspect Supabase auth token stored in localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('sb-') && key.endsWith('-auth-token')) {
        const item = localStorage.getItem(key);
        if (item) {
          const parsed = JSON.parse(item);
          const sbUser = parsed?.user || parsed?.currentSession?.user;
          if (sbUser && sbUser.email && sbUser.email.includes('@')) {
            const restoredUser = {
              id: sbUser.id,
              name: sbUser.user_metadata?.full_name || sbUser.email.split('@')[0],
              email: sbUser.email.toLowerCase(),
              role: 'customer',
              emailVerified: Boolean(sbUser.email_confirmed_at)
            };
            try {
              localStorage.setItem('currentUser', JSON.stringify(restoredUser));
            } catch (e) {}
            return true;
          }
        }
      }
    }
    return false;
  } catch (e) {
    return false;
  }
}
window.isCustomerLoggedIn = isCustomerLoggedIn;

// Modal to automatically request unauthenticated visitors to login/register before placing an order
window.openOrderLoginPromptModal = function(serviceIdentifierOrObj, preferredTier = 'basic') {
  let s = null;
  if (typeof serviceIdentifierOrObj === 'object' && serviceIdentifierOrObj !== null) {
    s = serviceIdentifierOrObj;
  } else {
    s = getServiceData(serviceIdentifierOrObj);
  }
  const sName = s?.name || 'Digital Service';
  const pkgTier = preferredTier || 'basic';
  const currentPkg = s?.packages ? (s.packages[pkgTier] || s.packages.basic) : { price: 30, deliveryDays: 3 };
  const price = currentPkg?.price || 30;
  const deliveryDays = currentPkg?.deliveryDays || 3;

  let modal = document.getElementById('orderLoginPromptModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'orderLoginPromptModal';
    modal.className = 'modal-overlay login-prompt-modal-overlay';
    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeOrderLoginPromptModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeOrderLoginPromptModal();
      }
    });
  }

  const redirectUrl = encodeURIComponent('index.html');
  const orderTarget = encodeURIComponent(sName);
  const tierTarget = encodeURIComponent(pkgTier);
  const signInUrl = `login.html?redirect=${redirectUrl}&order=${orderTarget}&tier=${tierTarget}`;
  const registerUrl = `login.html?tab=register&redirect=${redirectUrl}&order=${orderTarget}&tier=${tierTarget}`;

  modal.innerHTML = `
    <div class="modal-card order-login-prompt-card" style="max-width: 480px; text-align: center; position: relative;">
      <button onclick="closeOrderLoginPromptModal()" class="modal-close-btn" aria-label="Close modal">✕</button>

      <div style="width: 58px; height: 58px; border-radius: 16px; background: rgba(2, 132, 199, 0.15); border: 1px solid rgba(2, 132, 199, 0.35); display: flex; align-items: center; justify-content: center; font-size: 28px; margin: 0 auto 16px;">
        🔐
      </div>

      <span class="section-kicker" style="margin-bottom: 6px; display: inline-block;">CUSTOMER LOGIN REQUIRED</span>
      <h3 style="font-size: 21px; font-weight: 800; color: #fff; margin-bottom: 8px;">
        Sign In to Place Your Order
      </h3>
      <p style="font-size: 13.5px; color: var(--text-gray); line-height: 1.55; margin-bottom: 20px;">
        Please sign in to customize package deliverables, submit project instructions, and track live milestone progress. Don't have an account yet? Create one for free.
      </p>

      <!-- Selected Service Summary Card -->
      <div class="order-prompt-service-card" style="border-radius: 12px; padding: 14px 16px; margin-bottom: 22px; text-align: left; display: flex; align-items: center; justify-content: space-between; gap: 12px;">
        <div>
          <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.6px; color: #0284c7; font-weight: 700;">Selected Service</span>
          <h4 class="order-prompt-service-title" style="font-size: 15px; font-weight: 700; margin-top: 2px; margin-bottom: 2px;">${escapeHtmlText(sName)}</h4>
          <span class="order-prompt-tier-meta" style="font-size: 12px; color: #0066ff !important; font-weight: 600;">Tier: <strong style="color: #0066ff !important; font-weight: 800;">${pkgTier.toUpperCase()}</strong> • ⏱ ${deliveryDays} Days Delivery</span>
        </div>
        <div style="text-align: right; flex-shrink: 0;">
          <span class="order-prompt-package-tag" style="font-size: 10.5px; color: #0066ff !important; display: block; font-weight: 800; letter-spacing: 0.5px;">PACKAGE</span>
          <span style="font-size: 20px; font-weight: 800; color: #0066ff !important;">$${price}</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <a href="${signInUrl}" onclick="closeOrderLoginPromptModal()" class="btn btn-primary btn-block btn-lg" style="justify-content: center; font-weight: 700; font-size: 15px; gap: 8px; text-decoration: none;">
          <span>🔑</span> Sign In to Place Order
        </a>
        <a href="${registerUrl}" onclick="closeOrderLoginPromptModal()" class="btn btn-secondary btn-block" style="justify-content: center; font-weight: 600; font-size: 14px; gap: 8px; text-decoration: none;">
          <span>✨</span> Create New Account (Free)
        </a>
      </div>

      <div style="margin-top: 18px; padding-top: 14px; border-top: 1px solid var(--border-color); font-size: 11.5px; color: var(--text-dark-gray); display: flex; align-items: center; justify-content: center; gap: 6px;">
        <span>🔒 100% Secure Checkout • Powered by Supabase Cloud Authentication</span>
      </div>
    </div>
  `;

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
};

window.closeOrderLoginPromptModal = function() {
  const modal = document.getElementById('orderLoginPromptModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
};

// Open Fiverr-Style Order Modal
window.openFiverrOrderModal = function(serviceIdentifier, preferredTier = 'basic') {
  const service = getServiceData(serviceIdentifier);
  if (!service) return;

  // Authentication Guard: Visitors must log in or sign up before placing an order
  if (!isCustomerLoggedIn()) {
    openOrderLoginPromptModal(service, preferredTier);
    return;
  }

  currentOrderState = {
    service: service,
    packageTier: preferredTier,
    isExpress: false,
    selectedAddons: [],
    couponCode: '',
    discountAmount: 0,
    uploadedFiles: []
  };

  let modal = document.getElementById('fiverrOrderModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'fiverrOrderModal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }

  renderFiverrOrderModalContent();
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
};

// Close Order Modal
window.closeFiverrOrderModal = function() {
  const modal = document.getElementById('fiverrOrderModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
};

// Render Complete Fiverr-Style Order Form
function renderFiverrOrderModalContent() {
  const modal = document.getElementById('fiverrOrderModal');
  if (!modal) return;

  const s = currentOrderState.service;
  const packages = s.packages;
  const currentTier = currentOrderState.packageTier;
  const currentPkg = packages[currentTier] || packages.basic;
  const user = JSON.parse(localStorage.getItem('currentUser') || 'null');

  // Authoritative Calculation
  const calculation = calculateAuthoritativeTotals();

  modal.innerHTML = `
    <div class="modal-card fiverr-modal-card">
      <button onclick="closeFiverrOrderModal()" class="modal-close-btn" aria-label="Close modal">✕</button>
      
      <!-- Service Header -->
      <div class="order-service-header">
        <div>
          <span class="section-kicker" style="margin-bottom: 2px;">FIVERR-STYLE CHECKOUT</span>
          <h2 class="order-service-title">${s.name}</h2>
          <p style="font-size: 13px; color: var(--text-gray); margin-top: 2px;">
            Select your package tier, customize delivery, apply coupons, and submit requirements.
          </p>
        </div>
        <div style="text-align: right;">
          <span class="brand-badge">${s.category.toUpperCase()}</span>
        </div>
      </div>

      <!-- Package Selection Tiers (Basic, Standard, Premium) -->
      <label class="form-label" style="margin-bottom: 4px;">1. Choose Your Package Tier</label>
      <div class="package-tiers-grid">
        <!-- Basic Tier -->
        <div id="orderTierCard-basic" class="package-tier-card ${currentTier === 'basic' ? 'selected' : ''}" onclick="selectPackageTier('basic')">
          <div>
            <div class="package-tier-tag">BASIC</div>
            <div class="package-tier-name">${packages.basic.name}</div>
            <div class="package-tier-price">
              <span class="currency">$</span>${packages.basic.price}
            </div>
            <div class="package-tier-delivery">
              <span>⏱ ${packages.basic.deliveryDays} Days Delivery</span>
            </div>
            <p class="package-tier-desc">${packages.basic.desc}</p>
          </div>
          <ul class="package-features-list">
            ${packages.basic.features.map(f => `<li><span class="check-icon">✓</span> ${f}</li>`).join('')}
          </ul>
        </div>

        <!-- Standard Tier -->
        <div id="orderTierCard-standard" class="package-tier-card ${currentTier === 'standard' ? 'selected' : ''}" onclick="selectPackageTier('standard')">
          <div>
            <div class="package-tier-tag" style="color: #60a5fa;">STANDARD</div>
            <div class="package-tier-name">${packages.standard.name}</div>
            <div class="package-tier-price">
              <span class="currency">$</span>${packages.standard.price}
            </div>
            <div class="package-tier-delivery">
              <span>⏱ ${packages.standard.deliveryDays} Days Delivery</span>
            </div>
            <p class="package-tier-desc">${packages.standard.desc}</p>
          </div>
          <ul class="package-features-list">
            ${packages.standard.features.map(f => `<li><span class="check-icon">✓</span> ${f}</li>`).join('')}
          </ul>
        </div>

        <!-- Premium Tier -->
        <div id="orderTierCard-premium" class="package-tier-card ${currentTier === 'premium' ? 'selected' : ''}" onclick="selectPackageTier('premium')">
          <div>
            <div class="package-tier-tag" style="color: #f59e0b;">PREMIUM</div>
            <div class="package-tier-name">${packages.premium.name}</div>
            <div class="package-tier-price">
              <span class="currency">$</span>${packages.premium.price}
            </div>
            <div class="package-tier-delivery">
              <span>⏱ ${packages.premium.deliveryDays} Days Delivery</span>
            </div>
            <p class="package-tier-desc">${packages.premium.desc}</p>
          </div>
          <ul class="package-features-list">
            ${packages.premium.features.map(f => `<li><span class="check-icon">✓</span> ${f}</li>`).join('')}
          </ul>
        </div>
      </div>

      <!-- Express Delivery & Optional Add-ons -->
      <label class="form-label" style="margin-bottom: 4px;">2. Delivery Speed &amp; Optional Add-ons</label>
      <div class="order-addons-wrapper">
        <!-- Express Delivery Toggle -->
        <label class="addon-checkbox-label">
          <div class="addon-info">
            <input type="checkbox" id="expressCheckbox" ${currentOrderState.isExpress ? 'checked' : ''} onchange="toggleExpressDelivery(this.checked)">
            <div>
              <strong class="addon-title" id="expressLabelTitle">⚡ Express Delivery (${currentPkg.expressDays || 1} Days)</strong>
              <div style="font-size: 11px; color: var(--text-gray);">Rush priority delivery right to your inbox</div>
            </div>
          </div>
          <span class="addon-price-badge" id="expressPriceBadge">+$${currentPkg.expressFee}</span>
        </label>

        <!-- Optional Service Addons -->
        ${(s.addons || []).map(addon => {
          const isChecked = currentOrderState.selectedAddons.includes(addon.id);
          return `
            <label class="addon-checkbox-label">
              <div class="addon-info">
                <input type="checkbox" value="${addon.id}" ${isChecked ? 'checked' : ''} onchange="toggleAddonItem('${addon.id}', this.checked)">
                <div>
                  <strong class="addon-title">${addon.name}</strong>
                </div>
              </div>
              <span class="addon-price-badge">+$${addon.price}</span>
            </label>
          `;
        }).join('')}
      </div>

      <!-- Discount Coupon Code -->
      <label class="form-label" for="orderCouponInput">3. Have a Discount Code?</label>
      <div class="coupon-input-group">
        <input 
          type="text" 
          id="orderCouponInput" 
          class="form-input" 
          placeholder="e.g. WELCOME10, RUDDRA20, FIRSTORDER"
          value="${currentOrderState.couponCode}"
          style="flex: 1;"
        >
        <button type="button" onclick="applyCouponCode()" class="btn btn-secondary">
          Apply Coupon
        </button>
      </div>

      <!-- Coupon Status Pill -->
      <div id="couponStatusPill" class="coupon-status-pill ${calculation.discount > 0 ? 'success' : ''}">
        ${calculation.discount > 0 ? `<span>✓ Coupon applied! Saved $${calculation.discount.toFixed(2)}</span>` : ''}
      </div>

      <!-- Live Order Summary / Price Breakdown -->
      <label class="form-label">4. Order Summary</label>
      <div class="price-breakdown-card" id="orderPriceBreakdownCard">
        <div class="breakdown-row">
          <span>Package: <strong id="summaryPkgName">${currentPkg.name} (${currentTier.toUpperCase()})</strong></span>
          <span class="breakdown-val" id="summaryPkgPrice">$${calculation.packagePrice.toFixed(2)}</span>
        </div>
        <div class="breakdown-row" id="summaryExpressRow" style="display: ${currentOrderState.isExpress ? 'flex' : 'none'};">
          <span id="summaryExpressLabel">⚡ Express Delivery (${currentPkg.expressDays || 1} Days)</span>
          <span class="breakdown-val" id="summaryExpressFee">+$${calculation.expressFee.toFixed(2)}</span>
        </div>
        <div class="breakdown-row" id="summaryAddonsRow" style="display: ${calculation.addonsTotal > 0 ? 'flex' : 'none'};">
          <span>Selected Add-ons</span>
          <span class="breakdown-val" id="summaryAddonsVal">+$${calculation.addonsTotal.toFixed(2)}</span>
        </div>
        <div class="breakdown-row subtotal-row">
          <span>Subtotal</span>
          <span class="breakdown-val subtotal-val" id="summarySubtotalVal">$${calculation.subtotal.toFixed(2)}</span>
        </div>
        <div class="breakdown-row discount-row" id="summaryDiscountRow" style="display: ${calculation.discount > 0 ? 'flex' : 'none'};">
          <span id="summaryDiscountLabel">Discount (${currentOrderState.couponCode})</span>
          <span id="summaryDiscountVal">-$${calculation.discount.toFixed(2)}</span>
        </div>
        <div class="breakdown-row total-row">
          <span>Final Total</span>
          <span class="total-amount" id="summaryFinalTotal">$${calculation.finalTotal.toFixed(2)}</span>
        </div>
        <div class="delivery-time-meta" id="summaryDeliveryMeta">
          Estimated Delivery: <strong>${calculation.deliveryDays} Days</strong>
        </div>
      </div>

      <!-- Project Requirements & File Upload -->
      <form onsubmit="handlePlaceOrderSubmit(event)">
        <div class="form-group">
          <label class="form-label" for="orderInstructionsInput">5. Project Requirements &amp; Instructions</label>
          <textarea 
            id="orderInstructionsInput" 
            rows="3" 
            class="form-textarea" 
            placeholder="Describe your requirements, goals, references, or specific instructions for Ruddranil..."
            required
          ></textarea>
        </div>

        <!-- Reference File Upload Dropzone -->
        <div class="form-group">
          <label class="form-label">6. Reference Materials / Attachments (Optional)</label>
          <div class="file-upload-dropzone" onclick="document.getElementById('orderFileInput').click()">
            <input 
              type="file" 
              id="orderFileInput" 
              style="display: none;" 
              accept=".jpg,.jpeg,.png,.webp,.pdf,.zip,.svg"
              onchange="handleOrderFileUpload(this)"
            >
            <div style="font-size: 24px; margin-bottom: 6px;">📎</div>
            <div class="dropzone-title">Click to upload reference image or file</div>
            <div style="font-size: 11px; color: var(--text-dark-gray);">Supports PNG, JPG, PDF, ZIP (Max 10MB)</div>
          </div>
          <div id="uploadedFilesList"></div>
        </div>

        <!-- Customer Identity & Account Verification -->
        <div class="checkout-identity-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
            <label class="form-label" style="margin-bottom: 0;">Ordering As:</label>
            ${user ? `
              <span style="font-size: 12px; color: var(--accent-cyan);">Authenticated Client Account ✓</span>
            ` : `
              <a href="login.html" style="font-size: 12px; color: var(--primary-blue-light); text-decoration: underline;">Already have an account? Sign in</a>
            `}
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <input 
              type="text" 
              id="orderCustomerName" 
              class="form-input" 
              placeholder="Your Name" 
              value="${user ? (user.name || '') : ''}" 
              required
            >
            <input 
              type="email" 
              id="orderCustomerEmail" 
              class="form-input" 
              placeholder="Your Email" 
              value="${user ? (user.email || '') : ''}" 
              required
            >
          </div>
        </div>

        <!-- Final Place Order Button -->
        <button type="submit" id="placeOrderBtn" class="btn btn-primary btn-block btn-lg" style="font-size: 16px; font-weight: 800;">
          Place Order — $${calculation.finalTotal.toFixed(2)}
        </button>
      </form>
    </div>
  `;
}

// 7. Authoritative Total Calculation Logic (Fix #5)
function calculateAuthoritativeTotals() {
  const s = currentOrderState.service;
  const packages = s.packages;
  const currentTier = currentOrderState.packageTier;
  const pkg = packages[currentTier] || packages.basic;

  const packagePrice = Number(pkg.price) || 0;
  const expressFee = currentOrderState.isExpress ? (Number(pkg.expressFee) || 0) : 0;
  
  let addonsTotal = 0;
  (s.addons || []).forEach(addon => {
    if (currentOrderState.selectedAddons.includes(addon.id)) {
      addonsTotal += Number(addon.price) || 0;
    }
  });

  const subtotal = packagePrice + expressFee + addonsTotal;
  const deliveryDays = currentOrderState.isExpress ? (pkg.expressDays || 1) : pkg.deliveryDays;

  // Authoritative Coupon Validation
  let discount = 0;
  const code = (currentOrderState.couponCode || '').toUpperCase().trim();
  if (code) {
    const coupons = JSON.parse(localStorage.getItem('ruddranil_coupons') || '[]');
    const matched = coupons.find(c => c.code.toUpperCase() === code && c.active);

    if (matched) {
      if (subtotal >= (matched.minOrder || 0)) {
        if (matched.type === 'percentage') {
          discount = (subtotal * (matched.value / 100));
          if (matched.maxDiscount && discount > matched.maxDiscount) {
            discount = matched.maxDiscount;
          }
        } else if (matched.type === 'fixed') {
          discount = Math.min(matched.value, subtotal);
        }
      }
    }
  }

  const finalTotal = Math.max(0, subtotal - discount);

  return {
    packagePrice,
    expressFee,
    addonsTotal,
    subtotal,
    discount,
    finalTotal,
    deliveryDays
  };
}

// 8. In-Place Order Customization & Calculations UI Updater (Zero Page Dropdown / Zero Scroll Reset)
function updateOrderCalculationsUI() {
  const s = currentOrderState.service;
  if (!s) return;
  const packages = s.packages;
  const currentTier = currentOrderState.packageTier;
  const currentPkg = packages[currentTier] || packages.basic;
  const calculation = calculateAuthoritativeTotals();

  // 1. Update Package Tier Cards in-place
  ['basic', 'standard', 'premium'].forEach(tier => {
    const card = document.getElementById(`orderTierCard-${tier}`);
    if (card) {
      if (tier === currentTier) {
        card.classList.add('selected');
      } else {
        card.classList.remove('selected');
      }
    }
  });

  // 2. Update Express Delivery label and fee dynamically for current tier
  const expressLabelTitle = document.getElementById('expressLabelTitle');
  if (expressLabelTitle) {
    expressLabelTitle.textContent = `⚡ Express Delivery (${currentPkg.expressDays || 1} Days)`;
  }
  const expressPriceBadge = document.getElementById('expressPriceBadge');
  if (expressPriceBadge) {
    expressPriceBadge.textContent = `+$${currentPkg.expressFee}`;
  }
  const expressCheckbox = document.getElementById('expressCheckbox');
  if (expressCheckbox) {
    expressCheckbox.checked = !!currentOrderState.isExpress;
  }

  // 3. Update Order Summary rows in-place
  const summaryPkgName = document.getElementById('summaryPkgName');
  if (summaryPkgName) {
    summaryPkgName.textContent = `${currentPkg.name} (${currentTier.toUpperCase()})`;
  }
  const summaryPkgPrice = document.getElementById('summaryPkgPrice');
  if (summaryPkgPrice) {
    summaryPkgPrice.textContent = `$${calculation.packagePrice.toFixed(2)}`;
  }

  const summaryExpressRow = document.getElementById('summaryExpressRow');
  const summaryExpressLabel = document.getElementById('summaryExpressLabel');
  const summaryExpressFee = document.getElementById('summaryExpressFee');
  if (summaryExpressRow) {
    summaryExpressRow.style.display = currentOrderState.isExpress ? 'flex' : 'none';
  }
  if (summaryExpressLabel) {
    summaryExpressLabel.textContent = `⚡ Express Delivery (${currentPkg.expressDays || 1} Days)`;
  }
  if (summaryExpressFee) {
    summaryExpressFee.textContent = `+$${calculation.expressFee.toFixed(2)}`;
  }

  const summaryAddonsRow = document.getElementById('summaryAddonsRow');
  const summaryAddonsVal = document.getElementById('summaryAddonsVal');
  if (summaryAddonsRow) {
    summaryAddonsRow.style.display = calculation.addonsTotal > 0 ? 'flex' : 'none';
  }
  if (summaryAddonsVal) {
    summaryAddonsVal.textContent = `+$${calculation.addonsTotal.toFixed(2)}`;
  }

  const summarySubtotalVal = document.getElementById('summarySubtotalVal');
  if (summarySubtotalVal) {
    summarySubtotalVal.textContent = `$${calculation.subtotal.toFixed(2)}`;
  }

  const summaryDiscountRow = document.getElementById('summaryDiscountRow');
  const summaryDiscountLabel = document.getElementById('summaryDiscountLabel');
  const summaryDiscountVal = document.getElementById('summaryDiscountVal');
  if (summaryDiscountRow) {
    summaryDiscountRow.style.display = calculation.discount > 0 ? 'flex' : 'none';
  }
  if (summaryDiscountLabel) {
    summaryDiscountLabel.textContent = `Discount (${currentOrderState.couponCode})`;
  }
  if (summaryDiscountVal) {
    summaryDiscountVal.textContent = `-$${calculation.discount.toFixed(2)}`;
  }

  const summaryFinalTotal = document.getElementById('summaryFinalTotal');
  if (summaryFinalTotal) {
    summaryFinalTotal.textContent = `$${calculation.finalTotal.toFixed(2)}`;
  }

  const summaryDeliveryMeta = document.getElementById('summaryDeliveryMeta');
  if (summaryDeliveryMeta) {
    summaryDeliveryMeta.innerHTML = `Estimated Delivery: <strong>${calculation.deliveryDays} Days</strong>`;
  }

  // 4. Update Final Order button text in-place
  const placeOrderBtn = document.getElementById('placeOrderBtn');
  if (placeOrderBtn) {
    placeOrderBtn.textContent = `Place Order — $${calculation.finalTotal.toFixed(2)}`;
  }
}

// 8. Order Customization Actions (In-Place Updates)
window.selectPackageTier = function(tier) {
  currentOrderState.packageTier = tier;
  updateOrderCalculationsUI();
};

window.toggleExpressDelivery = function(isChecked) {
  currentOrderState.isExpress = isChecked;
  updateOrderCalculationsUI();
};

window.toggleAddonItem = function(addonId, isChecked) {
  if (isChecked) {
    if (!currentOrderState.selectedAddons.includes(addonId)) {
      currentOrderState.selectedAddons.push(addonId);
    }
  } else {
    currentOrderState.selectedAddons = currentOrderState.selectedAddons.filter(id => id !== addonId);
  }
  updateOrderCalculationsUI();
};

window.applyCouponCode = function() {
  const input = document.getElementById('orderCouponInput');
  const code = (input?.value || '').toUpperCase().trim();
  const statusPill = document.getElementById('couponStatusPill');

  if (!code) {
    showToast('Please enter a coupon code', 'error');
    return;
  }

  const coupons = JSON.parse(localStorage.getItem('ruddranil_coupons') || '[]');
  const matched = coupons.find(c => c.code.toUpperCase() === code && c.active);

  if (!matched) {
    currentOrderState.couponCode = '';
    currentOrderState.discountAmount = 0;
    if (statusPill) {
      statusPill.className = 'coupon-status-pill error';
      statusPill.innerHTML = `<span>✕ Invalid or expired coupon code "${code}"</span>`;
    }
    updateOrderCalculationsUI();
    showToast(`Invalid coupon code "${code}"`, 'error');
    return;
  }

  currentOrderState.couponCode = code;
  if (statusPill) {
    statusPill.className = 'coupon-status-pill success';
    statusPill.innerHTML = `<span>✓ Coupon "${code}" applied successfully!</span>`;
  }
  updateOrderCalculationsUI();
  showToast(`Coupon ${code} applied successfully! 🎉`);
};

window.handleOrderFileUpload = function(input) {
  if (!input.files || input.files.length === 0) return;
  const file = input.files[0];

  // Validation: Max 10MB
  if (file.size > 10 * 1024 * 1024) {
    showToast('File exceeds 10MB limit. Please upload a smaller file.', 'error');
    input.value = '';
    return;
  }

  const validExts = ['jpg', 'jpeg', 'png', 'webp', 'pdf', 'zip', 'svg'];
  const ext = file.name.split('.').pop().toLowerCase();
  if (!validExts.includes(ext)) {
    showToast(`Unsupported file type (.${ext}). Use PNG, JPG, PDF, or ZIP.`, 'error');
    input.value = '';
    return;
  }

  currentOrderState.uploadedFiles = [{
    name: file.name,
    size: (file.size / 1024).toFixed(1) + ' KB',
    type: file.type
  }];

  const filesList = document.getElementById('uploadedFilesList');
  if (filesList) {
    filesList.innerHTML = `
      <div class="uploaded-file-chip">
        <span>📄 ${file.name} (${(file.size / 1024).toFixed(1)} KB)</span>
        <button type="button" onclick="removeOrderFile()">✕</button>
      </div>
    `;
  }
  showToast(`File "${file.name}" attached!`);
};

window.removeOrderFile = function() {
  currentOrderState.uploadedFiles = [];
  const filesList = document.getElementById('uploadedFilesList');
  const input = document.getElementById('orderFileInput');
  if (filesList) filesList.innerHTML = '';
  if (input) input.value = '';
  showToast('Attachment removed');
};

// 9. Atomic Order Placement Submission
window.handlePlaceOrderSubmit = function(e) {
  e.preventDefault();

  if (typeof isCustomerLoggedIn === 'function' && !isCustomerLoggedIn()) {
    closeFiverrOrderModal();
    if (typeof openOrderLoginPromptModal === 'function') {
      openOrderLoginPromptModal(currentOrderState.service, currentOrderState.packageTier);
    }
    return;
  }

  const btn = document.getElementById('placeOrderBtn');
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Processing Order...';
  }

  const s = currentOrderState.service;
  const currentPkg = s.packages[currentOrderState.packageTier] || s.packages.basic;
  const calc = calculateAuthoritativeTotals();

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  const customerName = document.getElementById('orderCustomerName')?.value.trim() || currentUser?.name || 'Customer';
  const customerEmail = document.getElementById('orderCustomerEmail')?.value.trim() || currentUser?.email || '';
  const instructions = document.getElementById('orderInstructionsInput')?.value.trim() || 'Project requirements';

  // Generate Unique Order ID (Format: RUD-YYYYMMDD-XXXXXXXX)
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
  const hexRand = Math.random().toString(16).substring(2, 10).toUpperCase();
  const orderId = `RUD-${dateStr}-${hexRand}`;

  const newOrder = {
    id: orderId,
    customerId: currentUser?.id || null,
    customerName,
    customerEmail,
    service: s.name,
    serviceSlug: s.slug,
    packageTier: currentOrderState.packageTier,
    packageName: currentPkg.name,
    packagePrice: calc.packagePrice,
    subtotal: calc.subtotal,
    discountAmount: calc.discount,
    finalTotal: calc.finalTotal,
    deliveryDays: calc.deliveryDays,
    isExpress: currentOrderState.isExpress,
    expressFee: calc.expressFee,
    selectedAddons: currentOrderState.selectedAddons,
    addonsTotal: calc.addonsTotal,
    couponCode: currentOrderState.couponCode,
    request: instructions,
    referenceFiles: currentOrderState.uploadedFiles,
    status: 'Pending',
    progress: 0,
    price: `$${calc.finalTotal.toFixed(2)}`,
    orderDate: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    lastUpdated: 'Just now'
  };

  // Atomic Persistence in localStorage
  const orders = JSON.parse(localStorage.getItem('ruddranil_orders') || '[]');
  orders.unshift(newOrder);
  localStorage.setItem('ruddranil_orders', JSON.stringify(orders));

  // Sync with Supabase Cloud Database
  if (typeof window.syncOrderToSupabase === 'function') {
    window.syncOrderToSupabase(newOrder);
  }

  // Sync Current User Session if none
  if (!localStorage.getItem('currentUser') && customerEmail) {
    localStorage.setItem('currentUser', JSON.stringify({
      name: customerName,
      email: customerEmail,
      role: 'customer'
    }));
  }

  // Update Coupon Usage Count
  if (currentOrderState.couponCode) {
    const coupons = JSON.parse(localStorage.getItem('ruddranil_coupons') || '[]');
    const cp = coupons.find(c => c.code === currentOrderState.couponCode);
    if (cp) {
      cp.timesUsed = (cp.timesUsed || 0) + 1;
      localStorage.setItem('ruddranil_coupons', JSON.stringify(coupons));
    }
  }

  closeFiverrOrderModal();
  openOrderConfirmationScreen(newOrder);
};

// 10. Order Success Confirmation Screen
function openOrderConfirmationScreen(order) {
  let modal = document.getElementById('orderConfirmationModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'orderConfirmationModal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-card order-success-card">
      <div class="order-success-icon">✓</div>
      <span class="section-kicker">ORDER PLACED SUCCESSFULLY</span>
      <h2 style="font-size: 24px; font-weight: 800; color: #fff; margin-bottom: 6px;">Thank You, ${order.customerName}!</h2>
      <p style="font-size: 14px; color: var(--text-gray); max-width: 440px; margin: 0 auto;">
        Your order for <strong>${order.service} (${order.packageName})</strong> has been received and logged in the system.
      </p>

      <div class="order-success-id">
        ${order.id}
      </div>

      <div style="background: #080d17; border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 14px 18px; text-align: left; margin-bottom: 24px; font-size: 13px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
          <span style="color: var(--text-gray);">Delivery Timeline:</span>
          <strong style="color: #fff;">${order.deliveryDays} Days ${order.isExpress ? '⚡ (Express)' : ''}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
          <span style="color: var(--text-gray);">Total Amount:</span>
          <strong style="color: var(--accent-cyan); font-size: 15px;">${order.price}</strong>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: var(--text-gray);">Notification sent to:</span>
          <strong style="color: #fff;">${order.customerEmail}</strong>
        </div>
      </div>

      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <a href="customer-dashboard.html" class="btn btn-primary btn-block btn-lg" style="flex: 1;">
          Go to Customer Dashboard →
        </a>
        <a href="work-tracking.html?id=${order.id}" class="btn btn-secondary btn-lg" style="flex: 1;">
          Track Order Live
        </a>
      </div>
    </div>
  `;

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

window.closeOrderConfirmationModal = function() {
  const modal = document.getElementById('orderConfirmationModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
};

// 11. Direct Order Shortcut (Triggers Fiverr Order Modal or Login Prompt)
window.orderServiceDirect = function(serviceName, preferredTier = 'basic') {
  if (typeof isCustomerLoggedIn === 'function' && !isCustomerLoggedIn()) {
    if (typeof openOrderLoginPromptModal === 'function') {
      openOrderLoginPromptModal(serviceName, preferredTier);
    }
    return;
  }
  openFiverrOrderModal(serviceName, preferredTier);
};

// 11. Fiverr-Style Gig Details Page Modal & Order Actions
var activeGigService = null;
var activeGigTier = 'basic';

window.openServiceDetails = function(serviceIdentifier, defaultTier) {
  const s = getServiceData(serviceIdentifier);
  activeGigService = s;
  activeGigTier = defaultTier || 'basic';

  let modal = document.getElementById('serviceDetailsModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'serviceDetailsModal';
    modal.className = 'modal-overlay service-details-modal-overlay';
    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeServiceDetails();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeServiceDetails();
      }
    });
  }

  renderGigDetailsContent(modal, s, activeGigTier);
  modal.style.display = 'flex';
  modal.scrollTop = 0;
  const pageContainer = modal.querySelector('.gig-page-container');
  if (pageContainer) {
    pageContainer.scrollTop = 0;
  }
  requestAnimationFrame(() => {
    modal.scrollTop = 0;
    if (pageContainer) pageContainer.scrollTop = 0;
    const topbar = modal.querySelector('.gig-page-topbar');
    if (topbar && typeof topbar.scrollIntoView === 'function') {
      topbar.scrollIntoView({ block: 'start' });
    }
  });
  document.body.style.overflow = 'hidden';
};

function renderGigDetailsContent(modal, s, tier) {
  const currentPkg = (s.packages && s.packages[tier]) ? s.packages[tier] : (s.packages ? s.packages.basic : { price: 30, deliveryDays: 3, desc: '', features: [] });
  const coverImg = s.coverImage || 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80';

  // Extract robust description paragraphs (guaranteed non-empty)
  let aboutParagraphs = [];
  if (Array.isArray(s.aboutNotes) && s.aboutNotes.length > 0) {
    aboutParagraphs = s.aboutNotes.filter(p => typeof p === 'string' && p.trim().length > 0);
  } else if (typeof s.aboutNotes === 'string' && s.aboutNotes.trim()) {
    aboutParagraphs = s.aboutNotes.split('\n').map(p => p.trim()).filter(Boolean);
  }
  if (aboutParagraphs.length === 0 && s.description && typeof s.description === 'string' && s.description.trim()) {
    aboutParagraphs = [s.description.trim()];
  }
  if (aboutParagraphs.length === 0) {
    aboutParagraphs = [
      'Are you looking for premium quality execution to scale your digital presence? I deliver tailored solutions engineered specifically for high conversion, ROI, and sustainable business growth.',
      'From in-depth discovery to creative design, deployment, and performance optimization, every phase is handled with precision and professional standards.',
      'You receive dedicated support, transparent communication, and 100% on-time delivery guaranteed.'
    ];
  }

  // Extract robust deliverables list (guaranteed non-empty)
  let deliverablesList = [];
  if (Array.isArray(s.keyDeliverables) && s.keyDeliverables.length > 0) {
    deliverablesList = s.keyDeliverables.filter(d => typeof d === 'string' && d.trim().length > 0);
  }
  if (deliverablesList.length === 0 && currentPkg && Array.isArray(currentPkg.features) && currentPkg.features.length > 0) {
    deliverablesList = currentPkg.features.filter(f => typeof f === 'string' && f.trim().length > 0);
  }
  if (deliverablesList.length === 0) {
    deliverablesList = [
      'Comprehensive Target Strategy & Requirements Analysis',
      'High-Converting Creative Setup & Asset Delivery',
      'Full Technical Configuration & Optimization',
      'Transparent Delivery Report with Dedicated Support'
    ];
  }

  // Extract whyChoose
  const whyList = (Array.isArray(s.whyChoose) && s.whyChoose.length > 0)
    ? s.whyChoose
    : [
        '5+ Years of Certified Digital & Marketing Experience',
        'Data-driven approach with transparent, real-time ROI tracking',
        'Fast, clear English communication with 100% on-time delivery record',
        'Dedicated post-launch support and weekly optimization reviews'
      ];

  modal.innerHTML = `
    <div class="gig-page-container">
      <!-- Sticky Top Navigation Bar -->
      <div class="gig-page-topbar">
        <div class="gig-breadcrumb">
          <button type="button" onclick="closeServiceDetails()" class="gig-back-btn" title="Back to Services">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Back to Services</span>
          </button>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-category">${(s.category || 'MARKETING').toUpperCase()}</span>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">${s.name}</span>
        </div>
        <div class="gig-topbar-actions">
          <span class="gig-rating-pill">⭐ ${s.rating || '5.0'} (${s.reviewsCount || 48} reviews)</span>
          <button type="button" onclick="closeServiceDetails()" class="gig-close-btn" aria-label="Close details page">✕</button>
        </div>
      </div>

      <!-- Main Two-Column Gig Page Layout -->
      <div class="gig-page-body">
        <!-- Left Main Column (65%) -->
        <div class="gig-main-column">
          <!-- Gig Header -->
          <div class="gig-header-block">
            <div class="gig-category-badge-row">
              <span class="service-category-badge" style="position: static; display: inline-block;">${(s.category || 'SERVICES').toUpperCase()}</span>
              ${s.badge ? `<span class="gig-choice-badge">${s.badge}</span>` : ''}
            </div>
            <h1 class="gig-detail-title">${s.gigTitle || ('I will provide professional ' + s.name + ' for your business')}</h1>
            
            <!-- Seller Profile Bar -->
            <div class="gig-seller-profile-row">
              <div class="gig-seller-avatar">R</div>
              <div class="gig-seller-meta">
                <div class="gig-seller-name-row">
                  <span class="gig-seller-name">Ruddranil</span>
                  <span class="gig-seller-level">Level 2 Seller</span>
                  <span class="gig-seller-dot">•</span>
                  <span class="gig-seller-queue"><strong>${s.ordersInQueue || 3}</strong> Orders in Queue</span>
                </div>
                <div class="gig-seller-submeta">
                  <span>⭐ 5.0 Rating</span>
                  <span>• 100% Order Completion</span>
                  <span>• Response Time: &lt; 1 hour</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Gig Showcase Cover Image -->
          <div class="gig-showcase-cover">
            <img src="${coverImg}" alt="${s.name}" class="gig-cover-image">
            <div class="gig-cover-watermark">
              <span>Verified Ruddranil.io Showcase</span>
            </div>
          </div>

          <!-- Trust & Value Pillars Grid -->
          <div class="gig-trust-grid">
            <div class="gig-trust-card">
              <div class="trust-icon">⚡</div>
              <div class="trust-title">Fast Kickoff</div>
              <div class="trust-desc">Initial response &amp; brief setup within 1 hour</div>
            </div>
            <div class="gig-trust-card">
              <div class="trust-icon">🎯</div>
              <div class="trust-title">Custom Strategy</div>
              <div class="trust-desc">100% tailored specifically to your niche &amp; audience</div>
            </div>
            <div class="gig-trust-card">
              <div class="trust-icon">🔄</div>
              <div class="trust-title">Revisions Included</div>
              <div class="trust-desc">Dedicated revision rounds to guarantee satisfaction</div>
            </div>
            <div class="gig-trust-card">
              <div class="trust-icon">🔒</div>
              <div class="trust-title">Cloud Synced</div>
              <div class="trust-desc">Live Supabase order tracker &amp; status logs</div>
            </div>
          </div>

          <!-- Section: About This Gig (Description Notes) -->
          <div class="gig-section-card" id="gigAboutSection">
            <h2 class="gig-section-title">About This Gig &amp; Overview</h2>
            <div class="gig-desc-paragraphs">
              ${aboutParagraphs.map(p => `<p class="gig-body-text">${p}</p>`).join('')}
            </div>

            <!-- Key Deliverables Checklist -->
            <div class="gig-deliverables-wrap">
              <h3 class="gig-subsection-title">What You Will Get (Key Deliverables):</h3>
              <div class="gig-deliverables-grid">
                ${deliverablesList.map(item => `
                  <div class="gig-deliverable-item">
                    <span class="deliverable-check">✓</span>
                    <span>${item}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Why Work With Me -->
            <div class="gig-why-choose-wrap">
              <h3 class="gig-subsection-title">Why Choose Ruddranil?</h3>
              <ul class="gig-why-list">
                ${whyList.map(w => `<li><strong>•</strong> ${w}</li>`).join('')}
              </ul>
            </div>
          </div>

          <!-- Section: My Work Process (Model Design) -->
          <div class="gig-section-card" id="gigProcessSection">
            <h2 class="gig-section-title">Work Process &amp; Workflow Architecture</h2>
            <p class="gig-body-muted" style="margin-bottom: 20px;">
              A structured 4-step modern execution model to ensure high conversion, transparent tracking, and flawless delivery.
            </p>
            <div class="gig-process-grid">
              ${(s.workProcess || [
                { step: '01', title: 'Strategy Briefing', desc: 'Understanding your objectives and target audience parameters.' },
                { step: '02', title: 'Research & Creative', desc: 'Competitor benchmarking, keyword mapping, and asset design.' },
                { step: '03', title: 'Execution & Quality Check', desc: 'Implementing technical configurations and testing delivery.' },
                { step: '04', title: 'Delivery & Proof', desc: 'Comprehensive handover with transparent metrics and ongoing support.' }
              ]).map(step => `
                <div class="gig-process-card">
                  <div class="process-step-pill">${step.step}</div>
                  <h4 class="process-card-title">${step.title}</h4>
                  <p class="process-card-desc">${step.desc}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Section: Tools & Technologies -->
          ${s.tools ? `
            <div class="gig-section-card">
              <h2 class="gig-section-title">Tools &amp; Technologies Used</h2>
              <div class="gig-tools-grid">
                ${s.tools.map(tool => `<span class="gig-tool-badge">${tool}</span>`).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Section: Frequently Asked Questions -->
          ${s.faqs && s.faqs.length > 0 ? `
            <div class="gig-section-card" id="gigFaqSection">
              <h2 class="gig-section-title">Frequently Asked Questions</h2>
              <div class="gig-faq-list">
                ${s.faqs.map((faq, idx) => `
                  <div class="gig-faq-item ${idx === 0 ? 'open' : ''}" id="gigFaq-${idx}">
                    <button type="button" class="gig-faq-question" onclick="toggleGigFaq(${idx})">
                      <span>${faq.q}</span>
                      <span class="faq-toggle-icon">${idx === 0 ? '−' : '+'}</span>
                    </button>
                    <div class="gig-faq-answer" style="${idx === 0 ? 'display: block;' : 'display: none;'}">
                      <p>${faq.a}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Section: Verified Client Testimonials -->
          ${s.reviews && s.reviews.length > 0 ? `
            <div class="gig-section-card">
              <h2 class="gig-section-title">Client Feedback &amp; Reviews (${s.reviewsCount || 48})</h2>
              <div class="gig-reviews-grid">
                ${s.reviews.map(rev => `
                  <div class="gig-review-card">
                    <div class="gig-review-header">
                      <div class="review-avatar">${rev.name.charAt(0)}</div>
                      <div class="review-meta">
                        <div class="review-name">${rev.name}</div>
                        <div class="review-country">${rev.country} • <span class="review-date">${rev.date}</span></div>
                      </div>
                      <div class="review-stars">⭐⭐⭐⭐⭐</div>
                    </div>
                    <p class="review-comment">"${rev.comment}"</p>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>

        <!-- Right Sticky Sidebar: 3-Tier Packages Box (35%) -->
        <div class="gig-sidebar-column">
          <div class="gig-sticky-package-box">
            <!-- Tier Tabs Navigation -->
            <div class="gig-tier-tabs">
              <button type="button" class="gig-tier-tab ${tier === 'basic' ? 'active' : ''}" onclick="switchGigTier('basic')">
                Basic
              </button>
              <button type="button" class="gig-tier-tab ${tier === 'standard' ? 'active' : ''}" onclick="switchGigTier('standard')">
                Standard
              </button>
              <button type="button" class="gig-tier-tab ${tier === 'premium' ? 'active' : ''}" onclick="switchGigTier('premium')">
                Premium
              </button>
            </div>

            <!-- Package Details Content -->
            <div class="gig-tier-content">
              <div class="gig-tier-header">
                <div>
                  <span class="gig-tier-label">${tier.toUpperCase()} PACKAGE</span>
                  <h3 class="gig-tier-title">${currentPkg.name}</h3>
                </div>
                <div class="gig-tier-price">
                  <span class="tier-currency">$</span>${currentPkg.price}
                </div>
              </div>

              <p class="gig-tier-summary">${currentPkg.desc}</p>

              <div class="gig-tier-meta-row">
                <div class="tier-meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span><strong>${currentPkg.deliveryDays} Days</strong> Delivery</span>
                </div>
                <div class="tier-meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
                  </svg>
                  <span><strong>${tier === 'premium' ? 'Unlimited' : (tier === 'standard' ? '4 Revisions' : '2 Revisions')}</strong></span>
                </div>
              </div>

              <!-- Included Features List -->
              <div class="gig-features-header">What's Included:</div>
              <ul class="gig-features-checklist">
                ${(currentPkg.features || []).map(f => `
                  <li>
                    <span class="check-icon">✓</span>
                    <span>${f}</span>
                  </li>
                `).join('')}
              </ul>

              <!-- Direct Order Action Button (Connects to Supabase Checkout) -->
              <button type="button" onclick="orderFromDetails('${s.name}', '${tier}')" class="btn btn-primary gig-order-cta-btn">
                <span>Continue to Order ($${currentPkg.price})</span>
                <span style="font-size: 18px;">→</span>
              </button>

              <button type="button" onclick="contactSellerForService('${s.name}')" class="btn btn-secondary gig-contact-cta-btn">
                <span>💬 Contact Seller / Custom Offer</span>
              </button>

              <div class="gig-guarantee-note">
                <span>🔒 100% Secure Checkout • Supabase Cloud Sync</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Bottom Sticky Floating Bar -->
      <div class="gig-mobile-floating-bar">
        <div class="mobile-price-group">
          <span class="mobile-tier-name">${currentPkg.name} (${tier.toUpperCase()})</span>
          <span class="mobile-tier-price">$${currentPkg.price}</span>
        </div>
        <button type="button" onclick="orderFromDetails('${s.name}', '${tier}')" class="btn btn-primary btn-sm mobile-order-btn">
          Order Now ($${currentPkg.price})
        </button>
      </div>
    </div>
  `;
}

window.switchGigTier = function(tier) {
  activeGigTier = tier;
  const modal = document.getElementById('serviceDetailsModal');
  if (modal && activeGigService) {
    const prevScroll = modal.scrollTop;
    renderGigDetailsContent(modal, activeGigService, activeGigTier);
    modal.scrollTop = prevScroll;
  }
};

window.toggleGigFaq = function(index) {
  const item = document.getElementById(`gigFaq-${index}`);
  if (!item) return;
  const isOpen = item.classList.contains('open');
  const answer = item.querySelector('.gig-faq-answer');
  const icon = item.querySelector('.faq-toggle-icon');

  if (isOpen) {
    item.classList.remove('open');
    if (answer) answer.style.display = 'none';
    if (icon) icon.textContent = '+';
  } else {
    item.classList.add('open');
    if (answer) answer.style.display = 'block';
    if (icon) icon.textContent = '−';
  }
};

window.closeServiceDetails = function() {
  const modal = document.getElementById('serviceDetailsModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
};

// Seamless Transition: Order from Details Page -> Fiverr Checkout Modal -> Supabase Cloud DB
window.orderFromDetails = function(serviceName, tier) {
  closeServiceDetails();
  const chosenTier = tier || activeGigTier || 'basic';
  if (typeof isCustomerLoggedIn === 'function' && !isCustomerLoggedIn()) {
    setTimeout(() => {
      if (typeof openOrderLoginPromptModal === 'function') {
        openOrderLoginPromptModal(serviceName, chosenTier);
      }
    }, 120);
    return;
  }
  setTimeout(() => {
    openFiverrOrderModal(serviceName, chosenTier);
  }, 120);
};

// Contact Seller shortcut pre-populates contact form
window.contactSellerForService = function(serviceName) {
  closeServiceDetails();
  const contactSection = document.getElementById('contact');
  const serviceDropdown = document.getElementById('contactService');
  if (serviceDropdown) {
    serviceDropdown.value = serviceName;
  }
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
};

// 12. Contact Form Submission (Let's Work Together)
function setupContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName')?.value.trim();
    const email = document.getElementById('contactEmail')?.value.trim();
    const serviceName = document.getElementById('contactService')?.value;
    const message = document.getElementById('contactMessage')?.value.trim();

    if (!serviceName || serviceName === 'Select a service') {
      showToast('Please select a service from the dropdown', 'error');
      return;
    }

    // Redirect to Fiverr-style modal pre-selected with this service!
    openFiverrOrderModal(serviceName, 'basic');
    setTimeout(() => {
      const nameInput = document.getElementById('orderCustomerName');
      const emailInput = document.getElementById('orderCustomerEmail');
      const instInput = document.getElementById('orderInstructionsInput');
      if (nameInput && name) nameInput.value = name;
      if (emailInput && email) emailInput.value = email;
      if (instInput && message) instInput.value = message;
    }, 150);
  });
}

// 13. Work Tracking Stepper Logic
function setupWorkTracking() {
  const trackBtn = document.getElementById('trackOrderBtn');
  const trackInput = document.getElementById('trackOrderIdInput');

  if (trackBtn && trackInput) {
    trackBtn.addEventListener('click', () => {
      const id = trackInput.value.trim();
      if (!id) {
        showToast('Please enter an Order ID', 'error');
        return;
      }
      renderOrderTracking(id);
    });

    trackInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') trackBtn.click();
    });
  }

  const urlParams = new URLSearchParams(window.location.search);
  const paramId = urlParams.get('id') || (trackInput ? trackInput.value.trim() : null);
  if (paramId) {
    if (trackInput) trackInput.value = paramId;
    renderOrderTracking(paramId);
  }
}

window.setTrackId = function(id) {
  const trackInput = document.getElementById('trackOrderIdInput');
  if (trackInput) {
    trackInput.value = id;
  }
  renderOrderTracking(id);
};

async function renderOrderTracking(orderId, isSilentRefresh = false) {
  const container = document.getElementById('trackingDisplayContainer');
  if (!container) return;

  const cleanId = orderId.trim().replace(/^#/, '');
  window.__activeTrackingOrderId = cleanId;

  // Check if client decision modal is currently open to prevent interrupting user
  const acceptModal = document.getElementById('clientAcceptDeliveryModal');
  const revisionModal = document.getElementById('clientRevisionModal');
  const isAnyModalOpen = (acceptModal && acceptModal.style.display === 'flex') || (revisionModal && revisionModal.style.display === 'flex');
  if (isSilentRefresh && isAnyModalOpen) {
    return;
  }

  // Only show the loading placeholder on explicit initial lookup when no card is rendered
  const hasExistingContent = container.querySelector('.tracking-wrapper');
  if (!isSilentRefresh && (!hasExistingContent || window.__lastRenderedOrderId !== cleanId)) {
    container.innerHTML = `
      <div class="card" style="text-align: center; padding: 36px 20px; margin-top: 24px; border: 1px dashed rgba(56, 189, 248, 0.4); background: rgba(15, 23, 42, 0.6);">
        <div style="font-size: 28px; margin-bottom: 10px;">⚡</div>
        <div style="color: var(--accent-cyan); font-weight: 700; font-size: 15px;">Tracking Live Status for #${escapeHtmlText(cleanId)}...</div>
        <div style="color: var(--text-dark-gray); font-size: 12px; margin-top: 4px;">Fetching live server &amp; cloud database milestones...</div>
      </div>
    `;
    container.style.display = 'block';
  }

  // 1. Check local cache
  const orders = JSON.parse(localStorage.getItem('ruddranil_orders') || '[]');
  let order = orders.find(o => 
    (o.id || '').toLowerCase() === cleanId.toLowerCase() || 
    (o.id || '').toLowerCase().replace(/^#/, '') === cleanId.toLowerCase()
  );

  // 2. Fetch authoritative real-time order from Server API by specific ID or all orders
  try {
    const resSingle = await fetch(`/api/orders/${encodeURIComponent(cleanId)}?t=${Date.now()}`);
    if (resSingle.ok) {
      const serverOrder = await resSingle.json();
      if (serverOrder && serverOrder.id) {
        order = { ...(order || {}), ...serverOrder };
      }
    } else {
      const res = await fetch(`/api/orders?t=${Date.now()}`);
      if (res.ok) {
        const serverOrders = await res.json();
        if (Array.isArray(serverOrders)) {
          const found = serverOrders.find(so => 
            (so.id || '').toLowerCase() === cleanId.toLowerCase() || 
            (so.id || '').toLowerCase().replace(/^#/, '') === cleanId.toLowerCase()
          );
          if (found) {
            order = { ...(order || {}), ...found };
          }
        }
      }
    }
  } catch (err) {}

  // 3. Query Supabase cloud table for latest status and progress
  if (window.sbClient) {
    try {
      const { data, error } = await window.sbClient
        .from('orders')
        .select('*')
        .ilike('id', cleanId)
        .maybeSingle();

      if (data) {
        // Status rank precedence: Never let a stale "Pending" downgrade an active order
        const getStatusRank = (st) => {
          const s = (st || '').toLowerCase();
          if (s === 'delivered' || s === 'completed') return 5;
          if (s === 'review' || s === 'in review') return 4;
          if (s === 'in progress') return 3;
          if (s === 'accepted') return 2;
          if (s === 'pending') return 1;
          return 0;
        };

        const existingStatus = order?.status || 'Pending';
        const cloudStatus = data.status || 'Pending';
        const effectiveStatus = getStatusRank(cloudStatus) >= getStatusRank(existingStatus) ? cloudStatus : existingStatus;

        // Progress precedence: higher progress wins, or status-derived
        const cloudProg = (data.progress !== undefined && data.progress !== null) ? Number(data.progress) : 0;
        const existingProg = order?.progress ? Number(order.progress) : 0;
        const effectiveProg = Math.max(cloudProg, existingProg);

        order = {
          ...(order || {}),
          id: data.id,
          customerName: data.customer_name || order?.customerName || 'Client',
          customerEmail: data.customer_email || order?.customerEmail || '',
          service: data.service || order?.service || 'Service',
          packageTier: data.package_tier || order?.packageTier || 'Basic',
          price: data.price || order?.price || `$${Number(data.final_total || 30).toFixed(2)}`,
          status: effectiveStatus,
          progress: effectiveProg,
          lastUpdated: data.last_updated ? new Date(data.last_updated).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : (order?.lastUpdated || 'Just now'),
          deliveryDays: data.delivery_days || order?.deliveryDays || 3,
          isExpress: Boolean(data.is_express !== undefined ? data.is_express : order?.isExpress)
        };
      }
    } catch (e) {
      console.warn('Tracking cloud lookup notice:', e);
    }
  }

  if (!order) {
    container.innerHTML = `
      <div class="card" style="text-align: center; padding: 40px; margin-top: 24px;">
        <div style="font-size: 32px; margin-bottom: 12px;">🔍</div>
        <h3 style="font-size: 19px; font-weight: 700; margin-bottom: 8px;">Order Not Found</h3>
        <p style="color: var(--text-gray); font-size: 14px; max-width: 480px; margin: 0 auto 18px;">
          No project order matching "<strong>${escapeHtmlText(orderId)}</strong>" was found in the database.
        </p>
        <div style="font-size: 12px; color: var(--text-dark-gray);">
          Please verify your Order ID format (e.g. <strong>RUD-YYYYMMDD-XXXXXXXX</strong>).
        </div>
      </div>
    `;
    container.style.display = 'block';
    return;
  }

  // 4. Ensure progress reflects status appropriately
  const statusLower = (order.status || 'Pending').toLowerCase();
  if (statusLower === 'review' || statusLower === 'in review') {
    if (!order.progress || order.progress < 85) {
      order.progress = 85;
    }
  } else if (statusLower === 'delivered' || statusLower === 'completed') {
    order.progress = 100;
  } else if (statusLower === 'in progress') {
    if (!order.progress || order.progress <= 0) {
      order.progress = 50;
    }
  } else if (statusLower === 'accepted') {
    if (!order.progress || order.progress <= 0) {
      order.progress = 15;
    }
  } else if (statusLower === 'pending') {
  }

  // 5. Update local cache with latest authoritative data
  try {
    const allLocal = JSON.parse(localStorage.getItem('ruddranil_orders') || '[]');
    const idx = allLocal.findIndex(o => 
      (o.id || '').toLowerCase() === cleanId.toLowerCase() || 
      (o.id || '').toLowerCase().replace(/^#/, '') === cleanId.toLowerCase()
    );
    if (idx >= 0) allLocal[idx] = { ...allLocal[idx], ...order };
    else allLocal.unshift(order);
    localStorage.setItem('ruddranil_orders', JSON.stringify(allLocal));
  } catch (e) {}

  // 6. Stepper Milestone Computation
  const isAccepted = statusLower === 'accepted';
  const isInProgress = statusLower === 'in progress';
  const isReview = statusLower === 'review' || statusLower === 'in review';
  const isCurrentlyInRevision = statusLower === 'in revision';
  const isDelivered = statusLower === 'delivered' || statusLower === 'completed';

  const step1Active = true;
  const step1Badge = '✓';

  const step2Active = isReview || isCurrentlyInRevision || isDelivered;
  const step2Current = isAccepted || isInProgress;
  const step2Badge = (isReview || isCurrentlyInRevision || isDelivered) ? '✓' : (step2Current ? '▶' : '2');

  const step3Active = isDelivered;
  const step3Current = isReview || isCurrentlyInRevision;
  const step3Badge = isDelivered ? '✓' : (isCurrentlyInRevision ? '🔄' : (isReview ? '▶' : '3'));

  const step4Active = isDelivered;
  const step4Badge = isDelivered ? '✓' : '4';

  let statusBadgeHtml = `<span class="badge-status badge-pending">● Pending</span>`;
  if (isAccepted) {
    statusBadgeHtml = `<span class="badge-status" style="background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3);">✓ Accepted by Ruddranil</span>`;
  } else if (isInProgress) {
    statusBadgeHtml = `<span class="badge-status badge-in-progress">⚡ In Progress</span>`;
  } else if (isReview) {
    statusBadgeHtml = `<span class="badge-status" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.35);">👁️ Review</span>`;
  } else if (statusLower === 'in revision') {
    statusBadgeHtml = `<span class="badge-status" style="background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.4);">🔄 In Revision</span>`;
  } else if (statusLower === 'completed') {
    statusBadgeHtml = `<span class="badge-status" style="background: rgba(16, 185, 129, 0.25); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.5);">✓ Order Completed</span>`;
  } else if (isDelivered) {
    statusBadgeHtml = `<span class="badge-status badge-in-progress" style="background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.4);">✓ Delivered</span>`;
  } else if (statusLower === 'cancelled') {
    statusBadgeHtml = `<span class="badge-status" style="background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3);">✕ Cancelled</span>`;
  }

  // --- FIVERR-STYLE DELIVERY SYSTEM HTML RENDERING ---
  const delivery = order.delivery || (Array.isArray(order.deliveries) && order.deliveries.length > 0 ? order.deliveries[order.deliveries.length - 1] : null);
  let deliverySectionHtml = '';

  if (delivery || isDelivered) {
    const versionNum = delivery?.version || (Array.isArray(order.deliveries) ? order.deliveries.length : 1);
    const deliveredTimeStr = delivery?.deliveredAt ? new Date(delivery.deliveredAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }) : 'Recently';
    const deliveryMsg = delivery?.message || 'Your project deliverables have been finalized. Please inspect all files and links below!';
    const files = Array.isArray(delivery?.files) ? delivery.files : [];
    const links = Array.isArray(delivery?.links) ? delivery.links : [];
    const isCompletedOrAccepted = order.clientAccepted || statusLower === 'completed';

    const getFileIcon = (fileName) => {
      const fn = (fileName || '').toLowerCase();
      if (fn.endsWith('.zip') || fn.endsWith('.rar') || fn.endsWith('.7z')) return '📦';
      if (fn.endsWith('.pdf')) return '📄';
      if (fn.endsWith('.png') || fn.endsWith('.jpg') || fn.endsWith('.jpeg') || fn.endsWith('.webp')) return '🖼️';
      if (fn.endsWith('.fig')) return '🎨';
      if (fn.endsWith('.xlsx') || fn.endsWith('.csv') || fn.endsWith('.xls')) return '📊';
      if (fn.endsWith('.mp4') || fn.endsWith('.mov')) return '🎬';
      return '📁';
    };

    deliverySectionHtml = `
      <div class="fiverr-delivery-container">
        <!-- Delivery Header Banner -->
        <div class="delivery-header-banner">
          <div class="delivery-title-badge-group">
            <div class="delivery-icon-box">📦</div>
            <div>
              <div class="delivery-main-title">
                Work Delivered by Ruddranil
                <span class="delivery-version-tag">Delivery #${versionNum}</span>
              </div>
              <div class="delivery-meta-time">
                <span>📅 Delivered: ${escapeHtmlText(deliveredTimeStr)}</span>
                <span style="color: var(--border-color);">•</span>
                <span style="color: #34d399; font-weight: 700;">✓ Ready for Review &amp; Download</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Seller's Delivery Note -->
        <div class="delivery-seller-note-card">
          <div class="delivery-note-label">
            <span>💬 Freelancer Delivery Note:</span>
          </div>
          <div class="delivery-note-content">${escapeHtmlText(deliveryMsg)}</div>
        </div>

        <!-- Downloadable Deliverable Files -->
        ${files.length > 0 ? `
          <div class="delivery-section-subtitle">
            <span>📥 Attached Deliverable Files (${files.length})</span>
          </div>
          <div class="delivery-files-grid">
            ${files.map(f => `
              <div class="delivery-file-card">
                <div class="file-info-col">
                  <span class="file-type-icon">${getFileIcon(f.name)}</span>
                  <div class="file-name-size">
                    <span class="file-name-text" title="${escapeHtmlText(f.name)}">${escapeHtmlText(f.name)}</span>
                    <span class="file-size-text">${escapeHtmlText(f.size || 'Download File')}</span>
                  </div>
                </div>
                <a href="${f.dataUrl || '#'}" download="${escapeHtmlText(f.name)}" class="btn-file-download" title="Download ${escapeHtmlText(f.name)}">
                  ⬇️ Download
                </a>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Live External Links -->
        ${links.length > 0 ? `
          <div class="delivery-section-subtitle">
            <span>🌐 Live Cloud &amp; Resource Links (${links.length})</span>
          </div>
          <div class="delivery-links-grid">
            ${links.map(l => `
              <a href="${escapeHtmlText(l.url)}" target="_blank" rel="noopener noreferrer" class="delivery-link-btn" title="Open ${escapeHtmlText(l.title)}">
                <span>🔗 ${escapeHtmlText(l.title || 'Live Project Link')}</span>
                <span style="font-size: 11px;">↗</span>
              </a>
            `).join('')}
          </div>
        ` : ''}

        <!-- Revision History if Any -->
        ${Array.isArray(order.revisions) && order.revisions.length > 0 ? `
          <div class="revision-log-container">
            <div class="revision-log-title">
              <span>🔄 Revision History (${order.revisions.length})</span>
            </div>
            ${order.revisions.map((rev, ri) => `
              <div style="font-size: 12.5px; color: #cbd5e1; margin-bottom: 6px; padding: 6px 10px; background: rgba(0,0,0,0.25); border-radius: 6px;">
                <strong style="color: #fbbf24;">Revision Request #${rev.revisionNumber || (ri + 1)}:</strong> ${escapeHtmlText(rev.note || 'Requested adjustments')}
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Client Decision Action Controls (Fiverr standard) -->
        <div class="delivery-client-actions-bar">
          ${isCompletedOrAccepted ? `
            <div class="delivery-accepted-banner">
              <span>🎉</span>
              <div>
                <strong>Delivery Accepted &amp; Completed!</strong>
                <span style="display: block; font-size: 12px; font-weight: normal; color: #a7f3d0; margin-top: 2px;">
                  This project has been finalized. Thank you for choosing Ruddranil!
                </span>
              </div>
            </div>
          ` : (isCurrentlyInRevision ? `
            <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; flex-wrap: wrap; gap: 10px;">
              <div style="display: flex; align-items: center; gap: 8px; color: #fbbf24; font-size: 13.5px; font-weight: 700;">
                <span>🔄</span>
                <span>Revision in Progress — Ruddranil is modifying your deliverables</span>
              </div>
              <button type="button" onclick="openAcceptDeliveryModal('${order.id}')" class="btn btn-sm btn-accept-order-delivery">
                ✓ Accept Early &amp; Complete
              </button>
            </div>
          ` : `
            <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; flex-wrap: wrap; gap: 12px;">
              <div style="font-size: 13px; color: #e2e8f0;">
                Are you satisfied with this delivery? Please approve to finalize or request adjustments:
              </div>
              <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <button type="button" onclick="openClientRevisionModal('${order.id}')" class="btn-request-order-revision">
                  🔄 Request Revision
                </button>
                <button type="button" onclick="openAcceptDeliveryModal('${order.id}')" class="btn-accept-order-delivery">
                  ✓ Accept Delivery &amp; Complete
                </button>
              </div>
            </div>
          `)}
        </div>
      </div>
    `;
  }

  const currentFingerprint = JSON.stringify({
    id: order.id,
    status: order.status,
    progress: order.progress,
    clientAccepted: Boolean(order.clientAccepted),
    deliveryVersion: delivery?.version || (Array.isArray(order.deliveries) ? order.deliveries.length : null),
    deliveryDeliveredAt: delivery?.deliveredAt || null,
    filesCount: Array.isArray(delivery?.files) ? delivery.files.length : 0,
    linksCount: Array.isArray(delivery?.links) ? delivery.links.length : 0,
    revisionsCount: Array.isArray(order.revisions) ? order.revisions.length : 0
  });

  if (isSilentRefresh && window.__renderedOrderFingerprint === currentFingerprint && hasExistingContent && window.__lastRenderedOrderId === cleanId) {
    return;
  }
  window.__renderedOrderFingerprint = currentFingerprint;
  window.__lastRenderedOrderId = cleanId;

  container.innerHTML = `
    <div class="tracking-wrapper">
      <div class="tracking-header">
        <div>
          <div class="tracking-id-label">ORDER ID</div>
          <div class="tracking-id-val">#${order.id.replace(/^#/, '')}</div>
        </div>
        <div>
          ${statusBadgeHtml}
        </div>
      </div>

      <div class="progress-bar-container">
        <div class="progress-label-bar">
          <span>Project Progress</span>
          <span style="color: var(--accent-cyan); font-weight: 700;">${order.progress}%</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width: ${order.progress}%;"></div>
        </div>
      </div>

      <div class="stepper-grid">
        <div class="step-card ${step1Active ? 'active' : ''}">
          <div class="step-badge">${step1Badge}</div>
          <div>
            <div class="step-card-title">Order Received</div>
            <div class="step-card-desc">Your order request has been logged</div>
          </div>
        </div>

        <div class="step-card ${step2Active ? 'active' : (step2Current ? 'current' : '')}">
          <div class="step-badge">${step2Badge}</div>
          <div>
            <div class="step-card-title">${isAccepted ? 'Request Accepted' : 'In Progress'}</div>
            <div class="step-card-desc">${isAccepted ? 'Admin accepted your request and commenced project work' : 'Actively executing deliverables'}</div>
          </div>
        </div>

        <div class="step-card ${step3Active ? 'active' : (step3Current ? 'current' : '')}">
          <div class="step-badge">${step3Badge}</div>
          <div>
            <div class="step-card-title">${isCurrentlyInRevision ? 'In Revision' : 'Review Phase'}</div>
            <div class="step-card-desc">${isCurrentlyInRevision ? 'Client requested modifications' : 'Quality audit and revision check'}</div>
          </div>
        </div>

        <div class="step-card ${step4Active ? 'active' : ''}">
          <div class="step-badge">${step4Badge}</div>
          <div>
            <div class="step-card-title">${statusLower === 'completed' ? 'Completed' : 'Delivered'}</div>
            <div class="step-card-desc">Project completed &amp; handed over</div>
          </div>
        </div>
      </div>

      <!-- Injected Fiverr-Style Delivery Card -->
      ${deliverySectionHtml}

      <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--border-color); display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; font-size: 13px; color: var(--text-gray);">
        <div><strong>Service:</strong> <span style="color: #fff;">${escapeHtmlText(order.service)}</span></div>
        <div><strong>Package Tier:</strong> <span style="color: var(--accent-cyan); text-transform: uppercase;">${escapeHtmlText(order.packageTier || 'Basic')}</span></div>
        <div><strong>Total Paid:</strong> <span style="color: #fff;">${escapeHtmlText(order.price)}</span></div>
        <div><strong>Delivery Timeline:</strong> <span style="color: #fff;">${order.deliveryDays || 3} Days ${order.isExpress ? '⚡ Express' : ''}</span></div>
        <div><strong>Client:</strong> <span style="color: #fff;">${escapeHtmlText(order.customerName)}</span></div>
        <div><strong>Last Updated:</strong> <span style="color: #fff;">${escapeHtmlText(order.lastUpdated || 'Just now')}</span></div>
      </div>
    </div>
  `;
  container.style.display = 'block';
}

// ==========================================================================
// CLIENT DELIVERY APPROVAL & REVISION INTERACTION HANDLERS
// ==========================================================================
window.openAcceptDeliveryModal = function(orderId) {
  const modal = document.getElementById('clientAcceptDeliveryModal');
  const idInput = document.getElementById('acceptDeliveryOrderId');
  if (idInput) idInput.value = orderId;
  window.setDeliveryRating(5);
  if (modal) modal.style.display = 'flex';
};

window.closeAcceptDeliveryModal = function() {
  const modal = document.getElementById('clientAcceptDeliveryModal');
  if (modal) modal.style.display = 'none';
};

window.setDeliveryRating = function(rating) {
  const valInput = document.getElementById('deliveryRatingValue');
  const descEl = document.getElementById('deliveryRatingDesc');
  const starsWrap = document.getElementById('deliveryRatingStarsWrap');
  if (valInput) valInput.value = rating;

  const descMap = {
    1: '1.0 — Very Poor',
    2: '2.0 — Needs Improvement',
    3: '3.0 — Average Work',
    4: '4.0 — Great Experience!',
    5: '5.0 — Outstanding & Highly Recommended!'
  };
  if (descEl) descEl.textContent = descMap[rating] || '5.0 — Highly Recommended!';

  if (starsWrap) {
    const stars = starsWrap.querySelectorAll('.delivery-star');
    stars.forEach((s, idx) => {
      s.style.color = (idx < rating) ? '#fbbf24' : '#475569';
    });
  }
};

window.handleAcceptDeliveryFormSubmit = async function(e) {
  e.preventDefault();
  const orderId = document.getElementById('acceptDeliveryOrderId')?.value;
  const rating = parseInt(document.getElementById('deliveryRatingValue')?.value || '5', 10);
  const comment = document.getElementById('deliveryReviewComment')?.value.trim();

  if (!orderId || !comment) {
    if (typeof showToast === 'function') showToast('Please enter your review comment', 'error');
    return;
  }

  // 1. Update order status to Completed in local storage
  const cleanId = orderId.replace(/^#/, '');
  const orders = JSON.parse(localStorage.getItem('ruddranil_orders') || '[]');
  const order = orders.find(o => 
    (o.id || '').toLowerCase() === cleanId.toLowerCase() || 
    (o.id || '').toLowerCase().replace(/^#/, '') === cleanId.toLowerCase()
  );

  if (order) {
    order.status = 'Completed';
    order.progress = 100;
    order.clientAccepted = true;
    order.completedAt = new Date().toISOString();
    order.lastUpdated = 'Just now';
    localStorage.setItem('ruddranil_orders', JSON.stringify(orders));
  }

  // 2. Submit Review to public reviews system
  try {
    const reviewPayload = {
      orderId: cleanId,
      name: order?.customerName || 'Verified Client',
      email: order?.customerEmail || '',
      service: order?.service || 'Digital Service',
      rating: rating,
      comment: comment,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(order?.customerName || 'Client')}`,
      verified: true
    };

    if (window.submitReview && typeof window.submitReview === 'function') {
      window.submitReview(reviewPayload);
    } else {
      const existingReviews = JSON.parse(localStorage.getItem('app_reviews') || '[]');
      existingReviews.unshift({ id: 'REV-' + Date.now(), ...reviewPayload });
      localStorage.setItem('app_reviews', JSON.stringify(existingReviews));
    }
  } catch (err) {}

  // 3. Sync status to backend & Supabase
  try {
    await fetch(`/api/orders/${encodeURIComponent(cleanId)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'Completed',
        progress: 100,
        clientAccepted: true,
        completedAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      })
    });
  } catch (err) {}

  if (window.sbClient) {
    try {
      await window.sbClient
        .from('orders')
        .update({ status: 'Completed', progress: 100, last_updated: new Date().toISOString() })
        .ilike('id', cleanId);
    } catch (e) {}
  }

  closeAcceptDeliveryModal();
  if (typeof showToast === 'function') {
    showToast('🎉 Delivery accepted! Thank you for your 5-star review!');
  }

  renderOrderTracking(cleanId);
};

window.openClientRevisionModal = function(orderId) {
  const modal = document.getElementById('clientRevisionModal');
  const idInput = document.getElementById('clientRevisionOrderId');
  if (idInput) idInput.value = orderId;
  const noteInput = document.getElementById('clientRevisionNote');
  if (noteInput) noteInput.value = '';
  if (modal) modal.style.display = 'flex';
};

window.closeClientRevisionModal = function() {
  const modal = document.getElementById('clientRevisionModal');
  if (modal) modal.style.display = 'none';
};

window.handleClientRevisionSubmit = async function(e) {
  e.preventDefault();
  const orderId = document.getElementById('clientRevisionOrderId')?.value;
  const note = document.getElementById('clientRevisionNote')?.value.trim();

  if (!orderId || !note) {
    if (typeof showToast === 'function') showToast('Please detail what adjustments are needed', 'error');
    return;
  }

  const cleanId = orderId.replace(/^#/, '');
  const orders = JSON.parse(localStorage.getItem('ruddranil_orders') || '[]');
  const order = orders.find(o => 
    (o.id || '').toLowerCase() === cleanId.toLowerCase() || 
    (o.id || '').toLowerCase().replace(/^#/, '') === cleanId.toLowerCase()
  );

  const existingRevisions = Array.isArray(order?.revisions) ? order.revisions : [];
  const revObj = {
    revisionNumber: existingRevisions.length + 1,
    requestedAt: new Date().toISOString(),
    note: note,
    status: 'pending'
  };
  const updatedRevisions = [...existingRevisions, revObj];

  if (order) {
    order.status = 'In Revision';
    order.progress = 80;
    order.revisions = updatedRevisions;
    order.lastUpdated = 'Just now';
    localStorage.setItem('ruddranil_orders', JSON.stringify(orders));
  }

  // Sync to backend and cloud
  try {
    await fetch(`/api/orders/${encodeURIComponent(cleanId)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'In Revision',
        progress: 80,
        revisions: updatedRevisions,
        lastUpdated: new Date().toISOString()
      })
    });
  } catch (err) {}

  if (window.sbClient) {
    try {
      await window.sbClient
        .from('orders')
        .update({ status: 'In Revision', progress: 80, last_updated: new Date().toISOString() })
        .ilike('id', cleanId);
    } catch (e) {}
  }

  closeClientRevisionModal();
  if (typeof showToast === 'function') {
    showToast('🔄 Revision request sent! Ruddranil will update your deliverables promptly.');
  }

  renderOrderTracking(cleanId);
};

// Auto-refresh active tracking session smoothly in real-time
if (typeof window !== 'undefined') {
  window.addEventListener('ruddranil_orders_updated', (e) => {
    if (window.__activeTrackingOrderId) {
      renderOrderTracking(window.__activeTrackingOrderId, true);
    }
  });

  setInterval(() => {
    if (document.hidden) return;
    const acceptModal = document.getElementById('clientAcceptDeliveryModal');
    const revisionModal = document.getElementById('clientRevisionModal');
    const isAnyModalOpen = (acceptModal && acceptModal.style.display === 'flex') || (revisionModal && revisionModal.style.display === 'flex');
    if (isAnyModalOpen) return;

    if (window.__activeTrackingOrderId && document.getElementById('trackingDisplayContainer')) {
      renderOrderTracking(window.__activeTrackingOrderId, true);
    }
  }, 10000);
}

// 14. Portfolio Feed Interactions
window.likePost = function(buttonOrPid, projectId, defaultCount) {
  let btn = buttonOrPid;
  let pid = projectId;
  let count = defaultCount;

  // Case 1: likePost('proj-1', 14)
  if (typeof buttonOrPid === 'string') {
    pid = buttonOrPid;
    btn = document.getElementById(`likeBtn-${pid}`) || document.querySelector(`[data-like-project="${pid}"]`);
    if (typeof projectId === 'number') {
      count = projectId;
    }
  } else if (buttonOrPid && buttonOrPid.target) {
    // Case 2: likePost(event)
    btn = buttonOrPid.currentTarget || buttonOrPid.target;
  }

  // Ensure btn is the container element if a child span/icon was clicked
  if (btn && typeof btn.closest === 'function') {
    btn = btn.closest('[data-like-project], [id^="likeBtn-"]') || btn;
  }

  if (!pid && btn) {
    pid = btn.getAttribute('data-like-project') || (btn.id ? btn.id.replace('likeBtn-', '') : null);
  }
  if (!pid) pid = 'proj-1';

  const defaultCounts = { 'proj-1': 14, 'proj-2': 28, 'proj-3': 19 };
  if (count === undefined) {
    count = defaultCounts[pid] || 10;
  }

  // If supabase-client's handleLikeToggle is available, call it
  if (typeof window.handleLikeToggle === 'function') {
    window.handleLikeToggle(btn, pid, count);
  } else {
    // Bulletproof local fallback
    const target = btn || document.getElementById(`likeBtn-${pid}`) || document.querySelector(`[data-like-project="${pid}"]`);
    if (target) {
      const countSpan = target.querySelector('span');
      let current = countSpan ? (parseInt(countSpan.textContent, 10) || count) : count;
      const wasLiked = target.classList.contains('liked') || target.textContent.includes('❤️');
      const nowLiked = !wasLiked;
      const nextCount = nowLiked ? (current + 1) : Math.max(0, current - 1);

      target.innerHTML = `${nowLiked ? '❤️' : '🤍'} Like (<span>${nextCount}</span>)`;
      target.style.color = nowLiked ? '#ef4444' : 'var(--text-gray)';
      target.style.fontWeight = nowLiked ? '700' : '500';
      target.classList.toggle('liked', nowLiked);

      if (typeof showToast === 'function') {
        showToast(nowLiked ? 'Liked this project! ❤️' : 'Unliked project 🤍');
      }
    }
  }
};

window.commentPost = function(projectTitleOrId, projectIdParam) {
  let pid = projectIdParam;
  let title = projectTitleOrId;
  if (!projectIdParam || (typeof projectTitleOrId === 'string' && projectTitleOrId.startsWith('proj-'))) {
    pid = projectTitleOrId;
    let projects = [];
    try { projects = JSON.parse(localStorage.getItem('ruddranil_portfolio_projects') || '[]'); } catch(e){}
    const p = projects.find(item => item.id === pid) || (window.DEFAULT_PORTFOLIO_PROJECTS || []).find(item => item.id === pid);
    title = p ? p.title : (projectIdParam || pid);
  }
  if (!pid) pid = 'proj-1';
  if (!title) title = 'Project';

  if (typeof window.openCommentModal === 'function') {
    window.openCommentModal(pid, title);
  } else {
    const comment = prompt(`Leave a comment for "${title}":`);
    if (comment && comment.trim()) {
      showToast('Comment submitted! Thank you.');
    }
  }
};

window.sharePost = function(projectTitleOrId, projectIdParam) {
  let pid = projectIdParam;
  let title = projectTitleOrId;
  if (!projectIdParam || (typeof projectTitleOrId === 'string' && projectTitleOrId.startsWith('proj-'))) {
    pid = projectTitleOrId;
    let projects = [];
    try { projects = JSON.parse(localStorage.getItem('ruddranil_portfolio_projects') || '[]'); } catch(e){}
    const p = projects.find(item => item.id === pid) || (window.DEFAULT_PORTFOLIO_PROJECTS || []).find(item => item.id === pid);
    title = p ? p.title : (projectIdParam || pid);
  }
  if (!pid) pid = 'proj-1';
  if (!title) title = 'Project';

  if (typeof window.handleShareProject === 'function') {
    window.handleShareProject(pid, title);
  } else {
    let origin = window.location.origin;
    if (origin.includes('ais-dev-')) {
      origin = origin.replace('ais-dev-', 'ais-pre-');
    }
    const cleanPid = pid || 'proj-1';
    const shareUrl = `${origin}/portfolio.html?project=${encodeURIComponent(cleanPid)}#${cleanPid}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareUrl);
      showToast(`Link for "${title}" copied to clipboard! ↗`);
    } else {
      prompt('Copy this project link:', shareUrl);
    }
  }
};

window.openModal = function(projectIdOrTitle, category, description, mediaUrl = '') {
  let modal = document.getElementById('projectDetailsModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'projectDetailsModal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }

  let title = projectIdOrTitle || 'Showcase Project';
  let cat = category || 'PORTFOLIO';
  let desc = description || '';
  let media = mediaUrl || '';
  let serviceLink = 'Website Design';

  // Support calling with single projectId parameter: openModal('proj-1') or openModal(pid)
  let projects = [];
  try {
    projects = JSON.parse(localStorage.getItem('ruddranil_portfolio_projects') || '[]');
  } catch (e) {}

  const matched = projects.find(p => p.id === projectIdOrTitle) || 
                  (window.DEFAULT_PORTFOLIO_PROJECTS || []).find(p => p.id === projectIdOrTitle);

  if (matched && (!category || arguments.length <= 2)) {
    title = matched.title || title;
    cat = matched.category || cat;
    desc = matched.details || matched.description || desc;
    media = matched.mediaUrl || media;
    serviceLink = matched.serviceSlug || serviceLink;
  }

  const safeTitle = typeof escapeHtmlText === 'function' ? escapeHtmlText(title) : (title || '');
  const safeCat = typeof escapeHtmlText === 'function' ? escapeHtmlText(cat) : (cat || 'PORTFOLIO');
  let cleanMedia = media ? media.trim() : '';
  if (cleanMedia.startsWith('public/')) {
    cleanMedia = '/' + cleanMedia;
  }
  const isVideo = isVideoMediaUrl(cleanMedia);

  let mediaMarkup = '';
  if (cleanMedia) {
    if (isVideo && (cleanMedia.includes('youtube.com') || cleanMedia.includes('youtu.be'))) {
      const embedUrl = getYouTubeEmbedUrl(cleanMedia);
      mediaMarkup = `
        <div style="border-radius: 8px; overflow: hidden; margin-bottom: 16px; border: 1px solid var(--border-color); aspect-ratio: 16/9; background: #000;">
          <iframe src="${embedUrl}" title="${safeTitle}" style="width:100%;height:100%;border:none;" allowfullscreen></iframe>
        </div>
      `;
    } else if (isVideo) {
      mediaMarkup = `
        <div style="border-radius: 8px; overflow: hidden; margin-bottom: 16px; border: 1px solid var(--border-color); background: #000;">
          <video src="${cleanMedia}" controls playsinline style="width:100%;max-height:360px;object-fit:contain;"></video>
        </div>
      `;
    } else {
      mediaMarkup = `
        <div style="border-radius: 8px; overflow: hidden; margin-bottom: 16px; border: 1px solid var(--border-color);">
          <img src="${cleanMedia}" alt="${safeTitle}" style="width: 100%; max-height: 360px; object-fit: cover;" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=80';">
        </div>
      `;
    }
  }

  modal.innerHTML = `
    <div class="modal-card" style="max-width: 680px; width: 100%;">
      <button onclick="closeProjectModal()" class="modal-close-btn" aria-label="Close modal">✕</button>
      <span class="section-kicker" style="margin-bottom: 6px;">${safeCat.toUpperCase()}</span>
      <h3 style="font-size: 22px; font-weight: 800; color: #fff; margin-bottom: 14px;">${safeTitle}</h3>
      
      ${mediaMarkup}

      <p style="font-size: 14px; color: var(--text-gray); line-height: 1.7; margin-bottom: 24px; white-space: pre-line;">
        ${typeof escapeHtmlText === 'function' ? escapeHtmlText(desc) : desc}
      </p>

      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <button onclick="closeProjectModal(); orderServiceDirect('${escapeHtmlText(serviceLink)}')" class="btn btn-primary btn-block btn-lg" style="flex: 1; min-width: 180px;">
          Order Similar Project
        </button>
        <button onclick="closeProjectModal()" class="btn btn-secondary btn-lg">
          Close
        </button>
      </div>
    </div>
  `;

  modal.style.display = 'flex';
};

window.closeProjectModal = function() {
  const modal = document.getElementById('projectDetailsModal');
  if (modal) modal.style.display = 'none';
};

// 15. User Logout Handler
window.logoutUser = async function() {
  if (window.sbClient && window.sbClient.auth) {
    try {
      await window.sbClient.auth.signOut();
    } catch (e) {
      console.warn('Sign out notice:', e);
    }
  }
  localStorage.removeItem('currentUser');
  showToast('Logged out successfully');
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 350);
};

// 16. Global Navbar Profile Dropdown Helper
window.toggleNavProfileDropdown = function(e) {
  if (e && e.stopPropagation) e.stopPropagation();
  const navMenu = document.getElementById('navMenu');
  const navBackdrop = document.getElementById('navBackdrop');
  const menuToggle = document.getElementById('menuToggle');
  if (navMenu) navMenu.classList.remove('open');
  if (navBackdrop) navBackdrop.classList.remove('open');
  if (menuToggle) {
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
  document.body.style.overflow = '';

  const dropdown = document.getElementById('navProfileDropdown');
  const btn = document.getElementById('navProfilePillBtn');
  if (!dropdown) return;
  const isOpen = dropdown.classList.contains('open');
  dropdown.classList.toggle('open', !isOpen);
  if (btn) btn.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
};

window.closeNavProfileDropdown = function() {
  const dropdown = document.getElementById('navProfileDropdown');
  const btn = document.getElementById('navProfilePillBtn');
  if (dropdown) dropdown.classList.remove('open');
  if (btn) btn.setAttribute('aria-expanded', 'false');
};

