import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows, Text, Cylinder, Cone } from '@react-three/drei';
import * as THREE from 'three';

const CameraRig = () => {
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        // Panning from left to right capturing the huge garden
        state.camera.position.x = Math.sin(t * 0.08) * 16;
        state.camera.position.y = 4 + Math.sin(t * 0.15) * 1.5;
        state.camera.position.z = 20 + Math.cos(t * 0.1) * 5;
        state.camera.lookAt(0, 1, 0);
    });
    return null;
};

const Building = ({ position, args, color }: any) => (
    <mesh position={position} castShadow receiveShadow>
        <boxGeometry args={args} />
        <meshStandardMaterial color={color} roughness={0.9} />
    </mesh>
);

const Window = ({ position }: any) => (
    <group position={position}>
        <Building position={[0, 0, 0]} args={[0.8, 1.2, 0.1]} color="#1E90FF" />
        <Building position={[0, 0, 0.05]} args={[0.05, 1.2, 0.05]} color="#ffffff" />
        <Building position={[0, 0, 0.05]} args={[0.8, 0.05, 0.05]} color="#ffffff" />
        <Building position={[0, -0.6, 0.05]} args={[0.9, 0.1, 0.08]} color="#ffffff" />
    </group>
);

const Tree = ({ position, scale = 1 }: any) => (
    <group position={position} scale={scale}>
        <Cylinder args={[0.15, 0.25, 1.5, 8]} position={[0, 0.75, 0]} castShadow>
            <meshStandardMaterial color="#5c4033" />
        </Cylinder>
        <Cone args={[1.2, 2.2, 8]} position={[0, 2.2, 0]} castShadow>
            <meshStandardMaterial color="#228b22" />
        </Cone>
        <Cone args={[1.0, 2.0, 8]} position={[0, 3.2, 0]} castShadow>
            <meshStandardMaterial color="#2e8b57" />
        </Cone>
        <Cone args={[0.8, 1.8, 8]} position={[0, 4.2, 0]} castShadow>
            <meshStandardMaterial color="#3cb371" />
        </Cone>
    </group>
);

const Bus = ({ position }: any) => (
    <group position={position}>
        <Building position={[0, 0.5, 0]} args={[4, 1.2, 1.2]} color="#ffcc00" />
        <Building position={[2.4, 0.3, 0]} args={[1, 0.8, 1.2]} color="#ffcc00" />
        <Building position={[2.95, 0.3, 0]} args={[0.05, 0.5, 0.8]} color="#333333" />
        <Building position={[1.9, 0.8, 0]} args={[0.2, 0.5, 1.1]} color="#1E90FF" />
        <Building position={[0, 0.8, 0.6]} args={[3.6, 0.4, 0.05]} color="#1E90FF" />
        <Building position={[0, 0.8, -0.6]} args={[3.6, 0.4, 0.05]} color="#1E90FF" />
        <Building position={[0, 0.3, 0.62]} args={[3.8, 0.05, 0.01]} color="#000000" />
        <Building position={[0, 0.1, 0.62]} args={[3.8, 0.05, 0.01]} color="#000000" />
        <Cylinder args={[0.2, 0.2, 0.05, 8]} position={[-1, 0.5, 0.65]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#ff0000" />
        </Cylinder>
        {[ [-1.2, 0, 0.6], [1.5, 0, 0.6], [-1.2, 0, -0.6], [1.5, 0, -0.6] ].map((pos, i) => (
            <Cylinder key={i} args={[0.3, 0.3, 0.2, 16]} position={pos as any} rotation={[Math.PI / 2, 0, 0]} castShadow>       
                <meshStandardMaterial color="#2d2d2d" />
            </Cylinder>
        ))}
    </group>
);

const Kid = ({ position, uniformColor = "#0B66E4", delay = 0 }: any) => {
    const ref = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (ref.current) {
            const t = state.clock.elapsedTime + delay;
            // Children playing, jumping playfully, and turning
            ref.current.position.y = position[1] + Math.abs(Math.sin(t * 3.5)) * 0.8;
            ref.current.rotation.y = t * 2;
            ref.current.position.x = position[0] + Math.sin(t * 0.8) * 1.5;
            ref.current.position.z = position[2] + Math.cos(t * 0.8) * 1.5;
        }
    });
    return (
        <group ref={ref} position={position} scale={0.7}>
            <mesh position={[0, 0.9, 0]} castShadow><sphereGeometry args={[0.25, 16, 16]} /><meshStandardMaterial color="#ffcc99" /></mesh>
            <mesh position={[0, 0.4, 0]} castShadow><cylinderGeometry args={[0.2, 0.25, 0.6, 8]} /><meshStandardMaterial color={uniformColor} /></mesh>
            <mesh position={[-0.12, -0.15, 0]} castShadow><cylinderGeometry args={[0.08, 0.08, 0.5, 8]} /><meshStandardMaterial color="#222222" /></mesh>
            <mesh position={[0.12, -0.15, 0]} castShadow><cylinderGeometry args={[0.08, 0.08, 0.5, 8]} /><meshStandardMaterial color="#222222" /></mesh>
        </group>
    );
};

