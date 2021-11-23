import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const routes = [
  {
    exact: true,
    path: "/",
    component: React.lazy(() => import("src/pages/Home")),
    edit: false,
  },
  {
    exact: true,
    path: "/login",
    component: React.lazy(() => import("src/pages/Login")),
    edit: false,
  },
  {
    exact: true,
    path: "/users",
    component: React.lazy(() => import("src/pages/Users")),
    edit: false,
  },
  {
    exact: true,
    path: "/settings",
    component: React.lazy(() => import("src/pages/Settings")),
    edit: false,
  },
  {
    exact: true,
    path: "/users/create-user",
    component: React.lazy(() => import("src/pages/CreateUser")),
    edit: false,
  },
  {
    exact: true,
    path: "/users/edit/:id",
    component: React.lazy(() => import("src/pages/CreateUser")),
    edit: true,
  },
  {
    exact: true,
    path: "/fields",
    component: React.lazy(() => import("src/pages/Fields")),
    edit: true,
  },
  {
    path: "/look-up",
    component: React.lazy(() => import("src/pages/Lookup")),
  },
];

const App = () => {
  return (
    <Router>
      <Switch>
        {routes.map((route) => (
          <Route exact={route.exact} path={route.path} key={route.path}>
            <React.Suspense fallback={() => "loading"}>
              <route.component edit={route.edit} />
            </React.Suspense>
          </Route>
        ))}
      </Switch>
    </Router>
  );
};

export default App;
