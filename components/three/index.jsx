import { angleToRadians } from '../../utils/angle';
import React, { lazy, useEffect, useRef } from 'react';
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import dynamic from 'next/dynamic';

const Car = dynamic(() => import('./car'), {
  ssr: false,
});

const Sphere = () => {
  //Move Camera
  const orbitControlsRef = useRef(null);
  useFrame((state) => {
    //state
    if (orbitControlsRef.current) {
      const { x, y } = state.mouse;
      orbitControlsRef.current.setAzimuthalAngle(-x * angleToRadians(45));
      orbitControlsRef.current.setPolarAngle((y + 1) * angleToRadians(90 - 30));
      orbitControlsRef.current.update();
    }
  });

  console.log('test');

  //Move Ball
  const ballRef = useRef(null);
  useEffect(() => {
    if (!!ballRef.current) {
      // Timeline
      const timeline = gsap.timeline({ paused: true });

      // x-axis motion
      timeline.to(ballRef.current.position, {
        x: 1,
        duration: 2,
        ease: 'power2.out',
      });

      // y-axis motion
      timeline.to(
        ballRef.current.position,
        {
          y: 0.5,
          duration: 1,
          ease: 'bounce.out',
        },
        '<'
      );

      // Play
      timeline.play();
    }
  }, [ballRef.current]);

  return (
    <>
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 1, 20]} />
      <OrbitControls
        ref={orbitControlsRef}
        minPolarAngle={angleToRadians(60)}
        maxPolarAngle={angleToRadians(80)}
      />

      {/* Ball */}
      <mesh position={[-2, 1.5, 0]} castShadow ref={ballRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color='#fff' metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Car */}
      <Car />

      {/* Floor */}
      <mesh rotation={[-angleToRadians(90), 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color='#1ea3d8' />
      </mesh>

      {/* AmbientLight */}
      <ambientLight args={['#fff', 0.25]} />

      {/* Spotligh Light */}
      <spotLight
        args={['#fff', 1.5, 7, angleToRadians(45), 0.1]}
        position={[-3, 1, 0]}
        castShadow
      />

      {/* `Environment` */}
      <Environment preset='park' background blur={1} />
    </>
  );
};

export default Sphere;
