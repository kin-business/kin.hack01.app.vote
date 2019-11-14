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
      <Container>
        <Jumbotron>
          <h1 className="header">Welcome to kin vote thingy</h1>
        </Jumbotron>

        <Row>
          <Col>
            <div className={"text-center"}>
              <Button
                variant="dark"
                size="lg"
                onClick={(e: any) => this.onClick(e)}
              >
                Create
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
