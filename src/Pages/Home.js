import React from 'react';
import MapChart from "../Components/MapChart";
import Video from "../Components/Video";

const Home = () => {
  return (
    <>
      <Video />
      <div style={{height: "670px"}}></div>
      <MapChart />
      <MapChart />
      <MapChart />
    </>
  );
};

export default Home;
