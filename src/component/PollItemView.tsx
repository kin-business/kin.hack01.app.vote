import * as React from "react";
import { IPollItem } from "../types/vote";
import { Card, Badge, Button } from "react-bootstrap";

export interface IPollItemViewProps {
  item: IPollItem;
  onVote?: (forItem: IPollItem) => void;
  hasVoted: boolean;
}

export interface IPollItemViewState {}

export default class PollItemView extends React.Component<
  IPollItemViewProps,
  IPollItemViewState
> {
  defaultStyle: {};

  constructor(props: IPollItemViewProps) {
    super(props);
    this.state = {};
    this.defaultStyle = { marginTop: 20 };
  }

  public renderWithImage(item: IPollItem) {
    return (
      <Card style={this.defaultStyle} className="bg-dark text-white">
        <Card.Img src={item.image} alt="Card image" />
        <Card.ImgOverlay>{this.renderInside(item)}</Card.ImgOverlay>
      </Card>
    );
  }
  public onClickVote(item: IPollItem) {
    this.setState({ hasVoted: true });
  }

  public renderInside(item: IPollItem) {
    let { onVote, hasVoted } = this.props;

    return (
      <>
        <Card.Title>{item.description}</Card.Title>
        {item.starFeature && <Card.Text>{item.starFeature}</Card.Text>}
        {item.cost && <Badge variant="secondary">R{item.cost}</Badge>}
        {onVote && !hasVoted && (
          <Button
            className="float-right"
            variant="secondary"
            onClick={() => onVote!(item)}
          >
            Vote
          </Button>
        )}
        {onVote && hasVoted && (
          <Badge className="float-right" variant="primary">
            {item.votes ? item.votes : 0}
          </Badge>
        )}
      </>
    );
  }

  public renderNoImage(item: IPollItem) {
    return (
      <Card style={this.defaultStyle}>
        <Card.Body>{this.renderInside(item)}</Card.Body>
      </Card>
    );
  }

  public render() {
    let item = this.props.item;
    return (
      <div>
        {item.image ? this.renderWithImage(item) : this.renderNoImage(item)}
      </div>
    );
  }
}
