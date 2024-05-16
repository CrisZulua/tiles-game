import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useEffect, useState } from 'react';
import { Tile } from './Tile'
import '../Styles/board.css'
export function Board({tiles}){

  const [lists, setLists] = useState([])

  useEffect(()=>{
    setLists([tiles.slice(0, 4), tiles.slice(4, 8), tiles.slice(8, 12), tiles.slice(12, 16)])
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
      } else {
        //If drag happened between lists
        const result = move(lists[sIndex], lists[dIndex], source, destination);
        const newLists = [...lists];
        newLists[sIndex] = result[sIndex];
        newLists[dIndex] = result[dIndex];
  
        setLists(newLists.filter(group => group.length));
      }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='board'>
        {lists.map((list, index) => (
          <Droppable key={index} droppableId={`${index}`}>
            {(provided) => (
              <ul className='tilesList' ref={provided.innerRef} {...provided.droppableProps}>
                {list.map((tile, ind) => (
                  <Draggable key={tile.id} draggableId={tile.id} index={ind}>
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
      </div>
    </DragDropContext>
  )
}
