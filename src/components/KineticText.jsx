'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function KineticText({
  children,
  as: Component = 'h2',
  className = '',
  delay = 0,
  stagger = 0.05,
  duration = 1.1,
  start = 'top 88%',
  style = {},
}) {
  const containerRef = useRef(null);
  const textContent = typeof children === 'string' ? children : '';
  const words = textContent ? textContent.split(' ') : [];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const targets = el.querySelectorAll('.kinetic-word');
    if (!targets.length) return;

    gsap.set(targets, {
      y: '115%',
      opacity: 0,
      rotateX: -20,
      transformOrigin: '0% 50% -50',
    });

    const animation = gsap.to(targets, {
      y: '0%',
      opacity: 1,
      rotateX: 0,
      duration: duration,
      delay: delay,
      stagger: stagger,
      ease: 'power4.out',
      paused: true,
    });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: start,
      once: true,
      onEnter: () => animation.play(),
    });

    return () => {
      trigger.kill();
      animation.kill();
    };
  }, [delay, stagger, duration, start, textContent]);

  if (!textContent) {
    return (
      <Component ref={containerRef} className={className} style={style}>
        {children}
      </Component>
    );
  }

  return (
    <Component
      ref={containerRef}
      className={className}
      style={{ perspective: '1000px', ...style }}
    >
      {words.map((word, wIdx) => (
        <span
          key={wIdx}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'top',
            marginRight: '0.25em',
            paddingBottom: '0.05em',
          }}
        >
          <span
            className="kinetic-word"
            style={{
              display: 'inline-block',
              willChange: 'transform, opacity',
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
}
