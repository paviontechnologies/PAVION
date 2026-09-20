import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: 'website' | 'article';
  canonical?: string;
  author?: string;
  publishedTime?: string;
  schema?: object | object[];
}

const SEO: React.FC<SEOProps> = ({
  title = 'Pavion Technologies - Custom Software, ERP & AI Engineering',
  description = 'Pavion Technologies builds enterprise custom software, automated ERP/CRM systems, and AI-powered web platforms. Senior engineers deployed in 48 hours with 100% IP ownership.',
  keywords = 'custom software development, AI automation, enterprise ERP solutions, CRM development, dedicated engineering squad, Next.js developer, Gurugram software company',
  ogImage = 'https://paviontechnologies.com/og-image.png',
  ogUrl = 'https://paviontechnologies.com/',
  ogType = 'website',
  canonical = 'https://paviontechnologies.com/',
  author,
  publishedTime,
  schema
}) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {author && <meta name="author" content={author} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Pavion Technologies" />
      
      {/* Article specific meta tags */}
      {ogType === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={ogUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@paviontechnologies" />

      {/* Structured Data (JSON-LD for AEO & GEO Search Engines) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
