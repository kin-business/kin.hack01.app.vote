import * as React from 'react';

export interface IHomePageProps {
}

export interface IHomePageState {
 
}

export default class HomePage extends React.Component<IHomePageProps, IHomePageState> {
  constructor(props: IHomePageProps) {
    super(props);

    this.state = {
     
    }
  }

  public render() {
    return (
      <div>
        <a href="/create">[Add]</a>
      </div>
    );
  }
}
