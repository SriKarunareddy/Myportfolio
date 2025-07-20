// Simple Sofa component for left wall
function Sofa() {
  // Place along right wall, sized to fit room, rotated to face inward
  // Sofa: seat, backrest, two armrests
  return (
    <group position={[3.2, 0.175, 1.5]} rotation={[0, -Math.PI / 2, 0]}>
      {/* Seat */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.35, 0.7]} />
        <meshStandardMaterial color="#b0a99f" />
      </mesh>
      {/* Remote control on seat */}
      <mesh position={[0.3, 0.21, 0]} rotation={[-0.2, 0.3, 0]} castShadow>
        <boxGeometry args={[0.22, 0.04, 0.06]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      {/* Remote buttons */}
      <mesh position={[0.3, 0.23, 0.01]} scale={[0.7, 0.7, 0.7]} castShadow>
        <cylinderGeometry args={[0.012, 0.012, 0.012, 16]} />
        <meshStandardMaterial color="#bbb" />
      </mesh>
      <mesh position={[0.3, 0.23, -0.01]} scale={[0.7, 0.7, 0.7]} castShadow>
        <cylinderGeometry args={[0.012, 0.012, 0.012, 16]} />
        <meshStandardMaterial color="#bbb" />
      </mesh>
      <mesh position={[0.3, 0.23, -0.03]} scale={[0.7, 0.7, 0.7]} castShadow>
        <cylinderGeometry args={[0.012, 0.012, 0.012, 16]} />
        <meshStandardMaterial color="#e94e77" />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 0.25, -0.3]} castShadow>
        <boxGeometry args={[1.8, 0.5, 0.18]} />
        <meshStandardMaterial color="#a89c8e" />
      </mesh>
      {/* Left armrest */}
      <mesh position={[-0.85, 0.13, 0]} castShadow>
        <boxGeometry args={[0.1, 0.35, 0.7]} />
        <meshStandardMaterial color="#a89c8e" />
      </mesh>
      {/* Right armrest */}
      <mesh position={[0.85, 0.13, 0]} castShadow>
        <boxGeometry args={[0.1, 0.35, 0.7]} />
        <meshStandardMaterial color="#a89c8e" />
      </mesh>
      {/* Sofa legs */}
      <mesh position={[-0.7, -0.2, 0.28]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.15, 12]} />
        <meshStandardMaterial color="#6d6d6d" />
      </mesh>
      <mesh position={[0.7, -0.2, 0.28]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.15, 12]} />
        <meshStandardMaterial color="#6d6d6d" />
      </mesh>
      <mesh position={[-0.7, -0.2, -0.28]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.15, 12]} />
        <meshStandardMaterial color="#6d6d6d" />
      </mesh>
      <mesh position={[0.7, -0.2, -0.28]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.15, 12]} />
        <meshStandardMaterial color="#6d6d6d" />
      </mesh>
    </group>
  );
}
import React, { useRef, useState } from 'react';
import m1Img from '../images/m1.jpeg';
import wallPosterImg from '../images/wallposter.png';
import windowImg from '../images/window.jpeg';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';


function CameraController({ entered }) {
  const { camera } = useThree();
  const target = entered
    ? { pos: [0, 2, 0], look: [0, 1, -4] }
    : { pos: [0, 2, 8], look: [0, 2, 4] };
  useFrame(() => {
    camera.position.lerp(
      { x: target.pos[0], y: target.pos[1], z: target.pos[2] },
      0.08
    );
    camera.lookAt(...target.look);
  });
  return null;
}

function Door({ onEnter, entered }) {
  // Only show the door if not entered
  if (entered) return null;
  return (
    <group position={[0, 2, 4]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2, 4, 0.2]} />
        <meshStandardMaterial color={'#8d5524'} />
      </mesh>
      <Html center position={[0, 0, 0.2]} distanceFactor={8} style={{ pointerEvents: 'auto' }}>
        <button
          onClick={onEnter}
          style={{ fontSize: 28, padding: '12px 32px', borderRadius: 12, background: '#222', color: '#fff', border: '2px solid #fff', cursor: 'pointer', marginTop: 20 }}
        >
          🚪 Enter Room
        </button>
      </Html>
    </group>
  );
}

