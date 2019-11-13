import * as React from "react";
import { ReactRouterProps, IStateBase } from "../../types/BaseInterfaces";
import { observePoll } from "../../firebase/db";
import { ISavedPoll, IPollItem } from "../../types/vote";
import PollView from "../../component/PollView";

export interface IVotePageProps extends ReactRouterProps {}

export interface IVotePageState extends IStateBase {
  poll?: ISavedPoll;
}

export default class VotePage extends React.Component<
  IVotePageProps,
  IVotePageState
> {
  constructor(props: IVotePageProps) {
    super(props);
    this.state = { isLoading: true };
  }

  public componentDidMount() {
    observePoll(this.props.match.params.id, tests => {
      this.setState({ poll: tests, isLoading: false });
    });
  }

  public vote(forItem: IPollItem) {
    console.log(forItem);
  }

  public renderVote(poll: ISavedPoll) {
    if (poll === null) return;
    return (
      <div>
        <PollView onVotes={this.vote} poll={poll}></PollView>
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
