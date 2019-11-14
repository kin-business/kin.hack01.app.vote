import * as React from "react";
import { IPollItem } from "../types/vote";
import { Card, Badge, Button, Row, Col } from "react-bootstrap";

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
    let { onVote, hasVoted } = this.props;
    return (
      <Col className="mt-4">
        <div className="Rectangle">
          {item.image && <img className="pollItemViewImage" src={item.image} />}
          <div className="pollItemViewHeadin">{item.description}</div>
          {item.starFeature && (
            <div className="pollItemViewFeature">{item.starFeature}</div>
          )}
          <Row>
            <Col sm={8} style={{ textAlign: "left" }}>
              {item.link && (
                <a className="pollItemViewLink" href={item.link}>
                  {item.link}
                </a>
              )}
            </Col>
            {item.cost && (
              <Col sm={3} className="pollItemViewCost">
                R{item.cost}
              </Col>
            )}
          </Row>

          {!hasVoted && (
            <Button
              className="voteButton"
              onClick={() => {
                if (onVote) onVote(item);
              }}
            >
              Vote for this option
            </Button>
          )}
          {onVote && hasVoted && (
            <Badge className="float-right" variant="primary">
              {item.votes ? item.votes : 0}
            </Badge>
          )}
        </div>
      </Col>
    );
  }
  public onClickVote(item: IPollItem) {
    this.setState({ hasVoted: true });
  }

  public render() {
    let item = this.props.item;
    return <>{this.renderWithImage(item)}</>;
  }
}
