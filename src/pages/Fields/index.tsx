import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import AuthLayout from "src/layout/AuthLayout";
import axios from "src/utils/axios";
import { H2 } from "src/components/Typography";
import DragDropPriorities from "./components/DragDropPriorities";
import DragFields from "./components/DragFields";
// import { ViewMoreButton } from "src/components/Button";
// import WarningCard from "src/components/WarningCard.tsx";

const Fields = () => {
  // const [warningModal, setWarningModal] = React.useState(false);
  // const [updateModal, setUpdateModal] = React.useState(false);
  const [fields, setFields] = React.useState<any[]>([]);
  const [priorities, setPriorities] = React.useState<any>([]);

  // console.log("Update, warning", updateModal, warningModal)
  // const handleUpdate = () => {
  //   setUpdateModal(!updateModal);
  // };

  // const handleDelete = () => {
  //   setWarningModal(!warningModal);
  // };

  React.useEffect(() => {
    const fetchFields = async () => {
      const { data } = await axios.get("/fields");
      setFields(data);
    };
    fetchFields();
  }, []);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    // drag from field=>priorities
    if (
      source.droppableId.includes("field") &&
      destination.droppableId.includes("priorities")
    ) {
      const dragFieldId = parseInt(
        source.droppableId.replace("field-drop-", "")
      );

      const dragField = fields.find((x) => x.id === dragFieldId);
      const dragItem = dragField.field_items[source.index];
      if (!priorities.find((x) => x.id === dragItem.id)) {
        setPriorities((priorities) => [...priorities, dragItem]);
        //
      }
    }
  };
  return (
    <>
    {/* {updateModal ? <WarningCard /> : ""} */}
        <main className="flex justify-between w-full rounded-md min-h-screen mt-2">
          <section className=" bg-gray-50 w-2/3 p-3 mr-8 border border-gray-400 shadow-sm rounded-md">
            <section className="text-center text-purple mb-2">
              <H2>Available Fields</H2>
            </section>
            <DragFields fields={fields} />
          </section>
          <section className=" bg-gray-50 w-2/3 p-3 border border-gray-400 shadow-sm rounded-md">
            <section className="text-center text-purple mb-2">
              <H2>Priorities</H2>
              <div>
                <DragDropPriorities priorities={[]} />
              </div>
            </section>
          </section>
        </main>
    </>
  );
};

export default Fields;
