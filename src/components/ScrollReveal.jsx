'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollReveal({
  children,
  delay = 0,
  className = '',
  animation = 'fade-up',
  duration = 1.0,
  start = 'top 88%',
  style = {},
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let initialVars = { opacity: 0 };

    if (animation === 'fade-up') {
      initialVars = { opacity: 0, y: 40 };
    } else if (animation === 'scale-up') {
      initialVars = { opacity: 0, scale: 0.94, y: 30 };
    } else if (animation === 'slide-right') {
      initialVars = { opacity: 0, x: -40 };
    }

    gsap.set(el, initialVars);

    const anim = gsap.to(el, {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration: duration,
      delay: delay * 0.15,
      ease: 'power3.out',
      paused: true,
    });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: start,
      once: true,
      onEnter: () => anim.play(),
    });

    return () => {
      trigger.kill();
      anim.kill();
    };
  }, [delay, animation, duration, start]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
