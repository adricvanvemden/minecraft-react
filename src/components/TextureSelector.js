import { useEffect, useState } from 'react'
import { useStore } from '../hooks/useStore'
import { useKeyboard } from '../hooks/useKeyboard'
import { dirtImg, grassImg, glassImg, logImg, woodImg } from '../images/images'

const images = {
    dirt: dirtImg,
    grass: grassImg,
    glass: glassImg,
    wood: woodImg,
    log: logImg,
}

export const TextureSelector = () => {
    const [visible, setVisible] = useState(false)
    const [activeTexture, setTexture] = useStore((state) => [
        state.texture,
        state.setTexture,
    ])
    const { dirt, glass, grass, wood, log } = useKeyboard()

    useEffect(() => {
        const textures = {
            dirt,
            grass,
            glass,
            wood,
            log,
        }
        const pressedTexture = Object.entries(textures).find(([k, v]) => v)

        if (pressedTexture) {
            setTexture(pressedTexture[0])
        }
    }, [dirt, glass, grass, wood, log, setTexture])

    useEffect(() => {
        const visibleTimeout = setTimeout(() => {
            setVisible(false)
        }, 2000)
        setVisible(true)
        return () => {
            clearTimeout(visibleTimeout)
        }
    }, [activeTexture])

    return (
        visible && (
            <div className="absolute centered texture-selector">
                {Object.entries(images).map(([texture, src]) => {
                    return (
                        <img
                            key={texture}
                            src={src}
                            alt={texture}
                            className={`${
                                texture === activeTexture && 'active'
                            }`}
                        />
                    )
                })}
            </div>
        )
    )
}
