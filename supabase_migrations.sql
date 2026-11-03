-- ============================================================================
-- Ruddranil.io - Master Supabase Database Migration & Pricing System
-- Fiverr-Style Multi-Tiered Packages, Add-ons, Coupons, and Secure Order Creation
-- Fully Backward-Compatible with Existing orders, auth, and users
-- ============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Services Table
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on services
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Public can read active services
DROP POLICY IF EXISTS "Public can view active services" ON public.services;
CREATE POLICY "Public can view active services" 
    ON public.services FOR SELECT 
    USING (is_active = true);

-- Admins have full access
DROP POLICY IF EXISTS "Admins have full access to services" ON public.services;
CREATE POLICY "Admins have full access to services" 
    ON public.services FOR ALL 
    TO authenticated 
    USING ((auth.jwt() ->> 'role') = 'admin' OR (auth.jwt() -> 'user_metadata' ->> 'is_admin') = 'true');

-- 3. Create Packages Table (Basic, Standard, Premium)
CREATE TABLE IF NOT EXISTS public.packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
    tier TEXT NOT NULL CHECK (tier IN ('basic', 'standard', 'premium')),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    delivery_days INT NOT NULL CHECK (delivery_days >= 1),
    express_fee NUMERIC(10, 2) DEFAULT 0.00 CHECK (express_fee >= 0),
    express_delivery_days INT DEFAULT 1 CHECK (express_delivery_days >= 1),
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(service_id, tier)
);

-- Enable RLS on packages
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view active packages" ON public.packages;
CREATE POLICY "Public can view active packages" 
    ON public.packages FOR SELECT 
    USING (is_active = true);

DROP POLICY IF EXISTS "Admins have full access to packages" ON public.packages;
CREATE POLICY "Admins have full access to packages" 
    ON public.packages FOR ALL 
    TO authenticated 
    USING ((auth.jwt() ->> 'role') = 'admin' OR (auth.jwt() -> 'user_metadata' ->> 'is_admin') = 'true');

-- 4. Create Service Addons Table
CREATE TABLE IF NOT EXISTS public.service_addons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    extra_delivery_days INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.service_addons ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view active addons" ON public.service_addons;
CREATE POLICY "Public can view active addons" 
    ON public.service_addons FOR SELECT 
    USING (is_active = true);

DROP POLICY IF EXISTS "Admins have full access to addons" ON public.service_addons;
CREATE POLICY "Admins have full access to addons" 
    ON public.service_addons FOR ALL 
    TO authenticated 
    USING ((auth.jwt() ->> 'role') = 'admin' OR (auth.jwt() -> 'user_metadata' ->> 'is_admin') = 'true');

-- 5. Create Coupons / Discounts Table
CREATE TABLE IF NOT EXISTS public.coupons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT NOT NULL UNIQUE,
    discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
    discount_value NUMERIC(10, 2) NOT NULL CHECK (discount_value > 0),
    min_order_amount NUMERIC(10, 2) DEFAULT 0.00,
    max_discount_amount NUMERIC(10, 2), -- Cap for percentage discounts
    starts_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    total_usage_limit INT,
    times_used INT DEFAULT 0,
    per_customer_limit INT DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;

-- Authenticated customers can validate active coupons
DROP POLICY IF EXISTS "Authenticated users can read coupons" ON public.coupons;
CREATE POLICY "Authenticated users can read coupons" 
    ON public.coupons FOR SELECT 
    TO authenticated 
    USING (is_active = true AND (expires_at IS NULL OR expires_at > NOW()));

DROP POLICY IF EXISTS "Admins have full access to coupons" ON public.coupons;
CREATE POLICY "Admins have full access to coupons" 
    ON public.coupons FOR ALL 
    TO authenticated 
    USING ((auth.jwt() ->> 'role') = 'admin' OR (auth.jwt() -> 'user_metadata' ->> 'is_admin') = 'true');

