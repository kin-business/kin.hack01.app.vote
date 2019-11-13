import * as React from "react";
import { observePoll } from "../../firebase/db";
import { ReactRouterProps, IStateBase } from "../../types/BaseInterfaces";
import { ISavedPoll } from "../../types/vote";
import PollItemView from "../../component/PollItemView";
import * as routes from "../../constants/routes";

export interface IPreviewPageProps extends ReactRouterProps {}

export interface IPreviewPageState extends IStateBase {
  poll?: ISavedPoll;
}

export default class PreviewPage extends React.Component<
  IPreviewPageProps,
  IPreviewPageState
> {
  constructor(props: IPreviewPageProps) {
    super(props);
    this.state = { isLoading: true };
  }

  public componentDidMount() {
    observePoll(this.props.match.params.id, tests => {
      this.setState({ poll: tests, isLoading: false });
    });
  }
  onClick(event: any, url: string) {
    const { history } = this.props;
    event.preventDefault();
    history.push(url);
  }

  public renderPoll(poll: ISavedPoll) {
    return (
      <div>
        <h1>{poll.name}</h1>
        {poll.voteItem.map((item, i) => (
          <PollItemView item={item}></PollItemView>
        ))}

        <a
          href="back"
          onClick={e =>
            this.onClick(e, routes.CREATE_LOAD.replace(":id", poll.id))
          }
        >
          [Back]
        </a>

        <a
          href="post"
          onClick={e => this.onClick(e, routes.VOTE.replace(":id", poll.id))}
        >
          [Create]
        </a>
      </div>
    );
  }

  public render() {
    let { poll } = this.state;
    return (
      <div>
        {this.state.isLoading ? <div>loading...</div> : this.renderPoll(poll!)}
      </div>
    );
  }
}
