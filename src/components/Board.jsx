import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useEffect, useState } from 'react';
import { Tile } from './Tile'
import '../Styles/board.css'
import '../Styles/listOfTiles.css'
import { Winmodal } from './Winmodal';


export function Board({ tiles, getNewImage }){

  const [lists, setLists] = useState([])
  const [modal, setModal] = useState(false)

  useEffect(()=>{
    const tilesClone = structuredClone(tiles)
    tilesClone.sort((a, b) => 0.5 - Math.random())
    setLists([tilesClone.slice(0, 4), tilesClone.slice(4, 8), tilesClone.slice(8, 12), tilesClone.slice(12, 16)])
  }, [tiles])
  
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
  
    destClone.splice(droppableDestination.index, 0, removed);
  
    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
  
    return result;
  };

  const checkCompletedBoard = (board) => {
    console.log('comprobando');
    let idOrder = 0;
    for(let i = 0; i < 4; i++){
      for(let j = 0; j < 4; j++){
        if(board[i][j].id !== idOrder) return false;
        idOrder++;
      }
    }
    return true
  }
  //Function to save changes when draggin has finished
  function onDragEnd( result ){
      const { source, destination } = result

      if(!destination) return;

      const sIndex = +source.droppableId
      const dIndex = +destination.droppableId

      //Check if drag happen inside the same list
      if( sIndex == dIndex ){
        const items = reorder(lists[sIndex], source.index, destination.index)
        const newLists = [...lists]
        newLists[sIndex] = items
        setLists(newLists)
        setModal(checkCompletedBoard(newLists))
      } else {
        //If drag happened between lists
        const result = move(lists[sIndex], lists[dIndex], source, destination);
        const newLists = [...lists];
        newLists[sIndex] = result[sIndex];
        newLists[dIndex] = result[dIndex];
        setLists(newLists.filter(group => group.length));
        setModal(checkCompletedBoard(newLists))
      }

      
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='board'>
          {lists.map((list, index) => (
            <Droppable key={index} droppableId={`${index}`}>
              {(provided) => (
                <ul className='tilesList' ref={provided.innerRef} {...provided.droppableProps}>
                  {list.map((tile, ind) => (
                    <Draggable key={tile.id} draggableId={`${tile.id}`} index={ind}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <Tile tile={tile} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          ))}    
          <Winmodal modal={modal} setModal={setModal} getNewImage={getNewImage} />
        </div>
      </DragDropContext>
      
    </>
  )
}
