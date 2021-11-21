import { useEffect, useState } from "react";

import AuthLayout from "src/layout/AuthLayout";
import axios from "src/utils/axios";
import { H1 } from "../Typography";
import DataTable from "../DataTable";

const columns = [
  {
    name: "ID",
    selector: (row) => row.id,
  },
  {
    name: "Users",
    selector: (row) => row.first_name,
  },
  {
    name: "Actions",
    selector: (row) => row.actions,
  },
];

const Users = () => {
  const[users, setUsers] = useState([])
  useEffect(() => {
    const fetchData = async() => {
          const {data} = await axios.get("/user")
          setUsers(data)
        console.log(data)
      }
      fetchData()
  }, [])
   
  return (
    <AuthLayout>
      <div className="bg-gray-200 p-5">
        <H1 className="font-medium">Users</H1>
      </div>
      <div className="p-5 bg-gray-50 border border-gray-200 rounded-md shadow-sm h-full">
        <section className="text-right mb-5">
        </section>
        <DataTable columns={columns} data={users} />
      </div>
    </AuthLayout>
  );
};

export default Users;
