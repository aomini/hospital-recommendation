import { useEffect, useState } from "react";

import CheckIcon from "src/assets/icons/CheckIcon";
import AuthLayout from "src/layout/AuthLayout";
import Sidebar from "src/components/Sidebar";
import axios from "src/utils/axios";

const Priorities = () => {
  const [priorities, setPriorities] = useState<any[]>([]);
  const [newWeight, setNewWeight] = useState<number>();

  useEffect(() => {
    const fetchPriorities = async () => {
      try {
        await axios.get("/priorities").then((resp) => {
          setPriorities(resp.data);
        });
      } catch (error) {
        // const { status, data } = error.response;
        console.log(error);
      }
    };
    fetchPriorities();
  }, []);
  console.log("Weight", priorities);

  const handleWeightChange = (e) => {
    setNewWeight(e.target.value);
  };
  console.log("New Weight", newWeight);
  return (
    <AuthLayout childrenClass="grid grid-cols-12">
      <section className="col-span-1">
        <Sidebar className="" />
      </section>
      <section className="col-span-1"></section>
      <section className="col-span-10">
        {priorities?.map((priority) => (
          <section className="grid grid-cols-4 place-items-center mb-2">
            <section className="col-span-1">
              <label
                htmlFor="priorities"
                className="text-md font-medium text-left w-auto"
              >
                {priority.FieldItem.title}
              </label>
            </section>
            <section className="col-span-1">
              <input
                className="p-4 py-2.5 !w-[300px] rounded-md border border-gray-200 focus:outline-none focus:ring focus:ring-blue-200"
                name="priorities"
                type="text"
                value={priority.weight}
                onChange={handleWeightChange}
                placeholder="Enter Weight"
              />
            </section>
            <section className="col-span-1">
              <button className="bg-green-400 p-2 rounded-md">
                <CheckIcon className="text-white" />
              </button>
            </section>
          </section>
        ))}
      </section>
    </AuthLayout>
  );
};

export default Priorities;
