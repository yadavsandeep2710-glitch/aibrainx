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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is AIBrainX.in?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AIBrainX.in is India's most trusted AI tools directory, helping students, creators, and professionals discover and compare AI solutions with localized insights and pricing in Indian Rupees (₹)."
        }
      },
      {
        "@type": "Question",
        "name": "Are the AI tools listed on AIBrainX free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We list a mix of Free, Freemium, and Paid tools. Each tool page clearly displays the pricing model and any available free versions for Indian users."
        }
      },
      {
        "@type": "Question",
        "name": "How does AIBrainX evaluate AI tools?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our editorial team manually reviews every tool, testing for utility, performance, and value-for-money specifically for the Indian market."
        }
      },
      {
        "@type": "Question",
        "name": "Can I submit my AI tool to AIBrainX?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Developers can submit their AI tools through our /submit page. Every submission undergoes a manual review to ensure it meets our quality standards."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {error === 'unauthorized' && (
        <div className={styles.errorBox}>
          ⚠️ Sorry, you don&apos;t have admin access. Only authorized administrators can access the admin dashboard.
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

      {/* Popular AI Tools in India */}
      <section className={`section ${styles.popularToolsSection}`}>
        <div className="container">
          <div className="section-header">
            <h2>🔥 Popular AI Tools in India</h2>
            <p>Top-rated AI tools used by Indian students, creators, and professionals</p>
          </div>
          <div className={styles.popularToolsGrid}>
            {tools
              .filter(t => t.status === 'approved' && t.rating >= 4.5)
              .slice(0, 6)
              .map(tool => (
                <Link href={`/tools/${tool.slug}`} key={tool.id} className={styles.popularToolCard}>
                  <div className={styles.popularToolInfo}>
                    <h3>{tool.name}</h3>
                    <span className={styles.popularToolRating}>⭐ {tool.rating}</span>
                  </div>
                  <p className={styles.popularToolTagline}>{tool.tagline}</p>
                  <div className={styles.popularToolMeta}>
                    <span className={styles.pricingBadge}>{tool.pricing}</span>
                    {tool.pricing_details && (
                      <span className={styles.pricingDetail}>{tool.pricing_details.split('.')[0]}</span>
                    )}
                  </div>
                </Link>
              ))}
          </div>
          <div className={styles.seeAllWrap}>
            <Link href="/tools" className="btn btn-secondary btn-lg">
              View All {tools.length}+ AI Tools →
            </Link>
          </div>
        </div>
      </section>

      {/* Best Free AI Tools for Students */}
      <section className={`section ${styles.studentCtaSection}`}>
        <div className="container">
          <div className={styles.studentCtaCard}>
            <div className={styles.studentCtaContent}>
              <span className={styles.studentCtaBadge}>🎓 For Students</span>
              <h2>Best Free AI Tools for Students in India</h2>
              <p>
                From JEE & NEET prep to coding and content writing — discover AI tools
                Indian students use daily. No credit card required.
              </p>
              <div className={styles.flexCenter}>
                <Link href="/blog/10-best-free-ai-tools-students-india" className="btn btn-primary btn-lg">
                  Read the Full Guide →
                </Link>
                <Link href="/ai-prompts/ai-prompts-for-students" className="btn btn-secondary btn-lg">
                  AI Prompts for Students
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest AI Guides & Prompts */}
      <section className={`section ${styles.guidesPromptsSection}`}>
        <div className="container">
          <div className="section-header">
            <h2>📚 AI Guides & Prompt Library</h2>
            <p>Expert guides and ready-to-use prompts for every use case</p>
          </div>
          <div className={styles.guidesPromptsGrid}>
            <Link href="/ai-guides" className={styles.guideCard}>
              <span className={styles.guideIcon}>🧠</span>
              <div>
                <h3>Premium AI Guides</h3>
                <p>India-focused buying guides with pricing in ₹, step-by-step comparisons & expert picks.</p>
              </div>
              <span className={styles.guideArrow}>→</span>
            </Link>
            <Link href="/ai-prompts" className={styles.guideCard}>
              <span className={styles.guideIcon}>💡</span>
              <div>
                <h3>Free AI Prompt Library</h3>
                <p>30+ curated prompts for marketing, HR, content writing, students & Indian business.</p>
              </div>
              <span className={styles.guideArrow}>→</span>
            </Link>
            <Link href="/blog" className={styles.guideCard}>
              <span className={styles.guideIcon}>📰</span>
              <div>
                <h3>AI Blog & Insights</h3>
                <p>Daily AI news, tutorials, tool reviews & comparisons for the Indian audience.</p>
              </div>
              <span className={styles.guideArrow}>→</span>
            </Link>
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
      <section id="services" className={`section ${styles.servicesSection}`} style={{ background: 'var(--bg-secondary)' }}>
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

      {/* AI Prompts CTA */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className={styles.promptCta}>
            <div className={styles.promptBadge}>
              💡 Free AI Prompts
            </div>
            <h2 className={styles.promptTitle}>
              Ready-to-Use AI Prompts for Every Need
            </h2>
            <p className={styles.promptText}>
              Browse 30+ curated AI prompts for work, marketing, students, HR, content writing, and Indian business. Copy, paste, and generate results instantly.
            </p>
            <div className={styles.flexCenter}>
              <Link href="/ai-prompts" className="btn btn-primary btn-lg">
                Browse AI Prompts →
              </Link>
              <Link href="/ai-prompts/ai-prompts-for-marketing" className="btn btn-secondary btn-lg">
                Marketing Prompts
              </Link>
            </div>
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
      <section className={`section ${styles.premiumSection}`}>
        <div className="container">
          <div className={styles.premiumCard}>
            <div className={styles.premiumBadge}>
              📚 Premium Guides
            </div>
            <h2 className={styles.premiumTitle}>
              Stop Wasting Money on the Wrong AI Tools
            </h2>
            <p className={styles.premiumText}>
              Get expert recommendations with pricing in ₹, detailed comparisons, and step-by-step guides.
              Perfect for students, creators, and freelancers.
            </p>
            <div className={styles.flexCenter}>
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
