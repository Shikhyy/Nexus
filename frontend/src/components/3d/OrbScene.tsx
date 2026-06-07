'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/** Dual-shell Fibonacci sphere with pulsing glow particles */
function NexusOrb() {
  const outerRef = useRef<THREE.Points>(null);
  const innerRef = useRef<THREE.Points>(null);
  const ringRef = useRef<THREE.Points>(null);

  const { outerPos, innerPos, ringPos } = useMemo(() => {
    const outerCount = 3200;
    const innerCount = 800;
    const ringCount = 600;
    const phi = Math.PI * (3 - Math.sqrt(5));

    const outerPos = new Float32Array(outerCount * 3);
    for (let i = 0; i < outerCount; i++) {
      const y = 1 - (i / (outerCount - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = phi * i;
      outerPos[i * 3]     = Math.cos(theta) * r * 3.6;
      outerPos[i * 3 + 1] = y * 3.6;
      outerPos[i * 3 + 2] = Math.sin(theta) * r * 3.6;
    }

    const innerPos = new Float32Array(innerCount * 3);
    for (let i = 0; i < innerCount; i++) {
      const y = 1 - (i / (innerCount - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = phi * i;
      innerPos[i * 3]     = Math.cos(theta) * r * 2.4;
      innerPos[i * 3 + 1] = y * 2.4;
      innerPos[i * 3 + 2] = Math.sin(theta) * r * 2.4;
    }

    // Equatorial ring
    const ringPos = new Float32Array(ringCount * 3);
    for (let i = 0; i < ringCount; i++) {
      const angle = (i / ringCount) * Math.PI * 2;
      const jitter = (Math.random() - 0.5) * 0.3;
      ringPos[i * 3]     = Math.cos(angle) * (4.2 + jitter);
      ringPos[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
      ringPos[i * 3 + 2] = Math.sin(angle) * (4.2 + jitter);
    }

    return { outerPos, innerPos, ringPos };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.035;
      outerRef.current.rotation.x = Math.sin(t * 0.11) * 0.07;
      // Pulse opacity
      (outerRef.current.material as THREE.PointsMaterial).opacity = 0.35 + Math.sin(t * 0.8) * 0.1;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.07;
      innerRef.current.rotation.z = t * 0.03;
      (innerRef.current.material as THREE.PointsMaterial).opacity = 0.7 + Math.sin(t * 1.4) * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.y = t * 0.015;
      ringRef.current.rotation.x = Math.sin(t * 0.06) * 0.15;
    }
  });

  return (
    <>
      {/* Outer shell */}
      <points ref={outerRef}>
        <bufferGeometry>
          <bufferAttribute args={[outerPos, 3]} attach="attributes-position" />
        </bufferGeometry>
        <pointsMaterial size={0.018} color="#8a7d74" sizeAttenuation transparent opacity={0.45} />
      </points>
      {/* Inner shell — warm sienna */}
      <points ref={innerRef}>
        <bufferGeometry>
          <bufferAttribute args={[innerPos, 3]} attach="attributes-position" />
        </bufferGeometry>
        <pointsMaterial size={0.032} color="#C4511A" sizeAttenuation transparent opacity={0.75} />
      </points>
      {/* Equatorial ring */}
      <points ref={ringRef}>
        <bufferGeometry>
          <bufferAttribute args={[ringPos, 3]} attach="attributes-position" />
        </bufferGeometry>
        <pointsMaterial size={0.022} color="#a0c4c8" sizeAttenuation transparent opacity={0.5} />
      </points>
    </>
  );
}

export function OrbScene() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }}
      >
        <NexusOrb />
      </Canvas>
    </div>
  );
}
