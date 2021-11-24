import React from "react";
import TrashIcon from "src/assets/icons/TrashIcon";
import { IconButton } from "src/components/Button";
import Drag from "src/components/DragDrop/Drag";
import Drop from "src/components/DragDrop/Drop";

const DragDropPriorities = ({ priorities, isDragDisabled, handleClick }) => {
  return (
    <Drop droppableId={`priorities-drop`}>
      <div className="h-full">
        {!priorities.length && (
          <div className="bg-gray-100 h-full">Drag here..</div>
        )}
        {priorities.map((priority, index) => (
          <Drag
            key={priority.code}
            draggableId={`draggable-priorities-${priority.code}`}
            index={index}
            isDragDisabled={isDragDisabled}
          >
            <div className="p-2 bg-gray-200 mt-2 text-left flex justify-between items-center">
              <div className="text-sm">
                {priority.title}
                <span className="ml-2 text-sm">({priority.Field.name})</span>
              </div>
              <div>
                {!isDragDisabled && (
                  <IconButton onClick={() => handleClick(priority)}>
                    <TrashIcon />
                  </IconButton>
                )}
              </div>
            </div>
          </Drag>
        ))}
      </div>
    </Drop>
  );
};

export default DragDropPriorities;
