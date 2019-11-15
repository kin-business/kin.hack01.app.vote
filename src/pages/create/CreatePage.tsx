import * as React from "react";
import { IPoll, IPollItem, ISavedPoll } from "../../types/vote";
import { addPoll, observePoll, updatePoll } from "../../firebase/db";
import * as routes from "../../constants/routes";
import { ReactRouterProps, IStateBase } from "../../types/BaseInterfaces";
import { Form, Button, Card, Row, Col } from "react-bootstrap";

export interface ICreatePageProps extends ReactRouterProps {
  history?: any;
}

export interface ICreatePageState extends IStateBase {
  poll: IPoll;
}

// https://images.pexels.com/photos/1227520/pexels-photo-1227520.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500
// https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500
// https://images.pexels.com/photos/1531677/pexels-photo-1531677.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500
// https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500
// https://images.pexels.com/photos/949587/pexels-photo-949587.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500

export default class CreatePage extends React.Component<
  ICreatePageProps,
  ICreatePageState
> {
  constructor(props: ICreatePageProps) {
    super(props);

    this.state = {
      isLoading: false,
      poll: {
        name: "",

        voteItem: [{ description: "" }, { description: "" }]
      }
    };
  }

  public componentDidMount() {
    const id = this.props.match.params.id;
    if (id) {
      this.setState({ isLoading: true });
      const { history } = this.props;
      observePoll(this.props.match.params.id, poll => {
        if (poll.isPublished === true) {
          history.push(routes.SHARE.replace(":id", poll.id));
        } else {
          this.setState({ poll: poll, isLoading: false });
        }
      });
    }
  }

  private onUpdate(callback: () => any): void {
    callback();
    this.setState({ poll: this.state.poll });
  }

  instanceOfA(object: any): object is ISavedPoll {
    return "id" in object;
  }

  public onSubmit(event: any) {
    event.preventDefault();
    const { history } = this.props;
    const { poll } = this.state;
    this.setState({ isLoading: true });

    var savedPoll = poll as ISavedPoll;
    if (savedPoll.id) {
      updatePoll(savedPoll).then(result => {
        this.setState({ isLoading: false });
        history.push(routes.PREVIEW.replace(":id", savedPoll.id));
      });
    } else {
      addPoll(poll).then(result => {
        this.setState({ isLoading: false });
        history.push(routes.PREVIEW.replace(":id", result.id));
      });
    }
  }

  addMore(event: any): void {
    event.preventDefault();
    var poll = { ...this.state.poll };
    poll.voteItem.push({ description: "" });
    this.setState({ poll: poll });
  }

  public renderItem(item: IPollItem, key: number) {
    return (
      <div key={key}>
        <span className="OptionSpan">Option {key + 1}</span>
        <Row>
          <Col>
            <Form.Group controlId="description">
              <Form.Control
                type="description"
                className="InputField"
                value={item.description}
                placeholder="What's the option?"
                onChange={(event: any) =>
                  this.onUpdate(() => (item.description = event.target.value))
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Form.Group controlId="starFeature">
              <Form.Control
                type="text"
                className="InputField"
                value={item.starFeature}
                placeholder="Killer feature?"
                onChange={(event: any) =>
                  this.onUpdate(() => (item.starFeature = event.target.value))
                }
              />
            </Form.Group>
          </Col>
          <Col md="12">
            <Form.Group controlId="cost">
              <Form.Control
                type="text"
                className="InputField"
                placeholder="Is there a cost involved?"
                //value={item.cost.toString()}
                onChange={(event: any) =>
                  this.onUpdate(() => {
                    if (isNaN(parseInt(event.target.value))) {
                      item.cost = undefined;
                    } else {
                      item.cost = parseInt(event.target.value);
                    }
                  })
                }
              />
            </Form.Group>
          </Col>
          <Col md="12">
            <Form.Group controlId="link">
              <Form.Control
                type="text"
                className="InputField"
                value={item.link}
                placeholder="Include a link"
                onChange={(event: any) =>
                  this.onUpdate(() => (item.link = event.target.value))
                }
              />
            </Form.Group>
          </Col>
          <Col md="12">
            <Form.Group controlId="image">
              <Form.Control
                type="text"
                className="InputField"
                value={item.image}
                placeholder="Insert an image using a link"
                onChange={(event: any) =>
                  this.onUpdate(() => (item.image = event.target.value))
                }
              />
            </Form.Group>
          </Col>
        </Row>
      </div>
    );
  }

  public renderForm(poll: IPoll) {
    return (
      <Form onSubmit={(event: any) => this.onSubmit(event)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            style={{ paddingBottom: 38, paddingTop: 20 }}
            type="name"
            value={poll.name}
            placeholder="Ask a question or give your poll a name"
            onChange={(event: any) =>
              this.onUpdate(() => (poll.name = event.target.value))
            }
          />
        </Form.Group>
        {poll.voteItem.map((item, i) => this.renderItem(item, i))}
        <Row>
          <Col className={"text-center "}>
            <button className="another" onClick={(e: any) => this.addMore(e)}>
              add another option
            </button>
          </Col>
        </Row>
        <div className={"text-center mt-4"}>
          <button className="yellowButton" type="submit">
            Preview
          </button>
        </div>
      </Form>
    );
  }

  public render() {
    var { poll, error, isLoading } = this.state;
    var isInvalid = error === null || error === "";
    return (
      <div>
        {isLoading && <p>Loading....</p>}
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <Card>
              <Card.Body>
                <div className="text-center">
                  <Card.Title className="Create-a-new-poll">
                    Create a new poll
                  </Card.Title>
                </div>
                {this.renderForm(poll)}
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3}></Col>{" "}
        </Row>

        {isInvalid && <p>{error}</p>}
      </div>
    );
  }
}
