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
    let { poll, hasVoted, onVote } = this.props;
    var vote = onVote ? (item: IPollItem) => this.onVoteClick(item) : undefined;
    return (
      <div>
        <Card className={"text-center"}>
          <Card.Body>
            <div className="pollViewHeading">{poll.name}</div>
            <div className="pollViewDesc">Vote for your preferred option:</div>

            {poll.voteItem
              .sort((a, b) => (hasVoted ? (a.votes! < b.votes! ? 1 : -1) : 1))
              .map((item, i) => (
                <PollItemView
                  hasVoted={hasVoted ? hasVoted : false}
                  onVote={vote}
                  key={i}
                  item={item}
                ></PollItemView>
              ))}
            {onVote && (
              <div className="pollViewDesc">
                Current vote count {poll.voteCount ? poll.voteCount : 0}
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    );
  }
}
