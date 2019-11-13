import * as React from "react";
import { ISavedPoll, IPollItem } from "../types/vote";
import PollItemView from "./PollItemView";
import { Card } from "react-bootstrap";

export interface IPollViewProps {
  poll: ISavedPoll;
  onVote?: (forItem: IPollItem) => void;
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

  public render() {
    let { poll, onVote } = this.props;
    return (
      <div>
        <Card>
          <Card.Body>
            <Card.Title>
              <h2>{poll.name}</h2>
            </Card.Title>

            {poll.voteItem.map((item, i) => (
              <PollItemView onVote={onVote} key={i} item={item}></PollItemView>
            ))}
          </Card.Body>
        </Card>
      </div>
    );
  }
}
