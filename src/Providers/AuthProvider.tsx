import React from "react";
import UserContext from "src/context/UserContext";
import axios from "src/utils/axios";

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState<any>({
    first_name: "User",
    username: "user@123.com",
    last_name: "",
  });

  React.useEffect(() => {
    const fetchCurrentUser = async () => {
      await axios
        .get("/user/me")
        .then((resp: any) => {
          setCurrentUser(resp.data);
        })
        .catch(() => {});
    };
    fetchCurrentUser();
  }, []);

  return (
    <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
  );
};

export default AuthProvider;
