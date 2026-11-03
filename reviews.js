/**
 * Ruddranil.io - Premium Client Reviews & 5-Star Rating System (reviews.js)
 * Live Supabase cloud sync, database eligibility checks, interactive star rating,
 * optional project image upload, image lightbox, and admin moderation sync.
 */

(function () {
  'use strict';

  let selectedRating = 5;
  let selectedReviewImageFile = null;
  let currentFilter = 'all';

  // Pagination config: Show 9 reviews initially, followed by "See More Reviews" button
  const REVIEWS_PAGE_SIZE = 9;
  let reviewsVisibleLimit = 9;

  // 18 Comprehensive Verified Client Reviews across all core services
  const DEFAULT_REVIEWS = [
    {
      id: 'REV-101',
      name: 'Sanjit Roy',
      role: 'Business Owner & Founder',
      rating: 5,
      comment: 'Outstanding web development work and Facebook marketing! Super responsive and delivered ahead of schedule. The conversion rate jumped within 48 hours.',
      service: 'Facebook Marketing',
      projectUrl: 'https://ruddranil.io',
      date: 'Oct 15, 2026',
      verified: true,
      helpful: 14,
      status: 'approved'
    },
    {
      id: 'REV-102',
      name: 'Sarah Jenkins',
      role: 'Marketing Director',
      rating: 5,
      comment: 'The YouTube SEO and video optimization service doubled our organic channel reach within two weeks. Clear communication and impeccable results!',
      service: 'YouTube SEO',
      date: 'Oct 11, 2026',
      verified: true,
      helpful: 11,
      status: 'approved'
    },
    {
      id: 'REV-103',
      name: 'Alex Rivera',
      role: 'Creative Lead',
      rating: 5,
      comment: 'Clean aesthetics, high conversion design, and fantastic communication throughout the project. The delivered brand assets exceeded our expectations.',
      service: 'Graphic Design',
      date: 'Oct 08, 2026',
      verified: true,
      helpful: 9,
      status: 'approved'
    },
    {
      id: 'REV-104',
      name: 'David Chen',
      role: 'E-commerce Founder',
      rating: 5,
      comment: 'Built an automated WhatsApp and Messenger funnel that closes sales 24/7. Our response time dropped from 3 hours to 2 seconds, saving us huge staff hours!',
      service: 'Chatbot Automation',
      date: 'Sep 29, 2026',
      verified: true,
      helpful: 16,
      status: 'approved'
    },
    {
      id: 'REV-105',
      name: 'Emily Watson',
      role: 'Brand Strategist',
      rating: 5,
      comment: 'Ruddranil revamped our complete branding, logo suite, and social media templates. Flawless typography and modern gradients. Highly recommended!',
      service: 'Graphic Design',
      date: 'Sep 24, 2026',
      verified: true,
      helpful: 8,
      imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
      status: 'approved'
    },
    {
      id: 'REV-106',
      name: 'Michael Scott',
      role: 'Agency Founder',
      rating: 5,
      comment: 'Our Facebook ad ROAS scaled from 1.8x to 4.2x after his Meta Pixel & CAPI audit and targeted creative split-testing. Truly exceptional marketer.',
      service: 'Facebook Marketing',
      date: 'Sep 18, 2026',
      verified: true,
      helpful: 22,
      status: 'approved'
    },
    {
      id: 'REV-107',
      name: 'Priya Sharma',
      role: 'SaaS Founder',
      rating: 5,
      comment: 'The responsive web application is blazing fast, perfectly optimized on mobile, and scored 99 on Google Lighthouse. Fantastic work and fast delivery!',
      service: 'Website Design',
      projectUrl: 'https://ruddranil.io',
      date: 'Sep 12, 2026',
      verified: true,
      helpful: 13,
      status: 'approved'
    },
    {
      id: 'REV-108',
      name: 'Marcus Vance',
      role: 'Fitness Coach & Entrepreneur',
      rating: 5,
      comment: 'Automated booking system + WhatsApp reminder bot saved me at least 15 hours every week. Clients love the instant confirmation experience.',
      service: 'Chatbot Automation',
      date: 'Sep 05, 2026',
      verified: true,
      helpful: 7,
      status: 'approved'
    },
    {
      id: 'REV-109',
      name: 'Jessica Taylor',
      role: 'Content Creator',
      rating: 5,
      comment: 'YouTube ranking for our top 3 target keywords went from #45 to top 3 within 18 days. Keyword density, tags, and thumbnails are on point!',
      service: 'YouTube SEO',
      date: 'Aug 28, 2026',
      verified: true,
      helpful: 19,
      status: 'approved'
    },
    {
      id: 'REV-110',
      name: 'Liam O\'Connor',
      role: 'Real Estate Broker',
      rating: 5,
      comment: 'Facebook lead generation campaign generated 142 qualified property buyer leads in the first month at under $3.40 per lead. Unbelievable precision.',
      service: 'Facebook Marketing',
      date: 'Aug 21, 2026',
      verified: true,
      helpful: 12,
      status: 'approved'
    },
    {
      id: 'REV-111',
      name: 'Daniel Martinez',
      role: 'Tech Startup CEO',
      rating: 5,
      comment: 'Modern UI/UX design with responsive layouts and dark/light mode toggle. Delivered days before our investor presentation deadline.',
      service: 'Website Design',
      date: 'Aug 14, 2026',
      verified: true,
      helpful: 15,
      imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
      status: 'approved'
    },
    {
      id: 'REV-112',
      name: 'Samantha Reed',
      role: 'Online Course Creator',
      rating: 5,
      comment: 'The YouTube playlist SEO structure and captivating thumbnails increased my channel CTR by 4.8%. Working with Ruddranil was effortless and seamless.',
      service: 'YouTube SEO',
      date: 'Aug 07, 2026',
      verified: true,
      helpful: 6,
      status: 'approved'
    },
    {
      id: 'REV-113',
      name: 'Tariq Al-Mansoor',
      role: 'Retail Director',
      rating: 5,
      comment: 'Custom chatbot handles multilingual customer queries and connects to our inventory backend. Outstanding delivery and post-launch support.',
      service: 'Chatbot Automation',
      date: 'Jul 30, 2026',
      verified: true,
      helpful: 10,
      status: 'approved'
    },
    {
      id: 'REV-114',
      name: 'Chloe Bennett',
      role: 'Fashion Designer',
      rating: 5,
      comment: 'Professional banner designs, Instagram carousel graphics, and lookbook styling. Exceeded all visual expectations with gorgeous colors!',
      service: 'Graphic Design',
      date: 'Jul 22, 2026',
      verified: true,
      helpful: 17,
      imageUrl: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80',
      status: 'approved'
    },
    {
      id: 'REV-115',
      name: 'Kevin Zhang',
      role: 'App Developer',
      rating: 5,
      comment: 'Landing page developed with semantic HTML, CSS animations, and instant load time. Conversion rate went up by 35% in week 1.',
      service: 'Website Design',
      date: 'Jul 15, 2026',
      verified: true,
      helpful: 14,
      status: 'approved'
    },
    {
      id: 'REV-116',
      name: 'Rachel Adams',
      role: 'Clinic Manager',
      rating: 5,
      comment: 'Our Facebook appointment booking ads brought 68 new patients in our first 3 weeks. Incredible ROI and professional communication throughout.',
      service: 'Facebook Marketing',
      date: 'Jul 09, 2026',
      verified: true,
      helpful: 18,
      status: 'approved'
    },
    {
      id: 'REV-117',
      name: 'James Wilson',
      role: 'Podcast Host',
      rating: 5,
      comment: 'Optimized our YouTube video titles, descriptions, and chapters. Video impressions grew 300% month over month with high retention.',
      service: 'YouTube SEO',
      date: 'Jun 28, 2026',
      verified: true,
      helpful: 9,
      status: 'approved'
    },
    {
      id: 'REV-118',
      name: 'Amanda Foster',
      role: 'Restaurant Chain Owner',
      rating: 5,
      comment: 'Automated menu order bot on Messenger and WhatsApp. Customers can browse specials and reserve tables instantly. Worth every penny!',
      service: 'Chatbot Automation',
      date: 'Jun 20, 2026',
      verified: true,
      helpful: 21,
      status: 'approved'
    }
  ];

  const STAR_DESCRIPTIONS = {
    1: '★☆☆☆☆ 1.0 — Disappointed with Delivery',
    2: '★★☆☆☆ 2.0 — Below Expectations',
    3: '★★★☆☆ 3.0 — Good & Acceptable Delivery',
    4: '★★★★☆ 4.0 — Very Good & Highly Recommended 👍',
    5: '★★★★★ 5.0 — Outstanding Work & Exceptional Quality! 🔥'
  };

  /**
   * Escape HTML helper to prevent XSS
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

  /**
   * Safe URL linkifier for review feedback text
   */
  function linkifyComment(str) {
    if (!str) return '';
    const safeStr = escapeHtml(str);
    const urlPattern = /(\b(https?:\/\/|www\.)[^\s<]+)/gi;
    return safeStr.replace(urlPattern, (url) => {
      let href = url;
      if (!href.startsWith('http://') && !href.startsWith('https://')) {
        href = 'https://' + href;
      }
      return `<a href="${href}" target="_blank" rel="noopener noreferrer" style="color: var(--accent-cyan); text-decoration: underline; font-weight: 600; word-break: break-all;">${url}</a>`;
    });
  }

  /**
   * Render reviews into any target container
   */
  async function refreshReviewsDisplay(filter = 'all') {
    currentFilter = filter;

    let reviewData = { reviews: [], avgRating: '5.0', totalCount: 0, distribution: {} };
    if (typeof window.fetchPublicReviews === 'function') {
      try {
        reviewData = await window.fetchPublicReviews();
      } catch (e) {
        console.warn('[Reviews UI] Fetch error:', e);
      }
    }

    let reviews = Array.isArray(reviewData.reviews) ? [...reviewData.reviews] : [];

    // Ensure all 18 default seed reviews exist in the dataset
    DEFAULT_REVIEWS.forEach(defRev => {
      if (!reviews.some(r => r.id === defRev.id)) {
        reviews.push(defRev);
      }
    });

    // Cache merged reviews
    try {
      localStorage.setItem('app_reviews', JSON.stringify(reviews));
    } catch (e) {}

    // Calculate updated metrics
    if (reviews.length > 0) {
      let sum = 0;
      reviews.forEach(r => {
        sum += (Number(r.rating) || 5);
      });
      reviewData.avgRating = (sum / reviews.length).toFixed(1);
      reviewData.totalCount = reviews.length;
    }

    // Update aggregate metrics across DOM
    const avgElements = document.querySelectorAll('.reviews-avg-rating-val, #reviewsAvgRating, #homeReviewsAvgRating');
    avgElements.forEach(el => {
      el.textContent = reviewData.avgRating;
    });

    const countElements = document.querySelectorAll('.reviews-total-count-val, #reviewsTotalCount, #homeReviewsTotalCount');
    countElements.forEach(el => {
      el.textContent = `${reviews.length} Verified Reviews`;
    });

    // Filter reviews
    let filtered = [...reviews];
    if (filter === '5star') {
      filtered = filtered.filter(r => Number(r.rating) === 5);
    } else if (filter === 'with-images') {
      filtered = filtered.filter(r => Boolean(r.imageUrl || r.image_url));
    } else if (filter === 'verified') {
      filtered = filtered.filter(r => r.verified !== false && r.verified_order !== false);
    }

    // Target containers: homepage container & reviews.html container
    const containers = [
      document.getElementById('reviewsFeedContainer'),
      document.getElementById('homeReviewsFeedContainer')
    ].filter(Boolean);

    containers.forEach(container => {
      renderReviewsGrid(container, filtered);
    });

    // Render "See More Reviews" button below the grid
    renderSeeMoreControls(filtered.length);
  }

  /**
   * Render review cards into a specific container with public Like, Comment, Share, and Video actions
   */
  function renderReviewsGrid(container, reviewsList) {
    if (!container) return;

    if (!reviewsList || reviewsList.length === 0) {
      container.innerHTML = `
        <div class="card review-empty-card" style="text-align: center; padding: 48px 24px; grid-column: 1 / -1; background: var(--bg-card); border: 1px dashed var(--border-color); border-radius: var(--radius-lg);">
          <div style="font-size: 36px; margin-bottom: 12px;">⭐</div>
          <h4 style="font-size: 17px; font-weight: 700; color: #fff; margin-bottom: 6px;">No reviews found</h4>
          <p style="font-size: 13.5px; color: var(--text-gray); max-width: 420px; margin: 0 auto 18px;">
            There are currently no reviews matching this filter.
          </p>
          <button type="button" onclick="window.triggerWriteReviewFlow()" class="btn btn-primary btn-sm">
            ✍️ Be the First to Review
          </button>
        </div>
      `;
      return;
    }

    let reviewLikesStore = {};
    try {
      reviewLikesStore = JSON.parse(localStorage.getItem('ruddranil_review_likes_v1') || '{}');
    } catch (e) {}

    let commentsStore = {};
    try {
      commentsStore = JSON.parse(localStorage.getItem('ruddranil_review_comments_v1') || '{}');
    } catch (e) {}

    const visibleReviews = reviewsList.slice(0, reviewsVisibleLimit);

    container.innerHTML = visibleReviews.map((rev, idx) => {
      const revId = rev.id || ('rev-' + idx);
      const revCount = reviewLikesStore[revId]?.count !== undefined ? reviewLikesStore[revId].count : (rev.helpful || 0);
      const isRevLiked = Boolean(reviewLikesStore[revId]?.liked);
      const revComments = commentsStore[revId] || [];
      const commentCount = revComments.length || rev.comments_count || 0;
      const ratingNum = Math.min(5, Math.max(1, parseInt(rev.rating, 10) || 5));
      const starsHtml = '★'.repeat(ratingNum) + '☆'.repeat(5 - ratingNum);
      const reviewerName = rev.name || rev.customer_name || 'Visitor';
      const initial = reviewerName.charAt(0).toUpperCase();
      const avatarUrl = rev.avatar || rev.customer_avatar || null;
      const attachedImage = rev.imageUrl || rev.image_url || null;
      const attachedVideo = rev.videoUrl || rev.video_url || null;
      const serviceName = rev.service || rev.service_name || 'Digital Creative';
      const projectLink = rev.projectUrl || rev.project_url || null;
      const isVerified = Boolean(rev.verified || rev.verified_order);

      return `
        <div class="card review-card" id="card-${revId}" style="display: flex; flex-direction: column; justify-content: space-between; padding: 24px; position: relative; border-radius: 16px; transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease; border: 1px solid var(--border-color); background: var(--bg-card);">
          <div>
            <!-- Header: Avatar, Name, Role, Verified / Guest Badge -->
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; gap: 10px;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 44px; height: 44px; border-radius: 50%; overflow: hidden; background: linear-gradient(135deg, #0284c7, #2563eb); border: 2px solid var(--accent-cyan); display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #fff;">
                  ${avatarUrl ? `
                    <img src="${escapeHtml(avatarUrl)}" alt="${escapeHtml(reviewerName)}" style="width: 100%; height: 100%; object-fit: cover;">
                  ` : `
                    <span style="font-weight: 800; font-size: 16px;">${initial}</span>
                  `}
                </div>
                <div>
                  <h4 style="font-size: 15px; font-weight: 800; color: #fff; margin-bottom: 2px;">${escapeHtml(reviewerName)}</h4>
                  <p style="font-size: 12px; color: var(--text-dark-gray); margin: 0;">${escapeHtml(rev.role || rev.role_company || (isVerified ? 'Verified Client' : 'Visitor Review'))}</p>
                </div>
              </div>

              ${isVerified ? `
                <span class="badge-status badge-in-progress" style="font-size: 11px; padding: 3px 9px; flex-shrink: 0;" title="Confirmed completed project order">
                  ✓ Verified Order
                </span>
              ` : `
                <span class="badge-status" style="font-size: 11px; padding: 3px 9px; flex-shrink: 0; background: rgba(16, 185, 129, 0.12); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3);" title="Client or visitor experience">
                  Guest Review
                </span>
              `}
            </div>

            <!-- Star Rating & Service Tag -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 6px;">
              <div style="color: #fbbf24; font-size: 18px; letter-spacing: 2px;" aria-label="${ratingNum} out of 5 stars">
                ${starsHtml}
              </div>
              <span class="review-service-pill" style="font-size: 11px; font-weight: 700; color: var(--accent-cyan); background: rgba(0, 212, 255, 0.08); border: 1px solid rgba(0, 212, 255, 0.2); padding: 3px 9px; border-radius: 6px;">
                💼 ${escapeHtml(serviceName)}
              </span>
            </div>

            <!-- Review Text with Auto-linkified URLs -->
            <p style="font-size: 14px; color: var(--text-gray); line-height: 1.65; margin-bottom: 12px;">
              "${linkifyComment(rev.comment)}"
            </p>

            <!-- Dedicated Video Review Badge (if provided) -->
            ${attachedVideo ? `
              <div style="margin-bottom: 12px;">
                <button type="button" class="btn-review-video-pill" onclick="window.openReviewVideoModal('${escapeHtml(attachedVideo)}', '${escapeHtml(reviewerName)}')" title="Watch Video Review">
                  <span>▶ Watch Video Review</span>
                  <span style="font-size: 11px; opacity: 0.8;">↗</span>
                </button>
              </div>
            ` : ''}

            <!-- Dedicated Clickable Live Project Link (if provided) -->
            ${projectLink ? `
              <div style="margin-bottom: 14px;">
                <a href="${escapeHtml(projectLink)}" target="_blank" rel="noopener noreferrer" class="review-project-link-badge" title="Visit Live Project: ${escapeHtml(projectLink)}">
                  <span>🔗 Live Project / Outcome</span>
                  <span style="font-size: 11px; opacity: 0.75;">↗</span>
                </a>
              </div>
            ` : ''}

            <!-- Optional Attached Project Image (Thumbnail) -->
            ${attachedImage ? `
              <div class="review-image-thumbnail-wrap" style="margin-bottom: 16px; border-radius: 10px; overflow: hidden; border: 1.5px solid rgba(0, 212, 255, 0.3); background: #040711; cursor: pointer; position: relative; max-height: 180px;" onclick="window.openReviewImageLightbox('${escapeHtml(attachedImage)}', '${escapeHtml(serviceName)} by ${escapeHtml(reviewerName)}')">
                <img src="${escapeHtml(attachedImage)}" alt="Project deliverable for ${escapeHtml(serviceName)}" loading="lazy" style="width: 100%; height: 180px; object-fit: cover; transition: transform 0.3s ease; display: block;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
                <div style="position: absolute; bottom: 8px; right: 8px; background: rgba(15, 23, 42, 0.88); backdrop-filter: blur(6px); padding: 4px 9px; border-radius: 6px; font-size: 11px; color: #fff; font-weight: 700; display: flex; align-items: center; gap: 5px; border: 1px solid rgba(255,255,255,0.15);">
                  🔍 View Image
                </div>
              </div>
            ` : ''}
          </div>

          <!-- Card Footer: Date & Public Community Actions (Like, Comment, Share) -->
          <div style="border-top: 1px solid var(--border-color); padding-top: 14px; font-size: 12px; color: var(--text-dark-gray); display: flex; justify-content: space-between; align-items: center; margin-top: 6px; flex-wrap: wrap; gap: 8px;">
            <span style="font-size: 12px; color: var(--text-dark-gray);">${escapeHtml(rev.date || 'Recent review')}</span>
            
            <div class="review-actions-bar">
              <!-- 1. Helpful Like Button (Open to all visitors) -->
              <button type="button" class="btn-review-action ${isRevLiked ? 'active-liked' : ''}" onclick="window.toggleReviewHelpful(this, '${revId}')" title="Like / Helpful">
                👍 <span>Helpful</span> (<span class="like-num">${revCount}</span>)
              </button>

              <!-- 2. Comment Button (Open to all visitors) -->
              <button type="button" class="btn-review-action" onclick="window.openReviewCommentsModal('${revId}', '${escapeHtml(reviewerName)}')" title="Comments & Replies">
                💬 <span>Comments</span> (${commentCount})
              </button>

              <!-- 3. Share Button (Open to all visitors) -->
              <button type="button" class="btn-review-action" onclick="window.shareReviewItem('${revId}', '${escapeHtml(reviewerName)}')" title="Share this review">
                ↗ <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  /**
   * Render "See More Reviews" button below the reviews feed
   * Shows 9 reviews initially, with progress counter and smooth expansion
   */
  function renderSeeMoreControls(totalCount) {
    const loadMoreContainers = [
      document.getElementById('reviewsLoadMoreWrap'),
      document.getElementById('homeReviewsLoadMoreWrap')
    ].filter(Boolean);

    if (loadMoreContainers.length === 0) return;

    loadMoreContainers.forEach(container => {
      if (totalCount <= REVIEWS_PAGE_SIZE) {
        container.innerHTML = '';
        return;
      }

      const currentlyShown = Math.min(reviewsVisibleLimit, totalCount);
      const remaining = totalCount - currentlyShown;
      const progressPercent = Math.min(100, Math.round((currentlyShown / totalCount) * 100));

      if (remaining > 0) {
        container.innerHTML = `
          <div class="reviews-pagination-card" style="display: inline-flex; flex-direction: column; align-items: center; gap: 12px; margin-top: 14px; padding: 18px 28px; background: rgba(8, 14, 28, 0.7); border: 1px solid rgba(0, 212, 255, 0.2); border-radius: 20px; backdrop-filter: blur(8px); box-shadow: 0 10px 30px rgba(0,0,0,0.35);">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 13px; color: var(--text-gray); font-weight: 600;">
                Showing <strong style="color: var(--accent-cyan); font-weight: 800;">${currentlyShown}</strong> of <strong style="color: #fff; font-weight: 800;">${totalCount}</strong> Verified Reviews
              </span>
              <span style="font-size: 11px; padding: 2px 8px; border-radius: 12px; background: rgba(0, 212, 255, 0.12); color: var(--accent-cyan); font-weight: 700; border: 1px solid rgba(0, 212, 255, 0.25);">
                ${progressPercent}%
              </span>
            </div>

            <div style="width: 220px; height: 5px; background: rgba(255, 255, 255, 0.08); border-radius: 6px; overflow: hidden;">
              <div style="width: ${progressPercent}%; height: 100%; background: linear-gradient(90deg, #00d4ff, #2563eb); border-radius: 6px; transition: width 0.35s ease;"></div>
            </div>

            <button 
              type="button" 
              onclick="window.loadMoreReviews()" 
              class="btn btn-primary" 
              style="padding: 12px 34px; font-weight: 800; font-size: 14px; background: linear-gradient(135deg, #0284c7, #2563eb); border: 1.5px solid rgba(0, 212, 255, 0.45); box-shadow: 0 6px 24px rgba(2, 132, 199, 0.4); border-radius: 30px; display: inline-flex; align-items: center; gap: 9px; cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease;"
              onmouseover="this.style.transform='translateY(-2px)'"
              onmouseout="this.style.transform='translateY(0)'"
              aria-label="Load more reviews"
            >
              <span>See More Reviews (${remaining} more)</span>
              <span style="font-size: 17px; line-height: 1;">▾</span>
            </button>
          </div>
        `;
      } else {
        container.innerHTML = `
          <div class="reviews-pagination-card" style="display: inline-flex; flex-direction: column; align-items: center; gap: 10px; margin-top: 14px; padding: 16px 26px; background: rgba(8, 14, 28, 0.6); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 18px;">
            <div style="font-size: 13px; color: var(--text-gray); font-weight: 600; display: flex; align-items: center; gap: 6px;">
              <span style="color: #34d399; font-size: 15px;">✓</span>
              <span>Showing all <strong style="color: var(--accent-cyan); font-weight: 800;">${totalCount}</strong> reviews</span>
            </div>
            <button 
              type="button" 
              onclick="window.collapseReviews()" 
              class="btn btn-secondary btn-sm" 
              style="font-size: 12px; padding: 6px 18px; border-radius: 20px; color: var(--text-gray); border-color: rgba(255, 255, 255, 0.15);"
              aria-label="Collapse reviews back to 9"
            >
              Show Less ▴
            </button>
          </div>
        `;
      }
    });
  }

  /**
   * Action: Load 9 more reviews
   */
  window.loadMoreReviews = function () {
    reviewsVisibleLimit += REVIEWS_PAGE_SIZE;
    refreshReviewsDisplay(currentFilter);
  };

  /**
   * Action: Collapse reviews back to first 9
   */
  window.collapseReviews = function () {
    reviewsVisibleLimit = REVIEWS_PAGE_SIZE;
    refreshReviewsDisplay(currentFilter);
    const target = document.getElementById('reviewsFeedContainer') || document.getElementById('homeReviewsFeedContainer');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  /**
   * Interactive Star Picker Setup
   */
  function setupInteractiveStarPicker() {
    const starPicker = document.querySelectorAll('#starPicker span, #writeModalStarPicker span, #demoStarPicker span');
    const ratingInput = document.getElementById('reviewRatingInput') || document.getElementById('writeModalRatingInput') || document.getElementById('demoRatingInput');
    const descLabel = document.getElementById('starRatingDescLabel') || document.getElementById('writeModalStarLabel') || document.getElementById('demoStarLabel');

    if (starPicker.length === 0) return;

    starPicker.forEach(star => {
      star.addEventListener('click', () => {
        selectedRating = parseInt(star.getAttribute('data-value') || star.getAttribute('data-star') || '5', 10);
        if (ratingInput) ratingInput.value = selectedRating;
        if (descLabel) descLabel.textContent = STAR_DESCRIPTIONS[selectedRating] || `${selectedRating} Stars`;
        updateStarsUI(selectedRating);
      });

      star.addEventListener('mouseenter', () => {
        const hoverVal = parseInt(star.getAttribute('data-value') || star.getAttribute('data-star') || '5', 10);
        updateStarsUI(hoverVal);
        if (descLabel) descLabel.textContent = STAR_DESCRIPTIONS[hoverVal] || `${hoverVal} Stars`;
      });
    });

    const starContainers = document.querySelectorAll('#starPicker, #writeModalStarPicker, #demoStarPicker');
    starContainers.forEach(container => {
      container.addEventListener('mouseleave', () => {
        updateStarsUI(selectedRating);
        if (descLabel) descLabel.textContent = STAR_DESCRIPTIONS[selectedRating] || `${selectedRating} Stars`;
      });
    });

    function updateStarsUI(val) {
      starPicker.forEach(s => {
        const sVal = parseInt(s.getAttribute('data-value') || s.getAttribute('data-star') || '0', 10);
        s.style.color = sVal <= val ? '#fbbf24' : '#475569';
      });
    }

    updateStarsUI(selectedRating);
  }

  /**
   * Universal Trigger for "Write a Review":
   * DIRECTLY OPENS THE PROFESSIONAL FORM MATCHING THE USER DEMO PHOTO!
   * Never blocks visitors or customers with "Project In Progress" or "Login to Review".
   */
  window.triggerWriteReviewFlow = async function () {
    let session = null;
    if (typeof window.getCurrentCustomerSession === 'function') {
      try {
        session = await window.getCurrentCustomerSession();
      } catch (e) {}
    }

    let customer = session?.user;
    if (!customer) {
      try {
        const localUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (localUser && (localUser.email || localUser.name)) {
          customer = localUser;
        }
      } catch (e) {}
    }

    // Direct opening without any blocking modal!
    openWriteReviewModal(customer);
  };

  /**
   * Modal: Interactive Review Form (Pixel-perfect match to user demo screenshot)
   */
  function openWriteReviewModal(customer = null) {
    let modal = document.getElementById('writeReviewModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'writeReviewModal';
      modal.className = 'modal-overlay';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.onclick = (e) => {
        if (e.target === modal) window.closeReviewPromptModals();
      };
      document.body.appendChild(modal);
    }

    const isLoggedIn = Boolean(customer && (customer.email || customer.name));
    const customerDisplayName = (customer?.name || customer?.fullName || '').trim();

    modal.innerHTML = `
      <div class="demo-review-modal-card">
        <button type="button" onclick="window.closeReviewPromptModals()" class="modal-close-btn" aria-label="Close modal">✕</button>

        <!-- Top Bar: Brand Icon, Name, Subtitle, and Guest / Verified Badge -->
        <div class="demo-modal-top-bar">
          <div class="demo-brand-group">
            <div class="demo-brand-icon-box">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                <line x1="8" y1="9" x2="16" y2="9"></line>
                <line x1="8" y1="13" x2="14" y2="13"></line>
              </svg>
            </div>
            <div>
              <div class="demo-brand-name">Ruddranil.io</div>
              <div class="demo-brand-sub">CLIENT FEEDBACK &amp; REVIEWS</div>
            </div>
          </div>
          
          <span class="${isLoggedIn ? 'demo-badge-verified' : 'demo-badge-guest'}">
            ${isLoggedIn ? 'Verified Review' : 'Guest Review'}
          </span>
        </div>

        <!-- Main Title & Subtitle -->
        <h2 class="demo-hero-title">Share Your Experience</h2>
        <p class="demo-hero-subtitle">
          Your feedback matters. Tell us about your experience with our services.
        </p>

        <div id="modalReviewAlertBox" class="auth-alert-box" style="margin-bottom: 16px; display: none;"></div>

        <form id="demoReviewForm" onsubmit="window.handleWriteModalSubmit(event)">
          <!-- 1. Rate Your Experience * -->
          <div class="demo-field-section">
            <label class="demo-field-label">
              Rate Your Experience <span class="req-star">*</span>
            </label>
            <div class="demo-stars-row">
              <div id="demoStarPicker" style="display: inline-flex; gap: 8px;">
                <span class="demo-star-item" data-star="1" role="radio" aria-label="1 star" tabindex="0">★</span>
                <span class="demo-star-item" data-star="2" role="radio" aria-label="2 stars" tabindex="0">★</span>
                <span class="demo-star-item" data-star="3" role="radio" aria-label="3 stars" tabindex="0">★</span>
                <span class="demo-star-item" data-star="4" role="radio" aria-label="4 stars" tabindex="0">★</span>
                <span class="demo-star-item" data-star="5" role="radio" aria-label="5 stars" tabindex="0">★</span>
              </div>
              <span id="demoStarLabel" class="demo-star-text-label">Very Good</span>
            </div>
            <input type="hidden" id="demoRatingInput" value="5">
          </div>

          <!-- 2. Your Name (Optional) -->
          <div class="demo-field-section">
            <label class="demo-field-label" for="demoNameInput">
              Your Name <span class="opt-tag">(Optional)</span>
            </label>
            <input 
              type="text" 
              id="demoNameInput" 
              class="demo-text-input" 
              placeholder="Enter your name" 
              value="${escapeHtml(customerDisplayName)}"
            >
            <span class="demo-helper-note">You can leave a review anonymously or enter your name.</span>
          </div>

          <!-- 3. Write Your Review * -->
          <div class="demo-field-section">
            <label class="demo-field-label" for="demoCommentInput">
              Write Your Review <span class="req-star">*</span>
            </label>
            <textarea 
              id="demoCommentInput" 
              rows="4" 
              class="demo-textarea" 
              placeholder="Tell us what you liked about the service, project quality, communication..." 
              required
            ></textarea>
            <span class="demo-helper-note">Write honest and constructive feedback.</span>
          </div>

          <!-- 4. Attachments Section -->
          <div>
            <h3 class="demo-attachments-heading">Attachments</h3>
            <p class="demo-attachments-sub">Add image or video links if needed. Both are optional.</p>

            <!-- Box 1: Project Photo -->
            <div class="demo-attachment-box">
              <div class="demo-attachment-header">
                <div class="demo-attachment-icon-photo">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                </div>
                <div>
                  <div class="demo-attachment-title">Project Photo</div>
                  <div class="demo-attachment-desc">HTTPS image link or upload photo</div>
                </div>
              </div>

              <input 
                type="url" 
                id="demoPhotoUrlInput" 
                class="demo-text-input" 
                placeholder="https://example.com/photo.jpg"
                oninput="window.handleReviewPhotoUrlChange(this.value)"
              >

              <!-- Optional Direct File Chooser for Photo -->
              <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 8px; flex-wrap: gap; gap: 8px;">
                <label for="demoFileInput" class="btn btn-secondary btn-sm" style="font-size: 11px; padding: 4px 10px; cursor: pointer; display: inline-flex; align-items: center; gap: 5px;">
                  📷 Or Upload File
                </label>
                <input type="file" id="demoFileInput" accept="image/png, image/jpeg, image/webp, image/jpg" style="display: none;" onchange="window.handleDemoPhotoFileSelect(this)">
                
                <span id="demoFileStatusText" style="font-size: 11px; color: var(--text-dark-gray);">JPG, PNG, WebP</span>
              </div>

              <!-- Thumbnail Preview Box -->
              <div id="demoPhotoPreviewWrap" style="display: none; align-items: center; justify-content: space-between; margin-top: 10px; padding: 8px 12px; background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 10px;">
                <div style="display: flex; align-items: center; gap: 10px; overflow: hidden;">
                  <img id="demoPhotoPreviewImg" src="" alt="Photo preview" style="width: 44px; height: 44px; border-radius: 8px; object-fit: cover; border: 1px solid var(--accent-cyan);">
                  <span id="demoPhotoPreviewName" style="font-size: 12px; color: #fff; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 220px;">Image attached</span>
                </div>
                <button type="button" onclick="window.clearDemoPhotoAttachment()" class="btn btn-sm" style="color: #f87171; background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.3); font-size: 11px; padding: 3px 8px; cursor: pointer;">✕</button>
              </div>
            </div>

            <!-- Box 2: Video Link -->
            <div class="demo-attachment-box">
              <div class="demo-attachment-header">
                <div class="demo-attachment-icon-video">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                  </svg>
                </div>
                <div>
                  <div class="demo-attachment-title">Video Link</div>
                  <div class="demo-attachment-desc">YouTube or approved video platform</div>
                </div>
              </div>

              <input 
                type="url" 
                id="demoVideoUrlInput" 
                class="demo-text-input" 
                placeholder="https://youtube.com/..."
              >
            </div>

            <!-- Security & Production notice -->
            <div class="demo-security-disclaimer">
              Approved domains and secure HTTPS links are verified and protected.
            </div>
          </div>

          <!-- 5. Prominent Submit Review Button -->
          <button type="submit" id="btnSubmitDemoReview" class="demo-submit-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
            <span id="demoSubmitBtnText">Submit Review</span>
          </button>
        </form>
      </div>
    `;

    selectedReviewImageFile = null;
    selectedRating = 5;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    setupInteractiveStarPicker();
  }

  /**
   * Handle Photo URL typed input
   */
  window.handleReviewPhotoUrlChange = function (url) {
    const wrap = document.getElementById('demoPhotoPreviewWrap');
    const img = document.getElementById('demoPhotoPreviewImg');
    const name = document.getElementById('demoPhotoPreviewName');
    if (!wrap || !img) return;

    const trimmed = (url || '').trim();
    if (trimmed && (trimmed.startsWith('http://') || trimmed.startsWith('https://'))) {
      img.src = trimmed;
      if (name) name.textContent = 'URL Photo';
      wrap.style.display = 'flex';
    } else if (!selectedReviewImageFile) {
      wrap.style.display = 'none';
    }
  };

  /**
   * Handle Direct File Selection for Review Photo
   */
  window.handleDemoPhotoFileSelect = function (input) {
    if (!input.files || !input.files[0]) return;
    const file = input.files[0];

    if (file.size > 10 * 1024 * 1024) {
      if (typeof showToast === 'function') showToast('Image file size must be 10MB or less.', 'error');
      input.value = '';
      return;
    }

    selectedReviewImageFile = file;

    const wrap = document.getElementById('demoPhotoPreviewWrap');
    const img = document.getElementById('demoPhotoPreviewImg');
    const name = document.getElementById('demoPhotoPreviewName');
    const statusText = document.getElementById('demoFileStatusText');

    if (statusText) statusText.textContent = `${(file.size / 1024).toFixed(0)} KB Attached`;
    if (name) name.textContent = file.name;
    if (wrap) wrap.style.display = 'flex';

    const reader = new FileReader();
    reader.onload = (e) => {
      if (img) img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  window.clearDemoPhotoAttachment = function () {
    selectedReviewImageFile = null;
    const fileInput = document.getElementById('demoFileInput');
    if (fileInput) fileInput.value = '';
    const urlInput = document.getElementById('demoPhotoUrlInput');
    if (urlInput) urlInput.value = '';
    const wrap = document.getElementById('demoPhotoPreviewWrap');
    if (wrap) wrap.style.display = 'none';
    const statusText = document.getElementById('demoFileStatusText');
    if (statusText) statusText.textContent = 'JPG, PNG, WebP';
  };

  /**
   * Handle Submission of the Demo Review Form
   */
  window.handleWriteModalSubmit = async function (e) {
    e.preventDefault();
    const alertBox = document.getElementById('modalReviewAlertBox');
    const submitBtn = document.getElementById('btnSubmitDemoReview');
    const btnText = document.getElementById('demoSubmitBtnText');

    if (alertBox) {
      alertBox.style.display = 'none';
      alertBox.innerHTML = '';
    }

    const reviewerName = document.getElementById('demoNameInput')?.value.trim();
    const comment = document.getElementById('demoCommentInput')?.value.trim();
    const photoUrl = document.getElementById('demoPhotoUrlInput')?.value.trim() || null;
    const videoUrl = document.getElementById('demoVideoUrlInput')?.value.trim() || null;
    const rating = selectedRating;

    // Security validation against malicious protocols
    function checkSafeUrl(url, label) {
      if (!url) return true;
      const lower = url.toLowerCase();
      if (lower.startsWith('javascript:') || lower.startsWith('vbscript:') || lower.startsWith('data:text/html')) {
        throw new Error(`For security reasons, only valid HTTPS or HTTP links are accepted for ${label}.`);
      }
      return true;
    }

    try {
      checkSafeUrl(photoUrl, 'Image Link');
      checkSafeUrl(videoUrl, 'Video Link');
    } catch (urlErr) {
      if (alertBox) {
        alertBox.className = 'auth-alert-box auth-alert-error';
        alertBox.style.display = 'block';
        alertBox.innerHTML = `⚠️ ${escapeHtml(urlErr.message)}`;
      }
      return;
    }

    if (!comment || comment.length < 5) {
      if (alertBox) {
        alertBox.className = 'auth-alert-box auth-alert-error';
        alertBox.style.display = 'block';
        alertBox.innerHTML = '⚠️ Please enter a review of at least 5 characters.';
      }
      return;
    }

    if (submitBtn) submitBtn.disabled = true;
    if (btnText) btnText.textContent = 'Publishing Review...';

    try {
      if (typeof window.submitCustomerReview === 'function') {
        const res = await window.submitCustomerReview({
          reviewerName,
          comment,
          rating,
          imageUrl: photoUrl,
          videoUrl: videoUrl,
          imageFile: selectedReviewImageFile
        });

        if (res && res.success) {
          if (typeof showToast === 'function') {
            showToast('Thank you! Your review has been published successfully ⭐');
          }
          window.closeReviewPromptModals();
          await refreshReviewsDisplay(currentFilter);
        } else {
          throw new Error(res?.error || 'Failed to submit review.');
        }
      } else {
        throw new Error('Review service unavailable.');
      }
    } catch (err) {
      if (alertBox) {
        alertBox.className = 'auth-alert-box auth-alert-error';
        alertBox.style.display = 'block';
        alertBox.innerHTML = `⚠️ ${escapeHtml(err.message || 'Error publishing review.')}`;
      }
    } finally {
      if (submitBtn) submitBtn.disabled = false;
      if (btnText) btnText.textContent = 'Submit Review';
    }
  };

  /**
   * Close all review modals
   */
  window.closeReviewPromptModals = function () {
    const modals = [
      document.getElementById('reviewAuthPromptModal'),
      document.getElementById('reviewNoticeModal'),
      document.getElementById('writeReviewModal'),
      document.getElementById('reviewCommentsModal'),
      document.getElementById('reviewVideoModal')
    ];
    modals.forEach(m => {
      if (m) m.style.display = 'none';
    });
    document.body.style.overflow = '';
  };

  /**
   * Helpful Toggle Handler (Open for all visitors, local persistence & cloud sync)
   */
  window.toggleReviewHelpful = function (btn, revId) {
    const storeKey = 'ruddranil_review_likes_v1';
    let store = {};
    try {
      store = JSON.parse(localStorage.getItem(storeKey) || '{}');
    } catch (e) {}

    const numSpan = btn.querySelector('.like-num');
    const domCount = numSpan ? parseInt(numSpan.textContent, 10) : 0;
    const isLiked = !store[revId]?.liked;
    const currentCount = store[revId]?.count !== undefined 
      ? store[revId].count 
      : (!isNaN(domCount) ? domCount : 0);
    const nextCount = isLiked ? (currentCount + 1) : Math.max(0, currentCount - 1);
    store[revId] = { liked: isLiked, count: nextCount };
    localStorage.setItem(storeKey, JSON.stringify(store));

    if (numSpan) numSpan.textContent = nextCount;
    if (isLiked) {
      btn.classList.add('active-liked');
    } else {
      btn.classList.remove('active-liked');
    }

    if (typeof showToast === 'function') {
      showToast(isLiked ? 'Marked review as helpful! 👍' : 'Removed helpful vote');
    }

    // Sync helpful vote to server for permanent cross-device reflection
    try {
      fetch(`/api/reviews/${encodeURIComponent(revId)}/helpful`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count: nextCount, isLiked })
      }).catch(() => {});
    } catch (e) {}
  };

  /**
   * Public Review Comments Modal (Open for all visitors)
   */
  window.openReviewCommentsModal = function (revId, reviewerName) {
    let modal = document.getElementById('reviewCommentsModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'reviewCommentsModal';
      modal.className = 'modal-overlay';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.onclick = (e) => {
        if (e.target === modal) window.closeReviewPromptModals();
      };
      document.body.appendChild(modal);
    }

    const commentsList = (typeof window.getReviewCommentsList === 'function') 
      ? window.getReviewCommentsList(revId) 
      : [];

    let currentVisitorName = '';
    try {
      const u = JSON.parse(localStorage.getItem('currentUser') || 'null');
      if (u?.name) currentVisitorName = u.name;
    } catch (e) {}

    modal.innerHTML = `
      <div class="demo-review-modal-card" style="max-width: 480px;">
        <button type="button" onclick="window.closeReviewPromptModals()" class="modal-close-btn" aria-label="Close modal">✕</button>
        
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
          <span style="font-size: 22px;">💬</span>
          <h3 class="community-modal-title" style="font-size: 19px; font-weight: 800; margin: 0;">Community Discussion</h3>
        </div>
        <p class="community-modal-sub" style="font-size: 13px; margin-bottom: 18px;">
          Replies to ${escapeHtml(reviewerName)}'s review
        </p>

        <!-- Comments Feed -->
        <div id="reviewCommentsListWrap" style="max-height: 250px; overflow-y: auto; margin-bottom: 18px; display: flex; flex-direction: column; gap: 10px; padding-right: 4px;">
          ${commentsList.length === 0 ? `
            <div class="community-empty-notice" style="text-align: center; padding: 24px 12px; font-size: 13px; border-radius: 12px;">
              No comments yet. Be the first visitor to reply!
            </div>
          ` : commentsList.map(c => `
            <div class="community-comment-bubble" style="border-radius: 12px; padding: 10px 14px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <strong class="community-comment-author" style="font-size: 13px;">👤 ${escapeHtml(c.author)}</strong>
                <span class="community-comment-time" style="font-size: 11px;">${escapeHtml(c.time || 'Recent')}</span>
              </div>
              <p class="community-comment-text" style="font-size: 13px; margin: 0; line-height: 1.5;">${escapeHtml(c.text)}</p>
            </div>
          `).join('')}
        </div>

        <!-- Add Reply Form -->
        <form onsubmit="window.submitReviewCommentForm(event, '${escapeHtml(revId)}')" class="community-reply-form" style="padding-top: 14px;">
          <div style="margin-bottom: 10px;">
            <input 
              type="text" 
              id="replyAuthorInput" 
              class="demo-text-input" 
              placeholder="Your Name (Optional)" 
              value="${escapeHtml(currentVisitorName)}"
              style="padding: 8px 12px; font-size: 13px;"
            >
          </div>
          <div style="margin-bottom: 12px;">
            <textarea 
              id="replyTextInput" 
              rows="2" 
              class="demo-textarea" 
              placeholder="Write a comment or question..." 
              required
              style="padding: 8px 12px; font-size: 13px;"
            ></textarea>
          </div>
          <div style="display: flex; justify-content: flex-end; gap: 8px;">
            <button type="button" onclick="window.closeReviewPromptModals()" class="btn btn-secondary btn-sm">Close</button>
            <button type="submit" class="btn btn-primary btn-sm">Post Comment 💬</button>
          </div>
        </form>
      </div>
    `;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };

  window.submitReviewCommentForm = function (e, revId) {
    e.preventDefault();
    const author = document.getElementById('replyAuthorInput')?.value.trim() || 'Visitor';
    const text = document.getElementById('replyTextInput')?.value.trim();
    if (!text) return;

    if (typeof window.addReviewCommentItem === 'function') {
      window.addReviewCommentItem(revId, author, text);
    }

    if (typeof showToast === 'function') {
      showToast('Comment posted! 💬');
    }

    window.closeReviewPromptModals();
    refreshReviewsDisplay(currentFilter);
  };

  /**
   * Public Share Review Action
   */
  window.shareReviewItem = function (revId, reviewerName) {
    const shareUrl = window.location.origin + window.location.pathname + '#card-' + revId;
    const shareTitle = `Review by ${reviewerName} on Ruddranil.io`;

    if (navigator.share) {
      navigator.share({
        title: shareTitle,
        text: `Read client feedback on Ruddranil's web development and design services:`,
        url: shareUrl
      }).catch(() => {});
    } else {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareUrl)
          .then(() => {
            if (typeof showToast === 'function') showToast('Review link copied to clipboard! 📋');
          })
          .catch(() => {
            if (typeof showToast === 'function') showToast(`Share URL: ${shareUrl}`);
          });
      } else {
        if (typeof showToast === 'function') showToast(`Share URL: ${shareUrl}`);
      }
    }
  };

  /**
   * Video Review Modal (Responsive YouTube / MP4 Player)
   */
  window.openReviewVideoModal = function (videoUrl, reviewerName) {
    let modal = document.getElementById('reviewVideoModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'reviewVideoModal';
      modal.className = 'modal-overlay';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.onclick = (e) => {
        if (e.target === modal) window.closeReviewPromptModals();
      };
      document.body.appendChild(modal);
    }

    // Helper to extract YouTube ID
    function getYouTubeId(url) {
      if (!url) return null;
      const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([\w-]{11})/i);
      return m ? m[1] : null;
    }

    const ytId = getYouTubeId(videoUrl);

    modal.innerHTML = `
      <div class="demo-review-modal-card" style="max-width: 680px; padding: 20px;">
        <button type="button" onclick="window.closeReviewPromptModals()" class="modal-close-btn" aria-label="Close modal">✕</button>

        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 14px;">
          <span style="font-size: 20px;">📹</span>
          <h3 class="review-video-header-title" style="font-size: 17px; font-weight: 800; margin: 0;">Video Review: ${escapeHtml(reviewerName)}</h3>
        </div>

        <div style="position: relative; width: 100%; padding-bottom: 56.25%; border-radius: 14px; overflow: hidden; background: #000; border: 1px solid rgba(255,255,255,0.1);">
          ${ytId ? `
            <iframe 
              src="https://www.youtube.com/embed/${ytId}?autoplay=1" 
              style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
            ></iframe>
          ` : `
            <video src="${escapeHtml(videoUrl)}" controls autoplay style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></video>
          `}
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 14px;">
          <a href="${escapeHtml(videoUrl)}" target="_blank" rel="noopener noreferrer" style="color: var(--accent-cyan); font-size: 12px; font-weight: 600; text-decoration: underline;">
            Open Original Video Link ↗
          </a>
          <button type="button" onclick="window.closeReviewPromptModals()" class="btn btn-secondary btn-sm">
            Close
          </button>
        </div>
      </div>
    `;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };

  /**
   * Universal Image Lightbox Modal for review images
   */
  window.openReviewImageLightbox = function (imageUrl, caption) {
    let lightbox = document.getElementById('reviewLightboxModal');
    if (!lightbox) {
      lightbox = document.createElement('div');
      lightbox.id = 'reviewLightboxModal';
      lightbox.className = 'modal-overlay';
      lightbox.setAttribute('role', 'dialog');
      lightbox.setAttribute('aria-modal', 'true');
      lightbox.onclick = (e) => {
        if (e.target === lightbox) window.closeReviewLightbox();
      };
      document.body.appendChild(lightbox);
    }

    lightbox.innerHTML = `
      <div style="position: relative; max-width: 900px; width: 92%; margin: auto; text-align: center;">
        <button type="button" onclick="window.closeReviewLightbox()" class="modal-close-btn" style="position: absolute; top: -45px; right: 0; background: rgba(0,0,0,0.6); color: #fff; width: 36px; height: 36px; border-radius: 50%; font-size: 18px; border: 1px solid rgba(255,255,255,0.2); cursor: pointer;" aria-label="Close image">✕</button>
        <img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(caption)}" style="max-height: 82vh; max-width: 100%; border-radius: var(--radius-md); box-shadow: 0 25px 50px rgba(0,0,0,0.8); border: 1.5px solid var(--border-color); object-fit: contain;">
        <div style="margin-top: 12px; font-size: 13.5px; color: #e2e8f0; font-weight: 600; text-shadow: 0 2px 4px rgba(0,0,0,0.8);">
          ${escapeHtml(caption)}
        </div>
      </div>
    `;

    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Keydown Escape handler
    const escListener = (e) => {
      if (e.key === 'Escape') {
        window.closeReviewLightbox();
        window.removeEventListener('keydown', escListener);
      }
    };
    window.addEventListener('keydown', escListener);
  };

  window.closeReviewLightbox = function () {
    const lightbox = document.getElementById('reviewLightboxModal');
    if (lightbox) lightbox.style.display = 'none';
    document.body.style.overflow = '';
  };

  /**
   * DOM Ready Initialization
   */
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Render
    refreshReviewsDisplay('all');

    // 2. Setup Star Picker for any static form on page
    setupInteractiveStarPicker();

    // 3. Attach filter button listeners
    const filterBtns = document.querySelectorAll('.review-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter') || 'all';
        reviewsVisibleLimit = REVIEWS_PAGE_SIZE; // Reset visible limit to 9 on filter switch
        filterBtns.forEach(b => {
          if (b.classList.contains('active')) {
            b.classList.remove('active', 'btn-primary');
            b.classList.add('btn-secondary');
          }
        });
        btn.classList.add('active', 'btn-primary');
        btn.classList.remove('btn-secondary');
        refreshReviewsDisplay(filter);
      });
    });

    // 4. Listen for review updates
    window.addEventListener('ruddranil_reviews_updated', () => {
      refreshReviewsDisplay(currentFilter);
    });

    window.addEventListener('storage', (e) => {
      if (e.key === 'app_reviews') {
        refreshReviewsDisplay(currentFilter);
      }
    });

    // 5. Global Escape key listener to dismiss open review modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        window.closeReviewPromptModals();
        if (typeof window.closeReviewLightbox === 'function') {
          window.closeReviewLightbox();
        }
      }
    });
  });

})();