function Room({ children }) {
  // Floor, 4 walls (front, back, left, right), and ceiling (all semi-transparent and fully connected)
  // Reduce room size: 8x8 floor, 2.8 height, walls accordingly
  const wallMaterial = { transparent: true, opacity: 0.5 };
  return (
    <group>
      {/* Floor */}
      <mesh receiveShadow rotation={[-Math.PI/2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#e0e7ef" />
      </mesh>
      {/* Ceiling (ash color) */}
      <mesh receiveShadow rotation={[-Math.PI/2, 0, 0]} position={[0, 2.8, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#b2b2b2" opacity={1} transparent={false} />
      </mesh>
      {/* Left wall (full height, flush with floor and ceiling) */}
      <mesh receiveShadow position={[-4, 1.4, 0]} rotation={[0, Math.PI/2, 0]}>
        <planeGeometry args={[8, 2.8]} />
        <meshStandardMaterial color="#b8c6db" {...wallMaterial} />
      </mesh>
      {/* Right wall */}
      <mesh receiveShadow position={[4, 1.4, 0]} rotation={[0, -Math.PI/2, 0]}>
        <planeGeometry args={[8, 2.8]} />
        <meshStandardMaterial color="#b8c6db" {...wallMaterial} />
      </mesh>
      {/* Back wall */}
      <mesh receiveShadow position={[0, 1.4, -4]} rotation={[0, 0, 0]}>
        <planeGeometry args={[8, 2.8]} />
        <meshStandardMaterial color="#6a85b6" {...wallMaterial} />
      </mesh>
      {/* Front wall (with door opening) */}
      {/* Left of door */}
      <mesh receiveShadow position={[-2.5, 1.4, 4]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[2.5, 2.8]} />
        <meshStandardMaterial color="#b8c6db" {...wallMaterial} />
      </mesh>
      {/* Right of door */}
      <mesh receiveShadow position={[2.5, 1.4, 4]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[2.5, 2.8]} />
        <meshStandardMaterial color="#b8c6db" {...wallMaterial} />
      </mesh>
      {/* Above door */}
      <mesh receiveShadow position={[0, 2.4, 4]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[2.5, 0.4]} />
        <meshStandardMaterial color="#b8c6db" {...wallMaterial} />
      </mesh>
      {children}
    </group>
  );
}
// Interactive objects
function Laptop({ onClick, hovered, setHovered }) {
  // Table position and dimensions (fit inside new room)
  const tablePos = [-1.5, 0.75, -2.5];
  const tableTopY = 0.9;
  return (
    <group>
      {/* Charging plug on back wall near table */}
      <group position={[-0.7, 0.6, -3.95]}>
        {/* Socket base */}
        <mesh>
          <boxGeometry args={[0.25, 0.15, 0.03]} />
          <meshStandardMaterial color="#e0e0e0" />
        </mesh>
        {/* Two plug holes */}
        <mesh position={[-0.05, 0, 0.025]}>
          <cylinderGeometry args={[0.012, 0.012, 0.03, 16]} />
          <meshStandardMaterial color="#333" />
        </mesh>
        <mesh position={[0.05, 0, 0.025]}>
          <cylinderGeometry args={[0.012, 0.012, 0.03, 16]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      </group>
      {/* Table top */}
      <mesh position={[tablePos[0], tableTopY, tablePos[2]]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.1, 0.8]} />
        <meshStandardMaterial color="#d2b48c" />
      </mesh>
      {/* Table legs */}
      <mesh position={[tablePos[0] - 0.6, 0.45, tablePos[2] - 0.3]} castShadow>
        <boxGeometry args={[0.1, 0.8, 0.1]} />
        <meshStandardMaterial color="#a67c52" />
      </mesh>
      <mesh position={[tablePos[0] + 0.6, 0.45, tablePos[2] - 0.3]} castShadow>
        <boxGeometry args={[0.1, 0.8, 0.1]} />
        <meshStandardMaterial color="#a67c52" />
      </mesh>
      <mesh position={[tablePos[0] - 0.6, 0.45, tablePos[2] + 0.3]} castShadow>
        <boxGeometry args={[0.1, 0.8, 0.1]} />
        <meshStandardMaterial color="#a67c52" />
      </mesh>
      <mesh position={[tablePos[0] + 0.6, 0.45, tablePos[2] + 0.3]} castShadow>
        <boxGeometry args={[0.1, 0.8, 0.1]} />
        <meshStandardMaterial color="#a67c52" />
      </mesh>
      {/* Chair on opposite side of table (closer to center), rotated to face table, placed on ground */}
      <group position={[-1.5, 0, -1.7]} rotation={[0, Math.PI, 0]}>
        {/* Chair seat */}
        <mesh position={[0, 0.35, 0]} castShadow>
          <boxGeometry args={[0.7, 0.1, 0.7]} />
          <meshStandardMaterial color="#b97a56" />
        </mesh>
        {/* Chair legs */}
        <mesh position={[-0.25, 0.1, -0.25]} castShadow>
          <boxGeometry args={[0.1, 0.5, 0.1]} />
          <meshStandardMaterial color="#7c4f29" />
        </mesh>
        <mesh position={[0.25, 0.1, -0.25]} castShadow>
          <boxGeometry args={[0.1, 0.5, 0.1]} />
          <meshStandardMaterial color="#7c4f29" />
        </mesh>
        <mesh position={[-0.25, 0.1, 0.25]} castShadow>
          <boxGeometry args={[0.1, 0.5, 0.1]} />
          <meshStandardMaterial color="#7c4f29" />
        </mesh>
        <mesh position={[0.25, 0.1, 0.25]} castShadow>
          <boxGeometry args={[0.1, 0.5, 0.1]} />
          <meshStandardMaterial color="#7c4f29" />
        </mesh>
        {/* Chair backrest */}
        <mesh position={[0, 0.65, -0.3]} castShadow>
          <boxGeometry args={[0.7, 0.5, 0.1]} />
          <meshStandardMaterial color="#b97a56" />
        </mesh>
      </group>
      {/* Laptop on table (emoji only, no blue cube) */}
      <Html
        center
        position={[tablePos[0], tableTopY + 0.2, tablePos[2] - 0.2]}
        distanceFactor={10}
        style={{ pointerEvents: 'auto' }}
      >
        <span
          role="img"
          aria-label="Laptop"
          style={{ fontSize: 40, cursor: 'pointer', filter: hovered === 'laptop' ? 'drop-shadow(0 0 8px #6ec1e4)' : 'none' }}
          onClick={onClick}
          onMouseEnter={() => setHovered('laptop')}
          onMouseLeave={() => setHovered(null)}
        >
          💻
        </span>
      </Html>
    </group>
  );
}

function Bookshelf({ onClick, hovered, setHovered }) {
  // Openable cupboard (door on left side, racks inside only visible when open)
  const [open, setOpen] = useState(false);
  // Place bookshelf in the back-right corner, sitting on the ground
  return (
    <group position={[3.4, 1, -3.4]}>
      {/* Main body */}
      <mesh
        onPointerOver={() => setHovered('bookshelf')}
        onPointerOut={() => setHovered(null)}
        castShadow
      >
        <boxGeometry args={[0.6, 2, 0.8]} />
        <meshStandardMaterial color={hovered === 'bookshelf' ? '#c97b4d' : '#a0522d'} />
        <Html center distanceFactor={10}><span role="img" aria-label="Bookshelf">📚</span></Html>
      </mesh>
      {/* Door on left edge, rotates open, semi-transparent */}
      <group
        position={[-0.3, 0, 0.0]} // left edge, flush with front
        rotation={[0, open ? -Math.PI / 2 : 0, 0]}
      >
        <mesh
          onClick={() => setOpen(o => !o)}
          castShadow
        >
          <boxGeometry args={[0.04, 2, 0.8]} />
          <meshStandardMaterial color={hovered === 'bookshelf' ? '#eab676' : '#deb887'} transparent opacity={0.5} />
        </mesh>
        {/* Simple handle on right side of door (now inside the door) */}
        <mesh position={[0.02, 0, 0.3]}>
          <cylinderGeometry args={[0.025, 0.025, 0.08, 16]} />
          <meshStandardMaterial color="#888" />
        </mesh>
      </group>
      {/* Racks inside, only visible when open */}
      {open && (
        <>
          {/* 3 shelves */}
          <mesh position={[0, 0.5, 0]}>
            <boxGeometry args={[0.56, 0.08, 0.7]} />
            <meshStandardMaterial color="#fffbe7" />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.56, 0.08, 0.7]} />
            <meshStandardMaterial color="#fffbe7" />
          </mesh>
          <mesh position={[0, -0.5, 0]}>
            <boxGeometry args={[0.56, 0.08, 0.7]} />
            <meshStandardMaterial color="#fffbe7" />
          </mesh>
        </>
      )}
    </group>
  );
}

function Poster({ onClick, hovered, setHovered, position, label, color, id, showImage, imageSrc }) {
  // Accept optional rotation prop for wall mounting
  const meshProps = { position };
  if (arguments[0].rotation) meshProps.rotation = arguments[0].rotation;
  return (
    <mesh
      {...meshProps}
      onClick={onClick}
      onPointerOver={() => setHovered(id)}
      onPointerOut={() => setHovered(null)}
      castShadow
    >
      <boxGeometry args={[1.5, 1, 0.05]} />
      <meshStandardMaterial color={hovered === id ? color[1] : color[0]} />
      {showImage && imageSrc ? (
        <Html center distanceFactor={10} style={{ pointerEvents: 'none' }}>
          <img src={imageSrc} alt="Back Wall" style={{ width: '140px', height: '90px', objectFit: 'cover', borderRadius: 8 }} />
        </Html>
      ) : (
        <Html center distanceFactor={10}><span role="img" aria-label="Poster">{label}</span></Html>
      )}
    </mesh>
  );
}

function Calendar({ onClick, hovered, setHovered }) {
  // Place inside the room along the left wall
  return (
    <mesh
      position={[-3.95, 1.2, 0.7]} // moved left (lower z)
      rotation={[0, Math.PI / 2, 0]}
      onClick={onClick}
      onPointerOver={() => setHovered('calendar')}
      onPointerOut={() => setHovered(null)}
      castShadow
    >
      <boxGeometry args={[0.8, 0.8, 0.05]} />
      <meshStandardMaterial color={hovered === 'calendar' ? '#ffd27f' : '#f5a623'} />
      <Html center distanceFactor={8}><span role="img" aria-label="Calendar" style={{ fontSize: 28 }}>🗓️</span></Html>
    </mesh>
  );
}


export default function App() {
  const [entered, setEntered] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [showBackWallImage, setShowBackWallImage] = useState(false);
  const [showWallPoster, setShowWallPoster] = useState(false);
  // Placeholder code block
  const handleLaptop = () => alert('Show coding projects!');
  const handleBookshelf = () => alert('Show certificates & achievements!');
  const handlePoster = (type) => alert('Show ' + type + ' events!');
  const handleCalendar = () => alert('Show timeline/journey!');
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#181818' }}>
      <Canvas shadows camera={{ position: [0, 2, 8], fov: 60 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 5]} intensity={0.7} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
        {!entered && <CameraController entered={entered} />}
        <Room>
          <Door onEnter={() => setEntered(true)} entered={entered} />
          {entered && (
            <>
              {/* Laptop on desk */}
              <Laptop onClick={handleLaptop} hovered={hovered} setHovered={setHovered} />
              {/* Bookshelf */}
              <Bookshelf onClick={handleBookshelf} hovered={hovered} setHovered={setHovered} />
              {/* Sofa along left wall */}
              <Sofa />
              {/* Posters (dance, sports, events) */}
              {/* Dance (extra curricular) poster on left wall (inside) */}
              <Poster
                onClick={() => handlePoster('Dance')}
                hovered={hovered}
                setHovered={setHovered}
                position={[-3.95, 2, -1]}
                label={'💃'}
                color={['#e94e77', '#ff7cae']}
                id="poster-dance"
                rotation={[0, Math.PI / 2, 0]}
              />
              {/* Static wall poster image on back wall (opposite to door) */}
              <Poster
                hovered={hovered}
                setHovered={setHovered}
                position={[-2.3, 1.7, -3.95]}
                label={''}
                color={['#b8c6db', '#6a85b6']}
                id="poster-wallposter"
                rotation={[0, 0, 0]}
                showImage={true}
                imageSrc={wallPosterImg}
              />
              {/* Window on back wall, right of wallposter, with window.jpeg */}
              <mesh
                position={[0.2, 1.7, -3.95]}
                castShadow
              >
                <boxGeometry args={[1.2, 0.9, 0.07]} />
                <meshStandardMaterial color="#aee7ff" opacity={0.5} transparent />
                <Html center distanceFactor={10} style={{ pointerEvents: 'none' }}>
                  <img src={windowImg} alt="Window" style={{ width: '110px', height: '80px', objectFit: 'cover', borderRadius: 8, border: '2px solid #b8c6db' }} />
                </Html>
              </mesh>
              {/* Sports and Events posters on right wall (inside, spaced apart) */}
              <Poster
                onClick={() => handlePoster('Sports')}
                hovered={hovered}
                setHovered={setHovered}
                position={[3.95, 2, -1.1]}
                label={'🏆'}
                color={['#4a90e2', '#6ec1e4']}
                id="poster-sports"
                rotation={[0, -Math.PI / 2, 0]}
              />
              <Poster
                onClick={() => handlePoster('Events')}
                hovered={hovered}
                setHovered={setHovered}
                position={[3.95, 2, 1.1]}
                label={'🎤'}
                color={['#f5a623', '#ffd27f']}
                id="poster-events"
                rotation={[0, -Math.PI / 2, 0]}
              />
              // ...removed Calendar from left wall...
              {/* Calendar (right wall, inside) */}
              <mesh
                position={[3.95, 1.2, 2.2]} // moved even more right (higher z)
                rotation={[0, -Math.PI / 2, 0]}
                onClick={handleCalendar}
                onPointerOver={() => setHovered('calendar-right')}
                onPointerOut={() => setHovered(null)}
                castShadow
              >
                <boxGeometry args={[0.8, 0.8, 0.05]} />
                <meshStandardMaterial color={hovered === 'calendar-right' ? '#ffd27f' : '#f5a623'} />
                <Html center distanceFactor={8}><span role="img" aria-label="Calendar" style={{ fontSize: 28 }}>🗓️</span></Html>
              </mesh>
              {/* Black poster (left wall, where calendar was) */}
              <mesh
                position={[-3.95, 1.2, 1.5]}
                rotation={[0, Math.PI / 2, 0]}
                castShadow
              >
                <boxGeometry args={[1.4, 0.8, 0.07]} />
                <meshStandardMaterial color="#111" />
              </mesh>
              // ...removed m1 image poster from back wall...
            </>
          )}
        </Room>
        {entered && (
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            target={[0, 2, 0]}
            minPolarAngle={0}
            maxPolarAngle={Math.PI}
            minAzimuthAngle={-Infinity}
            maxAzimuthAngle={Infinity}
            minDistance={2}
            maxDistance={20}
            makeDefault
          />
        )}
      </Canvas>
      <div style={{ position: 'absolute', top: 30, left: 30, color: 'white', fontSize: 32, zIndex: 2, fontWeight: 600, letterSpacing: 1 }}>
        3D Portfolio Room
      </div>
    </div>
  );
}
