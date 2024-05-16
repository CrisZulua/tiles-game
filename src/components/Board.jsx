import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { ListOfTiles } from './ListOfTiles';
import { useEffect, useState } from 'react';
import '../Styles/board.css'
export function Board({tiles}){

  //Function to save changes when draggin has finished
  function onDragEnd(){
    console.log('Drag end');
  }


  const [list1, setList1] = useState([])
  const [list2, setList2] = useState([])
  const [list3, setList3] = useState([])
  const [list4, setList4] = useState([])

  useEffect(() => {
    setList1(tiles.slice(0, 4))
    setList2(tiles.slice(4, 8))
    setList3(tiles.slice(8, 12))
    setList4(tiles.slice(12, 16))
  },[tiles])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='board'>
        <ListOfTiles list={list1} dId={1} key={1}/>        
        <ListOfTiles list={list2} dId={2} key={2} />        
        <ListOfTiles list={list3} dId={3} key={3} />        
        <ListOfTiles list={list4} dId={4} key={4} />        
      </div>
    </DragDropContext>
  )
}
