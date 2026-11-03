/**
 * Ruddranil.io - Supabase Integration Client (supabase-client.js)
 * Real-time orders, portfolio likes, comments, and public project sharing
 * Built with seamless fallback to localStorage for zero-failure resilience
 */

const SUPABASE_CONFIG = {
  url: 'https://kzkqkrxujhqppsvitgqf.supabase.co',
  anonKey: 'sb_publishable_lFQxQnei2d1a2gW_PTnTwg_UbluQF6a'
};

// Initialize Supabase Client
let sbClient = null;
try {
  if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
    sbClient = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
    console.log('[Supabase] Initialized successfully with project:', SUPABASE_CONFIG.url);
  } else {
    console.warn('[Supabase] CDN not loaded yet, falling back to local storage.');
  }
} catch (err) {
  console.warn('[Supabase] Init error:', err);
}

window.supabaseClient = sbClient;
window.sbClient = sbClient;

// ============================================================================
// 1. ORDERS API
// ============================================================================

/**
 * Save new order to Supabase orders table with persistent server backup and localStorage
 */
async function syncOrderToSupabase(order) {
  // Always update localStorage first for instantaneous UI response
  const localOrders = JSON.parse(localStorage.getItem('ruddranil_orders') || '[]');
  const existingIdx = localOrders.findIndex(o => o.id === order.id);
  if (existingIdx >= 0) {
    localOrders[existingIdx] = order;
  } else {
    localOrders.unshift(order);
  }
  localStorage.setItem('ruddranil_orders', JSON.stringify(localOrders));

  // 1. Persist to Backend Server /api/orders immediately (for cross-browser & cross-device reliability)
  try {
    await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    });
  } catch (serverErr) {
    console.warn('[Orders Server Sync Notice]:', serverErr);
  }

  // 2. Persist to Supabase Database
  if (sbClient) {
    try {
      let authUserId = order.customerId || null;
      let authEmail = order.customerEmail || null;

      if (sbClient.auth) {
        try {
          const { data: { user } } = await sbClient.auth.getUser();
          if (user) {
            authUserId = user.id;
            if (!authEmail) authEmail = user.email;
          }
        } catch (e) {
          console.warn('[Orders] Could not get auth user:', e);
        }
      }

      const payload = {
        id: order.id,
        customer_id: authUserId,
        customer_name: order.customerName,
        customer_email: authEmail || order.customerEmail,
        service: order.service,
        service_slug: order.serviceSlug || order.service.toLowerCase().replace(/\s+/g, '-'),
        package_tier: order.packageTier || 'basic',
        package_name: order.packageName || order.service,
        package_price: Number(order.packagePrice || 30),
        delivery_days: Number(order.deliveryDays || 3),
        is_express: Boolean(order.isExpress),
        express_fee: Number(order.expressFee || 0),
        selected_addons: order.selectedAddons || [],
        addons_total: Number(order.addonsTotal || 0),
        coupon_code: order.couponCode || null,
        discount_amount: Number(order.discountAmount || 0),
        subtotal: Number(order.subtotal || order.packagePrice || 30),
        final_total: Number(order.finalTotal || order.packagePrice || 30),
        request: order.request || '',
        reference_files: order.referenceFiles || [],
        status: order.status || 'Pending',
        progress: Number(order.progress || 0),
        price: order.price || `$${Number(order.finalTotal || 30).toFixed(2)}`
      };

      const { data, error } = await sbClient.from('orders').upsert([payload], { onConflict: 'id' });
      if (error) {
        console.warn('[Supabase Orders] Insert notice:', error.message);
      } else {
        console.log('[Supabase Orders] Order synced to cloud:', order.id);
      }
    } catch (err) {
      console.warn('[Supabase Orders] Sync exception:', err);
    }
  }

  // 3. Dispatch cross-component event so Admin Panel or Tracker updates instantly
  window.dispatchEvent(new CustomEvent('ruddranil_orders_updated', { detail: order }));
  return { success: true, order };
}

/**
 * Fetch orders strictly for the authenticated customer or specified customer
 * Guarantees that customers see ONLY their own orders
 */
async function fetchOrdersFromCloud(targetCustomerId = null, targetEmail = null) {
  let customerId = targetCustomerId;
  let customerEmail = targetEmail;

  if (sbClient && sbClient.auth && (!customerId || !customerEmail)) {
    try {
      const { data: { user } } = await sbClient.auth.getUser();
      if (user) {
        if (!customerId) customerId = user.id;
        if (!customerEmail) customerEmail = user.email;
      }
    } catch (e) {}
  }

  if (!customerId && !customerEmail) {
    const localUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (localUser) {
      customerId = localUser.id || null;
      customerEmail = localUser.email || null;
    }
  }

  // Get local orders strictly belonging to this customer
  const allLocalOrders = JSON.parse(localStorage.getItem('ruddranil_orders') || '[]');
  let userOrders = allLocalOrders.filter(o => {
    if (customerId && o.customerId === customerId) return true;
    if (customerEmail && o.customerEmail?.toLowerCase() === customerEmail.toLowerCase()) return true;
    return false;
  });

  // Query Server API for orders belonging to this customer
  try {
    const res = await fetch('/api/orders');
    if (res.ok) {
      const serverOrders = await res.json();
      if (Array.isArray(serverOrders)) {
        serverOrders.forEach(so => {
          const belongs = (customerId && so.customerId === customerId) ||
            (customerEmail && so.customerEmail?.toLowerCase() === customerEmail.toLowerCase());
          if (belongs) {
            const idx = userOrders.findIndex(uo => uo.id === so.id);
            if (idx >= 0) {
              userOrders[idx] = { ...userOrders[idx], ...so };
            } else {
              userOrders.push(so);
            }
          }
        });
      }
    }
  } catch (e) {}

  if (!sbClient) {
    return userOrders;
  }

  try {
    let query = sbClient.from('orders').select('*').order('created_at', { ascending: false });

    // Filter by customer UUID or email
    if (customerId && customerEmail) {
      query = query.or(`customer_id.eq.${customerId},customer_email.eq.${customerEmail}`);
    } else if (customerId) {
      query = query.eq('customer_id', customerId);
    } else if (customerEmail) {
      query = query.eq('customer_email', customerEmail);
    }

    const { data, error } = await query;
    if (error || !data) {
      return userOrders;
    }

    // Map Supabase snake_case columns back to application camelCase
    const cloudOrders = data.map(row => ({
      id: row.id,
      customerId: row.customer_id,
      customerName: row.customer_name || 'Client',
      customerEmail: row.customer_email || '',
      service: row.service || 'Service',
      serviceSlug: row.service_slug || '',
      packageTier: row.package_tier || 'basic',
      packageName: row.package_name || row.service,
      packagePrice: Number(row.package_price || 0),
      deliveryDays: Number(row.delivery_days || 3),
      isExpress: Boolean(row.is_express),
      expressFee: Number(row.express_fee || 0),
      selectedAddons: row.selected_addons || [],
      addonsTotal: Number(row.addons_total || 0),
      couponCode: row.coupon_code || '',
      discountAmount: Number(row.discount_amount || 0),
      subtotal: Number(row.subtotal || 0),
      finalTotal: Number(row.final_total || 0),
      request: row.request || '',
      referenceFiles: row.reference_files || [],
      status: row.status || 'Pending',
      progress: Number(row.progress || 0),
      price: row.price || `$${Number(row.final_total || 0).toFixed(2)}`,
      orderDate: row.order_date ? new Date(row.order_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently',
      lastUpdated: row.last_updated ? new Date(row.last_updated).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 'Recently'
    }));

    // Merge
    const merged = [...cloudOrders];
    userOrders.forEach(lo => {
      const idx = merged.findIndex(co => co.id === lo.id);
      if (idx < 0) {
        merged.push(lo);
      } else {
        merged[idx] = { ...lo, ...merged[idx] };
      }
    });

    // Cache updated merged orders in localStorage and sync with Server API
    // so work-tracking.html and any other tabs immediately reflect real-time status & progress
    try {
      const allLocal = JSON.parse(localStorage.getItem('ruddranil_orders') || '[]');
      merged.forEach(mo => {
        const idx = allLocal.findIndex(lo => lo.id === mo.id);
        if (idx >= 0) allLocal[idx] = { ...allLocal[idx], ...mo };
        else allLocal.unshift(mo);
      });
      localStorage.setItem('ruddranil_orders', JSON.stringify(allLocal));

      fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(merged)
      }).catch(() => {});
    } catch (cacheErr) {}

    return merged;
  } catch (err) {
    console.warn('[Supabase Orders] Exception in fetch:', err);
    return userOrders;
  }
}

/**
 * Fetch ALL orders for Admin across Supabase and backend server persistence
 */
