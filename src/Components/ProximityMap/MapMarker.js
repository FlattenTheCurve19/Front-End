import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import styled from "styled-components";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { setMsgId } from "../../Store/Actions/messageActions";
import { useSelector, useDispatch } from "react-redux";

export const NewPaper = styled.div`
   {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: auto;
    box-shadow: 5px 5px 5px 5px grey;
    width: 300px;
    background-color: white;
    color: red;
    font-size: 1.2rem;
    text-align: center;
    border-radius: 10px;
    z-index: 1;
  }
`;

const MapMarker = props => {
  const selectedMsg = useSelector(state => state.messageBoard.setMsgs);
  const dispatch = useDispatch();

  const timeToDate = time => {
    return new Date(time * 1000).toString();
  };
  const [click, setClick] = useState(false);

  return (
    <>
      <LocationOnIcon
        className="location-icon"
        onClick={() => {
          setClick(!click);
        }}
        onMouseLeave={() => {
          dispatch(setMsgId());
          click && setClick(!click);
        }}
        id={Math.floor(Math.random() * 100000)}
        lat={props.lat}
        lng={props.lng}
      />
      {click && (
        <div className="new_paper">
          <NewPaper>
            <div
              style={{
                width: "80%",
                margin: "auto",
                padding: "2% 0",
                borderBottom: "1px solid black",
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <div
                style={{
                  fontSize: "1rem",
                  color: "black",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <p>
                  {timeToDate(props.time)
                    .split(" ")
                    .slice(0, 3)
                    .join(" ")}
                </p>
              </div>
              <div className="map-avatar">
                <Avatar variant="circle" src={props.avatarUrl}>
                  {props.firstNameInit}
                </Avatar>
              </div>
            </div>
            <div className="map-text"> {'"' + props.msg + '"'}</div>
          </NewPaper>
        </div>
      )}
      {selectedMsg.length > 0 &&
        selectedMsg.map(elem => {
          return (
            <div
              className="new_paper"
              onClick={() => {
                dispatch(setMsgId());
              }}
            >
              <NewPaper>
                <div
                  style={{
                    width: "80%",
                    margin: "auto",
                    padding: "2% 0",
                    borderBottom: "1px solid black",
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                >
                  <div
                    style={{
                      fontSize: "1rem",
                      color: "black",
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <p>
                      {timeToDate(elem.timeOfPost)
                        .split(" ")
                        .slice(0, 3)
                        .join(" ")}
                    </p>
                  </div>
                  <div className="map-avatar">
                    <Avatar variant="circle" src={elem.avatar}>
                      {elem.displayName.charAt(0)}
                    </Avatar>
                  </div>
                </div>
                <div className="map-text"> {'"' + props.msg + '"'}</div>
              </NewPaper>
            </div>
          );
        })}
    </>
  );
};

export default MapMarker;
