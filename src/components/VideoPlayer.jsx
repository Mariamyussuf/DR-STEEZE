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
  controls = false,
  showControls = true,
  defaultQuality = '480p',
  ...rest
}) {
  const [quality, setQuality] = useState(defaultQuality);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const videoRef = useRef(null);
  const menuRef = useRef(null);
  const isFirstRender = useRef(true);

  const videoSrc = `/videos/${quality}/${videoId}.mp4`;

  // Toggle sound state
  const toggleSound = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !isMuted;
    video.muted = nextMuted;
    video.volume = nextMuted ? 0 : 1.0;
    setIsMuted(nextMuted);

    if (!nextMuted) {
      video.play().catch(() => {});
    }
  };

  // Sync muted property when isMuted state changes without reloading the video stream
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = isMuted;
      video.volume = isMuted ? 0 : 1.0;
    }
  }, [isMuted]);

  // When quality changes, seamlessly switch src and preserve playback time & state
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    const savedTime = video.currentTime || 0;
    const isPlaying = !video.paused;

    const handleMetadata = () => {
      if (savedTime > 0 && Number.isFinite(savedTime) && savedTime < video.duration) {
        try {
          video.currentTime = savedTime;
        } catch (e) {
          // ignore seek bounds error
        }
      }
      video.muted = isMuted;
      video.volume = isMuted ? 0 : 1.0;
      if (isPlaying || autoPlay) {
        video.play().catch(() => {});
      }
    };

    video.addEventListener('loadedmetadata', handleMetadata, { once: true });
    video.src = videoSrc;
    video.load();
  }, [quality, videoSrc, autoPlay]);

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
        src={videoSrc}
        poster={poster}
        autoPlay={autoPlay}
        loop={loop}
        muted={isMuted}
        controls={controls}
        playsInline
        preload="auto"
        className={styles.video}
      />

      {showControls && (
        <div className={styles.controls} ref={menuRef} onClick={(e) => e.stopPropagation()}>
          <button
            className={styles.soundButton}
            onClick={toggleSound}
            aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
            title={isMuted ? 'Unmute video audio' : 'Mute video audio'}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
              {isMuted ? 'volume_off' : 'volume_up'}
            </span>
            <span className={styles.soundLabel}>{isMuted ? 'Muted' : 'Sound On'}</span>
          </button>

          <button
            className={styles.qualityButton}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setMenuOpen((v) => !v);
            }}
            aria-label="Select video quality"
            title="Video quality"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
              settings
            </span>
            <span className={styles.qualityLabel}>{quality}</span>
          </button>

          {menuOpen && (
            <div className={styles.menu} onClick={(e) => e.stopPropagation()}>
              <span className={styles.menuTitle}>Quality</span>
              {QUALITY_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  className={`${styles.menuItem} ${quality === opt.key ? styles.menuItemActive : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
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

