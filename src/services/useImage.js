import { useState, useEffect } from "react"
export const useImage = () => {
  const [imageURL, setImageURL] = useState()

  function getNewImage(){
    fetch('https://cataas.com/cat?position=center&width=1080&height=720&json=true')
    .then( response => response.json())
    .then( data => {
      const { _id } = data
      setImageURL(`https://cataas.com/cat/${_id}?position=center&width=1080&height=720`)
    })
  }

  useEffect(() => {
    getNewImage()
  }, [])

  return ({ imageURL, getNewImage })
}