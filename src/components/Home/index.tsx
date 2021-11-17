import React from "react";
import AuthLayout from "src/layout/AuthLayout";

import H1 from "../Heading/H1";

const Home = () => {
  return (
    <div>
      <AuthLayout>
        <H1>Welcome, User!</H1>
      </AuthLayout>
    </div>
  );
};

export default Home;
