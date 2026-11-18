import express from 'express';
import type { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, 'data');
const SERVICES_FILE = path.join(DATA_DIR, 'services.json');
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const REVIEWS_FILE = path.join(DATA_DIR, 'reviews.json');
const COUPONS_FILE = path.join(DATA_DIR, 'coupons.json');

const DEFAULT_COUPONS = [
  { code: 'RUD20', type: 'percentage', value: 20, minOrder: 50, active: true, usageCount: 14 },
  { code: 'WELCOME10', type: 'fixed', value: 10, minOrder: 30, active: true, usageCount: 29 },
  { code: 'VIP25', type: 'percentage', value: 25, minOrder: 100, active: true, usageCount: 6 }
];

const DEFAULT_ORDERS = [
  {
    id: 'RUD-20261014-54A82697',
    customerName: 'Sanjit',
    customerEmail: 'sanjitrooy733@gmail.com',
    service: 'Facebook Marketing',
    serviceSlug: 'facebook-marketing',
    packageTier: 'standard',
    packageName: 'Standard Growth',
    packagePrice: 60,
    subtotal: 60,
    discountAmount: 0,
    finalTotal: 60,
    deliveryDays: 5,
    isExpress: false,
    expressFee: 0,
    selectedAddons: [],
    addonsTotal: 0,
    couponCode: '',
    request: 'Scale high-converting Meta campaign for e-commerce store with custom pixel event tracking.',
    referenceFiles: [],
    status: 'Pending',
    progress: 0,
    price: '$60.00',
    orderDate: 'Oct 14, 2026',
    lastUpdated: 'Just now'
  },
  {
    id: 'RUD-2026-001',
    customerName: 'Sanjit',
    customerEmail: 'sanjitrooy733@gmail.com',
    service: 'Website Design',
    serviceSlug: 'website-design',
    packageTier: 'standard',
    packageName: 'Complete Business Website',
    packagePrice: 220,
    subtotal: 220,
    discountAmount: 0,
    finalTotal: 220,
    deliveryDays: 12,
    isExpress: false,
    expressFee: 0,
    selectedAddons: [],
    addonsTotal: 0,
    couponCode: '',
    request: 'Build full responsive website for agency with dark/light mode and SEO optimization.',
    referenceFiles: [],
    status: 'In Progress',
    progress: 60,
    price: '$220.00',
    orderDate: 'Oct 20, 2026',
    lastUpdated: 'Just now'
  }
];

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readJsonFile<T>(filePath: string, fallback: T): T {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2), 'utf-8');
      return fallback;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as T;
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return fallback;
  }
}

function writeJsonFile<T>(filePath: string, data: T): boolean {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
    return false;
  }
}

