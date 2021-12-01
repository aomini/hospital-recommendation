import React from "react";
import { Droppable } from "react-beautiful-dnd";

const Drop = ({ children, ...rest }) => {
  return (
    <Droppable {...rest}>
      {(provided, snapshot) => {
        return (
          <div
            className="h-full"
            ref={provided.innerRef}
            //   className={snapshot.isDraggingOver ? "bg-gray-200" : null}
            {...provided.droppableProps}
          >
            {children(provided, snapshot)}
            {/* {provided.placeholder} */}
          </div>
        );
      }}
    </Droppable>
  );
};

export default Drop;
