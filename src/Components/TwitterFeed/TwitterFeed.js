import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import socketIOClient from "socket.io-client";
import TwitterCards from "./TwitterCards";

class TweetFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      renderedThings: [],
      itemsRendered: 0,
      searchTerm: "COVID19",
      inProp: true
    };
  }

  handleChange = event => {
    this.setState({ searchTerm: event.target.value });
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.handleResume();
    }
  };

  handleResume = () => {
    let term = this.state.searchTerm;
    fetch("/setSearchTerm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ term })
    });
  };

  handlePause = event => {
    fetch("/pause", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
  };
  ScheduleNextUpdate = () => {
    this.timer = setTimeout(this.updateRendered, 2000);
  };

  updateRendered = () => {
    const itemsRendered = this.state.itemsRendered;
    const updatedState = {
      renderedThings:
        this.state.items.length > 1
          ? this.state.renderedThings.concat(
              this.state.items[this.state.itemsRendered]
            )
          : /* [this.state.items[this.state.itemsRendered]].concat(
              this.state.renderedThings.slice(0, 15)
            ) */
            [],
      itemsRendered: this.state.items.length < 16 ? itemsRendered + 1 : 0
    };
    this.setState(updatedState);
    updatedState.itemsRendered < this.state.items.length &&
      this.ScheduleNextUpdate();
  };

  componentDidMount() {
    this.ScheduleNextUpdate();

    const socket = socketIOClient("https://react-twitter-feed.herokuapp.com/");

    socket.on("connect", () => {
      console.log("Socket Connected");
      socket.on("tweets", data => {
        console.info(data);

        let newList = [data].concat(this.state.items.slice(0, 15));
        this.setState({ items: newList });
      });
    });
    socket.on("disconnect", () => {
      socket.off("tweets");
      socket.removeAllListeners("tweets");
      console.log("Socket Disconnected");
    });
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    let items = this.state.items;
    console.log(items);
    console.log(this.state.renderedThings);

    /*   
  //controls for socket io//
 
  let searchControls = (
      <div>
        <input
          id="email"
          type="text"
          className="validate"
          value={this.state.searchTerm}
          onKeyPress={this.handleKeyPress}
          onChange={this.handleChange}
        />
        <label htmlFor="email">Search</label>
      </div>
    ); */

    let filterControls = (
      <div>
        <a
          className="btn-floating btn-small waves-effect waves-light pink accent-2"
          style={controlStyle}
          onClick={this.handleResume}
        >
          <i className="material-icons">play_arrow</i>
        </a>
        <a
          className="btn-floating btn-small waves-effect waves-light pink accent-2"
          onClick={this.handlePause}
        >
          <i className="material-icons">pause</i>
        </a>
        <p>
          <input type="checkbox" id="test5" />
          <label htmlFor="test5">Retweets</label>
        </p>
      </div>
    );

    let controls = <div>{items.length > 0 ? filterControls : null}</div>;

    let loading = (
      <div>
        <p className="flow-text loader-text">Listening to Streams</p>
        <div className="progress lime lighten-3">
          <div className="indeterminate pink accent-1"></div>
        </div>
      </div>
    );

    return (
      <div className="tweet-container">
        <div className="feed-title">
          <h1>
            {" "}
            <img
              className="twtr-logo"
              src="https://seeklogo.com/images/T/twitter-logo-A84FE9258E-seeklogo.com.png"
              alt="twitter logo"
            />
            Live COVID19 Feed
          </h1>
        </div>
        <div className="col feedDiv">
          <div className="col s12 m4 l4">
            <div>
              {this.state.renderedThings.length > 1 ? (
                <TransitionGroup className="flex">
                  {this.state.renderedThings.map((x, i) => (
                    <CSSTransition
                      in={this.state.inProp}
                      classNames="example"
                      timeout={1000}
                    >
                      <TwitterCards key={i} data={x} />
                    </CSSTransition>
                  ))}
                </TransitionGroup>
              ) : (
                loading
              )}
            </div>
          </div>
          <div className="col s12 m4 l4"></div>
        </div>
      </div>
    );
  }
}

const controlStyle = {
  marginRight: "5px"
};

export default TweetFeed;
