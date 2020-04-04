import React, { useEffect } from "react";
import { Avatar } from "@material-ui/core";
import styled from "styled-components";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { setMsgId } from "../../Store/Actions/messageActions";
import { useSelector, useDispatch } from "react-redux";
import { Paper, IconButton} from '@material-ui/core';
import { Close } from '@material-ui/icons';

const NewPaper = styled(Paper)`
   {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: auto;
    width: 300px;
    position: absolute;
    left: -150px;
    top: 10px;
    font-size: 1.2rem;
    text-align: center;
    z-index: 1000;
  }
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 1000;
`;

const Triangle = styled.div`
  width: 20px;
  height: 20px;
  transform: rotate(45deg);
  background: white;
  position: absolute;
  right: 140px;
  top: -10px;
`;



const MapMarker = props => {
  const selectedMsg = useSelector(state => state.messageBoard.toggleMsgId);
  const dispatch = useDispatch();

  const timeToDate = time => {
    return new Date(time * 1000).toString();
  };

  return (
    <>
      <LocationOnIcon 
      className="location-icon"
        lat={props.lat}
        lng={props.lng} />
      {selectedMsg === props.id && (
          <NewPaper>
            <Triangle />
            <div
              style={{
                width: "80%",
                margin: "auto",
                padding: "2% 0",
                borderBottom: "1px solid black",
                display: "flex",
                justifyContent: "space-between",
                zIndex: "100000"
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
            <CloseButton onClick={() => dispatch(setMsgId())}>
              <Close />
            </CloseButton>
          </NewPaper>
      )}
      </>
  );
};

export default MapMarker;
