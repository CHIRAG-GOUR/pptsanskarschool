import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Image } from '@react-three/drei';
import * as THREE from 'three';

const SchoolImageModel = () => {
    const group = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (group.current) {
            // Oscillate slowly from one side to another
            group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
            group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    return (
        <group ref={group} position={[0, 0, 0]}>
            <Image 
                url="/school-bg.png" 
                transparent 
                scale={[20, 10]} 
                position={[0, 0, 0]} 
            />
        </group>
    );
};

export const SchoolBackground = () => {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <ambientLight intensity={1} />
                <SchoolImageModel />
                <ContactShadows position={[0, -4.5, 0]} opacity={0.6} scale={30} blur={2} far={4} />
            </Canvas>
        </div>
    );
};
