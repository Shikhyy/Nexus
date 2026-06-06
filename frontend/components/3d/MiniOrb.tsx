'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function RotatingCore() {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.02;
      mesh.current.rotation.y += 0.03;
    }
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color="#C4511A" wireframe transparent opacity={0.8} />
    </mesh>
  );
}

export function MiniOrb() {
  return (
    <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 2.5] }} dpr={[1, 2]}>
        <RotatingCore />
      </Canvas>
    </div>
  );
}
