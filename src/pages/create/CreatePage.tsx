import * as React from "react";
import { IPoll } from "../../types/vote";
import { setPoll } from "../../firebase/db";

export interface ICreatePageProps {
  history?: any;
}

export interface ICreatePageState {
  poll: IPoll;
  isLoading: boolean;
  error?: string;
  data?: any;
}

export default class CreatePage extends React.Component<
  ICreatePageProps,
  ICreatePageState
> {
  constructor(props: ICreatePageProps) {
    super(props);

    this.state = {
      isLoading: false,
      poll: {
        name: "Sample",
        voteItem: [
          { description: "Do you love beer" },
          { description: "You really love beer!" },
          { description: "You had me at beer!" }
        ]
      }
    };
  }

  public componentDidMount() {
    //db.collection("users").doc("bob");
    // db.collection("polls")
    //   .doc("8nOhYMhvBOrQZNUcsasJ")
    //   .onSnapshot(doc => {
    //     this.setState({ poll: doc });
    //   });
    // setData("acsd", "csad", "casdcsd");/
    // setData("123123123", "casdcas", "casd").then(x => console.log("donie"));
    // db.ref("polls")
    //   .once("value")
    //   .then(x => console.log(x));
    // getData().on("value", snapshot => {
    //   console.log(snapshot.val());
    //   this.setState({ data: snapshot.val() });
    // });
  }

  private onUpdate(callback: () => any): void {
    callback();
    this.setState({ poll: this.state.poll });
  }

  public onSubmit(event: any) {
    event.preventDefault();
    this.setState({ isLoading: true });
    setPoll(this.state.poll).then(t => {
      console.log("Saved:", t.id);
      this.setState({ isLoading: false });
    });
  }

  public render() {
    var { poll, error, isLoading } = this.state;
    var isInvalid = error === null || error == "";
    return (
      <div>
        <form onSubmit={event => this.onSubmit(event)}>
          <input
            value={poll.name}
            onChange={event =>
              this.onUpdate(() => (poll.name = event.target.value))
            }
            type="text"
            placeholder="Ask a question"
          />
          <button disabled={isInvalid} type="submit">
            Sign Up
          </button>
          {isLoading && <p>Loading....</p>}
          {isInvalid && <p>{error}</p>}
        </form>
      </div>
    );
  }
}
