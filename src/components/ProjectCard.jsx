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
          <div className={styles.motionBadge}>
            <span className={`material-symbols-outlined ${styles.motionIcon}`}>play_circle</span>
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

