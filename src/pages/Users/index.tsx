import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import EditIcon from "src/assets/icons/EditIcon";
import TrashIcon from "src/assets/icons/TrashIcon";
import UserAddIcon from "src/assets/icons/UserAddIcon";
import AuthLayout from "src/layout/AuthLayout";
import axios from "src/utils/axios";
import { H1 } from "../../components/Typography";
import DataTable from "../../components/DataTable";
import { PrimaryButton } from "../../components/Button";

const Users = () => {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const notify = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/user");
      setUsers(data);
    };
    fetchData();
  }, []);

  // const handleEdit = async(id) =>
  // {console.log(id)
  // const resp = await axios.put("/user/:id", {

  // })
  // };

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const resp: any = await axios.delete(`/user/${id}`);
      notify(resp.message);
    } catch (error) {
      console.log(error);
      notifyError(error);
    }
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
    },
    {
      name: "Name",
      selector: (row) => [row.first_name, row.last_name].join(" "),
      style:{
        textTransform: "capitalize"
      }
    },
    {
      name: "Username",
      selector: (row) => row.username,
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <section className="flex items-center justify-between">
            <button
              className="text-green-600 mr-5"
              title="Edit User"
              onClick={() => {history.push(`/users/edit/${row.id}`)}}
            >
              <EditIcon />
            </button>
            <button
              className="text-red-700"
              title="Delete User"
              onClick={() => handleDelete(row.id)}
            >
              <TrashIcon />
            </button>
          </section>
        );
      },
    },
  ];

  return (
    <AuthLayout>
      <ToastContainer />
      <div className="bg-gray-200 p-5">
        <H1 className="font-medium">Users</H1>
      </div>
      <div className="p-5 bg-gray-50 border border-gray-200 rounded-md shadow-sm h-full">
        <section className="text-right mb-5">
          <PrimaryButton
            onClick={() => history.push("/users/create-user")}
            className="inline-flex items-center bg-purple hover:bg-pink-600 text-white rounded-sm"
          >
            Create a New User
            <UserAddIcon className="ml-1" />
          </PrimaryButton>
        </section>
        <DataTable columns={columns} data={users} />
      </div>
    </AuthLayout>
  );
};

export default Users;
