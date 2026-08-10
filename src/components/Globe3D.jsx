'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import styles from './Globe3D.module.css';

export const LOCATIONS = [
  {
    id: 'london',
    name: 'LONDON, UK',
    lat: 51.5074,
    lng: -0.1278,
    coordsText: '51.5074° N, 0.1278° W',
    region: 'GLOBAL VISION HUB',
    role: 'Editorial & International Commercial Hub'
  },
  {
    id: 'lagos',
    name: 'LAGOS, NIGERIA',
    lat: 6.5244,
    lng: 3.3792,
    coordsText: '6.5244° N, 3.3792° E',
    region: 'FOUNDATION & CULTURE',
    role: 'Cultural Roots & African Fashion Platform'
  },
  {
    id: 'paris',
    name: 'PARIS, FRANCE',
    lat: 48.8566,
    lng: 2.3522,
    coordsText: '48.8566° N, 2.3522° E',
    region: 'FUTURE EXPANSION',
    role: 'Haute Couture & Luxury Editorial Destination'
  },
  {
    id: 'newyork',
    name: 'NEW YORK, USA',
    lat: 40.7128,
    lng: -74.0060,
    coordsText: '40.7128° N, 74.0060° W',
    region: 'FUTURE EXPANSION',
    role: 'Commercial Media & Global Partnerships'
  },
  {
    id: 'tokyo',
    name: 'TOKYO, JAPAN',
    lat: 35.6762,
    lng: 139.6503,
    coordsText: '35.6762° N, 139.6503° E',
    region: 'FUTURE EXPANSION',
    role: 'Avant-Garde Street Culture & Media Arts'
  }
];

