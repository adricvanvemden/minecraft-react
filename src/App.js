import { createRef, useRef } from 'react'
import { Physics } from '@react-three/cannon'
import { Sky } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Ground } from './components/Ground'
import { Player } from './components/Player'
import { FPV } from './components/FPV'
import { Cubes } from './components/Cubes'
import { Hotbar } from './components/Hotbar'
import { Menu } from './components/Menu'
import { Vector3 } from 'three'

const App = () => {
    const FPVRef = createRef()
    return (
        <>
            <Canvas
                shadows
                camera={{ fov: 45 }}
                raycaster={{
                    computeOffsets: (_, { size: { width, height } }) => {
                        if (FPVRef.current) {
                            return {
                                offsetX: width / 2,
                                offsetY: height / 2,
                            }
                        } else {
                            return null
                        }
                    },
                }}
            >
                <Sky sunPosition={[100, 20, 100]} />
                <ambientLight intensity={0.3} />
                <pointLight
                    castShadow
                    intensity={0.8}
                    position={[100, 100, 100]}
                />
                <FPV ref={FPVRef} />
                <Physics gravity={[0, -30, 0]}>
                    <Player />
                    <MouseReticle />
                    <Cubes />
                    <Ground />
                </Physics>
            </Canvas>
            <div className="absolute cursor centered">+</div>
            <Hotbar />
            <Menu />
        </>
    )
}

function MouseReticle() {
    const { camera, mouse } = useThree()
    const mouseReticle = useRef()

    useFrame(() => {
        if (mouseReticle.current) {
            const vector = new Vector3(mouse.x, mouse.y, -0.8).unproject(camera)
            mouseReticle.current.position.set(...vector.toArray())
        }
    })

    return (
        <mesh ref={mouseReticle}>
            <sphereBufferGeometry args={[0.001, 100, 100]} />
            <meshBasicMaterial color={'red'} />
        </mesh>
    )
}

export default App
