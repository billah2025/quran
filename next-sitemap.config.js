/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://muslimshub.vercel.app',
    generateRobotsTxt: true,
    sitemapSize: 7000,
    changefreq: 'weekly',
    priority: 0.8,
    // If you want to exclude any paths, list here
    exclude: ['/admin/*', '/login'],
  
    // Add dynamic paths for sitemap
    additionalPaths: async (config) => {
      // You can fetch your dynamic IDs from API or database here,
      // but for example, let's mock them:
  
      // Mock example IDs - replace with your real dynamic IDs fetch logic
      const blogIds = ['blog1', 'blog2', 'blog3'];
      const qaIds = ['qa1', 'qa2', 'qa3'];
      const surahIds = Array.from({ length: 114 }, (_, i) => String(i + 1));
  
      // Generate all dynamic URLs
      const blogPaths = blogIds.map(id => ({ loc: `/blogs/${id}`, changefreq: 'weekly', priority: 0.9 }));
      const qaPaths = qaIds.map(id => ({ loc: `/qa/${id}`, changefreq: 'weekly', priority: 0.9 }));
      const surahPaths = surahIds.map(id => ({ loc: `/surah/${id}`, changefreq: 'weekly', priority: 1.0 }));
  
      return [...blogPaths, ...qaPaths, ...surahPaths];
    },
  
    robotsTxtOptions: {
      policies: [{ userAgent: '*', allow: '/' }],
    },
  };
  