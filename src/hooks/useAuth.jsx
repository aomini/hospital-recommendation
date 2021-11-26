import React from "react";
import { UserContext } from "src/components/App";

const useAuth = () => {
  return React.useContext(UserContext);
};

export default useAuth
