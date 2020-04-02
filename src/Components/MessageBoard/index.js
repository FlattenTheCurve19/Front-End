import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { messageGetter } from "../../Store/Actions/messageActions";
import * as firebase from "firebase";

// Component Imports
import Card from "./Card";
import AddMessage from "./AddMessage";
import { Board, ToggleButton } from "./styles";

// Material UI Imports
import CircularProgress from "@material-ui/core/CircularProgress";
import { Menu } from '@material-ui/icons';
import { Typography } from "@material-ui/core";

export default () => {
  const { messages, isFetching, error, userInfo } = useSelector(
    state => state.messageBoard
  );
  const [sortedMessages, setSortedMessages] = useState([]);
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(true);
  const [toggled, setToggled] = useState(false);

  useEffect(() => {
    const geoPoint = new firebase.firestore.GeoPoint(
      userInfo.center.lat > 0
        ? userInfo.center.lat % 180
        : userInfo.center.lat % -180,
      userInfo.center.lng > 0
        ? userInfo.center.lng % 180
        : userInfo.center.lng % -180
    );
    dispatch(messageGetter(geoPoint, userInfo));
  }, [update, userInfo, dispatch]);

  useEffect(() => {
    if (messages) {
      messages.sort((a, b) =>
        a.timeOfPost.seconds > b.timeOfPost.seconds ? 1 : -1
      );
      setSortedMessages(messages);
    }
  }, [messages]);

  const forceRender = () => {
    setUpdate(!update);
  };

  return (
      <>
      <ToggleButton onClick={() => setToggled(!toggled)}>
          <Menu /><Typography variant="button">{toggled ? 'Show Map' : 'Show Messages'}</Typography>
      </ToggleButton>
    <Board toggled={toggled}>
      <h1>Reach out to your community</h1>
      {/* <p>Whether you are in need of assitance, or can offer a helping hand</p> */}
      <h2>Chat Near You</h2>
      {isFetching && (
        <div className="spinner">
          <CircularProgress color="inherit" />
        </div>
      )}
      {sortedMessages.length && (
        <>
          <div className="card-container">
            {sortedMessages.map(message => {
              return (
                <Card
                    setToggled={setToggled}
                  message={message}
                  key={message.postId}
                  forceRender={forceRender}
                />
              );
            })}
          </div>
        </>
      )}
      <AddMessage forceRender={forceRender} />
      {error && (
        <p className="error">There was an error fetching the data: {error}</p>
      )}
    </Board>
    </>
  );
};
