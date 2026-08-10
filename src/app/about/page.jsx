import ScrollReveal from '@/components/ScrollReveal';
import { aboutData } from '@/data/projects';
import styles from './about.module.css';

export default function AboutPage() {
  const journeyTimeline = [
    {
      year: 'RECENT 6 MONTHS',
      role: 'DR STEEZE — Professional Studio & Brand',
      company: 'Dedicated Business Focus',
      description: 'Established DR STEEZE as an independent professional creative studio—directing high-impact commercial campaigns, fashion motion, vendor spots, and multi-cam podcast video productions.'
    },
    {
      year: '3+ YEARS TIMELINE',
      role: 'Directing & Video Production Experience',
      company: 'YouTube & Digital Video Production',
      description: 'Over 3 years of experience directing and producing video content—starting from directing YouTube videos and collaborative creative projects, developing a sharp eye for framing, pacing, and visual storytelling.'
    },
    {
      year: 'FOUNDATION',
      role: 'Leather Craftsmanship, Music & Civil Engineering',
      company: 'Multidisciplinary Roots',
      description: 'Fusing hands-on leather product craftsmanship, musical rhythm & timing (keyboard & talking drum), and Civil Engineering structural problem-solving into creative visual direction.'
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
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: '24px 0 32px' }}>
                {aboutData.bioParagraphs.map((para, idx) => (
                  <p key={idx} className={styles.philosophy} style={{ margin: 0, fontSize: idx === 0 ? 'clamp(18px, 2.2vw, 22px)' : 'clamp(15px, 1.8vw, 17px)', opacity: idx === 0 ? 1 : 0.9 }}>
                    {para}
                  </p>
                ))}
              </div>

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
