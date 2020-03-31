import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import styled from "styled-components";

const NewPaper = styled.div`
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
      <p
        onClick={() => setClick(!click)}
        id={Math.floor(Math.random() * 100000)}
        style={{ color: "red", fontSize: "2.5rem" }}
      >
        &#8226;
      </p>
      {click && (
        <NewPaper>
          <Avatar variant="circle" src={props.avatarUrl && props.avatarUrl}>
            {props.firstNameInit}
          </Avatar>
          <div>{props.msg}</div>
        </NewPaper>
      )}
    </>
  );
};

export default MapMarker;
