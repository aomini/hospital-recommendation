import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AuthProvider from "src/Providers/AuthProvider";
import AuthLayout from "src/layout/AuthLayout";
import Map from "src/pages/Map";
import PageNotFound from "src/pages/404";
import Login from "src/pages/Login";

const routes = [
  // {
  //   exact: true,
  //   path: "/login",
  //   component: React.lazy(() => import("src/pages/Login")),
  // },
  {
    exact: true,
    path: "/users",
    component: React.lazy(() => import("src/pages/Users")),
    layout: AuthLayout,
  },
  {
    exact: true,
    path: "/users/create-user",
    component: React.lazy(() => import("src/pages/CreateUser")),
    layout: AuthLayout,
  },
  {
    exact: true,
    path: "/users/edit/:id",
    component: React.lazy(() => import("src/pages/CreateUser")),
    edit: true,
    layout: AuthLayout,
  },
  {
    exact: true,
    path: "/settings",
    component: React.lazy(() => import("src/pages/Fields")),
    layout: AuthLayout,
  },
  {
    path: "/look-ups",
    component: React.lazy(() => import("src/pages/Lookups")),
    layout: AuthLayout,
  },
  {
    path: "/settings/priorities",
    component: React.lazy(() => import("src/pages/Priorities")),
    layout: AuthLayout,
  },
  {
    path: "/hospital/edit/:id",
    component: React.lazy(() => import("src/pages/Home/Edit")),
    layout: AuthLayout,
  },
  {
    exact: true,
    path: "/map",
    component: React.lazy(() => import("src/pages/Map")),
    layout: AuthLayout,
  },
  {
    exact: true,
    path: "/",
    component: React.lazy(() => import("src/pages/Home")),
    layout: AuthLayout,
  },
];

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <AuthLayout>
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
          </AuthLayout>
          <Route path='*' component={PageNotFound} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
