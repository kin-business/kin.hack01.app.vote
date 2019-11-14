import React from "react";
import * as routes from "./constants/routes";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import CreatePage from "./pages/create/CreatePage";
import VotePage from "./pages/vote/VotePage";
import PreviewPage from "./pages/preview/PreviewPage";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";

const App: React.FC = () => {
  return (
    <Container className="p-5">
      <Router>
        <Switch>
          <Route exact={true} path={routes.HOME} component={HomePage} />
          <Route
            exact={true}
            path={routes.CREATE_LOAD}
            component={CreatePage}
          />
          <Route exact={true} path={routes.CREATE} component={CreatePage} />
          <Route exact={true} path={routes.PREVIEW} component={PreviewPage} />
          <Route exact={true} path={routes.VOTE} component={VotePage} />
        </Switch>
      </Router>
    </Container>
  );
};

export default App;
