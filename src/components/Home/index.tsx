import React from "react";
import { useHistory } from "react-router-dom";

import UserAddIcon from "src/assets/icons/UserAddIcon";
import AuthLayout from "src/layout/AuthLayout";
import { PrimaryButton } from "../Button";
import DataTable from "../DataTable";

import { H1 } from "../Typography";
const columns = [
  {
    name: "ID",
    selector: (row) => row.id,
  },
  {
    name: "Name",
    selector: (row) => row.name,
  },
];

const data = [
  {
    id: 1,
    name: "Hospital 1",
  },
  {
    id: 2,
    name: "Hospital 2",
  },
];
const Home = () => {
  const history = useHistory();
  return (
    <AuthLayout>
      <div className="bg-gray-200 p-5">
        <H1 className="font-medium">Hospitals</H1>
      </div>
      <div className="p-5 bg-gray-50 border border-gray-200 rounded-md shadow-sm h-full">
        <section className="text-right mb-5">
          <PrimaryButton
            onClick={() => history.push("/create-user")}
            className="inline-flex items-center bg-purple hover:bg-pink-600 text-white rounded-sm"
          >
            Create a New User
            <UserAddIcon className="ml-1" />
          </PrimaryButton>
        </section>
        <DataTable columns={columns} data={data} />
      </div>
    </AuthLayout>
  );
};

export default Home;
