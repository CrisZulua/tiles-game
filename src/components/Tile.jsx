export function Tile({tile}) {
    return(
        <div className="tile" style={{
            width: tile.width,
            height: tile.height,
            backgroundImage: tile.backgroundImage,
            backgroundPosition: tile.backgroundPosition,
            backgroundSize: tile.backgroundSize,
            display: 'flex'
          }}></div>
    )
}