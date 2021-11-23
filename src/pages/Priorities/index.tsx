import CheckIcon from "src/assets/icons/CheckIcon";
import AuthLayout from "src/layout/AuthLayout";
import Sidebar from "src/components/Sidebar";

const Priorities = () => {
  //   const handleSubmit = (id) => {}
  return (
    <AuthLayout childrenClass="grid grid-cols-6">
      <section className="col-span-1">
        <Sidebar
          // setShowFields={setShowFields}
          // showFields={showFields}
          className=""
        />
      </section>
      <section className="col-span-4">
        <section>
          <span>
            <label
              htmlFor="priorities"
              className="text-md font-medium text-left"
            >
              Priorities
            </label>
            <br />
            <input
              className="p-5 w-1/2 rounded-md border border-gray-200"
              name="priorities"
              type="text"
              placeholder="Enter here"
            />
          </span>
          <button className="text-green-700 mt-2">
            <CheckIcon />
          </button>
        </section>
      </section>
    </AuthLayout>
  );
};

export default Priorities;
