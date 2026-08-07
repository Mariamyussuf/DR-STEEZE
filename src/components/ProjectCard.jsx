import Image from 'next/image';
import styles from './ProjectCard.module.css';

export default function ProjectCard({ project, aspect = 'standard' }) {
  const aspectClass =
    aspect === 'tall'
      ? styles.aspectTall
      : aspect === 'square'
      ? styles.aspectSquare
      : aspect === 'wide'
      ? styles.aspectWide
      : styles.aspectStandard;

  return (
    <div className={styles.card}>
      <div className={`${styles.imageWrapper} ${aspectClass}`}>
        <img
          src={project.image}
          alt={project.alt || project.title}
          className={styles.image}
          loading="lazy"
        />
        <div className={styles.goldLine} />
      </div>
      <div className={styles.metaRow}>
        <div>
          <h4 className={styles.title}>{project.title}</h4>
          <p className={styles.subCategory}>{project.subCategory || project.category}</p>
        </div>
        <span className={styles.yearTag}>{project.year}</span>
      </div>
    </div>
  );
}
