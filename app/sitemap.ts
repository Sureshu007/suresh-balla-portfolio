import type { MetadataRoute } from 'next';

const siteUrl = 'https://ajay.darisi.in';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
