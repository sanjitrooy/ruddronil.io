/**
 * Ruddranil.io - Admin Control Center JavaScript (admin.js)
 * Full CRUD for orders, multi-tier service packages, coupons, and review moderation
 */

// Cross-Device Server Persistence Helpers
async function syncServicesToServer(services) {
  try {
    const res = await fetch('/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(services)
    });
    return res.ok;
  } catch (err) {
    console.warn('Backend services sync offline/error:', err);
    return false;
  }
}

async function syncProjectsToServer(projects) {
  try {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projects)
    });
    return res.ok;
  } catch (err) {
    console.warn('Backend projects sync offline/error:', err);
    return false;
  }
}

async function loadAuthoritativeDataFromServer() {
  try {
    // 1. Fetch authoritative Orders from Supabase & Backend Server
    if (typeof window.fetchAllOrdersForAdmin === 'function') {
      const orders = await window.fetchAllOrdersForAdmin();
      if (Array.isArray(orders)) {
        renderAdminDashboard();
      }
    } else {
      const resOrders = await fetch('/api/orders');
      if (resOrders.ok) {
        const serverOrders = await resOrders.json();
        if (Array.isArray(serverOrders) && serverOrders.length > 0) {
          localStorage.setItem('ruddranil_orders', JSON.stringify(serverOrders));
          renderAdminDashboard();
        }
      }
    }

    // 2. Fetch authoritative Services
    if (typeof window.fetchServicesFromCloud === 'function') {
      const cloudServices = await window.fetchServicesFromCloud();
      if (Array.isArray(cloudServices) && cloudServices.length > 0) {
        renderAdminServicesList();
        populateAdminServiceDropdown();
      }
    } else {
      const resServ = await fetch('/api/services');
      if (resServ.ok) {
        const serverServices = await resServ.json();
        if (Array.isArray(serverServices) && serverServices.length > 0) {
          localStorage.setItem('ruddranil_services', JSON.stringify(serverServices));
          renderAdminServicesList();
          populateAdminServiceDropdown();
        }
      }
    }

    // 3. Fetch authoritative Projects
    const resProj = await fetch('/api/projects');
    if (resProj.ok) {
      const serverProjects = await resProj.json();
      if (Array.isArray(serverProjects) && serverProjects.length > 0) {
        localStorage.setItem('ruddranil_portfolio_projects', JSON.stringify(serverProjects));
        renderAdminProjectsList();
      }
    }

    // 4. Fetch authoritative Reviews from Supabase & Backend Server
    if (typeof syncAdminReviewsFromCloud === 'function') {
      await syncAdminReviewsFromCloud();
    }
  } catch (err) {
    console.warn('Cross-device initial fetch fallback:', err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderAdminDashboard();
  loadAuthoritativeDataFromServer();

  // Instant Real-Time Orders Sync: Triggered when any client submits an order or updates status
  window.addEventListener('ruddranil_orders_updated', () => {
    renderAdminDashboard();
  });

  window.addEventListener('storage', (e) => {
    if (e.key === 'ruddranil_orders') {
      renderAdminDashboard();
    }
  });

  // Background Auto-Poll every 4 seconds to catch new incoming orders across all client devices
  setInterval(async () => {
    if (document.hidden) return;
    try {
      if (typeof window.fetchAllOrdersForAdmin === 'function') {
        const prevCount = JSON.parse(localStorage.getItem('ruddranil_orders') || '[]').length;
        const fresh = await window.fetchAllOrdersForAdmin();
        if (fresh && fresh.length !== prevCount) {
          renderAdminDashboard();
        }
      }
    } catch (e) {}
  }, 4000);

  // Add new manual order handler
  const adminOrderForm = document.getElementById('adminNewOrderForm');
  if (adminOrderForm) {
    adminOrderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const customerName = document.getElementById('adminCustName')?.value.trim() || 'Sanjit';
      const customerEmail = document.getElementById('adminCustEmail')?.value.trim() || 'sanjitrooy733@gmail.com';
      const serviceName = document.getElementById('adminServiceType')?.value || 'Website Design';
      const tier = document.getElementById('adminPackageTier')?.value || 'basic';
      const notes = document.getElementById('adminOrderNotes')?.value.trim() || 'Direct client request';

      const services = JSON.parse(localStorage.getItem('ruddranil_services') || '[]');
      const service = services.find(s => s.name === serviceName) || services[0];
      const pkg = service.packages[tier] || service.packages.basic;

      const now = new Date();
      const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
      const hexRand = Math.random().toString(16).substring(2, 10).toUpperCase();
      const orderId = `RUD-${dateStr}-${hexRand}`;

      const newOrder = {
        id: orderId,
        customerName,
        customerEmail,
        service: service.name,
        serviceSlug: service.slug,
        packageTier: tier,
        packageName: pkg.name,
        packagePrice: pkg.price,
        subtotal: pkg.price,
        discountAmount: 0,
        finalTotal: pkg.price,
        deliveryDays: pkg.deliveryDays,
        isExpress: false,
        expressFee: 0,
        selectedAddons: [],
        addonsTotal: 0,
        couponCode: '',
        request: notes,
        referenceFiles: [],
        status: 'Accepted',
        progress: 10,
        price: `$${pkg.price.toFixed(2)}`,
        orderDate: now.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        lastUpdated: 'Just now'
      };

      const orders = JSON.parse(localStorage.getItem('ruddranil_orders') || '[]');
      orders.unshift(newOrder);
      localStorage.setItem('ruddranil_orders', JSON.stringify(orders));

      // Sync to Supabase Cloud
      if (typeof window.syncOrderToSupabase === 'function') {
        window.syncOrderToSupabase(newOrder);
      }

      if (typeof showToast === 'function') {
        showToast(`Order logged successfully: ${orderId}`);
      }
      adminOrderForm.reset();
      renderAdminDashboard();
    });
  }
});

// ============================================================================
// 1. Render Admin Dashboard & Orders Pipeline
// ============================================================================
async function renderAdminDashboard() {
  const orders = JSON.parse(localStorage.getItem('ruddranil_orders') || '[]');
  const coupons = JSON.parse(localStorage.getItem('ruddranil_coupons') || '[]');
  const reviews = JSON.parse(localStorage.getItem('app_reviews') || '[]');

  // Metrics
  const total = orders.length;
  const pending = orders.filter(o => o.status === 'Pending').length;
  const active = orders.filter(o => o.status === 'In Progress' || o.status === 'Review' || o.status === 'Accepted').length;
  const delivered = orders.filter(o => o.status === 'Delivered').length;

  const totalEl = document.getElementById('adminTotalOrders');
  const pendingEl = document.getElementById('adminPendingOrders');
  const activeEl = document.getElementById('adminActiveOrders');
  const deliveredEl = document.getElementById('adminDeliveredOrders');

  if (totalEl) totalEl.textContent = total.toString();
  if (pendingEl) pendingEl.textContent = pending.toString();
  if (activeEl) activeEl.textContent = active.toString();
  if (deliveredEl) deliveredEl.textContent = delivered.toString();

  const tabOrderCount = document.getElementById('tabOrderCount');
  const tabCouponCount = document.getElementById('tabCouponCount');
  const tabReviewsCount = document.getElementById('tabReviewsCount');
  const tabProjectsCount = document.getElementById('tabProjectsCount');
  if (tabOrderCount) tabOrderCount.textContent = total.toString();
  if (tabCouponCount) tabCouponCount.textContent = coupons.length.toString();
  if (tabReviewsCount) tabReviewsCount.textContent = reviews.length.toString();
  if (tabProjectsCount) {
    const projList = JSON.parse(localStorage.getItem('ruddranil_portfolio_projects') || '[]');
    tabProjectsCount.textContent = (projList.length || 3).toString();
  }

  filterAdminOrdersTable();
  renderAdminServicesList();
  populateAdminServiceDropdown();
  renderAdminCouponsTable();
  renderAdminReviews();
  renderAdminProjectsList();
}
window.renderAdminDashboard = renderAdminDashboard;

