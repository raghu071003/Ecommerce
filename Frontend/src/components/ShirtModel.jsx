// import React from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, useGLTF } from '@react-three/drei';
// import model from "./shirt.glb"

// const ShirtModel = ({ color }) => {
//   const { scene } = useGLTF(model); // Load your 3D model
    
//   // Update material color
//   React.useEffect(() => {
//     const material = scene.children[0].material;
//     material.color.set(color);
//   }, [color, scene]);

//   return (
//     <Canvas
//       camera={{ position: [2, 2, 5], fov: 50 }}
//       style={{ height: '100vh', width: '100%' }}
//     >
//       <ambientLight intensity={0.5} />
//       <directionalLight position={[5, 5, 5]} intensity={1} />
//       <OrbitControls />
//       <primitive object={scene} />
//     </Canvas>
//   );
// };

// export default ShirtModel;
