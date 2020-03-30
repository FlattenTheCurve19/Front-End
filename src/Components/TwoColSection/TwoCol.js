import React from 'react';
import styled from 'styled-components';

export default function TwoCol({flexDirection, background, ...props}){
    console.log(props.children);
    return (
        <Wrapper flexDirection={flexDirection} background={background}>
            {props.children}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: ${(props) => props.flexDirection};
    justify-content: center;
    flex-wrap: nowrap;
    background: ${props => props.background};
`;