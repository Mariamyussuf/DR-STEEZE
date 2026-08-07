'use client';

import { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import styles from './contact.module.css';

export default function ContactPage() {
  const [status, setStatus] = useState({ loading: false, success: false, error: null });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'Executive Creative Direction',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus({ loading: false, success: true, error: null });
      } else {
        setStatus({ loading: false, success: false, error: data.error || 'Failed to send inquiry.' });
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: 'Network error. Please try again.' });
    }
  };

  return (
    <section className={styles.section}>
      <div className="container-custom">
        <div className={styles.grid}>
          {/* Left Column */}
          <div className={styles.leftCol}>
            <ScrollReveal>
              <span className="label-caps" style={{ color: 'var(--color-gold)', display: 'block', marginBottom: '16px' }}>
                Commissions & Inquiries
              </span>
              <h1 className={styles.heading}>
                Let's Create<br />
                Something<br />
                <span className={styles.italicGold}>Iconic.</span>
              </h1>

              <div className={styles.socialList}>
                <a
                  href="mailto:hello@drsteeze.com"
                  className={styles.socialItem}
                >
                  <span>Email</span>
                  <span className={`material-symbols-outlined ${styles.arrowIcon}`}>arrow_forward</span>
                </a>
                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialItem}
                >
                  <span>WhatsApp</span>
                  <span className={`material-symbols-outlined ${styles.arrowIcon}`}>arrow_forward</span>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialItem}
                >
                  <span>Instagram</span>
                  <span className={`material-symbols-outlined ${styles.arrowIcon}`}>arrow_forward</span>
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialItem}
                >
                  <span>TikTok</span>
                  <span className={`material-symbols-outlined ${styles.arrowIcon}`}>arrow_forward</span>
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column Form */}
          <div className={styles.rightCol}>
            <ScrollReveal delay={1}>
              {status.success ? (
                <div className={styles.feedbackMsg}>
                  Thank you for reaching out. DR STEEZE Studio has received your inquiry and will respond within 24-48 hours.
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit}>
                  {status.error && (
                    <div style={{ color: 'var(--color-gold)', fontSize: '14px', border: '1px solid var(--color-gold)', padding: '12px' }}>
                      {status.error}
                    </div>
                  )}

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Your Name / Studio"
                      className={styles.input}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Email</label>
                    <input
                      type="email"
                      required
                      placeholder="studio@brand.com"
                      className={styles.input}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Inquiry Type</label>
                    <select
                      className={styles.select}
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    >
                      <option value="Photography">Photography Commission</option>
                      <option value="Filmmaking">Filmmaking & Commercial Direction</option>
                      <option value="Executive Creative Direction">Executive Creative Direction</option>
                      <option value="Culture of Zion">Culture of Zion Partnership</option>
                      <option value="Other">Other Concept</option>
                    </select>
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Message</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell us about your project vision, timeline, and scope..."
                      className={styles.textarea}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status.loading}
                    className={`primary-button ${styles.submitBtn}`}
                  >
                    {status.loading ? 'Transmitting...' : 'Submit Inquiry'}
                  </button>
                </form>
              )}
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
