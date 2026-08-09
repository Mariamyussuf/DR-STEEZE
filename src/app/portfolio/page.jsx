'use client';

import { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import ProjectCard from '@/components/ProjectCard';
import VideoPlayer from '@/components/VideoPlayer';
import { projects } from '@/data/projects';
import styles from './portfolio.module.css';

const categories = [
  'All Work',
  'Fashion Videography',
  'Commercial Videography',
  'Fashion Photography',
  'Commercial Photography'
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All Work');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    activeCategory === 'All Work'
      ? projects
      : projects.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <>
      {/* Portfolio Header */}
      <section className={styles.portfolioHeader}>
        <div className="container-custom">
          <ScrollReveal>
            <span className="label-caps" style={{ color: 'var(--color-gold)', display: 'block', marginBottom: '12px' }}>
              Archive & Selected Works
            </span>
            <h1 className={styles.title}>Motion & Imagery</h1>
            <p className={styles.subtitle}>
              Capturing movement, form, and light. A curation of high-contrast fashion editorials, commercial campaign videos, lookbooks, and brand films directed by Sobayo Deborah Oluwaseyitan (DR STEEZE).
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Category Filter & Masonry Grid */}
      <section className="container-custom">
        <div className={styles.filtersSection}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${activeCategory === cat ? styles.activeFilter : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.masonryGrid}>
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className={styles.masonryItem}
              onClick={() => setSelectedProject(project)}
            >
              <ScrollReveal delay={(idx % 3) + 1}>
                <ProjectCard
                  project={project}
                  aspect={idx % 2 === 0 ? 'tall' : 'standard'}
                />
              </ScrollReveal>
            </div>
          ))}
        </div>
      </section>

      {/* Case Study Detail Modal */}
      {selectedProject && (
        <div className={styles.modalBackdrop} onClick={() => setSelectedProject(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeBtn}
              onClick={() => setSelectedProject(null)}
              aria-label="Close detail"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            {selectedProject.video ? (
              <VideoPlayer
                videoId={selectedProject.video.split('/').pop().replace(/\.mp4$/i, '')}
                poster={selectedProject.image}
                className={styles.modalImage}
                defaultQuality="720p"
                showControls={true}
                controls={true}
              />
            ) : (
              <img
                src={selectedProject.image}
                alt={selectedProject.alt || selectedProject.title}
                className={styles.modalImage}
              />
            )}

            <span className="label-caps" style={{ color: 'var(--color-gold)' }}>
              {selectedProject.category} — {selectedProject.year}
            </span>
            <h2 className="headline-xl" style={{ marginTop: '8px', marginBottom: '16px' }}>
              {selectedProject.title}
            </h2>

            <div className={styles.modalMeta}>
              <div>
                <div className={styles.metaLabel}>Client</div>
                <div className={styles.metaValue}>{selectedProject.client || 'Select Commission'}</div>
              </div>
              <div>
                <div className={styles.metaLabel}>Role</div>
                <div className={styles.metaValue}>{selectedProject.role || 'Creative Director'}</div>
              </div>
              <div>
                <div className={styles.metaLabel}>Deliverable</div>
                <div className={styles.metaValue}>{selectedProject.subCategory || selectedProject.category}</div>
              </div>
            </div>

            <p className="body-lg" style={{ marginBottom: '32px' }}>
              {selectedProject.description}
            </p>

            {selectedProject.gallery && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '24px' }}>
                {selectedProject.gallery.map((img, i) => (
                  <img key={i} src={img} alt="Gallery view" style={{ width: '100%', height: '260px', objectFit: 'cover' }} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