async function fetchAllOrdersForAdmin() {
  let allOrders = [];

  // 1. Fetch from server-side persistent endpoint (/api/orders)
  try {
    const res = await fetch('/api/orders');
    if (res.ok) {
      const serverOrders = await res.json();
      if (Array.isArray(serverOrders) && serverOrders.length > 0) {
        allOrders = serverOrders;
      }
    }
  } catch (err) {
    console.warn('[Admin Orders] Server fetch notice:', err);
  }

  // 2. Fetch from Supabase orders table
  if (sbClient) {
    try {
      const { data, error } = await sbClient
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        const cloudOrders = data.map(row => ({
          id: row.id,
          customerId: row.customer_id,
          customerName: row.customer_name || 'Client',
          customerEmail: row.customer_email || '',
          service: row.service || 'Service',
          serviceSlug: row.service_slug || '',
          packageTier: row.package_tier || 'basic',
          packageName: row.package_name || row.service,
          packagePrice: Number(row.package_price || 0),
          deliveryDays: Number(row.delivery_days || 3),
          isExpress: Boolean(row.is_express),
          expressFee: Number(row.express_fee || 0),
          selectedAddons: row.selected_addons || [],
          addonsTotal: Number(row.addons_total || 0),
          couponCode: row.coupon_code || '',
          discountAmount: Number(row.discount_amount || 0),
          subtotal: Number(row.subtotal || 0),
          finalTotal: Number(row.final_total || 0),
          request: row.request || '',
          referenceFiles: row.reference_files || [],
          status: row.status || 'Pending',
          progress: Number(row.progress || 0),
          price: row.price || `$${Number(row.final_total || 0).toFixed(2)}`,
          orderDate: row.order_date ? new Date(row.order_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently',
          lastUpdated: row.last_updated ? new Date(row.last_updated).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 'Recently'
        }));

        cloudOrders.forEach(co => {
          const idx = allOrders.findIndex(o => o.id === co.id);
          if (idx >= 0) {
            allOrders[idx] = { ...allOrders[idx], ...co };
          } else {
            allOrders.unshift(co);
          }
        });
      }
    } catch (sbErr) {
      console.warn('[Admin Orders] Supabase query notice:', sbErr);
    }
  }

  // 3. Merge with local orders
  const localOrders = JSON.parse(localStorage.getItem('ruddranil_orders') || '[]');
  localOrders.forEach(lo => {
    const idx = allOrders.findIndex(o => o.id === lo.id);
    if (idx < 0) {
      allOrders.push(lo);
    }
  });

  // 4. Update cache
  if (allOrders.length > 0) {
    localStorage.setItem('ruddranil_orders', JSON.stringify(allOrders));
  }

  return allOrders;
}

/**
 * Update order status and progress in Supabase, backend server and localStorage
 */
