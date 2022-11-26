import { Physics } from '@react-three/cannon'
import { Sky } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Ground } from './components/Ground'
import { Player } from './components/Player'
import { FPV } from './components/FPV'
import { Cubes } from './components/Cubes'
import { Hotbar } from './components/Hotbar'
import { Menu } from './components/Menu'
function App() {
    return (
        <>
            <Canvas shadows camera={{ fov: 45 }}>
                <Sky sunPosition={[100, 20, 100]} />
                <ambientLight intensity={0.3} />
                <pointLight
                    castShadow
                    intensity={0.8}
                    position={[100, 100, 100]}
                />
                <FPV />
                <Physics gravity={[0, -30, 0]}>
                    <Player />
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

export default App
