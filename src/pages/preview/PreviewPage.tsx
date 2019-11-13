import * as React from "react";
import { observePoll, updatePoll } from "../../firebase/db";
import { ReactRouterProps, IStateBase } from "../../types/BaseInterfaces";
import { ISavedPoll } from "../../types/vote";
import PollView from "../../component/PollView";
import * as routes from "../../constants/routes";
import { Button, Row, Container, Col } from "react-bootstrap";

export interface IPreviewPageProps extends ReactRouterProps {}

export interface IPreviewPageState extends IStateBase {
  poll?: ISavedPoll;
}

export default class PreviewPage extends React.Component<
  IPreviewPageProps,
  IPreviewPageState
> {
  constructor(props: IPreviewPageProps) {
    super(props);
    this.state = { isLoading: true };
  }

  public componentDidMount() {
    const { history } = this.props;
    observePoll(this.props.match.params.id, poll => {
      if (poll.isPublished === true) {
        history.push(routes.VOTE.replace(":id", poll.id));
      }
      this.setState({ poll: poll, isLoading: false });
    });
  }

  publish(event: any, url: string) {
    let { poll } = this.state;
    poll!.isPublished = true;
    const { history } = this.props;
    event.preventDefault();
    this.setState({ isLoading: true });
    updatePoll(poll!).then(result => {
      this.setState({ isLoading: false });
      history.push(url);
    });
  }

  onClick(event: any, url: string) {
    const { history } = this.props;
    event.preventDefault();
    history.push(url);
  }

  public renderPoll(poll: ISavedPoll) {
    return (
      <Container>
        <PollView poll={poll}></PollView>
        <Row>
          <Col className={"text-center mt-2"}>
            <Button
              variant="dark"
              size="lg"
              onClick={(e: any) =>
                this.onClick(e, routes.CREATE_LOAD.replace(":id", poll.id))
              }
            >
              Back
            </Button>
          </Col>
          <Col className={"text-center mt-2"}>
            <Button
              variant="dark"
              size="lg"
              onClick={(e: any) =>
                this.publish(e, routes.VOTE.replace(":id", poll.id))
              }
            >
              Create
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }

  public render() {
    let { poll } = this.state;
    return (
      <div>
        {this.state.isLoading ? <div>loading...</div> : this.renderPoll(poll!)}
      </div>
    );
  }
}
