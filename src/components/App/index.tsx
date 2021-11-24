import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Map from 'src/pages/Map'
import axios from "src/utils/axios";
import PageNotFound from "src/pages/404";

export const UserContext = React.createContext({});

const routes = [
  {
    exact: true,
    path: "/",
    component: React.lazy(() => import("src/pages/Home")),
  },
  {
    exact: true,
    path: "/login",
    component: React.lazy(() => import("src/pages/Login")),
  },
  {
    exact: true,
    path: "/users",
    component: React.lazy(() => import("src/pages/Users")),
  },
  // {
  //   exact: true,
  //   path: "/settings",
  //   component: React.lazy(() => import("src/pages/Settings")),
  // },
  {
    exact: true,
    path: "/users/create-user",
    component: React.lazy(() => import("src/pages/CreateUser")),
  },
  {
    exact: true,
    path: "/users/edit/:id",
    component: React.lazy(() => import("src/pages/CreateUser")),
    edit: true,
  },
  {
    exact: true,
    path: "/settings",
    component: React.lazy(() => import("src/pages/Fields")),
  },
  {
    path: "/look-ups",
    component: React.lazy(() => import("src/pages/Lookups")),
  },
  {
    path: "/settings/priorities",
    component: React.lazy(() => import("src/pages/Priorities")),
  },
];

const App = () => {
const [currentUser, setCurrentUser] = React.useState<any>()

  React.useEffect(() => {
    const fetchCurrentUser = async () => {
      await axios
        .get("/user/me")
        .then((resp: any) => {
          // console.log(resp);
          setCurrentUser(resp.data)
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchCurrentUser();
  }, []);

  return (
    <UserContext.Provider value="Hello Context">
      <Router>
        <Switch>
          <Route path="/map" exact>
            <Map />
          </Route>
          {routes.map((route) => (
            <Route exact={route.exact} path={route.path} key={route.path}>
              <React.Suspense fallback={() => "loading"}>
                <route.component edit={route.edit} />
              </React.Suspense>
            </Route>
          ))}
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
