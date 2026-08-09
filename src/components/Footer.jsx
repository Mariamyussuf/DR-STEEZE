import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container-custom">
        <div className={styles.grid}>
          <div className={styles.mainCol}>
            <div>
              <h2 className={styles.brand}>DR STEEZE</h2>
              <p className={styles.subtext}>
                Creative Direction & Visual Storytelling. Crafting cinematic narratives and handcrafted luxury design globally.
              </p>
            </div>
          </div>

          <div className={styles.linksCol}>
            <div className={styles.socialGroup}>
              <span className={styles.groupTitle}>Connect</span>
              <a
                href="https://instagram.com/_dr_steeze"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                Instagram (@_dr_steeze)
              </a>
              <a
                href="https://tiktok.com/@ayan_tofunmi"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                TikTok (@ayan_tofunmi)
              </a>
              <a
                href="https://wa.me/2347080310627"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                WhatsApp (+234 708 031 0627)
              </a>
              <a
                href="mailto:deborahsobayo@gmail.com"
                className={styles.socialLink}
              >
                Email
              </a>
            </div>

            <div className={styles.socialGroup}>
              <span className={styles.groupTitle}>Navigation</span>
              <Link href="/portfolio" prefetch={false} className={styles.socialLink}>
                Portfolio
              </Link>
              <Link href="/services" prefetch={false} className={styles.socialLink}>
                Services
              </Link>
              <Link href="/culture-of-zion" prefetch={false} className={styles.socialLink}>
                Culture of Zion
              </Link>
              <Link href="/about" prefetch={false} className={styles.socialLink}>
                About
              </Link>
              <Link href="/contact" prefetch={false} className={styles.socialLink}>
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.bottomRow}>
          <div>
            © {new Date().getFullYear()} SOBAYO DEBORAH OLUWASEYITAN (DR STEEZE). ALL RIGHTS RESERVED. NIGERIA.
          </div>
          <div>
            FOUNDER OF{' '}
            <Link href="/culture-of-zion" prefetch={false} className={styles.cultureBadge}>
              CULTURE OF ZION
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
