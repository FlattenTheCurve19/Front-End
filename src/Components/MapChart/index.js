import React, { useState } from "react";
import MapChart from "./MapChart";
import ReactTooltip from 'react-sticky-mouse-tooltip';
import styled from 'styled-components';

const Index = props => {
  const [content, setContent] = useState({
    state: null,
    confirmed: null,
    deaths: null,
    recovered: null,
    isVisible: false
  });

  return (
    <>
      <MapChart {...props} setTooltipContent={setContent} />
      <ReactTooltip offsetY={20} offsetX={20} visible={content.isVisible}>
        <Tooltip>
          <h3>{content.state}</h3>
          <p>Confirmed: {content.confirmed}</p>
          <p>Deaths: {content.deaths}</p>
          <p>Recovered: {content.recovered}</p>
        </Tooltip>
      </ReactTooltip>
    </>
  );
};

const Tooltip = styled.div`
  background: #000;
  color: #fff;
  padding: 10px 20px;
  border-radius: 3px;
  opacity: 0.6;
`;

export default Index;
