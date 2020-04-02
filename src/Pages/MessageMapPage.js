import React from "react";
import styled from "styled-components";

// Component Imports
<<<<<<< HEAD
import MessageBoard from "../Components/MessageBoard";
import Proximity from "../Components/ProximityMap/Proximity";
=======
import MessageBoard from '../Components/MessageBoard';
import MessageMap from '../Components/ProximityMap/Proximity';
>>>>>>> master

const Page = styled.section`
  height: calc(100vh - 64px);
  display: flex;
`;

export default () => {
<<<<<<< HEAD
  return (
    <Page>
      <MessageBoard />
      <Proximity />
    </Page>
  );
};
=======
    return(
        <Page>
            <MessageBoard/>
            <MessageMap/>
        </Page>
    );
}
>>>>>>> master
