import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

function Box() {
  return (
    <mesh rotation={[0.4, 0.2, 0]} castShadow receiveShadow>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#61dafb" />
    </mesh>
  );
}

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#181818' }}>
      <Canvas camera={{ position: [5, 5, 5], fov: 60 }} shadows>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <Box />
        <OrbitControls />
        <Environment preset="sunset" />
      </Canvas>
      <div style={{ position: 'absolute', top: 30, left: 30, color: 'white', fontSize: 32 }}>
        My 3D Portfolio
      </div>
    </div>
  );
}
