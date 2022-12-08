import { useAnimations } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import React, { useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import dynamic from 'next/dynamic';

const Avatar = () => {
  const Avatar = dynamic(() => import('../avatar/Avatar'), {
    ssr: false,
  });
  
  // return <primitive object={model.scene} />;
  return <Avatar />;
};

export default Avatar;