-- Coupon Usage History Table (Tracking per-customer usage)
CREATE TABLE IF NOT EXISTS public.coupon_usages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    coupon_id UUID REFERENCES public.coupons(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES auth.users(id),
    order_id TEXT NOT NULL,
    discount_applied NUMERIC(10, 2) NOT NULL,
    used_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.coupon_usages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Customers can view their own coupon usage" ON public.coupon_usages;
CREATE POLICY "Customers can view their own coupon usage" 
    ON public.coupon_usages FOR SELECT 
    TO authenticated 
    USING (customer_id = auth.uid());

-- 6. Backward-Compatible Upgrade for Existing Orders Table
-- If orders table exists, add new fields without deleting or altering existing columns
DO $$ 
BEGIN
    -- Check if orders table exists, if not create it
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'orders') THEN
        CREATE TABLE public.orders (
            id TEXT PRIMARY KEY,
            customer_id UUID REFERENCES auth.users(id),
            customer_name TEXT NOT NULL,
            customer_email TEXT NOT NULL,
            service TEXT NOT NULL,
            service_slug TEXT,
            order_date TIMESTAMPTZ DEFAULT NOW(),
            last_updated TIMESTAMPTZ DEFAULT NOW(),
            request TEXT,
            status TEXT DEFAULT 'Pending',
            progress INT DEFAULT 0,
            price TEXT
        );
    END IF;
END $$;

-- Add new Fiverr-tier columns safely
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS service_id UUID REFERENCES public.services(id);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS package_id UUID REFERENCES public.packages(id);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS package_tier TEXT DEFAULT 'basic';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS package_name TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS package_price NUMERIC(10, 2);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS delivery_days INT DEFAULT 3;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS is_express BOOLEAN DEFAULT FALSE;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS express_fee NUMERIC(10, 2) DEFAULT 0.00;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS selected_addons JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS addons_total NUMERIC(10, 2) DEFAULT 0.00;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS coupon_code TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS discount_amount NUMERIC(10, 2) DEFAULT 0.00;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS subtotal NUMERIC(10, 2);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS final_total NUMERIC(10, 2);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS reference_files JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS estimated_completion TIMESTAMPTZ;

-- Enable RLS on orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Customers can view their own orders
DROP POLICY IF EXISTS "Customers can view own orders" ON public.orders;
CREATE POLICY "Customers can view own orders" 
    ON public.orders FOR SELECT 
    TO authenticated 
    USING (customer_id = auth.uid() OR customer_email = (auth.jwt() ->> 'email'));

-- Customers can insert their own orders
DROP POLICY IF EXISTS "Customers can insert own orders" ON public.orders;
CREATE POLICY "Customers can insert own orders"
    ON public.orders FOR INSERT
    TO authenticated
    WITH CHECK (
        customer_id = auth.uid() OR 
        customer_email = (auth.jwt() ->> 'email')
    );

-- Admins can view and update all orders
DROP POLICY IF EXISTS "Admins have full access to orders" ON public.orders;
CREATE POLICY "Admins have full access to orders" 
    ON public.orders FOR ALL 
    TO authenticated 
    USING ((auth.jwt() ->> 'role') = 'admin' OR (auth.jwt() -> 'user_metadata' ->> 'is_admin') = 'true');

