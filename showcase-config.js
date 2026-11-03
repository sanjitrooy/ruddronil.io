/**
 * Ruddranil.io — Creative Design Showcase Configuration & Interactive Slider
 * 
 * HOW TO ADD YOUR OWN REAL DESIGN IMAGES:
 * 1. Put your design image files in the "public/assets/designs/" folder (or any folder in your project).
 * 2. In the CDS_PROJECTS array below, update the "imagePath" property for each slot.
 *    Example: imagePath: "public/assets/designs/my-banner.jpg" or "assets/designs/banner.png"
 * 3. Save the file. The slider and lightbox will instantly display your real artwork!
 * 4. Slots with empty imagePath ("") will display a tasteful neutral placeholder indicating the slot is ready for your artwork.
 */

const CDS_PROJECTS = [
  {
    id: 1,
    slotNumber: "01",
    title: "Banner Design",
    category: "Banner Design",
    imagePath: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=80",
    altText: "Banner Design Artwork by Ruddranil — High Impact Display Banner",
    icon: "🖼️",
    badge: "Digital Display",
    aspectGuide: "16:9 Banner Display"
  },
  {
    id: 2,
    slotNumber: "02",
    title: "Logo Design",
    category: "Logo Design",
    imagePath: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80",
    altText: "Logo Design Artwork by Ruddranil — Vector Brand Emblem",
    icon: "✒️",
    badge: "Vector Identity",
    aspectGuide: "16:9 Display Canvas"
  },
  {
    id: 3,
    slotNumber: "03",
    title: "T-Shirt Design",
    category: "T-Shirt Design",
    imagePath: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
    altText: "T-Shirt Graphic Design Artwork by Ruddranil — Custom Apparel Print",
    icon: "👕",
    badge: "Apparel Print",
    aspectGuide: "16:9 Apparel Canvas"
  },
  {
    id: 4,
    slotNumber: "04",
    title: "Jewelry Design",
    category: "Jewelry Design",
    imagePath: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
    altText: "Jewelry Design Concept Artwork by Ruddranil — Precision Luxury Render",
    icon: "💎",
    badge: "Luxury Precision",
    aspectGuide: "16:9 Showcase Canvas"
  },
  {
    id: 5,
    slotNumber: "05",
    title: "Social Media Post Design",
    category: "Social Media Post Design",
    imagePath: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=1200&q=80",
    altText: "Social Media Post Design Artwork by Ruddranil — High Engagement Creative",
    icon: "📱",
    badge: "Social Campaign",
    aspectGuide: "16:9 Campaign Canvas"
  },
  {
    id: 6,
    slotNumber: "06",
    title: "Business Card Design",
    category: "Business Card Design",
    imagePath: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80",
    altText: "Business Card Design Artwork by Ruddranil — Minimalist Corporate Stationery",
    icon: "💳",
    badge: "Corporate Print",
    aspectGuide: "16:9 Stationery Canvas"
  },
  {
    id: 7,
    slotNumber: "07",
    title: "Poster Design",
    category: "Poster Design",
    imagePath: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    altText: "Poster Design Artwork by Ruddranil — Typography & Creative Visual",
    icon: "🎨",
    badge: "Creative Editorial",
    aspectGuide: "16:9 Editorial Canvas"
  },
  {
    id: 8,
    slotNumber: "08",
    title: "Product Packaging Design",
    category: "Product Packaging Design",
    imagePath: "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=1200&q=80",
    altText: "Product Packaging Design Artwork by Ruddranil — Custom Package & Label",
    icon: "📦",
    badge: "Packaging & 3D",
    aspectGuide: "16:9 Packaging Canvas"
  },
  {
    id: 9,
    slotNumber: "09",
    title: "Brand Identity Design",
    category: "Brand Identity Design",
    imagePath: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    altText: "Brand Identity System Artwork by Ruddranil — Complete Visual Identity",
    icon: "🏷️",
    badge: "Brand Ecosystem",
    aspectGuide: "16:9 Brand Canvas"
  },
  {
    id: 10,
    slotNumber: "10",
    title: "Creative Advertising Design",
    category: "Creative Advertising Design",
    imagePath: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
    altText: "Creative Advertising Design Artwork by Ruddranil — Strategic Promo Campaign",
    icon: "📢",
    badge: "Marketing Promo",
    aspectGuide: "16:9 Promo Canvas"
  }
];

