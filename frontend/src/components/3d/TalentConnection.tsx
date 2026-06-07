/* eslint-disable react-hooks/purity */
'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

function FlowingParticles() {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const sphere1Ref = useRef<THREE.Mesh>(null);
  const sphere2Ref = useRef<THREE.Mesh>(null);
  
  const particleCount = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      // Start randomly along the X axis between the two spheres
      pos[i * 3] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 1.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current || !pointsRef.current || !sphere1Ref.current || !sphere2Ref.current) return;
    
    // Auto-rotation
    groupRef.current.rotation.y += delta * 0.05;
    sphere1Ref.current.rotation.y -= delta * 0.2;
    sphere2Ref.current.rotation.y += delta * 0.2;

    // Interactive Mouse Parallax
    const targetX = (state.pointer.x * Math.PI) / 8;
    const targetY = (state.pointer.y * Math.PI) / 8;
    groupRef.current.rotation.x += 0.05 * (targetY - groupRef.current.rotation.x);
    groupRef.current.rotation.z += 0.05 * (targetX - groupRef.current.rotation.z);

    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < particleCount; i++) {
      // Move particles from left to right
      posArray[i * 3] += 0.05;
      // Add sine wave motion
      posArray[i * 3 + 1] += Math.sin(state.clock.elapsedTime * 2 + i) * 0.01;
      
      // Reset if they go too far right
      if (posArray[i * 3] > 3) {
        posArray[i * 3] = -3;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      {/* Mentor Sphere */}
      <Sphere ref={sphere1Ref} position={[-4, 0, 0]} args={[1.2, 32, 32]}>
        <meshBasicMaterial color="#c65d3b" wireframe />
      </Sphere>
      
      {/* Mentee Sphere */}
      <Sphere ref={sphere2Ref} position={[4, 0, 0]} args={[1.2, 32, 32]}>
        <meshBasicMaterial color="#b39d82" wireframe />
      </Sphere>

      {/* Flowing Data Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={particleCount}
          />
        </bufferGeometry>
        <pointsMaterial size={0.08} color="#2d3a3a" transparent opacity={0.8} />
      </points>
    </group>
  );
}

export function TalentConnection() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <FlowingParticles />
      </Canvas>
    </div>
  );
}