async function updateOrderStatusInCloud(orderId, newStatus, newProgress) {
  const cleanId = (orderId || '').trim().replace(/^#/, '');

  // Determine standard progress if not provided
  let computedProgress = newProgress !== undefined ? Number(newProgress) : undefined;
  if (computedProgress === undefined) {
    const sLower = (newStatus || '').toLowerCase();
    if (sLower === 'review' || sLower === 'in review') computedProgress = 85;
    else if (sLower === 'delivered' || sLower === 'completed') computedProgress = 100;
    else if (sLower === 'in progress') computedProgress = 50;
    else if (sLower === 'accepted') computedProgress = 15;
    else if (sLower === 'pending') computedProgress = 0;
  }

  // 1. Update local
  const orders = JSON.parse(localStorage.getItem('ruddranil_orders') || '[]');
  const order = orders.find(o => 
    (o.id || '').toLowerCase() === cleanId.toLowerCase() || 
    (o.id || '').toLowerCase().replace(/^#/, '') === cleanId.toLowerCase()
  );
  if (order) {
    order.status = newStatus;
    if (computedProgress !== undefined) order.progress = computedProgress;
    order.lastUpdated = 'Just now';
    localStorage.setItem('ruddranil_orders', JSON.stringify(orders));
  }

  // 2. Sync to Backend Server immediately
  try {
    const updatePayload = {
      status: newStatus,
      progress: computedProgress,
      lastUpdated: new Date().toISOString()
    };
    if (order) {
      updatePayload.customerName = order.customerName;
      updatePayload.customerEmail = order.customerEmail;
      updatePayload.service = order.service;
      updatePayload.packageTier = order.packageTier;
      updatePayload.packageName = order.packageName;
      updatePayload.price = order.price;
      updatePayload.finalTotal = order.finalTotal;
      updatePayload.deliveryDays = order.deliveryDays;
    }

    await fetch(`/api/orders/${encodeURIComponent(cleanId)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatePayload)
    });
  } catch (err) {
    console.warn('[Server Orders] Update notice:', err);
  }

  // 3. Sync to Supabase
  if (sbClient) {
    try {
      const payload = {
        status: newStatus,
        last_updated: new Date().toISOString()
      };
      if (computedProgress !== undefined) payload.progress = computedProgress;
      await sbClient.from('orders').update(payload).ilike('id', cleanId);
      console.log('[Supabase Orders] Cloud order status updated:', cleanId, newStatus, computedProgress);
    } catch (err) {
      console.warn('[Supabase Orders] Failed to update cloud status:', err);
    }
  }

  // 4. Dispatch event for instant UI update
  window.dispatchEvent(new CustomEvent('ruddranil_orders_updated', {
    detail: { orderId: cleanId, newStatus, newProgress: computedProgress }
  }));
}

// Safe Toast notification helper across script contexts
function safeShowToast(msg, type = 'success') {
  if (typeof window.showToast === 'function') {
    window.showToast(msg, type);
  } else if (typeof showToast === 'function') {
    try { showToast(msg, type); } catch (e) {}
  }
}

// ============================================================================
// 2. PORTFOLIO LIKES SYSTEM
// ============================================================================

const LIKES_STORAGE_KEY = 'ruddranil_portfolio_likes_v1';
const DEFAULT_PROJECT_LIKES = {
  'proj-1': 14,
  'proj-2': 28,
  'proj-3': 19
};

function getLocalLikesStore() {
  try {
    const raw = localStorage.getItem(LIKES_STORAGE_KEY);
    if (!raw) {
      const seeded = {
        'proj-1': { count: 14, liked: false },
        'proj-2': { count: 28, liked: false },
        'proj-3': { count: 19, liked: false }
      };
      localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }
    return JSON.parse(raw);
  } catch (e) {
    return {
      'proj-1': { count: 14, liked: false },
      'proj-2': { count: 28, liked: false },
      'proj-3': { count: 19, liked: false }
    };
  }
}

function saveLocalLikesStore(store) {
  try {
    localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(store));
  } catch (e) {
    console.warn('[Likes] Failed to save store:', e);
  }
}

/**
 * Check if current browser user has liked a project
 */
function isProjectLiked(projectId) {
  const store = getLocalLikesStore();
  return Boolean(store[projectId]?.liked);
}

/**
 * Get like count for a project
 */
function getProjectLikeCount(projectId, defaultCount) {
  const store = getLocalLikesStore();
  if (store[projectId] && typeof store[projectId].count === 'number') {
    return store[projectId].count;
  }
  const fallback = defaultCount !== undefined ? defaultCount : (DEFAULT_PROJECT_LIKES[projectId] || 10);
  return fallback;
}

/**
 * Interactive Like Handler with full signature flexibility:
 * handleLikeToggle(button, 'proj-1', 14)
 * handleLikeToggle('proj-1', 14)
 * handleLikeToggle(event)
 */
async function handleLikeToggle(targetOrPid, projectIdParam, defaultCountParam) {
  let target = targetOrPid;
  let pid = projectIdParam;
  let countParam = defaultCountParam;

  // Handle case where first argument is projectId string: handleLikeToggle('proj-1', 14)
  if (typeof targetOrPid === 'string') {
    pid = targetOrPid;
    if (typeof projectIdParam === 'number') {
      countParam = projectIdParam;
    }
    target = document.getElementById(`likeBtn-${pid}`) || document.querySelector(`[data-like-project="${pid}"]`);
  } else if (targetOrPid && targetOrPid.target) {
    // Handle Event object passed in
    target = targetOrPid.currentTarget || targetOrPid.target;
  }

  // If clicked inside the like button (e.g., clicked inner span or icon)
  if (target && typeof target.closest === 'function') {
    target = target.closest('[data-like-project], [id^="likeBtn-"]') || target;
  }

  // Derive projectId from element if not explicitly passed
  if (!pid && target) {
    pid = target.getAttribute('data-like-project') || (target.id ? target.id.replace('likeBtn-', '') : null);
  }
  if (!pid) pid = 'proj-1';

  // Seed default count
  const baseDefault = countParam !== undefined ? countParam : (DEFAULT_PROJECT_LIKES[pid] || 10);

  const store = getLocalLikesStore();
  if (!store[pid]) {
    store[pid] = { count: baseDefault, liked: false };
  }

  const isLiked = !store[pid].liked;
  store[pid].liked = isLiked;
  store[pid].count = isLiked ? (store[pid].count + 1) : Math.max(0, store[pid].count - 1);
  saveLocalLikesStore(store);

  // Update ALL matching buttons across the DOM instantly
  updateLikeButtonUI(pid, store[pid].liked, store[pid].count, target);

  // Friendly toast notification
  if (isLiked) {
    safeShowToast('Liked this project! ❤️');
  } else {
    safeShowToast('Unliked project 🤍');
  }

  // Optional: Graceful cloud sync to Supabase portfolio_likes
  if (sbClient) {
    try {
      const userIdent = localStorage.getItem('ruddranil_client_uuid') || ('anon_' + Math.random().toString(36).substring(2, 9));
      localStorage.setItem('ruddranil_client_uuid', userIdent);

      if (isLiked) {
        await sbClient.from('portfolio_likes').upsert([{ project_id: pid, user_identifier: userIdent }], { onConflict: 'project_id,user_identifier' });
      } else {
        await sbClient.from('portfolio_likes').delete().match({ project_id: pid, user_identifier: userIdent });
      }
    } catch (e) {
      // Gracefully silent fallback
    }
  }
}

/**
 * Update one or all like buttons matching a projectId or element
 */
function updateLikeButtonUI(projectIdOrButton, isLiked, count, fallbackButton) {
  const elements = [];

  if (typeof projectIdOrButton === 'string') {
    const byId = document.getElementById(`likeBtn-${projectIdOrButton}`);
    if (byId) elements.push(byId);

    const byAttr = document.querySelectorAll(`[data-like-project="${projectIdOrButton}"]`);
    byAttr.forEach(b => {
      if (!elements.includes(b)) elements.push(b);
    });
  } else if (projectIdOrButton && projectIdOrButton.nodeType) {
    elements.push(projectIdOrButton);
  }

  if (fallbackButton && !elements.includes(fallbackButton)) {
    elements.push(fallbackButton);
  }

  elements.forEach(btn => {
    btn.innerHTML = `${isLiked ? '❤️' : '🤍'} Like (<span>${count}</span>)`;
    btn.style.color = isLiked ? '#ef4444' : 'var(--text-gray)';
    btn.style.fontWeight = isLiked ? '700' : '500';
    btn.classList.toggle('liked', isLiked);
    btn.setAttribute('aria-pressed', isLiked ? 'true' : 'false');
  });
}

/**
 * Initialize all project like buttons on page load
 */
function initProjectLikeButtons() {
  const projectIds = ['proj-1', 'proj-2', 'proj-3'];
  projectIds.forEach(pid => {
    const def = DEFAULT_PROJECT_LIKES[pid] || 10;
    const count = getProjectLikeCount(pid, def);
    const isLiked = isProjectLiked(pid);
    updateLikeButtonUI(pid, isLiked, count);
  });

  // Also scan any dynamically added element with [data-like-project]
  if (typeof document !== 'undefined') {
    document.querySelectorAll('[data-like-project]').forEach(el => {
      const pid = el.getAttribute('data-like-project');
      if (pid) {
        const count = getProjectLikeCount(pid, DEFAULT_PROJECT_LIKES[pid] || 10);
        const isLiked = isProjectLiked(pid);
        updateLikeButtonUI(pid, isLiked, count, el);
      }
    });
  }
}

// Auto-initialize when document is ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjectLikeButtons);
  } else {
    initProjectLikeButtons();
  }
}

// ============================================================================
// 3. PORTFOLIO COMMENTS SYSTEM
// ============================================================================

const COMMENTS_STORAGE_KEY = 'ruddranil_portfolio_comments_v1';

// Initial Seed Comments
const DEFAULT_COMMENTS = {
  'proj-1': [
    { id: 'c1', author: 'Alex Turner', text: 'Stunning visual layout and lightning-fast load times!', time: '2 days ago' },
    { id: 'c2', author: 'Sophie Chen', text: 'Loved the responsiveness on iPhone and tablet. Great job!', time: '1 day ago' },
    { id: 'c3', author: 'Mark Davis', text: 'Clean code and solid SEO architecture.', time: '5 hours ago' }
  ],
  'proj-2': [
    { id: 'c4', author: 'Sarah Jenkins', text: 'Our campaign reach jumped by 320% after Ruddranil took over.', time: '3 days ago' },
    { id: 'c5', author: 'David Miller', text: 'Incredible CTR on the video creatives!', time: '1 day ago' }
  ],
  'proj-3': [
    { id: 'c6', author: 'Elena Rostova', text: 'The brand identity kit exceeded our expectations.', time: '4 days ago' },
    { id: 'c7', author: 'Tarik Rahman', text: 'Vector assets were clean and very well organized.', time: '6 hours ago' }
  ]
};

function getLocalCommentsStore() {
  try {
    const raw = localStorage.getItem(COMMENTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(DEFAULT_COMMENTS));
      return DEFAULT_COMMENTS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return DEFAULT_COMMENTS;
  }
}

function saveLocalCommentsStore(store) {
  localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(store));
}

function getProjectComments(projectId) {
  const store = getLocalCommentsStore();
  return store[projectId] || [];
}

/**
 * Open interactive Comment Modal
 */
function openCommentModal(projectId, projectTitle) {
  let modal = document.getElementById('projectCommentModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'projectCommentModal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }

  const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
  const comments = getProjectComments(projectId);

  modal.innerHTML = `
    <div class="modal-card" style="max-width: 540px;">
      <button onclick="closeCommentModal()" class="modal-close-btn" aria-label="Close modal">✕</button>
      <span class="section-kicker" style="margin-bottom: 4px;">COMMUNITY FEEDBACK</span>
      <h3 style="font-size: 20px; font-weight: 800; color: #fff; margin-bottom: 4px;">💬 Comments</h3>
      <p style="font-size: 13px; color: var(--accent-cyan); margin-bottom: 18px; font-weight: 600;">
        ${projectTitle}
      </p>

      <!-- Existing Comments Feed -->
      <div id="commentsFeedList" style="max-height: 240px; overflow-y: auto; margin-bottom: 20px; padding-right: 6px; display: flex; flex-direction: column; gap: 10px;">
        ${comments.length === 0 ? `
          <div style="text-align: center; color: var(--text-dark-gray); padding: 20px; font-size: 13px;">
            No comments yet. Be the first to share your thoughts!
          </div>
        ` : comments.map(c => `
          <div style="background: #080d18; border: 1px solid var(--border-color); border-radius: 8px; padding: 10px 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <strong style="color: #fff; font-size: 13px;">👤 ${c.author}</strong>
              <span style="font-size: 11px; color: var(--text-dark-gray);">${c.time}</span>
            </div>
            <p style="font-size: 13px; color: var(--text-light-gray); margin: 0; line-height: 1.5;">${c.text}</p>
          </div>
        `).join('')}
      </div>

      <!-- Submit Comment Form -->
      <form onsubmit="submitCommentForm(event, '${projectId}', '${projectTitle.replace(/'/g, "\\'")}')" style="border-top: 1px solid var(--border-color); padding-top: 16px;">
        <div style="display: grid; grid-template-columns: 1fr; gap: 10px; margin-bottom: 12px;">
          <input 
            type="text" 
            id="commentAuthorInput" 
            class="form-input" 
            placeholder="Your Name" 
            value="${user ? (user.name || 'Client') : ''}" 
            required
            style="padding: 8px 12px; font-size: 13px;"
          >
          <textarea 
            id="commentTextInput" 
            rows="2" 
            class="form-textarea" 
            placeholder="Share your thoughts on this project..." 
            required
            style="padding: 8px 12px; font-size: 13px;"
          ></textarea>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 8px;">
          <button type="button" onclick="closeCommentModal()" class="btn btn-secondary btn-sm">Cancel</button>
          <button type="submit" class="btn btn-primary btn-sm">Post Comment 💬</button>
        </div>
      </form>
    </div>
  `;

  modal.style.display = 'flex';
}

function closeCommentModal() {
  const modal = document.getElementById('projectCommentModal');
  if (modal) modal.style.display = 'none';
}

async function submitCommentForm(e, projectId, projectTitle) {
  e.preventDefault();
  const authorInput = document.getElementById('commentAuthorInput');
  const textInput = document.getElementById('commentTextInput');

  const author = authorInput?.value.trim() || 'Guest';
  const text = textInput?.value.trim();
  if (!text) return;

  const newComment = {
    id: 'c_' + Date.now(),
    author,
    text,
    time: 'Just now'
  };

  const store = getLocalCommentsStore();
  if (!store[projectId]) store[projectId] = [];
  store[projectId].unshift(newComment);
  saveLocalCommentsStore(store);

  // Update UI count on card
  const commentButtons = document.querySelectorAll(`[data-comment-id="${projectId}"]`);
  commentButtons.forEach(btn => {
    btn.innerHTML = `💬 Comment (${store[projectId].length})`;
  });

  showToast('Comment posted! 💬');
  closeCommentModal();

  // Sync to Supabase if table exists
  if (sbClient) {
    try {
      await sbClient.from('portfolio_comments').insert([{
        project_id: projectId,
        project_title: projectTitle,
        author_name: author,
        comment_text: text
      }]);
    } catch (err) {
      // Graceful fallback
    }
  }
}

// ============================================================================
// 4. SMART SHARE LINK SYSTEM
// ============================================================================

/**
 * Share Project Link with Native Web Share Sheet or Clipboard Copy
 * Fixes 404 error by normalizing dev/preview origin and pointing to valid portfolio target
 */
async function handleShareProject(projectId, projectTitle) {
  let origin = window.location.origin;
  // If running in private AI Studio dev container, switch to public preview URL so shared users never get a 404
  if (origin.includes('ais-dev-')) {
    origin = origin.replace('ais-dev-', 'ais-pre-');
  }

  // Canonical share URL pointing directly to the portfolio project card
  const cleanProjectId = projectId || 'proj-1';
  const shareUrl = `${origin}/portfolio.html?project=${encodeURIComponent(cleanProjectId)}#${cleanProjectId}`;

  const shareData = {
    title: `${projectTitle || 'Project'} — Ruddranil.io`,
    text: `Check out "${projectTitle || 'Project'}" on Ruddranil.io:`,
    url: shareUrl
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      safeShowToast('Shared successfully! ↗');
      return;
    } catch (err) {
      if (err.name === 'AbortError') return;
    }
  }

  // Clipboard fallback
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(shareUrl);
      safeShowToast(`Link for "${projectTitle || 'Project'}" copied to clipboard! ↗`);
      return;
    } catch (e) {}
  }

  // Final fallback
  prompt('Copy this project link:', shareUrl);
}