function filterAdminOrdersTable() {
  const orders = JSON.parse(localStorage.getItem('ruddranil_orders') || '[]');
  const searchQuery = (document.getElementById('adminOrderSearch')?.value || '').toLowerCase().trim();
  const statusFilter = document.getElementById('adminStatusFilter')?.value || 'all';

  const tbody = document.getElementById('adminOrdersTableBody');
  if (!tbody) return;

  const filtered = orders.filter(order => {
    const matchesSearch = !searchQuery || 
      order.id.toLowerCase().includes(searchQuery) ||
      order.customerEmail.toLowerCase().includes(searchQuery) ||
      order.customerName.toLowerCase().includes(searchQuery);

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="padding: 26px; text-align: center; color: var(--text-dark-gray);">No orders found matching criteria.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(order => `
    <tr class="admin-table-row">
      <td style="padding: 12px 14px;">
        <strong style="color: var(--accent-cyan); font-family: monospace; font-size: 13px;">${order.id}</strong>
        <div style="font-size: 11px; color: var(--text-dark-gray); margin-top: 2px;">${order.orderDate}</div>
      </td>
      <td style="padding: 12px 14px;">
        <div class="admin-table-title">${order.customerName}</div>
        <div style="font-size: 11px; color: var(--text-dark-gray);">${order.customerEmail}</div>
      </td>
      <td style="padding: 12px 14px;">
        <div class="admin-table-title">${order.service}</div>
        <span class="brand-badge" style="font-size: 10px; text-transform: uppercase;">${order.packageTier || 'Basic'} Tier</span>
        ${order.packageName ? `<div style="font-size: 11px; color: var(--text-gray); margin-top: 2px;">${order.packageName}</div>` : ''}
      </td>
      <td style="padding: 12px 14px;">
        <div class="admin-table-price" style="font-size: 13px;">${order.price || ('$' + (order.finalTotal || 30))}</div>
        ${order.discountAmount > 0 ? `<div style="font-size: 10px; color: #10b981; font-weight: 600;">Saved -$${Number(order.discountAmount).toFixed(2)} (${order.couponCode})</div>` : ''}
        <div style="font-size: 11px; color: var(--text-dark-gray); margin-top: 2px;">
          ⏱ ${order.deliveryDays || 3} Days ${order.isExpress ? '⚡ Express' : ''}
        </div>
      </td>
      <td style="padding: 12px 14px;">
        <select onchange="updateOrderStatus('${order.id}', this.value)" class="form-select order-status-select" style="padding: 6px 10px; font-size: 12px; width: 100%; min-width: 110px;" aria-label="Order status">
          <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
          <option value="Accepted" ${order.status === 'Accepted' ? 'selected' : ''}>Accepted</option>
          <option value="In Progress" ${order.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
          <option value="Review" ${order.status === 'Review' ? 'selected' : ''}>Review</option>
          <option value="In Revision" ${order.status === 'In Revision' ? 'selected' : ''}>⚠️ In Revision</option>
          <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
          <option value="Completed" ${order.status === 'Completed' ? 'selected' : ''}>✓ Completed</option>
          <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
        </select>
        ${order.status === 'Pending' ? `
          <button type="button" onclick="acceptOrder('${order.id}')" class="btn btn-sm" style="margin-top: 6px; width: 100%; background: #10b981; color: #fff; font-size: 11px; padding: 4px 6px; font-weight: 700; border: none; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px;" title="Accept client request now">
            ✓ Accept Request
          </button>
        ` : (order.status === 'In Revision' ? `
          <div style="display: flex; flex-direction: column; gap: 4px; margin-top: 6px;">
            <button type="button" onclick="viewClientRevision('${order.id}')" class="btn btn-sm" style="background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.4); font-size: 10.5px; padding: 3px 6px; font-weight: 700; border-radius: 6px; cursor: pointer;">
              ⚠️ View Feedback
            </button>
            <button type="button" onclick="openDeliverWorkModal('${order.id}')" class="btn btn-sm" style="background: #10b981; color: #fff; font-size: 10.5px; padding: 4px 6px; font-weight: 700; border: none; border-radius: 6px; cursor: pointer;">
              🔄 Deliver Revision
            </button>
          </div>
        ` : (order.status === 'Delivered' ? `
          <button type="button" onclick="openDeliverWorkModal('${order.id}')" class="btn btn-sm" style="margin-top: 6px; width: 100%; background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.35); font-size: 11px; padding: 4px 6px; font-weight: 700; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px;" title="Delivered files & links">
            📦 Delivered (v${order.delivery ? (order.delivery.version || 1) : 1})
          </button>
        ` : (order.status === 'Completed' ? `
          <div style="margin-top: 6px; font-size: 11px; font-weight: 700; color: #34d399; text-align: center; background: rgba(16, 185, 129, 0.1); border-radius: 4px; padding: 3px;">
            ✓ Accepted by Client
          </div>
        ` : `
          <button type="button" onclick="openDeliverWorkModal('${order.id}')" class="btn btn-sm" style="margin-top: 6px; width: 100%; background: linear-gradient(135deg, #10b981, #059669); color: #fff; font-size: 11px; padding: 4px 6px; font-weight: 800; border: none; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px; box-shadow: 0 2px 6px rgba(16, 185, 129, 0.3);" title="Deliver work to client">
            🚀 Deliver Work
          </button>
        `)))}
      </td>
      <td style="padding: 12px 14px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <input 
            type="number" 
            value="${order.progress || 0}" 
            min="0" 
            max="100" 
            step="5" 
            class="order-progress-input"
            style="width: 58px; padding: 5px; font-size: 12px;"
            onchange="updateOrderProgress('${order.id}', this.value)"
            aria-label="Order progress percentage"
          >
          <span style="font-size: 12px; font-weight: 700; color: var(--text-dark-gray);">%</span>
        </div>
        <div class="order-progress-track" style="width: 70px; height: 5px; border-radius: 4px; overflow: hidden; margin-top: 5px;">
          <div class="order-progress-fill" style="width: ${order.progress || 0}%; height: 100%;"></div>
        </div>
      </td>
      <td style="padding: 12px 14px;">
        <div style="display: flex; gap: 6px;">
          <a href="work-tracking.html?id=${order.id}" class="btn btn-secondary btn-sm" title="View Tracker" style="padding: 5px 8px; font-size: 11px;">🔍</a>
          <button onclick="openDeliverWorkModal('${order.id}')" class="btn btn-sm" title="Deliver Work" style="padding: 5px 8px; font-size: 11px; background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.4); cursor: pointer;">📦</button>
          <button onclick="viewOrderInstructions('${order.id}')" class="btn btn-outline btn-sm" title="View Requirements" style="padding: 5px 8px; font-size: 11px;">📝</button>
          <button onclick="deleteOrder('${order.id}')" class="btn btn-danger btn-sm" title="Delete Order" style="padding: 5px 8px; font-size: 11px;">✕</button>
        </div>
      </td>
    </tr>
  `).join('');
}
window.filterAdminOrdersTable = filterAdminOrdersTable;

window.acceptOrder = async function(orderId) {
  await updateOrderStatus(orderId, 'Accepted');
  showToast(`✨ Order #${orderId} accepted! Status set to Accepted (15%)`);
};

window.updateOrderStatus = async function(orderId, newStatus) {
  const orders = JSON.parse(localStorage.getItem('ruddranil_orders') || '[]');
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  order.status = newStatus;
  if (newStatus === 'Pending') order.progress = 0;
  else if (newStatus === 'Accepted') order.progress = Math.max(15, order.progress || 15);
  else if (newStatus === 'In Progress') order.progress = Math.max(40, order.progress || 50);
  else if (newStatus === 'Review') order.progress = Math.max(85, order.progress || 85);
  else if (newStatus === 'In Revision') order.progress = 80;
  else if (newStatus === 'Delivered' || newStatus === 'Completed') order.progress = 100;
  else if (newStatus === 'Cancelled') order.progress = 0;
  else if (newStatus === 'Delivered') order.progress = 100;
  else if (newStatus === 'Cancelled') order.progress = 0;
  order.lastUpdated = 'Just now';

  localStorage.setItem('ruddranil_orders', JSON.stringify(orders));
  
  // Sync Status Change to Supabase Cloud & Server
  if (typeof window.updateOrderStatusInCloud === 'function') {
    await window.updateOrderStatusInCloud(orderId, newStatus, order.progress);
  }

  showToast(`Order ${orderId} updated to ${newStatus}`);
  renderAdminDashboard();
};

window.updateOrderProgress = async function(orderId, progressVal) {
  const orders = JSON.parse(localStorage.getItem('ruddranil_orders') || '[]');
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  order.progress = Math.min(100, Math.max(0, parseInt(progressVal, 10) || 0));
  order.lastUpdated = 'Just now';

  if (order.progress === 100) order.status = 'Delivered';
  else if (order.progress > 0 && order.status === 'Pending') order.status = 'In Progress';

  localStorage.setItem('ruddranil_orders', JSON.stringify(orders));

  // Sync Progress Change to Supabase Cloud & Server
  if (typeof window.updateOrderStatusInCloud === 'function') {
    await window.updateOrderStatusInCloud(orderId, order.status, order.progress);
  }

  showToast(`Progress for ${orderId} set to ${order.progress}%`);
  renderAdminDashboard();
};

window.deleteOrder = async function(orderId) {
  let userConfirmed = true;
  try {
    if (typeof window.confirm === 'function') {
      userConfirmed = window.confirm(`Are you sure you want to permanently delete order ${orderId}?`);
    }
  } catch (e) {
    userConfirmed = true;
  }
  if (!userConfirmed) return;

  let orders = JSON.parse(localStorage.getItem('ruddranil_orders') || '[]');
  orders = orders.filter(o => o.id !== orderId);
  localStorage.setItem('ruddranil_orders', JSON.stringify(orders));

  try {
    await fetch(`/api/orders/${encodeURIComponent(orderId)}`, { method: 'DELETE' });
  } catch (e) {}

  if (window.sbClient) {
    try {
      await window.sbClient.from('orders').delete().eq('id', orderId);
    } catch (e) {}
  }

  showToast(`Order ${orderId} removed`);
  renderAdminDashboard();
};

window.viewOrderInstructions = function(orderId) {
  const orders = JSON.parse(localStorage.getItem('ruddranil_orders') || '[]');
  const order = orders.find(o => o.id === orderId);
  if (!order) {
    if (typeof showToast === 'function') showToast('Order not found', 'error');
    return;
  }

  const modal = document.getElementById('viewInstructionsModal');
  const details = document.getElementById('instructionsDetailsContent');
  const idEl = document.getElementById('instructionsModalOrderId');
  const deliverBtn = document.getElementById('btnDeliverFromInstructionsModal');

  if (idEl) idEl.textContent = '#' + order.id.replace(/^#/, '');

  if (deliverBtn) {
    deliverBtn.onclick = function() {
      closeViewInstructionsModal();
      window.openDeliverWorkModal(order.id);
    };
  }

  const files = Array.isArray(order.referenceFiles) ? order.referenceFiles : [];
  const reqText = order.request || order.notes || order.instructions || 'No special requirements provided by client.';

  if (details) {
    details.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 16px; padding-bottom: 14px; border-bottom: 1px solid var(--border-color); font-size: 13px;">
        <div><strong style="color: var(--text-dark-gray);">Client:</strong> <span style="color: #fff; font-weight: 600;">${escapeHtmlText(order.customerName || 'Client')}</span></div>
        <div><strong style="color: var(--text-dark-gray);">Email:</strong> <span style="color: var(--accent-cyan);">${escapeHtmlText(order.customerEmail || 'N/A')}</span></div>
        <div><strong style="color: var(--text-dark-gray);">Service:</strong> <span style="color: #fff;">${escapeHtmlText(order.service)}</span></div>
        <div><strong style="color: var(--text-dark-gray);">Package Tier:</strong> <span style="color: var(--accent-cyan); text-transform: uppercase;">${escapeHtmlText(order.packageTier || 'Basic')}</span></div>
        <div><strong style="color: var(--text-dark-gray);">Total:</strong> <span style="color: #34d399; font-weight: 700;">${escapeHtmlText(order.price || ('$' + (order.finalTotal || 30)))}</span></div>
        <div><strong style="color: var(--text-dark-gray);">Timeline:</strong> <span style="color: #fff;">${order.deliveryDays || 3} Days ${order.isExpress ? '⚡ Express' : ''}</span></div>
      </div>

      <div style="margin-bottom: 16px;">
        <div style="font-size: 12px; font-weight: 700; color: var(--accent-cyan); margin-bottom: 6px; text-transform: uppercase;">Project Requirements &amp; Instructions:</div>
        <div style="font-size: 13.5px; color: #e2e8f0; line-height: 1.6; background: rgba(0, 0, 0, 0.3); padding: 12px 14px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.08); white-space: pre-line;">${escapeHtmlText(reqText)}</div>
      </div>

      ${files.length > 0 ? `
        <div>
          <div style="font-size: 12px; font-weight: 700; color: #10b981; margin-bottom: 8px; text-transform: uppercase;">Attached Client Reference Files (${files.length}):</div>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${files.map(f => `
              <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(0, 0, 0, 0.25); padding: 8px 12px; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.05);">
                <span style="font-size: 12.5px; color: #fff; font-weight: 600;">📎 ${escapeHtmlText(f.name || 'File')}</span>
                ${f.dataUrl ? `<a href="${f.dataUrl}" download="${escapeHtmlText(f.name)}" class="btn btn-sm" style="font-size: 11px; padding: 2px 8px; background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.4);">Download</a>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    `;
  }

  if (modal) modal.style.display = 'flex';
};

window.closeViewInstructionsModal = function() {
  const modal = document.getElementById('viewInstructionsModal');
  if (modal) modal.style.display = 'none';
};

// ============================================================================
// 2. Services & Multi-Tier Package Management (Fiverr Gig System)
// ============================================================================
let currentAdminServiceCategory = 'all';

window.filterAdminServices = function(category) {
  currentAdminServiceCategory = category || 'all';

  // Update active pill button state
  document.querySelectorAll('.admin-service-filter-btn').forEach(btn => {
    const btnCat = btn.getAttribute('data-cat');
    if (btnCat === currentAdminServiceCategory) {
      btn.className = 'btn btn-sm btn-primary admin-service-filter-btn';
    } else {
      btn.className = 'btn btn-sm btn-secondary admin-service-filter-btn';
    }
  });

  // Filter service cards
  const cards = document.querySelectorAll('#adminServicesListContainer .admin-service-card');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (currentAdminServiceCategory === 'all' || cardCat === currentAdminServiceCategory) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
};

function renderAdminServicesList() {
  const container = document.getElementById('adminServicesListContainer');
  if (!container) return;

  let services = JSON.parse(localStorage.getItem('ruddranil_services') || '[]');
  if (!services || services.length === 0) {
    if (window.DEFAULT_SERVICES && window.DEFAULT_SERVICES.length > 0) {
      services = window.DEFAULT_SERVICES;
    }
  }

  container.innerHTML = services.map(s => {
    const b = s.packages?.basic || { name: 'Basic', price: 30, deliveryDays: 3 };
    const std = s.packages?.standard || { name: 'Standard', price: 60, deliveryDays: 5 };
    const p = s.packages?.premium || { name: 'Premium', price: 120, deliveryDays: 7 };
    const cover = s.coverImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80';
    const isCustom = !['srv-fb-1', 'srv-yt-2', 'srv-seo-3', 'srv-web-4', 'srv-gd-5'].includes(s.id);
    const catSlug = (s.category || 'other').toLowerCase();

    return `
      <div class="card admin-service-card" data-category="${catSlug}" style="margin-bottom: 22px; padding: 22px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; flex-wrap: wrap; gap: 14px;">
          <div style="display: flex; gap: 16px; align-items: flex-start;">
            <img src="${cover}" alt="${s.name}" style="width: 76px; height: 76px; border-radius: var(--radius-sm); object-fit: cover; border: 1.5px solid var(--border-color); flex-shrink: 0;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                <h4 class="admin-table-title" style="font-size: 18px; margin-bottom: 0;">${s.name}</h4>
                <span class="brand-badge">${(s.category || 'SERVICE').toUpperCase()}</span>
                ${s.badge ? `<span class="badge-status badge-status-in-progress" style="font-size: 10px; padding: 2px 7px;">${s.badge}</span>` : ''}
              </div>
              <div style="font-size: 13px; font-weight: 700; color: var(--accent-cyan); margin-top: 4px;">
                ${s.gigTitle || ('I will provide professional ' + s.name + ' services')}
              </div>
              <p class="modal-subtext" style="font-size: 12px; margin-top: 4px; max-width: 650px; margin-bottom: 0;">
                ${s.description || ''}
              </p>
            </div>
          </div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button type="button" onclick="previewService('${s.slug || s.id}')" class="btn btn-outline btn-sm" title="Preview Order Form">
              👁️ Preview
            </button>
            <button type="button" onclick="openEditServiceModal('${s.id}')" class="btn btn-secondary btn-sm">
              ✏️ Edit Gig
            </button>
            ${isCustom ? `
              <button type="button" onclick="deleteGig('${s.id}')" class="btn btn-danger btn-sm" title="Delete Gig">
                🗑️ Delete
              </button>
            ` : ''}
          </div>
        </div>

        <!-- 3 Tiers Comparison Summary -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
          <div class="admin-tier-box" style="padding: 12px; border-radius: var(--radius-sm);">
            <span style="font-size: 10px; font-weight: 800; color: var(--accent-cyan); text-transform: uppercase;">BASIC</span>
            <div class="admin-table-title" style="font-size: 14px; margin-top: 2px;">${b.name || 'Basic'}</div>
            <div class="admin-table-price" style="font-size: 16px; margin-top: 2px;">$${b.price} <span style="font-size: 11px; font-weight: 500; color: var(--text-gray);">(${b.deliveryDays}d delivery)</span></div>
          </div>

          <div class="admin-tier-box" style="padding: 12px; border-radius: var(--radius-sm);">
            <span style="font-size: 10px; font-weight: 800; color: #60a5fa; text-transform: uppercase;">STANDARD</span>
            <div class="admin-table-title" style="font-size: 14px; margin-top: 2px;">${std.name || 'Standard'}</div>
            <div class="admin-table-price" style="font-size: 16px; margin-top: 2px;">$${std.price} <span style="font-size: 11px; font-weight: 500; color: var(--text-gray);">(${std.deliveryDays}d delivery)</span></div>
          </div>

          <div class="admin-tier-box" style="padding: 12px; border-radius: var(--radius-sm);">
            <span style="font-size: 10px; font-weight: 800; color: #f59e0b; text-transform: uppercase;">PREMIUM</span>
            <div class="admin-table-title" style="font-size: 14px; margin-top: 2px;">${p.name || 'Premium'}</div>
            <div class="admin-table-price" style="font-size: 16px; margin-top: 2px;">$${p.price} <span style="font-size: 11px; font-weight: 500; color: var(--text-gray);">(${p.deliveryDays}d delivery)</span></div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Re-apply current category filter
  window.filterAdminServices(currentAdminServiceCategory);
}
window.renderAdminServicesList = renderAdminServicesList;

window.previewService = function(slug) {
  if (typeof openFiverrOrderModal === 'function') {
    openFiverrOrderModal(slug);
  }
};

// Dynamic Add-ons Management for New Gig
window.addNewGigAddonRow = function(name = '', price = '') {
  const container = document.getElementById('newGigAddonsContainer');
  if (!container) return;
  const rowId = 'addon-row-' + Math.random().toString(36).substring(2, 9);
  const row = document.createElement('div');
  row.className = 'gig-addon-row';
  row.id = rowId;
  row.style.cssText = 'display: grid; grid-template-columns: 2fr 1fr auto; gap: 8px; align-items: center; background: rgba(255, 255, 255, 0.03); padding: 8px; border-radius: 6px; border: 1px solid var(--border-color);';
  row.innerHTML = `
    <input type="text" class="form-input addon-name-input" placeholder="e.g. Extra Fast 24h Kickoff, Source Files..." value="${escapeHtmlText(name)}" style="font-size: 12px; padding: 6px 10px;">
    <div style="position: relative; display: flex; align-items: center;">
      <span style="position: absolute; left: 8px; color: var(--text-dark-gray); font-size: 12px;">$</span>
      <input type="number" class="form-input addon-price-input" placeholder="20" value="${price !== '' ? price : ''}" min="5" step="1" style="font-size: 12px; padding: 6px 10px 6px 20px;">
    </div>
    <button type="button" onclick="this.closest('.gig-addon-row').remove()" class="btn btn-danger btn-sm" style="padding: 6px 8px; font-size: 11px;" title="Remove Add-on">✕</button>
  `;
  container.appendChild(row);
};

window.renderNewGigDefaultAddons = function() {
  const container = document.getElementById('newGigAddonsContainer');
  if (!container) return;
  container.innerHTML = '';
  addNewGigAddonRow('Extra Fast 24h Kickoff', 20);
  addNewGigAddonRow('Source Files & Commercial License', 25);
  addNewGigAddonRow('Additional Revision Round', 15);
};

window.openNewGigModal = function() {
  const form = document.getElementById('addNewGigForm');
  if (form) form.reset();
  renderNewGigDefaultAddons();
  const modal = document.getElementById('addNewGigModal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
};

window.closeNewGigModal = function() {
  const modal = document.getElementById('addNewGigModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
};

window.openNewServiceModal = window.openNewGigModal;

window.handleCreateNewGigSubmit = async function(e) {
  e.preventDefault();
  const submitBtn = document.getElementById('btnPublishGigSubmit') || (e.target && e.target.querySelector('button[type="submit"]'));
  const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Publish Gig';

  const serviceName = document.getElementById('newGigServiceName')?.value.trim();
  if (!serviceName) return;

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Publishing & Syncing...';
  }

  try {
    const category = document.getElementById('newGigCategory')?.value.trim() || 'custom';
    const gigTitle = document.getElementById('newGigTitle')?.value.trim() || `I will do ${serviceName} solutions for your business`;
    const description = document.getElementById('newGigDesc')?.value.trim() || '';
    let coverImage = document.getElementById('newGigCoverImage')?.value.trim() || 'public/assets/aistudio/file_000000001e5881f5bec7048c347e325c_07632167.png';
    if (coverImage.startsWith('public/')) {
      coverImage = '/' + coverImage;
    }
    const badge = document.getElementById('newGigBadge')?.value.trim() || 'NEW';

    // Basic package
    const basicName = document.getElementById('newPkgBasicName')?.value.trim() || 'Starter Pack';
    const basicPrice = Number(document.getElementById('newPkgBasicPrice')?.value) || 30;
    const basicDays = Number(document.getElementById('newPkgBasicDays')?.value) || 3;
    const basicExpressDays = Number(document.getElementById('newPkgBasicExpressDays')?.value) || 1;
    const basicExpressFee = Number(document.getElementById('newPkgBasicExpressFee')?.value) || 15;
    const basicFeatures = (document.getElementById('newPkgBasicFeatures')?.value || 'Initial Setup, Core Deliverables, 1 Revision').split(',').map(f => f.trim()).filter(Boolean);

    // Standard package
    const stdName = document.getElementById('newPkgStdName')?.value.trim() || 'Standard Growth';
    const stdPrice = Number(document.getElementById('newPkgStdPrice')?.value) || 60;
    const stdDays = Number(document.getElementById('newPkgStdDays')?.value) || 5;
    const stdExpressDays = Number(document.getElementById('newPkgStdExpressDays')?.value) || 2;
    const stdExpressFee = Number(document.getElementById('newPkgStdExpressFee')?.value) || 25;
    const stdFeatures = (document.getElementById('newPkgStdFeatures')?.value || 'Full Scope, High-Res Assets, 3 Revisions').split(',').map(f => f.trim()).filter(Boolean);

    // Premium package
    const premName = document.getElementById('newPkgPremName')?.value.trim() || 'VIP Scale';
    const premPrice = Number(document.getElementById('newPkgPremPrice')?.value) || 120;
    const premDays = Number(document.getElementById('newPkgPremDays')?.value) || 7;
    const premExpressDays = Number(document.getElementById('newPkgPremExpressDays')?.value) || 3;
    const premExpressFee = Number(document.getElementById('newPkgPremExpressFee')?.value) || 40;
    const premFeatures = (document.getElementById('newPkgPremFeatures')?.value || 'Turnkey Execution, Dedicated Support, Unlimited Revisions').split(',').map(f => f.trim()).filter(Boolean);

    const slug = serviceName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const services = JSON.parse(localStorage.getItem('ruddranil_services') || '[]');

    // Collect dynamic add-ons from container
    const addonRows = document.querySelectorAll('#newGigAddonsContainer .gig-addon-row');
    const customAddons = [];
    addonRows.forEach((row, idx) => {
      const nameInput = row.querySelector('.addon-name-input');
      const priceInput = row.querySelector('.addon-price-input');
      const name = nameInput ? nameInput.value.trim() : '';
      const price = priceInput ? Number(priceInput.value) || 0 : 0;
      if (name && price > 0) {
        customAddons.push({
          id: `ad-${slug}-${idx + 1}`,
          name,
          price
        });
      }
    });

    const newGig = {
      id: 'srv-custom-' + Date.now(),
      name: serviceName,
      slug: slug,
      category: category,
      badge: badge,
      gigTitle: gigTitle,
      coverImage: coverImage,
      description: description,
      rating: '5.0',
      reviewsCount: 58,
      ordersInQueue: 3,
      aboutNotes: [
        description || `Professional ${serviceName} solutions designed specifically for your brand growth and conversion.`,
        'From in-depth discovery and custom strategy execution to performance monitoring, every phase is engineered for high return and reliable delivery.',
        'We combine creative excellence with data-driven methodology to deliver turnkey results on schedule.'
      ],
      keyDeliverables: basicFeatures.length > 0 ? basicFeatures : [
        'Comprehensive Target Strategy & Requirements Analysis',
        'Custom Creative Asset Design & Delivery',
        'Technical Setup & Performance Optimization',
        'Detailed Handover Report with Support'
      ],
      whyChoose: [
        '5+ Years of Certified Digital & Creative Experience',
        'Data-driven approach with transparent communication',
        'Fast, clear English communication with 100% on-time delivery record',
        'Dedicated post-launch support and revision rounds included'
      ],
      workProcess: [
        { step: '01', title: 'Strategy Briefing', desc: 'Understanding your business model, goals, and technical specifications.' },
        { step: '02', title: 'Asset & Strategy Setup', desc: 'Conducting niche research, drafting concepts, and preparing high-converting deliverables.' },
        { step: '03', title: 'Execution & Quality Check', desc: 'Deploying custom configurations, verifying specs, and conducting quality review.' },
        { step: '04', title: 'Delivery & Proof', desc: 'Comprehensive handover with transparent metrics, source assets, and revision support.' }
      ],
      tools: ['Meta Business Suite', 'Canva Pro', 'Figma', 'Adobe Photoshop', 'Google Analytics 4'],
      faqs: [
        { q: `What do you need from me to start working on ${serviceName}?`, a: 'Please provide your project brief, preferred goals, any brand assets/guidelines, and any specific deadlines.' },
        { q: 'Are revisions included with this gig?', a: 'Yes! Every tier includes dedicated revision rounds to make sure you are 100% satisfied with the outcome.' },
        { q: 'How is communication handled during the project?', a: 'You can track real-time progress via our Work Tracking portal and communicate directly via email, WhatsApp, or dashboard.' }
      ],
      reviews: [
        { name: 'Michael Vance', country: 'United States', rating: 5, date: '3 days ago', comment: 'Ruddranil delivered outstanding work ahead of deadline. Very responsive and highly recommended!' },
        { name: 'Elena Rostova', country: 'United Kingdom', rating: 5, date: '1 week ago', comment: 'Top-tier service quality and very clear communication. Will definitely order again.' },
        { name: 'David Chen', country: 'Singapore', rating: 5, date: '2 weeks ago', comment: 'High attention to detail, transparent progress tracking, and flawless results.' }
      ],
      packages: {
        basic: {
          name: basicName,
          price: basicPrice,
          deliveryDays: basicDays,
          expressFee: basicExpressFee,
          expressDays: basicExpressDays,
          desc: basicName + ' - core deliverables.',
          features: basicFeatures
        },
        standard: {
          name: stdName,
          price: stdPrice,
          deliveryDays: stdDays,
          expressFee: stdExpressFee,
          expressDays: stdExpressDays,
          desc: stdName + ' - comprehensive project scope.',
          features: stdFeatures
        },
        premium: {
          name: premName,
          price: premPrice,
          deliveryDays: premDays,
          expressFee: premExpressFee,
          expressDays: premExpressDays,
          desc: premName + ' - complete VIP execution.',
          features: premFeatures
        }
      },
      addons: customAddons
    };

    services.push(newGig);
    localStorage.setItem('ruddranil_services', JSON.stringify(services));

    // Await cross-device server persistence
    await syncServicesToServer(services);

    // Await Supabase cloud persistence if configured
    if (typeof window.saveServiceToCloud === 'function') {
      try {
        await window.saveServiceToCloud(newGig);
      } catch (cloudErr) {
        console.warn('Supabase cloud gig save warning:', cloudErr);
      }
    }

    closeNewGigModal();
    showToast(`✨ Gig "${serviceName}" successfully published!`);
    renderAdminServicesList();
    populateAdminServiceDropdown();
    window.dispatchEvent(new CustomEvent('ruddranil_services_updated', { detail: services }));
    window.dispatchEvent(new CustomEvent('ruddranil_packages_updated', { detail: services }));
  } catch (err) {
    console.error('Error creating new gig:', err);
    showToast(`Failed to publish gig: ${err.message || 'Error'}`, 'error');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  }
};

window.deleteGig = async function(serviceId) {
  if (!confirm('Are you sure you want to delete this gig from the platform?')) return;
  const services = JSON.parse(localStorage.getItem('ruddranil_services') || '[]');
  const filtered = services.filter(s => s.id !== serviceId && s.slug !== serviceId);
  localStorage.setItem('ruddranil_services', JSON.stringify(filtered));

  // Sync deletion to server and cloud
  await syncServicesToServer(filtered);
  if (typeof window.deleteServiceFromCloud === 'function') {
    try {
      await window.deleteServiceFromCloud(serviceId);
    } catch (e) {
      console.warn('Cloud delete notice:', e);
    }
  }

  showToast('Gig removed.');
  renderAdminServicesList();
  populateAdminServiceDropdown();
  window.dispatchEvent(new CustomEvent('ruddranil_services_updated', { detail: filtered }));
  window.dispatchEvent(new CustomEvent('ruddranil_packages_updated', { detail: filtered }));
};

window.populateAdminServiceDropdown = function() {
  const select = document.getElementById('adminServiceType');
  if (!select) return;
  const services = JSON.parse(localStorage.getItem('ruddranil_services') || '[]');
  if (!services || services.length === 0) return;
  const currentVal = select.value;
  select.innerHTML = services.map(s => `
    <option value="${s.name}" ${s.name === currentVal ? 'selected' : ''}>${s.name}</option>
  `).join('');
};

window.switchEditModalTab = function(tabName) {
  const tabPackages = document.getElementById('editModalTabPackages');
  const tabDetails = document.getElementById('editModalTabDetails');
  const btnPackages = document.getElementById('editTabBtnPackages');
  const btnDetails = document.getElementById('editTabBtnDetails');

  if (tabName === 'details') {
    if (tabPackages) tabPackages.style.display = 'none';
    if (tabDetails) tabDetails.style.display = 'block';
    if (btnPackages) { btnPackages.className = 'btn btn-sm btn-secondary'; }
    if (btnDetails) { btnDetails.className = 'btn btn-sm btn-primary'; }
  } else {
    if (tabPackages) tabPackages.style.display = 'block';
    if (tabDetails) tabDetails.style.display = 'none';
    if (btnPackages) { btnPackages.className = 'btn btn-sm btn-primary'; }
    if (btnDetails) { btnDetails.className = 'btn btn-sm btn-secondary'; }
  }
};

// Dynamic Add-ons Management for Edit Service Modal
window.addEditGigAddonRow = function(name = '', price = '') {
  const container = document.getElementById('editGigAddonsContainer');
  if (!container) return;
  const rowId = 'edit-addon-row-' + Math.random().toString(36).substring(2, 9);
  const row = document.createElement('div');
  row.className = 'edit-gig-addon-row';
  row.id = rowId;
  row.style.cssText = 'display: grid; grid-template-columns: 2fr 1fr auto; gap: 8px; align-items: center; background: rgba(255, 255, 255, 0.03); padding: 8px; border-radius: 6px; border: 1px solid var(--border-color);';
  row.innerHTML = `
    <input type="text" class="form-input edit-addon-name-input" placeholder="e.g. Extra Fast 24h Kickoff, Source Files..." value="${escapeHtmlText(name)}" style="font-size: 12px; padding: 6px 10px;">
    <div style="position: relative; display: flex; align-items: center;">
      <span style="position: absolute; left: 8px; color: var(--text-dark-gray); font-size: 12px;">$</span>
      <input type="number" class="form-input edit-addon-price-input" placeholder="20" value="${price !== '' ? price : ''}" min="5" step="1" style="font-size: 12px; padding: 6px 10px 6px 20px;">
    </div>
    <button type="button" onclick="this.closest('.edit-gig-addon-row').remove()" class="btn btn-danger btn-sm" style="padding: 6px 8px; font-size: 11px;" title="Remove Add-on">✕</button>
  `;
  container.appendChild(row);
};

window.renderEditGigAddons = function(addons) {
  const container = document.getElementById('editGigAddonsContainer');
  if (!container) return;
  container.innerHTML = '';
  if (Array.isArray(addons) && addons.length > 0) {
    addons.forEach(ad => {
      addEditGigAddonRow(ad.name || '', ad.price || '');
    });
  } else {
    addEditGigAddonRow('Extra Fast 24h Kickoff', 20);
    addEditGigAddonRow('Source Files & Commercial License', 25);
  }
};

window.openEditServiceModal = function(serviceId) {
  const services = JSON.parse(localStorage.getItem('ruddranil_services') || '[]');
  const s = services.find(item => item.id === serviceId);
  if (!s) return;

  switchEditModalTab('packages');

  document.getElementById('editServiceId').value = s.id;
  document.getElementById('editServiceName').value = s.name;
  document.getElementById('editServiceCategory').value = s.category || 'custom';
  if (document.getElementById('editGigTitle')) {
    document.getElementById('editGigTitle').value = s.gigTitle || '';
  }
  if (document.getElementById('editGigCoverImage')) {
    document.getElementById('editGigCoverImage').value = s.coverImage || '';
  }
  if (document.getElementById('editGigBadge')) {
    document.getElementById('editGigBadge').value = s.badge || '';
  }
  document.getElementById('editServiceDesc').value = s.description || '';

  // Basic Package
  const b = s.packages?.basic || { name: 'Basic', price: 30, deliveryDays: 3, expressFee: 15, expressDays: 1, features: [] };
  document.getElementById('editPkgBasicName').value = b.name;
  document.getElementById('editPkgBasicPrice').value = b.price;
  document.getElementById('editPkgBasicDays').value = b.deliveryDays;
  if (document.getElementById('editPkgBasicExpressDays')) {
    document.getElementById('editPkgBasicExpressDays').value = b.expressDays || 1;
  }
  document.getElementById('editPkgBasicExpressFee').value = b.expressFee !== undefined ? b.expressFee : 15;
  document.getElementById('editPkgBasicFeatures').value = (b.features || []).join(', ');

  // Standard Package
  const std = s.packages?.standard || { name: 'Standard', price: 60, deliveryDays: 5, expressFee: 25, expressDays: 2, features: [] };
  document.getElementById('editPkgStdName').value = std.name;
  document.getElementById('editPkgStdPrice').value = std.price;
  document.getElementById('editPkgStdDays').value = std.deliveryDays;
  if (document.getElementById('editPkgStdExpressDays')) {
    document.getElementById('editPkgStdExpressDays').value = std.expressDays || 2;
  }
  document.getElementById('editPkgStdExpressFee').value = std.expressFee !== undefined ? std.expressFee : 25;
  document.getElementById('editPkgStdFeatures').value = (std.features || []).join(', ');

  // Premium Package
  const p = s.packages?.premium || { name: 'Premium', price: 120, deliveryDays: 7, expressFee: 40, expressDays: 3, features: [] };
  document.getElementById('editPkgPremName').value = p.name;
  document.getElementById('editPkgPremPrice').value = p.price;
  document.getElementById('editPkgPremDays').value = p.deliveryDays;
  if (document.getElementById('editPkgPremExpressDays')) {
    document.getElementById('editPkgPremExpressDays').value = p.expressDays || 3;
  }
  document.getElementById('editPkgPremExpressFee').value = p.expressFee !== undefined ? p.expressFee : 40;
  document.getElementById('editPkgPremFeatures').value = (p.features || []).join(', ');

  // Populate Add-ons in Edit Modal
  renderEditGigAddons(s.addons || []);

  // TAB 2: GIG DETAILS PAGE CONTENT
  // 1. About This Gig & Overview
  const aboutNotes = s.aboutNotes && s.aboutNotes.length > 0 ? s.aboutNotes : [s.description || ''];
  const aboutEl = document.getElementById('editGigAboutNotes');
  if (aboutEl) aboutEl.value = aboutNotes.join('\n\n');

  // 2. What You Will Get (Key Deliverables)
  const deliverables = s.keyDeliverables && s.keyDeliverables.length > 0 ? s.keyDeliverables : (b.features || []);
  const delivEl = document.getElementById('editGigKeyDeliverables');
  if (delivEl) delivEl.value = deliverables.join('\n');

  // 3. Why Choose Ruddranil?
  const whyList = s.whyChoose && s.whyChoose.length > 0 ? s.whyChoose : [
    '5+ Years of Certified Digital & Creative Experience',
    'Data-driven approach with transparent ROI tracking',
    'Fast, clear English communication with 100% on-time delivery record',
    'Dedicated post-launch support and revision rounds included'
  ];
  const whyEl = document.getElementById('editGigWhyChoose');
  if (whyEl) whyEl.value = whyList.join('\n');

  // 4. Work Process (4 Steps)
  const wp = s.workProcess && s.workProcess.length >= 4 ? s.workProcess : [
    { step: '01', title: 'Strategy Briefing', desc: 'Understanding your business model, goals, and technical specifications.' },
    { step: '02', title: 'Asset & Strategy Setup', desc: 'Conducting niche research, drafting concepts, and preparing high-converting deliverables.' },
    { step: '03', title: 'Execution & Quality Check', desc: 'Deploying custom configurations, verifying specs, and conducting quality review.' },
    { step: '04', title: 'Delivery & Proof', desc: 'Comprehensive handover with transparent metrics, source assets, and revision support.' }
  ];
  if (document.getElementById('editStep1Title')) document.getElementById('editStep1Title').value = wp[0]?.title || '';
  if (document.getElementById('editStep1Desc')) document.getElementById('editStep1Desc').value = wp[0]?.desc || '';
  if (document.getElementById('editStep2Title')) document.getElementById('editStep2Title').value = wp[1]?.title || '';
  if (document.getElementById('editStep2Desc')) document.getElementById('editStep2Desc').value = wp[1]?.desc || '';
  if (document.getElementById('editStep3Title')) document.getElementById('editStep3Title').value = wp[2]?.title || '';
  if (document.getElementById('editStep3Desc')) document.getElementById('editStep3Desc').value = wp[2]?.desc || '';
  if (document.getElementById('editStep4Title')) document.getElementById('editStep4Title').value = wp[3]?.title || '';
  if (document.getElementById('editStep4Desc')) document.getElementById('editStep4Desc').value = wp[3]?.desc || '';

  // 5. Tools & Technologies Used
  const toolsEl = document.getElementById('editGigTools');
  if (toolsEl) toolsEl.value = (s.tools || []).join(', ');

  // 6. Frequently Asked Questions
  const faqs = s.faqs || [];
  if (document.getElementById('editFaq1Q')) document.getElementById('editFaq1Q').value = faqs[0]?.q || '';
  if (document.getElementById('editFaq1A')) document.getElementById('editFaq1A').value = faqs[0]?.a || '';
  if (document.getElementById('editFaq2Q')) document.getElementById('editFaq2Q').value = faqs[1]?.q || '';
  if (document.getElementById('editFaq2A')) document.getElementById('editFaq2A').value = faqs[1]?.a || '';
  if (document.getElementById('editFaq3Q')) document.getElementById('editFaq3Q').value = faqs[2]?.q || '';
  if (document.getElementById('editFaq3A')) document.getElementById('editFaq3A').value = faqs[2]?.a || '';

  // 7. Rating & Reviews
  if (document.getElementById('editGigRating')) document.getElementById('editGigRating').value = s.rating || '5.0';
  if (document.getElementById('editGigReviewsCount')) document.getElementById('editGigReviewsCount').value = s.reviewsCount || 58;
  if (document.getElementById('editGigOrdersQueue')) document.getElementById('editGigOrdersQueue').value = s.ordersInQueue !== undefined ? s.ordersInQueue : 3;

  document.getElementById('editServiceModal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
};

window.closeEditServiceModal = function() {
  document.getElementById('editServiceModal').style.display = 'none';
  document.body.style.overflow = '';
};

window.handleSaveServiceSubmit = async function(e) {
  e.preventDefault();
  const id = document.getElementById('editServiceId').value;
  const services = JSON.parse(localStorage.getItem('ruddranil_services') || '[]');
  const s = services.find(item => item.id === id);
  if (!s) return;

  const submitBtn = (e.target && e.target.querySelector('button[type="submit"]')) || document.querySelector('#editServiceModal button[type="submit"]');
  const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Save Details & Pricing';
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '💾 Saving & Syncing...';
  }

  try {
    // Basic Info
    s.name = document.getElementById('editServiceName').value.trim();
    s.category = document.getElementById('editServiceCategory').value.trim();
    if (document.getElementById('editGigTitle')) {
      s.gigTitle = document.getElementById('editGigTitle').value.trim();
    }
    if (document.getElementById('editGigCoverImage')) {
      let cov = document.getElementById('editGigCoverImage').value.trim();
      if (cov.startsWith('public/')) cov = '/' + cov;
      s.coverImage = cov || s.coverImage;
    }
    if (document.getElementById('editGigBadge')) {
      s.badge = document.getElementById('editGigBadge').value.trim();
    }
    s.description = document.getElementById('editServiceDesc').value.trim();

    // Basic Package
    const bDays = Number(document.getElementById('editPkgBasicDays').value) || 3;
    const bExpDays = Number(document.getElementById('editPkgBasicExpressDays')?.value) || Math.max(1, bDays - 2);
    const bExpFee = Number(document.getElementById('editPkgBasicExpressFee')?.value) || 15;

    if (!s.packages) s.packages = {};
    s.packages.basic = {
      name: document.getElementById('editPkgBasicName').value.trim(),
      price: Number(document.getElementById('editPkgBasicPrice').value) || 30,
      deliveryDays: bDays,
      expressFee: bExpFee,
      expressDays: bExpDays,
      desc: document.getElementById('editPkgBasicName').value.trim() + ' core package.',
      features: document.getElementById('editPkgBasicFeatures').value.split(',').map(f => f.trim()).filter(Boolean)
    };

    // Standard Package
    const stdDays = Number(document.getElementById('editPkgStdDays').value) || 5;
    const stdExpDays = Number(document.getElementById('editPkgStdExpressDays')?.value) || Math.max(2, stdDays - 2);
    const stdExpFee = Number(document.getElementById('editPkgStdExpressFee')?.value) || 25;

    s.packages.standard = {
      name: document.getElementById('editPkgStdName').value.trim(),
      price: Number(document.getElementById('editPkgStdPrice').value) || 60,
      deliveryDays: stdDays,
      expressFee: stdExpFee,
      expressDays: stdExpDays,
      desc: document.getElementById('editPkgStdName').value.trim() + ' standard project scope.',
      features: document.getElementById('editPkgStdFeatures').value.split(',').map(f => f.trim()).filter(Boolean)
    };

    // Premium Package
    const premDays = Number(document.getElementById('editPkgPremDays').value) || 7;
    const premExpDays = Number(document.getElementById('editPkgPremExpressDays')?.value) || Math.max(3, premDays - 3);
    const premExpFee = Number(document.getElementById('editPkgPremExpressFee')?.value) || 40;

    s.packages.premium = {
      name: document.getElementById('editPkgPremName').value.trim(),
      price: Number(document.getElementById('editPkgPremPrice').value) || 120,
      deliveryDays: premDays,
      expressFee: premExpFee,
      expressDays: premExpDays,
      desc: document.getElementById('editPkgPremName').value.trim() + ' VIP full platform execution.',
      features: document.getElementById('editPkgPremFeatures').value.split(',').map(f => f.trim()).filter(Boolean)
    };

    // Collect Add-ons from Edit Modal
    const editAddonRows = document.querySelectorAll('#editGigAddonsContainer .edit-gig-addon-row');
    const editedAddons = [];
    editAddonRows.forEach((row, idx) => {
      const nameInput = row.querySelector('.edit-addon-name-input');
      const priceInput = row.querySelector('.edit-addon-price-input');
      const name = nameInput ? nameInput.value.trim() : '';
      const price = priceInput ? Number(priceInput.value) || 0 : 0;
      if (name && price > 0) {
        editedAddons.push({
          id: `ad-${s.slug || 'srv'}-${idx + 1}`,
          name,
          price
        });
      }
    });
    s.addons = editedAddons;

    // TAB 2: GIG DETAILS PAGE FIELDS (Overview, Deliverables, Process, FAQs, Social proof)
    const rawAbout = document.getElementById('editGigAboutNotes')?.value || '';
    let parsedAbout = rawAbout.split('\n\n').map(p => p.trim()).filter(Boolean);
    if (parsedAbout.length === 1 && parsedAbout[0].includes('\n')) {
      parsedAbout = parsedAbout[0].split('\n').map(p => p.trim()).filter(Boolean);
    }
    s.aboutNotes = parsedAbout.length > 0 ? parsedAbout : [s.description];

    const rawDeliverables = document.getElementById('editGigKeyDeliverables')?.value || '';
    s.keyDeliverables = rawDeliverables.split('\n').map(l => l.trim()).filter(Boolean);

    const rawWhy = document.getElementById('editGigWhyChoose')?.value || '';
    s.whyChoose = rawWhy.split('\n').map(l => l.trim()).filter(Boolean);

    s.workProcess = [
      { step: '01', title: document.getElementById('editStep1Title')?.value.trim() || 'Strategy Briefing', desc: document.getElementById('editStep1Desc')?.value.trim() || '' },
      { step: '02', title: document.getElementById('editStep2Title')?.value.trim() || 'Asset & Strategy Setup', desc: document.getElementById('editStep2Desc')?.value.trim() || '' },
      { step: '03', title: document.getElementById('editStep3Title')?.value.trim() || 'Execution & Quality Check', desc: document.getElementById('editStep3Desc')?.value.trim() || '' },
      { step: '04', title: document.getElementById('editStep4Title')?.value.trim() || 'Delivery & Proof', desc: document.getElementById('editStep4Desc')?.value.trim() || '' }
    ];

    const rawTools = document.getElementById('editGigTools')?.value || '';
    s.tools = rawTools.split(',').map(t => t.trim()).filter(Boolean);

    const newFaqs = [];
    const q1 = document.getElementById('editFaq1Q')?.value.trim();
    const a1 = document.getElementById('editFaq1A')?.value.trim();
    if (q1 && a1) newFaqs.push({ q: q1, a: a1 });

    const q2 = document.getElementById('editFaq2Q')?.value.trim();
    const a2 = document.getElementById('editFaq2A')?.value.trim();
    if (q2 && a2) newFaqs.push({ q: q2, a: a2 });

    const q3 = document.getElementById('editFaq3Q')?.value.trim();
    const a3 = document.getElementById('editFaq3A')?.value.trim();
    if (q3 && a3) newFaqs.push({ q: q3, a: a3 });

    if (newFaqs.length > 0) {
      s.faqs = newFaqs;
    }

    s.rating = document.getElementById('editGigRating')?.value.trim() || '5.0';
    s.reviewsCount = Number(document.getElementById('editGigReviewsCount')?.value) || 58;
    s.ordersInQueue = Number(document.getElementById('editGigOrdersQueue')?.value) || 3;

    localStorage.setItem('ruddranil_services', JSON.stringify(services));

    // Await server sync for cross-device persistence
    await syncServicesToServer(services);

    // Await Supabase cloud persistence if configured
    if (typeof window.saveServiceToCloud === 'function') {
      try {
        await window.saveServiceToCloud(s);
      } catch (cloudErr) {
        console.warn('Supabase cloud service update warning:', cloudErr);
      }
    }

    closeEditServiceModal();
    showToast(`✨ All Details & Pricing saved for "${s.name}"!`);
    renderAdminServicesList();
    populateAdminServiceDropdown();
    window.dispatchEvent(new CustomEvent('ruddranil_services_updated', { detail: services }));
    window.dispatchEvent(new CustomEvent('ruddranil_packages_updated', { detail: services }));
  } catch (err) {
    console.error('Failed to save service:', err);
    showToast(`Failed to save: ${err.message || 'Error'}`, 'error');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  }
};

// ============================================================================
// 3. Discounts & Coupon Code Management
// ============================================================================
function renderAdminCouponsTable() {
  const tbody = document.getElementById('adminCouponsTableBody');
  if (!tbody) return;

  const coupons = JSON.parse(localStorage.getItem('ruddranil_coupons') || '[]');

  if (coupons.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="padding: 24px; text-align: center; color: var(--text-dark-gray);">No coupons found. Create one.</td></tr>`;
    return;
  }

  tbody.innerHTML = coupons.map(c => `
    <tr style="border-bottom: 1px solid var(--border-color);">
      <td style="padding: 12px 14px;">
        <strong style="color: var(--accent-cyan); font-family: monospace; font-size: 14px;">${c.code}</strong>
      </td>
      <td style="padding: 12px 14px; color: #fff; font-weight: 600;">
        ${c.type === 'percentage' ? `${c.value}% OFF` : `$${c.value} OFF`}
      </td>
      <td style="padding: 12px 14px; color: var(--text-gray); font-size: 13px;">
        $${c.minOrder || 0}
      </td>
      <td style="padding: 12px 14px; color: var(--text-gray); font-size: 13px;">
        ${c.maxDiscount ? `$${c.maxDiscount}` : 'None'}
      </td>
      <td style="padding: 12px 14px; color: var(--text-gray); font-size: 13px;">
        ${c.timesUsed || 0} times
      </td>
      <td style="padding: 12px 14px;">
        <span class="badge-status ${c.active ? 'badge-in-progress' : 'badge-pending'}">
          ● ${c.active ? 'Active' : 'Inactive'}
        </span>
      </td>
      <td style="padding: 12px 14px;">
        <div style="display: flex; gap: 8px;">
          <button onclick="toggleCouponActive('${c.code}')" class="btn btn-secondary btn-sm" style="padding: 4px 8px; font-size: 11px;">
            ${c.active ? 'Deactivate' : 'Activate'}
          </button>
          <button onclick="deleteCoupon('${c.code}')" class="btn btn-danger btn-sm" style="padding: 4px 8px; font-size: 11px;">
            ✕
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}
window.renderAdminCouponsTable = renderAdminCouponsTable;

window.openCreateCouponModal = function() {
  document.getElementById('createCouponModal').style.display = 'flex';
};

window.closeCreateCouponModal = function() {
  document.getElementById('createCouponModal').style.display = 'none';
};

window.handleCreateCouponSubmit = function(e) {
  e.preventDefault();
  const code = document.getElementById('newCouponCode').value.toUpperCase().trim();
  const type = document.getElementById('newCouponType').value;
  const value = Number(document.getElementById('newCouponValue').value);
  const minOrder = Number(document.getElementById('newCouponMinOrder').value) || 0;
  const maxCap = document.getElementById('newCouponMaxCap').value ? Number(document.getElementById('newCouponMaxCap').value) : null;

  if (!code || value <= 0) {
    showToast('Please enter valid coupon parameters', 'error');
    return;
  }

  const coupons = JSON.parse(localStorage.getItem('ruddranil_coupons') || '[]');
  const existing = coupons.find(c => c.code === code);
  if (existing) {
    showToast(`Coupon code ${code} already exists`, 'error');
    return;
  }

  coupons.unshift({
    code,
    type,
    value,
    minOrder,
    maxDiscount: maxCap,
    active: true,
    timesUsed: 0
  });

  localStorage.setItem('ruddranil_coupons', JSON.stringify(coupons));
  closeCreateCouponModal();
  showToast(`Coupon ${code} activated!`);
  renderAdminCouponsTable();
};

window.toggleCouponActive = function(code) {
  const coupons = JSON.parse(localStorage.getItem('ruddranil_coupons') || '[]');
  const c = coupons.find(item => item.code === code);
  if (!c) return;

  c.active = !c.active;
  localStorage.setItem('ruddranil_coupons', JSON.stringify(coupons));
  showToast(`Coupon ${code} is now ${c.active ? 'Active' : 'Inactive'}`);
  renderAdminCouponsTable();
};

window.deleteCoupon = function(code) {
  if (!confirm(`Delete coupon ${code}?`)) return;

  let coupons = JSON.parse(localStorage.getItem('ruddranil_coupons') || '[]');
  coupons = coupons.filter(c => c.code !== code);
  localStorage.setItem('ruddranil_coupons', JSON.stringify(coupons));

  showToast(`Coupon ${code} deleted`);
  renderAdminCouponsTable();
};

// ============================================================================
// 4. Review Moderation & 5-Star Rating Control Center
// ============================================================================

let adminReviewSearchQuery = '';
let adminReviewStatusFilterVal = 'all';

async function syncAdminReviewsFromCloud() {
  const local = JSON.parse(localStorage.getItem('app_reviews') || '[]');
  const merged = [...local];

  // 1. Fetch from Supabase
  if (window.sbClient) {
    try {
      const { data, error } = await window.sbClient
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        data.forEach(cloudRev => {
          const revId = cloudRev.id || cloudRev.order_id || ('rev_' + Math.random());
          const existingIdx = merged.findIndex(m => m.id === revId || m.orderId === cloudRev.order_id);
          const mapped = {
            id: revId,
            orderId: cloudRev.order_id,
            order_id: cloudRev.order_id,
            name: cloudRev.customer_name || 'Client',
            customerName: cloudRev.customer_name || 'Client',
            customerEmail: cloudRev.customer_email || 'client@example.com',
            customer_email: cloudRev.customer_email || 'client@example.com',
            avatar: cloudRev.customer_avatar || null,
            role: cloudRev.role_company || 'Verified Customer',
            role_company: cloudRev.role_company || 'Verified Customer',
            rating: Number(cloudRev.rating) || 5,
            comment: cloudRev.comment || '',
            service: cloudRev.service_name || 'Digital Creative',
            service_name: cloudRev.service_name || 'Digital Creative',
            imageUrl: cloudRev.image_url || null,
            image_url: cloudRev.image_url || null,
            videoUrl: cloudRev.video_url || null,
            projectUrl: cloudRev.project_url || null,
            status: cloudRev.status || 'approved',
            verified: cloudRev.verified_order !== false,
            date: cloudRev.created_at ? new Date(cloudRev.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'
          };

          if (existingIdx >= 0) {
            merged[existingIdx] = { ...merged[existingIdx], ...mapped };
          } else {
            merged.unshift(mapped);
          }
        });
      }
    } catch (e) {
      console.warn('[Admin Reviews Sync Cloud Notice]:', e);
    }
  }

  // 2. Fetch from Backend Server /api/reviews
  try {
    const res = await fetch('/api/reviews');
    if (res.ok) {
      const serverRevs = await res.json();
      if (Array.isArray(serverRevs)) {
        serverRevs.forEach(sr => {
          const existingIdx = merged.findIndex(m => m.id === sr.id || (sr.orderId && m.orderId === sr.orderId));
          if (existingIdx >= 0) {
            merged[existingIdx] = { ...merged[existingIdx], ...sr };
          } else {
            merged.unshift(sr);
          }
        });
      }
    }
  } catch (err) {
    console.warn('[Admin Reviews Server Sync Notice]:', err);
  }

  if (merged.length > 0) {
    localStorage.setItem('app_reviews', JSON.stringify(merged));
  }

  renderAdminReviews();
}

function filterAdminReviewsList() {
  adminReviewSearchQuery = (document.getElementById('adminReviewSearch')?.value || '').toLowerCase().trim();
  adminReviewStatusFilterVal = document.getElementById('adminReviewStatusFilter')?.value || 'all';
  renderAdminReviews();
}
window.filterAdminReviewsList = filterAdminReviewsList;

function renderAdminReviews() {
  const revContainer = document.getElementById('adminReviewsContainer');
  if (!revContainer) return;

  const reviews = JSON.parse(localStorage.getItem('app_reviews') || '[]');

  // Update Metrics
  const total = reviews.length;
  const approved = reviews.filter(r => (r.status || 'approved') === 'approved').length;
  const pending = reviews.filter(r => r.status === 'pending').length;
  const rejected = reviews.filter(r => r.status === 'rejected').length;

  const mTotal = document.getElementById('adminMetricTotalReviews');
  const mApp = document.getElementById('adminMetricApprovedReviews');
  const mPen = document.getElementById('adminMetricPendingReviews');
  const mRej = document.getElementById('adminMetricRejectedReviews');
  const tabReviewsCount = document.getElementById('tabReviewsCount');

  if (mTotal) mTotal.textContent = total.toString();
  if (mApp) mApp.textContent = approved.toString();
  if (mPen) mPen.textContent = pending.toString();
  if (mRej) mRej.textContent = rejected.toString();
  if (tabReviewsCount) tabReviewsCount.textContent = total.toString();

  // Apply filters
  const filtered = reviews.filter(r => {
    const status = (r.status || 'approved').toLowerCase();
    const matchesStatus = adminReviewStatusFilterVal === 'all' || status === adminReviewStatusFilterVal;

    const name = (r.name || r.customerName || '').toLowerCase();
    const email = (r.customerEmail || r.customer_email || '').toLowerCase();
    const orderId = (r.orderId || r.order_id || '').toLowerCase();
    const comment = (r.comment || '').toLowerCase();

    const matchesSearch = !adminReviewSearchQuery ||
      name.includes(adminReviewSearchQuery) ||
      email.includes(adminReviewSearchQuery) ||
      orderId.includes(adminReviewSearchQuery) ||
      comment.includes(adminReviewSearchQuery);

    return matchesStatus && matchesSearch;
  });

  if (filtered.length === 0) {
    revContainer.innerHTML = `
      <div style="text-align: center; padding: 36px 20px; background: rgba(15, 23, 42, 0.4); border: 1px dashed var(--border-color); border-radius: 8px;">
        <span style="font-size: 28px; display: block; margin-bottom: 8px;">⭐</span>
        <p style="color: var(--text-dark-gray); font-size: 13.5px; margin: 0;">No reviews found matching the selected filters.</p>
      </div>
    `;
    return;
  }

  revContainer.innerHTML = filtered.map(r => {
    const revId = r.id || r.orderId;
    const status = (r.status || 'approved').toLowerCase();
    const isApproved = status === 'approved';
    const isPending = status === 'pending';
    const isRejected = status === 'rejected';

    let statusBadge = `<span class="badge-status badge-in-progress" style="font-size: 11px;">✓ Approved &amp; Public</span>`;
    if (isPending) {
      statusBadge = `<span class="badge-status badge-pending" style="font-size: 11px;">⏳ Pending Moderation</span>`;
    } else if (isRejected) {
      statusBadge = `<span class="badge-status" style="font-size: 11px; background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3);">✕ Rejected (Hidden)</span>`;
    }

    const ratingNum = Math.min(5, Math.max(1, parseInt(r.rating, 10) || 5));
    const starsHtml = '★'.repeat(ratingNum) + '☆'.repeat(5 - ratingNum);
    const initial = (r.name || 'C').charAt(0).toUpperCase();
    const avatar = r.avatar || r.customer_avatar || null;
    const attachedImg = r.imageUrl || r.image_url || null;
    const orderId = r.orderId || r.order_id || 'N/A';
    const serviceName = r.service || r.service_name || 'Digital Service';

    return `
      <div class="card" style="padding: 18px 20px; background: #090e1a; border: 1px solid var(--border-color); border-radius: var(--radius-sm); transition: border-color 0.2s ease;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; flex-wrap: wrap; gap: 10px;">
          <!-- Left: Customer info & Order -->
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 42px; height: 42px; border-radius: 50%; overflow: hidden; background: #111b2e; border: 1px solid var(--border-color); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              ${avatar ? `
                <img src="${escapeHtmlText(avatar)}" alt="${escapeHtmlText(r.name)}" style="width: 100%; height: 100%; object-fit: cover;">
              ` : `
                <span style="font-weight: 800; font-size: 16px; color: var(--accent-cyan);">${initial}</span>
              `}
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                <strong style="font-size: 15px; color: #fff;">${escapeHtmlText(r.name || 'Client')}</strong>
                <span style="font-size: 12px; color: var(--text-dark-gray);">(${escapeHtmlText(r.role || 'Client')})</span>
                ${statusBadge}
              </div>
              <div style="font-size: 12px; color: var(--text-gray); margin-top: 2px;">
                <span style="color: var(--accent-cyan); font-family: monospace; font-weight: 700;">Order: ${escapeHtmlText(orderId)}</span>
                ${r.customerEmail ? ` • <span style="color: var(--text-dark-gray);">${escapeHtmlText(r.customerEmail)}</span>` : ''}
                • <span style="color: #94a3b8;">${escapeHtmlText(serviceName)}</span>
              </div>
            </div>
          </div>

          <!-- Right: Rating & Date -->
          <div style="text-align: right;">
            <div style="color: #fbbf24; font-size: 16px; letter-spacing: 2px;">
              ${starsHtml}
            </div>
            <div style="font-size: 11px; color: var(--text-dark-gray); margin-top: 3px;">
              ${escapeHtmlText(r.date || 'Recent')}
            </div>
          </div>
        </div>

        <!-- Review Comment -->
        <p style="font-size: 13.5px; color: var(--text-light-gray); line-height: 1.6; margin-bottom: 14px; background: rgba(15, 23, 42, 0.4); padding: 10px 14px; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.04);">
          "${escapeHtmlText(r.comment)}"
        </p>

        <!-- Optional Project Live Link -->
        ${(r.projectUrl || r.project_url) ? `
          <div style="margin-bottom: 12px;">
            <a href="${escapeHtmlText(r.projectUrl || r.project_url)}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px; background: rgba(0, 212, 255, 0.08); border: 1px solid rgba(0, 212, 255, 0.25); border-radius: 6px; color: var(--accent-cyan); font-size: 12px; font-weight: 700; text-decoration: none;">
              🔗 Live Project Link: ${escapeHtmlText(r.projectUrl || r.project_url)} ↗
            </a>
          </div>
        ` : ''}

        <!-- Optional Attached Deliverable Image -->
        ${attachedImg ? `
          <div style="margin-bottom: 14px; display: inline-flex; align-items: center; gap: 10px; padding: 6px 12px; background: rgba(0, 212, 255, 0.05); border: 1px solid rgba(0, 212, 255, 0.2); border-radius: 6px; cursor: pointer;" onclick="openReviewAdminImage('${escapeHtmlText(attachedImg)}', 'Attached Deliverable for ${escapeHtmlText(orderId)}')">
            <img src="${escapeHtmlText(attachedImg)}" alt="Attached Project" style="width: 36px; height: 36px; border-radius: 4px; object-fit: cover; border: 1px solid var(--accent-cyan);">
            <div style="font-size: 12px; color: var(--accent-cyan); font-weight: 600;">
              📷 View Customer Attached Photo ↗
            </div>
          </div>
        ` : ''}

        <!-- Moderation Actions Bar -->
        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px solid var(--border-color); flex-wrap: wrap; gap: 10px;">
          <div style="font-size: 11.5px; color: var(--text-dark-gray);">
            Verified Purchase Status: <strong style="color: #10b981;">✓ Confirmed</strong>
          </div>

          <div style="display: flex; gap: 8px;">
            ${!isApproved ? `
              <button type="button" onclick="approveReview('${revId}')" class="btn btn-primary btn-sm" style="background: linear-gradient(135deg, #059669, #10b981); border-color: #059669; padding: 4px 12px; font-size: 11.5px; font-weight: 700;">
                ✓ Approve &amp; Publish
              </button>
            ` : ''}

            ${!isRejected ? `
              <button type="button" onclick="rejectReview('${revId}')" class="btn btn-secondary btn-sm" style="border-color: rgba(239, 68, 68, 0.4); color: #f87171; padding: 4px 12px; font-size: 11.5px;">
                ✕ Reject (Hide)
              </button>
            ` : ''}

            <button type="button" onclick="deleteReview('${revId}')" class="btn btn-danger btn-sm" style="padding: 4px 10px; font-size: 11.5px;" title="Permanently delete review">
              🗑️ Delete
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}
window.renderAdminReviews = renderAdminReviews;

window.approveReview = async function(reviewId) {
  if (typeof window.updateReviewModerationStatus === 'function') {
    await window.updateReviewModerationStatus(reviewId, 'approved');
  } else {
    const reviews = JSON.parse(localStorage.getItem('app_reviews') || '[]');
    const r = reviews.find(item => item.id === reviewId || item.orderId === reviewId);
    if (r) {
      r.status = 'approved';
      localStorage.setItem('app_reviews', JSON.stringify(reviews));
    }
  }
  showToast('Review approved & published to website! ⭐');
  renderAdminReviews();
};

window.rejectReview = async function(reviewId) {
  if (typeof window.updateReviewModerationStatus === 'function') {
    await window.updateReviewModerationStatus(reviewId, 'rejected');
  } else {
    const reviews = JSON.parse(localStorage.getItem('app_reviews') || '[]');
    const r = reviews.find(item => item.id === reviewId || item.orderId === reviewId);
    if (r) {
      r.status = 'rejected';
      localStorage.setItem('app_reviews', JSON.stringify(reviews));
    }
  }
  showToast('Review status set to Rejected (hidden from public)');
  renderAdminReviews();
};

window.deleteReview = async function(reviewId) {
  if (!confirm('Are you sure you want to permanently delete this customer review?')) return;

  if (typeof window.deleteReviewFromCloud === 'function') {
    await window.deleteReviewFromCloud(reviewId);
  } else {
    let reviews = JSON.parse(localStorage.getItem('app_reviews') || '[]');
    reviews = reviews.filter(r => r.id !== reviewId && r.orderId !== reviewId);
    localStorage.setItem('app_reviews', JSON.stringify(reviews));
  }

  showToast('Review permanently deleted');
  renderAdminReviews();
};

window.openReviewAdminImage = function(url, caption) {
  if (typeof window.openReviewImageLightbox === 'function') {
    window.openReviewImageLightbox(url, caption);
  } else {
    window.open(url, '_blank');
  }
};

// ============================================================================
// 5. Portfolio Showcase & Work Projects Management (My Work & Latest Updates)
// ============================================================================

function getAdminPortfolioProjects() {
  try {
    const raw = localStorage.getItem('ruddranil_portfolio_projects');
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return window.DEFAULT_PORTFOLIO_PROJECTS || [];
}

async function saveAdminPortfolioProjects(projects) {
  localStorage.setItem('ruddranil_portfolio_projects', JSON.stringify(projects));
  await syncProjectsToServer(projects);
  window.dispatchEvent(new CustomEvent('ruddranil_projects_updated'));
}

window.renderAdminProjectsList = function() {
  const container = document.getElementById('adminProjectsGrid');
  const projects = getAdminPortfolioProjects();

  const tabProjectsCount = document.getElementById('tabProjectsCount');
  if (tabProjectsCount) {
    tabProjectsCount.textContent = projects.length.toString();
  }

  // Populate Categories Filter
  const catFilter = document.getElementById('adminProjectCatFilter');
  if (catFilter) {
    const currentVal = catFilter.value;
    const categories = Array.from(new Set(projects.map(p => p.category).filter(Boolean)));
    catFilter.innerHTML = `
      <option value="all">All Categories (${projects.length})</option>
      ${categories.map(c => `<option value="${escapeHtmlText(c)}" ${c === currentVal ? 'selected' : ''}>${escapeHtmlText(c)}</option>`).join('')}
    `;
  }

  filterAdminProjectsList();
};

window.filterAdminProjectsList = function() {
  const container = document.getElementById('adminProjectsGrid');
  if (!container) return;

  const projects = getAdminPortfolioProjects();
  const searchInput = (document.getElementById('adminProjectSearch')?.value || '').toLowerCase().trim();
  const catFilter = document.getElementById('adminProjectCatFilter')?.value || 'all';

  const filtered = projects.filter(p => {
    const matchesSearch = !searchInput || 
      (p.title && p.title.toLowerCase().includes(searchInput)) || 
      (p.description && p.description.toLowerCase().includes(searchInput)) ||
      (p.category && p.category.toLowerCase().includes(searchInput));
    const matchesCat = catFilter === 'all' || p.category === catFilter;
    return matchesSearch && matchesCat;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; background: #080d17; border: 1px dashed var(--border-color); border-radius: 12px;">
        <div style="font-size: 32px; margin-bottom: 8px;">🖼️</div>
        <h4 style="font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 6px;">No Portfolio Projects Found</h4>
        <p style="font-size: 13px; color: var(--text-gray); margin-bottom: 16px;">
          ${searchInput ? 'No projects match your search keywords.' : 'No projects posted yet. Click "+ Post Project to Portfolio" to add your first work!'}
        </p>
        <button onclick="openPostProjectModal()" class="btn btn-primary btn-sm">
          ➕ Post Project to Portfolio
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(p => {
    const pid = p.id;
    const isVideo = typeof window.isVideoMediaUrl === 'function' ? window.isVideoMediaUrl(p.mediaUrl) : false;
    const safeTitle = escapeHtmlText(p.title);
    const safeCat = escapeHtmlText(p.category || 'Creative Work');
    const safeDesc = escapeHtmlText(p.description || '');
    const safeMedia = p.mediaUrl || '';

    // Count live comments & likes
    let likeCount = typeof window.getProjectLikeCount === 'function' ? window.getProjectLikeCount(pid, p.likesCount || 10) : (p.likesCount || 10);
    let commentCount = p.commentsCount || 0;
    try {
      const commStore = JSON.parse(localStorage.getItem('ruddranil_portfolio_comments_v1') || '{}');
      if (commStore[pid] && Array.isArray(commStore[pid])) {
        commentCount = commStore[pid].length;
      }
    } catch (e) {}

    // Thumbnail markup
    let thumbHtml = '';
    if (isVideo) {
      if (safeMedia.includes('youtube.com') || safeMedia.includes('youtu.be')) {
        const match = safeMedia.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
        if (match && match[1]) {
          thumbHtml = `<img src="https://img.youtube.com/vi/${match[1]}/hqdefault.jpg" alt="${safeTitle}">`;
        } else {
          thumbHtml = `<div style="color: var(--accent-cyan); font-weight: 700; font-size: 13px;">▶ YouTube Video</div>`;
        }
      } else {
        thumbHtml = `<video src="${safeMedia}" muted playsinline preload="metadata"></video>`;
      }
    } else if (safeMedia) {
      thumbHtml = `<img src="${safeMedia}" alt="${safeTitle}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80';">`;
    } else {
      thumbHtml = `<div style="color: var(--text-dark-gray); font-size: 12px;">No Preview Available</div>`;
    }

    return `
      <div class="admin-project-card" id="admin-card-${pid}">
        <div class="admin-project-thumb-box">
          <span class="work-category-badge">${safeCat}</span>
          ${isVideo ? '<span class="work-media-badge">▶ Video</span>' : '<span class="work-media-badge">🖼 Image</span>'}
          ${thumbHtml}
        </div>
        <div style="padding: 16px; display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px; gap: 8px;">
              <h4 style="font-size: 16px; font-weight: 700; color: #fff; margin: 0; line-height: 1.3;">${safeTitle}</h4>
            </div>
            <p style="font-size: 12.5px; color: var(--text-gray); line-height: 1.5; margin-bottom: 14px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
              ${safeDesc}
            </p>
          </div>

          <div>
            <!-- Live Engagement Stats -->
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 10px; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-color); border-radius: 6px; font-size: 11.5px; color: var(--text-gray); margin-bottom: 12px;">
              <span>❤️ <strong>${likeCount}</strong> Likes</span>
              <span>💬 <strong>${commentCount}</strong> Comments</span>
              <span style="color: var(--accent-cyan);">${escapeHtmlText(p.badge || 'Active')}</span>
            </div>

            <!-- Action Buttons -->
            <div style="display: flex; gap: 6px;">
              <button type="button" onclick="openModal('${pid}')" class="btn btn-secondary btn-sm" style="flex: 1; padding: 6px 8px; font-size: 11.5px; justify-content: center;" title="View Live Preview">
                👁️ View
              </button>
              <button type="button" onclick="openEditProjectModal('${pid}')" class="btn btn-primary btn-sm" style="flex: 1; padding: 6px 8px; font-size: 11.5px; justify-content: center; background: #0284c7;">
                ✏️ Edit
              </button>
              <button type="button" onclick="deletePortfolioProject('${pid}')" class="btn btn-danger btn-sm" style="padding: 6px 10px; font-size: 11.5px; justify-content: center;" title="Delete Project">
                🗑️
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
};

// Live Media Preview helper in modals
window.previewMediaInModal = function(url, boxId) {
  const box = document.getElementById(boxId);
  if (!box) return;

  let clean = (url || '').trim();
  if (!clean) {
    box.innerHTML = '<span>Media Preview will appear here</span>';
    return;
  }
  if (clean.startsWith('public/')) {
    clean = '/' + clean;
  }

  const isVideo = typeof window.isVideoMediaUrl === 'function' ? window.isVideoMediaUrl(clean) : false;

  if (isVideo) {
    if (clean.includes('youtube.com') || clean.includes('youtu.be')) {
      const embedUrl = typeof window.getYouTubeEmbedUrl === 'function' ? window.getYouTubeEmbedUrl(clean) : clean;
      box.innerHTML = `<iframe src="${embedUrl}" style="width:100%;height:100%;border:none;" allowfullscreen></iframe>`;
    } else {
      box.innerHTML = `<video src="${clean}" controls playsinline style="width:100%;height:100%;object-fit:cover;"></video>`;
    }
  } else {
    box.innerHTML = '';
    const img = document.createElement('img');
    img.src = clean;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.onerror = function() {
      if (box.contains(img)) {
        box.innerHTML = '<span style="color:#ef4444;font-size:12px;">Failed to load image preview</span>';
      }
    };
    box.appendChild(img);
  }
};

// Category Input Toggles
window.toggleCustomCategoryInput = function() {
  const wrap = document.getElementById('customCategoryInputWrap');
  if (wrap) {
    const isHidden = wrap.style.display === 'none';
    wrap.style.display = isHidden ? 'block' : 'none';
    if (isHidden) {
      document.getElementById('newProjectCustomCategory')?.focus();
    }
  }
};

window.handleProjectCategoryChange = function(val) {
  const wrap = document.getElementById('customCategoryInputWrap');
  if (wrap) {
    wrap.style.display = val === '__NEW__' ? 'block' : 'none';
    if (val === '__NEW__') {
      document.getElementById('newProjectCustomCategory')?.focus();
    }
  }
};

window.toggleEditCustomCategoryInput = function() {
  const wrap = document.getElementById('editCustomCategoryInputWrap');
  if (wrap) {
    const isHidden = wrap.style.display === 'none';
    wrap.style.display = isHidden ? 'block' : 'none';
    if (isHidden) {
      document.getElementById('editProjectCustomCategory')?.focus();
    }
  }
};

window.handleEditProjectCategoryChange = function(val) {
  const wrap = document.getElementById('editCustomCategoryInputWrap');
  if (wrap) {
    wrap.style.display = val === '__NEW__' ? 'block' : 'none';
    if (val === '__NEW__') {
      document.getElementById('editProjectCustomCategory')?.focus();
    }
  }
};

// Modal Open/Close: Post Project
window.openPostProjectModal = function() {
  const modal = document.getElementById('postProjectModal');
  const form = document.getElementById('postProjectForm');
  if (form) form.reset();

  const previewBox = document.getElementById('postProjectMediaPreviewBox');
  if (previewBox) previewBox.innerHTML = '<span>Media Preview will appear here</span>';

  const customWrap = document.getElementById('customCategoryInputWrap');
  if (customWrap) customWrap.style.display = 'none';

  // Synchronize category select with any custom categories in projects
  const select = document.getElementById('newProjectCategorySelect');
  if (select) {
    const projects = getAdminPortfolioProjects();
    const categories = Array.from(new Set([
      'Web Development',
      'Digital Marketing',
      'Creative Design',
      'Video Production',
      'Brand Identity',
      ...projects.map(p => p.category).filter(Boolean)
    ]));
    select.innerHTML = `
      ${categories.map(c => `<option value="${escapeHtmlText(c)}">${escapeHtmlText(c)}</option>`).join('')}
      <option value="__NEW__">+ Add Custom Category...</option>
    `;
  }

  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
};

window.closePostProjectModal = function() {
  const modal = document.getElementById('postProjectModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
};

// Handle Post Project Form Submit
window.handlePostProjectSubmit = async function(e) {
  e.preventDefault();
  const btn = document.getElementById('btnPublishProject');
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Publishing...';
  }

  const title = document.getElementById('newProjectTitle')?.value.trim();
  const catSelect = document.getElementById('newProjectCategorySelect')?.value;
  const customCat = document.getElementById('newProjectCustomCategory')?.value.trim();
  let mediaUrl = document.getElementById('newProjectMediaUrl')?.value.trim() || '';
  if (mediaUrl.startsWith('public/')) {
    mediaUrl = '/' + mediaUrl;
  }
  const desc = document.getElementById('newProjectDesc')?.value.trim();
  const serviceLink = document.getElementById('newProjectServiceLink')?.value || 'Website Design';

  const category = (catSelect === '__NEW__' && customCat) ? customCat : (customCat || catSelect || 'Creative Work');
  const catSlug = category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const isVideo = typeof window.isVideoMediaUrl === 'function' ? window.isVideoMediaUrl(mediaUrl) : false;

  if (!title || !mediaUrl || !desc) {
    showToast('Please fill all required project fields', 'error');
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Publish Project';
    }
    return;
  }

  const newPid = 'proj-' + Date.now();
  const newProject = {
    id: newPid,
    title,
    category,
    categorySlug: catSlug,
    mediaUrl,
    mediaType: isVideo ? 'video' : 'image',
    description: desc,
    details: desc,
    author: 'Ruddranil',
    badge: 'Live Showcase',
    likesCount: 1,
    commentsCount: 0,
    serviceSlug: serviceLink,
    createdAt: new Date().toISOString()
  };

  const projects = getAdminPortfolioProjects();
  projects.unshift(newProject);
  await saveAdminPortfolioProjects(projects);

  if (btn) {
    btn.disabled = false;
    btn.textContent = 'Publish Project';
  }

  closePostProjectModal();
  showToast(`Project "${title}" published to portfolio showcase! 🚀`);
  renderAdminProjectsList();
};

// Modal Open/Close: Edit Project
window.openEditProjectModal = function(projectId) {
  const projects = getAdminPortfolioProjects();
  const p = projects.find(item => item.id === projectId);
  if (!p) {
    showToast('Project not found', 'error');
    return;
  }

  document.getElementById('editProjectId').value = p.id;
  document.getElementById('editProjectTitle').value = p.title || '';
  document.getElementById('editProjectMediaUrl').value = p.mediaUrl || '';
  document.getElementById('editProjectDesc').value = p.details || p.description || '';

  const select = document.getElementById('editProjectCategorySelect');
  if (select) {
    const categories = Array.from(new Set([
      'Web Development',
      'Digital Marketing',
      'Creative Design',
      'Video Production',
      'Brand Identity',
      p.category,
      ...projects.map(item => item.category).filter(Boolean)
    ]));
    select.innerHTML = `
      ${categories.map(c => `<option value="${escapeHtmlText(c)}" ${c === p.category ? 'selected' : ''}>${escapeHtmlText(c)}</option>`).join('')}
      <option value="__NEW__">+ Add Custom Category...</option>
    `;
  }

  const serviceSelect = document.getElementById('editProjectServiceLink');
  if (serviceSelect && p.serviceSlug) {
    serviceSelect.value = p.serviceSlug;
  }

  previewMediaInModal(p.mediaUrl, 'editProjectMediaPreviewBox');

  const customWrap = document.getElementById('editCustomCategoryInputWrap');
  if (customWrap) customWrap.style.display = 'none';

  const modal = document.getElementById('editProjectModal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
};

window.closeEditProjectModal = function() {
  const modal = document.getElementById('editProjectModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
};

// Handle Save Edit Project Form Submit
window.handleSaveEditProjectSubmit = async function(e) {
  e.preventDefault();
  const pid = document.getElementById('editProjectId')?.value;
  const title = document.getElementById('editProjectTitle')?.value.trim();
  const catSelect = document.getElementById('editProjectCategorySelect')?.value;
  const customCat = document.getElementById('editProjectCustomCategory')?.value.trim();
  let mediaUrl = document.getElementById('editProjectMediaUrl')?.value.trim() || '';
  if (mediaUrl.startsWith('public/')) {
    mediaUrl = '/' + mediaUrl;
  }
  const desc = document.getElementById('editProjectDesc')?.value.trim();
  const serviceLink = document.getElementById('editProjectServiceLink')?.value || 'Website Design';

  const category = (catSelect === '__NEW__' && customCat) ? customCat : (customCat || catSelect || 'Creative Work');
  const isVideo = typeof window.isVideoMediaUrl === 'function' ? window.isVideoMediaUrl(mediaUrl) : false;

  const projects = getAdminPortfolioProjects();
  const p = projects.find(item => item.id === pid);
  if (!p) {
    showToast('Project not found', 'error');
    return;
  }

  p.title = title;
  p.category = category;
  p.categorySlug = category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  p.mediaUrl = mediaUrl;
  p.mediaType = isVideo ? 'video' : 'image';
  p.description = desc;
  p.details = desc;
  p.serviceSlug = serviceLink;
  p.updatedAt = new Date().toISOString();

  await saveAdminPortfolioProjects(projects);
  closeEditProjectModal();
  showToast(`Project "${title}" updated successfully!`);
  renderAdminProjectsList();
};

// Delete Portfolio Project
window.deletePortfolioProject = async function(projectId) {
  const projects = getAdminPortfolioProjects();
  const p = projects.find(item => item.id === projectId);
  const title = p ? p.title : projectId;

  if (!confirm(`Are you sure you want to delete "${title}" from the portfolio showcase?`)) {
    return;
  }

  const updated = projects.filter(item => item.id !== projectId);
  await saveAdminPortfolioProjects(updated);
  try {
    await fetch(`/api/projects/${projectId}`, { method: 'DELETE' });
  } catch (e) {}
  showToast(`Project "${title}" removed from showcase`);
  renderAdminProjectsList();
};

// ==========================================================================
// FIVERR-STYLE ORDER DELIVERY & REVISION ADMIN CONTROLLER
// ==========================================================================
let stagedDeliveryFiles = [];

function formatFileSizeHuman(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function getFileIconByType(name, type) {
  const n = (name || '').toLowerCase();
  if (n.endsWith('.zip') || n.endsWith('.rar') || n.endsWith('.7z')) return '📦';
  if (n.endsWith('.pdf')) return '📄';
  if (n.endsWith('.png') || n.endsWith('.jpg') || n.endsWith('.jpeg') || n.endsWith('.svg') || n.endsWith('.webp')) return '🖼️';
  if (n.endsWith('.fig') || n.includes('figma')) return '🎨';
  if (n.endsWith('.xlsx') || n.endsWith('.xls') || n.endsWith('.csv')) return '📊';
  if (n.endsWith('.mp4') || n.endsWith('.mov')) return '🎬';
  return '📁';
}

window.openDeliverWorkModal = function(orderId) {
  const orders = JSON.parse(localStorage.getItem('ruddranil_orders') || '[]');
  const order = orders.find(o => o.id === orderId);
  if (!order) {
    showToast('Order not found', 'error');
    return;
  }

  const modal = document.getElementById('deliverWorkModal');
  if (!modal) return;

  document.getElementById('deliverOrderId').value = order.id;
  document.getElementById('deliverModalOrderId').textContent = '#' + order.id.replace(/^#/, '');
  document.getElementById('deliverModalClientName').textContent = order.customerName || 'Client';
  document.getElementById('deliverModalService').textContent = order.service || 'Service';

  // Compute delivery version
  const currentDeliveries = Array.isArray(order.deliveries) ? order.deliveries : (order.delivery ? [order.delivery] : []);
  const nextVer = currentDeliveries.length + 1;
  const isRevision = order.status === 'In Revision';
  
  const verTag = document.getElementById('deliverModalVersionTag');
  if (verTag) {
    verTag.textContent = isRevision ? `Revision Delivery #${nextVer}` : `Delivery #${nextVer}`;
  }

  const msgInput = document.getElementById('deliveryMessageInput');
  if (msgInput) {
    if (order.delivery && order.delivery.message) {
      msgInput.value = isRevision 
        ? `Hi ${order.customerName || 'there'}! I have completed all the requested revisions. Please check out the updated deliverables below!`
        : order.delivery.message;
    } else {
      msgInput.value = `Hi ${order.customerName || 'there'}! I am thrilled to deliver your finished project. Please review the attached deliverables and let me know your thoughts. If everything looks great, please accept the delivery and leave a review!`;
    }
  }

  stagedDeliveryFiles = [];
  renderStagedDeliveryFiles();

  // Populate links
  const linksContainer = document.getElementById('deliveryLinksContainer');
  if (linksContainer) {
    linksContainer.innerHTML = '';
    if (order.delivery && Array.isArray(order.delivery.links) && order.delivery.links.length > 0) {
      order.delivery.links.forEach(l => {
        window.addDeliveryLinkRow(l.title, l.url);
      });
    } else {
      window.addDeliveryLinkRow('Google Drive Assets', '');
      window.addDeliveryLinkRow('Live Website / Preview', '');
    }
  }

  modal.style.display = 'flex';
};

window.closeDeliverWorkModal = function() {
  const modal = document.getElementById('deliverWorkModal');
  if (modal) modal.style.display = 'none';
  stagedDeliveryFiles = [];
};

window.handleDeliveryFilesSelected = function(files) {
  if (!files || files.length === 0) return;
  Array.from(files).forEach(file => {
    const reader = new FileReader();
    reader.onload = function(e) {
      stagedDeliveryFiles.push({
        name: file.name,
        size: formatFileSizeHuman(file.size),
        rawSize: file.size,
        type: file.type || 'application/octet-stream',
        dataUrl: e.target.result
      });
      renderStagedDeliveryFiles();
    };
    if (file.size > 25 * 1024 * 1024) {
      showToast(`Notice: "${file.name}" is large (>25MB). You can also share a Google Drive link below!`, 'info');
    }
    reader.readAsDataURL(file);
  });
};

window.handleDeliveryFileDrop = function(e) {
  e.preventDefault();
  const dt = e.dataTransfer;
  if (dt && dt.files && dt.files.length > 0) {
    window.handleDeliveryFilesSelected(dt.files);
  }
};

window.removeStagedDeliveryFile = function(index) {
  stagedDeliveryFiles.splice(index, 1);
  renderStagedDeliveryFiles();
};

function renderStagedDeliveryFiles() {
  const container = document.getElementById('stagedDeliveryFilesList');
  if (!container) return;

  if (stagedDeliveryFiles.length === 0) {
    container.innerHTML = '<div style="font-size: 12px; color: var(--text-dark-gray); font-style: italic;">No files attached yet. (Optional if providing live links)</div>';
    return;
  }

  container.innerHTML = stagedDeliveryFiles.map((file, idx) => `
    <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; padding: 8px 12px; font-size: 13px;">
      <div style="display: flex; align-items: center; gap: 8px; overflow: hidden;">
        <span style="font-size: 18px;">${getFileIconByType(file.name, file.type)}</span>
        <span style="font-weight: 700; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 320px;">${escapeHtmlText(file.name)}</span>
        <span style="font-size: 11px; color: var(--accent-cyan); font-weight: 600;">(${file.size})</span>
      </div>
      <button type="button" onclick="removeStagedDeliveryFile(${idx})" class="btn btn-sm" style="background: rgba(239, 68, 68, 0.2); color: #f87171; border: none; padding: 2px 8px; border-radius: 4px; font-size: 11px; cursor: pointer;">
        ✕ Remove
      </button>
    </div>
  `).join('');
}

window.addDeliveryLinkRow = function(title = '', url = '') {
  const container = document.getElementById('deliveryLinksContainer');
  if (!container) return;

  const row = document.createElement('div');
  row.className = 'delivery-link-row';
  row.style.display = 'grid';
  row.style.gridTemplateColumns = '140px 1fr auto';
  row.style.gap = '8px';
  row.style.alignItems = 'center';

  row.innerHTML = `
    <input type="text" class="form-input link-title-input" placeholder="Title (e.g. Drive)" value="${escapeHtmlText(title)}" style="padding: 7px 10px; font-size: 12px;">
    <input type="url" class="form-input link-url-input" placeholder="https://..." value="${escapeHtmlText(url)}" style="padding: 7px 10px; font-size: 12px;">
    <button type="button" onclick="removeDeliveryLinkRow(this)" class="btn btn-sm" style="background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3); padding: 6px 10px; border-radius: 6px; cursor: pointer;" title="Remove link">✕</button>
  `;
  container.appendChild(row);
};

window.removeDeliveryLinkRow = function(btn) {
  const row = btn.closest('.delivery-link-row');
  if (row) row.remove();
};

window.handleDeliverWorkSubmit = async function(e) {
  e.preventDefault();
  const orderId = document.getElementById('deliverOrderId')?.value;
  const message = document.getElementById('deliveryMessageInput')?.value.trim();
  if (!orderId || !message) {
    showToast('Please provide a delivery message', 'error');
    return;
  }

  // Collect links
  const links = [];
  const rows = document.querySelectorAll('.delivery-link-row');
  rows.forEach(r => {
    const t = r.querySelector('.link-title-input')?.value.trim();
    const u = r.querySelector('.link-url-input')?.value.trim();
    if (u) {
      links.push({
        title: t || 'Project Resource Link',
        url: u
      });
    }
  });

  const orders = JSON.parse(localStorage.getItem('ruddranil_orders') || '[]');
  const order = orders.find(o => o.id === orderId);
  if (!order) {
    showToast('Order not found', 'error');
    return;
  }

  const existingDeliveries = Array.isArray(order.deliveries) ? order.deliveries : (order.delivery ? [order.delivery] : []);
  const ver = existingDeliveries.length + 1;

  let finalFiles = [...stagedDeliveryFiles];
  if (finalFiles.length === 0 && order.delivery && Array.isArray(order.delivery.files)) {
    finalFiles = order.delivery.files;
  }

  const deliveryObj = {
    version: ver,
    deliveredAt: new Date().toISOString(),
    sellerName: 'Ruddranil',
    message: message,
    files: finalFiles,
    links: links
  };

  const updatedDeliveries = [...existingDeliveries, deliveryObj];

  order.delivery = deliveryObj;
  order.deliveries = updatedDeliveries;
  order.status = 'Delivered';
  order.progress = 100;
  order.lastUpdated = 'Just now';
  order.clientAccepted = false;

  localStorage.setItem('ruddranil_orders', JSON.stringify(orders));

  try {
    await fetch(`/api/orders/${encodeURIComponent(orderId)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'Delivered',
        progress: 100,
        delivery: deliveryObj,
        deliveries: updatedDeliveries,
        clientAccepted: false,
        lastUpdated: new Date().toISOString()
      })
    });
  } catch (err) {}

  if (typeof window.updateOrderStatusInCloud === 'function') {
    await window.updateOrderStatusInCloud(orderId, 'Delivered', 100);
  }

  closeDeliverWorkModal();
  showToast(`🎉 Order #${orderId} delivered to client! (Delivery v${ver})`);
  renderAdminDashboard();
};

window.viewClientRevision = function(orderId) {
  const orders = JSON.parse(localStorage.getItem('ruddranil_orders') || '[]');
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  const modal = document.getElementById('viewRevisionsModal');
  const details = document.getElementById('revisionDetailsContent');
  const idEl = document.getElementById('revisionModalOrderId');
  const deliverBtn = document.getElementById('btnDeliverRevisedFromModal');

  if (idEl) idEl.textContent = '#' + order.id.replace(/^#/, '');

  if (deliverBtn) {
    deliverBtn.onclick = function() {
      closeViewRevisionsModal();
      window.openDeliverWorkModal(order.id);
    };
  }

  const revisions = Array.isArray(order.revisions) ? order.revisions : [];
  if (revisions.length === 0) {
    details.innerHTML = `
      <div style="font-size: 13.5px; color: #e2e8f0;">
        The client requested revisions for this order. Please reach out or review project communication.
      </div>
    `;
  } else {
    details.innerHTML = revisions.map((rev, i) => `
      <div style="padding: 12px 14px; background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(245, 158, 11, 0.25); border-radius: 8px; margin-bottom: 10px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <strong style="color: #fbbf24; font-size: 13px;">Revision Request #${rev.revisionNumber || (i + 1)}</strong>
          <span style="font-size: 11px; color: var(--text-dark-gray);">${rev.requestedAt ? new Date(rev.requestedAt).toLocaleString() : 'Recently'}</span>
        </div>
        <div style="font-size: 13.5px; color: #fff; line-height: 1.6; white-space: pre-line;">${escapeHtmlText(rev.note || 'No specific notes provided.')}</div>
      </div>
    `).join('');
  }

  if (modal) modal.style.display = 'flex';
};

window.closeViewRevisionsModal = function() {
  const modal = document.getElementById('viewRevisionsModal');
  if (modal) modal.style.display = 'none';
};

