import * as React from "react";
import { ReactRouterProps, IStateBase } from "../../types/BaseInterfaces";
import { observePoll } from "../../firebase/db";
import { ISavedPoll, IPoll } from "../../types/vote";
import * as routes from "../../constants/routes";
import PollItemView from "../../component/PollItemView";

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

  public renderVote(poll: ISavedPoll) {
    if (poll === null) return;
    return (
      <div>
        <h1>{poll.name}</h1>
        {poll.voteItem.map((item, i) => (
          <PollItemView item={item}></PollItemView>
        ))}
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
