'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/** Animated neural network graph with glowing node pulses and dynamic edges */
function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { nodePositions, linePositions, nodeCount } = useMemo(() => {
    const nodeCount = 60;
    const nodes: THREE.Vector3[] = [];

    // Stratified layout — clusters of nodes
    for (let i = 0; i < nodeCount; i++) {
      const layer = Math.floor(i / 20);
      const angle = (i / 20) * Math.PI * 2 + layer * 0.4;
      const radius = 2.5 + Math.random() * 2.5;
      nodes.push(new THREE.Vector3(
        Math.cos(angle) * radius * (0.6 + Math.random() * 0.5),
        (Math.random() - 0.5) * 7,
        Math.sin(angle) * radius * (0.6 + Math.random() * 0.5),
      ));
    }

    // Node positions buffer
    const nodePositions = new Float32Array(nodeCount * 3);
    nodes.forEach((n, i) => { nodePositions[i*3]=n.x; nodePositions[i*3+1]=n.y; nodePositions[i*3+2]=n.z; });

    // Edge positions — connect nearby nodes
    const edgeVerts: number[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 2.8) {
          edgeVerts.push(nodes[i].x, nodes[i].y, nodes[i].z);
          edgeVerts.push(nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
    }
    const linePositions = new Float32Array(edgeVerts);
    return { nodePositions, linePositions, nodeCount };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Slow auto-rotation
    groupRef.current.rotation.y += delta * 0.04;
    groupRef.current.rotation.x += delta * 0.01;

    // Mouse parallax
    const tx = (state.pointer.y * Math.PI) / 7;
    const ty = (state.pointer.x * Math.PI) / 7;
    groupRef.current.rotation.x += 0.04 * (tx - groupRef.current.rotation.x);
    groupRef.current.rotation.y += 0.04 * (ty - groupRef.current.rotation.y);

    // Pulse line opacity
    if (linesRef.current) {
      (linesRef.current.material as THREE.LineBasicMaterial).opacity = 0.2 + Math.sin(t * 0.7) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Edges */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute args={[linePositions, 3]} attach="attributes-position" />
        </bufferGeometry>
        <lineBasicMaterial color="#c65d3b" transparent opacity={0.25} />
      </lineSegments>

      {/* Nodes as point cloud */}
      <points>
        <bufferGeometry>
          <bufferAttribute args={[nodePositions, 3]} attach="attributes-position" />
        </bufferGeometry>
        <pointsMaterial size={0.12} color="#e8d5c4" sizeAttenuation transparent opacity={0.9} />
      </points>

      {/* Larger accent nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute args={[nodePositions.slice(0, 10 * 3), 3]} attach="attributes-position" />
        </bufferGeometry>
        <pointsMaterial size={0.22} color="#C4511A" sizeAttenuation transparent opacity={1} />
      </points>
    </group>
  );
}

export function SignalNetwork() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
      >
        <fog attach="fog" args={['#1a1918', 6, 18]} />
        <ambientLight intensity={0.3} />
        <NeuralNetwork />
      </Canvas>
    </div>
  );
}
