import AuthLayout from "src/layout/AuthLayout";
import { H1, H2 } from "src/components/Typography";
import { defaultMaxListeners } from "events";

const data = [
  {
    name: "General",
    order: 1,
    field_items: [
      {
        title: "General",
        subtitle: "JPT",
        order: 1,
      },
    ],
  },
  {
    name: "Second One",
    order: 2,
    field_items: [
      {
        title: "General",
        subtitle: "JPT",
        order: 1,
      },
    ],
  },
  {
    name: "Third One",
    order: 3,
    field_items: [
      {
        title: "General",
        subtitle: "JPT",
        order: 1,
      },
    ],
  },
];

const Fields = () => {
  return (
    <AuthLayout>
      {/* <H1>Fields</H1> */}
      <main className="flex justify-between w-fullrounded-md min-h-screen mt-2">
        <section className=" bg-gray-50 w-2/3 p-3 mr-2 border border-gray-200 shadow-sm">
          <H2>Active Fields</H2>
          <ul className="mt-2">
            {data.map((datum) => (
              <li key={datum.order} className="my-2">
                <div className="bg-gray-100 text-lg font-medium p-2 rounded-sm">
                  {datum.name}
                </div>
                <ul className="!bg-none py-2">
                  {datum.field_items.map((item) => (
                    <li className="text-sm font-normal text-gray-700">
                      {item.title}({item.subtitle})
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
        <section className=" bg-gray-50 w-2/3 p-3 border border-gray-200 shadow-sm">
          <H2>Inactive Fields</H2>
        </section>
      </main>
    </AuthLayout>
  );
};

export default Fields;
