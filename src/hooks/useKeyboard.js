import { useCallback, useState, useEffect } from 'react'

const actionByKey = (key) => {
    const keyActionMap = {
        KeyW: 'moveForward',
        KeyS: 'moveBackward',
        KeyA: 'moveLeft',
        KeyD: 'moveRight',
        Space: 'jump',
        Digit1: 'dirt',
        Digit2: 'grass',
        Digit3: 'glass',
        Digit4: 'wood',
        Digit5: 'log',
    }
    return keyActionMap[key]
}

export const useKeyboard = (keys) => {
    const [actions, setActions] = useState({
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,
        jump: false,
        dirt: false,
        grass: false,
        glass: false,
        log: false,
        wood: false,
    })

    const handleKeyDown = useCallback((e) => {
        const action = actionByKey(e.code)
        if (action) {
            setActions((prev) => ({
                ...prev,
                [action]: true,
            }))
        }
    }, [])

    const handleKeyUp = useCallback((e) => {
        const action = actionByKey(e.code)
        if (action) {
            setActions((prev) => ({
                ...prev,
                [action]: false,
            }))
        }
    }, [])

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('keyup', handleKeyUp)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('keyup', handleKeyUp)
        }
    }, [handleKeyDown, handleKeyUp])

    return actions
}