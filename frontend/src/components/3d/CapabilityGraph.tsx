'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function MorphingGraph() {
  const innerRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current || !innerRef.current || !outerRef.current) return;
    const t = state.clock.elapsedTime;
    
    // Smooth group sway
    groupRef.current.rotation.y += delta * 0.08;
    groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;

    // Counter-rotating elements
    innerRef.current.rotation.x -= delta * 0.25;
    innerRef.current.rotation.z += delta * 0.15;
    outerRef.current.rotation.y -= delta * 0.15;
    
    // Mouse parallax
    const targetX = (state.pointer.x * Math.PI) / 5;
    const targetY = (state.pointer.y * Math.PI) / 5;
    groupRef.current.rotation.x += 0.05 * (targetY - groupRef.current.rotation.x);
    groupRef.current.rotation.z += 0.05 * (targetX - groupRef.current.rotation.z);
  });

  return (
    <group ref={groupRef}>
      {/* Morphing Organic Core representing liquid capability intelligence */}
      <Sphere ref={innerRef} args={[1.5, 64, 64]}>
        <MeshDistortMaterial 
          color="#C4511A" 
          envMapIntensity={1} 
          clearcoat={1} 
          clearcoatRoughness={0.1} 
          metalness={0.8} 
          roughness={0.2} 
          distort={0.45} 
          speed={2.5} 
        />
      </Sphere>
      
      {/* Wireframe containment shell */}
      <Sphere ref={outerRef} args={[2.2, 32, 32]}>
        <meshPhysicalMaterial 
          color="#1a1918" 
          transparent 
          opacity={0.4} 
          wireframe={true} 
          roughness={0.2} 
          metalness={0.8} 
        />
      </Sphere>
    </group>
  );
}

export function CapabilityGraph() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={1.5} />
        {/* Warm key light */}
        <directionalLight position={[10, 10, 5]} intensity={2.5} color="#fdf3dc" />
        {/* Cool fill light */}
        <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#a0c4c8" />
        <MorphingGraph />
      </Canvas>
    </div>
  );
}
