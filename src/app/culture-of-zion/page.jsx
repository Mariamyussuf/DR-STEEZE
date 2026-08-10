import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import KineticText from '@/components/KineticText';
import { cultureOfZionData } from '@/data/projects';
import styles from './culture.module.css';

export default function CultureOfZionPage() {
  return (
    <>
      {/* Editorial Hero */}
      <section className={styles.hero}>
        <img
          src={cultureOfZionData.heroImage}
          alt={cultureOfZionData.title}
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <ScrollReveal>
            <span className={styles.badge}>{cultureOfZionData.subtitle}</span>
            <h1 className={styles.title}>{cultureOfZionData.title}</h1>
            <p className={styles.tagline}>{cultureOfZionData.tagline}</p>
            <div className={styles.founderTag}>
              <span className={styles.founderDot} />
              <span>{cultureOfZionData.founder}</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Brand Overview & Foundation */}
      <section className={styles.overviewSection}>
        <div className="container-custom">
          <div className={styles.splitGrid}>
            <ScrollReveal animation="fade-right">
              <div className={styles.storyImageWrapper}>
                <img
                  src={cultureOfZionData.originImage}
                  alt="DR STEEZE — Founder of Culture of Zion"
                  className={styles.storyImage}
                />
                <div className={styles.imageCaption}>
                  <span>Sobayo Deborah Oluwaseyitan (DR STEEZE)</span>
                  <span style={{ color: 'var(--color-gold)' }}>Founder & Creative Director</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-left" delay={1}>
              <div>
                <span className="label-caps" style={{ color: 'var(--color-gold)', display: 'block', marginBottom: '16px' }}>
                  Foundational Platform
                </span>
                <h2 className={styles.storyHeading}>Beyond Conventional Studio Boundaries</h2>
                <p className={styles.storyParagraph}>
                  {cultureOfZionData.description}
                </p>
                <p className={styles.storyParagraph}>
                  {cultureOfZionData.longOverview}
                </p>
                <div className={styles.pillarsRow}>
                  {['FASHION', 'CULTURE', 'STORIES', 'EXPERIENCES'].map((pillar, i) => (
                    <span key={i} className={styles.pillarTag}>
                      {pillar}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Our Direction (4 Divisions Grid) */}
      <section className={styles.divisionsSection}>
        <div className="container-custom">
          <ScrollReveal>
            <div className={styles.sectionHeaderCenter}>
              <span className="label-caps" style={{ color: 'var(--color-gold)', display: 'block', marginBottom: '12px' }}>
                Operational Architecture
              </span>
              <KineticText as="h2" className="headline-xl">
                OUR DIRECTION
              </KineticText>
              <p className={styles.sectionSubtext}>
                Developing multi-faceted divisions to bridge media, fashion editorial, live event production, and creative studio space.
              </p>
            </div>
          </ScrollReveal>

          <div className={styles.divisionsGrid}>
            {cultureOfZionData.divisions.map((div, idx) => (
              <ScrollReveal key={div.id} delay={idx + 1} animation="scale-up">
                <div className={styles.divisionCard}>
                  <div className={styles.divisionHeader}>
                    <span className={styles.divisionNum}>0{idx + 1}</span>
                    <span className={styles.divisionCategory}>{div.category}</span>
                  </div>
                  <h3 className={styles.divisionTitle}>{div.name}</h3>
                  <p className={styles.divisionDesc}>{div.description}</p>
                  <div className={styles.divisionTags}>
                    {div.tags.map((tag, tIdx) => (
                      <span key={tIdx} className={styles.divTag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* The Vision & Collaborations */}
      <section className={styles.visionSection}>
        <div className="container-custom">
          <div className={styles.visionCard}>
            <ScrollReveal>
              <span className={styles.visionBadge}>THE VISION</span>
              <h2 className={styles.visionTitle}>Creating Experiences & Connecting Culture</h2>
              <p className={styles.visionText}>
                {cultureOfZionData.vision}
              </p>
              <p className={styles.visionGrowth}>
                {cultureOfZionData.growth}
              </p>

              <div className={styles.calloutBox}>
                <p className={styles.calloutText}>{cultureOfZionData.callout}</p>
                <div className={styles.visionButtons}>
                  <Link href="/contact" prefetch={false} className="primary-button">
                    Partner & Collaborate
                  </Link>
                  <Link href="/portfolio" prefetch={false} className="ghost-button">
                    Explore Works
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Horizontal Archive Gallery */}
      <section className={styles.gallerySection}>
        <div className="container-custom">
          <ScrollReveal>
            <div className={styles.galleryHeading}>
              <span className="label-caps" style={{ color: 'var(--color-gold)', display: 'block', marginBottom: '12px' }}>
                Visual Archive
              </span>
              <h2 className="headline-xl">Selected Editorial Frames</h2>
            </div>
          </ScrollReveal>

          <div className={styles.horizontalScroll}>
            {cultureOfZionData.gallery.map((item, idx) => (
              <div key={idx} className={styles.galleryCard}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.galleryCardImage}
                />
                <div className={styles.galleryCardOverlay}>
                  <h3 className={styles.galleryCardTitle}>{item.title}</h3>
                  <p className={styles.galleryCardDesc}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
