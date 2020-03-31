import React from "react";
// import ReactPlayer from "react-player";
// import styled from "styled-components";
// import { PlayArrow, Pause } from "@material-ui/icons";
// import { IconButton, Typography, Button } from "@material-ui/core";
// import bannerImg from "../../images/covid-19-drugs.jpeg";
import "../../Styles/index.scss";

const Video = props => {
  return (
    <div class="video-background" id="wrapper">
      <video loop autoPlay controls>
        <source src="covidMovie.mp4" type="video/mp4"/>
      </video>
        <div className="videoTitle">
          <h1>Do your Part, Help Flatten The Curve</h1>
          <button>JOIN NOW</button>
        </div>
    </div>
  );
};

// const Video = props => {
//   return (
//     <VideoWrapper>
//       <VideoPlayer
//       className="fill"
//         // light={bannerImg}
//         width="100vw"
//         height="89vh"
//         loop="true"
//         playing="true"
//         style={{top: "0px!important"}}
//         // playIcon={
//         //   <PlayIconButton>
//         //     <Play />
//         //   </PlayIconButton>
//         // }
//         url ="https://youtu.be/_mlreMhQXBA"
//         playing
//         config={{
//           youtube: {
//             playerVars: {modestbranding: 1}
//           },
//         }}
//         fileConfig={{ attributes: { style: { height: '1000px', width: '1000px', objectFit: "fill"} } }}
//       />
//     </VideoWrapper>
//   );
// };

// const VideoWrapper = styled.div`
  // position: relative;
  // padding-top: 56.25%;
//   margin-bottom: 75px;
//   max-height: 1000px;
//   max-width: 100vw;
//   @media (min-width: 1340px){
//       padding-top: 998.25px;
//   }
// `;

// const VideoPlayer = styled(ReactPlayer)`
//   position: absolute;
//   max-height: 1000px;
//   top: 0!important;
//   left: 0;
// `;

// const Play = styled(PlayArrow)`
//   width: 3em;
//   height: 3em;
//   color: white;

// `;

// const PlayIconButton = styled(IconButton)`
//   background-color: #5fd4d8;

//   &:hover {
//     background-color: #39b2b5;
//   }
// `;

export default Video;
