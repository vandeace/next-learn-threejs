import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import Sphere from '../components/three/index';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

export default function Home() {
  return (
    <Suspense fallback={'loading'}>
      <Canvas id='container' shadows>
        <Sphere />
      </Canvas>
    </Suspense>
  );
}
