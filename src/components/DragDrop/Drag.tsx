import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Drag = ({ children, ...rest }) => {
  return (
    <Draggable {...rest}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {children}
        </div>
      )}
    </Draggable>
  );
};

export default Drag;
