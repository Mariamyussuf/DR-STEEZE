import Link from 'next/link';
import HeroBackground from '@/components/HeroBackground';
import ScrollReveal from '@/components/ScrollReveal';
import KineticText from '@/components/KineticText';
import ProjectCard from '@/components/ProjectCard';
import ServiceCard from '@/components/ServiceCard';
import VideoPlayer from '@/components/VideoPlayer';
import Globe3D from '@/components/Globe3D';
import { projects, servicesList, cultureOfZionData } from '@/data/projects';
import styles from './page.module.css';

export default function Home() {
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <HeroBackground className={styles.heroBgCanvas} />
        <div className={styles.heroGradient} />

        <div className={styles.heroContent}>
          <ScrollReveal delay={0.1} animation="fade-up">
            <div className={styles.locationBadge}>
              <span className={styles.locationDot} />
              <span className={styles.locationBadgeText}>[ LAT 51.5074° N, LNG 0.1278° W ] — GLOBAL EXPANSION VISION</span>
            </div>
          </ScrollReveal>

          <KineticText as="h1" className={styles.heroTitle} delay={0.2} duration={1.2}>
            DR STEEZE
          </KineticText>

          <ScrollReveal delay={1.5} animation="fade-up">
            <h2 className={styles.heroRole}>Creative Director & Visual Storyteller</h2>
          </ScrollReveal>

          <ScrollReveal delay={2} animation="fade-up">
            <div className={styles.heroAffiliationWrapper}>
              <div className={styles.heroDivider} />
              <span className={styles.heroAffiliation}>Founder of Culture of Zion — Creative & Media</span>
              <div className={styles.heroDivider} />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={2.5} animation="fade-up">
            <p className={styles.heroPillars}>
              Fashion. Culture. Stories. Experiences.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={3} animation="scale-up">
            <div className={styles.heroButtons}>
              <Link href="/portfolio" prefetch={false} className="primary-button">
                View Portfolio
              </Link>
              <Link href="/culture-of-zion" prefetch={false} className="ghost-button">
                Culture of Zion
              </Link>
            </div>
          </ScrollReveal>
        </div>

        <div className={styles.scrollIndicator}>
          <span className={styles.scrollText}>Scroll to explore</span>
          <div className={styles.scrollLine} />
        </div>
      </section>

      {/* Global Expansion Vision & 3D Globe Showcase */}
      <section className={styles.globeSection}>
        <div className="container-custom">
          <div className={styles.globeGrid}>
            <ScrollReveal animation="fade-right">
              <div className={styles.globeTextCol}>
                <span className={`label-caps ${styles.goldLabel}`}>
                  Where We Are Going // Global Vision
                </span>
                <KineticText as="h2" className="headline-xl">
                  Global Expansion & Media Platform
                </KineticText>
                <p className={styles.globeDesc}>
                  The 3D Globe translates a vision of where we are going. Culture of Zion and DR STEEZE are building beyond conventional studio boundaries into a global creative and media platform connecting media, fashion, culture, and live experiences worldwide.
                </p>
                <div className={styles.globeStatsRow}>
                  <div className={styles.globeStatItem}>
                    <div className={styles.globeStatVal}>GLOBAL</div>
                    <div className={styles.globeStatLab}>Expansion Trajectory</div>
                  </div>
                  <div className={styles.globeStatItem}>
                    <div className={styles.globeStatVal}>4</div>
                    <div className={styles.globeStatLab}>COZ Platform Divisions</div>
                  </div>
                </div>
                <div style={{ marginTop: '28px' }}>
                  <Link href="/culture-of-zion" prefetch={false} className="ghost-button">
                    Explore Our Vision & Divisions
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-left" delay={1}>
              <div className={styles.globeContainerCol}>
                <Globe3D showHud={true} interactive={true} />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className={styles.featuredSection}>
        <div className="container-custom">
          <div className={styles.sectionHeader}>
            <div>
              <span className={`label-caps ${styles.goldLabel}`}>
                Curated Works
              </span>
              <KineticText as="h3" className="headline-xl">
                Featured Works
              </KineticText>
            </div>
            <Link href="/portfolio" prefetch={false} className={`ghost-button ${styles.headerButton}`}>
              View Full Archive
            </Link>
          </div>

          <div className={styles.featuredGrid}>
            <div className={styles.col8}>
              <ScrollReveal animation="scale-up">
                <Link href="/portfolio" prefetch={false} className={styles.cardLink}>
                  <ProjectCard project={featuredProjects[0]} aspect="wide" />
                </Link>
              </ScrollReveal>
            </div>

            <div className={styles.col4}>
              <ScrollReveal delay={1} animation="scale-up">
                <Link href="/portfolio" prefetch={false} className={styles.cardLink}>
                  <ProjectCard project={featuredProjects[1]} aspect="tall" />
                </Link>
              </ScrollReveal>
            </div>

            <div className={styles.col5}>
              <ScrollReveal animation="scale-up">
                <Link href="/portfolio" prefetch={false} className={styles.cardLink}>
                  <ProjectCard project={featuredProjects[2]} aspect="square" />
                </Link>
              </ScrollReveal>
            </div>

            <div className={styles.col7}>
              <ScrollReveal delay={2} animation="scale-up">
                <Link href="/portfolio" prefetch={false} className={styles.cardLink}>
                  <ProjectCard project={featuredProjects[3]} aspect="wide" />
                </Link>
              </ScrollReveal>
            </div>
          </div>

          {/* Culture of Zion Brand Showcase Banner */}
          <ScrollReveal animation="scale-up">
            <div className={styles.cozBanner}>
              <div className={styles.cozImageWrapper}>
                <VideoPlayer
                  videoId="IMG_0069"
                  poster="/images/poster_IMG_0069.jpg"
                  className={styles.cozImage}
                  defaultQuality="480p"
                />
              </div>
              <div className={styles.cozContent}>
                <span className={styles.cozBadge}>Creative & Media Platform</span>
                <KineticText as="h3" className={styles.cozTitle}>
                  {cultureOfZionData.title}
                </KineticText>
                <p className={styles.cozTagline}>
                  {cultureOfZionData.tagline}
                </p>
                <p className={styles.cozText}>
                  Culture of Zion (COZ) is an emerging creative and media company built around visual storytelling, fashion, culture, and creative experiences—encompassing COZ Productions, COZ Magazine, COZ Events, and COZ Studio.
                </p>
                <Link href="/culture-of-zion" prefetch={false} className="primary-button">
                  Explore COZ Divisions
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Services Section */}
          <div className={`${styles.sectionHeader} ${styles.servicesSectionHeader}`}>
            <div>
              <span className={`label-caps ${styles.goldLabel}`}>
                Capabilities
              </span>
              <KineticText as="h3" className="headline-xl">
                Services
              </KineticText>
            </div>
            <Link href="/services" prefetch={false} className={`ghost-button ${styles.headerButton}`}>
              All Capabilities
            </Link>
          </div>

          <div className={styles.servicesGrid}>
            {servicesList.map((service, index) => (
              <ScrollReveal key={service.id} delay={index + 1} animation="scale-up">
                <ServiceCard service={service} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

