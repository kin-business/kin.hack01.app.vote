import * as React from "react";
import { ReactRouterProps } from "../../types/ReactRouterProps";
import { observePoll } from "../../firebase/db";
import { ISavedPoll } from "../../types/vote";

export interface IVotePageProps extends ReactRouterProps {}

export interface IVotePageState {
  poll?: ISavedPoll;
  isLoading: boolean;
  error?: string;
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

  public renderVote() {
    var { poll } = this.state;
    if (poll === null) return;
    return <div>{poll!.name}</div>;
  }

  public render() {
    return (
      <div>
        {this.state.isLoading ? <div>loading...</div> : this.renderVote()}
      </div>
    );
  }
}
