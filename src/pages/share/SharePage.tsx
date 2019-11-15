import * as React from "react";
import { ReactRouterProps, IStateBase } from "../../types/BaseInterfaces";
import { ISavedPoll } from "../../types/vote";
import { observePoll } from "../../firebase/db";
import * as routes from "../../constants/routes";
import { Row, Col, Button } from "react-bootstrap";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon
} from "react-share";
export interface ISharePageProps extends ReactRouterProps {}

export interface ISharePageState extends IStateBase {
  poll?: ISavedPoll;
}

export default class SharePage extends React.Component<
  ISharePageProps,
  ISharePageState
> {
  constructor(props: ISharePageProps) {
    super(props);
    this.state = { isLoading: true };
  }
  public componentDidMount() {
    const { history } = this.props;
    observePoll(this.props.match.params.id, poll => {
      this.setState({ poll: poll, isLoading: false });
    });
  }

  public render() {
    var { poll } = this.state;
    var history = this.props.history;
    var link = document.location.href.replace("share", "p");

    return (
      <Row>
        <Col sm={2}>
          <img src="/bird.jpg" alt="polly"></img>
        </Col>
        <Col className="text-center">
          <h1 className="sharePollH1">Greate Job</h1>
          <div className="Rectangle">
            <img
              className="sharePollRandomImage"
              src="/randomshit.jpg"
              alt="polly"
            ></img>
            <div className="sharePollShare">
              Share a link to the poll so people can vote
            </div>
            {poll ? (
              <>
                <div className="sharePollTitle">{poll && poll.name}</div>
                <button
                  className="yellowButton mb-5"
                  onClick={(event: any) => {
                    event.preventDefault();
                    history.push(routes.VOTE.replace(":id", poll!.id));
                  }}
                >
                  Copy link
                </button>
                <Row>
                  <Col>
                    <FacebookShareButton quote={poll.name} url={link}>
                      <FacebookIcon size={32} round={true} />
                    </FacebookShareButton>
                    <LinkedinShareButton url={link}>
                      <LinkedinIcon size={32} round={true} />
                    </LinkedinShareButton>
                    <TwitterShareButton url={link}>
                      <TwitterIcon size={32} round={true} />
                    </TwitterShareButton>
                    <WhatsappShareButton url={link}>
                      <WhatsappIcon size={32} round={true} />
                    </WhatsappShareButton>
                  </Col>
                </Row>
              </>
            ) : (
              <br />
            )}
          </div>
        </Col>
        <Col sm={2}></Col>
      </Row>
    );
  }
}
