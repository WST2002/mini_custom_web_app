import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { AnimatedSphere } from './AnimatedSphere';
import { AnimatedCircles } from './AnimatedCircles';
import { FloatingParticles } from './FloatingParticles';
import { HeroContent } from './HeroContent';

export function Hero() {
  return (
    <div id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <AnimatedCircles />
      <FloatingParticles />
      
      {/* 3D Sphere */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 8] }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <AnimatedSphere />
          </Suspense>
        </Canvas>
      </div>
      
      {/* Content */}
      <HeroContent />
    </div>
  );
}