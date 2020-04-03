<<<<<<< HEAD
import React, { useState } from "react";
=======
import React from "react";
>>>>>>> master
import styled from "styled-components";

// Component Imports
import MessageBoard from "../Components/MessageBoard";
import Proximity from "../Components/ProximityMap/Proximity";
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`)

// We listen to the resize event
window.addEventListener('resize', () => {
  // We execute the same script as before
});

const Page = styled.section`
  height: calc(100vh - 43px);
  display: flex;
  overflow: hidden;

  @media all and (max-width: 500px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`;

export default () => {
  return (
    <Page>
      <MessageBoard />
      <Proximity />
    </Page>
  );
};
