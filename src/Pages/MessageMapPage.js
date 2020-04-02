import React, {useState} from "react";
import styled from "styled-components";

// Component Imports
import MessageBoard from "../Components/MessageBoard";
import Proximity from "../Components/ProximityMap/Proximity";

const Page = styled.section`
  height: calc(100vh - 64px);
  display: flex;
<<<<<<< HEAD
import MessageBoard from '../Components/MessageBoard';
import MessageMap from '../Components/ProximityMap/Proximity';
import theme from '../Styles/theme';
=======
  overflow: hidden;

  @media all and (max-width: 500px) {
    flex-direction: column-reverse;
  }

  
>>>>>>> master
`;

export default () => {
  return (
    <Page >
      <MessageBoard />
      <Proximity />
    </Page>
  );
};
