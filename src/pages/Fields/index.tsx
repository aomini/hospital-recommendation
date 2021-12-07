import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import axios from "src/utils/axios";
import { reorder } from "src/utils/drag-drop";
import { H2 } from "src/components/Typography";
import { SuccessButton } from "src/components/Button";
import Sidebar from "src/components/Sidebar";
import useAdjustHeight from "src/hooks/useAdjustHeight";
import { notifySuccess } from "src/utils/notify";
import DragDropPriorities from "./components/DragDropPriorities";
import DragFields from "./components/DragFields";

const Fields = () => {
  const [fields, setFields] = React.useState<any[]>([]);
  const [priorities, setPriorities] = React.useState<any>([]);
  const [hasPriorities, setHasPriorities] = React.useState(true);
  const { adjustHeight } = useAdjustHeight();

  // return <Test />;
  React.useEffect(() => {
    const fetchFields = async () => {
      const { data } = await axios.get("/fields");
      setFields(data);
    };

    const fetchPriorities = () => {
      axios
        .get("/priorities")
        .then((res) => {
          const { data } = res;
          setPriorities(data.map((x) => x.FieldItem));
          setHasPriorities(!!data.length);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchFields();
    fetchPriorities();
  }, []);

  React.useEffect(() => {
    adjustHeight(".nav-bar", ".fields", 30);
  }, [adjustHeight]);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    console.log("");

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
      dragItem.Field = {
        name: dragField.name,
        id: dragField.id,
      };
      if (!priorities.find((x) => x.code === dragItem.code)) {
        const newPriorities = [...priorities];
        newPriorities.splice(destination.index, 0, dragItem);
        setPriorities(newPriorities);
      }
    }
    // drag within priorities
    if (
      source.droppableId === destination.droppableId &&
      source.droppableId.includes("priorities")
    ) {
      const newList = reorder(priorities, source.index, destination.index);
      setPriorities(newList);
    }
  };

  const handleClick = (priority) => {
    setPriorities((priorities) =>
      priorities.filter((x) => x.id !== priority.id)
    );
  };

  const handleSave = () => {
    const method = hasPriorities ? "put" : "post";
    const fieldItems = priorities.map((x) => x.id);
    axios[method]("/priorities", {
      fieldItems,
    })
      .then(() => {
        setHasPriorities(true);
        notifySuccess(
          !hasPriorities ? "Created successfully" : "Updated successfully"
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="grid grid-cols-6 gap-2">
      <section className="col-span-1">
        <Sidebar className="" />
      </section>
      <div className="fields col-span-5">
        <DragDropContext onDragEnd={handleDragEnd}>
          <main className="flex h-full justify-between w-full overflow-hidden rounded-md mt-2">
            <section className=" h-full overflow-auto bg-gray-50 w-2/3 p-3 mr-2 border border-gray-400 shadow-sm rounded-md">
              <section className="text-center text-purple mb-2">
                <H2>Available Fields</H2>
              </section>
              <div>
                <DragFields priorities={priorities} fields={fields} />
              </div>
            </section>
            <section className="bg-gray-50 h-full overflow-auto w-2/3 p-3 border shadow-sm rounded-md">
              <section className="text-center h-full mb-2">
                <div className="flex justify-between align-center text-purple mb-1">
                  <div />
                  <H2 className="justify-center">Priorities</H2>
                  <div className="justify-end">
                    <SuccessButton
                      onClick={handleSave}
                      className="w-20 rounded font-medium"
                    >
                      {!hasPriorities ? "Create" : "Update"}
                    </SuccessButton>
                  </div>
                </div>
                <div className="w-full h-full">
                  <DragDropPriorities
                    handleClick={handleClick}
                    priorities={priorities}
                    isDragDisabled={false}
                  />
                </div>
              </section>
            </section>
          </main>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Fields;
