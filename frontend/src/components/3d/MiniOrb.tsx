'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function RotatingCore() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.x = clock.elapsedTime * 0.9;
      mesh.current.rotation.y = clock.elapsedTime * 1.3;
    }
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color="#C4511A" wireframe />
    </mesh>
  );
}

export function MiniOrb() {
  return (
    <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
      <Canvas camera={{ position: [0, 0, 2.5] }} dpr={[1, 1]}>
        <RotatingCore />
      </Canvas>
    </div>
  );
}
