import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateUser from "../CreateUser";
import Home from "../Home";
import Login from "../Login";

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
        <Route path="/create-user">
          <CreateUser />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
