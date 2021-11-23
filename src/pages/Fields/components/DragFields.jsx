import React from "react";
import Drag from "src/components/DragDrop/Drag";
import Drop from "src/components/DragDrop/Drop";

const DragFields = ({ fields, isDragDisabled }) => {
  return (
    <ul className="mt-2">
      {fields?.map((field) => (
        <Drop
          key={field.id}
          droppableId={`field-drop-${field.id}`}
          isDropDisabled
        >
          <li className="my-2">
            <div className="bg-gray-200 text-lg font-medium p-2 rounded-sm">
              {field.name}
            </div>
            <ul className="!bg-none p-2">
              {field.field_items.map((item, index) => (
                <Drag
                  key={item.id}
                  draggableId={`field-drag-${item.id}`}
                  index={index}
                  isDragDisabled={isDragDisabled}
                >
                  <li className="flex items-center justify-between text-sm font-normal text-gray-700 p-2">
                    {item.title}
                    {item.subtitle ? `(${item.subtitle})` : ""}
                  </li>
                </Drag>
              ))}
            </ul>
          </li>
        </Drop>
      ))}
    </ul>
  );
};

export default DragFields;
