import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateUser from "../CreateUser";
import Home from "../Home";
import Login from "../Login";
import Settings from "../Settings";
import UpdateUsers from "../UpdateUsers";
import Users from "../Users";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/users">
          <Users />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/users/create-user">
          <CreateUser />
        </Route>
        <Route path="/users/edit/:id" edit={true}>
          <CreateUser />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