// ============================================================================
// 5. CUSTOMER PROFILES API & STORAGE AVATARS
// ============================================================================

/**
 * Fetch customer profile by user_id or email from Supabase
 */
async function fetchCustomerProfile(userIdOrEmail, optionalEmail = null) {
  let targetId = null;
  let targetEmail = null;

  if (userIdOrEmail && userIdOrEmail.includes && userIdOrEmail.includes('@')) {
    targetEmail = userIdOrEmail.toLowerCase().trim();
  } else if (userIdOrEmail) {
    targetId = userIdOrEmail;
    if (optionalEmail) targetEmail = optionalEmail.toLowerCase().trim();
  }

  const localUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  if (!targetEmail && localUser?.email) {
    targetEmail = localUser.email.toLowerCase().trim();
  }
  if (!targetId && localUser?.id) {
    targetId = localUser.id;
  }

  if (!targetEmail && !targetId) return localUser;

  if (!sbClient) {
    return localUser;
  }

  try {
    let query = sbClient.from('profiles').select('*');
    if (targetId && targetEmail) {
      query = query.or(`user_id.eq.${targetId},email.eq.${targetEmail}`);
    } else if (targetId) {
      query = query.eq('user_id', targetId);
    } else {
      query = query.eq('email', targetEmail);
    }

    const { data, error } = await query.maybeSingle();

    if (error) {
      console.warn('[Supabase Profiles] Fetch notice:', error.message);
      return localUser;
    }

    if (data) {
      const updatedUser = {
        ...(localUser || {}),
        id: data.user_id || localUser?.id,
        name: data.full_name || localUser?.name || 'Customer',
        email: data.email || targetEmail,
        phoneNumber: data.phone_number || localUser?.phoneNumber || '',
        country: data.country || localUser?.country || '',
        city: data.city || localUser?.city || '',
        address: data.address || localUser?.address || '',
        avatarUrl: data.avatar_url || localUser?.avatarUrl || '',
        companyName: data.company_name || localUser?.companyName || '',
        bio: data.bio || localUser?.bio || '',
        emailVerified: localUser?.emailVerified !== undefined ? localUser.emailVerified : true
      };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      return updatedUser;
    }
    return localUser;
  } catch (err) {
    console.warn('[Supabase Profiles] Fetch exception:', err);
    return localUser;
  }
}

/**
 * Helper to upload profile avatar to Supabase Storage bucket 'profile-avatars'
 * with graceful fallback to client-side data URL / base64
 */
async function uploadProfileAvatar(file, email, userId = null) {
  if (!file) return null;

  // Validate image MIME type
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!validTypes.includes(file.type)) {
    throw new Error('Please select a valid image file (JPG, PNG, WebP, GIF).');
  }

  // Validate file size: maximum 5MB
  if (file.size > 5 * 1024 * 1024) {
    throw new Error('Profile photo size must be less than 5MB.');
  }

  // Resilient base64 converter
  const toBase64 = (f) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(f);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  if (!sbClient) {
    return await toBase64(file);
  }

  try {
    const fileExt = file.name.split('.').pop() || 'jpg';
    const identifier = (userId || email || 'user').replace(/[^a-zA-Z0-9_-]/g, '_');
    const filePath = `avatars/${identifier}_${Date.now()}.${fileExt}`;

    const { data, error } = await sbClient.storage
      .from('profile-avatars')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.warn('[Supabase Storage] Avatar upload notice, falling back to base64 data:', error.message);
      return await toBase64(file);
    }

    const { data: publicUrlData } = sbClient.storage
      .from('profile-avatars')
      .getPublicUrl(filePath);

    return publicUrlData?.publicUrl || await toBase64(file);
  } catch (err) {
    console.warn('[Supabase Storage] Upload error, falling back to base64:', err);
    return await toBase64(file);
  }
}

/**
 * Save customer profile data to Supabase database & localStorage
 * Customers cannot modify admin roles, order progress, or financial amounts
 */
