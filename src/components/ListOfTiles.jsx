import { Droppable, Draggable } from "react-beautiful-dnd"
import { Tile } from "./Tile"
import '../Styles/listOfTiles.css'

export function ListOfTiles ({list, dId}){
    if(!list){
        list = []
    }
  
    return(
        <Droppable droppableId={`tilesList-${dId}`}>
          {(provided) => (
            <ul className='tilesList' ref={provided.innerRef} {...provided.droppableProps}>
              {list.map((tile, index) => (
                <Draggable key={index} index={index} draggableId={`tile-${tile.randomId}`}>
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
    )
}