import React from "react";

import AuthLayout from "src/layout/AuthLayout";
import { H2 } from "src/components/Typography";
import axios from "src/utils/axios";

// const data = [
//   {
//     name: "General",
//     order: 1,
//     field_items: [
//       {
//         title: "General",
//         subtitle: "JPT",
//         order: 1,
//       },
//     ],
//   },
//   {
//     name: "Second One",
//     order: 2,
//     field_items: [
//       {
//         title: "General",
//         subtitle: "JPT",
//         order: 1,
//       },
//     ],
//   },
//   {
//     name: "Third One",
//     order: 3,
//     field_items: [
//       {
//         title: "General",
//         subtitle: "JPT",
//         order: 1,
//       },
//     ],
//   },
// ];

const Fields = () => {

  const [fields, setFields] = React.useState<any[]>([])

  React.useEffect(() => {
    const fetchFields = async () => {
      const {data} = await axios.get("/fields")
      console.log(data)
      setFields(data)
    }
    fetchFields()
  }, [])
  console.log("Fields", fields)
  return (
    <AuthLayout>
      {/* <H1>Fields</H1> */}
      <main className="flex justify-between w-fullrounded-md min-h-screen mt-2">
        <section className=" bg-gray-50 w-2/3 p-3 mr-2 border border-gray-400 shadow-sm">
          <section className="text-center text-purple mb-2">
            <H2>Active Fields</H2>
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
                      className="text-sm font-normal text-gray-700 p-2"
                      key={item.title}
                    >
                      {item.title}{item.subtitle ? `(${item.subtitle})` : ""}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
        <section className=" bg-gray-50 w-2/3 p-3 border border-gray-400 shadow-sm">
          <section className="text-center text-purple mb-2">
            <H2>Inactive Fields</H2>
          </section>
        </section>
      </main>
    </AuthLayout>
  );
};

export default Fields;
