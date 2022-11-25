import { useState } from 'react'
import { useStore } from '../hooks/useStore'
import { useBox } from '@react-three/cannon'
import * as textures from '../images/textures'

export const Cube = ({ position, texture }) => {
    const [isHovered, setIsHovered] = useState(false)
    const [ref] = useBox(() => ({
        type: 'Static',
        position,
    }))
    const [addCube, removeCube] = useStore((state) => [
        state.addCube,
        state.removeCube,
    ])

    const activeTexture = textures[texture + 'Texture']

    return (
        <mesh
            ref={ref}
            onPointerMove={(e) => {
                e.stopPropagation()
                setIsHovered(true)
            }}
            onPointerOut={(e) => {
                e.stopPropagation()
                setIsHovered(false)
            }}
            onClick={(e) => {
                e.stopPropagation()
                const clickedFaced = Math.floor(e.faceIndex / 2)
                const { x, y, z } = ref.current.position
                console.log(e)
                if (e.altKey) {
                    removeCube(x, y, z)
                    return
                }
                if (clickedFaced === 0) {
                    addCube(x + 1, y, z)
                    return
                }
                if (clickedFaced === 1) {
                    addCube(x - 1, y, z)
                    return
                }
                if (clickedFaced === 2) {
                    addCube(x, y + 1, z)
                    return
                }
                if (clickedFaced === 3) {
                    addCube(x, y - 1, z)
                    return
                }
                if (clickedFaced === 4) {
                    addCube(x, y, z + 1)
                    return
                }
                if (clickedFaced === 5) {
                    addCube(x, y, z - 1)
                    return
                }
            }}
        >
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
            <meshStandardMaterial
                map={activeTexture}
                attach="material"
                color={isHovered ? 'grey' : 'white'}
                transparent={true}
                opacity={texture === 'glass' ? 0.6 : 1}
            />
        </mesh>
    )
}
