import React from "react";
import { Typography } from "@material-ui/core";
import TwoColSection from "./TwoCol";
import img1 from "../../images/wash-hands.jpg";
import img2 from "../../images/Touching-face.jpg";
import styled from "styled-components";

const Index = props => (
  <>
    <Typography variant="h3" style={{textAlign: 'center'}}>Learn Ways to help Flatten the Curve</Typography>
    <Wrapper>
      <TwoColSection flexDirection="row-reverse">
        <Col>
          <Typography variant="h4">Wash Your Hands Often</Typography>
          <Typography variant="body1" style={{ fontSize: "1.7rem" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Typography>
        </Col>
        <Col>
          <Img src={img1} />
        </Col>
      </TwoColSection>
    </Wrapper>
    <Wrapper>
      <TwoColSection flexDirection="row" background="#efefef">
        <Col>
          <Typography variant="h4">Wash Your Hands Often</Typography>
          <Typography variant="body1" style={{ fontSize: "1.7rem" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Typography>
        </Col>
        <Col>
          <Img src={img2} />
        </Col>
      </TwoColSection>
    </Wrapper>    
  </>
);

const Wrapper = styled.div`
`;

const Col = styled.div`
  width: 50%;
  padding: 0 45px;
`;

const Img = styled.img`
  width: 100%;
`;

export default Index;
