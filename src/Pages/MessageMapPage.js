import React, { useState } from "react";
import styled from "styled-components";

// Component Imports
import MessageBoard from "../Components/MessageBoard";
import Proximity from "../Components/ProximityMap/Proximity";

const Page = styled.section`
  height: calc(100vh - 64px);
  display: flex;
<<<<<<< HEAD
<<<<<<< HEAD
import MessageBoard from '../Components/MessageBoard';
import MessageMap from '../Components/ProximityMap/Proximity';
import theme from '../Styles/theme';
=======
=======
>>>>>>> 9487742cc70926cbf817a756bc9af9c5fa520437
  overflow: hidden;

  @media all and (max-width: 500px) {
    flex-direction: column-reverse;
  }

  
<<<<<<< HEAD
>>>>>>> master
=======
>>>>>>> 9487742cc70926cbf817a756bc9af9c5fa520437
`;

export default () => {
  return (
    <Page>
      <MessageBoard />
      <Proximity />
    </Page>
  );
};
