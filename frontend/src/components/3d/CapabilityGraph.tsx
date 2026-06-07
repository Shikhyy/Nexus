'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, Edges } from '@react-three/drei';
import * as THREE from 'three';

function MorphingGraph() {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!groupRef.current || !innerRef.current || !outerRef.current) return;
    
    // Auto-rotation
    groupRef.current.rotation.y += delta * 0.1;
    innerRef.current.rotation.x -= delta * 0.15;
    innerRef.current.rotation.z += delta * 0.05;
    outerRef.current.rotation.y -= delta * 0.05;

    // Interactive Mouse Parallax
    const targetX = (state.pointer.x * Math.PI) / 6;
    const targetY = (state.pointer.y * Math.PI) / 6;
    groupRef.current.rotation.x += 0.05 * (targetY - groupRef.current.rotation.x);
    groupRef.current.rotation.z += 0.05 * (targetX - groupRef.current.rotation.z);
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
