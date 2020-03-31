import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import distance from "../../_utils/distance";
import { geolocated } from "react-geolocated";

import MapMarker from "./MapMarker";
import { fireDB } from "../../_utils/firebase";

const Proximity = props => {
  const arr = [];

  const [msgs, setMsgs] = useState([]);
  const [currentLocation, setCurrentLocation] = useState();

  useEffect(() => {
    fireDB
      .collection("post")
      .get()
      .then(res => {
        res.forEach(item => arr.push(item.data()));
        setMsgs(arr);
      });
  }, []);

  useEffect(() => {
    if (props.coords && props.coords.latitude) {
      setCurrentLocation(props.coords);
    }
  }, [props.coords]);

  useEffect(() => {
    console.log(msgs.filter(msg => {
      if(distance(currentLocation, msg.geoLock) < 321869){
        return msg;
      }
    }))
  }, [currentLocation])

  const _onBoundsChange = (center, zoom, bounds, marginBounds) => {
    setCurrentLocation({
        latitude: center.lat,
        longitude: center.lng
    })
}

  return (
    <div style={{ height: "100vh", width: "100%", margin: "auto" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAe3rBv5NMNdFBGgkeFYUvgquo2qqjMgnc" }}
        onBoundsChange={_onBoundsChange}
        center={{
          lat: currentLocation && currentLocation.latitude,
          lng: currentLocation && currentLocation.longitude
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
        {[...msgs.map(elem => {
          console.log(distance(elem.geoLock, currentLocation))
          if (distance(elem.geoLock, currentLocation) < 321869) {
            return (
              <MapMarker
                avatarUrl={elem.avatarUrl}
                firstNameInit={elem.displayName.split("").slice(0, 1)}
                msg={elem.displayName}
                testData
                key={Math.floor(Math.random() * 10000000)}
                lng={elem.geoLock.longitude}
                lat={elem.geoLock.latitude}
              />
            );
          }
        })]}
      </GoogleMapReact>
    </div>
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(Proximity);
