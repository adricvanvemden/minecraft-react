import { useFrame, useThree } from '@react-three/fiber'
import { useSphere } from '@react-three/cannon'
import { useEffect, useRef } from 'react'
import { Vector3 } from 'three'
import { useKeyboard } from '../hooks/useKeyboard'

const JUMP_FORCE = 10
const SPEED = 4

export const Player = () => {
    const { moveBackward, moveForward, moveLeft, moveRight, jump } =
        useKeyboard()
    const { camera } = useThree()
    const [ref, api] = useSphere(() => ({
        mass: 80,
        type: 'Dynamic',
        position: [0, 1, 0],
    }))

    const velocity = useRef([0, 0, 0])
    useEffect(() => {
        api.velocity.subscribe((v) => (velocity.current = v))
    }, [api.velocity])

    const position = useRef([0, 0, 0])
    useEffect(() => {
        api.position.subscribe((p) => {
            position.current = p
        })
    }, [api.position])

    useFrame(() => {
        camera.position.copy(
            new Vector3(
                position.current[0],
                position.current[1] + 0.75,
                position.current[2]
            )
        )

        let frontVector = new Vector3(0, 0, 0)
        let sideVector = new Vector3(0, 0, 0)
        let direction = new Vector3(0, 0, 0)
        frontVector.set(0, 0, Number(moveForward) - Number(moveBackward))
        sideVector.set(Number(moveRight) - Number(moveLeft), 0, 0)

        direction
            .subVectors(sideVector, frontVector)
            .normalize()
            .multiplyScalar(SPEED)
            .applyEuler(camera.rotation)

        api.velocity.set(direction.x, velocity.current[1], direction.z)

        if (jump && Math.abs(velocity.current[1].toFixed(2)) < 0.05) {
            api.velocity.set(
                velocity.current[0],
                JUMP_FORCE,
                velocity.current[2]
            )
        }
    })

    return (
        <mesh ref={ref}>
            <sphereBufferGeometry attach="geometry" args={[0.5, 64, 64]} />
        </mesh>
    )
}
