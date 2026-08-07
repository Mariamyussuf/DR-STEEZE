import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import ServiceCard from '@/components/ServiceCard';
import { servicesList } from '@/data/projects';
import styles from './services.module.css';

export default function ServicesPage() {
  return (
    <>
      <section className={styles.header}>
        <div className="container-custom">
          <ScrollReveal>
            <span className="label-caps" style={{ color: 'var(--color-gold)', display: 'block', marginBottom: '12px' }}>
              Capabilities & Offerings
            </span>
            <h1 className={styles.title}>Services</h1>
            <p className={styles.subtitle}>
              Providing world-class visual direction, high-contrast editorial photography, and cinematic film production for discerning fashion houses and global brands.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="container-custom">
        <div className={styles.servicesGrid}>
          {servicesList.map((service, index) => (
            <ScrollReveal key={service.id} delay={index + 1}>
              <ServiceCard service={service} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className={styles.ctaBanner}>
            <span className="label-caps" style={{ color: 'var(--color-gold)', marginBottom: '12px' }}>
              Commission Inquiry
            </span>
            <h2 className={styles.ctaHeading}>Ready to Create Something Iconic?</h2>
            <p className={styles.ctaText}>
              DR STEEZE accepts a limited number of high-concept brand commissions and creative direction mandates per year.
            </p>
            <Link href="/contact" className="primary-button">
              Initiate Project
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
