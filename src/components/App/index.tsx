import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../Home";
import Login from "../Login";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
