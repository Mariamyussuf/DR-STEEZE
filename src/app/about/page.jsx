import ScrollReveal from '@/components/ScrollReveal';
import { aboutData } from '@/data/projects';
import styles from './about.module.css';

export default function AboutPage() {
  const journeyTimeline = [
    {
      year: '2023 — PRES',
      role: 'Founder & Executive Director',
      company: 'Culture of Zion',
      description: 'Established handcrafted luxury footwear label focusing on bespoke cordwainer craftsmanship and sculptural fashion silhouettes.'
    },
    {
      year: '2019 — PRES',
      role: 'Global Creative Director',
      company: 'DR STEEZE Studio',
      description: 'Directing high-contrast editorial campaigns, commercial films, and visual strategy for international luxury brands in Tokyo, London, and New York.'
    },
    {
      year: '2016 — 2019',
      role: 'Senior Fashion Photographer & Director',
      company: 'Vanguard Visuals',
      description: 'Led photography for high-fashion runway shows, cover features, and cinematic short film commissions.'
    },
    {
      year: '2015',
      role: 'Independent Visual Artist',
      company: 'London / Tokyo',
      description: 'Began exploring chiaroscuro lighting, architectural photography, and fine art film direction.'
    }
  ];

  return (
    <>
      {/* Editorial Hero Section */}
      <section className={styles.hero}>
        <div className={styles.portraitWrapper}>
          <img
            src={aboutData.portrait}
            alt={aboutData.name}
            className={styles.portrait}
          />
          <div className={styles.gradientOverlay} />
        </div>

        <div className="container-custom">
          <div className={styles.heroContent}>
            <ScrollReveal>
              <span className="label-caps" style={{ color: 'var(--color-gold)', display: 'block', marginBottom: '12px' }}>
                Biography & Philosophy
              </span>
              <h1 className={styles.title}>{aboutData.headline}</h1>
              <p className={styles.philosophy}>{aboutData.philosophy}</p>
              <div className={styles.tagRow}>
                <span className={styles.tag}>{aboutData.established}</span>
                <span className={styles.tag}>{aboutData.locations}</span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className={styles.statsSection}>
        <div className="container-custom">
          <div className={styles.statsGrid}>
            {aboutData.stats.map((stat, idx) => (
              <ScrollReveal key={idx} delay={idx + 1}>
                <div className={styles.statItem}>
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Journey & Timeline Section */}
      <section className={styles.journeySection}>
        <div className="container-custom">
          <ScrollReveal>
            <div style={{ textAlign: 'center' }}>
              <span className="label-caps" style={{ color: 'var(--color-gold)', display: 'block', marginBottom: '12px' }}>
                Evolution
              </span>
              <h2 className="headline-xl">Journey & Experience</h2>
            </div>
          </ScrollReveal>

          <div className={styles.timeline}>
            {journeyTimeline.map((item, idx) => (
              <ScrollReveal key={idx} delay={(idx % 2) + 1}>
                <div className={styles.timelineItem}>
                  <div className={styles.timelineYear}>{item.year}</div>
                  <div>
                    <h3 className={styles.timelineRole}>
                      {item.role} <span style={{ color: 'var(--color-tertiary)', fontSize: '18px', fontWeight: '300' }}>/ {item.company}</span>
                    </h3>
                    <p className={styles.timelineDesc}>{item.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
