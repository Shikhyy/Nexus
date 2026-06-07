'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Float } from '@react-three/drei';
import * as THREE from 'three';

function EnergyFlow() {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const mentorRef = useRef<THREE.Mesh>(null);
  const menteeRef = useRef<THREE.Mesh>(null);
  
  const particleCount = 600;
  
  const { positions, phases } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const phs = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8; // x spread
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2; // y spread
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2; // z spread
      phs[i] = Math.random() * Math.PI * 2;
    }
    return { positions: pos, phases: phs };
  }, [particleCount]);

  useFrame((state, delta) => {
    if (!groupRef.current || !pointsRef.current || !mentorRef.current || !menteeRef.current) return;
    const t = state.clock.elapsedTime;
    
    // Smooth group rotation
    groupRef.current.rotation.y += delta * 0.04;
    
    // Spheres rotation
    mentorRef.current.rotation.y -= delta * 0.5;
    mentorRef.current.rotation.x += delta * 0.2;
    menteeRef.current.rotation.y += delta * 0.3;
    menteeRef.current.rotation.z -= delta * 0.2;

    // Interactive Mouse Parallax
    const tx = (state.pointer.x * Math.PI) / 6;
    const ty = (state.pointer.y * Math.PI) / 6;
    groupRef.current.rotation.x += 0.05 * (ty - groupRef.current.rotation.x);
    groupRef.current.rotation.z += 0.05 * (tx - groupRef.current.rotation.z);

    // Particle flow mechanics
    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < particleCount; i++) {
      // Linear flow left to right
      posArray[i * 3] += 0.08 + Math.sin(t + phases[i]) * 0.02;
      
      // Helical/sine wave motion
      const radius = 0.4 + Math.sin(t * 2 + phases[i]) * 0.3;
      posArray[i * 3 + 1] = Math.sin(posArray[i * 3] * 1.5 + t * 2 + phases[i]) * radius;
      posArray[i * 3 + 2] = Math.cos(posArray[i * 3] * 1.5 + t * 2 + phases[i]) * radius;
      
      // Reset at the mentee sphere
      if (posArray[i * 3] > 4) {
        posArray[i * 3] = -4;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      {/* Mentor Node */}
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1.5}>
        <Sphere ref={mentorRef} position={[-4, 0, 0]} args={[1.1, 24, 24]}>
          <meshBasicMaterial color="#C4511A" wireframe transparent opacity={0.4} />
        </Sphere>
        <Sphere position={[-4, 0, 0]} args={[0.5, 32, 32]}>
          <meshBasicMaterial color="#C4511A" />
        </Sphere>
        {/* Glow */}
        <Sphere position={[-4, 0, 0]} args={[1.4, 16, 16]}>
          <meshBasicMaterial color="#C4511A" transparent opacity={0.08} blending={THREE.AdditiveBlending} />
        </Sphere>
      </Float>
      
      {/* Mentee Node */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1.2}>
        <Sphere ref={menteeRef} position={[4, 0, 0]} args={[1.1, 24, 24]}>
          <meshBasicMaterial color="#a0c4c8" wireframe transparent opacity={0.4} />
        </Sphere>
        <Sphere position={[4, 0, 0]} args={[0.5, 32, 32]}>
          <meshBasicMaterial color="#a0c4c8" />
        </Sphere>
        {/* Glow */}
        <Sphere position={[4, 0, 0]} args={[1.4, 16, 16]}>
          <meshBasicMaterial color="#a0c4c8" transparent opacity={0.08} blending={THREE.AdditiveBlending} />
        </Sphere>
      </Float>

      {/* Flowing Data Stream */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.07} color="#e8d5c4" transparent opacity={0.8} blending={THREE.AdditiveBlending} />
      </points>
    </group>
  );
}

export function TalentConnection() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: false, alpha: true }}>
        <fog attach="fog" args={['#1a1918', 5, 15]} />
        <EnergyFlow />
      </Canvas>
    </div>
  );
}
