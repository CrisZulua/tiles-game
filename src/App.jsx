import './App.css'
import { SideBar } from './components/SideBar'
import { Board } from './components/Board'
import { useImage } from './services/useImage'
import { useImageProps } from './services/useImageProps'

function App() {
  
  const { imageURL, getNewImage } = useImage()

  const { tiles } = useImageProps({imageURL})


  return (
    <>
      <SideBar imageURL={imageURL} getNewImage={getNewImage} />
      <section className='boardSection'>
        <Board tiles={tiles} />
      </section>
    </>
  )
}

export default App