async function startServer() {
  const app = express();
  // AI Studio Dev server must always run on port 3000
  const PORT = 3000;
  const isProduction = process.env.NODE_ENV === 'production';

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // ==========================================
  // SUPABASE AUTH & ADMIN VERIFICATION HELPERS
  // ==========================================
  const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://kzkqkrxujhqppsvitgqf.supabase.co';
  const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_lFQxQnei2d1a2gW_PTnTwg_UbluQF6a';
  const ADMIN_EMAIL = 'sanjitrooy733@gmail.com';

  interface VerifiedUser {
    id: string;
    email: string;
    isAdmin: boolean;
  }

  const tokenCache = new Map<string, { user: VerifiedUser; expiresAt: number }>();

  async function verifyBearerUser(req: Request): Promise<VerifiedUser | null> {
    const authHeader = String(req.headers.authorization || '');
    const match = authHeader.match(/^Bearer\s+(.+)$/i);
    if (!match || !match[1]) return null;
    const token = match[1].trim();
    if (!token) return null;

    const cached = tokenCache.get(token);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.user;
    }

    try {
      const resp = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${token}`
        }
      });
      if (!resp.ok) return null;
      const u: any = await resp.json();
      if (!u || !u.id) return null;
      const email = String(u.email || '').trim().toLowerCase();
      const isAdmin = email === ADMIN_EMAIL || u.app_metadata?.role === 'admin';
      const verified: VerifiedUser = { id: String(u.id), email, isAdmin };
      tokenCache.set(token, { user: verified, expiresAt: Date.now() + 30_000 });
      return verified;
    } catch {
      return null;
    }
  }

  async function requireAdmin(req: Request, res: Response): Promise<VerifiedUser | null> {
    const user = await verifyBearerUser(req);
    if (!user || !user.isAdmin) {
      res.status(401).json({ error: 'Unauthorized: Verified Supabase admin session required.' });
      return null;
    }
    return user;
  }

  // ==========================================
  // SERVICES API (Persistent across all devices)
  // ==========================================
  app.get('/api/services', (_req: Request, res: Response) => {
    const services = readJsonFile<any[]>(SERVICES_FILE, []);
    res.json(services);
  });

  app.post('/api/services', async (req: Request, res: Response) => {
    if (!(await requireAdmin(req, res))) return;
    try {
      const incoming = req.body;
      let services = readJsonFile<any[]>(SERVICES_FILE, []);

      if (Array.isArray(incoming)) {
        services = incoming;
      } else if (incoming && incoming.id) {
        const idx = services.findIndex(s => s.id === incoming.id);
        if (idx >= 0) {
          services[idx] = { ...services[idx], ...incoming };
        } else {
          services.push(incoming);
        }
      } else if (incoming && incoming.service && incoming.service.id) {
        const s = incoming.service;
        const idx = services.findIndex(item => item.id === s.id);
        if (idx >= 0) {
          services[idx] = { ...services[idx], ...s };
        } else {
          services.push(s);
        }
      }

      writeJsonFile(SERVICES_FILE, services);
      res.json({ success: true, count: services.length, services });
    } catch (err) {
      console.error('Error saving services:', err);
      res.status(500).json({ error: 'Failed to save services' });
    }
  });

  app.delete('/api/services/:id', async (req: Request, res: Response) => {
    if (!(await requireAdmin(req, res))) return;
    try {
      const { id } = req.params;
      let services = readJsonFile<any[]>(SERVICES_FILE, []);
      services = services.filter(s => s.id !== id);
      writeJsonFile(SERVICES_FILE, services);
      res.json({ success: true, count: services.length });
    } catch (err) {
      console.error('Error deleting service:', err);
      res.status(500).json({ error: 'Failed to delete service' });
    }
  });

  // ==========================================
  // PORTFOLIO PROJECTS API (Cross-device permanent showcase)
  // ==========================================
  app.get('/api/projects', (_req: Request, res: Response) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    const projects = readJsonFile<any[]>(PROJECTS_FILE, []);
    res.json(projects);
  });

  app.post('/api/projects', async (req: Request, res: Response) => {
    if (!(await requireAdmin(req, res))) return;
    try {
      const incoming = req.body;
      let projects = readJsonFile<any[]>(PROJECTS_FILE, []);

      if (Array.isArray(incoming)) {
        projects = incoming;
      } else if (incoming && incoming.id) {
        const idx = projects.findIndex(p => p.id === incoming.id);
        if (idx >= 0) {
          projects[idx] = { ...projects[idx], ...incoming };
        } else {
          projects.unshift(incoming);
        }
      } else if (incoming && incoming.project && incoming.project.id) {
        const p = incoming.project;
        const idx = projects.findIndex(item => item.id === p.id);
        if (idx >= 0) {
          projects[idx] = { ...projects[idx], ...p };
        } else {
          projects.unshift(p);
        }
      }

      writeJsonFile(PROJECTS_FILE, projects);
      res.json({ success: true, count: projects.length, projects });
    } catch (err) {
      console.error('Error saving projects:', err);
      res.status(500).json({ error: 'Failed to save projects' });
    }
  });

  app.delete('/api/projects/:id', async (req: Request, res: Response) => {
    if (!(await requireAdmin(req, res))) return;
    try {
      const { id } = req.params;
      let projects = readJsonFile<any[]>(PROJECTS_FILE, []);
      projects = projects.filter(p => p.id !== id);
      writeJsonFile(PROJECTS_FILE, projects);
      res.json({ success: true, count: projects.length });
    } catch (err) {
      console.error('Error deleting project:', err);
      res.status(500).json({ error: 'Failed to delete project' });
    }
  });

  // ==========================================
  // ORDERS API (Permanent cross-device client & admin synchronization)
  // ==========================================
  app.get('/api/orders', async (req: Request, res: Response) => {
    const user = await verifyBearerUser(req);
    if (!user) {
      return res.status(401).json({ error: 'Authentication required to list orders.' });
    }
    const orders = readJsonFile<any[]>(ORDERS_FILE, DEFAULT_ORDERS);
    if (user.isAdmin) {
      return res.json(orders);
    }
    const scoped = orders.filter(o =>
      (o.customerId && o.customerId === user.id) ||
      (o.customerEmail && String(o.customerEmail).toLowerCase() === user.email)
    );
    res.json(scoped);
  });

  app.get('/api/orders/:id', (req: Request, res: Response) => {
    const rawId = (req.params.id || '').trim();
    const cleanId = rawId.replace(/^#/, '').toLowerCase();
    const orders = readJsonFile<any[]>(ORDERS_FILE, DEFAULT_ORDERS);
    const found = orders.find(o => 
      (o.id || '').toLowerCase() === cleanId || 
      (o.id || '').toLowerCase().replace(/^#/, '') === cleanId
    );
    if (found) {
      return res.json(found);
    }
    return res.status(404).json({ error: 'Order not found' });
  });

  app.post('/api/orders', async (req: Request, res: Response) => {
    try {
      const incoming = req.body;
      const user = await verifyBearerUser(req);
      let orders = readJsonFile<any[]>(ORDERS_FILE, DEFAULT_ORDERS);

      if (Array.isArray(incoming)) {
        if (!user?.isAdmin) {
          return res.status(401).json({ error: 'Admin authentication required for bulk order sync.' });
        }
        incoming.forEach(inc => {
          if (!inc || !inc.id) return;
          const cleanIncId = String(inc.id).replace(/^#/, '').toLowerCase();
          const idx = orders.findIndex(o => 
            (o.id || '').toLowerCase() === cleanIncId || 
            (o.id || '').toLowerCase().replace(/^#/, '') === cleanIncId
          );
          if (idx >= 0) {
            orders[idx] = { ...orders[idx], ...inc };
          } else {
            orders.unshift(inc);
          }
        });
      } else if (incoming && incoming.id) {
        const cleanIncId = String(incoming.id).replace(/^#/, '').toLowerCase();
        const idx = orders.findIndex(o => 
          (o.id || '').toLowerCase() === cleanIncId || 
          (o.id || '').toLowerCase().replace(/^#/, '') === cleanIncId
        );
        if (idx >= 0) {
          const existing = orders[idx];
          const isOwner = user && (
            (existing.customerId && existing.customerId === user.id) ||
            (existing.customerEmail && String(existing.customerEmail).toLowerCase() === user.email)
          );
          if (!user?.isAdmin && !isOwner) {
            return res.status(403).json({ error: 'Cannot overwrite an existing order.' });
          }
          orders[idx] = { ...existing, ...incoming };
        } else {
          orders.unshift(incoming);
        }
      }

      writeJsonFile(ORDERS_FILE, orders);
      res.json({ success: true, count: orders.length });
    } catch (err) {
      console.error('Error saving orders:', err);
      res.status(500).json({ error: 'Failed to save orders' });
    }
  });

  app.patch('/api/orders/:id', async (req: Request, res: Response) => {
    try {
      const rawId = (req.params.id || '').trim();
      const cleanId = rawId.replace(/^#/, '').toLowerCase();
      const updates = req.body || {};
      const user = await verifyBearerUser(req);
      let orders = readJsonFile<any[]>(ORDERS_FILE, DEFAULT_ORDERS);
      const idx = orders.findIndex(o => 
        (o.id || '').toLowerCase() === cleanId || 
        (o.id || '').toLowerCase().replace(/^#/, '') === cleanId
      );

      // Non-admin callers (tracking portal client acceptance/revision) may only modify tracking/revision fields
      const safeUpdates = user?.isAdmin ? updates : {
        ...(updates.status === 'Completed' || updates.status === 'In Revision' ? { status: updates.status } : {}),
        ...(typeof updates.progress === 'number' && (updates.status === 'Completed' || updates.status === 'In Revision') ? { progress: updates.progress } : {}),
        ...(Array.isArray(updates.revisions) ? { revisions: updates.revisions } : {}),
        ...(updates.delivery && typeof updates.delivery === 'object' && updates.delivery.accepted ? { delivery: updates.delivery } : {}),
        lastUpdated: updates.lastUpdated || 'Just now'
      };

      if (idx >= 0) {
        orders[idx] = {
          ...orders[idx],
          ...safeUpdates,
          lastUpdated: safeUpdates.lastUpdated || 'Just now'
        };
        writeJsonFile(ORDERS_FILE, orders);
        res.json({ success: true, order: orders[idx] });
      } else {
        if (!user?.isAdmin) {
          return res.status(404).json({ error: 'Order not found' });
        }
        const newOrderObj = { id: rawId, ...safeUpdates, lastUpdated: 'Just now' };
        orders.unshift(newOrderObj);
        writeJsonFile(ORDERS_FILE, orders);
        res.json({ success: true, order: newOrderObj });
      }
    } catch (err) {
      console.error('Error updating order:', err);
      res.status(500).json({ error: 'Failed to update order' });
    }
  });

  app.delete('/api/orders/:id', async (req: Request, res: Response) => {
    if (!(await requireAdmin(req, res))) return;
    try {
      const { id } = req.params;
      let orders = readJsonFile<any[]>(ORDERS_FILE, DEFAULT_ORDERS);
      orders = orders.filter(o => o.id !== id);
      writeJsonFile(ORDERS_FILE, orders);
      res.json({ success: true, count: orders.length });
    } catch (err) {
      console.error('Error deleting order:', err);
      res.status(500).json({ error: 'Failed to delete order' });
    }
  });

  // ==========================================
  // REVIEWS API (Permanent cross-device client & admin synchronization)
  // ==========================================
  app.get('/api/reviews', (_req: Request, res: Response) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    const reviews = readJsonFile<any[]>(REVIEWS_FILE, []);
    res.json(reviews);
  });

  app.post('/api/reviews', async (req: Request, res: Response) => {
    try {
      const incoming = req.body;
      const user = await verifyBearerUser(req);
      let reviews = readJsonFile<any[]>(REVIEWS_FILE, []);

      if (Array.isArray(incoming)) {
        if (!user?.isAdmin) {
          return res.status(401).json({ error: 'Admin authentication required for bulk review sync.' });
        }
        incoming.forEach(inc => {
          if (!inc || !inc.id) return;
          const idx = reviews.findIndex(r => r.id === inc.id || (inc.orderId && r.orderId === inc.orderId));
          if (idx >= 0) {
            reviews[idx] = { ...reviews[idx], ...inc };
          } else {
            reviews.unshift(inc);
          }
        });
      } else if (incoming && incoming.id) {
        const idx = reviews.findIndex(r => r.id === incoming.id || (incoming.orderId && r.orderId === incoming.orderId));
        if (idx >= 0) {
          if (!user?.isAdmin) {
            return res.status(403).json({ error: 'Only admin can modify an existing review.' });
          }
          reviews[idx] = { ...reviews[idx], ...incoming };
        } else {
          reviews.unshift(incoming);
        }
      }

      writeJsonFile(REVIEWS_FILE, reviews);
      res.json({ success: true, count: reviews.length, reviews });
    } catch (err) {
      console.error('Error saving reviews:', err);
      res.status(500).json({ error: 'Failed to save reviews' });
    }
  });

  app.patch('/api/reviews/:id', async (req: Request, res: Response) => {
    if (!(await requireAdmin(req, res))) return;
    try {
      const { id } = req.params;
      const updates = req.body;
      let reviews = readJsonFile<any[]>(REVIEWS_FILE, []);
      const idx = reviews.findIndex(r => r.id === id || r.orderId === id || r.order_id === id);

      if (idx >= 0) {
        reviews[idx] = {
          ...reviews[idx],
          ...updates,
          updated_at: new Date().toISOString()
        };
        writeJsonFile(REVIEWS_FILE, reviews);
        res.json({ success: true, review: reviews[idx] });
      } else {
        res.status(404).json({ error: 'Review not found' });
      }
    } catch (err) {
      console.error('Error updating review:', err);
      res.status(500).json({ error: 'Failed to update review' });
    }
  });

  app.post('/api/reviews/:id/helpful', (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { count } = req.body;
      let reviews = readJsonFile<any[]>(REVIEWS_FILE, []);
      const idx = reviews.findIndex(r => r.id === id || r.orderId === id || r.order_id === id);

      if (idx >= 0) {
        const nextCount = typeof count === 'number' ? count : ((reviews[idx].helpful || 0) + 1);
        reviews[idx].helpful = nextCount;
        reviews[idx].helpful_count = nextCount;
        writeJsonFile(REVIEWS_FILE, reviews);
        res.json({ success: true, helpful: nextCount });
      } else {
        res.json({ success: true, helpful: count || 1 });
      }
    } catch (err) {
      console.error('Error toggling review helpful:', err);
      res.status(500).json({ error: 'Failed to update helpful status' });
    }
  });

  app.delete('/api/reviews/:id', async (req: Request, res: Response) => {
    if (!(await requireAdmin(req, res))) return;
    try {
      const { id } = req.params;
      let reviews = readJsonFile<any[]>(REVIEWS_FILE, []);
      reviews = reviews.filter(r => r.id !== id && r.orderId !== id && r.order_id !== id);
      writeJsonFile(REVIEWS_FILE, reviews);
      res.json({ success: true, count: reviews.length });
    } catch (err) {
      console.error('Error deleting review:', err);
      res.status(500).json({ error: 'Failed to delete review' });
    }
  });

  // ==========================================
  // TECHNICAL SEO: DYNAMIC ROBOTS.TXT & SITEMAP.XML
  // ==========================================
  function resolveSeoOrigin(req: Request): string {
    const envUrl = String(process.env.APP_URL || '').trim();
    if (envUrl && envUrl.startsWith('http') && !envUrl.includes('MY_APP_URL')) {
      return envUrl.replace(/\/+$/, '');
    }
    const proto = req.headers['x-forwarded-proto']
      ? String(req.headers['x-forwarded-proto']).split(',')[0].trim()
      : req.protocol;
    return `${proto}://${req.get('host')}`.replace(/\/+$/, '');
  }

  app.get('/robots.txt', (req: Request, res: Response) => {
    const origin = resolveSeoOrigin(req);
    const robotsPath = path.resolve(__dirname, 'public', 'robots.txt');
    let content = '';
    if (fs.existsSync(robotsPath)) {
      content = fs.readFileSync(robotsPath, 'utf8').replace(/^Sitemap:.*$/im, `Sitemap: ${origin}/sitemap.xml`);
    } else {
      content = `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /admin-login\nDisallow: /customer-dashboard\nDisallow: /login\nDisallow: /work-tracking\nDisallow: /api/\nSitemap: ${origin}/sitemap.xml\n`;
    }
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send(content);
  });

  app.get('/sitemap.xml', (req: Request, res: Response) => {
    const origin = resolveSeoOrigin(req);
    const today = new Date().toISOString().split('T')[0];
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${origin}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${origin}/assets/aistudio/file_000000001e5881f5bec7048c347e325c_07632167.png</image:loc>
      <image:title>Ruddranil.io Digital Services &amp; Automation Showcase</image:title>
    </image:image>
  </url>
  <url>
    <loc>${origin}/portfolio</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.90</priority>
    <image:image>
      <image:loc>${origin}/assets/aistudio/file_000000001e5881f5bec7048c347e325c_07632167.png</image:loc>
      <image:title>Ruddranil.io Portfolio &amp; Project Showcase</image:title>
    </image:image>
  </url>
  <url>
    <loc>${origin}/reviews</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.85</priority>
  </url>
</urlset>`;
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.send(sitemapXml);
  });

  // Clean URL mapping so /admin, /admin-login, /login, etc. serve HTML instead of matching .js files in Vite dev
  const cleanHtmlRoutes: Record<string, string> = {
    '/admin': '/admin.html',
    '/admin-login': '/admin-login.html',
    '/login': '/login.html',
    '/customer-dashboard': '/customer-dashboard.html',
    '/work-tracking': '/work-tracking.html',
    '/portfolio': '/portfolio.html',
    '/reviews': '/reviews.html',
  };
  app.use((req: Request, _res: Response, next) => {
    const cleanPath = req.path.length > 1 ? req.path.replace(/\/+$/, '') : req.path;
    if (cleanHtmlRoutes[cleanPath]) {
      const qIndex = req.url.indexOf('?');
      const query = qIndex >= 0 ? req.url.slice(qIndex) : '';
      req.url = cleanHtmlRoutes[cleanPath] + query;
    }
    next();
  });

  // ==========================================
  // VITE DEV MIDDLEWARE / STATIC PRODUCTION SERVING
  // ==========================================
  if (!isProduction) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'mpa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Ruddranil App running on http://0.0.0.0:${PORT} [${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'}]`);
  });

  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use.`);
    } else {
      console.error('Server error:', err);
    }
  });

  const shutdown = () => {
    server.close(() => {
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