window.CDS_PROJECTS = CDS_PROJECTS;

// Showcase Slider Controller
class CreativeDesignShowcase {
  constructor() {
    this.projects = window.CDS_PROJECTS || [];
    this.totalSlides = this.projects.length;
    this.currentIndex = 0;
    this.autoplayInterval = null;
    this.autoplayDelay = 3000; // 3 seconds per requirement
    this.isPaused = false;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;
    this.isDragging = false;
    this.lightboxOpen = false;
    this.lightboxIndex = 0;

    // Check reduced motion preference
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    const container = document.getElementById('cdsShowcaseRoot');
    if (!container) return;

    this.renderSlider(container);
    this.bindEvents();
    this.startAutoplay();
  }

  renderSlider(container) {
    const totalFormatted = String(this.totalSlides).padStart(2, '0');

    container.innerHTML = `
      <div class="cds-showcase-wrapper">
        <!-- Main 16:9 Slider Viewport -->
        <div class="cds-viewport" id="cdsViewport" role="region" aria-roledescription="carousel" aria-label="Creative Design Showcase Slider">
          
          <!-- Top Floating Metadata Header -->
          <div class="cds-floating-header">
            <div class="cds-header-left">
              <span class="cds-kicker-pill">STUDIO SHOWCASE</span>
              <span class="cds-header-dot">•</span>
              <span class="cds-active-badge" id="cdsActiveBadge">${this.projects[0].badge}</span>
            </div>
            <div class="cds-counter-pill" id="cdsCounterDisplay" aria-live="polite">
              01 / ${totalFormatted}
            </div>
          </div>

          <!-- Slider Track -->
          <div class="cds-track" id="cdsTrack">
            ${this.projects.map((p, idx) => this.renderSlide(p, idx)).join('')}
          </div>

          <!-- Arrow Navigation Controls -->
          <button type="button" class="cds-nav-btn cds-prev-btn" id="cdsPrevBtn" aria-label="Previous design slide (keyboard Left Arrow)">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button type="button" class="cds-nav-btn cds-next-btn" id="cdsNextBtn" aria-label="Next design slide (keyboard Right Arrow)">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          <!-- Bottom Glass Bar: Title + Indicators + Quick Action -->
          <div class="cds-bottom-bar">
            <div class="cds-bottom-info">
              <h3 class="cds-project-title" id="cdsProjectTitle">${this.projects[0].title}</h3>
              <span class="cds-project-sub" id="cdsProjectCategory">Category: ${this.projects[0].category}</span>
            </div>

            <!-- 10 Pagination Indicators -->
            <div class="cds-indicators" id="cdsIndicators" role="tablist" aria-label="Slider navigation pagination">
              ${this.projects.map((p, idx) => `
                <button 
                  type="button" 
                  class="cds-indicator-dot ${idx === 0 ? 'active' : ''}" 
                  data-index="${idx}" 
                  role="tab" 
                  aria-selected="${idx === 0 ? 'true' : 'false'}" 
                  aria-label="Go to design ${p.slotNumber}: ${p.title}">
                </button>
              `).join('')}
            </div>

            <div class="cds-bottom-action">
              <button type="button" class="cds-view-btn" id="cdsExpandBtn" aria-label="View artwork in full-screen Lightbox">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"></path>
                </svg>
                <span>View Fullscreen</span>
              </button>
            </div>
          </div>

        </div>

        <!-- Lightbox Modal -->
        <div class="cds-lightbox" id="cdsLightbox" role="dialog" aria-modal="true" aria-label="Design Artwork Lightbox" style="display: none;">
          <div class="cds-lightbox-backdrop" id="cdsLightboxBackdrop"></div>
          <div class="cds-lightbox-content">
            <button type="button" class="cds-lightbox-close" id="cdsLightboxClose" aria-label="Close Lightbox (Escape)">✕</button>
            
            <button type="button" class="cds-lightbox-arrow cds-lightbox-prev" id="cdsLightboxPrev" aria-label="Previous artwork">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            
            <button type="button" class="cds-lightbox-arrow cds-lightbox-next" id="cdsLightboxNext" aria-label="Next artwork">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>

            <div class="cds-lightbox-media-container" id="cdsLightboxMedia">
              <!-- Dynamically populated in openLightbox() -->
            </div>

            <div class="cds-lightbox-caption">
              <div class="cds-lightbox-caption-left">
                <span class="cds-lightbox-badge" id="cdsLightboxBadge">SLOT 01</span>
                <h4 class="cds-lightbox-title" id="cdsLightboxTitle">Banner Design</h4>
              </div>
              <div class="cds-lightbox-counter" id="cdsLightboxCounter">01 / 10</div>
            </div>
          </div>
        </div>

      </div>
    `;
  }

