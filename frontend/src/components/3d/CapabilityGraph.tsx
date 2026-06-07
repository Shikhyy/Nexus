'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, Edges } from '@react-three/drei';
import * as THREE from 'three';

function MorphingGraph() {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current && outerRef.current) {
      // Rotation
      meshRef.current.rotation.x = t * 0.2;
      meshRef.current.rotation.y = t * 0.3;
      outerRef.current.rotation.x = t * -0.1;
      outerRef.current.rotation.y = t * -0.2;
      
      // Pulsing scale
      const scale = 1 + Math.sin(t * 2) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      {/* Inner Core */}
      <Icosahedron ref={meshRef} args={[2, 1]}>
        <meshBasicMaterial color="#2d3a3a" wireframe={true} transparent opacity={0.4} />
      </Icosahedron>
      
      {/* Outer Shell */}
      <Icosahedron ref={outerRef} args={[2.8, 2]}>
        <meshBasicMaterial color="#1a1918" transparent opacity={0.9} />
        <Edges scale={1.0} color="#b39d82" />
      </Icosahedron>
    </group>
  );
}

export function CapabilityGraph() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <MorphingGraph />
      </Canvas>
    </div>
  );
}
