import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
  {
    exact: true,
    path: "/settings",
    component: React.lazy(() => import("src/pages/Settings")),
  },
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
];

const App = () => {
  return (
    <Router>
      <Switch>
        {routes.map((route) => (
          <Route
            exact={route.exact}
            path={route.path}
            edit={route.edit ?? false}
          >
            <React.Suspense fallback={() => "loading"}>
            <route.component />
            </React.Suspense>
          </Route>
        ))}
      </Switch>
    </Router>
  );
};

export default App;
