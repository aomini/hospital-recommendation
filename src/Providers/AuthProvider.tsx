import React from "react";
import axios from "src/utils/axios";

export const UserContext = React.createContext({});

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState<any>({
    first_name: "User",
    username: "user@123.com",
  });

  React.useEffect(() => {
    const fetchCurrentUser = async () => {
      await axios
        .get("/user/me")
        .then((resp: any) => {
          console.log(resp);
          setCurrentUser(resp.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchCurrentUser();
  }, []);

  return (
    <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
  );
};

export default AuthProvider;
