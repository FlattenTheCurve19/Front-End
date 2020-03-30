import React, {useState} from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { PlayArrow, Pause } from "@material-ui/icons";
import { IconButton, Typography, Button } from "@material-ui/core";
import bannerImg from '../../images/covid-19-drugs.jpeg';

const Video = props => {
    const [light, setLight] = useState(true);
  return (
    <VideoWrapper>
      <VideoPlayer
        light={bannerImg}
        width="100%"
        height="100%"
        playIcon={
          <PlayIconButton>
            <Play />
          </PlayIconButton>
        }
        url="https://www.youtube.com/watch?v=dxxFqZNb-3I"
        playing
      />
    </VideoWrapper>
  );
};

const VideoWrapper = styled.div`
  position: relative;
  padding-top: 56.25%;
  max-width: 1800px;
  margin-bottom: 75px;
  margin-left: auto;
  margin-right: auto;
`;

const VideoPlayer = styled(ReactPlayer)`
  position: absolute;
  height: auto;
  top: 0;
  left: 0;
`;

const Play = styled(PlayArrow)`
  width: 3em;
  height: 3em;
  color: white;
`;

const PlayIconButton = styled(IconButton)`
  background-color: #5fd4d8;

  &:hover {
    background-color: #39b2b5;
  }
`;

const PlayButtonWrapper = styled.div`
  margin: 105px 0;
`;

const VideoOverlay = styled.div`
  position: absolute;
  text-align: center;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const JoinVideoButton = styled(Button)`
  border: 1px solid #5fd4d8;
  border-radius: 3px;
  background: #5fd4d8;
  padding: 8px 20px;
  color: white;
  font-size: 14px;
`;

export default Video;
