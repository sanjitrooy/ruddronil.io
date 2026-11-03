/**
 * Ruddranil.io - Service Packages & Pricing Configuration (packages-config.js)
 * Clean, maintainable configuration for all 5 professional digital services.
 * Basic, Standard (Most Popular), and Premium tiers with USD pricing,
 * detailed deliverables, turnaround timelines, revision counts, and clear exclusions.
 */

(function () {
  'use strict';

  const DEFAULT_SERVICE_PACKAGES = [
    {
      serviceId: 'srv-fb-marketing',
      serviceName: 'Facebook Marketing',
      serviceSlug: 'facebook-marketing',
      category: 'Digital Marketing',
      startingPrice: 30,
      packages: [
        {
          tier: 'basic',
          name: 'Starter Growth',
          price: 30,
          currency: 'USD',
          deliveryDays: 4,
          revisions: '1 Revision',
          description: 'Essential Facebook page optimization, audience targeting, and initial campaign setup.',
          deliverables: [
            'Target Audience & Demographic Research',
            'Facebook Page Optimization & CTA Setup',
            '3 Custom High-Resolution Feed Creatives',
            'Ad Campaign Structure & Launch',
            'Initial Performance Benchmark Report'
          ],
          limitations: 'Ad spend not included (billed directly by Meta). 1 campaign set only.',
          isRecommended: false,
          isActive: true
        },
        {
          tier: 'standard',
          name: 'Business Accelerate',
          price: 60,
          currency: 'USD',
          deliveryDays: 6,
          revisions: '3 Revisions',
          description: 'Comprehensive ad campaign setup, Meta Pixel tracking, creative A/B testing, and weekly optimization.',
          deliverables: [
            'Full Target Audience & Competitor Research',
            'Meta Business Suite & Pixel Setup with Conversion API',
            '7 Custom Feed & Story Ad Creatives',
            'A/B Split Testing for Copy, Headlines & Audiences',
            'Retargeting Funnel Setup for Warm Visitors',
            'Weekly Performance Analysis & Optimization'
          ],
          limitations: 'Ad spend billed directly to client credit card by Meta. Single ad account.',
          isRecommended: true,
          recommendedLabel: 'Most Popular',
          isActive: true
        },
        {
          tier: 'premium',
          name: 'Dominance Pro',
          price: 120,
          currency: 'USD',
          deliveryDays: 12,
          revisions: 'Unlimited Revisions',
          description: 'Full-funnel 30-day Facebook & Instagram ad management, dynamic retargeting, and daily bid scaling.',
          deliverables: [
            'Complete Multi-Stage Funnel Architecture (TOFU/MOFU/BOFU)',
            '15 Custom Video & Graphic High-CTR Creatives',
            'Lookalike Audience (LAL) Modeling from Best Customers',
            'Meta Catalog / Dynamic Product Ads Setup',
            'Daily Bid, Budget & ROAS Optimization',
            'Weekly 1-on-1 Strategy Review & Real-Time Dashboard'
          ],
          limitations: 'Ad spend paid directly to Meta. Multi-product stores may require extra asset prep.',
          isRecommended: false,
          isActive: true
        }
      ]
    },
    {
      serviceId: 'srv-yt-marketing',
      serviceName: 'YouTube Marketing',
      serviceSlug: 'youtube-marketing',
      category: 'Digital Marketing',
      startingPrice: 40,
      packages: [
        {
          tier: 'basic',
          name: 'Video Launchpad',
          price: 40,
          currency: 'USD',
          deliveryDays: 5,
          revisions: '1 Revision',
          description: 'Targeted promotion for 1 video to jumpstart organic algorithm discovery and viewer engagement.',
          deliverables: [
            '1 Video Targeted Campaign Setup',
            'Niche Audience Demographics & Interest Research',
            'Google Video Ads Account Configuration',
            'Placement Optimization on Related Channels',
            'Key Metrics & View Duration Report'
          ],
          limitations: 'Google Ads budget billed separately. Promotional views subject to organic retention.',
          isRecommended: false,
          isActive: true
        },
        {
          tier: 'standard',
          name: 'Channel Expansion',
          price: 80,
          currency: 'USD',
          deliveryDays: 8,
          revisions: '3 Revisions',
          description: 'Multi-video campaign covering 3 videos, community growth, playlist placement, and retention boost.',
          deliverables: [
            '3 Videos Promotional Setup & Strategy',
            'Audience Affinity & Keyword Targeting',
            'Community Tab Outreach & Engagement Strategy',
            'Curated Playlist Sequencing for Binge-Watching',
            'Viewer Retention Curve Analysis',
            'Call-to-Action End Screen Guidance'
          ],
          limitations: 'Google ad spend billed directly by Google. Video production not included.',
          isRecommended: true,
          recommendedLabel: 'Most Popular',
          isActive: true
        },
        {
          tier: 'premium',
          name: 'Authority Creator Kit',
          price: 150,
          currency: 'USD',
          deliveryDays: 14,
          revisions: 'Unlimited Revisions',
          description: 'Complete channel growth strategy for 7 videos with Google Ads setup, custom audience retargeting, and full channel audit.',
          deliverables: [
            '7 Videos Promoted Across Targeted Audiences',
            'In-Stream & Discovery Google Video Ads Optimization',
            'Custom Remarketing List from Past Channel Viewers',
            'Channel Branding & Banner CTR Assessment',
            'Thumbnail Contrast & CTR Audit',
            'Monthly Channel Growth Blueprint & Handover'
          ],
          limitations: 'Ad spend billed directly by Google. Video editing/filming not included.',
          isRecommended: false,
          isActive: true
        }
      ]
    },
    {
      serviceId: 'srv-yt-seo',
      serviceName: 'YouTube SEO',
      serviceSlug: 'youtube-seo',
      category: 'Search Engine Optimization',
      startingPrice: 25,
      packages: [
        {
          tier: 'basic',
          name: 'Starter SEO Pack',
          price: 25,
          currency: 'USD',
          deliveryDays: 3,
          revisions: '1 Revision',
          description: 'Essential search metadata optimization for 2 videos to rank in YouTube and Google search results.',
          deliverables: [
            '2 Videos Fully Optimized',
            'High Search Volume, Low Competition Keyword Tags',
            'Click-Driven, Keyword-Optimized Titles',
            'Structured Keyword-Rich Description & Hashtags',
            'VidIQ / TubeBuddy Score Optimization'
          ],
          limitations: 'Thumbnail graphic creation not included in basic tier.',
          isRecommended: false,
          isActive: true
        },
        {
          tier: 'standard',
          name: 'Ranking Surge',
          price: 50,
          currency: 'USD',
          deliveryDays: 5,
          revisions: '3 Revisions',
          description: 'In-depth SEO optimization for 5 videos, competitor keyword extraction, and playlist search hierarchy.',
          deliverables: [
            '5 Videos Complete Search Metadata Optimization',
            'Competitor Keyword Tag Spying & Gap Analysis',
            'SEO-Optimized Playlist Titles & Descriptions',
            'Timestamps & Chapter Marker Optimization',
            'VidIQ Score 90+ Target Alignment',
            'Cards & End-Screen Placement Strategy'
          ],
          limitations: 'Video editing or content changes not included.',
          isRecommended: true,
          recommendedLabel: 'Most Popular',
          isActive: true
        },
        {
          tier: 'premium',
          name: 'Complete Channel Audit',
          price: 90,
          currency: 'USD',
          deliveryDays: 8,
          revisions: 'Unlimited Revisions',
          description: 'Full channel SEO overhaul for 10 videos, channel keyword architecture, and evergreen search ranking strategy.',
          deliverables: [
            '10 Videos Complete Deep SEO Optimization',
            'Channel About & Channel Keywords Restructure',
            'Evergreen Search Content Planning Guide',
            'Thumbnail Click-Through Rate (CTR) Analysis',
            'Internal Linking & Related Video Card Funnel',
            'Complete PDF Channel SEO Audit with Recommendations'
          ],
          limitations: 'Ad campaigns not included. Requires YouTube Studio viewer/manager access or copy-paste implementation.',
          isRecommended: false,
          isActive: true
        }
      ]
    },
    {
      serviceId: 'srv-web-design',
      serviceName: 'Website Design',
      serviceSlug: 'website-design',
      category: 'Web Development',
      startingPrice: 100,
      packages: [
        {
          tier: 'basic',
          name: 'One-Page Modern Landing',
          price: 100,
          currency: 'USD',
          deliveryDays: 7,
          revisions: '2 Revisions',
          description: 'Modern, high-converting one-page landing page built with clean semantic code and mobile-first design.',
          deliverables: [
            '1 Custom Responsive Landing Page',
            'Mobile, Tablet & Desktop Responsive Layout',
            'Speed Optimized (Sub-1s Load Time, 95+ Lighthouse)',
            'Functional Project Inquiry / Contact Form',
            'Social Media & WhatsApp Quick-Chat Integration',
            'Cross-Browser Tested (Chrome, Safari, Firefox, Edge)'
          ],
          limitations: 'Multi-page architecture and e-commerce checkout not included in basic tier.',
          isRecommended: false,
          isActive: true
        },
        {
          tier: 'standard',
          name: 'Multi-Page Business Site',
          price: 220,
          currency: 'USD',
          deliveryDays: 12,
          revisions: '4 Revisions',
          description: 'Complete multi-page corporate website with dark UI, cyan accents, portfolio showcase, and full SEO tags.',
          deliverables: [
            'Up to 5 Custom Responsive Pages (Home, About, Services, Work, Contact)',
            'Modern Cyber-Cyan Design System & Subtle Animations',
            'Interactive Portfolio Showcase with Media Previews',
            'Complete On-Page SEO (Meta Titles, Descriptions, OG Social Cards)',
            'Interactive Contact Forms with Instant Email Notifications',
            'Google Analytics & Search Console Integration'
          ],
          limitations: 'Custom user account database / payment gateway integration not included in standard tier.',
          isRecommended: true,
          recommendedLabel: 'Most Popular',
          isActive: true
        },
        {
          tier: 'premium',
          name: 'Full Platform & Portal',
          price: 450,
          currency: 'USD',
          deliveryDays: 18,
          revisions: 'Unlimited Revisions',
          description: 'Full-stack web application with client portal, user authentication, live database, and admin dashboard.',
          deliverables: [
            'Unlimited Custom Dynamic Pages & Subpages',
            'Customer Account Portal (Sign In, Profile, Order Tracking)',
            'Super Admin Control Console (Orders, Services, Coupons, Reviews)',
            'Cloud Database Integration (Supabase / PostgreSQL)',
            'Secure Authentication & Role-Based Access Control',
            '1 Month Dedicated Maintenance, Bug Fixes & Technical Support'
          ],
          limitations: 'Hosting and third-party domain registration fees paid by client.',
          isRecommended: false,
          isActive: true
        }
      ]
    },
    {
      serviceId: 'srv-graphic-design',
      serviceName: 'Graphic Design',
      serviceSlug: 'graphic-design',
      category: 'Creative Design',
      startingPrice: 20,
      packages: [
        {
          tier: 'basic',
          name: 'Social Media Pack',
          price: 20,
          currency: 'USD',
          deliveryDays: 3,
          revisions: '2 Revisions',
          description: '2 high-resolution social media post designs or banner creatives optimized for your brand channels.',
          deliverables: [
            '2 Custom High-Resolution Visual Creatives',
            'Platform Optimized Formats (Square, Story & Banner)',
            'High-Quality PNG, JPG & WebP Deliverables',
            'Clean Typography & Color Alignment',
            '2 Revision Rounds Included'
          ],
          limitations: 'Layered source files (PSD/AI/Figma) not included in basic tier.',
          isRecommended: false,
          isActive: true
        },
        {
          tier: 'standard',
          name: 'Brand Assets Suite',
          price: 45,
          currency: 'USD',
          deliveryDays: 4,
          revisions: '4 Revisions',
          description: '5 custom graphic designs with layered editable source files, color harmony, and commercial usage license.',
          deliverables: [
            '5 Custom Graphic Designs (Feed Posts, Banners, or Ads)',
            'Layered Editable Source Files (Figma / PSD / Vector)',
            'Brand Color Palette & Font Pairing Harmony',
            'Commercial Usage Rights License',
            'High-Resolution Print-Ready & Web-Ready Exports',
            '4 Revision Rounds Included'
          ],
          limitations: 'Logo creation not included in this package (available in Premium).',
          isRecommended: true,
          recommendedLabel: 'Most Popular',
          isActive: true
        },
        {
          tier: 'premium',
          name: 'Complete Identity System',
          price: 90,
          currency: 'USD',
          deliveryDays: 6,
          revisions: 'Unlimited Revisions',
          description: 'Complete brand visual identity kit including logo mark, social media suite, style guide, and source files.',
          deliverables: [
            '10 Comprehensive Visual Brand Creatives',
            'Original Vector Logo Mark (Color, Black, White Variations)',
            'Full Social Media Identity Kit (Banners, Icons, Highlight Covers)',
            'Brand Style Guide (Hex Codes, Typography Hierarchy, Usage Rules)',
            'All Master Vector Files (AI, SVG, EPS, PDF, PNG)',
            'Unlimited Revisions for 100% Brand Satisfaction'
          ],
          limitations: '3D modeling/animation not included.',
          isRecommended: false,
          isActive: true
        }
      ]
    }
  ];

  /**
   * Helper to convert an admin service format into the 3-tier package configuration
   */
  function convertAdminServiceToPackageFormat(adminService, baseTemplate) {
    const b = adminService.packages?.basic || { name: 'Starter Pack', price: 30, deliveryDays: 4, features: [] };
    const std = adminService.packages?.standard || { name: 'Standard Growth', price: 60, deliveryDays: 6, features: [] };
    const prem = adminService.packages?.premium || { name: 'VIP Scale', price: 120, deliveryDays: 12, features: [] };

    const startingPrice = Math.min(Number(b.price) || 30, Number(std.price) || 60, Number(prem.price) || 120);

    const basePkgList = baseTemplate?.packages || [];
    const baseBasic = basePkgList.find(p => p.tier === 'basic') || {};
    const baseStd = basePkgList.find(p => p.tier === 'standard') || {};
    const basePrem = basePkgList.find(p => p.tier === 'premium') || {};

    return {
      serviceId: adminService.id || baseTemplate?.serviceId || `srv-${adminService.slug || 'custom'}`,
      serviceName: adminService.name,
      serviceSlug: adminService.slug || baseTemplate?.serviceSlug || adminService.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: adminService.category || baseTemplate?.category || 'Digital Creative',
      startingPrice: startingPrice,
      packages: [
        {
          tier: 'basic',
          name: b.name || baseBasic.name || 'Starter Growth',
          price: Number(b.price) || 30,
          currency: 'USD',
          deliveryDays: Number(b.deliveryDays) || baseBasic.deliveryDays || 4,
          revisions: b.revisions || baseBasic.revisions || '1 Revision',
          description: b.desc || baseBasic.description || (adminService.description || 'Core service deliverables.'),
          deliverables: (Array.isArray(b.features) && b.features.length > 0) ? b.features : (baseBasic.deliverables || ['Core Deliverables']),
          limitations: baseBasic.limitations || '',
          isRecommended: false,
          isActive: true
        },
        {
          tier: 'standard',
          name: std.name || baseStd.name || 'Business Accelerate',
          price: Number(std.price) || 60,
          currency: 'USD',
          deliveryDays: Number(std.deliveryDays) || baseStd.deliveryDays || 6,
          revisions: std.revisions || baseStd.revisions || '3 Revisions',
          description: std.desc || baseStd.description || (adminService.description || 'Comprehensive project scope.'),
          deliverables: (Array.isArray(std.features) && std.features.length > 0) ? std.features : (baseStd.deliverables || ['Comprehensive Scope']),
          limitations: baseStd.limitations || '',
          isRecommended: true,
          recommendedLabel: 'Most Popular',
          isActive: true
        },
        {
          tier: 'premium',
          name: prem.name || basePrem.name || 'Dominance Pro',
          price: Number(prem.price) || 120,
          currency: 'USD',
          deliveryDays: Number(prem.deliveryDays) || basePrem.deliveryDays || 12,
          revisions: prem.revisions || basePrem.revisions || 'Unlimited Revisions',
          description: prem.desc || basePrem.description || (adminService.description || 'VIP full turnkey execution.'),
          deliverables: (Array.isArray(prem.features) && prem.features.length > 0) ? prem.features : (basePrem.deliverables || ['VIP Execution & Support']),
          limitations: basePrem.limitations || '',
          isRecommended: false,
          isActive: true
        }
      ]
    };
  }

  /**
   * Get all active service packages, merging with any admin customizations
   */
  function getAllServicePackages() {
    try {
      // 1. First check authoritative ruddranil_services updated by Admin Panel
      const rawAdminServices = localStorage.getItem('ruddranil_services');
      if (rawAdminServices) {
        const adminServices = JSON.parse(rawAdminServices);
        if (Array.isArray(adminServices) && adminServices.length > 0) {
          // Merge with DEFAULT_SERVICE_PACKAGES
          const result = DEFAULT_SERVICE_PACKAGES.map(baseTemplate => {
            const match = adminServices.find(s => 
              s && (
                s.slug === baseTemplate.serviceSlug ||
                (s.name && s.name.toLowerCase() === baseTemplate.serviceName.toLowerCase())
              )
            );
            if (match) {
              return convertAdminServiceToPackageFormat(match, baseTemplate);
            }
            return baseTemplate;
          });

          // Also include any custom added gigs from admin
          adminServices.forEach(s => {
            if (!result.some(r => r.serviceSlug === s.slug || (r.serviceName && s.name && r.serviceName.toLowerCase() === s.name.toLowerCase()))) {
              result.push(convertAdminServiceToPackageFormat(s, null));
            }
          });

          return result;
        }
      }

      // 2. Fallback to direct ruddranil_service_packages if set
      const stored = localStorage.getItem('ruddranil_service_packages');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading stored packages:', e);
    }
    return DEFAULT_SERVICE_PACKAGES;
  }

  /**
   * Save customized service packages (Admin interface)
   */
  function saveServicePackages(packages) {
    try {
      localStorage.setItem('ruddranil_service_packages', JSON.stringify(packages));
      window.dispatchEvent(new CustomEvent('ruddranil_packages_updated', { detail: packages }));
      return true;
    } catch (e) {
      console.error('Error saving packages:', e);
      return false;
    }
  }

  /**
   * Escape HTML utility
   */
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  let currentSelectedServiceSlug = 'facebook-marketing';

  /**
   * Render the "Choose Your Perfect Package" section
   */
  function renderPackagesSection(containerId = 'servicePackagesContainer', initialSlug = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const allServices = getAllServicePackages();
    if (initialSlug) {
      currentSelectedServiceSlug = initialSlug;
    }

    const currentService = allServices.find(s => s.serviceSlug === currentSelectedServiceSlug) || allServices[0];
    currentSelectedServiceSlug = currentService.serviceSlug;

    // Render Service Navigation Tabs & The Three Pricing Cards
    container.innerHTML = `
      <!-- Service Navigation Tabs -->
      <div class="packages-service-nav" style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-bottom: 32px;" role="tablist" aria-label="Services pricing options">
        ${allServices.map(s => {
          const isSelected = s.serviceSlug === currentSelectedServiceSlug;
          return `
            <button 
              type="button" 
              role="tab"
              aria-selected="${isSelected ? 'true' : 'false'}"
              class="btn ${isSelected ? 'btn-primary' : 'btn-secondary'} btn-sm package-service-tab-btn"
              onclick="window.switchPackageService('${s.serviceSlug}')"
              style="padding: 9px 18px; font-weight: 700; border-radius: var(--radius-sm); font-size: 13.5px;"
            >
              ${escapeHtml(s.serviceName)}
              <span style="font-size: 11px; opacity: 0.8; margin-left: 4px; font-weight: 500;">(from $${s.startingPrice})</span>
            </button>
          `;
        }).join('')}
      </div>

      <!-- Active Service Information Sub-Header -->
      <div style="text-align: center; margin-bottom: 28px;">
        <span class="brand-badge" style="display: inline-block; margin-bottom: 6px;">
          ${escapeHtml(currentService.category.toUpperCase())}
        </span>
        <h4 style="font-size: 22px; font-weight: 800; color: #ffffff; margin-bottom: 4px;">
          ${escapeHtml(currentService.serviceName)} Packages
        </h4>
        <p style="font-size: 13.5px; color: var(--text-gray); max-width: 600px; margin: 0 auto;">
          Choose between Basic, Standard, or Premium. Select the tier that matches your exact project goals.
        </p>
      </div>

      <!-- 3-Column Pricing Cards Grid (Basic, Standard - Most Popular, Premium) -->
      <div class="packages-pricing-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 24px; align-items: stretch; margin-bottom: 36px;">
        ${currentService.packages.map(pkg => {
          const isPop = Boolean(pkg.isRecommended);
          const tierTag = (pkg.tier || 'basic').toUpperCase();
          let tierColor = '#38bdf8'; // Cyan for basic
          if (pkg.tier === 'standard') tierColor = '#60a5fa'; // Blue for standard
          if (pkg.tier === 'premium') tierColor = '#f59e0b'; // Amber for premium

          return `
            <div 
              class="card package-pricing-card ${isPop ? 'card-recommended' : ''}" 
              id="pkg-card-${pkg.tier}"
              style="display: flex; flex-direction: column; justify-content: space-between; padding: 32px 26px; border-radius: var(--radius-lg); position: relative; border: 1.5px solid ${isPop ? 'rgba(0, 212, 255, 0.55)' : 'var(--border-color)'}; background: ${isPop ? 'linear-gradient(180deg, rgba(15, 28, 55, 0.95) 0%, rgba(8, 14, 28, 0.98) 100%)' : 'var(--bg-card)'}; box-shadow: ${isPop ? '0 15px 40px rgba(0, 212, 255, 0.12)' : 'none'}; transition: transform 0.2s ease, border-color 0.2s ease;"
            >
              ${isPop ? `
                <div class="package-recommended-ribbon" style="position: absolute; top: -13px; left: 50%; transform: translateX(-50%); background: linear-gradient(135deg, #0284c7, #2563eb); color: #fff; font-size: 11px; font-weight: 800; padding: 4px 14px; border-radius: var(--radius-full); letter-spacing: 0.5px; text-transform: uppercase; box-shadow: 0 4px 12px rgba(2, 132, 199, 0.4); display: flex; align-items: center; gap: 4px;">
                  ⭐ ${escapeHtml(pkg.recommendedLabel || 'Most Popular')}
                </div>
              ` : ''}

              <!-- Top Content Area -->
              <div>
                <!-- Tier Header -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: ${tierColor};">
                    ${tierTag} TIER
                  </span>
                  <span style="font-size: 12px; color: var(--text-dark-gray); font-weight: 600;">
                    ${escapeHtml(pkg.revisions)}
                  </span>
                </div>

                <!-- Package Title -->
                <h4 style="font-size: 21px; font-weight: 800; color: #ffffff; margin-bottom: 6px;">
                  ${escapeHtml(pkg.name)}
                </h4>

                <!-- Price in USD -->
                <div style="display: flex; align-items: baseline; gap: 4px; margin-bottom: 14px;">
                  <span style="font-size: 20px; font-weight: 800; color: var(--accent-cyan);">$</span>
                  <span style="font-size: 40px; font-weight: 900; color: #ffffff; line-height: 1; letter-spacing: -1px;">${pkg.price}</span>
                  <span style="font-size: 13px; color: var(--text-dark-gray); font-weight: 600; margin-left: 2px;">USD</span>
                </div>

                <!-- Short Description -->
                <p style="font-size: 13.5px; color: var(--text-gray); line-height: 1.55; margin-bottom: 18px; min-height: 42px;">
                  ${escapeHtml(pkg.description)}
                </p>

                <!-- Delivery & Revision Meta Badges -->
                <div style="display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap;">
                  <div style="display: inline-flex; align-items: center; gap: 6px; background: rgba(255, 255, 255, 0.04); border: 1px solid var(--border-color); padding: 5px 10px; border-radius: 6px; font-size: 12px; color: #e2e8f0;">
                    <span>⏱</span>
                    <strong>${pkg.deliveryDays} Days Delivery</strong>
                  </div>
                  <div style="display: inline-flex; align-items: center; gap: 6px; background: rgba(255, 255, 255, 0.04); border: 1px solid var(--border-color); padding: 5px 10px; border-radius: 6px; font-size: 12px; color: #e2e8f0;">
                    <span>🔄</span>
                    <strong>${escapeHtml(pkg.revisions)}</strong>
                  </div>
                </div>

                <!-- Divider -->
                <div style="height: 1px; background: var(--border-color); margin-bottom: 18px;"></div>

                <!-- Deliverables List -->
                <div style="margin-bottom: 18px;">
                  <span style="font-size: 11px; text-transform: uppercase; font-weight: 800; color: var(--text-dark-gray); letter-spacing: 0.8px; display: block; margin-bottom: 10px;">
                    Included Deliverables:
                  </span>
                  <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 9px; font-size: 13px; color: var(--text-light-gray);">
                    ${pkg.deliverables.map(del => `
                      <li style="display: flex; align-items: flex-start; gap: 8px; line-height: 1.45;">
                        <span style="color: #10b981; font-weight: 800; font-size: 14px; flex-shrink: 0; line-height: 1.2;">✓</span>
                        <span>${escapeHtml(del)}</span>
                      </li>
                    `).join('')}
                  </ul>
                </div>

                <!-- Limitations / Exclusions Callout -->
                ${pkg.limitations ? `
                  <div style="margin-top: 14px; margin-bottom: 22px; padding: 9px 12px; background: rgba(0, 0, 0, 0.3); border: 1px dashed rgba(255, 255, 255, 0.1); border-radius: 6px; font-size: 11.5px; color: var(--text-dark-gray); line-height: 1.45;">
                    <strong style="color: #94a3b8;">Note:</strong> ${escapeHtml(pkg.limitations)}
                  </div>
                ` : '<div style="margin-bottom: 22px;"></div>'}
              </div>

              <!-- Prominent Order Action Button -->
              <div>
                <button 
                  type="button" 
                  class="btn ${isPop ? 'btn-primary' : 'btn-outline'} btn-block btn-lg"
                  onclick="window.orderPackageDirect('${escapeHtml(currentService.serviceName)}', '${pkg.tier}')"
                  style="justify-content: center; font-weight: 800; font-size: 14.5px; ${isPop ? 'background: linear-gradient(135deg, #0284c7, #2563eb); border-color: #0284c7; box-shadow: 0 4px 18px rgba(2, 132, 199, 0.35);' : ''}"
                  aria-label="Order ${escapeHtml(currentService.serviceName)} ${escapeHtml(pkg.name)} for $${pkg.price} USD"
                >
                  Order This Package →
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Trust Assurance Bar -->
      <div style="background: rgba(15, 23, 42, 0.5); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 16px 20px; display: flex; justify-content: space-around; align-items: center; flex-wrap: wrap; gap: 14px; font-size: 12.5px; color: var(--text-gray);">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="color: #10b981; font-size: 16px;">🛡️</span>
          <span><strong>100% On-Time Delivery Guarantee</strong></span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="color: var(--accent-cyan); font-size: 16px;">💬</span>
          <span><strong>Clear Communication &amp; Live Tracking</strong></span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="color: #fbbf24; font-size: 16px;">⭐</span>
          <span><strong>5-Star Authentic Client Satisfaction</strong></span>
        </div>
      </div>
    `;
  }

  /**
   * Switch the active service packages display
   */
  window.switchPackageService = function (serviceSlug) {
    currentSelectedServiceSlug = serviceSlug;
    renderPackagesSection('servicePackagesContainer', serviceSlug);
  };

  /**
   * Order This Package Button Handler
   * Fully integrated with existing authentication and checkout workflow
   */
  window.orderPackageDirect = function (serviceName, tier = 'basic') {
    // 1. Check if user is logged in
    const isLoggedIn = (function () {
      try {
        const localUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        return Boolean(localUser && (localUser.email || localUser.id));
      } catch (e) {
        return false;
      }
    })();

    // 2. If logged in -> Open checkout modal directly with service and tier preselected
    if (isLoggedIn && typeof window.openFiverrOrderModal === 'function') {
      window.openFiverrOrderModal(serviceName, tier);
      return;
    }

    // 3. If logged out -> Preserve selected package and direct through existing login flow
    // Store pending selection in sessionStorage for zero loss
    try {
      sessionStorage.setItem('ruddranil_pending_package_order', JSON.stringify({
        service: serviceName,
        tier: tier,
        timestamp: Date.now()
      }));
    } catch (e) {}

    // If modal prompt is available in script.js, use it
    if (typeof window.openFiverrOrderModal === 'function') {
      window.openFiverrOrderModal(serviceName, tier);
    } else {
      // Fallback direct redirection to login with preservation parameters
      const redirectUrl = `login.html?redirect=index.html&order=${encodeURIComponent(serviceName)}&tier=${encodeURIComponent(tier)}`;
      window.location.href = redirectUrl;
    }
  };

  // Export functions to window
  window.getAllServicePackages = getAllServicePackages;
  window.saveServicePackages = saveServicePackages;
  window.renderPackagesSection = renderPackagesSection;

  // Auto-initialize on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    // Check if deep link requests a specific package or service
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service') || urlParams.get('order');
    if (serviceParam) {
      const clean = serviceParam.toLowerCase().replace(/\s+/g, '-');
      currentSelectedServiceSlug = clean;
    }

    renderPackagesSection('servicePackagesContainer', currentSelectedServiceSlug);

    // Listen for cross-device package & service updates
    window.addEventListener('ruddranil_packages_updated', () => {
      renderPackagesSection('servicePackagesContainer', currentSelectedServiceSlug);
    });
    window.addEventListener('ruddranil_services_updated', () => {
      renderPackagesSection('servicePackagesContainer', currentSelectedServiceSlug);
    });
  });

})();
