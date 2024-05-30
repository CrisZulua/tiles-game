import  confetti  from 'canvas-confetti'

export function Winmodal ({ modal, setModal, getNewImage }) {
  const resetGame = () => {
    getNewImage()
    setModal(false)
  }
  if ( !modal ) return
  confetti()
  return (
    <section className="winner">
      <div className="text">
        <header className="win">
          <h2>Board completed!</h2>
        </header>

        <footer>
          <button onClick={resetGame}>Start new board</button>
        </footer>

      </div>
    </section>
  )
}