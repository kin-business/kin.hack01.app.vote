import * as React from "react";
import { IPollItem } from "../types/vote";

export interface IPollItemViewProps {
  item: IPollItem;
}

export interface IPollItemViewState {}

export default class PollItemView extends React.Component<
  IPollItemViewProps,
  IPollItemViewState
> {
  constructor(props: IPollItemViewProps) {
    super(props);

    this.state = {};
  }

  public render() {
    let item = this.props.item;
    return <div>{item.description}</div>;
  }
}
