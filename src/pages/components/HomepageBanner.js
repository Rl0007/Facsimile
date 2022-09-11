import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame(
    (state, delta) => (
      (ref.current.rotation.x += 0.01),
      (ref.current.rotation.y += 0.01),
      (ref.current.rotation.z += 0.05)
    )
  );
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[0.8, 0.8, 0.8]} />
      <meshStandardMaterial color={hovered ? "aliceblue" : "aquamarine"} />
    </mesh>
  );
}

export default function HomepageBanner() {
  return (
    <>
      {/* <h1 style={{ color: "#AFCDD5" }}>Hello</h1> */}

      <Canvas style={{ backgroundColor: "#f5f5d8" }}>
        <group position-z={-0.1} position-x={-2} position-y={3}>
          <Html>
            <h1
              style={{
                color: "#AFCDD5",
                fontFamily: "Aclonica",
                fontSize: "10rem",
              }}
            >
              Aloha
            </h1>
          </Html>
        </group>
        <group position-z={-0.1} position-x={-0.7} position-y={1}>
          <Html>
            <h1
              style={{
                color: "#AFCDD5",
                fontFamily: "Aclonica",
                fontSize: "14rem",
              }}
            >
              T
            </h1>
          </Html>
        </group>
        <group position-z={-0.1} position-x={-3} position-y={-1}>
          <Html>
            <h1
              style={{
                color: "#AFCDD5",
                fontFamily: "Aclonica",
                fontSize: "10rem",
              }}
            >
              Facsimile
            </h1>
          </Html>
        </group>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />

        <Box position={[1, 0.05, 0]} />
      </Canvas>
    </>
  );
}
