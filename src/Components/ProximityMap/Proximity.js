import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";

import MapMarker from "./MapMarker";
import { fireDB } from "../../_utils/firebase";

const Proximity = () => {
  const arr = [];

  const [msgs, setMsgs] = useState([]);

  useEffect(() => {
    fireDB
      .collection("post")
      .get()
      .then(res => {
        res.forEach(item => arr.push(item.data()));
        setMsgs(arr);
      });
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%", margin: "auto" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAe3rBv5NMNdFBGgkeFYUvgquo2qqjMgnc" }}
        defaultCenter={{
          lat: 39.099529,
          lng: -76.848373
        }}
        defaultZoom={5}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, googleMaps }) =>
          // new googleMaps.Cicle({
          //   strokeColor: "#FF0000",
          //   strokeOpacity: 0.5,
          //   strokeWeight: 1,
          //   fillColor: "#FF0000",
          //   fillOpacity: 0.3,
          //   map,
          //   center: { lat: 39.099529, lng: -76.848373 },
          //   radius: 1000
          console.log(map, googleMaps)
        }
      >
        {msgs.map(elem => {
          return (
            <MapMarker
              avatarUrl={elem.avatarUrl}
              firstNameInit={elem.displayName.charCodeAt(0)}
              msg={elem.displayName}
              testData
              key={Math.floor(Math.random() * 10000000)}
              lng={elem.geoLock.longitude}
              lat={elem.geoLock.latitude}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
};

export default Proximity;
