'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ToolCard from '@/components/ToolCard';
import BlogCard from '@/components/BlogCard';
import { categories, tools, blogPosts, getFeaturedTools } from '@/lib/data';
import { services, packages } from '@/lib/service-data';
import ServiceCard from '@/components/ServiceCard';
import PackageCard from '@/components/PackageCard';
import styles from './page.module.css';

function HomeContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const featuredTools = getFeaturedTools();
  const latestPosts = blogPosts.slice(0, 3);
  const topCategories = categories.slice(0, 8);

  return (
    <>
      {error === 'unauthorized' && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          color: '#ef4444',
          padding: '1rem',
          borderRadius: '8px',
          margin: '1rem auto',
          maxWidth: '1200px',
          textAlign: 'center',
        }}>
          ⚠️ Sorry, you don't have admin access. Only authorized administrators can access the admin dashboard.
        </div>
      )}
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroOrb1} />
          <div className={styles.heroOrb2} />
          <div className={styles.heroOrb3} />
          <div className={styles.heroGrid} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroBadge}>
            <span>🇮🇳</span> India&apos;s #1 AI Tools Directory
          </div>
          <h1 className={styles.heroTitle}>
            Discover the Best
            <span className={styles.heroGradient}> AI Tools </span>
            for India
          </h1>
          <p className={styles.heroSubtitle}>
            Explore 500+ AI tools with pricing in ₹, real reviews from Indian users,
            and daily insights — all in one place.
          </p>
          <div className={styles.heroActions}>
            <Link href="/tools" className="btn btn-primary btn-lg">
              🔍 Explore AI Tools
            </Link>
            <Link href="/submit" className="btn btn-secondary btn-lg">
              📤 Submit Your Tool
            </Link>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>500+</span>
              <span className={styles.statLabel}>AI Tools</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNumber}>10K+</span>
              <span className={styles.statLabel}>Monthly Users</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNumber}>50+</span>
              <span className={styles.statLabel}>Categories</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNumber}>₹ INR</span>
              <span className={styles.statLabel}>Pricing</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className={`section ${styles.categoriesSection}`}>
        <div className="container">
          <div className="section-header">
            <h2>Browse by Category</h2>
            <p>Find the perfect AI tool for your specific needs</p>
          </div>
          <div className={styles.categoriesGrid}>
            {topCategories.map((cat, i) => (
              <Link
                href={`/tools?category=${cat.slug}`}
                key={cat.id}
                className={styles.categoryCard}
              >
                <span className={styles.categoryIcon}>{cat.icon}</span>
                <div>
                  <h3 className={styles.categoryName}>{cat.name}</h3>
                  <p className={styles.categoryCount}>{cat.tool_count} tools</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className={`section ${styles.featuredSection}`}>
        <div className="container">
          <div className="section-header">
            <h2>Featured AI Tools</h2>
            <p>Hand-picked tools trusted by thousands of Indian professionals</p>
          </div>
          <div className={styles.toolsGrid}>
            {featuredTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
          <div className={styles.seeAllWrap}>
            <Link href="/tools" className="btn btn-secondary btn-lg">
              View All Tools →
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={`section ${styles.servicesSection}`} style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <h2>Our Premium Services</h2>
            <p>Affordable, high-quality digital solutions for your business growth</p>
          </div>
          <div className={styles.servicesGrid}>
            {services.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Growth Packages</h2>
            <p>All-in-one solutions designed to scale your business</p>
          </div>
          <div className={styles.packagesGrid}>
            {packages.map(pkg => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className={`section ${styles.blogSection}`}>
        <div className="container">
          <div className="section-header">
            <h2>Latest from the Blog</h2>
            <p>Daily AI insights, tutorials, and comparisons for the Indian audience</p>
          </div>
          <div className={styles.blogGrid}>
            {latestPosts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          <div className={styles.seeAllWrap}>
            <Link href="/blog" className="btn btn-secondary btn-lg">
              Read All Articles →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaCard}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Have an AI Tool? Get Listed!</h2>
              <p className={styles.ctaText}>
                Submit your AI tool to reach thousands of Indian users.
                Get featured in our directory, blog reviews, and social media.
              </p>
              <div className={styles.ctaActions}>
                <Link href="/submit" className="btn btn-primary btn-lg">
                  Submit Your Tool — ₹499
                </Link>
              </div>
              <div className={styles.ctaBenefits}>
                <span>✅ Detailed listing page</span>
                <span>✅ SEO-optimized profile</span>
                <span>✅ User reviews enabled</span>
                <span>✅ Featured eligibility</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium AI Guides CTA */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
        <div className="container">
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center',
            padding: '3rem 2rem',
            background: 'white',
            borderRadius: '16px',
            border: '2px solid #3b82f6',
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '30px',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
            }}>
              📚 Premium Guides
            </div>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '800',
              color: '#111827',
              margin: '0 0 1rem 0',
              lineHeight: '1.2',
            }}>
              Stop Wasting Money on the Wrong AI Tools
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#4b5563',
              lineHeight: '1.6',
              margin: '0 0 2rem 0',
            }}>
              Get expert recommendations with pricing in ₹, detailed comparisons, and step-by-step guides.
              Perfect for students, creators, and freelancers.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/ai-guides" className="btn btn-primary btn-lg">
                View Premium Guides →
              </Link>
              <Link href="/free-ai-guide" className="btn btn-secondary btn-lg">
                Get Free Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className={`section ${styles.trustSection}`}>
        <div className="container">
          <div className={styles.trustGrid}>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>🔍</span>
              <h3>Curated Directory</h3>
              <p>Every tool is manually reviewed before listing. No spam, no junk.</p>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>🇮🇳</span>
              <h3>Made for India</h3>
              <p>Pricing in ₹, reviews from Indian users, and tools relevant to Indian market.</p>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>📊</span>
              <h3>Honest Reviews</h3>
              <p>Real ratings and reviews from verified users. No paid placements.</p>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>📰</span>
              <h3>Daily Updates</h3>
              <p>Fresh blog content every day covering AI trends, tutorials, and comparisons.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
