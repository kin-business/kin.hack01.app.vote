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
          { description: "You really love beer!", cost: 12.44 },
          {
            description: "You had me at beer!",
            image:
              "data:image/jpeg;base64,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"
          },
          {
            description: "Wiki beer !@!@",
            link: "https://en.wikipedia.org/wiki/Beer"
          }
        ]
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
          history.push(routes.VOTE.replace(":id", poll.id));
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

  public renderItem(item: IPollItem, key: number) {
    return (
      <div key={key}>
        <hr></hr>
        <Row>
          <Col>
            <Form.Group controlId="description">
              <Form.Label>Give an option</Form.Label>
              <Form.Control
                type="description"
                value={item.description}
                placeholder="Definately !"
                onChange={(event: any) =>
                  this.onUpdate(() => (item.description = event.target.value))
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md="4">
            <Form.Group controlId="cost">
              <Form.Label>Cost</Form.Label>
              <Form.Control
                type="number"
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
          <Col md="8">
            <Form.Group controlId="starFeature">
              <Form.Label>Winning feature</Form.Label>
              <Form.Control
                type="text"
                value={item.starFeature}
                placeholder="Its just works"
                onChange={(event: any) =>
                  this.onUpdate(() => (item.starFeature = event.target.value))
                }
              />
            </Form.Group>
          </Col>
          <Col md="6">
            <Form.Group controlId="link">
              <Form.Label>Link for more information</Form.Label>
              <Form.Control
                type="text"
                value={item.link}
                placeholder="https://kin.me"
                onChange={(event: any) =>
                  this.onUpdate(() => (item.link = event.target.value))
                }
              />
            </Form.Group>
          </Col>
          <Col md="6">
            <Form.Group controlId="image">
              <Form.Label>Link to an image</Form.Label>
              <Form.Control
                type="text"
                value={item.image}
                placeholder="https://kin.me/image.jpg"
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
          <Form.Label>Ask a question</Form.Label>
          <Form.Control
            type="name"
            value={poll.name}
            placeholder="Should we use kin"
            onChange={(event: any) =>
              this.onUpdate(() => (poll.name = event.target.value))
            }
          />
        </Form.Group>
        {poll.voteItem.map((item, i) => this.renderItem(item, i))}
        <div className={"text-center mt-4"}>
          <Button
            style={{ width: 400 }}
            size="lg"
            variant="primary"
            type="submit"
          >
            Preview
          </Button>
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
        <Card>
          <Card.Body>
            <Card.Title>Add a new poll by asking a question</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            {this.renderForm(poll)}
          </Card.Body>
        </Card>

        {isInvalid && <p>{error}</p>}
      </div>
    );
  }
}
