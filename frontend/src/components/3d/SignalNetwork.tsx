/* eslint-disable react-hooks/purity */
'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function NetworkNodes() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Generate random nodes
  const nodeCount = 50;
  const nodes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < nodeCount; i++) {
      temp.push(new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8
      ));
    }
    return temp;
  }, []);

  // Generate lines connecting nearby nodes
  const lines = useMemo(() => {
    const temp = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 2.5) {
          temp.push([nodes[i], nodes[j]]);
        }
      }
    }
    return temp;
  }, [nodes]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Auto-rotation
      groupRef.current.rotation.y += delta * 0.05;
      groupRef.current.rotation.x += delta * 0.02;

      // Interactive Mouse Parallax
      const targetX = (state.pointer.y * Math.PI) / 8;
      const targetY = (state.pointer.x * Math.PI) / 8;
      groupRef.current.rotation.x += 0.05 * (targetX - groupRef.current.rotation.x);
      groupRef.current.rotation.y += 0.05 * (targetY - groupRef.current.rotation.y);
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((pos, i) => (
        <Sphere key={i} position={pos} args={[0.08, 8, 8]}>
          <meshBasicMaterial color="#b39d82" transparent opacity={0.8} />
        </Sphere>
      ))}
      {lines.map((pts, i) => (
        <Line key={`line-${i}`} points={pts} color="#c65d3b" lineWidth={1} transparent opacity={0.3} />
      ))}
    </group>
  );
}

export function SignalNetwork() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <fog attach="fog" args={['#1a1918', 5, 15]} />
        <NetworkNodes />
      </Canvas>
    </div>
  );
}
