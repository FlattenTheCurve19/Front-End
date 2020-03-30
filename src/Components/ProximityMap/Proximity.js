import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import MapMarker from "./MapMarker";

const Proximity = () => {
  const testData = [
    // test data, msgs will be in an array?

    { lat: 39.099529, lng: -76.848373, msg: "test" },
    { lat: 30.217522, lng: -76.868729, msg: "123" },
    { lat: 39.158829, lng: -75.521141, msg: "again" }
  ];
  return (
    <div style={{ height: "50vh", width: "60%", margin: "auto" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAe3rBv5NMNdFBGgkeFYUvgquo2qqjMgnc" }}
        defaultCenter={{
          lat: 39.099529,
          lng: -76.848373
        }}
        defaultZoom={10}
        yesIWantToUseGoogleMapApiInternals
      >
        {testData.map(elem => {
          return (
            <MapMarker
              msg={elem.msg}
              key={Math.floor(Math.random() * 10000000)}
              lat={elem.lat}
              lng={elem.lng}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
};

export default Proximity;
