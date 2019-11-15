import * as React from "react";
import { ReactRouterProps, IStateBase } from "../../types/BaseInterfaces";
import { observePoll, voteItem } from "../../firebase/db";
import { ISavedPoll, IPollItem } from "../../types/vote";
import PollView from "../../component/PollView";
import Cookies from "js-cookie";

import { Row, Col } from "react-bootstrap";
import RegisterOnKin from "../../component/RegisterOnKin";
import { drawPolly } from "../home/HomePage";
import PollItemView from "../../component/PollItemView";

export interface IVotePageProps extends ReactRouterProps {}

export interface IVotePageState extends IStateBase {
  poll?: ISavedPoll;
  hasVoted: boolean;
}

export default class VotePage extends React.Component<
  IVotePageProps,
  IVotePageState
> {
  constructor(props: IVotePageProps) {
    super(props);
    this.state = { isLoading: true, hasVoted: false };
  }

  public componentDidMount() {
    var record = Cookies.get(this.props.match.params.id);
    this.setState({
      hasVoted: record !== undefined
    });

    observePoll(this.props.match.params.id, poll => {
      this.setState({
        poll: poll,
        isLoading: false
      });
    });
  }

  public vote(forItem: IPollItem) {
    console.log(forItem);
    this.setState({ hasVoted: true, isLoading: true });
    if (forItem.votes) forItem.votes++;
    voteItem(this.state.poll!, forItem).then(() => {
      Cookies.set(this.state.poll!.id, Date.now().toString());
      this.setState({ isLoading: false });
    });
  }

  public renderVote(poll: ISavedPoll) {
    let { hasVoted } = this.state;

    if (poll === null) return;
    return (
      <>
        <Row>
          <Col>
            <PollView
              hasVoted={hasVoted}
              onVote={i => this.vote(i)}
              poll={poll}
            ></PollView>
          </Col>
        </Row>
      </>
    );
  }

  public renderVoteCapture() {
    return (
      <div>
        {this.renderVote(this.state.poll!)}
        <hr />
        <div className={"text-center"}>{drawPolly()}</div>
      </div>
    );
  }

  public renderVoteDisplay() {
    let { hasVoted } = this.state;
    let poll = this.state.poll!;
    let { description, cost } = poll.voteItem
      .sort((a, b) => (hasVoted ? (a.votes! < b.votes! ? 1 : -1) : 1))
      .map((item, i) => item)[0];
    let votes = poll.voteCount ? poll.voteCount : 0;
    return (
      <div className="text-center">
        <div className="pollViewHeading">{poll.name}</div>
        <div className="pollViewDesc mt-4">
          {votes} {votes == 1 ? "person has" : "people have"} voted.
        </div>
        <div className="m-3">Winner:-)</div>
        <Row>
          {poll.voteItem
            .sort((a, b) => (hasVoted ? (a.votes! < b.votes! ? 1 : -1) : 1))
            .slice(0, 1)
            .map((item, i) => (
              <Col lg={{ span: 6, offset: 3 }}>
                <PollItemView
                  hasVoted={hasVoted ? hasVoted : false}
                  key={i}
                  item={item}
                ></PollItemView>
              </Col>
            ))}
        </Row>

        <Row className="mt-3">
          <Col lg={{ span: 6, offset: 3 }}>
            <RegisterOnKin
              groupName={poll.name}
              amount={cost ? cost : 1}
              transactionName={description}
            ></RegisterOnKin>
          </Col>
        </Row>

        <Row>
          <Col>
            {" "}
            <div className="pollViewHeading">Other results</div>
          </Col>
        </Row>
        <Row>
          {poll.voteItem
            .sort((a, b) => (hasVoted ? (a.votes! < b.votes! ? 1 : -1) : 1))
            .slice(1, 12)
            .map((item, i) => (
              <Col lg={{ span: 6, offset: 3 }}>
                <PollItemView
                  hasVoted={hasVoted ? hasVoted : false}
                  key={i}
                  item={item}
                ></PollItemView>
              </Col>
            ))}
        </Row>
      </div>
    );
  }
  public render() {
    return (
      <div>
        {this.state.isLoading ? (
          <div>loading...</div>
        ) : this.state.hasVoted ? (
          this.renderVoteDisplay()
        ) : (
          this.renderVoteCapture()
        )}
      </div>
    );
  }
}