// Helper to convert lat/lng to 3D vector on sphere of radius R
function latLngToVector3(lat, lng, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Convert sphere rotation angles back to approximate lat/lng coordinates facing camera
function rotationToLatLng(rotX, rotY) {
  let lat = (-rotX * 180) / Math.PI;
  let lng = ((-rotY * 180) / Math.PI) % 360;
  if (lng > 180) lng -= 360;
  if (lng < -180) lng += 360;
  lat = Math.max(-85, Math.min(85, lat));

  const latStr = `${Math.abs(lat).toFixed(4)}° ${lat >= 0 ? 'N' : 'S'}`;
  const lngStr = `${Math.abs(lng).toFixed(4)}° ${lng >= 0 ? 'E' : 'W'}`;
  return { lat, lng, text: `${latStr}, ${lngStr}` };
}

export default function Globe3D({
  interactive = true,
  compact = false,
  showHud = true,
  className = ''
}) {
  const mountRef = useRef(null);
  const [activeLoc, setActiveLoc] = useState(LOCATIONS[0]);
  const [currentCoords, setCurrentCoords] = useState(LOCATIONS[0].coordsText);
  const targetRotationRef = useRef({ x: 0.2, y: 0.5 });
  const currentRotationRef = useRef({ x: 0.2, y: 0.5 });
  const isDraggingRef = useRef(false);
  const previousMouseRef = useRef({ x: 0, y: 0 });

  // Rotate globe to target location coordinates smoothly
  const flyToLocation = (loc) => {
    setActiveLoc(loc);
    setCurrentCoords(loc.coordsText);
    const phi = (90 - loc.lat) * (Math.PI / 180);
    const theta = (loc.lng + 180) * (Math.PI / 180);

    // Target rotation X and Y so marker faces camera
    const targetX = phi - Math.PI / 2;
    const targetY = -theta + Math.PI / 2;

    targetRotationRef.current = { x: targetX, y: targetY };
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // Scene & Camera setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = compact ? 6.5 : 5.8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const radius = 2.0;

    // 1. Create Point Cloud Sphere (Fibonacci Grid Dot Matrix)
    const particleCount = 2800;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const goldColor = new THREE.Color('#c5a059');
    const dimColor = new THREE.Color('#3a352a');
    const brightColor = new THREE.Color('#f0d890');

    const phiRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < particleCount; i++) {
      const y = 1 - (i / (particleCount - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = (2 * Math.PI * i) / phiRatio;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      positions[i * 3] = x * radius;
      positions[i * 3 + 1] = y * radius;
      positions[i * 3 + 2] = z * radius;

      // Color variation
      const isBright = Math.random() > 0.85;
      const particleColor = isBright ? brightColor : (Math.random() > 0.5 ? goldColor : dimColor);
      colors[i * 3] = particleColor.r;
      colors[i * 3 + 1] = particleColor.g;
      colors[i * 3 + 2] = particleColor.b;

      sizes[i] = isBright ? 0.045 : 0.025;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom Canvas Texture for smooth circular dots
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.4, 'rgba(255, 215, 120, 0.8)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(32, 32, 32, 0, Math.PI * 2);
    ctx.fill();

    const dotTexture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      map: dotTexture,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    globeGroup.add(particles);

    // 2. Latitude & Longitude Wireframe Rings
    const ringGroup = new THREE.Group();

    // Equator ring
    const equatorGeo = new THREE.BufferGeometry();
    const ringPts = [];
    const ringSegments = 90;
    for (let i = 0; i <= ringSegments; i++) {
      const a = (i / ringSegments) * Math.PI * 2;
      ringPts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
    }
    equatorGeo.setFromPoints(ringPts);

    const ringMatGold = new THREE.LineBasicMaterial({
      color: 0xc5a059,
      transparent: true,
      opacity: 0.4
    });
    const ringMatDim = new THREE.LineBasicMaterial({
      color: 0x444444,
      transparent: true,
      opacity: 0.25
    });

    const equatorMesh = new THREE.Line(equatorGeo, ringMatGold);
    ringGroup.add(equatorMesh);

    // Additional latitude lines (+30, -30, +60, -60)
    [30, -30, 60, -60].forEach((latDeg) => {
      const r = radius * Math.cos((latDeg * Math.PI) / 180);
      const h = radius * Math.sin((latDeg * Math.PI) / 180);
      const pts = [];
      for (let i = 0; i <= ringSegments; i++) {
        const a = (i / ringSegments) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * r, h, Math.sin(a) * r));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      ringGroup.add(new THREE.Line(geo, ringMatDim));
    });

    // Meridians (Longitude lines)
    [0, 45, 90, 135, 180, 225, 270, 315].forEach((lngDeg) => {
      const pts = [];
      const rotY = (lngDeg * Math.PI) / 180;
      for (let i = 0; i <= ringSegments; i++) {
        const a = (i / ringSegments) * Math.PI * 2;
        const x = Math.cos(a) * radius;
        const y = Math.sin(a) * radius;
        const pos = new THREE.Vector3(x, y, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), rotY);
        pts.push(pos);
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      ringGroup.add(new THREE.Line(geo, ringMatDim));
    });

    globeGroup.add(ringGroup);

    // 3. Atmosphere Outer Glow
    const atmosphereGeo = new THREE.SphereGeometry(radius * 1.12, 32, 32);
    const atmosphereMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.8);
          gl_FragColor = vec4(0.77, 0.63, 0.35, 1.0) * intensity * 0.55;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    scene.add(atmosphereMesh);

    // 4. Interactive Location Markers
    const markerGroup = new THREE.Group();
    const pulseRings = [];

    LOCATIONS.forEach((loc) => {
      const pos = latLngToVector3(loc.lat, loc.lng, radius * 1.01);

      // Core Marker Dot
      const markerGeo = new THREE.SphereGeometry(0.045, 16, 16);
      const markerMat = new THREE.MeshBasicMaterial({ color: 0xffd700 });
      const markerMesh = new THREE.Mesh(markerGeo, markerMat);
      markerMesh.position.copy(pos);
      markerGroup.add(markerMesh);

      // Pulse Ring around marker
      const pulseGeo = new THREE.RingGeometry(0.06, 0.09, 32);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: 0xc5a059,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
      });
      const pulseRing = new THREE.Mesh(pulseGeo, pulseMat);
      pulseRing.position.copy(pos);
      pulseRing.lookAt(pos.clone().multiplyScalar(2));
      markerGroup.add(pulseRing);

      pulseRings.push({ mesh: pulseRing, baseScale: 1 });
    });

    globeGroup.add(markerGroup);

    // Initial position flyTo
    flyToLocation(LOCATIONS[0]);

    // Drag Interaction Listeners
    const handleMouseDown = (e) => {
      if (!interactive) return;
      isDraggingRef.current = true;
      previousMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (!isDraggingRef.current || !interactive) return;

      const deltaX = e.clientX - previousMouseRef.current.x;
      const deltaY = e.clientY - previousMouseRef.current.y;

      targetRotationRef.current.y += deltaX * 0.005;
      targetRotationRef.current.x += deltaY * 0.005;

      // Limit pitch to prevent flipping upside down
      targetRotationRef.current.x = Math.max(
        -Math.PI / 2.2,
        Math.min(Math.PI / 2.2, targetRotationRef.current.x)
      );

      previousMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleTouchStart = (e) => {
      if (!interactive || !e.touches[0]) return;
      isDraggingRef.current = true;
      previousMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchMove = (e) => {
      if (!isDraggingRef.current || !interactive || !e.touches[0]) return;

      const deltaX = e.touches[0].clientX - previousMouseRef.current.x;
      const deltaY = e.touches[0].clientY - previousMouseRef.current.y;

      targetRotationRef.current.y += deltaX * 0.006;
      targetRotationRef.current.x += deltaY * 0.006;

      targetRotationRef.current.x = Math.max(
        -Math.PI / 2.2,
        Math.min(Math.PI / 2.2, targetRotationRef.current.x)
      );

      previousMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    domElem.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleMouseUp);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Auto rotation when idle / not dragging
      if (!isDraggingRef.current) {
        targetRotationRef.current.y += 0.0012;
      }

      // Easing rotation towards target
      currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.05;
      currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.05;

      globeGroup.rotation.x = currentRotationRef.current.x;
      globeGroup.rotation.y = currentRotationRef.current.y;

      // Pulse animation for location rings
      pulseRings.forEach((item, idx) => {
        const s = 1 + 0.35 * Math.sin(elapsedTime * 3 + idx);
        item.mesh.scale.set(s, s, s);
        item.mesh.material.opacity = 0.8 - 0.35 * Math.sin(elapsedTime * 3 + idx);
      });

      // Update current coordinates readout based on facing direction
      if (showHud && Math.random() < 0.15) {
        const faceCoords = rotationToLatLng(
          currentRotationRef.current.x,
          currentRotationRef.current.y
        );
        setCurrentCoords(faceCoords.text);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      domElem.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domElem.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      particleGeometry.dispose();
      particleMaterial.dispose();
      equatorGeo.dispose();
      ringMatGold.dispose();
      ringMatDim.dispose();
      atmosphereGeo.dispose();
      atmosphereMat.dispose();
      renderer.dispose();
    };
  }, [compact, interactive, showHud]);

  return (
    <div className={`${styles.globeWrapper} ${compact ? styles.compactWrapper : ''} ${className}`}>
      {/* HUD Reticle Overlay */}
      {showHud && (
        <div className={styles.hudOverlay}>
          <div className={styles.hudTopBar}>
            <div className={styles.hudBadge}>
              <span className={styles.hudPulse} />
              <span className={styles.hudLabel}>GLOBAL EXPANSION VISION</span>
            </div>
            <div className={styles.hudCoords}>{currentCoords}</div>
          </div>

          <div className={styles.crosshair}>
            <div className={styles.crosshairH} />
            <div className={styles.crosshairV} />
            <div className={styles.crosshairCenter} />
          </div>

          {!compact && (
            <div className={styles.hudBottomBar}>
              <div className={styles.locationSelector}>
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => flyToLocation(loc)}
                    className={`${styles.locBtn} ${activeLoc.id === loc.id ? styles.locBtnActive : ''}`}
                    type="button"
                  >
                    {loc.name.split(',')[0]}
                  </button>
                ))}
              </div>

              <div className={styles.activeLocCard}>
                <div className={styles.locHeader}>
                  <span className={styles.locTitle}>{activeLoc.name}</span>
                  <span className={styles.locRegion}>// {activeLoc.region}</span>
                </div>
                <div className={styles.locCoordsVal}>{activeLoc.coordsText}</div>
                <div className={styles.locRole}>{activeLoc.role}</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3D Canvas Mount Point */}
      <div ref={mountRef} className={styles.canvasContainer} />
    </div>
  );
}
