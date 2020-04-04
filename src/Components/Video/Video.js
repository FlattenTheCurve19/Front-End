import React from "react";
import { useHistory } from "react-router-dom";
import "../../Styles/index.scss";

const Video = props => {
  const history = useHistory();

  return (
    <div className="video-background" id="wrapper">
      <video loop autoPlay muted="muted">
        <source src="covidMovie.mp4" type="video/mp4" />
      </video>
      <div className="videoTitle">
        <h1>Do your Part, Help Flatten The Curve</h1>
        <button onClick={() => history.push("/register")}> Join Now </button>
      </div>
    </div>
  );
};

export default Video;