-- 7. Secure Server-Side Atomic Order Creation Function (RPC)
-- Validates service, package, add-ons, coupon code and usage limits
CREATE OR REPLACE FUNCTION public.create_fiverr_order(
    p_service_id UUID,
    p_package_tier TEXT,
    p_is_express BOOLEAN,
    p_selected_addon_ids UUID[],
    p_coupon_code TEXT,
    p_customer_name TEXT,
    p_customer_email TEXT,
    p_request_instructions TEXT,
    p_reference_files JSONB
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    v_customer_id UUID;
    v_service RECORD;
    v_package RECORD;
    v_addons_total NUMERIC(10, 2) := 0.00;
    v_express_fee NUMERIC(10, 2) := 0.00;
    v_subtotal NUMERIC(10, 2) := 0.00;
    v_discount NUMERIC(10, 2) := 0.00;
    v_final_total NUMERIC(10, 2) := 0.00;
    v_delivery_days INT := 3;
    v_coupon RECORD;
    v_customer_usage_count INT := 0;
    v_order_id TEXT;
    v_addons_json JSONB := '[]'::jsonb;
BEGIN
    v_customer_id := auth.uid();
    
    -- 1. Validate Service
    SELECT * INTO v_service FROM public.services WHERE id = p_service_id AND is_active = true;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Service not found or is currently inactive.';
    END IF;

    -- 2. Validate Package Tier
    SELECT * INTO v_package FROM public.packages WHERE service_id = p_service_id AND tier = p_package_tier AND is_active = true;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Package tier % not found for this service.', p_package_tier;
    END IF;

    v_delivery_days := v_package.delivery_days;

    -- 3. Express Delivery
    IF p_is_express THEN
        v_express_fee := COALESCE(v_package.express_fee, 0.00);
        v_delivery_days := COALESCE(v_package.express_delivery_days, 1);
    END IF;

    -- 4. Calculate Addons
    IF p_selected_addon_ids IS NOT NULL AND array_length(p_selected_addon_ids, 1) > 0 THEN
        SELECT 
            COALESCE(SUM(price), 0.00),
            COALESCE(jsonb_agg(jsonb_build_object('id', id, 'name', name, 'price', price)), '[]'::jsonb)
        INTO v_addons_total, v_addons_json
        FROM public.service_addons 
        WHERE id = ANY(p_selected_addon_ids) AND service_id = p_service_id AND is_active = true;
    END IF;

    -- Subtotal calculation
    v_subtotal := v_package.price + v_express_fee + v_addons_total;

    -- 5. Validate Coupon Code
    IF p_coupon_code IS NOT NULL AND length(trim(p_coupon_code)) > 0 THEN
        SELECT * INTO v_coupon 
        FROM public.coupons 
        WHERE UPPER(code) = UPPER(trim(p_coupon_code)) 
          AND is_active = true
          AND (expires_at IS NULL OR expires_at > NOW())
          AND (total_usage_limit IS NULL OR times_used < total_usage_limit);

        IF FOUND THEN
            -- Check min order amount
            IF v_subtotal >= COALESCE(v_coupon.min_order_amount, 0.00) THEN
                -- Check per customer usage limit
                IF v_customer_id IS NOT NULL THEN
                    SELECT COUNT(*) INTO v_customer_usage_count 
                    FROM public.coupon_usages 
                    WHERE coupon_id = v_coupon.id AND customer_id = v_customer_id;
                END IF;

                IF v_customer_usage_count < COALESCE(v_coupon.per_customer_limit, 1) THEN
                    IF v_coupon.discount_type = 'percentage' THEN
                        v_discount := ROUND((v_subtotal * (v_coupon.discount_value / 100.0)), 2);
                        IF v_coupon.max_discount_amount IS NOT NULL AND v_discount > v_coupon.max_discount_amount THEN
                            v_discount := v_coupon.max_discount_amount;
                        END IF;
                    ELSE
                        v_discount := LEAST(v_coupon.discount_value, v_subtotal);
                    END IF;
                END IF;
            END IF;
        END IF;
    END IF;

    v_final_total := GREATEST(0.00, v_subtotal - v_discount);

    -- 6. Generate Unique Order ID (Format: RUD-YYYYMMDD-XXXXXXXX)
    v_order_id := 'RUD-' || to_char(NOW(), 'YYYYMMDD') || '-' || UPPER(SUBSTRING(md5(random()::text || clock_timestamp()::text) FROM 1 FOR 8));

    -- 7. Insert Order Record
    INSERT INTO public.orders (
        id,
        customer_id,
        customer_name,
        customer_email,
        service,
        service_slug,
        service_id,
        package_id,
        package_tier,
        package_name,
        package_price,
        delivery_days,
        is_express,
        express_fee,
        selected_addons,
        addons_total,
        coupon_code,
        discount_amount,
        subtotal,
        final_total,
        request,
        reference_files,
        status,
        progress,
        price,
        order_date,
        last_updated
    ) VALUES (
        v_order_id,
        v_customer_id,
        p_customer_name,
        p_customer_email,
        v_service.name,
        v_service.slug,
        v_service.id,
        v_package.id,
        p_package_tier,
        v_package.name,
        v_package.price,
        v_delivery_days,
        p_is_express,
        v_express_fee,
        v_addons_json,
        v_addons_total,
        p_coupon_code,
        v_discount,
        v_subtotal,
        v_final_total,
        p_request_instructions,
        COALESCE(p_reference_files, '[]'::jsonb),
        'Pending',
        0,
        '$' || to_char(v_final_total, 'FM999,990.00'),
        NOW(),
        NOW()
    );

    -- 8. Record Coupon Usage
    IF v_discount > 0 AND v_coupon.id IS NOT NULL THEN
        UPDATE public.coupons SET times_used = times_used + 1 WHERE id = v_coupon.id;
        
        IF v_customer_id IS NOT NULL THEN
            INSERT INTO public.coupon_usages (coupon_id, customer_id, order_id, discount_applied)
            VALUES (v_coupon.id, v_customer_id, v_order_id, v_discount);
        END IF;
    END IF;

    -- Return JSON Response
    RETURN jsonb_build_object(
        'success', true,
        'order_id', v_order_id,
        'subtotal', v_subtotal,
        'discount', v_discount,
        'final_total', v_final_total,
        'delivery_days', v_delivery_days,
        'status', 'Pending'
    );
END;
$$;

-- 8. Storage Bucket Setup for Customer Order References
INSERT INTO storage.buckets (id, name, public)
VALUES ('order-references', 'order-references', false)
ON CONFLICT (id) DO NOTHING;

-- RLS Policy for storage.objects: Authenticated users can upload to order-references
DROP POLICY IF EXISTS "Authenticated users can upload order references" ON storage.objects;
CREATE POLICY "Authenticated users can upload order references"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
    bucket_id = 'order-references' AND
    auth.uid() IS NOT NULL
);

