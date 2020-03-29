import React from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { PlayArrow, Pause } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

const Video = props => {
  return (
    <VideoWrapper>
      <VideoPlayer
        light
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
`;

const VideoPlayer = styled(ReactPlayer)`
  position: absolute;
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


export default Video;
