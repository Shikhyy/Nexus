'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function TinyNexus() {
  const outerRef = useRef<THREE.Points>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  const points = useMemo(() => {
    const count = 180;
    const pos = new Float32Array(count * 3);
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = phi * i;
      pos[i * 3]     = Math.cos(theta) * r * 1.5;
      pos[i * 3 + 1] = y * 1.5;
      pos[i * 3 + 2] = Math.sin(theta) * r * 1.5;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.4;
      outerRef.current.rotation.x = t * 0.15;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.6;
      innerRef.current.rotation.z = t * 0.3;
      // Gentle pulsing scale
      const scale = 1 + Math.sin(t * 2.5) * 0.12;
      innerRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      {/* Surrounding dust ring */}
      <points ref={outerRef}>
        <bufferGeometry>
          <bufferAttribute args={[points, 3]} attach="attributes-position" />
        </bufferGeometry>
        <pointsMaterial size={0.06} color="#a0c4c8" transparent opacity={0.65} />
      </points>
      {/* Pulsing hot core */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.85, 1]} />
        <meshBasicMaterial color="#C4511A" wireframe transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

export function MiniOrb() {
  return (
    <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
      <Canvas camera={{ position: [0, 0, 3] }} dpr={[1, 1.5]} gl={{ alpha: true }}>
        <TinyNexus />
      </Canvas>
    </div>
  );
}
