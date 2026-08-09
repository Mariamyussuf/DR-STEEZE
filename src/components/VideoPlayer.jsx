'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './VideoPlayer.module.css';

const QUALITY_OPTIONS = [
  { key: '480p', label: '480p', description: 'Low' },
  { key: '720p', label: '720p', description: 'Medium' },
  { key: '1080p', label: '1080p', description: 'High' },
];

/**
 * VideoPlayer with quality selector.
 *
 * Usage:
 *   <VideoPlayer videoId="IMG_0046" poster="/images/poster_IMG_0046.jpg" />
 *
 * The component resolves the video path as:
 *   /videos/{quality}/{videoId}.mp4
 */
export default function VideoPlayer({
  videoId,
  poster,
  className = '',
  autoPlay = true,
  loop = true,
  muted = true,
  showControls = true,
  defaultQuality = '480p',
  ...rest
}) {
  const [quality, setQuality] = useState(defaultQuality);
  const [menuOpen, setMenuOpen] = useState(false);
  const videoRef = useRef(null);
  const menuRef = useRef(null);

  const videoSrc = `/videos/${quality}/${videoId}.mp4`;

  // When quality changes, reload the video and maintain playback state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const currentTime = video.currentTime;
    const wasPlaying = !video.paused;

    video.load();

    const onLoaded = () => {
      video.currentTime = currentTime;
      if (wasPlaying) video.play().catch(() => {});
      video.removeEventListener('loadeddata', onLoaded);
    };
    video.addEventListener('loadeddata', onLoaded);
  }, [quality]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  return (
    <div className={`${styles.wrapper} ${className}`} {...rest}>
      <video
        ref={videoRef}
        poster={poster}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline
        preload="auto"
        className={styles.video}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {showControls && (
        <div className={styles.controls} ref={menuRef}>
          <button
            className={styles.qualityButton}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Select video quality"
            title="Video quality"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
              settings
            </span>
            <span className={styles.qualityLabel}>{quality}</span>
          </button>

          {menuOpen && (
            <div className={styles.menu}>
              <span className={styles.menuTitle}>Quality</span>
              {QUALITY_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  className={`${styles.menuItem} ${quality === opt.key ? styles.menuItemActive : ''}`}
                  onClick={() => {
                    setQuality(opt.key);
                    setMenuOpen(false);
                  }}
                >
                  <span className={styles.menuItemLabel}>{opt.label}</span>
                  <span className={styles.menuItemDesc}>{opt.description}</span>
                  {quality === opt.key && (
                    <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--color-gold)' }}>
                      check
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