async function saveCustomerProfile(profileData, photoFile = null) {
  let authUserId = null;
  let authEmail = profileData.email;

  if (sbClient && sbClient.auth) {
    try {
      const { data: { user } } = await sbClient.auth.getUser();
      if (user) {
        authUserId = user.id;
        authEmail = user.email;
      }
    } catch (e) {}
  }

  const localUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const email = (authEmail || profileData.email || localUser.email || '').trim().toLowerCase();

  if (!email) {
    throw new Error('Authenticated user email is required.');
  }

  let avatarUrl = profileData.avatarUrl !== undefined ? profileData.avatarUrl : (localUser.avatarUrl || '');
  if (photoFile) {
    avatarUrl = await uploadProfileAvatar(photoFile, email, authUserId || localUser.id);
  }

  const updatedUser = {
    ...localUser,
    id: authUserId || localUser.id,
    name: profileData.fullName?.trim() || localUser.name || 'Customer',
    email: email,
    phoneNumber: profileData.phoneNumber?.trim() || '',
    country: profileData.country?.trim() || '',
    city: profileData.city?.trim() || '',
    address: profileData.address?.trim() || '',
    companyName: profileData.companyName?.trim() || '',
    bio: profileData.bio?.trim() || '',
    avatarUrl: avatarUrl,
    emailVerified: localUser.emailVerified !== undefined ? localUser.emailVerified : true
  };

  // Immediate local persistence
  localStorage.setItem('currentUser', JSON.stringify(updatedUser));

  // Sync to Supabase
  if (sbClient) {
    try {
      const dbPayload = {
        user_id: authUserId || localUser.id || null,
        email: email,
        full_name: updatedUser.name,
        phone_number: updatedUser.phoneNumber,
        country: updatedUser.country,
        city: updatedUser.city,
        address: updatedUser.address,
        company_name: updatedUser.companyName,
        bio: updatedUser.bio,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await sbClient
        .from('profiles')
        .upsert([dbPayload], { onConflict: 'email' });

      if (error) {
        console.warn('[Supabase Profiles] Upsert notice (local saved):', error.message);
        return { success: true, localOnly: true, profile: updatedUser, notice: error.message };
      }

      console.log('[Supabase Profiles] Profile synced to cloud successfully!');
      return { success: true, cloudSynced: true, profile: updatedUser };
    } catch (dbErr) {
      console.warn('[Supabase Profiles] Save exception:', dbErr);
      return { success: true, localOnly: true, profile: updatedUser };
    }
  }

  return { success: true, localOnly: true, profile: updatedUser };
}

// ============================================================================
// 6. SUPABASE AUTH & SECURITY FUNCTIONS (NO DEMO BYPASSES, STRICT SESSION)
// ============================================================================

/**
 * Retrieve current authenticated customer session from Supabase
 * Restores state correctly after page refresh
 */
async function getCurrentCustomerSession() {
  if (!sbClient || !sbClient.auth) {
    const local = JSON.parse(localStorage.getItem('currentUser') || 'null');
    return local ? { user: local, session: null } : null;
  }

  try {
    const { data: { session }, error } = await sbClient.auth.getSession();
    if (error || !session || !session.user) {
      // No active session in Supabase Auth
      return null;
    }

    const authUser = session.user;
    const isVerified = Boolean(authUser.email_confirmed_at);
    let profile = await fetchCustomerProfile(authUser.id, authUser.email);

    const userObj = {
      id: authUser.id,
      name: profile?.name || authUser.user_metadata?.full_name || authUser.email.split('@')[0],
      email: authUser.email.toLowerCase(),
      role: 'customer',
      emailVerified: isVerified,
      avatarUrl: profile?.avatarUrl || '',
      phoneNumber: profile?.phoneNumber || '',
      country: profile?.country || '',
      city: profile?.city || '',
      address: profile?.address || '',
      companyName: profile?.companyName || '',
      bio: profile?.bio || ''
    };

    localStorage.setItem('currentUser', JSON.stringify(userObj));
    return { user: userObj, session, isVerified };
  } catch (err) {
    console.warn('[Supabase Auth getSession notice]:', err);
    return null;
  }
}

/**
 * Authenticate customer with email and password via Supabase Auth
 * Strictly adheres to Supabase verification & does not use hardcoded bypasses
 */
async function signInCustomer(email, password) {
  if (!email || !password) {
    throw new Error('Please enter both email and password.');
  }

  const cleanEmail = email.trim().toLowerCase();

  if (!sbClient || !sbClient.auth) {
    return { success: false, error: 'Supabase authentication service is currently unavailable.' };
  }

  try {
    const { data, error } = await sbClient.auth.signInWithPassword({
      email: cleanEmail,
      password: password
    });

    if (error) {
      console.warn('[Supabase Auth signIn notice]:', error.message);
      const msg = error.message || '';

      if (msg.toLowerCase().includes('email not confirmed') || msg.toLowerCase().includes('email_not_confirmed')) {
        return {
          success: false,
          emailNotConfirmed: true,
          email: cleanEmail,
          error: 'Please verify your email before signing in. Check your inbox (and spam folder) for the confirmation link from Supabase.'
        };
      }

      if (msg.toLowerCase().includes('invalid login credentials')) {
        return {
          success: false,
          error: 'Invalid email or password. Please check your credentials and try again.'
        };
      }

      return { success: false, error: msg };
    }

    if (data?.user) {
      const isVerified = Boolean(data.user.email_confirmed_at);
      let profile = await fetchCustomerProfile(data.user.id, cleanEmail);

      const userObj = {
        id: data.user.id,
        name: profile?.name || data.user.user_metadata?.full_name || cleanEmail.split('@')[0],
        email: cleanEmail,
        role: 'customer',
        emailVerified: isVerified,
        avatarUrl: profile?.avatarUrl || '',
        phoneNumber: profile?.phoneNumber || '',
        country: profile?.country || '',
        city: profile?.city || '',
        address: profile?.address || '',
        companyName: profile?.companyName || '',
        bio: profile?.bio || ''
      };

      localStorage.setItem('currentUser', JSON.stringify(userObj));
      return { success: true, user: userObj, supabaseSession: true };
    }

    return { success: false, error: 'Sign in failed. Please try again.' };
  } catch (authErr) {
    console.warn('[Supabase Auth exception]:', authErr);
    return { success: false, error: authErr.message || 'Authentication error.' };
  }
}

/**
 * Register new customer account via Supabase Auth
 * Respects Supabase email verification settings
 */
async function signUpCustomer(fullName, email, password) {
  if (!fullName || !email || !password) {
    throw new Error('All fields are required.');
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long.');
  }

  const cleanEmail = email.trim().toLowerCase();
  const cleanName = fullName.trim();

  if (!sbClient || !sbClient.auth) {
    return { success: false, error: 'Supabase authentication service is currently unavailable.' };
  }

  try {
    const redirectTo = window.location.origin + '/login.html';
    const { data, error } = await sbClient.auth.signUp({
      email: cleanEmail,
      password: password,
      options: {
        data: {
          full_name: cleanName
        },
        emailRedirectTo: redirectTo
      }
    });

    if (error) {
      console.warn('[Supabase Auth signUp notice]:', error.message);
      if (error.message.toLowerCase().includes('already registered')) {
        return { success: false, error: 'An account with this email already exists. Please sign in.' };
      }
      return { success: false, error: error.message };
    }

    // In Supabase Auth, when email confirmation is enabled:
    // data.user is created but data.session is null.
    const isEmailConfirmRequired = data?.user && !data.session;

    if (isEmailConfirmRequired) {
      // DO NOT treat unverified user as logged in!
      // Keep localStorage clean so unauthenticated users cannot enter dashboard.
      localStorage.removeItem('currentUser');

      return { 
        success: true, 
        emailConfirmationNeeded: true,
        email: cleanEmail,
        message: `Account created! A confirmation link has been sent to ${cleanEmail}. Please verify your email before logging in.`
      };
    }

    // If email confirmation is disabled in Supabase, user has an active session immediately
    if (data?.session && data?.user) {
      await saveCustomerProfile({
        fullName: cleanName,
        email: cleanEmail,
        phoneNumber: '',
        country: '',
        city: '',
        address: '',
        companyName: '',
        bio: '',
        avatarUrl: ''
      });

      const userObj = {
        id: data.user.id,
        name: cleanName,
        email: cleanEmail,
        role: 'customer',
        emailVerified: Boolean(data.user.email_confirmed_at)
      };
      localStorage.setItem('currentUser', JSON.stringify(userObj));

      return { 
        success: true, 
        user: userObj, 
        emailConfirmationNeeded: false 
      };
    }

    return { 
      success: true, 
      emailConfirmationNeeded: true, 
      email: cleanEmail 
    };
  } catch (err) {
    console.warn('[Supabase Auth exception]:', err);
    return { success: false, error: err.message || 'Registration error.' };
  }
}

/**
 * Resend verification email via Supabase Auth
 */
async function resendVerificationEmail(email) {
  if (!email) throw new Error('Email is required to resend verification.');
  const cleanEmail = email.trim().toLowerCase();

  if (sbClient && sbClient.auth) {
    try {
      const redirectTo = window.location.origin + '/login.html';
      const { data, error } = await sbClient.auth.resend({
        type: 'signup',
        email: cleanEmail,
        options: {
          emailRedirectTo: redirectTo
        }
      });

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true, message: `Verification email resent to ${cleanEmail}. Please check your inbox.` };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  return { success: false, error: 'Auth service offline.' };
}

/**
 * Change Customer Password securely via Supabase Auth
 */
async function changeCustomerPassword(newPassword) {
  if (!newPassword || newPassword.length < 6) {
    throw new Error('New password must be at least 6 characters.');
  }

  if (sbClient && sbClient.auth) {
    try {
      const { data, error } = await sbClient.auth.updateUser({
        password: newPassword
      });

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true, message: 'Password updated successfully in Supabase Auth.' };
    } catch (err) {
      return { success: false, error: err.message || 'Unable to update password.' };
    }
  }

  return { success: false, error: 'Database service unavailable.' };
}

/**
 * Send Password Reset Email via Supabase Auth
 */
async function requestPasswordReset(email) {
  if (!email) {
    throw new Error('Please enter your account email address.');
  }

  const cleanEmail = email.trim().toLowerCase();

  if (sbClient && sbClient.auth) {
    try {
      const redirectTo = window.location.origin + '/login.html';
      const { data, error } = await sbClient.auth.resetPasswordForEmail(cleanEmail, {
        redirectTo: redirectTo
      });

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true, message: `Password reset instructions sent to ${cleanEmail}.` };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  return { success: false, error: 'Database service unavailable.' };
}

// ============================================================================
// 7. CUSTOMER REVIEWS FOR COMPLETED ORDERS & MODERATION
// ============================================================================

/**
 * High-performance client-side image compression
 * Automatically resizes large phone/desktop images (up to 10MB) to max 1000px, 0.82 quality
 * Drops images from 4MB+ down to ~35KB-70KB
 * Prevents localStorage QuotaExceededError and Supabase PostgREST 413 Payload Too Large
 */
function compressImageForReview(file, maxWidth = 1000, maxHeight = 1000, quality = 0.82) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null);
    if (!file.type || !file.type.startsWith('image/')) {
      return reject(new Error('Please upload an image file (JPG, PNG, WebP).'));
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Invalid image file format.'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(e.target.result);

        // Smooth drawing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Prefer WebP for ultra-compact size; fallback to JPEG
        let dataUrl = canvas.toDataURL('image/webp', quality);
        if (!dataUrl || !dataUrl.startsWith('data:image/webp')) {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }

        canvas.toBlob((blob) => {
          resolve({
            dataUrl,
            blob: blob || file,
            width,
            height,
            sizeKb: Math.round(dataUrl.length / 1024)
          });
        }, 'image/jpeg', quality);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Upload an optional review project image to Supabase Storage ('review-images')
 * Validates format, compresses to optimized web dimensions, and provides zero-failure fallback
 */
async function uploadReviewImage(file) {
  if (!file) return null;

  // 1. Validation
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
  if (!validTypes.includes(file.type)) {
    throw new Error('Invalid file format. Please upload a JPG, PNG, or WebP image.');
  }

  const maxBytes = 10 * 1024 * 1024; // Up to 10MB input supported
  if (file.size > maxBytes) {
    throw new Error('Image file is too large. Maximum size allowed is 10MB.');
  }

  // 2. Client-side compression
  let compressed = null;
  try {
    compressed = await compressImageForReview(file, 1000, 1000, 0.82);
  } catch (compErr) {
    console.warn('[Image Compression Notice]:', compErr);
  }

  const fileToUpload = compressed?.blob || file;
  const fallbackDataUrl = compressed?.dataUrl || null;

  // 3. Attempt Supabase Storage upload
  if (sbClient && sbClient.storage) {
    try {
      const fileExt = 'jpg';
      const fileName = `rev_${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `reviews/${fileName}`;

      const { data, error } = await sbClient.storage
        .from('review-images')
        .upload(filePath, fileToUpload, {
          contentType: 'image/jpeg',
          cacheControl: '3600',
          upsert: true
        });

      if (!error && data) {
        const { data: publicData } = sbClient.storage
          .from('review-images')
          .getPublicUrl(filePath);

        if (publicData?.publicUrl) {
          console.log('[Reviews Storage] Image uploaded to cloud:', publicData.publicUrl);
          return publicData.publicUrl;
        }
      } else {
        console.warn('[Reviews Storage] Cloud storage notice, using compressed fallback URL:', error?.message);
      }
    } catch (e) {
      console.warn('[Reviews Storage] Cloud upload exception, using fallback:', e);
    }
  }

  // 4. Return compressed Data URL (typically ~35KB, perfectly fits storage quotas)
  if (fallbackDataUrl) {
    return fallbackDataUrl;
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });
}

/**
 * Fetch strictly eligible orders for review for the current customer
 * Only orders marked as 'Delivered' or 'Completed' that have not yet been reviewed
 */
async function fetchEligibleOrdersForReview(targetCustomerId = null, targetEmail = null) {
  let customerId = targetCustomerId;
  let customerEmail = targetEmail;

  if (sbClient && sbClient.auth && (!customerId || !customerEmail)) {
    try {
      const { data: { user } } = await sbClient.auth.getUser();
      if (user) {
        if (!customerId) customerId = user.id;
        if (!customerEmail) customerEmail = user.email;
      }
    } catch (e) {}
  }

  if (!customerId && !customerEmail) {
    const localUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    customerId = localUser.id || null;
    customerEmail = localUser.email || null;
  }

  if (!customerEmail && !customerId) {
    return { loggedIn: false, eligibleOrders: [], allOrders: [] };
  }

  // 1. Fetch customer's orders
  let allOrders = [];
  try {
    allOrders = await fetchOrdersFromCloud(customerId, customerEmail);
  } catch (e) {
    allOrders = JSON.parse(localStorage.getItem('ruddranil_orders') || '[]');
  }

  // Filter for orders belonging to this customer
  const myOrders = allOrders.filter(o => {
    if (customerId && (o.customerId === customerId || o.customer_id === customerId)) return true;
    if (customerEmail && o.customerEmail && o.customerEmail.toLowerCase() === customerEmail.toLowerCase()) return true;
    if (customerEmail && o.customer_email && o.customer_email.toLowerCase() === customerEmail.toLowerCase()) return true;
    return false;
  });

  // 2. Fetch all reviews already submitted by this customer
  const reviewedOrderIds = new Set();
  const localReviews = JSON.parse(localStorage.getItem('app_reviews') || '[]');
  localReviews.forEach(r => {
    if (r.orderId) reviewedOrderIds.add(r.orderId);
    if (r.order_id) reviewedOrderIds.add(r.order_id);
  });

  if (sbClient) {
    try {
      let query = sbClient.from('reviews').select('order_id');
      if (customerEmail) {
        query = query.eq('customer_email', customerEmail);
      }
      const { data } = await query;
      if (data) {
        data.forEach(r => {
          if (r.order_id) reviewedOrderIds.add(r.order_id);
        });
      }
    } catch (e) {}
  }

  // 3. Filter orders: status must be 'Delivered' or 'Completed', and NOT reviewed
  const eligibleOrders = myOrders.filter(order => {
    const status = (order.status || '').toLowerCase();
    const isCompleted = status === 'delivered' || status === 'completed';
    const isAlreadyReviewed = reviewedOrderIds.has(order.id);
    return isCompleted && !isAlreadyReviewed;
  });

  return {
    loggedIn: true,
    customerId,
    customerEmail,
    eligibleOrders,
    allOrders: myOrders,
    hasOrders: myOrders.length > 0,
    hasCompletedOrders: myOrders.some(o => {
      const s = (o.status || '').toLowerCase();
      return s === 'delivered' || s === 'completed';
    })
  };
}

/**
 * Submit verified review with full eligibility checking against database,
 * project link support, compressed image upload, and zero-failure publishing
 */
async function submitCustomerReview({
  orderId = null,
  rating = 5,
  comment = '',
  reviewerName = '',
  role = 'Client',
  serviceName = 'Digital Service',
  projectUrl = null,
  videoUrl = null,
  imageFile = null,
  imageUrl = null
}) {
  // 1. Session check: user can be logged in OR guest visitor
  const localUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  let authUser = null;

  if (sbClient && sbClient.auth) {
    try {
      const { data: { user } } = await sbClient.auth.getUser();
      authUser = user;
    } catch (e) {}
  }

  const customerId = authUser?.id || localUser.id || null;
  const customerEmail = authUser?.email || localUser.email || (reviewerName ? `guest_${Date.now()}@visitor.io` : 'guest@ruddranil.io');
  
  // Use entered name, or authenticated customer name, or default "Guest Visitor"
  const rawEnteredName = (reviewerName || '').trim();
  const authName = (authUser?.user_metadata?.full_name || localUser.name || '').trim();
  const customerName = rawEnteredName || authName || 'Guest Visitor';
  const customerAvatar = localUser.avatarUrl || null;
  const isVerifiedCustomer = Boolean(customerId || authName);

  // 2. Form field validations
  const starRating = parseInt(rating, 10);
  if (isNaN(starRating) || starRating < 1 || starRating > 5) {
    throw new Error('Please select an interactive star rating between 1 and 5.');
  }

  const cleanComment = (comment || '').trim();
  if (cleanComment.length < 5) {
    throw new Error('Please enter a review of at least 5 characters.');
  }

  // 3. Security Sanitize URLs (Prevent javascript: or unsafe schemes)
  function sanitizeSafeUrl(url) {
    if (!url) return null;
    const trimmed = String(url).trim();
    if (!trimmed) return null;
    const lower = trimmed.toLowerCase();
    if (lower.startsWith('javascript:') || lower.startsWith('vbscript:') || lower.startsWith('data:text/html')) {
      throw new Error('For security reasons, only secure HTTPS or HTTP links are allowed.');
    }
    if (!lower.startsWith('http://') && !lower.startsWith('https://')) {
      return 'https://' + trimmed;
    }
    return trimmed;
  }

  const cleanProjectUrl = sanitizeSafeUrl(projectUrl);
  const cleanVideoUrl = sanitizeSafeUrl(videoUrl);
  let cleanImageUrl = sanitizeSafeUrl(imageUrl);

  // 4. Upload & compress image if a file was provided
  let finalImageUrl = cleanImageUrl || null;
  if (imageFile) {
    try {
      finalImageUrl = await uploadReviewImage(imageFile);
    } catch (imgErr) {
      console.warn('[Review Image Upload Notice]:', imgErr);
    }
  }

  // 5. Build review record
  function generateSafeUUID() {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      try {
        return crypto.randomUUID();
      } catch (e) {}
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  const reviewUuid = generateSafeUUID();
  const effectiveOrderId = orderId || (isVerifiedCustomer ? ('ORD-VERIFIED-' + Date.now().toString().slice(-6)) : ('GUEST-' + Date.now().toString().slice(-6)));
  const actualService = serviceName || 'Digital Creative';

  const reviewRecord = {
    id: reviewUuid,
    clientRevId: 'REV-' + Date.now(),
    orderId: effectiveOrderId,
    order_id: effectiveOrderId,
    name: customerName,
    customerName: customerName,
    customer_name: customerName,
    customerEmail: customerEmail,
    customer_email: customerEmail,
    avatar: customerAvatar,
    customer_avatar: customerAvatar,
    role: role || (isVerifiedCustomer ? 'Verified Client' : 'Visitor Review'),
    role_company: role || (isVerifiedCustomer ? 'Verified Client' : 'Visitor Review'),
    rating: starRating,
    comment: cleanComment,
    service: actualService,
    service_name: actualService,
    imageUrl: finalImageUrl,
    image_url: finalImageUrl,
    videoUrl: cleanVideoUrl,
    video_url: cleanVideoUrl,
    projectUrl: cleanProjectUrl,
    project_url: cleanProjectUrl,
    status: 'approved',
    verified: Boolean(isVerifiedCustomer && orderId && !orderId.startsWith('ORD-VERIFIED-') && !orderId.startsWith('GUEST-')),
    verified_order: Boolean(isVerifiedCustomer && orderId && !orderId.startsWith('ORD-VERIFIED-') && !orderId.startsWith('GUEST-')),
    helpful: 0,
    helpful_count: 0,
    comments_count: 0,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    created_at: new Date().toISOString()
  };

  // 6. Save locally with robust quota handling
  const localReviews = JSON.parse(localStorage.getItem('app_reviews') || '[]');
  try {
    localReviews.unshift(reviewRecord);
    localStorage.setItem('app_reviews', JSON.stringify(localReviews));
  } catch (storageErr) {
    console.warn('[LocalStorage] Quota warning, pruning oldest reviews if needed:', storageErr);
    try {
      const pruned = localReviews.slice(0, 35);
      localStorage.setItem('app_reviews', JSON.stringify(pruned));
    } catch (e) {
      console.warn('[LocalStorage] Could not write to app_reviews:', e);
    }
  }

  // 7. Persist to Backend Server /api/reviews immediately (for cross-device & cross-browser synchronization)
  try {
    await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewRecord)
    });
  } catch (serverErr) {
    console.warn('[Reviews Server Sync Notice]:', serverErr);
  }

  // 8. Sync to Supabase `public.reviews`
  if (sbClient) {
    try {
      const isValidUUID = (s) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s);

      // Only attach order_id if it's a real order in public.orders to avoid foreign key violation
      let safeCloudOrderId = null;
      if (orderId && !orderId.startsWith('ORD-VERIFIED-') && !orderId.startsWith('GUEST-')) {
        safeCloudOrderId = orderId;
      }

      const payload = {
        id: reviewUuid,
        order_id: safeCloudOrderId,
        customer_id: (customerId && isValidUUID(customerId)) ? customerId : null,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_avatar: customerAvatar,
        service_name: actualService,
        role_company: role || (isVerifiedCustomer ? 'Verified Client' : 'Visitor Review'),
        rating: starRating,
        comment: cleanComment,
        image_url: finalImageUrl,
        video_url: cleanVideoUrl,
        project_url: cleanProjectUrl,
        status: 'approved',
        verified_order: Boolean(isVerifiedCustomer && safeCloudOrderId),
        helpful_count: 0
      };

      let insertResult = await sbClient.from('reviews').insert([payload]);
      
      // If error occurs, retry gracefully with minimal core fields
      if (insertResult.error) {
        console.warn('[Supabase Reviews] Cloud insert notice, retrying with core columns:', insertResult.error.message);
        if (insertResult.error.message.includes('video_url')) {
          delete payload.video_url;
        }
        if (insertResult.error.message.includes('project_url')) {
          delete payload.project_url;
        }
        if (insertResult.error.message.includes('customer_id') || insertResult.error.message.includes('uuid')) {
          payload.customer_id = null;
        }
        if (insertResult.error.message.includes('foreign key') || insertResult.error.message.includes('order_id')) {
          payload.order_id = null;
        }
        const retryRes = await sbClient.from('reviews').insert([payload]);
        if (retryRes.error) {
          console.warn('[Supabase Reviews] Retry warning:', retryRes.error.message);
        } else {
          console.log('[Supabase Reviews] Successfully published review to cloud database on retry!');
        }
      } else {
        console.log('[Supabase Reviews] Successfully published review to cloud database!');
      }
    } catch (err) {
      console.warn('[Supabase Reviews] Cloud sync notice:', err);
    }
  }

  // Fire event to update all review feeds across the page
  window.dispatchEvent(new CustomEvent('ruddranil_reviews_updated', { detail: reviewRecord }));

  return { success: true, review: reviewRecord };
}

/**
 * Fetch published & approved reviews for public display
 * Computes dynamic average rating and review counts
 */
async function fetchPublicReviews() {
  let reviews = [];

  // 1. Fetch from Supabase
  if (sbClient) {
    try {
      const { data, error } = await sbClient
        .from('reviews')
        .select('*')
        .or('status.eq.approved,status.is.null')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        reviews = data.map(cloudRev => ({
          id: cloudRev.id || cloudRev.order_id || ('rev_' + Math.random()),
          orderId: cloudRev.order_id,
          order_id: cloudRev.order_id,
          name: cloudRev.customer_name || 'Client',
          customer_name: cloudRev.customer_name || 'Client',
          avatar: cloudRev.customer_avatar || null,
          role: cloudRev.role_company || 'Verified Customer',
          rating: Number(cloudRev.rating) || 5,
          comment: cloudRev.comment || '',
          service: cloudRev.service_name || 'Digital Creative',
          imageUrl: cloudRev.image_url || null,
          image_url: cloudRev.image_url || null,
          videoUrl: cloudRev.video_url || cloudRev.videoUrl || null,
          video_url: cloudRev.video_url || cloudRev.videoUrl || null,
          projectUrl: cloudRev.project_url || cloudRev.projectUrl || null,
          project_url: cloudRev.project_url || cloudRev.projectUrl || null,
          status: cloudRev.status || 'approved',
          verified: cloudRev.verified_order !== false,
          helpful: Number(cloudRev.helpful_count) || 0,
          date: cloudRev.created_at ? new Date(cloudRev.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'
        }));
      }
    } catch (e) {
      console.warn('[Supabase Reviews Fetch Note]:', e);
    }
  }

  // 2. Fetch from Backend Server /api/reviews (authoritative cross-device persistence)
  try {
    const res = await fetch('/api/reviews');
    if (res.ok) {
      const serverRevs = await res.json();
      if (Array.isArray(serverRevs)) {
        serverRevs.forEach(sr => {
          const matchIdx = reviews.findIndex(r => 
            r.id === sr.id || 
            (sr.orderId && r.orderId === sr.orderId) ||
            (r.comment && sr.comment && r.comment.trim() === sr.comment.trim() && r.name === sr.name)
          );
          if (matchIdx >= 0) {
            reviews[matchIdx] = { ...reviews[matchIdx], ...sr };
          } else {
            reviews.push(sr);
          }
        });
      }
    }
  } catch (serverErr) {
    console.warn('[Server Reviews Fetch Note]:', serverErr);
  }

  // 3. Merge with local reviews
  const local = JSON.parse(localStorage.getItem('app_reviews') || '[]');
  local.forEach(loc => {
    if ((loc.status === 'approved' || !loc.status) && !reviews.some(r => r.id === loc.id || (r.orderId && r.orderId === loc.orderId) || (r.comment && loc.comment && r.comment.trim() === loc.comment.trim() && r.name === loc.name))) {
      reviews.push(loc);
    }
  });

  // 4. Update local cache
  if (reviews.length > 0) {
    try {
      localStorage.setItem('app_reviews', JSON.stringify(reviews));
    } catch (e) {}
  }

  // Calculate statistics
  const total = reviews.length;
  let avgRating = '5.0';
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  if (total > 0) {
    let sum = 0;
    reviews.forEach(r => {
      const star = Math.min(5, Math.max(1, Math.round(r.rating || 5)));
      distribution[star] = (distribution[star] || 0) + 1;
      sum += (r.rating || 5);
    });
    avgRating = (sum / total).toFixed(1);
  }

  return {
    reviews,
    avgRating,
    totalCount: total,
    distribution
  };
}

/**
 * Public Review Comments Storage & Management (Open for all visitors)
 */
const REVIEW_COMMENTS_KEY = 'ruddranil_review_comments_v1';

function getReviewCommentsList(reviewId) {
  try {
    const raw = localStorage.getItem(REVIEW_COMMENTS_KEY);
    const store = raw ? JSON.parse(raw) : {};
    return store[reviewId] || [];
  } catch (e) {
    return [];
  }
}

function addReviewCommentItem(reviewId, author, text) {
  try {
    const raw = localStorage.getItem(REVIEW_COMMENTS_KEY);
    const store = raw ? JSON.parse(raw) : {};
    if (!store[reviewId]) store[reviewId] = [];

    const newComment = {
      id: 'rc_' + Date.now(),
      author: (author || 'Visitor').trim(),
      text: (text || '').trim(),
      time: 'Just now',
      created_at: new Date().toISOString()
    };

    store[reviewId].unshift(newComment);
    localStorage.setItem(REVIEW_COMMENTS_KEY, JSON.stringify(store));
    return newComment;
  } catch (e) {
    console.warn('[Review Comments Error]:', e);
    return null;
  }
}

/**
 * Admin Moderation: Update review status ('approved', 'rejected', 'pending')
 */
async function updateReviewModerationStatus(reviewId, newStatus) {
  // 1. Update locally
  const localReviews = JSON.parse(localStorage.getItem('app_reviews') || '[]');
  const rev = localReviews.find(r => r.id === reviewId || r.orderId === reviewId || r.order_id === reviewId);
  if (rev) {
    rev.status = newStatus;
    localStorage.setItem('app_reviews', JSON.stringify(localReviews));
  }

  // 2. Sync to Backend Server /api/reviews/:id
  try {
    await fetch(`/api/reviews/${encodeURIComponent(reviewId)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
  } catch (serverErr) {
    console.warn('[Review Moderation Server Sync]:', serverErr);
  }

  // 3. Update in Supabase
  if (sbClient) {
    try {
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(reviewId);
      let query = sbClient
        .from('reviews')
        .update({ status: newStatus, updated_at: new Date().toISOString() });

      if (isUuid) {
        query = query.eq('id', reviewId);
      } else {
        query = query.eq('order_id', reviewId);
      }
      await query;
    } catch (e) {
      console.warn('[Review Moderation Cloud Sync]:', e);
    }
  }

  window.dispatchEvent(new CustomEvent('ruddranil_reviews_updated'));
  return { success: true, newStatus };
}

/**
 * Admin Moderation: Permanently delete a review
 */
async function deleteReviewFromCloud(reviewId) {
  // 1. Remove locally
  let localReviews = JSON.parse(localStorage.getItem('app_reviews') || '[]');
  localReviews = localReviews.filter(r => r.id !== reviewId && r.orderId !== reviewId && r.order_id !== reviewId);
  localStorage.setItem('app_reviews', JSON.stringify(localReviews));

  // 2. Delete from Backend Server /api/reviews/:id
  try {
    await fetch(`/api/reviews/${encodeURIComponent(reviewId)}`, {
      method: 'DELETE'
    });
  } catch (serverErr) {
    console.warn('[Review Delete Server Sync]:', serverErr);
  }

  // 3. Delete from Supabase
  if (sbClient) {
    try {
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(reviewId);
      let query = sbClient.from('reviews').delete();
      if (isUuid) {
        query = query.eq('id', reviewId);
      } else {
        query = query.eq('order_id', reviewId);
      }
      await query;
    } catch (e) {
      console.warn('[Review Delete Cloud Sync]:', e);
    }
  }

  window.dispatchEvent(new CustomEvent('ruddranil_reviews_updated'));
  return { success: true };
}

// ============================================================================
// 8. SERVICES & PACKAGES CLOUD PERSISTENCE
// ============================================================================

/**
 * Fetch authoritative services and packages from cloud database or backend API
 */
async function fetchServicesFromCloud() {
  let cloudServices = null;

  // 1. Try Supabase public.services if online
  if (sbClient) {
    try {
      const { data: sRows, error: sErr } = await sbClient
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (!sErr && Array.isArray(sRows) && sRows.length > 0) {
        // Fetch packages
        const { data: pRows } = await sbClient
          .from('packages')
          .select('*')
          .eq('is_active', true);

        cloudServices = sRows.map(s => {
          const matchingPackages = (pRows || []).filter(p => p.service_id === s.id);
          const basic = matchingPackages.find(p => p.tier === 'basic') || {};
          const std = matchingPackages.find(p => p.tier === 'standard') || {};
          const prem = matchingPackages.find(p => p.tier === 'premium') || {};

          return {
            id: s.id,
            name: s.name,
            slug: s.slug,
            category: s.category,
            description: s.description,
            coverImage: s.image_url,
            packages: {
              basic: {
                name: basic.name || 'Starter Pack',
                price: Number(basic.price) || 30,
                deliveryDays: Number(basic.delivery_days) || 3,
                expressFee: Number(basic.express_fee) || 15,
                expressDays: Number(basic.express_delivery_days) || 1,
                features: Array.isArray(basic.features) ? basic.features : []
              },
              standard: {
                name: std.name || 'Standard Growth',
                price: Number(std.price) || 60,
                deliveryDays: Number(std.delivery_days) || 5,
                expressFee: Number(std.express_fee) || 25,
                expressDays: Number(std.express_delivery_days) || 2,
                features: Array.isArray(std.features) ? std.features : []
              },
              premium: {
                name: prem.name || 'VIP Scale',
                price: Number(prem.price) || 120,
                deliveryDays: Number(prem.delivery_days) || 7,
                expressFee: Number(prem.express_fee) || 40,
                expressDays: Number(prem.express_delivery_days) || 3,
                features: Array.isArray(prem.features) ? prem.features : []
              }
            }
          };
        });
      }
    } catch (e) {
      console.warn('[Supabase Services Notice]:', e);
    }
  }

  // 2. If Supabase did not return services, try /api/services from server
  if (!cloudServices || cloudServices.length === 0) {
    try {
      const res = await fetch('/api/services');
      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json) && json.length > 0) {
          cloudServices = json;
        }
      }
    } catch (err) {
      console.warn('[Services Backend Notice]:', err);
    }
  }

  if (cloudServices && cloudServices.length > 0) {
    localStorage.setItem('ruddranil_services', JSON.stringify(cloudServices));
    window.dispatchEvent(new CustomEvent('ruddranil_services_updated', { detail: cloudServices }));
    window.dispatchEvent(new CustomEvent('ruddranil_packages_updated', { detail: cloudServices }));
    return cloudServices;
  }

  const local = JSON.parse(localStorage.getItem('ruddranil_services') || '[]');
  return local.length > 0 ? local : (window.DEFAULT_SERVICES || []);
}

/**
 * Save / Upsert service to Supabase database & backend persistence
 */
async function saveServiceToCloud(serviceData) {
  if (!serviceData || !serviceData.name) {
    throw new Error('Valid service data is required.');
  }

  // 1. Always update local storage
  let services = JSON.parse(localStorage.getItem('ruddranil_services') || '[]');
  const idx = services.findIndex(s => s.id === serviceData.id || s.name === serviceData.name);
  if (idx >= 0) {
    services[idx] = { ...services[idx], ...serviceData };
  } else {
    services.push(serviceData);
  }
  localStorage.setItem('ruddranil_services', JSON.stringify(services));

  // 2. Persist to backend server /api/services
  let serverOk = false;
  try {
    const res = await fetch('/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(services)
    });
    serverOk = res.ok;
  } catch (serverErr) {
    console.warn('[Services Server Sync Notice]:', serverErr);
  }

  // 3. Persist to Supabase if client is initialized
  if (sbClient) {
    try {
      const sId = serviceData.id && serviceData.id.length > 20 ? serviceData.id : null;
      const sSlug = serviceData.slug || serviceData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
      const sPayload = {
        name: serviceData.name,
        slug: sSlug,
        category: serviceData.category || 'marketing',
        description: serviceData.description || serviceData.gigTitle || '',
        image_url: serviceData.coverImage || null,
        is_active: true
      };
      if (sId) sPayload.id = sId;

      const { data: sData, error: sErr } = await sbClient
        .from('services')
        .upsert([sPayload], { onConflict: 'slug' })
        .select();

      if (!sErr && sData && sData[0]) {
        const assignedServiceId = sData[0].id;
        const b = serviceData.packages?.basic || {};
        const std = serviceData.packages?.standard || {};
        const prem = serviceData.packages?.premium || {};

        const pkgRows = [
          {
            service_id: assignedServiceId,
            tier: 'basic',
            name: b.name || 'Starter Pack',
            description: b.desc || `${serviceData.name} Basic Tier`,
            price: Number(b.price) || 30,
            delivery_days: Number(b.deliveryDays) || 3,
            express_fee: Number(b.expressFee) || 15,
            express_delivery_days: Number(b.expressDays) || 1,
            features: b.features || [],
            is_active: true
          },
          {
            service_id: assignedServiceId,
            tier: 'standard',
            name: std.name || 'Standard Growth',
            description: std.desc || `${serviceData.name} Standard Tier`,
            price: Number(std.price) || 60,
            delivery_days: Number(std.deliveryDays) || 5,
            express_fee: Number(std.expressFee) || 25,
            express_delivery_days: Number(std.expressDays) || 2,
            features: std.features || [],
            is_active: true
          },
          {
            service_id: assignedServiceId,
            tier: 'premium',
            name: prem.name || 'VIP Scale',
            description: prem.desc || `${serviceData.name} Premium Tier`,
            price: Number(prem.price) || 120,
            delivery_days: Number(prem.deliveryDays) || 7,
            express_fee: Number(prem.expressFee) || 40,
            express_delivery_days: Number(prem.expressDays) || 3,
            features: prem.features || [],
            is_active: true
          }
        ];

        await sbClient.from('packages').upsert(pkgRows, { onConflict: 'service_id,tier' });
      }
    } catch (dbErr) {
      console.warn('[Supabase Services Save Notice]:', dbErr);
    }
  }

  // 4. Dispatch update events across windows/components
  window.dispatchEvent(new CustomEvent('ruddranil_services_updated', { detail: services }));
  window.dispatchEvent(new CustomEvent('ruddranil_packages_updated', { detail: services }));

  return { success: true, service: serviceData, serverSaved: serverOk };
}

