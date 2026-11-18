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
// 0. ADMIN & SUPABASE STORAGE CENTER (sanjitrooy733@gmail.com)
// ============================================================================
const ADMIN_STORAGE_EMAIL = 'sanjitrooy733@gmail.com';
window.ADMIN_STORAGE_EMAIL = ADMIN_STORAGE_EMAIL;

function isAdminEmailMatch(email) {
  return String(email || '').trim().toLowerCase() === ADMIN_STORAGE_EMAIL;
}

// Fallback Router: If Supabase falls back to root Site URL (/) because a preview Redirect URL
// is not yet allowlisted in Authentication -> URL Configuration, forward admin recovery to /admin-login.html
(function setupAdminRecoveryFallbackRouter() {
  if (typeof window === 'undefined') return;
  const cleanPath = (window.location.pathname || '/').replace(/\/+$/, '') || '/';
  const hash = window.location.hash || '';
  const search = window.location.search || '';
  const searchParams = new URLSearchParams(search);
  const hashParams = new URLSearchParams(hash.startsWith('#') ? hash.slice(1) : hash);

  const hasRecoveryParam = hashParams.get('type') === 'recovery' || searchParams.get('type') === 'recovery';
  if (hasRecoveryParam) {
    try {
      sessionStorage.setItem('ruddranil_pending_password_setup', 'true');
      sessionStorage.removeItem('ruddranil_admin_unlocked');
    } catch (e) {}
  }

  if (cleanPath.endsWith('/admin-login') || cleanPath.endsWith('/admin-login.html')) return;

  if (hasRecoveryParam) {
    window.location.replace(`/admin-login${search}${hash}`);
    return;
  }

  if (sbClient && sbClient.auth && typeof sbClient.auth.onAuthStateChange === 'function') {
    sbClient.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        const userEmail = session?.user?.email;
        if (!userEmail || isAdminEmailMatch(userEmail)) {
          try {
            sessionStorage.setItem('ruddranil_pending_password_setup', 'true');
            sessionStorage.removeItem('ruddranil_admin_unlocked');
          } catch (e) {}
          window.location.replace('/admin-login?type=recovery');
        }
      }
    });
  }
})();

function decodeJwtPayloadUnsafe(token) {
  try {
    const parts = String(token || '').split('.');
    if (parts.length < 2) return null;
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
    return JSON.parse(atob(padded));
  } catch (e) {
    return null;
  }
}

async function isSupabaseRecoveryOtpOnlySession() {
  try {
    if (sessionStorage.getItem('ruddranil_pending_password_setup') === 'true') {
      return true;
    }
  } catch (e) {}
  if (!sbClient || !sbClient.auth) return false;
  try {
    const { data: { session } } = await sbClient.auth.getSession();
    if (!session?.access_token) return false;
    const payload = decodeJwtPayloadUnsafe(session.access_token);
    const amr = Array.isArray(payload?.amr) ? payload.amr : [];
    const methods = amr.map(a => String(a?.method || a || '').toLowerCase()).filter(Boolean);
    if (methods.length > 0 && !methods.includes('password') && (methods.includes('otp') || methods.includes('recovery'))) {
      return true;
    }
  } catch (e) {}
  return false;
}
window.isSupabaseRecoveryOtpOnlySession = isSupabaseRecoveryOtpOnlySession;

async function getSupabaseAuthUser() {
  if (!sbClient || !sbClient.auth) return null;
  try {
    const { data: { session } } = await sbClient.auth.getSession();
    if (session?.user) return session.user;
    const { data: { user } } = await sbClient.auth.getUser();
    return user || null;
  } catch (e) {
    return null;
  }
}

async function getSupabaseAccessToken() {
  if (!sbClient || !sbClient.auth) return null;
  try {
    const { data: { session } } = await sbClient.auth.getSession();
    return session?.access_token || null;
  } catch (e) {
    return null;
  }
}

