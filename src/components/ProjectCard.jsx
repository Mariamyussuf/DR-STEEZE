import Image from 'next/image';
import VideoPlayer from './VideoPlayer';
import styles from './ProjectCard.module.css';

/** Extract the video filename (without extension) from a path like "/videos/IMG_0046.mp4" */
function getVideoId(videoPath) {
  if (!videoPath) return null;
  const filename = videoPath.split('/').pop(); // "IMG_0046.mp4"
  return filename.replace(/\.mp4$/i, '');      // "IMG_0046"
}

export default function ProjectCard({ project, aspect = 'standard' }) {
  const aspectClass =
    aspect === 'tall'
      ? styles.aspectTall
      : aspect === 'square'
      ? styles.aspectSquare
      : aspect === 'wide'
      ? styles.aspectWide
      : styles.aspectStandard;

  const isVideoCategory = project.category?.toLowerCase().includes('video') || project.video;
  const videoId = getVideoId(project.video);

  return (
    <div className={styles.card}>
      <div className={`${styles.imageWrapper} ${aspectClass}`}>
        {videoId ? (
          <VideoPlayer
            videoId={videoId}
            poster={project.image}
            className={styles.videoFill}
            defaultQuality="480p"
          />
        ) : (
          <img
            src={project.image}
            alt={project.alt || project.title}
            className={styles.image}
            loading="lazy"
          />
        )}
        {isVideoCategory && (
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            backgroundColor: 'rgba(13, 13, 13, 0.75)',
            backdropFilter: 'blur(8px)',
            color: 'var(--color-gold)',
            fontSize: '10px',
            letterSpacing: '0.15em',
            fontWeight: 600,
            padding: '4px 10px',
            borderRadius: '2px',
            border: '1px solid var(--color-border-gold)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            zIndex: 3
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>play_circle</span>
            MOTION
          </div>
        )}
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

