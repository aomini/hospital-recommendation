import CheckIcon from "src/assets/icons/CheckIcon";
import AuthLayout from "src/layout/AuthLayout";
import Sidebar from "src/components/Sidebar";

const Priorities = () => {
  return (
    <AuthLayout childrenClass="grid grid-cols-6">
      <section className="col-span-1">
        <Sidebar
          className=""
        />
      </section>
      <section className="col-span-3">
        <section className="grid grid-cols-4 place-items-center">
          <section className="col-span-1">
            <label
              htmlFor="priorities"
              className="text-md font-medium text-left w-auto"
            >
              Priorities
            </label>
          </section>
          <section className="col-span-1">
            <input
              className="p-4 py-2.5 !w-[300px] rounded-md border border-gray-200 focus:outline-none focus:ring focus:ring-blue-200"
              name="priorities"
              type="text"
              placeholder="Enter Weight"
            />
          </section>
          <section className="col-span-1">
            <button className="bg-green-400 p-2 rounded-md">
              <CheckIcon className="text-white" />
            </button>
          </section>
        </section>
      </section>
    </AuthLayout>
  );
};

export default Priorities;
