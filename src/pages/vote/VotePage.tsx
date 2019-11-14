import * as React from "react";
import { ReactRouterProps, IStateBase } from "../../types/BaseInterfaces";
import { observePoll, voteItem } from "../../firebase/db";
import { ISavedPoll, IPollItem } from "../../types/vote";
import PollView from "../../component/PollView";
import Cookies from "js-cookie";

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
      <div>
        <PollView
          hasVoted={hasVoted}
          onVote={i => this.vote(i)}
          poll={poll}
        ></PollView>
      </div>
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
