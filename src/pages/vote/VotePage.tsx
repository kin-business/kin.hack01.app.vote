import * as React from "react";
import { ReactRouterProps, IStateBase } from "../../types/BaseInterfaces";
import { observePoll, voteItem } from "../../firebase/db";
import { ISavedPoll, IPollItem } from "../../types/vote";
import PollView from "../../component/PollView";
import Cookies from "js-cookie";
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
import RegisterOnKin from "../../component/RegisterOnKin";

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
    let { description, cost } = poll.voteItem
      .sort((a, b) => (hasVoted ? (a.votes! < b.votes! ? 1 : -1) : 1))
      .map((item, i) => item)[0];

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
        <Row>
          <Col sm={6}>
            <RegisterOnKin
              groupName={poll.name}
              amount={cost ? cost : 1}
              transactionName={description}
            ></RegisterOnKin>
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
