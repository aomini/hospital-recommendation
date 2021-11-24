import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import AuthLayout from "src/layout/AuthLayout";
import axios from "src/utils/axios";
import instance from "src/utils/axios";
import { reorder } from "src/utils/drag-drop";
import { H2 } from "src/components/Typography";
import { SuccessButton } from "src/components/Button";
import Sidebar from "src/components/Sidebar";
import DragDropPriorities from "./components/DragDropPriorities";
import DragFields from "./components/DragFields";

const Fields = () => {
  const [fields, setFields] = React.useState<any[]>([]);
  const [priorities, setPriorities] = React.useState<any>([]);
  const [isDisabled, setIsDisabled] = React.useState(true);

  React.useEffect(() => {
    const fetchFields = async () => {
      const { data } = await axios.get("/fields");
      setFields(data);
    };

    const fetchPriorities = () => {
      instance
        .get("/priorities")
        .then((res) => {
          const { data } = res;
          setPriorities(data.map((x) => x.FieldItem));
          setIsDisabled(!!data.length);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchFields();
    fetchPriorities();
    adjustHeight();
  }, []);

  const adjustHeight = () => {
    const navBar: HTMLElement = document.querySelector(
      ".nav-bar"
    ) as HTMLElement;
    const container: any = document.querySelector(".fields");
    container.style.height = `calc( 100vh - ${navBar.clientHeight + 30}px )`;
  };

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
    const fieldItems = priorities.map((x) => x.id);
    instance
      .post("/priorities", {
        fieldItems,
      })
      .then((res) => {
        setIsDisabled(true);
      })
      .catch((err) => {});
  };
  return (
    <AuthLayout childrenClass="grid grid-cols-6 gap-2">
      <section className="col-span-1">
        <Sidebar
          className=""
        />
      </section>
      <div className="fields col-span-5">
        <DragDropContext onDragEnd={handleDragEnd}>
          <main className="flex h-full justify-between w-full overflow-hidden rounded-md mt-2">
            <section className=" h-full overflow-auto bg-gray-50 w-2/3 p-3 mr-2 border border-gray-400 shadow-sm rounded-md">
              <section className="text-center text-purple mb-2">
                <H2>Available Fields</H2>
              </section>
              <div>
                <DragFields isDragDisabled={isDisabled} fields={fields} />
              </div>
            </section>
            <section className="bg-gray-50 h-full overflow-auto w-2/3 p-3 border shadow-sm rounded-md">
              <section className="text-center h-full text-purple mb-2">
                <div className="flex justify-between align-center mb-1">
                  <div></div>
                  <H2 className="justify-center">Priorities</H2>
                  <div className="justify-end">
                    {!isDisabled && (
                      <SuccessButton onClick={handleSave}>Save</SuccessButton>
                    )}
                  </div>
                </div>
                <div className="w-full h-full">
                  <DragDropPriorities
                    handleClick={handleClick}
                    priorities={priorities}
                    isDragDisabled={isDisabled}
                  />
                </div>
              </section>
            </section>
          </main>
        </DragDropContext>
      </div>
    </AuthLayout>
  );
};

export default Fields;
