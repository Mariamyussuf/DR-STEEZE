import Link from 'next/link';
import HeroBackground from '@/components/HeroBackground';
import ScrollReveal from '@/components/ScrollReveal';
import KineticText from '@/components/KineticText';
import ProjectCard from '@/components/ProjectCard';
import ServiceCard from '@/components/ServiceCard';
import VideoPlayer from '@/components/VideoPlayer';
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
          <KineticText as="h1" className={styles.heroTitle} delay={0.2} duration={1.2}>
            DR STEEZE
          </KineticText>

          <ScrollReveal delay={2} animation="fade-up">
            <div className={styles.heroSubtitleWrapper}>
              <div className={styles.heroDivider} />
              <h2 className={styles.heroSubtitle}>Fashion & Commercial Videography & Photography</h2>
              <div className={styles.heroDivider} />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={3} animation="fade-up">
            <p className={styles.heroSubheading}>
              Creating high-impact fashion editorial films, runway motion, commercial advertising spots, and striking photography.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={4} animation="scale-up">
            <div className={styles.heroButtons}>
              <Link href="/portfolio" prefetch={false} className="primary-button">
                View Portfolio
              </Link>
              <Link href="/contact" prefetch={false} className="ghost-button">
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

          {/* Director Showcase Banner Feature */}
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
                <span className={styles.cozBadge}>Director Reel</span>
                <KineticText as="h3" className={styles.cozTitle}>
                  {cultureOfZionData.title}
                </KineticText>
                <p className={styles.cozText}>{cultureOfZionData.description}</p>
                <Link href="/culture-of-zion" prefetch={false} className="primary-button">
                  Watch Motion Reel
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