const SchoolModel = () => {
    const group = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (group.current) {
            group.current.position.y = -1.8 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
        }
    });

    return (
        <group ref={group} position={[0, -1.8, 0]} scale={0.8}>
            {/* Extended Full Size Garden Ground */}
            <Building position={[0, -0.1, 0]} args={[120, 0.2, 120]} color="#3cb371" />
            <Building position={[0, 0.05, 5]} args={[14, 0.1, 10]} color="#aaaaaa" />

            {/* School Main Center Building (#c04035 Red Brick) */}
            <Building position={[0, 2, 0]} args={[4.5, 4, 3]} color="#c04035" />
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
            <Cylinder args={[0.15, 0.15, 2.8, 16]} position={[-1.2, 1.4, 1.8]}><meshStandardMaterial color="#ffffff" /></Cylinder>  
            <Cylinder args={[0.15, 0.15, 2.8, 16]} position={[1.2, 1.4, 1.8]}><meshStandardMaterial color="#ffffff" /></Cylinder>   

            {/* Steps */}
            <Building position={[0, 0.6, 1.8]} args={[2.5, 0.2, 0.5]} color="#d3d3d3" />
            <Building position={[0, 0.3, 2.1]} args={[2.5, 0.2, 0.5]} color="#d3d3d3" />
            <Building position={[0, 0.1, 2.4]} args={[2.5, 0.2, 0.5]} color="#d3d3d3" />

            <Building position={[-0.4, 1, 1.55]} args={[0.7, 1.6, 0.1]} color="#e0f7fa" />
            <Building position={[0.4, 1, 1.55]} args={[0.7, 1.6, 0.1]} color="#e0f7fa" />
            <Building position={[0, 1, 1.6]} args={[0.05, 1.6, 0.1]} color="#888888" />

            <Window position={[-1.2, 2.8, 1.5]} />
            <Window position={[0, 2.8, 1.5]} />
            <Window position={[1.2, 2.8, 1.5]} />

            <Window position={[-3.5, 1.2, 1.4]} />
            <Window position={[-5.5, 1.2, 1.4]} />
            <Window position={[-3.5, 2.8, 1.4]} />
            <Window position={[-5.5, 2.8, 1.4]} />

            <Window position={[3.5, 1.2, 1.4]} />
            <Window position={[5.5, 1.2, 1.4]} />
            <Window position={[3.5, 2.8, 1.4]} />
            <Window position={[5.5, 2.8, 1.4]} />

            <Cylinder args={[0.03, 0.03, 4, 8]} position={[-3, 6, 0]}><meshStandardMaterial color="#aaaaaa" /></Cylinder>
            <mesh position={[-2.7, 7.8, 0]}><planeGeometry args={[0.6, 0.4]} /><meshStandardMaterial color="#ff0000" side={THREE.DoubleSide} /></mesh>

            {/* Expansive Garden Trees */}
            <Tree position={[-10, 0, 2]} scale={1.2} />
            <Tree position={[12, 0, -3]} scale={1.5} />
            <Tree position={[-18, 0, -8]} scale={1.8} />
            <Tree position={[15, 0, 10]} scale={1.1} />
            <Tree position={[-8, 0, 15]} scale={1.4} />
            <Tree position={[22, 0, -2]} scale={1.6} />

            {/* School Bus */}
            <Bus position={[7, 0.4, 7]} />

            {/* Kids playing in uniforms (#0B66E4 Blue, #FF3366 Red, #FFB300 Yellow) */}
            <Kid position={[-3, 0, 6]} uniformColor="#0B66E4" delay={0} />
            <Kid position={[-4, 0, 7]} uniformColor="#0B66E4" delay={1} />
            <Kid position={[4, 0, 5]} uniformColor="#FF3366" delay={2} />
            <Kid position={[5, 0, 6]} uniformColor="#FF3366" delay={0.5} />
            <Kid position={[-8, 0, 3]} uniformColor="#FFB300" delay={4} />
            <Kid position={[9, 0, 8]} uniformColor="#FFB300" delay={2.5} />
            <Kid position={[0, 0, 12]} uniformColor="#0B66E4" delay={3} />
            <Kid position={[2, 0, 11]} uniformColor="#0B66E4" delay={1.5} />
        </group>
    );
};

export const SchoolBackground = () => {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>    
            <Canvas camera={{ fov: 40 }}>
                <CameraRig />
                <ambientLight intensity={0.7} />
                <directionalLight position={[20, 30, 20]} intensity={1.5} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
                <directionalLight position={[-10, 10, -10]} intensity={0.4} />
                <SchoolModel />
                <ContactShadows position={[0, -2.1, 0]} opacity={0.5} scale={80} blur={2.5} far={4} />
                <Environment preset="city" />
            </Canvas>
        </div>
    );
};
