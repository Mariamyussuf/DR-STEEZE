import Link from 'next/link';
import HeroBackground from '@/components/HeroBackground';
import ScrollReveal from '@/components/ScrollReveal';
import ProjectCard from '@/components/ProjectCard';
import ServiceCard from '@/components/ServiceCard';
import { projects, servicesList, cultureOfZionData } from '@/data/projects';
import styles from './page.module.css';

export default function Home() {
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <HeroBackground />
        <div className={styles.heroGradient} />

        <div className={styles.heroContent}>
          <ScrollReveal delay={1}>
            <h1 className={styles.heroTitle}>DR STEEZE</h1>
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <div className={styles.heroSubtitleWrapper}>
              <div className={styles.heroDivider} />
              <h2 className={styles.heroSubtitle}>Creative Director</h2>
              <div className={styles.heroDivider} />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={3}>
            <p className={styles.heroSubheading}>
              Creating timeless stories through photography, filmmaking, and handcrafted design.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={4}>
            <div className={styles.heroButtons}>
              <Link href="/portfolio" className="primary-button">
                View Portfolio
              </Link>
              <Link href="/contact" className="ghost-button">
                Work With Me
              </Link>
            </div>
          </ScrollReveal>
        </div>

        <div className={styles.scrollIndicator}>
          <span className={styles.scrollText}>Scroll to explore</span>
          <div className={styles.scrollLine} />
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className={styles.featuredSection}>
        <div className="container-custom">
          <ScrollReveal>
            <div className={styles.sectionHeader}>
              <div>
                <span className="label-caps" style={{ color: 'var(--color-gold)', display: 'block', marginBottom: '8px' }}>
                  Curated Works
                </span>
                <h3 className="headline-xl">Featured Work</h3>
              </div>
              <Link href="/portfolio" className="ghost-button" style={{ fontSize: '11px', padding: '12px 28px' }}>
                View Full Archive
              </Link>
            </div>
          </ScrollReveal>

          <div className={styles.featuredGrid}>
            <div className={styles.col8}>
              <ScrollReveal>
                <Link href="/portfolio" style={{ textDecoration: 'none' }}>
                  <ProjectCard project={featuredProjects[0]} aspect="wide" />
                </Link>
              </ScrollReveal>
            </div>

            <div className={styles.col4}>
              <ScrollReveal delay={1}>
                <Link href="/portfolio" style={{ textDecoration: 'none' }}>
                  <ProjectCard project={featuredProjects[1]} aspect="tall" />
                </Link>
              </ScrollReveal>
            </div>

            <div className={styles.col5}>
              <ScrollReveal>
                <Link href="/portfolio" style={{ textDecoration: 'none' }}>
                  <ProjectCard project={featuredProjects[2]} aspect="square" />
                </Link>
              </ScrollReveal>
            </div>

            <div className={styles.col7}>
              <ScrollReveal delay={2}>
                <Link href="/portfolio" style={{ textDecoration: 'none' }}>
                  <ProjectCard project={featuredProjects[3]} aspect="wide" />
                </Link>
              </ScrollReveal>
            </div>
          </div>

          {/* Culture of Zion Banner Feature */}
          <ScrollReveal>
            <div className={styles.cozBanner}>
              <div className={styles.cozImageWrapper}>
                <img
                  src={cultureOfZionData.heroImage}
                  alt={cultureOfZionData.title}
                  className={styles.cozImage}
                />
              </div>
              <div className={styles.cozContent}>
                <span className={styles.cozBadge}>Signature Venture</span>
                <h3 className={styles.cozTitle}>{cultureOfZionData.title}</h3>
                <p className={styles.cozText}>{cultureOfZionData.description}</p>
                <Link href="/culture-of-zion" className="primary-button">
                  Explore The Collection
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Services Section */}
          <ScrollReveal>
            <div className={styles.sectionHeader} style={{ marginTop: '80px' }}>
              <div>
                <span className="label-caps" style={{ color: 'var(--color-gold)', display: 'block', marginBottom: '8px' }}>
                  Capabilities
                </span>
                <h3 className="headline-xl">Services</h3>
              </div>
              <Link href="/services" className="ghost-button" style={{ fontSize: '11px', padding: '12px 28px' }}>
                All Capabilities
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {servicesList.map((service, index) => (
              <ScrollReveal key={service.id} delay={index + 1}>
                <ServiceCard service={service} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
