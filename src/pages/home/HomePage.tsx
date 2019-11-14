import * as React from "react";
import * as routes from "../../constants/routes";
import { ReactRouterProps, IStateBase } from "../../types/BaseInterfaces";

import { Container, Button, Col, Row, Jumbotron } from "react-bootstrap";
import RegisterOnKin from "../../component/RegisterOnKin";

export interface IHomePageProps extends ReactRouterProps {}

export interface IHomePageState extends IStateBase {}

export default class HomePage extends React.Component<
  IHomePageProps,
  IHomePageState
> {
  constructor(props: IHomePageProps) {
    super(props);

    this.state = {
      isLoading: false
    };
  }
  onClick(event: any) {
    const { history } = this.props;
    event.preventDefault();
    history.push(routes.CREATE);
  }
  public render() {
    return (
      <Container className={"text-center"}>
        <Row>
          <Col>
            <img style={{ width: 500, marginTop: 85 }} src="polly.png"></img>
          </Col>
        </Row>
        <Row>
          <Col>
            <span className="createHeading">Polly Parrot</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <span className="createDescription">
              Polly parrot makes group decision making super easy. Wanna
              cracker?
            </span>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              <Button
                variant="dark"
                className="yellowButton"
                size="lg"
                onClick={(e: any) => this.onClick(e)}
              >
                Create a new poll
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
