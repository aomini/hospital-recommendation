import React from "react";
import UserAddIcon from "src/assets/icons/UserAddIcon";
import AuthLayout from "src/layout/AuthLayout";
import { PrimaryButton } from "../Button";

import { BodyText } from "../Typography";

const Home = () => {
  return (
    <AuthLayout>
      <div className="dark:bg-lighter bg-gray-white flex items-center justify-between p-5">
        <BodyText className="font-medium">Add User</BodyText>
        <PrimaryButton className="flex items-center bg-purple hover:bg-pink-600 text-white rounded-sm">
          Create a New User
          <UserAddIcon className="ml-1" />
        </PrimaryButton>
      </div>
      <div className="p-5 bg-gray-300">User Form</div>
    </AuthLayout>
  );
};

export default Home;
