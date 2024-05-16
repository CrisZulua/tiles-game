import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { ListOfTiles } from './ListOfTiles';
import { useEffect, useState } from 'react';
import '../Styles/board.css'
export function Board({tiles}){

  function randomizeTilesOrder(tiles){
    const tilesClone = [...tiles]
    tilesClone.sort((a, b) => 0.5 - Math.random())
    //Set consecutives ids for draggable id
    //To check right order, look for id in every tile
    //List goes in vertical order
    for (let i = 0; i < tilesClone.length; i++) {
      tilesClone[i].randomId = i
    }
    return tilesClone
  }

  const [list1, setList1] = useState([])
  const [list2, setList2] = useState([])
  const [list3, setList3] = useState([])
  const [list4, setList4] = useState([])

  useEffect(() => {
    const randomOrderTiles = randomizeTilesOrder(tiles)
    setList1(randomOrderTiles.slice(0, 4))
    setList2(randomOrderTiles.slice(4, 8))
    setList3(randomOrderTiles.slice(8, 12))
    setList4(randomOrderTiles.slice(12, 16))
  },[tiles])

  //Function to save changes when draggin has finished
  function onDragEnd( result ){
    //When a tile is dragged, change position with the one in the destination index
    //To identify a tile, get the draggableid and get the number, the number is the randomId prop
    //With that number we can do operation on it and change position in arrays.
    console.log('Drag end');
    //Get variables needed for operations
    const { source, destination } = result
    if(source.droppableId !== destination.droppableId){
      const sId = parseInt(source.droppableId.split('-')[1])
      const sIndex = source.index
      const dId = parseInt(destination.droppableId.split('-')[1])
      const dIndex = destination.index
      //Identify lists to operate on
      let listSource = []
      switch (sId) {
        case 1:
          listSource = list1
          break;
        case 2:
          listSource = list2
          break;
        case 3:
          listSource = list3
          break;
        case 4:
          listSource = list4
          break;
      }
      let listDest = []
      switch (dId) {
        case 1:
          listDest = list1
          break;
        case 2:
          listDest = list2
          break;
        case 3:
          listDest = list3
          break;
        case 4:
          listDest = list4
          break;
      }
      //Once we get listSource and listDest, change elementes in array with sIndex and dIndex
      //Get destination list tile we are about to replace
      const tempTile = listDest[dIndex]
      //Replace on listDest on dIndex 1 element which is element dragged
      listDest.splice(dIndex, 1, listSource[sIndex])
      //Replace on listSource on sIndex 1 element which is tempTile
      listSource.splice(sIndex, 1, tempTile)

      //Set the right lists
      switch (sId) {
        case 1:
          setList1(listSource)
          console.log('setlist1')
          break;
        case 2:
          setList2(listSource)
          console.log('setlist2')
          break;
        case 3:
          setList3(listSource)
          console.log('setlist3')
          break;
        case 4:
          setList4(listSource)
          console.log('setlist4')
          break;
      }
      switch (dId) {
        case 1:
          setList1(listDest)
          console.log('setlist1')
          break;
        case 2:
          setList2(listDest)
          console.log('setlist2')
          break;
        case 3:
          setList3(listDest)
          console.log('setlist3')
          break;
        case 4:
          setList4(listDest)
          console.log('setlist4')
          break;
      }
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='board'>
        <ListOfTiles list={list1} dId={1} key={1}/>               
      </div>
    </DragDropContext>
  )
}
