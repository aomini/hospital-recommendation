import * as React from "react";
import Drag from "../../../components/DragDrop/Drag";
import Drop from "../../../components/DragDrop/Drop";

const Draggable = ({ item }) => (
  <li className="flexitems-center justify-between text-sm font-normal text-gray-700 p-2">
    {item.title}
    {item.subtitle ? `(${item.subtitle})` : ""}
  </li>
);

const DragFields = ({ fields, priorities }) => {
  return (
    <ul className="mt-2">
      {fields?.map((field) => (
        <Drop
          key={field.id}
          droppableId={`field-drop-${field.id}`}
          isDropDisabled={true}
          // renderClone={(provided, snapshot, rubric) => {
          //   const item = field.field_items[rubric.source.index];
          //   return (
          //     <ul
          //       {...provided.draggableProps}
          //       {...provided.dragHandleProps}
          //       ref={provided.innerRef}
          //     >
          //       <Draggable item={item} priorities={priorities} />
          //     </ul>
          //   );
          // }}
        >
          {() => (
            <li className="my-2">
              <div className="bg-gray-200 text-lg font-medium p-2 rounded-sm">
                {field.name}
              </div>
              <ul className="!bg-none p-2">
                {field.field_items.map((item, index) => {
                  // const shouldRenderClone =
                  //   `field-drag-${item.id}` === snapshot.draggingFromThisWith;
                  // if (shouldRenderClone)
                  //   return <Draggable item={item} priorities={priorities} />;
                  return (
                    <Drag
                      key={item.id}
                      draggableId={`field-drag-${item.id}`}
                      index={index}
                      // isDragDisabled={
                      //   !!priorities.find((x) => x.id === item.id)
                      // }
                    >
                      <Draggable item={item} priorities={priorities} />
                    </Drag>
                  );
                })}
              </ul>
            </li>
          )}
        </Drop>
      ))}
    </ul>
  );
};

export default DragFields;
