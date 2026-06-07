'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FibonacciSphere({ count, radius, color, speed = 0.05 }: {
  count: number;
  radius: number;
  color: string;
  speed?: number;
}) {
  const mesh = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = phi * i;
      pos[i * 3]     = Math.cos(theta) * r * radius;
      pos[i * 3 + 1] = y * radius;
      pos[i * 3 + 2] = Math.sin(theta) * r * radius;
    }
    return pos;
  }, [count, radius]);

  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.y = clock.elapsedTime * speed;
      mesh.current.rotation.x = Math.sin(clock.elapsedTime * 0.12) * 0.08;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          args={[positions, 3]}
          attach="attributes-position"
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color={color}
        sizeAttenuation
        transparent
        opacity={0.55}
      />
    </points>
  );
}

export function OrbScene() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
      >
        <FibonacciSphere count={2400} radius={3.4} color="#6B6560" speed={0.04} />
        <FibonacciSphere count={600}  radius={2.6} color="#C4511A" speed={0.07} />
      </Canvas>
    </div>
  );
}
