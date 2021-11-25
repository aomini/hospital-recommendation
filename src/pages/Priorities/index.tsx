import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { notifyError, notifySuccess } from "src/utils/notify";
import axios from "src/utils/axios";
import CheckIcon from "src/assets/icons/CheckIcon";
import AuthLayout from "src/layout/AuthLayout";
import Sidebar from "src/components/Sidebar";

const Priorities = () => {
  const [priorities, setPriorities] = useState<any[]>([]);

  useEffect(() => {
    const fetchPriorities = async () => {
      try {
        await axios.get("/priorities").then((resp) => {
          setPriorities(resp.data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchPriorities();
  }, []);

  const handleWeightChange = (e, priority) => {
    // console.log(e);
    const { name, value } = e.target;
    setPriorities((prev: any) =>
      prev.map((x) => (x.id === priority.id ? { ...x, [name]: value } : x))
    );
    // console.log("Target ko value", e.target.value);
  };

  const handleUpdate = (priority) => {
    axios
      .put(`/priorities/${priority.id}`, {
        weight: priority.weight,
      })
      .then((resp: any) => {
        notifySuccess(resp.message);
      })
      .catch((error) => {
        notifyError(error.response);
      });
  };

  const handleKeyDown = (e, priority) => {
    if (e.keyCode === 13) {
      handleUpdate(priority);
    }
  };

  return (
    <AuthLayout>
      <ToastContainer />
      <Sidebar className="" />
      <section className="w-5/6 ml-auto">
        {priorities?.map((priority) => (
          <section
            className="grid grid-cols-4 justify-items-start items-center mb-2"
            key={priority.id}
          >
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
                className="p-4 py-2.5 !w-[300px] rounded-md border border-gray-200 input-focus"
                name="weight"
                type="text"
                value={priority.weight}
                onChange={(e) => handleWeightChange(e, priority)}
                onKeyUp={(e) => handleKeyDown(e, priority)}
                placeholder="Enter Weight"
              />
            </section>
            <section className="col-span-1">
              <button
                className="bg-green-400 p-1.5 rounded-md"
                onClick={() => handleUpdate(priority)}
                title="Update"
              >
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
