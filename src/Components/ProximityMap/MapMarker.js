import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import styled from "styled-components";
import LocationOnIcon from "@material-ui/icons/LocationOn";

export const NewPaper = styled.div`
   {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    border: 1px solid white;
    height: 100px;
    width: 100px;
    background-color: white;
    color: red;
    font-size: 1.2rem;
    text-align: center;
  }
`;

const MapMarker = props => {
  const [click, setClick] = useState(false);
  return (
    <>
      <LocationOnIcon
        className="location-icon"
        onClick={() => setClick(!click)}
        id={Math.floor(Math.random() * 100000)}
        // style={{ color: "red", fontSize: "2.5rem" }}
        lat={props.lat}
        lng={props.lng}
      />
      {click && (
        <NewPaper>
          <Avatar variant="circle" src={props.avatarUrl}>
            {props.firstNameInit}
          </Avatar>
          <div>{props.msg}</div>
        </NewPaper>
      )}
    </>
  );
};

export default MapMarker;
