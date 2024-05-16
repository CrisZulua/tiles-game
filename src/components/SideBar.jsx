export function SideBar({ imageURL, getNewImage }){
    return (
        <section className='sideBar'>
            <h1>Tiles Game</h1>
            {imageURL && <img src={imageURL} id='refImg' alt="Random image of a cat" />}
            <p>Try to order the tiles to look as the image above.</p>
            <button onClick={getNewImage}>Get new image</button>
        </section>
    )
}