  renderSlide(project, index) {
    const isFirst = index === 0;
    const hasImage = Boolean(project.imagePath && project.imagePath.trim() !== '');

    if (hasImage) {
      return `
        <div class="cds-slide" data-index="${index}" role="group" aria-roledescription="slide" aria-label="${project.title} (${index + 1} of ${this.totalSlides})">
          <div class="cds-slide-inner" onclick="window.cdsShowcaseInstance.openLightbox(${index})" title="Click to view artwork fullscreen">
            <img 
              src="${project.imagePath}" 
              alt="${project.altText}" 
              class="cds-slide-img" 
              loading="${isFirst ? 'eager' : 'lazy'}"
              onerror="window.cdsShowcaseInstance.handleImageError(this, ${index})"
            >
          </div>
        </div>
      `;
    }

    // Clean, elegant canvas without intrusive center text — title & category are cleanly shown in bottom bar
    return `
      <div class="cds-slide" data-index="${index}" role="group" aria-roledescription="slide" aria-label="${project.title} (${index + 1} of ${this.totalSlides})">
        <div class="cds-slide-inner" onclick="window.cdsShowcaseInstance.openLightbox(${index})" title="Click to view fullscreen">
          <div class="cds-placeholder-card">
            <div class="cds-placeholder-grid-bg"></div>
            <div class="cds-placeholder-watermark" aria-hidden="true">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="cds-watermark-svg">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </div>
            <div class="cds-placeholder-corner cds-corner-tl"></div>
            <div class="cds-placeholder-corner cds-corner-tr"></div>
            <div class="cds-placeholder-corner cds-corner-bl"></div>
            <div class="cds-placeholder-corner cds-corner-br"></div>
          </div>
        </div>
      </div>
    `;
  }

