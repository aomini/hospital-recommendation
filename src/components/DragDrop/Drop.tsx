import React from "react";
import { Droppable } from "react-beautiful-dnd";

const Drop = ({ children, ...rest }) => {
  return (
    <Droppable {...rest}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={{ backgroundColor: snapshot.isDraggingOver ? "blue" : "grey" }}
          {...provided.droppableProps}
        >
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Drop;
