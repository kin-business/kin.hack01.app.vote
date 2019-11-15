import * as React from "react";
import * as routes from "../../constants/routes";
import { ReactRouterProps, IStateBase } from "../../types/BaseInterfaces";

import { Container, Button, Col, Row } from "react-bootstrap";

export interface IHomePageProps extends ReactRouterProps {}

export interface IHomePageState extends IStateBase {}

export function drawPolly() {
  return (
    <div>
      <Row>
        <Col>
          <img
            style={{ width: 500, marginTop: 85 }}
            src="/polly.png"
            alt="polly"
          ></img>
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
            Polly parrot makes group decision making super easy. Wanna cracker?
          </span>
        </Col>
      </Row>
    </div>
  );
}
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
        {drawPolly()}
        <Row>
          <Col>
            <div>
              <button
                className="yellowButton"
                onClick={(e: any) => this.onClick(e)}
              >
                Create a new poll
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
