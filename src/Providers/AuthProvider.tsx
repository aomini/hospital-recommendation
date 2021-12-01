import React from "react";
import { useHistory } from "react-router-dom";

import axios from "src/utils/axios";

export const UserContext = React.createContext({});

const AuthProvider = ({ children }) => {
  const history = useHistory();
  const [currentUser, setCurrentUser] = React.useState<any>({
    first_name: "User",
    username: "user@123.com",
    last_name: ""
  });

  React.useEffect(() => {
    const fetchCurrentUser = async () => {
      await axios
        .get("/user/me")
        .then((resp: any) => {
          setCurrentUser(resp.data);
        })
        .catch((error) => {
          // console.log(error);
          // history.push("/login");
        });
    };
    fetchCurrentUser();
  }, []);

  console.log(currentUser)
  return (
    <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
  );
};

export default AuthProvider;
