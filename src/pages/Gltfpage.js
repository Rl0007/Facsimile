import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { GLTFLoader, GLTFParser } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense, useEffect, useState } from "react";

export default function Gltfpage({ rendermodel }) {
  return (
    <div className="App">
      <Canvas>
        <Suspense fallback={null}>
          <primitive
            object={useLoader(GLTFLoader, rendermodel).scene}
            scale={10}
          />
          <OrbitControls />
          <Environment preset="apartment" background />
        </Suspense>
      </Canvas>
    </div>
  );
}