-- Users can view their own uploaded files
DROP POLICY IF EXISTS "Users can view own order references" ON storage.objects;
CREATE POLICY "Users can view own order references"
ON storage.objects FOR SELECT TO authenticated
USING (
    bucket_id = 'order-references' AND
    (auth.uid()::text = (storage.foldername(name))[1] OR (auth.jwt() ->> 'role') = 'admin')
);

-- ============================================================================
-- 9. Initial Seed Data (Preserving existing services, tiers and pricing)
-- ============================================================================

-- 01. Facebook Marketing
INSERT INTO public.services (id, name, slug, category, description, display_order)
VALUES (
    'a1b2c3d4-0001-4000-8000-000000000001',
    'Facebook Marketing',
    'fb-marketing',
    'marketing',
    'Professional Facebook marketing solutions to help improve your online presence, audience engagement and brand visibility.',
    1
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.packages (service_id, tier, name, description, price, delivery_days, express_fee, express_delivery_days, features)
VALUES 
(
    'a1b2c3d4-0001-4000-8000-000000000001',
    'basic',
    'Starter Growth',
    'Essential Facebook page setup, target audience identification, and 3 custom social posts.',
    30.00,
    4,
    15.00,
    2,
    '["Page Optimization & Setup", "Audience Research", "3 Designed Posts", "Engagement Strategy"]'::jsonb
),
(
    'a1b2c3d4-0001-4000-8000-000000000001',
    'standard',
    'Business Accelerate',
    'Full ad campaign setup, Meta Pixel integration, 7 custom creatives, and A/B split testing.',
    60.00,
    6,
    25.00,
    3,
    '["Full Campaign Setup", "Meta Pixel Integration", "7 Custom Creatives", "A/B Audience Testing", "Weekly Performance Report"]'::jsonb
),
(
    'a1b2c3d4-0001-4000-8000-000000000001',
    'premium',
    'Dominance Pro',
    'Full 30-day Facebook ad funnel management, retargeting campaign, 15 creatives, and daily optimization.',
    120.00,
    12,
    40.00,
    5,
    '["Full Funnel Campaign", "Retargeting Setup", "15 Video & Graphic Creatives", "Daily Bid Optimization", "Dedicated Account Manager"]'::jsonb
) ON CONFLICT (service_id, tier) DO UPDATE SET price = EXCLUDED.price;

-- 02. YouTube Marketing
INSERT INTO public.services (id, name, slug, category, description, display_order)
VALUES (
    'a1b2c3d4-0002-4000-8000-000000000002',
    'YouTube Marketing',
    'youtube-marketing',
    'marketing',
    'YouTube marketing strategies designed to improve channel visibility, audience reach and content growth.',
    2
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.packages (service_id, tier, name, description, price, delivery_days, express_fee, express_delivery_days, features)
VALUES 
(
    'a1b2c3d4-0002-4000-8000-000000000002',
    'basic',
    'Video Booster',
    'Organic promotion for 1 video, niche audience outreach, and engagement boost.',
    40.00,
    5,
    20.00,
    2,
    '["1 Video Targeted Promotion", "Organic Social Distribution", "Audience Reach Expansion", "Basic Performance Analytics"]'::jsonb
),
(
    'a1b2c3d4-0002-4000-8000-000000000002',
    'standard',
    'Channel Expansion',
    'Strategic promotion for 3 videos, community growth, and playlist positioning.',
    80.00,
    8,
    35.00,
    4,
    '["3 Videos Promotion", "Community & Social Outreach", "Playlist Placement", "Engagement & Watch Time Optimization"]'::jsonb
),
(
    'a1b2c3d4-0002-4000-8000-000000000002',
    'premium',
    'Authority Creator Kit',
    'Comprehensive channel campaign for 7 videos with Google Ads setup and audience retargeting.',
    150.00,
    14,
    50.00,
    7,
    '["7 Videos Promoted", "Google Video Ads Setup", "Audience Retargeting", "Thumbnail Consultation", "Comprehensive Growth Audit"]'::jsonb
) ON CONFLICT (service_id, tier) DO UPDATE SET price = EXCLUDED.price;

-- 03. YouTube SEO
INSERT INTO public.services (id, name, slug, category, description, display_order)
VALUES (
    'a1b2c3d4-0003-4000-8000-000000000003',
    'YouTube SEO',
    'youtube-seo',
    'seo',
    'YouTube SEO services focused on improving video discoverability, keywords, titles, descriptions and overall optimization.',
    3
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.packages (service_id, tier, name, description, price, delivery_days, express_fee, express_delivery_days, features)
VALUES 
(
    'a1b2c3d4-0003-4000-8000-000000000003',
    'basic',
    'Starter SEO Pack',
    'Full SEO optimization for 2 videos: search volume keyword tags, click-optimized title, description.',
    25.00,
    3,
    10.00,
    1,
    '["2 Videos Optimization", "High Search Volume Tags", "Click-Driven Titles", "Keyword-Rich Description", "Hashtags & Cards Setup"]'::jsonb
),
(
    'a1b2c3d4-0003-4000-8000-000000000003',
    'standard',
    'Ranking Surge',
    'Deep SEO optimization for 5 videos, competitor keyword extraction, and playlist optimization.',
    50.00,
    5,
    20.00,
    2,
    '["5 Videos Optimization", "Competitor Keyword Spying", "Playlist SEO Architecture", "End-Screen Optimization", "VidIQ/TubeBuddy High Score"]'::jsonb
),
(
    'a1b2c3d4-0003-4000-8000-000000000003',
    'premium',
    'Complete Channel SEO Audit',
    '10 videos optimized, complete channel keyword architecture, and thumbnail CTR analysis.',
    90.00,
    8,
    30.00,
    3,
    '["10 Videos Optimized", "Full Channel Meta Restructure", "Thumbnail CTR Recommendations", "Search Ranking Roadmap", "Lifetime Tag Strategy Guide"]'::jsonb
) ON CONFLICT (service_id, tier) DO UPDATE SET price = EXCLUDED.price;

-- 04. Website Design
INSERT INTO public.services (id, name, slug, category, description, display_order)
VALUES (
    'a1b2c3d4-0004-4000-8000-000000000004',
    'Website Design',
    'website-design',
    'development',
    'Modern responsive website design for businesses, portfolios, personal brands and professional online platforms.',
    4
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.packages (service_id, tier, name, description, price, delivery_days, express_fee, express_delivery_days, features)
VALUES 
(
    'a1b2c3d4-0004-4000-8000-000000000004',
    'basic',
    'One-Page Modern Landing',
    'Sleek 1-page responsive landing page with contact form, animations, and clean code.',
    100.00,
    7,
    40.00,
    3,
    '["1-Page Custom Landing Page", "100% Mobile & Tablet Responsive", "Contact & Lead Form", "Fast Loading Speed", "Clean Semantic Code"]'::jsonb
),
(
    'a1b2c3d4-0004-4000-8000-000000000004',
    'standard',
    'Corporate Multi-Page Site',
    'Up to 5 pages (Home, About, Services, Portfolio, Contact) with dark mode and interactive sections.',
    220.00,
    12,
    80.00,
    5,
    '["Up to 5 Custom Pages", "Modern Dark UI / Cyan Accents", "Interactive Portfolio Showcase", "SEO Meta Tags & Lighthouse 95+", "Social & WhatsApp Integration"]'::jsonb
),
(
    'a1b2c3d4-0004-4000-8000-000000000004',
    'premium',
    'Full Platform & Portal',
    'Comprehensive custom web app, client portal, order tracking, and dynamic admin control dashboard.',
    450.00,
    18,
    150.00,
    7,
    '["Unlimited Custom Pages", "Customer Dashboard & Live Tracker", "Admin Control Console", "Database & Authentication Ready", "1 Month Dedicated Maintenance"]'::jsonb
) ON CONFLICT (service_id, tier) DO UPDATE SET price = EXCLUDED.price;

-- 05. Graphic Design
INSERT INTO public.services (id, name, slug, category, description, display_order)
VALUES (
    'a1b2c3d4-0005-4000-8000-000000000005',
    'Graphic Design',
    'graphic-design',
    'design',
    'Creative graphic design solutions for social media, branding, promotional content and digital platforms.',
    5
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.packages (service_id, tier, name, description, price, delivery_days, express_fee, express_delivery_days, features)
VALUES 
(
    'a1b2c3d4-0005-4000-8000-000000000005',
    'basic',
    'Social Media Pack',
    '2 high-resolution social banners or post designs in PNG/JPEG with 2 revisions.',
    20.00,
    3,
    10.00,
    1,
    '["2 Custom Graphic Designs", "High-Resolution PNG/JPG", "Platform Optimized Formats", "2 Revision Rounds"]'::jsonb
),
(
    'a1b2c3d4-0005-4000-8000-000000000005',
    'standard',
    'Brand Assets Suite',
    '5 custom graphics, brand color harmonization, and layered editable vector source files.',
    45.00,
    4,
    20.00,
    2,
    '["5 Graphic Designs", "Editable Source Files (PSD/AI/Figma)", "Color Palette Alignment", "Commercial Use License", "4 Revision Rounds"]'::jsonb
),
(
    'a1b2c3d4-0005-4000-8000-000000000005',
    'premium',
    'Complete Identity System',
    '10 visual assets including logo mark, banner kit, style guide, and unlimited revisions.',
    90.00,
    6,
    35.00,
    3,
    '["10 Comprehensive Brand Graphics", "Logo Concept & Vector Master Files", "Full Social Media Identity Kit", "Typography & Color Guide", "Unlimited Revisions"]'::jsonb
) ON CONFLICT (service_id, tier) DO UPDATE SET price = EXCLUDED.price;

-- Seed Sample Active Coupons
INSERT INTO public.coupons (code, discount_type, discount_value, min_order_amount, max_discount_amount, is_active)
VALUES 
    ('WELCOME10', 'percentage', 10.00, 20.00, 50.00, true),
    ('RUDDRA20', 'fixed', 20.00, 60.00, NULL, true),
    ('FIRSTORDER', 'percentage', 15.00, 25.00, 40.00, true)
ON CONFLICT (code) DO NOTHING;

-- ============================================================================
-- 10. Portfolio Likes Table
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.portfolio_likes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id TEXT NOT NULL,
    user_identifier TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(project_id, user_identifier)
);

ALTER TABLE public.portfolio_likes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view likes" ON public.portfolio_likes;
CREATE POLICY "Public can view likes" ON public.portfolio_likes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can insert likes" ON public.portfolio_likes;
CREATE POLICY "Public can insert likes" ON public.portfolio_likes FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public can delete likes" ON public.portfolio_likes;
CREATE POLICY "Public can delete likes" ON public.portfolio_likes FOR DELETE USING (true);

-- ============================================================================
-- 11. Portfolio Comments Table
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.portfolio_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id TEXT NOT NULL,
    project_title TEXT NOT NULL,
    author_name TEXT NOT NULL,
    comment_text TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.portfolio_comments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view comments" ON public.portfolio_comments;
CREATE POLICY "Public can view comments" ON public.portfolio_comments FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can post comments" ON public.portfolio_comments;
CREATE POLICY "Public can post comments" ON public.portfolio_comments FOR INSERT WITH CHECK (true);

-- ============================================================================
-- 12. Customer Profiles Table & Avatar Storage (Edit Profile System)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    phone_number TEXT,
    country TEXT,
    city TEXT,
    address TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow reading customer profile (users can view their own, admins can view all)
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (
        email = (auth.jwt() ->> 'email') OR 
        (auth.uid() IS NOT NULL AND user_id = auth.uid()) OR
        auth.role() = 'anon'
    );

-- Allow users to insert their own profile
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (true);

-- Allow users to update their own profile
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (true)
    WITH CHECK (true);

-- Admins full access to profiles
DROP POLICY IF EXISTS "Admins have full access to profiles" ON public.profiles;
CREATE POLICY "Admins have full access to profiles"
    ON public.profiles FOR ALL
    TO authenticated
    USING ((auth.jwt() ->> 'role') = 'admin' OR (auth.jwt() -> 'user_metadata' ->> 'is_admin') = 'true');

-- Storage Bucket for Profile Avatars
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-avatars', 'profile-avatars', true)
ON CONFLICT (id) DO NOTHING;

-- RLS Policy: Public read access to avatars
DROP POLICY IF EXISTS "Public can view profile avatars" ON storage.objects;
CREATE POLICY "Public can view profile avatars"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'profile-avatars');

-- RLS Policy: Users can upload profile avatars
DROP POLICY IF EXISTS "Users can upload profile avatars" ON storage.objects;
CREATE POLICY "Users can upload profile avatars"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'profile-avatars');

-- RLS Policy: Users can update/replace profile avatars
DROP POLICY IF EXISTS "Users can update profile avatars" ON storage.objects;
CREATE POLICY "Users can update profile avatars"
    ON storage.objects FOR UPDATE
    USING (bucket_id = 'profile-avatars');

-- Safe column extensions for customer profile details
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS company_name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio TEXT;

-- ============================================================================
-- 13. Customer Reviews for Completed Orders Table & Moderation
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id TEXT UNIQUE REFERENCES public.orders(id) ON DELETE SET NULL,
    customer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_avatar TEXT,
    service_name TEXT NOT NULL,
    role_company TEXT,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    image_url TEXT,
    status TEXT NOT NULL DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected')),
    verified_order BOOLEAN DEFAULT TRUE,
    helpful_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Safe column additions if table was created in an earlier migration
ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS customer_avatar TEXT;
ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS project_url TEXT;
ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'approved';
ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS helpful_count INT DEFAULT 0;
ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Ensure unique constraint on order_id (one review per order)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'reviews_order_id_key' AND conrelid = 'public.reviews'::regclass
    ) THEN
        ALTER TABLE public.reviews ADD CONSTRAINT reviews_order_id_key UNIQUE (order_id);
    END IF;
EXCEPTION WHEN OTHERS THEN
    -- Ignore if already present
END $$;

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Public can view approved reviews
DROP POLICY IF EXISTS "Public can view approved reviews" ON public.reviews;
DROP POLICY IF EXISTS "Public can view verified reviews" ON public.reviews;
CREATE POLICY "Public can view approved reviews"
    ON public.reviews FOR SELECT
    USING (status = 'approved' OR (auth.jwt() ->> 'role') = 'admin' OR (auth.jwt() -> 'user_metadata' ->> 'is_admin') = 'true');

-- Authenticated customers can insert reviews
DROP POLICY IF EXISTS "Customers can insert reviews" ON public.reviews;
CREATE POLICY "Customers can insert reviews"
    ON public.reviews FOR INSERT
    WITH CHECK (
        customer_email = (auth.jwt() ->> 'email') OR
        auth.role() = 'anon' OR
        auth.role() = 'authenticated'
    );

-- Admins have full access to reviews (approve, reject, delete, edit)
DROP POLICY IF EXISTS "Admins have full access to reviews" ON public.reviews;
CREATE POLICY "Admins have full access to reviews"
    ON public.reviews FOR ALL
    TO authenticated
    USING ((auth.jwt() ->> 'role') = 'admin' OR (auth.jwt() -> 'user_metadata' ->> 'is_admin') = 'true');

-- Storage Bucket for Project Review Images
INSERT INTO storage.buckets (id, name, public)
VALUES ('review-images', 'review-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: Public can view review images
DROP POLICY IF EXISTS "Public can view review images" ON storage.objects;
CREATE POLICY "Public can view review images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'review-images');

-- Storage RLS: Users can upload review images
DROP POLICY IF EXISTS "Users can upload review images" ON storage.objects;
CREATE POLICY "Users can upload review images"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'review-images');

-- Storage RLS: Users can update review images
DROP POLICY IF EXISTS "Users can update review images" ON storage.objects;
CREATE POLICY "Users can update review images"
    ON storage.objects FOR UPDATE
    USING (bucket_id = 'review-images');