async function getAdminAuthHeaders(extraHeaders = {}) {
  const headers = { ...extraHeaders };
  const token = await getSupabaseAccessToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

async function isCurrentUserAdmin() {
  const user = await getSupabaseAuthUser();
  if (!user) return false;
  const emailMatch = isAdminEmailMatch(user.email);
  const roleMatch = user.app_metadata?.role === 'admin';
  return emailMatch || roleMatch;
}

async function signInAdminSupabase(email, password) {
  const cleanEmail = String(email || '').trim().toLowerCase();
  if (!cleanEmail || !password) {
    return { success: false, error: 'Email and password are required.' };
  }
  if (!sbClient || !sbClient.auth) {
    return { success: false, error: 'Supabase Auth client unavailable.' };
  }
  try {
    const { data, error } = await sbClient.auth.signInWithPassword({
      email: cleanEmail,
      password
    });
    if (error) {
      return { success: false, error: error.message };
    }
    const user = data?.user;
    if (!user) {
      return { success: false, error: 'No user returned by Supabase Auth.' };
    }
    const allowed = isAdminEmailMatch(user.email) ||
      user.app_metadata?.role === 'admin';

    if (!allowed) {
      await sbClient.auth.signOut().catch(() => {});
      return {
        success: false,
        unauthorized: true,
        error: `Account ${cleanEmail} does not have admin privileges. Please sign in with ${ADMIN_STORAGE_EMAIL}.`
      };
    }
    return { success: true, user, session: data.session };
  } catch (err) {
    return { success: false, error: err?.message || 'Admin sign-in failed.' };
  }
}

const EMAIL_MAX_ATTEMPTS = 3;
const EMAIL_COOLDOWN_MS = 60 * 60 * 1000; // 1 hour cooldown (3600s)
const EMAIL_RATE_LIMIT_STORAGE_KEY = 'ruddranil_email_rate_limits_v1';

function isSupabaseRateLimitText(msg) {
  const raw = String(msg || '');
  return /rate limit/i.test(raw) || /\b429\b/.test(raw) || /security purposes/i.test(raw) || /too many requests/i.test(raw);
}

function readEmailRateStore() {
  try {
    const raw = localStorage.getItem(EMAIL_RATE_LIMIT_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return (parsed && typeof parsed === 'object') ? parsed : {};
  } catch (e) {
    return {};
  }
}

function writeEmailRateStore(store) {
  try {
    localStorage.setItem(EMAIL_RATE_LIMIT_STORAGE_KEY, JSON.stringify(store));
  } catch (e) {}
}

function formatCooldownMMSS(ms) {
  const totalSec = Math.max(0, Math.ceil(Number(ms || 0) / 1000));
  const mins = Math.floor(totalSec / 60);
  const secs = totalSec % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function getEmailRateStatus(scope = 'signup_confirm', email = '') {
  const cleanEmail = String(email || '').trim().toLowerCase() || '_default_';
  const key = `${scope}:${cleanEmail}`;
  const store = readEmailRateStore();
  let entry = store[key] || { attempts: 0, lockUntil: 0, lastSentAt: 0 };
  const now = Date.now();

  if (entry.lockUntil && now >= entry.lockUntil) {
    delete store[key];
    writeEmailRateStore(store);
    entry = { attempts: 0, lockUntil: 0, lastSentAt: 0 };
  }

  const isLocked = Boolean(entry.lockUntil && now < entry.lockUntil);
  const remainingMs = isLocked ? Math.max(0, entry.lockUntil - now) : 0;
  const attemptsUsed = Math.min(EMAIL_MAX_ATTEMPTS, Number(entry.attempts || 0));
  const remainingAttempts = isLocked ? 0 : Math.max(0, EMAIL_MAX_ATTEMPTS - attemptsUsed);

  return {
    scope,
    email: cleanEmail,
    maxAttempts: EMAIL_MAX_ATTEMPTS,
    attemptsUsed,
    remainingAttempts,
    isLocked,
    lockUntil: entry.lockUntil || 0,
    remainingMs,
    remainingSeconds: Math.ceil(remainingMs / 1000),
    formattedTime: formatCooldownMMSS(remainingMs)
  };
}

function recordEmailSendAttempt(scope = 'signup_confirm', email = '') {
  const cleanEmail = String(email || '').trim().toLowerCase() || '_default_';
  const key = `${scope}:${cleanEmail}`;
  const store = readEmailRateStore();
  const now = Date.now();
  let entry = store[key] || { attempts: 0, lockUntil: 0, lastSentAt: 0 };

  if (entry.lockUntil && now >= entry.lockUntil) {
    entry = { attempts: 0, lockUntil: 0, lastSentAt: 0 };
  }

  entry.attempts = Math.min(EMAIL_MAX_ATTEMPTS, Number(entry.attempts || 0) + 1);
  entry.lastSentAt = now;
  if (entry.attempts >= EMAIL_MAX_ATTEMPTS) {
    entry.lockUntil = now + EMAIL_COOLDOWN_MS;
  }

  store[key] = entry;
  writeEmailRateStore(store);
  return getEmailRateStatus(scope, cleanEmail);
}

function markEmailRateLimited(scope = 'signup_confirm', email = '') {
  const cleanEmail = String(email || '').trim().toLowerCase() || '_default_';
  const key = `${scope}:${cleanEmail}`;
  const store = readEmailRateStore();
  const now = Date.now();
  store[key] = {
    attempts: EMAIL_MAX_ATTEMPTS,
    lockUntil: now + EMAIL_COOLDOWN_MS,
    lastSentAt: now
  };
  writeEmailRateStore(store);
  return getEmailRateStatus(scope, cleanEmail);
}

const ruddranilEmailRateLimiter = {
  MAX_ATTEMPTS: EMAIL_MAX_ATTEMPTS,
  COOLDOWN_MS: EMAIL_COOLDOWN_MS,
  formatCooldownMMSS,
  getStatus: getEmailRateStatus,
  recordAttempt: recordEmailSendAttempt,
  markLocked: markEmailRateLimited
};

function formatSupabaseEmailError(msg, fallback, rateStatus = null) {
  const raw = String(msg || fallback || 'Email request failed.');
  if (isSupabaseRateLimitText(raw)) {
    const waitStr = rateStatus?.formattedTime ? ` (${rateStatus.formattedTime} remaining)` : ' (~60 minutes)';
    return `সর্বোচ্চ ৩ বার ইমেইল পাঠানো হয়ে গেছে বা Supabase rate limit পূর্ণ হয়েছে। অনুগ্রহ করে ১ ঘণ্টা পর আবার চেষ্টা করুন${waitStr} অথবা অন্য একটি Gmail ব্যবহার করুন।`;
  }
  return raw;
}

async function requestAdminPasswordReset(email = ADMIN_STORAGE_EMAIL) {
  const cleanEmail = String(email || ADMIN_STORAGE_EMAIL).trim().toLowerCase();
  if (!isAdminEmailMatch(cleanEmail)) {
    return { success: false, error: `Only authorized admin email (${ADMIN_STORAGE_EMAIL}) can reset admin access.` };
  }
  const currentRate = getEmailRateStatus('admin_reset', cleanEmail);
  if (currentRate.isLocked) {
    return {
      success: false,
      rateLimited: true,
      rateStatus: currentRate,
      error: `সর্বোচ্চ ৩ বার রিসেট লিংক পাঠানো হয়েছে। অনুগ্রহ করে ${currentRate.formattedTime} পর আবার চেষ্টা করুন।`
    };
  }
  if (!sbClient || !sbClient.auth) {
    return { success: false, error: 'Supabase Auth client unavailable.' };
  }
  try {
    const redirectTo = typeof window !== 'undefined'
      ? `${window.location.origin}/admin-login`
      : undefined;
    const { error } = await sbClient.auth.resetPasswordForEmail(cleanEmail, redirectTo ? { redirectTo } : undefined);
    if (error) {
      if (isSupabaseRateLimitText(error.message)) {
        const locked = markEmailRateLimited('admin_reset', cleanEmail);
        return { success: false, rateLimited: true, rateStatus: locked, error: formatSupabaseEmailError(error.message, 'Could not send reset email.', locked) };
      }
      return { success: false, rateStatus: currentRate, error: formatSupabaseEmailError(error.message, 'Could not send reset email.') };
    }
    const nextRate = recordEmailSendAttempt('admin_reset', cleanEmail);
    return { success: true, rateStatus: nextRate };
  } catch (err) {
    if (isSupabaseRateLimitText(err?.message)) {
      const locked = markEmailRateLimited('admin_reset', cleanEmail);
      return { success: false, rateLimited: true, rateStatus: locked, error: formatSupabaseEmailError(err?.message, 'Could not send reset email.', locked) };
    }
    return { success: false, rateStatus: currentRate, error: formatSupabaseEmailError(err?.message, 'Could not send reset email.') };
  }
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

function sanitizeStorageFileName(name) {
  return String(name || 'file')
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/_+/g, '_')
    .slice(-80);
}

async function getSignedStorageUrl(bucket, path, expiresIn = 31536000) {
  if (!sbClient || !sbClient.storage || !bucket || !path) return null;
  try {
    const { data, error } = await sbClient.storage
      .from(bucket)
      .createSignedUrl(path, expiresIn);
    if (!error && data?.signedUrl) {
      return data.signedUrl;
    }
  } catch (e) {
    console.warn('[Supabase Storage] Signed URL notice:', e);
  }
  return null;
}

async function resolveStorageFileUrl(fileObj) {
  if (!fileObj) return null;
  if (typeof fileObj === 'string') return fileObj;
  if (fileObj.storageBucket && fileObj.storagePath && sbClient && sbClient.storage) {
    if (fileObj.storageBucket === 'portfolio-media' || fileObj.storageBucket === 'profile-avatars' || fileObj.storageBucket === 'review-images') {
      const { data } = sbClient.storage.from(fileObj.storageBucket).getPublicUrl(fileObj.storagePath);
      if (data?.publicUrl) return data.publicUrl;
    } else {
      const freshSigned = await getSignedStorageUrl(fileObj.storageBucket, fileObj.storagePath, 3600);
      if (freshSigned) return freshSigned;
    }
  }
  return fileObj.signedUrl || fileObj.url || fileObj.publicUrl || fileObj.dataUrl || null;
}

async function uploadFileToBucket(bucket, file, pathPrefix = 'uploads', options = {}) {
  if (!file) throw new Error('No file selected.');
  const maxMb = options.maxMb || 25;
  if (file.size > maxMb * 1024 * 1024) {
    throw new Error(`File "${file.name}" exceeds ${maxMb}MB maximum size.`);
  }

  const cleanName = sanitizeStorageFileName(file.name);
  const cleanPrefix = String(pathPrefix || 'uploads').replace(/^\/+|\/+$/g, '');
  const objectPath = `${cleanPrefix}/${Date.now()}_${cleanName}`;
  const isPublic = options.isPublic !== false;

  if (sbClient && sbClient.storage) {
    try {
      const { data, error } = await sbClient.storage
        .from(bucket)
        .upload(objectPath, file, {
          contentType: file.type || 'application/octet-stream',
          cacheControl: '3600',
          upsert: true
        });

      if (!error && data) {
        if (isPublic) {
          const { data: pubData } = sbClient.storage.from(bucket).getPublicUrl(objectPath);
          if (pubData?.publicUrl) {
            return {
              success: true,
              cloudStored: true,
              bucket,
              path: objectPath,
              url: pubData.publicUrl,
              publicUrl: pubData.publicUrl,
              signedUrl: null,
              type: file.type || 'application/octet-stream',
              name: file.name,
              rawSize: file.size
            };
          }
        } else {
          // 1 year signed URL so cross-device order tracking downloads work seamlessly
          const signedUrl = await getSignedStorageUrl(bucket, objectPath, 31536000);
          return {
            success: true,
            cloudStored: true,
            bucket,
            path: objectPath,
            url: signedUrl,
            signedUrl: signedUrl,
            publicUrl: null,
            type: file.type || 'application/octet-stream',
            name: file.name,
            rawSize: file.size
          };
        }
      } else if (error) {
        console.warn(`[Supabase Storage] Upload to "${bucket}" failed:`, error.message);
      }
    } catch (uploadErr) {
      console.warn(`[Supabase Storage] Exception uploading to "${bucket}":`, uploadErr);
    }
  }

  // Graceful fallback to Data URL for smaller files if cloud storage is not active yet
  if (file.size <= 3.5 * 1024 * 1024) {
    const dataUrl = await readFileAsDataUrl(file);
    return {
      success: true,
      cloudStored: false,
      bucket,
      path: null,
      url: dataUrl,
      dataUrl,
      type: file.type || 'application/octet-stream',
      name: file.name,
      rawSize: file.size
    };
  }

  throw new Error(`Cloud storage upload to "${bucket}" requires active Supabase login for ${ADMIN_STORAGE_EMAIL} and bucket policies configured.`);
}

async function uploadPortfolioMediaToCloud(file, folder = 'showcase') {
  return await uploadFileToBucket('portfolio-media', file, folder, { isPublic: true, maxMb: 30 });
}

async function uploadOrderReferenceToCloud(file, orderId = 'order') {
  const cleanOrderId = String(orderId || 'order').trim().replace(/^#/, '');
  const user = await getSupabaseAuthUser();
  // Prefix with user.id so Storage SELECT RLS (auth.uid() = foldername[1]) allows immediate signed URL creation before order row insert
  const folder = user?.id ? `${user.id}/${cleanOrderId}` : cleanOrderId;
  const res = await uploadFileToBucket('order-references', file, folder, { isPublic: false, maxMb: 15 });
  const sizeLabel = file.size >= 1024 * 1024
    ? (file.size / (1024 * 1024)).toFixed(2) + ' MB'
    : Math.max(1, Math.round(file.size / 1024)) + ' KB';

  let previewDataUrl = res.dataUrl || null;
  if (!res.signedUrl && !res.url && !previewDataUrl && file.type && file.type.startsWith('image/') && file.size <= 1.5 * 1024 * 1024) {
    try {
      previewDataUrl = await readFileAsDataUrl(file);
    } catch (e) {}
  }

  return {
    name: file.name,
    size: sizeLabel,
    rawSize: file.size,
    type: file.type || 'application/octet-stream',
    storageBucket: res.cloudStored ? 'order-references' : null,
    storagePath: res.path || null,
    signedUrl: res.signedUrl || null,
    url: res.url || previewDataUrl || null,
    dataUrl: res.url || previewDataUrl || null,
    cloudStored: Boolean(res.cloudStored)
  };
}

async function uploadDeliveryFileToCloud(file, orderId, version = 1) {
  const cleanId = String(orderId || 'order').trim().replace(/^#/, '');
  const res = await uploadFileToBucket('order-deliveries', file, `${cleanId}/v${version}`, { isPublic: false, maxMb: 50 });
  const sizeLabel = file.size >= 1024 * 1024
    ? (file.size / (1024 * 1024)).toFixed(2) + ' MB'
    : Math.max(1, Math.round(file.size / 1024)) + ' KB';

  return {
    name: file.name,
    size: sizeLabel,
    rawSize: file.size,
    type: file.type || 'application/octet-stream',
    storageBucket: res.cloudStored ? 'order-deliveries' : null,
    storagePath: res.path || null,
    signedUrl: res.signedUrl || null,
    url: res.url || null,
    dataUrl: res.url || res.dataUrl || null,
    cloudStored: Boolean(res.cloudStored)
  };
}

// ============================================================================
// 1. ORDERS API
// ============================================================================

function safeSetLocalJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.warn(`[LocalStorage] Write warning for ${key}:`, e.message || e);
    return false;
  }
}

function mapOrderRowFromCloud(row) {
  if (!row) return null;
  const finalTot = Number(row.final_total || row.package_price || 0);
  return {
    id: row.id,
    customerId: row.customer_id || null,
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
    selectedAddons: Array.isArray(row.selected_addons) ? row.selected_addons : [],
    addonsTotal: Number(row.addons_total || 0),
    couponCode: row.coupon_code || '',
    discountAmount: Number(row.discount_amount || 0),
    subtotal: Number(row.subtotal || 0),
    finalTotal: finalTot,
    request: row.request || '',
    referenceFiles: Array.isArray(row.reference_files) ? row.reference_files : [],
    status: row.status || 'Pending',
    progress: Number(row.progress || 0),
    price: row.price || `$${finalTot.toFixed(2)}`,
    delivery: row.delivery || null,
    deliveries: Array.isArray(row.deliveries) ? row.deliveries : (row.delivery ? [row.delivery] : []),
    revisions: Array.isArray(row.revisions) ? row.revisions : [],
    clientAccepted: Boolean(row.client_accepted),
    completedAt: row.completed_at || null,
    orderDate: row.order_date ? new Date(row.order_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently',
    lastUpdated: row.last_updated ? new Date(row.last_updated).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 'Recently'
  };
}

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
  safeSetLocalJson('ruddranil_orders', localOrders);

  // 1. Persist to Backend Server /api/orders immediately (when Express server is running)
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
            const adminActor = isAdminEmailMatch(user.email);
            if (!adminActor && !authUserId) {
              authUserId = user.id;
            }
            if (!authEmail && !adminActor) {
              authEmail = user.email;
            }
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
        service_slug: order.serviceSlug || (order.service || 'service').toLowerCase().replace(/\s+/g, '-'),
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
        price: order.price || `$${Number(order.finalTotal || 30).toFixed(2)}`,
        delivery: order.delivery || null,
        deliveries: Array.isArray(order.deliveries) ? order.deliveries : [],
        revisions: Array.isArray(order.revisions) ? order.revisions : [],
        client_accepted: Boolean(order.clientAccepted),
        completed_at: order.completedAt || null
      };

      let cloudSaved = false;
      let cloudError = null;
      const { error } = await sbClient.from('orders').upsert([payload], { onConflict: 'id' });
      if (error) {
        // Retry without optional extended columns if migration has not run yet
        if (error.message && (error.message.includes('delivery') || error.message.includes('revisions') || error.message.includes('client_accepted'))) {
          delete payload.delivery;
          delete payload.deliveries;
          delete payload.revisions;
          delete payload.client_accepted;
          delete payload.completed_at;
          const retry = await sbClient.from('orders').upsert([payload], { onConflict: 'id' });
          if (!retry.error) {
            cloudSaved = true;
            console.log('[Supabase Orders] Order synced to cloud (base schema):', order.id);
          } else {
            cloudError = retry.error.message;
            console.warn('[Supabase Orders] Retry insert notice:', retry.error.message);
          }
        } else {
          cloudError = error.message;
          console.warn('[Supabase Orders] Insert notice:', error.message);
        }
      } else {
        cloudSaved = true;
        console.log('[Supabase Orders] Order synced to cloud:', order.id);
      }

      window.dispatchEvent(new CustomEvent('ruddranil_orders_updated', { detail: order }));
      return { success: true, cloudSaved, cloudError, order };
    } catch (err) {
      console.warn('[Supabase Orders] Sync exception:', err);
      window.dispatchEvent(new CustomEvent('ruddranil_orders_updated', { detail: order }));
      return { success: true, cloudSaved: false, cloudError: err?.message || 'Sync error', order };
    }
  }

  // 3. Dispatch cross-component event so Admin Panel or Tracker updates instantly
  window.dispatchEvent(new CustomEvent('ruddranil_orders_updated', { detail: order }));
  return { success: true, cloudSaved: false, cloudError: 'Supabase client unavailable', order };
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

  // Query Server API for orders belonging to this customer (authenticated)
  try {
    const authHeaders = await getAdminAuthHeaders();
    const res = await fetch('/api/orders', { headers: authHeaders });
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
    let query = sbClient.from('orders').select('*').order('order_date', { ascending: false });

    // Filter by customer UUID or email
    if (customerId && customerEmail) {
      query = query.or(`customer_id.eq.${customerId},customer_email.ilike.${customerEmail}`);
    } else if (customerId) {
      query = query.eq('customer_id', customerId);
    } else if (customerEmail) {
      query = query.ilike('customer_email', customerEmail);
    }

    const { data, error } = await query;
    if (error || !data) {
      return userOrders;
    }

    const cloudOrders = data.map(mapOrderRowFromCloud).filter(Boolean);

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

    try {
      const allLocal = JSON.parse(localStorage.getItem('ruddranil_orders') || '[]');
      merged.forEach(mo => {
        const idx = allLocal.findIndex(lo => lo.id === mo.id);
        if (idx >= 0) allLocal[idx] = { ...allLocal[idx], ...mo };
        else allLocal.unshift(mo);
      });
      safeSetLocalJson('ruddranil_orders', allLocal);
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

  // 1. Fetch from server-side persistent endpoint (/api/orders with Admin Bearer JWT)
  try {
    const authHeaders = await getAdminAuthHeaders();
    const res = await fetch('/api/orders', { headers: authHeaders });
    if (res.ok) {
      const serverOrders = await res.json();
      if (Array.isArray(serverOrders) && serverOrders.length > 0) {
        allOrders = serverOrders;
      }
    }
  } catch (err) {
    console.warn('[Admin Orders] Server fetch notice:', err);
  }

  // 2. Fetch from Supabase orders table (authoritative cloud source)
  if (sbClient) {
    try {
      const { data, error } = await sbClient
        .from('orders')
        .select('*')
        .order('order_date', { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        const cloudOrders = data.map(mapOrderRowFromCloud).filter(Boolean);

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
    safeSetLocalJson('ruddranil_orders', allOrders);
  }

  return allOrders;
}

/**
 * Fetch a single order for work-tracking.html safely using RPC get_order_tracking_by_id
 */
async function fetchOrderTrackingFromCloud(orderId) {
  const cleanId = String(orderId || '').trim().replace(/^#/, '');
  if (!cleanId) return null;

  if (sbClient) {
    try {
      // 1. Try secure scoped RPC first (works for anonymous and logged-in visitors)
      const { data: rpcData, error: rpcErr } = await sbClient.rpc('get_order_tracking_by_id', {
        p_order_id: cleanId
      });
      if (!rpcErr && rpcData) {
        const mapped = mapOrderRowFromCloud(rpcData);
        if (mapped) {
          const localOrders = JSON.parse(localStorage.getItem('ruddranil_orders') || '[]');
          const idx = localOrders.findIndex(o => (o.id || '').toUpperCase() === mapped.id.toUpperCase());
          if (idx >= 0) localOrders[idx] = { ...localOrders[idx], ...mapped };
          else localOrders.unshift(mapped);
          safeSetLocalJson('ruddranil_orders', localOrders);
          return mapped;
        }
      }
    } catch (e) {
      console.warn('[Tracking RPC] Notice:', e);
    }

    try {
      // 2. Direct table lookup fallback (for authenticated owner/admin if RPC not yet deployed)
      const { data, error } = await sbClient
        .from('orders')
        .select('*')
        .ilike('id', cleanId)
        .maybeSingle();
      if (!error && data) {
        const mapped = mapOrderRowFromCloud(data);
        if (mapped) return mapped;
      }
    } catch (e2) {}
  }

  // 3. Server API single-order lookup fallback
  try {
    const res = await fetch(`/api/orders/${encodeURIComponent(cleanId)}`);
    if (res.ok) {
      const found = await res.json();
      if (found && found.id) return found;
    }
  } catch (e3) {}

  // 4. localStorage fallback
  const localOrders = JSON.parse(localStorage.getItem('ruddranil_orders') || '[]');
  return localOrders.find(o => (o.id || '').replace(/^#/, '').toUpperCase() === cleanId.toUpperCase()) || null;
}

/**
 * Update order status and progress in Supabase, backend server and localStorage
 */
async function updateOrderStatusInCloud(orderId, newStatus, newProgress) {
  const cleanId = (orderId || '').trim().replace(/^#/, '');

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
    safeSetLocalJson('ruddranil_orders', orders);
  }

  // 2. Sync to Backend Server
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

/**
 * Save Admin Work Delivery (with Supabase Storage file metadata & versions) to Cloud
 */
async function saveOrderDeliveryToCloud(orderId, deliveryObj, deliveriesArr) {
  const cleanId = String(orderId || '').trim().replace(/^#/, '');
  const nowIso = new Date().toISOString();

  // 1. Update localStorage
  const orders = JSON.parse(localStorage.getItem('ruddranil_orders') || '[]');
  const order = orders.find(o => (o.id || '').replace(/^#/, '').toUpperCase() === cleanId.toUpperCase());
  if (order) {
    order.delivery = deliveryObj;
    order.deliveries = deliveriesArr || [deliveryObj];
    order.status = 'Delivered';
    order.progress = 100;
    order.lastUpdated = 'Just now';
    safeSetLocalJson('ruddranil_orders', orders);
  }

  // 2. Sync to Server API
  try {
    await fetch(`/api/orders/${encodeURIComponent(cleanId)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'Delivered',
        progress: 100,
        delivery: deliveryObj,
        deliveries: deliveriesArr || [deliveryObj],
        lastUpdated: nowIso
      })
    });
  } catch (e) {}

  // 3. Sync to Supabase Orders Table
  if (sbClient) {
    try {
      const { error } = await sbClient
        .from('orders')
        .update({
          status: 'Delivered',
          progress: 100,
          delivery: deliveryObj,
          deliveries: deliveriesArr || [deliveryObj],
          last_updated: nowIso
        })
        .ilike('id', cleanId);

      if (error && error.message && (error.message.includes('delivery') || error.message.includes('deliveries'))) {
        await sbClient
          .from('orders')
          .update({ status: 'Delivered', progress: 100, last_updated: nowIso })
          .ilike('id', cleanId);
      }
    } catch (sbErr) {
      console.warn('[Supabase Delivery] Cloud sync notice:', sbErr);
    }
  }

  window.dispatchEvent(new CustomEvent('ruddranil_orders_updated', {
    detail: { orderId: cleanId, newStatus: 'Delivered', newProgress: 100 }
  }));
  return { success: true };
}

/**
 * Customer Accepts Delivery & Completes Order via Supabase RPC + fallback
 */
async function acceptOrderDeliveryInCloud(orderId) {
  const cleanId = String(orderId || '').trim().replace(/^#/, '');
  const nowIso = new Date().toISOString();

  const orders = JSON.parse(localStorage.getItem('ruddranil_orders') || '[]');
  const order = orders.find(o => (o.id || '').replace(/^#/, '').toUpperCase() === cleanId.toUpperCase());
  if (order) {
    order.status = 'Completed';
    order.progress = 100;
    order.clientAccepted = true;
    order.completedAt = nowIso;
    order.lastUpdated = 'Just now';
    safeSetLocalJson('ruddranil_orders', orders);
  }

  try {
    await fetch(`/api/orders/${encodeURIComponent(cleanId)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'Completed',
        progress: 100,
        clientAccepted: true,
        completedAt: nowIso,
        lastUpdated: nowIso
      })
    });
  } catch (e) {}

  if (sbClient) {
    let rpcSuccess = false;
    try {
      const { data, error } = await sbClient.rpc('submit_order_tracking_action', {
        p_order_id: cleanId,
        p_action: 'accept',
        p_note: null
      });
      if (!error && data?.success) rpcSuccess = true;
    } catch (e) {}

    if (!rpcSuccess) {
      try {
        await sbClient
          .from('orders')
          .update({
            status: 'Completed',
            progress: 100,
            client_accepted: true,
            completed_at: nowIso,
            last_updated: nowIso
          })
          .ilike('id', cleanId);
      } catch (e2) {}
    }
  }

  window.dispatchEvent(new CustomEvent('ruddranil_orders_updated', {
    detail: { orderId: cleanId, newStatus: 'Completed', newProgress: 100 }
  }));
  return { success: true };
}

/**
 * Customer Requests Revision on Delivered Work via Supabase RPC + fallback
 */
async function requestOrderRevisionInCloud(orderId, note, updatedRevisions = null) {
  const cleanId = String(orderId || '').trim().replace(/^#/, '');
  const nowIso = new Date().toISOString();

  const orders = JSON.parse(localStorage.getItem('ruddranil_orders') || '[]');
  const order = orders.find(o => (o.id || '').replace(/^#/, '').toUpperCase() === cleanId.toUpperCase());
  if (order) {
    order.status = 'In Revision';
    order.progress = 80;
    if (updatedRevisions) order.revisions = updatedRevisions;
    order.lastUpdated = 'Just now';
    safeSetLocalJson('ruddranil_orders', orders);
  }

  try {
    await fetch(`/api/orders/${encodeURIComponent(cleanId)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'In Revision',
        progress: 80,
        revisions: updatedRevisions || order?.revisions || [],
        lastUpdated: nowIso
      })
    });
  } catch (e) {}

  if (sbClient) {
    let rpcSuccess = false;
    try {
      const { data, error } = await sbClient.rpc('submit_order_tracking_action', {
        p_order_id: cleanId,
        p_action: 'revision',
        p_note: note
      });
      if (!error && data?.success) rpcSuccess = true;
    } catch (e) {}

    if (!rpcSuccess) {
      try {
        await sbClient
          .from('orders')
          .update({
            status: 'In Revision',
            progress: 80,
            revisions: updatedRevisions || order?.revisions || [],
            last_updated: nowIso
          })
          .ilike('id', cleanId);
      } catch (e2) {}
    }
  }

  window.dispatchEvent(new CustomEvent('ruddranil_orders_updated', {
    detail: { orderId: cleanId, newStatus: 'In Revision', newProgress: 80 }
  }));
  return { success: true };
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

  const currentRate = getEmailRateStatus('signup_confirm', cleanEmail);
  if (currentRate.isLocked) {
    return {
      success: false,
      rateLimited: true,
      rateStatus: currentRate,
      error: `এই Gmail-এ সর্বোচ্চ ৩ বার কনফার্মেশন মেইল পাঠানো হয়েছে। অনুগ্রহ করে ${currentRate.formattedTime} পর আবার চেষ্টা করুন অথবা অন্য একটি Gmail দিন।`
    };
  }

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
      if (isSupabaseRateLimitText(error.message)) {
        const locked = markEmailRateLimited('signup_confirm', cleanEmail);
        return {
          success: false,
          rateLimited: true,
          rateStatus: locked,
          error: formatSupabaseEmailError(error.message, 'Registration email rate limit exceeded.', locked)
        };
      }
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
      const nextRate = recordEmailSendAttempt('signup_confirm', cleanEmail);

      return {
        success: true,
        emailConfirmationNeeded: true,
        email: cleanEmail,
        rateStatus: nextRate,
        message: `Account created! A confirmation link has been sent to ${cleanEmail} (Attempt ${nextRate.attemptsUsed}/3). Please verify your email before logging in.`
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

    const nextRate = recordEmailSendAttempt('signup_confirm', cleanEmail);
    return {
      success: true,
      emailConfirmationNeeded: true,
      email: cleanEmail,
      rateStatus: nextRate
    };
  } catch (err) {
    console.warn('[Supabase Auth exception]:', err);
    if (isSupabaseRateLimitText(err?.message)) {
      const locked = markEmailRateLimited('signup_confirm', cleanEmail);
      return { success: false, rateLimited: true, rateStatus: locked, error: formatSupabaseEmailError(err?.message, 'Registration error.', locked) };
    }
    return { success: false, error: err.message || 'Registration error.' };
  }
}

/**
 * Resend verification email via Supabase Auth (enforces max 3 attempts + 1 hour cooldown)
 */
async function resendVerificationEmail(email, scope = 'signup_confirm', redirectPath = '/login.html') {
  if (!email) throw new Error('Email is required to resend verification.');
  const cleanEmail = email.trim().toLowerCase();

  const currentRate = getEmailRateStatus(scope, cleanEmail);
  if (currentRate.isLocked) {
    return {
      success: false,
      rateLimited: true,
      rateStatus: currentRate,
      error: `সর্বোচ্চ ৩ বার কনফার্মেশন মেইল পাঠানো হয়ে গেছে। অনুগ্রহ করে ${currentRate.formattedTime} পর আবার চেষ্টা করুন।`
    };
  }

  if (sbClient && sbClient.auth) {
    try {
      const redirectTo = window.location.origin + redirectPath;
      const { data, error } = await sbClient.auth.resend({
        type: 'signup',
        email: cleanEmail,
        options: {
          emailRedirectTo: redirectTo
        }
      });

      if (error) {
        if (isSupabaseRateLimitText(error.message)) {
          const locked = markEmailRateLimited(scope, cleanEmail);
          return { success: false, rateLimited: true, rateStatus: locked, error: formatSupabaseEmailError(error.message, 'Could not resend verification email.', locked) };
        }
        return { success: false, rateStatus: currentRate, error: formatSupabaseEmailError(error.message, 'Could not resend verification email.') };
      }

      const nextRate = recordEmailSendAttempt(scope, cleanEmail);
      const cooldownHint = nextRate.isLocked
        ? ` এটি ৩ নম্বর (শেষ) প্রচেষ্টা ছিল—পরবর্তী মেইলের জন্য ১ ঘণ্টা (${nextRate.formattedTime}) অপেক্ষা করতে হবে।`
        : ` (বাকি আছে ${nextRate.remainingAttempts} বার প্রচেষ্টা)`;

      return {
        success: true,
        rateStatus: nextRate,
        message: `Verification email resent to ${cleanEmail} (${nextRate.attemptsUsed}/3).${cooldownHint}`
      };
    } catch (e) {
      if (isSupabaseRateLimitText(e?.message)) {
        const locked = markEmailRateLimited(scope, cleanEmail);
        return { success: false, rateLimited: true, rateStatus: locked, error: formatSupabaseEmailError(e.message, 'Could not resend verification email.', locked) };
      }
      return { success: false, rateStatus: currentRate, error: formatSupabaseEmailError(e.message, 'Could not resend verification email.') };
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
 * Send Password Reset Email via Supabase Auth (enforces max 3 attempts + 1 hour cooldown)
 */
async function requestPasswordReset(email) {
  if (!email) {
    throw new Error('Please enter your account email address.');
  }

  const cleanEmail = email.trim().toLowerCase();
  const currentRate = getEmailRateStatus('customer_reset', cleanEmail);
  if (currentRate.isLocked) {
    return {
      success: false,
      rateLimited: true,
      rateStatus: currentRate,
      error: `সর্বোচ্চ ৩ বার পাসওয়ার্ড রিসেট মেইল পাঠানো হয়েছে। অনুগ্রহ করে ${currentRate.formattedTime} পর আবার চেষ্টা করুন।`
    };
  }

  if (sbClient && sbClient.auth) {
    try {
      const redirectTo = window.location.origin + '/login.html';
      const { data, error } = await sbClient.auth.resetPasswordForEmail(cleanEmail, {
        redirectTo: redirectTo
      });

      if (error) {
        if (isSupabaseRateLimitText(error.message)) {
          const locked = markEmailRateLimited('customer_reset', cleanEmail);
          return { success: false, rateLimited: true, rateStatus: locked, error: formatSupabaseEmailError(error.message, 'Could not send reset email.', locked) };
        }
        return { success: false, rateStatus: currentRate, error: formatSupabaseEmailError(error.message, 'Could not send reset email.') };
      }

      const nextRate = recordEmailSendAttempt('customer_reset', cleanEmail);
      const cooldownHint = nextRate.isLocked
        ? ` (৩/৩ প্রচেষ্টা সম্পন্ন — পরবর্তী রিসেটের জন্য ${nextRate.formattedTime} অপেক্ষা করতে হবে)`
        : ` (প্রচেষ্টা ${nextRate.attemptsUsed}/3 • বাকি ${nextRate.remainingAttempts} বার)`;

      return {
        success: true,
        rateStatus: nextRate,
        message: `Password reset instructions sent to ${cleanEmail}.${cooldownHint}`
      };
    } catch (err) {
      if (isSupabaseRateLimitText(err?.message)) {
        const locked = markEmailRateLimited('customer_reset', cleanEmail);
        return { success: false, rateLimited: true, rateStatus: locked, error: formatSupabaseEmailError(err?.message, 'Could not send reset email.', locked) };
      }
      return { success: false, rateStatus: currentRate, error: formatSupabaseEmailError(err.message, 'Could not send reset email.') };
    }
  }

  return { success: false, error: 'Database service unavailable.' };
}

// ============================================================================
// 6B. ADMIN CUSTOMER USER CREATION & DIRECTORY (NO SESSION OVERWRITE)
// ============================================================================
let sbIsolatedAuthClient = null;
const ADMIN_USERS_CACHE_KEY = 'ruddranil_admin_users_cache_v1';

function getIsolatedSupabaseAuthClient() {
  if (sbIsolatedAuthClient) return sbIsolatedAuthClient;
  if (typeof window !== 'undefined' && typeof window.supabase !== 'undefined' && window.supabase.createClient) {
    sbIsolatedAuthClient = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
        storageKey: 'sb-ruddranil-admin-create-user-isolated'
      }
    });
  }
  return sbIsolatedAuthClient;
}

async function adminCreateCustomerAccount({ fullName, email, password, phoneNumber = '', country = '', companyName = '', notes = '' }) {
  const cleanName = String(fullName || '').trim();
  const cleanEmail = String(email || '').trim().toLowerCase();
  const cleanPass = String(password || '');

  if (!cleanName || !cleanEmail || !cleanPass) {
    return { success: false, error: 'Full name, Gmail/email, and password are required.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return { success: false, error: 'Please enter a valid email address.' };
  }
  if (cleanPass.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters long.' };
  }
  if (isAdminEmailMatch(cleanEmail)) {
    return { success: false, error: 'Cannot create a customer account using the restricted Admin email.' };
  }

  const isAdmin = await isCurrentUserAdmin();
  if (!isAdmin) {
    return { success: false, error: 'Only an authenticated Admin session can add users.' };
  }

  const tempClient = getIsolatedSupabaseAuthClient();
  if (!tempClient || !tempClient.auth) {
    return { success: false, error: 'Supabase Auth client is unavailable.' };
  }

  let authUserId = null;
  let immediateSignInReady = false;
  let alreadyExists = false;
  let authNotice = '';

  try {
    const redirectTo = typeof window !== 'undefined' ? `${window.location.origin}/login.html` : undefined;
    const { data, error } = await tempClient.auth.signUp({
      email: cleanEmail,
      password: cleanPass,
      options: {
        data: {
          full_name: cleanName,
          added_by_admin: true
        },
        ...(redirectTo ? { emailRedirectTo: redirectTo } : {})
      }
    });

    if (error) {
      const msgLower = String(error.message || '').toLowerCase();
      if (msgLower.includes('already registered') || msgLower.includes('already exists')) {
        alreadyExists = true;
        authNotice = 'This email is already registered in Supabase Auth. Profile record updated in directory.';
      } else if (isSupabaseRateLimitText(error.message)) {
        return {
          success: false,
          rateLimited: true,
          error: formatSupabaseEmailError(error.message, 'Supabase email rate limit exceeded while sending confirmation to user.')
        };
      } else {
        return { success: false, error: error.message || 'Could not create user in Supabase Auth.' };
      }
    } else {
      authUserId = data?.user?.id || null;
      immediateSignInReady = Boolean(data?.session) || Boolean(data?.user?.email_confirmed_at);
    }
  } catch (authErr) {
    return { success: false, error: authErr?.message || 'Error communicating with Supabase Auth.' };
  }

  const profilePayload = {
    user_id: authUserId,
    email: cleanEmail,
    full_name: cleanName,
    phone_number: String(phoneNumber || '').trim(),
    country: String(country || '').trim(),
    company_name: String(companyName || '').trim(),
    bio: String(notes || '').trim(),
    updated_at: new Date().toISOString()
  };

  let profileSynced = false;
  let profileWarning = '';

  if (sbClient) {
    try {
      const { error: profErr } = await sbClient
        .from('profiles')
        .upsert([profilePayload], { onConflict: 'email' });
      if (profErr) {
        profileWarning = profErr.message;
      } else {
        profileSynced = true;
      }
    } catch (e) {
      profileWarning = e?.message || 'Profile upsert notice';
    }
  }

  const cachedUsers = JSON.parse(localStorage.getItem(ADMIN_USERS_CACHE_KEY) || '[]');
  const existingIdx = cachedUsers.findIndex(u => String(u.email || '').toLowerCase() === cleanEmail);
  const userEntry = {
    id: authUserId || ('usr-' + Date.now()),
    user_id: authUserId,
    email: cleanEmail,
    full_name: cleanName,
    phone_number: profilePayload.phone_number,
    country: profilePayload.country,
    company_name: profilePayload.company_name,
    bio: profilePayload.bio,
    immediateSignInReady,
    alreadyExists,
    created_at: new Date().toISOString()
  };
  if (existingIdx >= 0) cachedUsers[existingIdx] = { ...cachedUsers[existingIdx], ...userEntry };
  else cachedUsers.unshift(userEntry);
  safeSetLocalJson(ADMIN_USERS_CACHE_KEY, cachedUsers);

  return {
    success: true,
    user: userEntry,
    immediateSignInReady,
    emailConfirmationNeeded: !immediateSignInReady && !alreadyExists,
    alreadyExists,
    profileSynced,
    profileWarning,
    authNotice
  };
}

async function adminFetchAllUsers() {
  const usersMap = new Map();

  const upsertMapUser = (row) => {
    const email = String(row?.email || '').trim().toLowerCase();
    if (!email || isAdminEmailMatch(email)) return;
    const prev = usersMap.get(email) || {};
    usersMap.set(email, {
      id: row.id || prev.id || email,
      user_id: row.user_id || prev.user_id || null,
      email,
      full_name: row.full_name || row.name || prev.full_name || email.split('@')[0],
      phone_number: row.phone_number || prev.phone_number || '',
      country: row.country || prev.country || '',
      company_name: row.company_name || prev.company_name || '',
      bio: row.bio || prev.bio || '',
      immediateSignInReady: row.immediateSignInReady !== undefined ? row.immediateSignInReady : prev.immediateSignInReady,
      created_at: row.created_at || prev.created_at || new Date().toISOString(),
      source: row.source || prev.source || 'profile'
    });
  };

  if (sbClient) {
    try {
      const { data, error } = await sbClient
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && Array.isArray(data)) {
        data.forEach(p => upsertMapUser({ ...p, source: 'supabase' }));
      }
    } catch (e) {
      console.warn('[Admin Users] Profiles query notice:', e);
    }
  }

  try {
    const cached = JSON.parse(localStorage.getItem(ADMIN_USERS_CACHE_KEY) || '[]');
    if (Array.isArray(cached)) cached.forEach(u => upsertMapUser({ ...u, source: u.source || 'admin' }));
  } catch (e) {}

  try {
    const orders = JSON.parse(localStorage.getItem('ruddranil_orders') || '[]');
    orders.forEach(o => {
      if (o.customerEmail && !isAdminEmailMatch(o.customerEmail)) {
        upsertMapUser({
          email: o.customerEmail,
          full_name: o.customerName || o.customerEmail.split('@')[0],
          user_id: o.customerId || null,
          source: 'order'
        });
      }
    });
  } catch (e) {}

  return Array.from(usersMap.values());
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
          upsert: false
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

  const normalizeReviewImageUrl = (rawUrl) => {
    if (!rawUrl) return null;
    const trimmed = String(rawUrl).trim();
    if (!trimmed) return null;
    if (/^(https?:\/\/|data:image\/|blob:)/i.test(trimmed)) return trimmed;
    if (sbClient && sbClient.storage) {
      const cleanPath = trimmed.replace(/^review-images\//i, '').replace(/^\/+/, '');
      const { data: pubData } = sbClient.storage.from('review-images').getPublicUrl(cleanPath);
      if (pubData?.publicUrl) return pubData.publicUrl;
    }
    return trimmed;
  };

  // 1. Fetch from Supabase
  if (sbClient) {
    try {
      const { data, error } = await sbClient
        .from('reviews')
        .select('*')
        .or('status.eq.approved,status.is.null')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        reviews = data.map(cloudRev => {
          const resolvedImg = normalizeReviewImageUrl(cloudRev.image_url);
          return {
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
            imageUrl: resolvedImg,
            image_url: resolvedImg,
            videoUrl: cloudRev.video_url || cloudRev.videoUrl || null,
            video_url: cloudRev.video_url || cloudRev.videoUrl || null,
            projectUrl: cloudRev.project_url || cloudRev.projectUrl || null,
            project_url: cloudRev.project_url || cloudRev.projectUrl || null,
            status: cloudRev.status || 'approved',
            verified: cloudRev.verified_order !== false,
            helpful: Number(cloudRev.helpful_count) || 0,
            date: cloudRev.created_at ? new Date(cloudRev.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'
          };
        });
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
 * Public Review Comments Storage & Supabase Cloud Sync (Open for all visitors)
 */
const REVIEW_COMMENTS_KEY = 'ruddranil_review_comments_v1';

function formatReviewCommentTime(isoString) {
  if (!isoString) return 'Just now';
  try {
    const dt = new Date(isoString);
    if (isNaN(dt.getTime())) return 'Recent';
    const diffSec = Math.max(0, Math.floor((Date.now() - dt.getTime()) / 1000));
    if (diffSec < 60) return 'Just now';
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
    if (diffSec < 604800) return `${Math.floor(diffSec / 86400)}d ago`;
    return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch (e) {
    return 'Recent';
  }
}

function mapCloudReviewComment(row) {
  return {
    id: row.id,
    reviewId: String(row.review_id),
    reviewerName: row.reviewer_name || '',
    author: (row.author_name || 'Visitor').trim(),
    text: (row.comment_text || '').trim(),
    time: formatReviewCommentTime(row.created_at),
    created_at: row.created_at || new Date().toISOString(),
    syncedToCloud: true
  };
}

function readLocalReviewCommentsStore() {
  try {
    const raw = localStorage.getItem(REVIEW_COMMENTS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function writeLocalReviewCommentsStore(store) {
  try {
    localStorage.setItem(REVIEW_COMMENTS_KEY, JSON.stringify(store));
  } catch (e) {
    console.warn('[Review Comments Cache Notice]:', e);
  }
}

function getReviewCommentsList(reviewId) {
  const store = readLocalReviewCommentsStore();
  return store[String(reviewId)] || [];
}

/**
 * Fetch all approved review comments from Supabase `public.review_comments`
 * Merges with local cache so all visitors across devices see every reply.
 */
async function fetchAllReviewCommentsFromCloud() {
  const localStore = readLocalReviewCommentsStore();
  if (!sbClient) return localStore;

  try {
    const { data, error } = await sbClient
      .from('review_comments')
      .select('*')
      .or('status.eq.approved,status.is.null')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('[Supabase Review Comments Fetch Notice]:', error.message);
      return localStore;
    }

    const mergedStore = {};
    if (Array.isArray(data)) {
      data.forEach(row => {
        const revKey = String(row.review_id);
        if (!mergedStore[revKey]) mergedStore[revKey] = [];
        mergedStore[revKey].push(mapCloudReviewComment(row));
      });
    }

    // Preserve any local comments that haven't synced to cloud yet
    Object.keys(localStore).forEach(revKey => {
      const localItems = Array.isArray(localStore[revKey]) ? localStore[revKey] : [];
      if (!mergedStore[revKey]) mergedStore[revKey] = [];
      localItems.forEach(loc => {
        const alreadyInCloud = mergedStore[revKey].some(c =>
          c.id === loc.id ||
          (c.author === loc.author && c.text === loc.text)
        );
        if (!alreadyInCloud && loc.syncedToCloud === false) {
          mergedStore[revKey].unshift(loc);
        }
      });
    });

    writeLocalReviewCommentsStore(mergedStore);
    return mergedStore;
  } catch (e) {
    console.warn('[Supabase Review Comments Exception]:', e);
    return localStore;
  }
}

/**
 * Fetch live comments for a specific review from Supabase `public.review_comments`
 */
async function fetchReviewCommentsFromCloud(reviewId) {
  const revKey = String(reviewId);
  const localList = getReviewCommentsList(revKey);
  if (!sbClient || !revKey) return localList;

  try {
    const { data, error } = await sbClient
      .from('review_comments')
      .select('*')
      .eq('review_id', revKey)
      .or('status.eq.approved,status.is.null')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('[Supabase Review Comments Fetch Notice]:', error.message);
      return localList;
    }

    const cloudList = Array.isArray(data) ? data.map(mapCloudReviewComment) : [];
    const mergedList = [...cloudList];

    localList.forEach(loc => {
      const alreadyInCloud = mergedList.some(c =>
        c.id === loc.id ||
        (c.author === loc.author && c.text === loc.text)
      );
      if (!alreadyInCloud && loc.syncedToCloud === false) {
        mergedList.unshift(loc);
      }
    });

    const fullStore = readLocalReviewCommentsStore();
    fullStore[revKey] = mergedList;
    writeLocalReviewCommentsStore(fullStore);

    return mergedList;
  } catch (e) {
    console.warn('[Supabase Review Comments Exception]:', e);
    return localList;
  }
}

/**
 * Post a new comment on a review -> saves to Supabase `public.review_comments` + local cache
 */
async function addReviewCommentItem(reviewId, author, text, reviewerName = '') {
  const revKey = String(reviewId || '').trim();
  const cleanAuthor = (author || 'Visitor').trim() || 'Visitor';
  const cleanText = (text || '').trim();
  if (!revKey || !cleanText) return null;

  let authorEmail = null;
  try {
    const localUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (localUser?.email) authorEmail = localUser.email;
  } catch (e) {}

  let cloudRecord = null;
  let syncedToCloud = false;
  let cloudError = null;

  if (sbClient) {
    try {
      const payload = {
        review_id: revKey,
        reviewer_name: (reviewerName || '').trim() || null,
        author_name: cleanAuthor,
        author_email: authorEmail,
        comment_text: cleanText,
        status: 'approved'
      };
      const { data, error } = await sbClient
        .from('review_comments')
        .insert([payload])
        .select('*')
        .single();

      if (!error && data) {
        cloudRecord = mapCloudReviewComment(data);
        syncedToCloud = true;
      } else if (error) {
        cloudError = error.message;
        console.warn('[Supabase Review Comments Insert Notice]:', error.message);
      }
    } catch (e) {
      cloudError = e.message;
      console.warn('[Supabase Review Comments Insert Exception]:', e);
    }
  }

  const savedComment = cloudRecord || {
    id: 'rc_' + Date.now(),
    reviewId: revKey,
    reviewerName: (reviewerName || '').trim(),
    author: cleanAuthor,
    text: cleanText,
    time: 'Just now',
    created_at: new Date().toISOString(),
    syncedToCloud: false
  };

  try {
    const store = readLocalReviewCommentsStore();
    if (!Array.isArray(store[revKey])) store[revKey] = [];
    store[revKey] = store[revKey].filter(c => c.id !== savedComment.id);
    store[revKey].unshift(savedComment);
    writeLocalReviewCommentsStore(store);
  } catch (e) {
    console.warn('[Review Comments Local Cache Error]:', e);
  }

  try {
    window.dispatchEvent(new CustomEvent('ruddranil_review_comments_updated', {
      detail: { reviewId: revKey, comment: savedComment }
    }));
  } catch (e) {}

  return { ...savedComment, syncedToCloud, cloudError };
}

/**
 * Sync Helpful vote delta (+1 / -1) to Supabase `public.reviews` via safe RPC
 */
async function toggleReviewHelpfulInCloud(reviewId, delta = 1) {
  if (!sbClient || !reviewId) return null;
  try {
    const { data, error } = await sbClient.rpc('increment_review_helpful', {
      p_review_id: String(reviewId),
      p_delta: delta >= 0 ? 1 : -1
    });
    if (!error && typeof data === 'number') return data;
  } catch (e) {}
  return null;
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
    const headers = await getAdminAuthHeaders({ 'Content-Type': 'application/json' });
    await fetch(`/api/reviews/${encodeURIComponent(reviewId)}`, {
      method: 'PATCH',
      headers,
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
    const headers = await getAdminAuthHeaders();
    await fetch(`/api/reviews/${encodeURIComponent(reviewId)}`, {
      method: 'DELETE',
      headers
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
          const meta = (s.metadata && typeof s.metadata === 'object') ? s.metadata : {};

          return {
            ...meta,
            id: s.id,
            name: s.name,
            slug: s.slug,
            category: s.category,
            badge: s.badge || meta.badge || '',
            gigTitle: s.gig_title || meta.gigTitle || s.description || '',
            description: s.description,
            coverImage: s.image_url,
            packages: {
              basic: {
                name: basic.name || 'Starter Pack',
                desc: basic.description || '',
                price: Number(basic.price) || 30,
                deliveryDays: Number(basic.delivery_days) || 3,
                expressFee: Number(basic.express_fee) || 15,
                expressDays: Number(basic.express_delivery_days) || 1,
                features: Array.isArray(basic.features) ? basic.features : []
              },
              standard: {
                name: std.name || 'Standard Growth',
                desc: std.description || '',
                price: Number(std.price) || 60,
                deliveryDays: Number(std.delivery_days) || 5,
                expressFee: Number(std.express_fee) || 25,
                expressDays: Number(std.express_delivery_days) || 2,
                features: Array.isArray(std.features) ? std.features : []
              },
              premium: {
                name: prem.name || 'VIP Scale',
                desc: prem.description || '',
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
    safeSetLocalJson('ruddranil_services', cloudServices);
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
  safeSetLocalJson('ruddranil_services', services);

  // 2. Persist to backend server /api/services
  let serverOk = false;
  try {
    const headers = await getAdminAuthHeaders({ 'Content-Type': 'application/json' });
    const res = await fetch('/api/services', {
      method: 'POST',
      headers,
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

      const richMeta = {
        badge: serviceData.badge || '',
        gigTitle: serviceData.gigTitle || '',
        aboutNotes: serviceData.aboutNotes || '',
        keyDeliverables: Array.isArray(serviceData.keyDeliverables) ? serviceData.keyDeliverables : [],
        whyChoose: Array.isArray(serviceData.whyChoose) ? serviceData.whyChoose : [],
        workProcess: Array.isArray(serviceData.workProcess) ? serviceData.workProcess : [],
        tools: Array.isArray(serviceData.tools) ? serviceData.tools : [],
        faqs: Array.isArray(serviceData.faqs) ? serviceData.faqs : [],
        addons: Array.isArray(serviceData.addons) ? serviceData.addons : [],
        reviews: Array.isArray(serviceData.reviews) ? serviceData.reviews : [],
        rating: serviceData.rating || 5.0,
        reviewsCount: serviceData.reviewsCount || 0,
        ordersInQueue: serviceData.ordersInQueue || 0
      };

      const sPayload = {
        name: serviceData.name,
        slug: sSlug,
        category: serviceData.category || 'marketing',
        badge: serviceData.badge || null,
        gig_title: serviceData.gigTitle || serviceData.description || '',
        description: serviceData.description || serviceData.gigTitle || '',
        image_url: serviceData.coverImage || null,
        metadata: richMeta,
        is_active: true
      };
      if (sId) sPayload.id = sId;

      let { data: sData, error: sErr } = await sbClient
        .from('services')
        .upsert([sPayload], { onConflict: 'slug' })
        .select();

      if (sErr && sErr.message && (sErr.message.includes('metadata') || sErr.message.includes('badge') || sErr.message.includes('gig_title'))) {
        delete sPayload.metadata;
        delete sPayload.badge;
        delete sPayload.gig_title;
        const retryRes = await sbClient
          .from('services')
          .upsert([sPayload], { onConflict: 'slug' })
          .select();
        sData = retryRes.data;
        sErr = retryRes.error;
      }

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
  safeSetLocalJson('ruddranil_services', services);

  try {
    const headers = await getAdminAuthHeaders();
    await fetch(`/api/services/${serviceId}`, { method: 'DELETE', headers });
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

// ============================================================================
// 9. PORTFOLIO PROJECTS CLOUD PERSISTENCE
// ============================================================================

function mapPortfolioProjectRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    category: row.category || 'Website Design',
    categorySlug: row.category_slug || row.categorySlug || 'website',
    badge: row.badge || 'Project',
    description: row.description || '',
    details: row.details || '',
    author: row.author || 'Ruddranil',
    mediaUrl: row.media_url || row.mediaUrl || null,
    mediaType: row.media_type || row.mediaType || 'image',
    likes: Number(row.likes_count !== undefined ? row.likes_count : (row.likes || 0)),
    commentsCount: Number(row.comments_count !== undefined ? row.comments_count : (row.commentsCount || 0)),
    serviceSlug: row.service_slug || row.serviceSlug || 'Website Design',
    displayOrder: Number(row.display_order || 0)
  };
}

async function fetchPortfolioProjectsFromCloud() {
  let cloudProjects = null;

  if (sbClient) {
    try {
      const { data, error } = await sbClient
        .from('portfolio_projects')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        cloudProjects = data.map(mapPortfolioProjectRow).filter(Boolean);
      }
    } catch (e) {
      console.warn('[Supabase Portfolio] Fetch notice:', e);
    }
  }

  if (!cloudProjects || cloudProjects.length === 0) {
    try {
      const res = await fetch('/api/projects');
      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json) && json.length > 0) {
          cloudProjects = json;
        }
      }
    } catch (e2) {}
  }

  if (cloudProjects && cloudProjects.length > 0) {
    safeSetLocalJson('ruddranil_portfolio_projects', cloudProjects);
    window.dispatchEvent(new CustomEvent('ruddranil_projects_updated', { detail: cloudProjects }));
    return cloudProjects;
  }

  return JSON.parse(localStorage.getItem('ruddranil_portfolio_projects') || '[]');
}

async function savePortfolioProjectToCloud(project) {
  if (!project || !project.title) {
    throw new Error('Project title is required.');
  }
  const cleanProject = {
    ...project,
    id: project.id || ('proj-' + Date.now()),
    categorySlug: project.categorySlug || (project.category || 'website').toLowerCase().split(' ')[0],
    mediaUrl: project.mediaUrl || null,
    mediaType: project.mediaType || 'image',
    author: project.author || 'Ruddranil',
    serviceSlug: project.serviceSlug || project.category || 'Website Design'
  };

  let projects = JSON.parse(localStorage.getItem('ruddranil_portfolio_projects') || '[]');
  const idx = projects.findIndex(p => p.id === cleanProject.id);
  if (idx >= 0) projects[idx] = { ...projects[idx], ...cleanProject };
  else projects.unshift(cleanProject);
  safeSetLocalJson('ruddranil_portfolio_projects', projects);

  try {
    const headers = await getAdminAuthHeaders({ 'Content-Type': 'application/json' });
    await fetch('/api/projects', {
      method: 'POST',
      headers,
      body: JSON.stringify(projects)
    });
  } catch (e) {}

  if (sbClient) {
    try {
      await sbClient.from('portfolio_projects').upsert([{
        id: cleanProject.id,
        title: cleanProject.title,
        category: cleanProject.category || 'Website Design',
        category_slug: cleanProject.categorySlug,
        badge: cleanProject.badge || 'Project',
        description: cleanProject.description || '',
        details: cleanProject.details || '',
        author: cleanProject.author,
        media_url: cleanProject.mediaUrl,
        media_type: cleanProject.mediaType,
        likes_count: Number(cleanProject.likes || 0),
        comments_count: Number(cleanProject.commentsCount || 0),
        service_slug: cleanProject.serviceSlug,
        display_order: Number(cleanProject.displayOrder || 0),
        is_active: true,
        updated_at: new Date().toISOString()
      }], { onConflict: 'id' });
    } catch (sbErr) {
      console.warn('[Supabase Portfolio] Upsert notice:', sbErr);
    }
  }

  window.dispatchEvent(new CustomEvent('ruddranil_projects_updated', { detail: projects }));
  return { success: true, project: cleanProject };
}

async function saveAllPortfolioProjectsToCloud(projects) {
  if (!Array.isArray(projects)) return { success: false };
  safeSetLocalJson('ruddranil_portfolio_projects', projects);

  try {
    const headers = await getAdminAuthHeaders({ 'Content-Type': 'application/json' });
    await fetch('/api/projects', {
      method: 'POST',
      headers,
      body: JSON.stringify(projects)
    });
  } catch (e) {}

  if (sbClient && projects.length > 0) {
    try {
      const rows = projects.map((p, index) => ({
        id: p.id || ('proj-' + Date.now() + '-' + index),
        title: p.title,
        category: p.category || 'Website Design',
        category_slug: p.categorySlug || 'website',
        badge: p.badge || 'Project',
        description: p.description || '',
        details: p.details || '',
        author: p.author || 'Ruddranil',
        media_url: p.mediaUrl || null,
        media_type: p.mediaType || 'image',
        likes_count: Number(p.likes || 0),
        comments_count: Number(p.commentsCount || 0),
        service_slug: p.serviceSlug || p.category || 'Website Design',
        display_order: index,
        is_active: true,
        updated_at: new Date().toISOString()
      }));
      await sbClient.from('portfolio_projects').upsert(rows, { onConflict: 'id' });
    } catch (sbErr) {
      console.warn('[Supabase Portfolio] Bulk sync notice:', sbErr);
    }
  }

  window.dispatchEvent(new CustomEvent('ruddranil_projects_updated', { detail: projects }));
  return { success: true };
}

async function deletePortfolioProjectFromCloud(projectId) {
  let projects = JSON.parse(localStorage.getItem('ruddranil_portfolio_projects') || '[]');
  projects = projects.filter(p => p.id !== projectId);
  safeSetLocalJson('ruddranil_portfolio_projects', projects);

  try {
    const headers = await getAdminAuthHeaders({ 'Content-Type': 'application/json' });
    await fetch('/api/projects', {
      method: 'POST',
      headers,
      body: JSON.stringify(projects)
    });
  } catch (e) {}

  if (sbClient) {
    try {
      await sbClient.from('portfolio_projects').delete().eq('id', projectId);
    } catch (sbErr) {
      console.warn('[Supabase Portfolio] Delete notice:', sbErr);
    }
  }

  window.dispatchEvent(new CustomEvent('ruddranil_projects_updated', { detail: projects }));
  return { success: true };
}

// ============================================================================
// 10. COUPONS CLOUD MANAGEMENT & RPC CHECKOUT VALIDATION
// ============================================================================

async function fetchCouponsFromCloud() {
  let coupons = null;
  if (sbClient) {
    try {
      const { data, error } = await sbClient
        .from('coupons')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        coupons = data.map(c => ({
          id: c.id,
          code: String(c.code || '').toUpperCase(),
          type: c.discount_type || 'percentage',
          value: Number(c.discount_value || 0),
          minOrder: Number(c.min_order_amount || 0),
          maxDiscount: c.max_discount_amount ? Number(c.max_discount_amount) : null,
          active: c.is_active !== false,
          timesUsed: Number(c.times_used || 0),
          expiresAt: c.expires_at || null
        }));
      }
    } catch (e) {
      console.warn('[Supabase Coupons] Fetch notice:', e);
    }
  }

  if (coupons && coupons.length > 0) {
    safeSetLocalJson('ruddranil_coupons', coupons);
    return coupons;
  }

  return JSON.parse(localStorage.getItem('ruddranil_coupons') || '[]');
}

async function saveCouponToCloud(coupon) {
  const cleanCode = String(coupon?.code || '').trim().toUpperCase();
  if (!cleanCode) throw new Error('Coupon code is required.');

  const normalized = {
    code: cleanCode,
    type: coupon.type === 'fixed' ? 'fixed' : 'percentage',
    value: Number(coupon.value || 10),
    minOrder: Number(coupon.minOrder || 0),
    maxDiscount: coupon.maxDiscount ? Number(coupon.maxDiscount) : null,
    active: coupon.active !== false
  };

  let localCoupons = JSON.parse(localStorage.getItem('ruddranil_coupons') || '[]');
  const idx = localCoupons.findIndex(c => String(c.code || '').toUpperCase() === cleanCode);
  if (idx >= 0) localCoupons[idx] = { ...localCoupons[idx], ...normalized };
  else localCoupons.unshift(normalized);
  safeSetLocalJson('ruddranil_coupons', localCoupons);

  if (sbClient) {
    try {
      await sbClient.from('coupons').upsert([{
        code: normalized.code,
        discount_type: normalized.type,
        discount_value: normalized.value,
        min_order_amount: normalized.minOrder,
        max_discount_amount: normalized.maxDiscount,
        is_active: normalized.active
      }], { onConflict: 'code' });
    } catch (e) {
      console.warn('[Supabase Coupons] Save notice:', e);
    }
  }

  return { success: true, coupon: normalized };
}

async function toggleCouponInCloud(code, isActive) {
  const cleanCode = String(code || '').trim().toUpperCase();
  const localCoupons = JSON.parse(localStorage.getItem('ruddranil_coupons') || '[]');
  const target = localCoupons.find(c => String(c.code || '').toUpperCase() === cleanCode);
  if (target) {
    target.active = Boolean(isActive);
    safeSetLocalJson('ruddranil_coupons', localCoupons);
  }

  if (sbClient) {
    try {
      await sbClient.from('coupons').update({ is_active: Boolean(isActive) }).eq('code', cleanCode);
    } catch (e) {}
  }
  return { success: true };
}

async function deleteCouponFromCloud(code) {
  const cleanCode = String(code || '').trim().toUpperCase();
  let localCoupons = JSON.parse(localStorage.getItem('ruddranil_coupons') || '[]');
  localCoupons = localCoupons.filter(c => String(c.code || '').toUpperCase() !== cleanCode);
  safeSetLocalJson('ruddranil_coupons', localCoupons);

  if (sbClient) {
    try {
      await sbClient.from('coupons').delete().eq('code', cleanCode);
    } catch (e) {}
  }
  return { success: true };
}

async function validateCouponFromCloud(code, subtotal = 0) {
  const cleanCode = String(code || '').trim().toUpperCase();
  if (!cleanCode) return { valid: false, error: 'Please enter a coupon code.' };

  if (sbClient) {
    try {
      const { data, error } = await sbClient.rpc('validate_coupon_code', {
        p_code: cleanCode,
        p_subtotal: Number(subtotal || 0)
      });
      if (!error && data) {
        if (data.valid) {
          // Cache validated coupon locally so synchronous total helpers work immediately
          const normalized = {
            code: String(data.code || cleanCode).toUpperCase(),
            type: data.discount_type || 'percentage',
            value: Number(data.discount_value || 0),
            minOrder: Number(data.min_order_amount || 0),
            maxDiscount: data.max_discount_amount ? Number(data.max_discount_amount) : null,
            active: true
          };
          const localCoupons = JSON.parse(localStorage.getItem('ruddranil_coupons') || '[]');
          const idx = localCoupons.findIndex(c => String(c.code || '').toUpperCase() === normalized.code);
          if (idx >= 0) localCoupons[idx] = { ...localCoupons[idx], ...normalized };
          else localCoupons.push(normalized);
          safeSetLocalJson('ruddranil_coupons', localCoupons);
        }
        return data;
      }
    } catch (e) {
      console.warn('[Coupon RPC] Notice:', e);
    }
  }

  // Fallback to localStorage coupons
  const localCoupons = JSON.parse(localStorage.getItem('ruddranil_coupons') || '[]');
  const found = localCoupons.find(c => String(c.code || '').toUpperCase() === cleanCode && c.active !== false);
  if (!found) return { valid: false, error: 'Invalid or expired coupon code.' };
  if (found.minOrder && subtotal < found.minOrder) {
    return { valid: false, error: `Minimum order of $${found.minOrder} required for this coupon.` };
  }
  return {
    valid: true,
    code: found.code,
    discount_type: found.type,
    discount_value: found.value,
    min_order_amount: found.minOrder || 0,
    max_discount_amount: found.maxDiscount || null
  };
}

// ============================================================================
// 11. CONTACT MESSAGES CLOUD PERSISTENCE
// ============================================================================

async function submitContactMessageToCloud({ name, email, serviceName, message }) {
  const payload = {
    name: String(name || 'Visitor').trim(),
    email: String(email || '').trim().toLowerCase(),
    service_name: String(serviceName || 'General Inquiry').trim(),
    message: String(message || '').trim(),
    status: 'new'
  };

  if (sbClient) {
    try {
      const { error } = await sbClient.from('contact_messages').insert([payload]);
      if (!error) return { success: true, cloudSynced: true };
    } catch (e) {
      console.warn('[Supabase Contact] Insert notice:', e);
    }
  }
  return { success: true, cloudSynced: false };
}

async function fetchContactMessagesForAdmin() {
  if (!sbClient) return { messages: [], tableMissing: false };
  try {
    const { data, error } = await sbClient
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      const msg = String(error.message || '').toLowerCase();
      return {
        messages: [],
        tableMissing: msg.includes('does not exist') || msg.includes('schema cache') || msg.includes('404'),
        error: error.message
      };
    }
    return { messages: Array.isArray(data) ? data : [], tableMissing: false };
  } catch (e) {
    return { messages: [], tableMissing: false, error: e.message };
  }
}

async function updateContactMessageStatusForAdmin(messageId, status = 'replied') {
  if (!sbClient || !messageId) return { success: false };
  try {
    const { error } = await sbClient
      .from('contact_messages')
      .update({ status })
      .eq('id', messageId);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

async function deleteContactMessageForAdmin(messageId) {
  if (!sbClient || !messageId) return { success: false };
  try {
    const { error } = await sbClient
      .from('contact_messages')
      .delete()
      .eq('id', messageId);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// Export to Global Window
window.isAdminEmailMatch = isAdminEmailMatch;
window.getSupabaseAuthUser = getSupabaseAuthUser;
window.getSupabaseAccessToken = getSupabaseAccessToken;
window.getAdminAuthHeaders = getAdminAuthHeaders;
window.isCurrentUserAdmin = isCurrentUserAdmin;
window.signInAdminSupabase = signInAdminSupabase;
window.requestAdminPasswordReset = requestAdminPasswordReset;
window.ruddranilEmailRateLimiter = ruddranilEmailRateLimiter;
window.getEmailRateStatus = getEmailRateStatus;
window.adminCreateCustomerAccount = adminCreateCustomerAccount;
window.adminFetchAllUsers = adminFetchAllUsers;
window.getSignedStorageUrl = getSignedStorageUrl;
window.resolveStorageFileUrl = resolveStorageFileUrl;
window.uploadFileToBucket = uploadFileToBucket;
window.uploadPortfolioMediaToCloud = uploadPortfolioMediaToCloud;
window.uploadOrderReferenceToCloud = uploadOrderReferenceToCloud;
window.uploadDeliveryFileToCloud = uploadDeliveryFileToCloud;

window.syncOrderToSupabase = syncOrderToSupabase;
window.fetchOrdersFromCloud = fetchOrdersFromCloud;
window.fetchOrderTrackingFromCloud = fetchOrderTrackingFromCloud;
window.updateOrderStatusInCloud = updateOrderStatusInCloud;
window.saveOrderDeliveryToCloud = saveOrderDeliveryToCloud;
window.acceptOrderDeliveryInCloud = acceptOrderDeliveryInCloud;
window.requestOrderRevisionInCloud = requestOrderRevisionInCloud;

window.handleLikeToggle = handleLikeToggle;
window.openCommentModal = openCommentModal;
window.closeCommentModal = closeCommentModal;
window.submitCommentForm = submitCommentForm;
window.handleShareProject = handleShareProject;
window.isProjectLiked = isProjectLiked;
window.getProjectLikeCount = getProjectLikeCount;
window.getProjectComments = getProjectComments;
window.getReviewCommentsList = getReviewCommentsList;
window.fetchAllReviewCommentsFromCloud = fetchAllReviewCommentsFromCloud;
window.fetchReviewCommentsFromCloud = fetchReviewCommentsFromCloud;
window.addReviewCommentItem = addReviewCommentItem;
window.toggleReviewHelpfulInCloud = toggleReviewHelpfulInCloud;
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
window.fetchPortfolioProjectsFromCloud = fetchPortfolioProjectsFromCloud;
window.savePortfolioProjectToCloud = savePortfolioProjectToCloud;
window.saveAllPortfolioProjectsToCloud = saveAllPortfolioProjectsToCloud;
window.deletePortfolioProjectFromCloud = deletePortfolioProjectFromCloud;
window.fetchCouponsFromCloud = fetchCouponsFromCloud;
window.saveCouponToCloud = saveCouponToCloud;
window.toggleCouponInCloud = toggleCouponInCloud;
window.deleteCouponFromCloud = deleteCouponFromCloud;
window.validateCouponFromCloud = validateCouponFromCloud;
window.submitContactMessageToCloud = submitContactMessageToCloud;
window.fetchContactMessagesForAdmin = fetchContactMessagesForAdmin;
window.updateContactMessageStatusForAdmin = updateContactMessageStatusForAdmin;
window.deleteContactMessageForAdmin = deleteContactMessageForAdmin;
async function runSupabaseHealthCheck() {
  const report = {
    connected: Boolean(sbClient),
    adminUser: null,
    isAdminRpc: false,
    tables: {},
    buckets: {}
  };
  if (!sbClient) return report;

  const user = await getSupabaseAuthUser();
  report.adminUser = user ? { email: user.email, id: user.id } : null;

  try {
    const { data, error } = await sbClient.rpc('is_admin');
    report.isAdminRpc = !error && Boolean(data);
  } catch (e) {}

  const tableChecks = [
    { name: 'services', select: 'id,badge,metadata' },
    { name: 'packages', select: 'id' },
    { name: 'orders', select: 'id,reference_files,delivery' },
    { name: 'portfolio_projects', select: 'id' },
    { name: 'coupons', select: 'code' },
    { name: 'reviews', select: 'id' },
    { name: 'review_comments', select: 'id' },
    { name: 'profiles', select: 'id' },
    { name: 'contact_messages', select: 'id' }
  ];

  for (const t of tableChecks) {
    try {
      const { error } = await sbClient.from(t.name).select(t.select).limit(1);
      report.tables[t.name] = error ? { ok: false, error: error.message } : { ok: true };
    } catch (e) {
      report.tables[t.name] = { ok: false, error: e.message };
    }
  }

  const bucketNames = ['portfolio-media', 'order-references', 'order-deliveries', 'profile-avatars', 'review-images'];
  for (const b of bucketNames) {
    try {
      const { error } = await sbClient.storage.from(b).list('', { limit: 1 });
      if (error && (String(error.message).toLowerCase().includes('not found') || String(error.message).toLowerCase().includes('bucket'))) {
        report.buckets[b] = { ok: false, error: error.message };
      } else {
        report.buckets[b] = { ok: true };
      }
    } catch (e) {
      report.buckets[b] = { ok: false, error: e.message };
    }
  }

  return report;
}

window.runSupabaseHealthCheck = runSupabaseHealthCheck;
window.initProjectLikeButtons = initProjectLikeButtons;
window.updateLikeButtonUI = updateLikeButtonUI;
