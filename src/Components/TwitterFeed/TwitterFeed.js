import React from "react";
import { CSSTransitionGroup } from "react-transition-group";
import socketIOClient from "socket.io-client";
import TwitterCards from "./TwitterCards";

class TweetList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      searchTerm: "COVID19"
    };
  }
  handleChange = e => {
    this.setState({ searchTerm: e.target.value });
  };

  handleEnter = e => {
    e.key === "Enter" && this.handleResume();
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
  handlePause = e => {
    fetch("/pause", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
  };

  componentDidMount() {
    const socket = socketIOClient("http://localhost:3000/");

    socket.on("connect", () => {
      console.log("socket is connected");
    });
  }

  render() {
    return <></>;
  }
}
export default TwitterFeed;
