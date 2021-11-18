import React from "react";
import { useHistory } from "react-router-dom";

import UserAddIcon from "src/assets/icons/UserAddIcon";
import AuthLayout from "src/layout/AuthLayout";
import { PrimaryButton } from "../Button";
import DataTable from "../DataTable";

import { BodyText } from "../Typography";
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
      <div className="bg-gray-200 flex items-center justify-between p-5">
        <BodyText className="font-medium">Add User</BodyText>
        <PrimaryButton
          onClick={() => history.push("/create-user")}
          className="flex items-center bg-purple hover:bg-pink-600 text-white rounded-sm"
        >
          Create a New User
          <UserAddIcon className="ml-1" />
        </PrimaryButton>
      </div>
      <div className="p-5 bg-gray-200 h-screen">
        <DataTable columns={columns} data={data} title="Hospitals" />
      </div>
    </AuthLayout>
  );
};

export default Home;
