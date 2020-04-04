import React from "react";
import MapChart from "../Components/MapChart";
import Video from "../Components/Video";
import chatImage from "../images/chat-sample.png";

const Home = () => {
  return (
    <>
      <Video />
      <br />
      <br />
      <MapChart />
      <div className="home-content">
        <div data-aos="fade-left" data-aos-offset="200">
          <div className="chat-feature">
            <div className="chat-text">
              <h3 className="reach-out">Reach out</h3>
              <p>
                Discover who's in need of help near you with our geolocation
                chat feature. Search, browse, or send out messages yourself to
                stay connected with your community
              </p>
              <h3>Live Tweets</h3>
              <p>
                Keep your eye on the pulse with our live twitter feed monitoring
                COVID19 tweets world wide in real time
              </p>
            </div>

            <img src={chatImage} alt="chat feature" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
