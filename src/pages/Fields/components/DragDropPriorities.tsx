import TrashIcon from "src/assets/icons/TrashIcon";
import { IconButton } from "src/components/Button";
import Drag from "src/components/DragDrop/Drag";
import Drop from "src/components/DragDrop/Drop";
import { H3 } from "src/components/Typography";

const DragDropPriorities = ({ priorities, isDragDisabled, handleClick }) => {
  return (
    <Drop droppableId={`priorities-drop`}>
      <div className="h-full ">
        {!priorities.length && (
          <div className="bg-white border border-purple border-dashed h-full flex items-center justify-center">
            <H3>Drop here..</H3>
          </div>
        )}
        {priorities.map((priority, index) => (
          <Drag
            key={priority.code}
            draggableId={`draggable-priorities-${priority.code}`}
            index={index}
            isDragDisabled={isDragDisabled}
          >
            <div className="p-2 mt-2 text-left flex justify-between items-center">
              <div className="text-sm">
                {priority.title}
                <span className="ml-2 text-xs text-gray-600 bg-gold p-1 rounded-full">
                  {priority.Field.name}
                </span>
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
