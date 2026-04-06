import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const SchoolModel = () => {
    const group = useRef<THREE.Group>(null);
    
    useFrame((state) => {
        if (group.current) {
            // Oscillate slowly from one side to another
            group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
        }
    });

    const Building = ({ position, args, color }: any) => (
        <mesh position={position} castShadow receiveShadow>
            <boxGeometry args={args} />
            <meshStandardMaterial color={color} roughness={0.8} />
        </mesh>
    );

    return (
        <group ref={group} position={[0, -1, 0]}>
            {/* Main Center Building */}
            <Building position={[0, 2, 0]} args={[4, 4, 3]} color="#c24434" />
            <Building position={[0, 4.2, 0]} args={[4.2, 0.4, 3.2]} color="#e3c7ba" />
            <Building position={[0, 4.8, 0]} args={[2.5, 0.8, 2]} color="#c24434" />
            
            {/* Left Wing */}
            <Building position={[-4, 1.5, 0]} args={[4, 3, 2.5]} color="#c24434" />
            <Building position={[-4, 3.2, 0]} args={[4.2, 0.4, 2.7]} color="#e3c7ba" />

            {/* Right Wing */}
            <Building position={[4, 1.5, 0]} args={[4, 3, 2.5]} color="#c24434" />
            <Building position={[4, 3.2, 0]} args={[4.2, 0.4, 2.7]} color="#e3c7ba" />

            {/* Entrance Pillars & Details */}
            <Building position={[-1.2, 1, 1.6]} args={[0.3, 2, 0.3]} color="#ffffff" />
            <Building position={[1.2, 1, 1.6]} args={[0.3, 2, 0.3]} color="#ffffff" />
            <Building position={[0, 2.2, 1.6]} args={[3, 0.4, 0.5]} color="#e3c7ba" />
            <Building position={[0, 1.2, 1.55]} args={[1, 1.6, 0.2]} color="#a0c8e0" /> {/* Door */}
            
            {/* Windows Left Wing */}
            <Building position={[-5, 2, 1.3]} args={[0.8, 1, 0.1]} color="#1E90FF" />
            <Building position={[-3, 2, 1.3]} args={[0.8, 1, 0.1]} color="#1E90FF" />
            
            {/* Windows Right Wing */}
            <Building position={[3, 2, 1.3]} args={[0.8, 1, 0.1]} color="#1E90FF" />
            <Building position={[5, 2, 1.3]} args={[0.8, 1, 0.1]} color="#1E90FF" />
            
            {/* Ground */}
            <Building position={[0, -0.1, 0]} args={[25, 0.2, 10]} color="#465a6b" />

            {/* School Bus */}
            <group position={[4, 0.6, 3]}>
                <Building position={[0, 0, 0]} args={[3, 1.2, 1.2]} color="#f7b733" />
                <Building position={[1.6, -0.25, 0]} args={[0.8, 0.7, 1.2]} color="#f7b733" />
                {/* Windshield */}
                <Building position={[1.3, 0.2, 0]} args={[0.3, 0.6, 1]} color="#1E90FF" />
                {/* Wheels */}
                <mesh position={[-0.8, -0.6, 0.6]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.3, 0.3, 0.2, 16]} /><meshStandardMaterial color="#2d2d2d" /></mesh>
                <mesh position={[1.2, -0.6, 0.6]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.3, 0.3, 0.2, 16]} /><meshStandardMaterial color="#2d2d2d" /></mesh>
                <mesh position={[-0.8, -0.6, -0.6]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.3, 0.3, 0.2, 16]} /><meshStandardMaterial color="#2d2d2d" /></mesh>
                <mesh position={[1.2, -0.6, -0.6]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.3, 0.3, 0.2, 16]} /><meshStandardMaterial color="#2d2d2d" /></mesh>
            </group>

            {/* Tree */}
            <group position={[-6, 1, 3]}>
                <mesh position={[0, -0.5, 0]}><cylinderGeometry args={[0.2, 0.3, 1, 8]} /><meshStandardMaterial color="#6e4f3a" /></mesh>
                <mesh position={[0, 0.8, 0]}><coneGeometry args={[1, 2, 8]} /><meshStandardMaterial color="#355e3b" /></mesh>
                <mesh position={[0, 1.6, 0]}><coneGeometry args={[0.8, 1.5, 8]} /><meshStandardMaterial color="#355e3b" /></mesh>
            </group>
            
            {/* Flagpole */}
            <Building position={[-2, 6, 0]} args={[0.05, 3, 0.05]} color="#aaaaaa" />
            <mesh position={[-1.7, 7, 0]}>
                <planeGeometry args={[0.6, 0.4]} />
                <meshStandardMaterial color="#ff0000" side={THREE.DoubleSide} />
            </mesh>
        </group>
    );
};

export const SchoolBackground = () => {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 1, 14], fov: 45 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
                <directionalLight position={[-10, 5, -5]} intensity={0.5} />
                <SchoolModel />
                <ContactShadows position={[0, -1.1, 0]} opacity={0.6} scale={30} blur={2} far={4} />
                <Environment preset="city" />
            </Canvas>
        </div>
    );
};
