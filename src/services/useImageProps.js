import { useState, useEffect } from "react"
import { NUM_OF_TILES, IMG_WIDTH, IMG_HEIGHT } from '../constants'

export const useImageProps = ({ imageURL }) => {
    const [tiles, setTiles] = useState([])

    useEffect(() => {
        const tilesProps = []

        const tileHeight = IMG_HEIGHT / NUM_OF_TILES
        const tileWidth = IMG_WIDTH / NUM_OF_TILES

        let id = 0

        for(let x = 0; x < NUM_OF_TILES; x++){
            for(let y = 0; y < NUM_OF_TILES; y++){
                const piece = {
                    id: `${id++}`,
                    randomId: 0,
                    width: tileWidth,
                    height: tileHeight,
                    backgroundImage: `url('${imageURL}')`,
                    backgroundPosition: `-${x * tileWidth}px -${y * tileHeight}px`,
                    backgroundSize: `1080px 720px`
                }
                tilesProps.push(piece)
            }
        }
        setTiles(tilesProps)
    }, [imageURL])

    return ({ tiles })
}