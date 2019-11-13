import * as React from "react";
import * as routes from "../../constants/routes";
import { ReactRouterProps, IStateBase } from "../../types/BaseInterfaces";

export interface IHomePageProps extends ReactRouterProps {}

export interface IHomePageState extends IStateBase {}

export default class HomePage extends React.Component<
  IHomePageProps,
  IHomePageState
> {
  constructor(props: IHomePageProps) {
    super(props);

    this.state = {
      isLoading: false
    };
  }
  onClick(event: any) {
    const { history } = this.props;
    event.preventDefault();
    history.push(routes.CREATE);
  }
  public render() {
    return (
      <div>
        <a href="/create" onClick={e => this.onClick(e)}>
          [Add]
        </a>
      </div>
    );
  }
}
