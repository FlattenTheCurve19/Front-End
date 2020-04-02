import React from 'react';
import styled from 'styled-components';

// Component Imports
import MessageBoard from '../Components/MessageBoard';
import MessageMap from '../Components/ProximityMap/Proximity';
import theme from '../Styles/theme';

const Page = styled.section`
    height: calc(100vh - 64px);
    display: flex;
    ${theme.breakpoints.tablet}{
        flex-direction: column-reverse;
    }
`;

export default () => {
    return(
        <Page>
            <MessageBoard/>
            <MessageMap/>
        </Page>
    );
}