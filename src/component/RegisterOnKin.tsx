import * as React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

export interface IRegisterOnKinProps {
  groupName: string;
  transactionName: string;
  amount: number;
}

export interface IRegisterOnKinState {
  email: string;
  isLoading: boolean;
  error?: any;
}

export default class RegisterOnKin extends React.Component<
  IRegisterOnKinProps,
  IRegisterOnKinState
> {
  constructor(props: IRegisterOnKinProps) {
    super(props);
    this.state = { email: "", isLoading: false };
  }

  private onUpdate(email: string) {
    this.setState({ email: email });
  }
  public async onSubmit(event: any) {
    event.preventDefault();
    var { groupName, transactionName, amount } = this.props;
    var { email } = this.state;
    var token = await this.createAccount(email);
    var myId = await this.getMyId(token);
    await this.buildGroup(token, myId, groupName, transactionName, amount);
    document.location.href = "https://web.dev.kin.me";
  }

  buildGroup(
    token: string,
    myId: string,
    groupName: string,
    transactionName: string,
    amount: number
  ): Promise<any> {
    var variables = {
      myId: myId,
      groupName: groupName,
      transactionName: transactionName,
      amount: amount * -100
    };
    const endpoint = `https://api.dev.kin.business/graphql`;
    return fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify({
        query:
          'mutation($myId: String!, $groupName: String!, $transactionName: String!, $amount: Int!) {\n  groupCreateWithMembersAndTransaction(\n    name: $groupName\n    members: []\n    transactionRecord: {description:$transactionName,responsibleMemberId:$myId,transactionType:Planned,amount: {cents:$amount,currencyIso:"ZAR"}}\n  ) {\n    id\n  }\n}\n',
        variables: variables
      })
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoading: false
          });
          console.log(result);
          return true;
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoading: false,
            error
          });
        }
      );
  }

  getMyId(token: string): Promise<string> {
    const endpoint = `https://api.dev.kin.business/graphql`;
    return fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: '{"query":"{\n  me {id, hasSignedUp}\n}\n"}'
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoading: false
          });
          console.log(result);
          return result.data.me.id;
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoading: false,
            error
          });
        }
      );
  }

  createAccount(email: string): Promise<string> {
    let password = Math.random()
      .toString(36)
      .substring(7);
    const endpoint = `https://api.dev.kin.me/api/auth/create?email=${encodeURIComponent(
      email
    )}&name=${encodeURIComponent(email)}&password=${password}`;
    return fetch(endpoint, {
      method: "PUT"
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoading: false
          });
          return result.accessToken;
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoading: false,
            error
          });
        }
      );
  }

  public render() {
    var { groupName } = this.props;
    var { email, isLoading } = this.state;
    return (
      <Form onSubmit={(event: any) => this.onSubmit(event)}>
        <Form.Group controlId="description">
          <Row>
            <Col>
              <div className="registerHeading">
                Sign up for Kin to share this expense with friends.
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="registerDesc">
              <div>Keep track of other expenses related to {groupName}</div>
            </Col>
          </Row>

          <Row>
            <Col sm={8}>
              <Form.Control
                className="ml-3 InputField"
                type="email"
                value={email}
                placeholder="Your email"
                onChange={(event: any) => this.onUpdate(event.target.value)}
              />
            </Col>
            <Col sm={1}>
              <button
                style={{ width: 150 }}
                disabled={isLoading}
                className="yellowButton"
                type="submit"
              >
                Sign up
              </button>
            </Col>
          </Row>
        </Form.Group>
      </Form>
    );
  }
}
