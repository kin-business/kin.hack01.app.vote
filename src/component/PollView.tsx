import * as React from "react";
import { ISavedPoll, IPollItem } from "../types/vote";
import PollItemView from "./PollItemView";
import { Card } from "react-bootstrap";

export interface IPollViewProps {
  poll: ISavedPoll;
  onVote?: (forItem: IPollItem) => void;
  hasVoted?: boolean;
}

export interface IPollViewState {}

export default class PollView extends React.Component<
  IPollViewProps,
  IPollViewState
> {
  constructor(props: IPollViewProps) {
    super(props);

    this.state = {};
  }
  public onVoteClick(poll: IPollItem) {
    let { onVote } = this.props;
    if (onVote) onVote(poll);
  }
  public render() {
    let { poll, hasVoted } = this.props;

    return (
      <div>
        <Card>
          <Card.Body>
            <Card.Title>{poll.name}</Card.Title>
            <Card.Text>
              Current vote count {poll.votes ? poll.votes : 0}
            </Card.Text>
            {poll.voteItem.map((item, i) => (
              <PollItemView
                hasVoted={hasVoted ? hasVoted : false}
                onVote={item => this.onVoteClick(item)}
                key={i}
                item={item}
              ></PollItemView>
            ))}
          </Card.Body>
        </Card>
      </div>
    );
  }
}
