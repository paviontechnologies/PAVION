// worker.js - Cloudflare Worker for Pavion Website & Global Blog API

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...CORS_HEADERS,
    },
  });
}

const ROUTE_METADATA = {
  '/': {
    title: 'Pavion Technologies - Custom Software, ERP/CRM & Dedicated Engineering Squads',
    desc: 'Pavion Technologies builds enterprise custom software, automated ERP/CRM systems, and scalable web & mobile platforms. Deploy senior engineering squads in 48 hours with 100% IP ownership.',
  },
  '/about': {
    title: 'About Us & Engineering Leadership | Pavion Technologies',
    desc: 'Learn about Pavion Technologies, our Gurugram engineering headquarters, and our leadership team dedicated to building custom enterprise software and scalable AI systems.',
  },
  '/services': {
    title: 'Software Engineering & AI Services | Pavion Technologies',
    desc: 'Explore Pavion Technologies end-to-end services: custom enterprise software, automated ERP/CRM platforms, dedicated engineering squads, AI systems, and cloud architecture.',
  },
  '/portfolio': {
    title: 'Client Work & Engineering Case Studies | Pavion Technologies',
    desc: 'Explore production systems, ERP software, and web applications delivered by Pavion Technologies for startups, SMEs, and global enterprises.',
  },
  '/contact': {
    title: 'Contact Engineering & Gurugram HQ | Pavion Technologies',
    desc: 'Get in touch with Pavion Technologies. Visit our Landmark Cyberpark offices in Gurugram or schedule a direct engineering discovery call within 24 hours.',
  },
  '/careers': {
    title: 'Engineering Careers & Open Roles | Pavion Technologies',
    desc: 'Join Pavion Technologies in Gurugram or remote. We are hiring full-stack engineers, AI developers, and cloud architects to build high-velocity systems.',
  },
  '/blog': {
    title: 'Engineering & AI Insights Blog | Pavion Technologies',
    desc: 'Read in-depth guides and case studies on custom ERP systems, AI automation, software architecture, and modern web performance by Pavion Technologies engineers.',
  },
  '/it-staffing': {
    title: 'Enterprise IT Staffing & Dedicated Engineering Squads | Pavion Technologies',
    desc: 'Deploy pre-vetted senior developers and agile engineering squads in 48 hours. Zero recruiter fees, full code ownership, and seamless Slack/Jira integration.',
  },
  '/privacy': {
    title: 'Privacy Policy & Data Security | Pavion Technologies',
    desc: 'Pavion Technologies privacy policy, data security standards, and strict client confidentiality guarantees under Indian and international regulations.',
  },
  '/terms': {
    title: 'Terms of Service | Pavion Technologies',
    desc: 'Terms and conditions governing custom software engineering, milestone contracts, and dedicated development squads with Pavion Technologies Private Limited.',
  },
  '/ai-development-company': {
    title: 'Custom AI Development & Autonomous Agent Engineering | Pavion Technologies',
    desc: 'Deploy production AI systems, LLM agents, and enterprise RAG pipelines with private data isolation and SOC-2/HIPAA compliance.',
  },
  '/custom-software-development': {
    title: 'Custom Software Development & System Architecture | Pavion Technologies',
    desc: 'Bespoke enterprise software systems engineered for scale. Zero vendor lock-in, 100% intellectual property ownership, and high-performance microservices.',
  },
  '/web-development-company': {
    title: 'Enterprise Web Platform & SaaS Development | Pavion Technologies',
    desc: 'Sub-second Server-Side Rendered (SSR) web applications built with Next.js, React, and TypeScript. Optimized for speed and Core Web Vitals.',
  },
  '/crm-development': {
    title: 'Custom CRM Development & Workflow Automation | Pavion Technologies',
    desc: 'Custom CRM platforms tailored to your sales process. Multi-channel lead tracking, pipeline automation, and zero recurring per-seat subscription fees.',
  },
  '/ats-software-development': {
    title: 'Custom ATS Software & Recruitment Automation | Pavion Technologies',
    desc: 'AI-assisted applicant tracking systems (ATS) with automated resume parsing, candidate scoring, and seamless interview pipeline workflows.',
  },
  '/erp-software-development': {
    title: 'Custom ERP Software & Multi-Branch Resource Planning | Pavion Technologies',
    desc: 'Enterprise ERP systems featuring multi-branch inventory tracking, automated accounting, vendor billing, and role-based permissions with zero per-user fees.',
  },
  '/devops-cloud-services': {
    title: 'DevOps & Cloud Infrastructure Engineering | Pavion Technologies',
    desc: 'Automated CI/CD pipelines, Docker containerization, Kubernetes orchestration, and AWS/GCP cloud architectures built with Terraform Infrastructure-as-Code.',
  },
  '/healthcare-software-development': {
    title: 'Healthcare Software Development (HIPAA Compliant) | Pavion Technologies',
    desc: 'Custom EHR/EMR platforms, telemedicine solutions, and patient portals engineered to strict HIPAA and data encryption standards.',
  },
  '/real-estate-software': {
    title: 'Real Estate Software & PropTech Platforms | Pavion Technologies',
    desc: 'Custom MLS search portals, property management ERPs, tenant onboarding systems, and automated lease workflow applications.',
  },
  '/logistics-software': {
    title: 'Logistics, Fleet & Supply Chain Management Software | Pavion Technologies',
    desc: 'Real-time GPS fleet tracking, automated warehouse inventory (WMS), and TMS dispatch software tailored for transportation companies.',
  },
  '/startup-mvp-development': {
    title: 'Rapid Startup MVP Development (4 to 6 Weeks) | Pavion Technologies',
    desc: 'Turn product ideas into production-grade MVPs in 4-6 weeks with fixed milestone pricing, clean architecture, and complete source code ownership.',
  },
  '/us-staffing-software': {
    title: 'US Staffing Software (VMS & Blinded Packets) | Pavion Technologies',
    desc: 'Vendor Management Systems (VMS), blinded submittal packet generators, and US recruitment compliance portals engineered for staffing agencies.',
  },
  '/restaurant-management-software': {
    title: 'Restaurant Management & POS Software Systems | Pavion Technologies',
    desc: 'Multi-outlet restaurant POS, kitchen display systems (KDS), online ordering integrations, and real-time food recipe inventory management.',
  },
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. Handle CORS Preflight Requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: CORS_HEADERS,
      });
    }

    // 2. Handle /api/blogs API endpoints
    if (url.pathname === '/api/blogs' || url.pathname === '/api/blogs/') {
      // GET /api/blogs - Fetch all dynamic blogs globally
      if (request.method === 'GET') {
        try {
          const raw = await env.PAVION_BLOGS.get('blog_index', { type: 'json' });
          const blogs = Array.isArray(raw) ? raw : [];
          return jsonResponse({ success: true, blogs });
        } catch (err) {
          console.error('KV get error:', err);
          return jsonResponse({ success: false, blogs: [], error: err.message }, 500);
        }
      }

      // POST /api/blogs - Publish a new blog globally
      if (request.method === 'POST') {
        try {
          const body = await request.json();
          if (!body.title || !body.content) {
            return jsonResponse({ success: false, error: 'Title and content are required' }, 400);
          }

          const slug = (body.slug || body.title)
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');

          const newPost = {
            id: 'blog_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
            title: body.title.trim(),
            slug,
            excerpt: (body.excerpt || '').trim(),
            content: body.content.trim(),
            category: body.category || 'AI & Technology',
            author: (body.author || 'Pavion Technologies').trim(),
            author_role: (body.author_role || body.authorRole || 'Engineering Team').trim(),
            image_url: body.image_url || body.imageUrl || '',
            read_time: body.read_time || body.readTime || '5 min read',
            tags: Array.isArray(body.tags) && body.tags.length > 0 ? body.tags : [body.category || 'Technology'],
            meta_title: (body.meta_title || body.title).trim(),
            meta_description: (body.meta_description || body.metaDescription || body.excerpt || body.title).trim(),
            meta_keywords: (body.meta_keywords || body.metaKeywords || '').trim(),
            published: true,
            created_at: body.created_at || new Date().toISOString(),
          };

          // Fetch existing index from Cloudflare KV
          const existing = (await env.PAVION_BLOGS.get('blog_index', { type: 'json' })) || [];
          const filtered = Array.isArray(existing) ? existing.filter((p) => p.slug !== slug && p.id !== newPost.id) : [];
          const updated = [newPost, ...filtered];

          // Save to Cloudflare KV globally
          await env.PAVION_BLOGS.put('blog_index', JSON.stringify(updated));
          await env.PAVION_BLOGS.put('post_' + slug, JSON.stringify(newPost));

          return jsonResponse({ success: true, blog: newPost });
        } catch (err) {
          console.error('KV post error:', err);
          return jsonResponse({ success: false, error: err.message }, 500);
        }
      }

      // DELETE /api/blogs - Delete a blog post globally
      if (request.method === 'DELETE') {
        try {
          const body = await request.json();
          const { slug, id, pin } = body;

          // Simple pin authorization
          if (pin !== 'pavion2026') {
            return jsonResponse({ success: false, error: 'Unauthorized: Invalid PIN' }, 401);
          }

          if (!slug && !id) {
            return jsonResponse({ success: false, error: 'Slug or ID is required' }, 400);
          }

          // Fetch existing index
          const existing = (await env.PAVION_BLOGS.get('blog_index', { type: 'json' })) || [];
          const updated = Array.isArray(existing) ? existing.filter((p) => p.slug !== slug && p.id !== id) : [];

          // Save updated list to Cloudflare KV
          await env.PAVION_BLOGS.put('blog_index', JSON.stringify(updated));
          if (slug) {
            await env.PAVION_BLOGS.delete('post_' + slug);
          }

          return jsonResponse({ success: true, message: 'Blog deleted successfully from global KV' });
        } catch (err) {
          console.error('KV delete error:', err);
          return jsonResponse({ success: false, error: err.message }, 500);
        }
      }
    }

    // 3. Handle single blog lookup /api/blogs/:slug
    if (url.pathname.startsWith('/api/blogs/')) {
      const slug = decodeURIComponent(url.pathname.replace('/api/blogs/', '').trim());
      if (slug && request.method === 'GET') {
        const post = await env.PAVION_BLOGS.get('post_' + slug, { type: 'json' });
        if (post) {
          return jsonResponse({ success: true, blog: post });
        }
        // Fallback to checking index
        const index = (await env.PAVION_BLOGS.get('blog_index', { type: 'json' })) || [];
        const match = Array.isArray(index) ? index.find((p) => p.slug === slug) : null;
        if (match) {
          return jsonResponse({ success: true, blog: match });
        }
        return jsonResponse({ success: false, error: 'Blog not found' }, 404);
      }
    }

    // 4. Static assets & HTML rewrite for Dynamic Crawlers / Canonical SEO
    const response = await env.ASSETS.fetch(request);
    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('text/html')) {
      const cleanPath = url.pathname === '/' ? '/' : url.pathname.replace(/\/$/, '');
      const canonicalUrl = `https://paviontechnologies.com${cleanPath === '/' ? '/' : cleanPath}`;
      
      let meta = ROUTE_METADATA[cleanPath];

      // Handle /blog/:slug dynamically
      if (!meta && cleanPath.startsWith('/blog/')) {
        const blogSlug = cleanPath.replace('/blog/', '');
        const post = await env.PAVION_BLOGS.get('post_' + blogSlug, { type: 'json' });
        if (post && post.title) {
          meta = {
            title: `${post.meta_title || post.title} | Pavion Technologies`,
            desc: post.meta_description || post.excerpt || post.title,
          };
        } else {
          const titleFromSlug = blogSlug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
          meta = {
            title: `${titleFromSlug} | Pavion Technologies`,
            desc: `Read our in-depth engineering analysis on ${titleFromSlug} at Pavion Technologies.`,
          };
        }
      }

      const pageTitle = meta ? meta.title : 'Pavion Technologies - Custom Software, ERP/CRM & Dedicated Engineering Squads';
      const pageDesc = meta ? meta.desc : 'Pavion Technologies builds enterprise custom software, automated ERP/CRM systems, and scalable web & mobile platforms.';

      return new HTMLRewriter()
        .on('title', {
          element(e) {
            e.setInnerContent(pageTitle);
          },
        })
        .on('meta[name="title"]', {
          element(e) {
            e.setAttribute('content', pageTitle);
          },
        })
        .on('meta[name="description"]', {
          element(e) {
            e.setAttribute('content', pageDesc);
          },
        })
        .on('link[rel="canonical"]', {
          element(e) {
            e.setAttribute('href', canonicalUrl);
          },
        })
        .on('meta[property="og:url"]', {
          element(e) {
            e.setAttribute('content', canonicalUrl);
          },
        })
        .on('meta[property="og:title"]', {
          element(e) {
            e.setAttribute('content', pageTitle);
          },
        })
        .on('meta[property="og:description"]', {
          element(e) {
            e.setAttribute('content', pageDesc);
          },
        })
        .on('meta[name="twitter:url"]', {
          element(e) {
            e.setAttribute('content', canonicalUrl);
          },
        })
        .on('meta[name="twitter:title"]', {
          element(e) {
            e.setAttribute('content', pageTitle);
          },
        })
        .on('meta[name="twitter:description"]', {
          element(e) {
            e.setAttribute('content', pageDesc);
          },
        })
        .transform(response);
    }

    return response;
  },
};
