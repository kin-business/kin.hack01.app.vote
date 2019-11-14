import * as React from "react";
import { ReactRouterProps, IStateBase } from "../../types/BaseInterfaces";
import { observePoll, voteItem } from "../../firebase/db";
import { ISavedPoll, IPollItem } from "../../types/vote";
import PollView from "../../component/PollView";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon
} from "react-share";
import { Row, Col } from "react-bootstrap";

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
    observePoll(this.props.match.params.id, tests => {
      this.setState({ poll: tests, isLoading: false });
    });
  }

  public vote(forItem: IPollItem) {
    console.log(forItem);
    this.setState({ hasVoted: true, isLoading: true });
    if (forItem.votes) forItem.votes++;
    voteItem(this.state.poll!, forItem).then(() => {
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
        <Row className={"text-center"}>
          <Col>
            <FacebookShareButton quote={poll.name} url={document.location.href}>
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
            <LinkedinShareButton url={document.location.href}>
              <LinkedinIcon size={32} round={true} />
            </LinkedinShareButton>
            <TwitterShareButton url={document.location.href}>
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
            <WhatsappShareButton url={document.location.href}>
              <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>
          </Col>
        </Row>
      </>
    );
  }

  public render() {
    return (
      <div>
        {this.state.isLoading ? (
          <div>loading...</div>
        ) : (
          this.renderVote(this.state.poll!)
        )}
      </div>
    );
  }
}