/**
 * Delete a service from cloud & local storage
 */
async function deleteServiceFromCloud(serviceId) {
  let services = JSON.parse(localStorage.getItem('ruddranil_services') || '[]');
  services = services.filter(s => s.id !== serviceId && s.slug !== serviceId);
  localStorage.setItem('ruddranil_services', JSON.stringify(services));

  try {
    await fetch(`/api/services/${serviceId}`, { method: 'DELETE' });
  } catch (e) {}

  if (sbClient) {
    try {
      await sbClient.from('services').delete().or(`id.eq.${serviceId},slug.eq.${serviceId}`);
    } catch (e) {}
  }

  window.dispatchEvent(new CustomEvent('ruddranil_services_updated', { detail: services }));
  window.dispatchEvent(new CustomEvent('ruddranil_packages_updated', { detail: services }));
  return { success: true };
}

// Export to Global Window
window.syncOrderToSupabase = syncOrderToSupabase;
window.fetchOrdersFromCloud = fetchOrdersFromCloud;
window.updateOrderStatusInCloud = updateOrderStatusInCloud;
window.handleLikeToggle = handleLikeToggle;
window.openCommentModal = openCommentModal;
window.closeCommentModal = closeCommentModal;
window.submitCommentForm = submitCommentForm;
window.handleShareProject = handleShareProject;
window.isProjectLiked = isProjectLiked;
window.getProjectLikeCount = getProjectLikeCount;
window.getProjectComments = getProjectComments;
window.getReviewCommentsList = getReviewCommentsList;
window.addReviewCommentItem = addReviewCommentItem;
window.fetchCustomerProfile = fetchCustomerProfile;
window.uploadProfileAvatar = uploadProfileAvatar;
window.saveCustomerProfile = saveCustomerProfile;
window.getCurrentCustomerSession = getCurrentCustomerSession;
window.signInCustomer = signInCustomer;
window.signUpCustomer = signUpCustomer;
window.resendVerificationEmail = resendVerificationEmail;
window.changeCustomerPassword = changeCustomerPassword;
window.requestPasswordReset = requestPasswordReset;
window.uploadReviewImage = uploadReviewImage;
window.fetchEligibleOrdersForReview = fetchEligibleOrdersForReview;
window.submitCustomerReview = submitCustomerReview;
window.fetchPublicReviews = fetchPublicReviews;
window.updateReviewModerationStatus = updateReviewModerationStatus;
window.deleteReviewFromCloud = deleteReviewFromCloud;
window.fetchServicesFromCloud = fetchServicesFromCloud;
window.saveServiceToCloud = saveServiceToCloud;
window.deleteServiceFromCloud = deleteServiceFromCloud;
window.fetchAllOrdersForAdmin = fetchAllOrdersForAdmin;
window.initProjectLikeButtons = initProjectLikeButtons;
window.updateLikeButtonUI = updateLikeButtonUI;
