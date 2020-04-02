import React from "react";
import { Link } from "react-router-dom";
import "../../Styles/index.scss";

const Video = props => {

  return (
    <div className="video-background" id="wrapper">
      <video loop autoPlay muted="muted">
        <source src="covidMovie.mp4" type="video/mp4" />
      </video>
      <div className="videoTitle">
        <h1>Do your Part, Help Flatten The Curve</h1>
        <button component={Link} to="/register"> JOIN NOW </button>
      </div>
    </div>
  );
};

export default Video;
