import ScrollReveal from '@/components/ScrollReveal';
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
            <p className={styles.subtitle}>{cultureOfZionData.description}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Origin Story Section */}
      <section className={styles.storySection}>
        <div className="container-custom">
          <div className={styles.splitGrid}>
            <ScrollReveal>
              <div className={styles.storyImageWrapper}>
                <img
                  src={cultureOfZionData.originImage}
                  alt="Artisanal craft hands shaping leather"
                  className={styles.storyImage}
                />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={1}>
              <div>
                <span className="label-caps" style={{ color: 'var(--color-gold)', display: 'block', marginBottom: '16px' }}>
                  The Visual Ethos & Motion Craft
                </span>
                <h2 className={styles.storyHeading}>Motion & Light</h2>
                <p className={styles.storyParagraph}>
                  Every frame is crafted with intentional lighting, crisp motion tracking, and high-fashion sensibility. We bring fashion collections and commercial product campaigns to life through cinematic 4K videography and editorial photography.
                </p>
                <p className={styles.storyParagraph}>
                  From high-contrast runway coverage to high-impact TV & digital ads, DR STEEZE Studio combines creative direction, precision camera movement, and bespoke color grading for global luxury and commercial clients.
                </p>
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
                The Artisanal Archive
              </span>
              <h2 className="headline-xl">Precision in Form</h2>
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
