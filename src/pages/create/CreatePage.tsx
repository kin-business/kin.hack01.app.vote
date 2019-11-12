import * as React from 'react';
import { IPoll } from '../../types/vote';

export interface ICreatePageProps {
    history?: any;
}

export interface ICreatePageState {
  poll: IPoll
}

export default class CreatePage extends React.Component<ICreatePageProps, ICreatePageState> {
  constructor(props: ICreatePageProps) {
    super(props);

    this.state = {
      poll : {name:"Sample", voteItem: [
        {description : "Do you love beer"},
        {description : "You really love beer!"},
        {description : "You had me at beer!"}
      ]}
    }
  }

  private onUpdate(callback: () => any): void {
    callback();
    this.setState({poll: this.state.poll});
  }

  public render() {
    var {poll} = this.state;
    return (
      <div>
        <form>
        <input
          value={poll.name}
          onChange={event => this.onUpdate(() => poll.name = event.target.value) }
          type="text"
          placeholder="Ask a question"
        />
        </form>
      </div>
    );
  }
}