  handleImageError(imgEl, index) {
    const parent = imgEl.closest('.cds-slide');
    if (!parent) return;
    parent.innerHTML = `
      <div class="cds-slide-inner" onclick="window.cdsShowcaseInstance.openLightbox(${index})" title="Click to view fullscreen">
        <div class="cds-placeholder-card">
          <div class="cds-placeholder-grid-bg"></div>
          <div class="cds-placeholder-watermark" aria-hidden="true">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="cds-watermark-svg">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const prevBtn = document.getElementById('cdsPrevBtn');
    const nextBtn = document.getElementById('cdsNextBtn');
    const viewport = document.getElementById('cdsViewport');
    const expandBtn = document.getElementById('cdsExpandBtn');
    const indicators = document.getElementById('cdsIndicators');

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.prevSlide();
        this.restartAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.nextSlide();
        this.restartAutoplay();
      });
    }

    if (expandBtn) {
      expandBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openLightbox(this.currentIndex);
      });
    }

    if (indicators) {
      indicators.addEventListener('click', (e) => {
        const dot = e.target.closest('.cds-indicator-dot');
        if (dot) {
          const idx = parseInt(dot.getAttribute('data-index'), 10);
          if (!isNaN(idx)) {
            this.goToSlide(idx);
            this.restartAutoplay();
          }
        }
      });
    }

    // Pause autoplay on mouse hover (desktop)
    if (viewport) {
      viewport.addEventListener('mouseenter', () => {
        this.pauseAutoplay();
      });
      viewport.addEventListener('mouseleave', () => {
        if (!this.lightboxOpen) this.startAutoplay();
      });

      // Touch / Swipe support on mobile devices
      viewport.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches.length > 0) {
          this.touchStartX = e.touches[0].clientX;
          this.touchStartY = e.touches[0].clientY;
          this.isDragging = true;
          this.pauseAutoplay();
        }
      }, { passive: true });

      viewport.addEventListener('touchmove', (e) => {
        if (!this.isDragging || !e.touches || e.touches.length === 0) return;
        this.touchEndX = e.touches[0].clientX;
        this.touchEndY = e.touches[0].clientY;
      }, { passive: true });

      viewport.addEventListener('touchend', () => {
        if (!this.isDragging) return;
        this.isDragging = false;
        const diffX = this.touchStartX - this.touchEndX;
        const diffY = this.touchStartY - this.touchEndY;

        // Ensure horizontal swipe is dominant over vertical scroll
        if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX > 0) {
            this.nextSlide();
          } else {
            this.prevSlide();
          }
        }
        this.restartAutoplay();
      });
    }

    // Pause autoplay when browser tab is inactive / hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseAutoplay();
      } else {
        if (!this.lightboxOpen) this.startAutoplay();
      }
    });

    // Listen to prefers-reduced-motion OS changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', () => {
      this.prefersReducedMotion = mediaQuery.matches;
      if (this.prefersReducedMotion) {
        this.pauseAutoplay();
      } else {
        this.startAutoplay();
      }
    });

    // Lightbox modal events
    const lbClose = document.getElementById('cdsLightboxClose');
    const lbBackdrop = document.getElementById('cdsLightboxBackdrop');
    const lbPrev = document.getElementById('cdsLightboxPrev');
    const lbNext = document.getElementById('cdsLightboxNext');

    if (lbClose) lbClose.addEventListener('click', () => this.closeLightbox());
    if (lbBackdrop) lbBackdrop.addEventListener('click', () => this.closeLightbox());
    if (lbPrev) lbPrev.addEventListener('click', () => this.prevLightbox());
    if (lbNext) lbNext.addEventListener('click', () => this.nextLightbox());

    // Global keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (this.lightboxOpen) {
        if (e.key === 'Escape') this.closeLightbox();
        if (e.key === 'ArrowLeft') this.prevLightbox();
        if (e.key === 'ArrowRight') this.nextLightbox();
      } else {
        // Keyboard navigation when user is focused within the showcase
        const activeEl = document.activeElement;
        const isWithinShowcase = viewport && (viewport.contains(activeEl) || activeEl === viewport);
        if (isWithinShowcase) {
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            this.prevSlide();
            this.restartAutoplay();
          } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            this.nextSlide();
            this.restartAutoplay();
          }
        }
      }
    });
  }

  goToSlide(index) {
    if (index < 0) {
      this.currentIndex = this.totalSlides - 1;
    } else if (index >= this.totalSlides) {
      this.currentIndex = 0;
    } else {
      this.currentIndex = index;
    }

    const track = document.getElementById('cdsTrack');
    if (track) {
      const offset = this.currentIndex * 100;
      track.style.transform = `translateX(-${offset}%)`;
    }

    // Update active project metadata
    const project = this.projects[this.currentIndex];
    const totalFormatted = String(this.totalSlides).padStart(2, '0');
    const currentFormatted = String(this.currentIndex + 1).padStart(2, '0');

    const counterEl = document.getElementById('cdsCounterDisplay');
    if (counterEl) counterEl.textContent = `${currentFormatted} / ${totalFormatted}`;

    const titleEl = document.getElementById('cdsProjectTitle');
    if (titleEl) titleEl.textContent = project.title;

    const catEl = document.getElementById('cdsProjectCategory');
    if (catEl) catEl.textContent = `Category: ${project.category}`;

    const badgeEl = document.getElementById('cdsActiveBadge');
    if (badgeEl) badgeEl.textContent = project.badge;

    // Update 10 pagination dots
    const dots = document.querySelectorAll('.cds-indicator-dot');
    dots.forEach((dot, idx) => {
      if (idx === this.currentIndex) {
        dot.classList.add('active');
        dot.setAttribute('aria-selected', 'true');
      } else {
        dot.classList.remove('active');
        dot.setAttribute('aria-selected', 'false');
      }
    });
  }

  nextSlide() {
    this.goToSlide(this.currentIndex + 1);
  }

  prevSlide() {
    this.goToSlide(this.currentIndex - 1);
  }

  startAutoplay() {
    if (this.prefersReducedMotion) return;
    this.clearAutoplayTimer();
    this.isPaused = false;
    this.autoplayInterval = setInterval(() => {
      if (!this.isPaused && !this.lightboxOpen) {
        this.nextSlide();
      }
    }, this.autoplayDelay);
  }

  pauseAutoplay() {
    this.isPaused = true;
    this.clearAutoplayTimer();
  }

  restartAutoplay() {
    this.clearAutoplayTimer();
    if (!this.lightboxOpen && !this.prefersReducedMotion) {
      this.startAutoplay();
    }
  }

  clearAutoplayTimer() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  // Lightbox Implementation
  openLightbox(index) {
    this.lightboxIndex = (typeof index === 'number') ? index : this.currentIndex;
    this.lightboxOpen = true;
    this.pauseAutoplay();

    const lb = document.getElementById('cdsLightbox');
    if (!lb) return;

    this.renderLightboxContent();
    lb.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    setTimeout(() => {
      const closeBtn = document.getElementById('cdsLightboxClose');
      if (closeBtn) closeBtn.focus();
    }, 50);
  }

  closeLightbox() {
    const lb = document.getElementById('cdsLightbox');
    if (lb) lb.style.display = 'none';
    this.lightboxOpen = false;
    document.body.style.overflow = '';
    this.startAutoplay();
  }

  nextLightbox() {
    this.lightboxIndex = (this.lightboxIndex + 1) % this.totalSlides;
    this.renderLightboxContent();
  }

  prevLightbox() {
    this.lightboxIndex = (this.lightboxIndex - 1 + this.totalSlides) % this.totalSlides;
    this.renderLightboxContent();
  }

  renderLightboxContent() {
    const project = this.projects[this.lightboxIndex];
    const totalFormatted = String(this.totalSlides).padStart(2, '0');
    const currentFormatted = String(this.lightboxIndex + 1).padStart(2, '0');

    const mediaContainer = document.getElementById('cdsLightboxMedia');
    const titleEl = document.getElementById('cdsLightboxTitle');
    const badgeEl = document.getElementById('cdsLightboxBadge');
    const counterEl = document.getElementById('cdsLightboxCounter');

    if (titleEl) titleEl.textContent = project.title;
    if (badgeEl) badgeEl.textContent = `SLOT ${project.slotNumber} • ${project.category.toUpperCase()}`;
    if (counterEl) counterEl.textContent = `${currentFormatted} / ${totalFormatted}`;

    if (!mediaContainer) return;

    const hasImage = Boolean(project.imagePath && project.imagePath.trim() !== '');

    if (hasImage) {
      mediaContainer.innerHTML = `
        <img 
          src="${project.imagePath}" 
          alt="${project.altText}" 
          class="cds-lightbox-img"
          onerror="this.style.display='none'; document.getElementById('cdsLbFallback').style.display='block';"
        >
        <div id="cdsLbFallback" style="display: none; padding: 40px; text-align: center; color: #fff;">
          <span style="font-size: 40px;">⚠️</span>
          <p style="margin-top: 10px;">Image file could not be loaded from path:</p>
          <code style="color: var(--accent-cyan);">${project.imagePath}</code>
        </div>
      `;
    } else {
      mediaContainer.innerHTML = `
        <div class="cds-lightbox-placeholder">
          <div class="cds-placeholder-grid-bg"></div>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="cds-watermark-svg" style="opacity: 0.25; margin: 0 auto;">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
        </div>
      `;
    }
  }
}

// Auto-initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('cdsShowcaseRoot')) {
    window.cdsShowcaseInstance = new CreativeDesignShowcase();
  }
});
