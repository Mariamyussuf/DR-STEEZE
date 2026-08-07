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
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                Instagram
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                TikTok
              </a>
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                WhatsApp
              </a>
              <a
                href="mailto:hello@drsteeze.com"
                className={styles.socialLink}
              >
                Email
              </a>
              <a
                href="https://vimeo.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                Vimeo
              </a>
            </div>

            <div className={styles.socialGroup}>
              <span className={styles.groupTitle}>Navigation</span>
              <Link href="/portfolio" className={styles.socialLink}>
                Portfolio
              </Link>
              <Link href="/services" className={styles.socialLink}>
                Services
              </Link>
              <Link href="/culture-of-zion" className={styles.socialLink}>
                Culture of Zion
              </Link>
              <Link href="/about" className={styles.socialLink}>
                About
              </Link>
              <Link href="/contact" className={styles.socialLink}>
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.bottomRow}>
          <div>
            © {new Date().getFullYear()} DR STEEZE. ALL RIGHTS RESERVED.
          </div>
          <div>
            FOUNDER OF{' '}
            <Link href="/culture-of-zion" className={styles.cultureBadge}>
              CULTURE OF ZION
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
