import React from "react";
import * as routes from "./constants/routes";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import CreatePage from "./pages/create/CreatePage";
import VotePage from "./pages/vote/VotePage";

const App: React.FC = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact={true} path={routes.CREATE} component={CreatePage} />
        <Route exact={true} path={routes.HOME} component={HomePage} />
        <Route exact={true} path={routes.VOTE} component={VotePage} />
      </Switch>
    </Router>
  );
};

export default App;
