import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Increased rotation speed
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.5;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
    
    // Faster floating motion
    meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.15;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial
        color="#4b0082"
        wireframe
        roughness={0.5}
        metalness={0.8}
      />
    </mesh>
  );
}