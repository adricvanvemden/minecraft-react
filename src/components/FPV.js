import { forwardRef, useRef } from 'react'
import { PointerLockControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

export const FPV = forwardRef((props, ref) => {
    const { camera, gl } = useThree()
    const controlsRef = useRef()

    return (
        <PointerLockControls
            args={[camera, gl.domElement]}
            ref={controlsRef}
            onUpdate={() => {
                if (controlsRef.current) {
                    controlsRef.current.addEventListener('lock', () => {
                        ref.current = true
                    })
                    controlsRef.current.addEventListener('unlock', () => {
                        ref.current = false
                    })
                }
            }}
        />
    )
})
