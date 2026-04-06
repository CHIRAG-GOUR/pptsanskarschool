import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows, Text, Cylinder, Cone } from '@react-three/drei';
import * as THREE from 'three';

const SchoolModel = () => {
    const group = useRef<THREE.Group>(null);
    
    useFrame((state) => {
        if (group.current) {
            // Oscillate slowly from one side to another
            group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
            group.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.05;
        }
    });

    const Building = ({ position, args, color }: any) => (
        <mesh position={position} castShadow receiveShadow>
            <boxGeometry args={args} />
            <meshStandardMaterial color={color} roughness={0.9} />
        </mesh>
    );

    const Window = ({ position }: any) => (
        <group position={position}>
            <Building position={[0, 0, 0]} args={[0.8, 1.2, 0.1]} color="#1E90FF" />
            {/* Window Frames */}
            <Building position={[0, 0, 0.05]} args={[0.05, 1.2, 0.05]} color="#ffffff" />
            <Building position={[0, 0, 0.05]} args={[0.8, 0.05, 0.05]} color="#ffffff" />
            <Building position={[0, -0.6, 0.05]} args={[0.9, 0.1, 0.08]} color="#ffffff" />
        </group>
    );

    const Tree = ({ position, scale = 1 }: any) => (
        <group position={position} scale={scale}>
            <Cylinder args={[0.1, 0.15, 1, 8]} position={[0, 0.5, 0]} castShadow>
                <meshStandardMaterial color="#5c4033" />
            </Cylinder>
            <Cone args={[0.8, 1.5, 8]} position={[0, 1.5, 0]} castShadow>
                <meshStandardMaterial color="#228b22" />
            </Cone>
            <Cone args={[0.7, 1.4, 8]} position={[0, 2.2, 0]} castShadow>
                <meshStandardMaterial color="#2e8b57" />
            </Cone>
            <Cone args={[0.5, 1.2, 8]} position={[0, 2.9, 0]} castShadow>
                <meshStandardMaterial color="#3cb371" />
            </Cone>
        </group>
    );

    const Bus = ({ position }: any) => (
        <group position={position}>
            {/* Main Body */}
            <Building position={[0, 0.5, 0]} args={[4, 1.2, 1.2]} color="#ffcc00" />
            {/* Front hood */}
            <Building position={[2.4, 0.3, 0]} args={[1, 0.8, 1.2]} color="#ffcc00" />
            {/* Grill */}
            <Building position={[2.95, 0.3, 0]} args={[0.05, 0.5, 0.8]} color="#333333" />
            {/* Windshield */}
            <Building position={[1.9, 0.8, 0]} args={[0.2, 0.5, 1.1]} color="#1E90FF" />
            {/* Windows */}
            <Building position={[0, 0.8, 0.6]} args={[3.6, 0.4, 0.05]} color="#1E90FF" />
            <Building position={[0, 0.8, -0.6]} args={[3.6, 0.4, 0.05]} color="#1E90FF" />
            {/* Stripes */}
            <Building position={[0, 0.3, 0.62]} args={[3.8, 0.05, 0.01]} color="#000000" />
            <Building position={[0, 0.1, 0.62]} args={[3.8, 0.05, 0.01]} color="#000000" />
            {/* Stop Sign */}
            <Cylinder args={[0.2, 0.2, 0.05, 8]} position={[-1, 0.5, 0.65]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color="#ff0000" />
            </Cylinder>
            {/* Wheels */}
            {[ [-1.2, 0, 0.6], [1.5, 0, 0.6], [-1.2, 0, -0.6], [1.5, 0, -0.6] ].map((pos, i) => (
                <Cylinder key={i} args={[0.3, 0.3, 0.2, 16]} position={pos as any} rotation={[Math.PI / 2, 0, 0]} castShadow>
                    <meshStandardMaterial color="#2d2d2d" />
                </Cylinder>
            ))}
        </group>
    );

    return (
        <group ref={group} position={[0, -2, 0]} scale={0.7}>
            {/* Ground */}
            <Building position={[0, -0.1, 0]} args={[30, 0.2, 10]} color="#4a5d23" />
            <Building position={[0, 0.05, 3]} args={[30, 0.1, 4]} color="#696969" />

            {/* School Main Center Building (#c04035 Red Brick) */}
            <Building position={[0, 2, 0]} args={[4.5, 4, 3]} color="#c04035" />
            {/* Roof Cap */}
            <Building position={[0, 4.2, 0]} args={[4.8, 0.4, 3.2]} color="#f0d5b5" />
            <Building position={[0, 4.8, 0]} args={[2.8, 0.8, 2.5]} color="#c04035" />
            <Building position={[0, 5.3, 0]} args={[3.0, 0.2, 2.7]} color="#f0d5b5" />
            
            {/* Left Wing */}
            <Building position={[-4.5, 1.8, 0]} args={[4.5, 3.6, 2.8]} color="#c04035" />
            <Building position={[-4.5, 3.8, 0]} args={[4.8, 0.4, 3.0]} color="#f0d5b5" />

            {/* Right Wing */}
            <Building position={[4.5, 1.8, 0]} args={[4.5, 3.6, 2.8]} color="#c04035" />
            <Building position={[4.5, 3.8, 0]} args={[4.8, 0.4, 3.0]} color="#f0d5b5" />

            {/* Entrance / Porch */}
            <Building position={[0, 1.5, 1.6]} args={[3.2, 0.3, 1]} color="#f0d5b5" />
            <Text position={[0, 1.9, 2]} fontSize={0.4} color="#111111" fontWeight="bold">SCHOOL</Text>
            {/* Pillars */}
            <Cylinder args={[0.15, 0.15, 2.8, 16]} position={[-1.2, 1.4, 1.8]}><meshStandardMaterial color="#ffffff" /></Cylinder>
            <Cylinder args={[0.15, 0.15, 2.8, 16]} position={[1.2, 1.4, 1.8]}><meshStandardMaterial color="#ffffff" /></Cylinder>
            
            {/* Steps */}
            <Building position={[0, 0.6, 1.8]} args={[2.5, 0.2, 0.5]} color="#d3d3d3" />
            <Building position={[0, 0.3, 2.1]} args={[2.5, 0.2, 0.5]} color="#d3d3d3" />
            <Building position={[0, 0.1, 2.4]} args={[2.5, 0.2, 0.5]} color="#d3d3d3" />

            {/* Double Door */}
            <Building position={[-0.4, 1, 1.55]} args={[0.7, 1.6, 0.1]} color="#e0f7fa" />
            <Building position={[0.4, 1, 1.55]} args={[0.7, 1.6, 0.1]} color="#e0f7fa" />
            <Building position={[0, 1, 1.6]} args={[0.05, 1.6, 0.1]} color="#888888" />

            {/* Center Windows Bottom */}
            <Window position={[-1.2, 2.8, 1.5]} />
            <Window position={[0, 2.8, 1.5]} />
            <Window position={[1.2, 2.8, 1.5]} />

            {/* Left Wing Windows Bottom */}
            <Window position={[-3.5, 1.2, 1.4]} />
            <Window position={[-5.5, 1.2, 1.4]} />
            {/* Left Wing Windows Top */}
            <Window position={[-3.5, 2.8, 1.4]} />
            <Window position={[-5.5, 2.8, 1.4]} />

            {/* Right Wing Windows Bottom */}
            <Window position={[3.5, 1.2, 1.4]} />
            <Window position={[5.5, 1.2, 1.4]} />
            {/* Right Wing Windows Top */}
            <Window position={[3.5, 2.8, 1.4]} />
            <Window position={[5.5, 2.8, 1.4]} />

            {/* Flagpole */}
            <Cylinder args={[0.03, 0.03, 4, 8]} position={[-3, 6, 0]}><meshStandardMaterial color="#aaaaaa" /></Cylinder>
            <mesh position={[-2.7, 7.8, 0]}>
                <planeGeometry args={[0.6, 0.4]} />
                <meshStandardMaterial color="#ff0000" side={THREE.DoubleSide} />
            </mesh>

            {/* Trees */}
            <Tree position={[-8, 0, 1]} scale={1.2} />
            <Tree position={[8, 0, -1]} scale={1.5} />
            
            {/* School Bus */}
            <Bus position={[5, 0.4, 3.5]} />

        </group>
    );
};

export const SchoolBackground = () => {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 2, 14], fov: 40 }}>
                <ambientLight intensity={0.7} />
                <directionalLight position={[10, 15, 10]} intensity={1.5} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
                <directionalLight position={[-10, 5, -5]} intensity={0.4} />
                <SchoolModel />
                <ContactShadows position={[0, -2.1, 0]} opacity={0.7} scale={40} blur={2.5} far={4} />
                <Environment preset="city" />
            </Canvas>
        </div>
    );
};
