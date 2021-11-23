import React from "react";

import AuthLayout from "src/layout/AuthLayout";
import axios from "src/utils/axios";
import { H2 } from "src/components/Typography";
// import { ViewMoreButton } from "src/components/Button";
// import WarningCard from "src/components/WarningCard.tsx";

const Fields = () => {
  // const [warningModal, setWarningModal] = React.useState(false);
  // const [updateModal, setUpdateModal] = React.useState(false);
  const [fields, setFields] = React.useState<any[]>([]);

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
  return (
    <>
    {/* {updateModal ? <WarningCard /> : ""} */}
        <main className="flex justify-between w-full rounded-md min-h-screen mt-2">
          <section className=" bg-gray-50 w-2/3 p-3 mr-8 border border-gray-400 shadow-sm rounded-md">
            <section className="text-center text-purple mb-2">
              <H2>Available Fields</H2>
            </section>
            <ul className="mt-2">
              {fields?.map((field) => (
                <li key={field.order} className="my-2">
                  <div className="bg-gray-200 text-lg font-medium p-2 rounded-sm">
                    {field.name}
                  </div>
                  <ul className="!bg-none p-2">
                    {field.field_items.map((item) => (
                      <li
                        className="flex items-center justify-between text-sm font-normal text-gray-700 p-2"
                        key={item.title}
                      >
                        {item.title}
                        {item.subtitle ? `(${item.subtitle})` : ""}
                        {/* <ViewMoreButton
                          setUpdateModal={setUpdateModal}
                          setWarningModal={setWarningModal}
                          updateModal={updateModal}
                          warningModal={warningModal}
                        /> */}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>
          <section className=" bg-gray-50 w-2/3 p-3 border border-gray-400 shadow-sm rounded-md">
            <section className="text-center text-purple mb-2">
              <H2>Priorities</H2>
            </section>
          </section>
        </main>
    </>
  );
};

export default Fields;
