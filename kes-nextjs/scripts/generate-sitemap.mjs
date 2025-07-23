import fs from 'fs';
import path from 'path';

// Import your services data
const services = [
  { slug: 'employee-led-strategic-improvement' },
  { slug: 'organizational-change-alignment' },
  { slug: 'executive-coaching-leadership-development' },
  { slug: 'experiential-knowledge-capture' },
  { slug: 'rapid-capability-development' },
  { slug: 'digital-operational-excellence' },
];

const baseUrl = 'https://www.kesglobaladvisors.com';

function generateSitemap() {
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: '1.0',
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: '0.8',
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: '0.9',
    },
    {
      url: `${baseUrl}/insights`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: '0.8',
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: '0.7',
    },
  ];

  const servicePages = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: '0.8',
  }));

  const allPages = [...staticPages, ...servicePages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  // Write to public directory
  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated successfully at public/sitemap.xml');
}

generateSitemap();