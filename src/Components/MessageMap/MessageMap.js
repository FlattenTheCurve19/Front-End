import React, { useState, useEffect } from "react";
import { Room } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import styled from "styled-components";
import GoogleMapReact from "google-map-react";
import { geolocated } from "react-geolocated";
import firebase from "../../_utils/firebase";
import {GeoFire} from 'geofire';

import distance from "../../_utils/distance";

const AnyReactComponent = ({ text }) => (
  <IconButton>
    <Marker />
  </IconButton>
);

const MessageMap = props => {
  const [messages, setMessages] = useState();
  const [currentLocation, setCurrentLocation] = useState();
  const firebaseRef = firebase.database().ref();
  const geoFire = new GeoFire(firebaseRef);

  useEffect(() => {
    // const item = collection.onSnapshot(item => {
    //     console.log('ITEM', item);
    // })
    if (currentLocation) {
        geoFire.get("geoLock").then(function(location) {
            if (location === null) {
              console.log("Provided key is not in GeoFire");
            }
            else {
              console.log("Provided key has a location of " + location);
            }
          }, function(error) {
            console.log("Error: " + error);
          });
    }
  }, [currentLocation]);

  useEffect(() => {
    if (props.coords) {
      setCurrentLocation(props.coords);
    }
  }, [props.coords]);

  const _onBoundsChange = (center, zoom, bounds, marginBounds) => {
      setCurrentLocation({
          latitude: center.lat,
          longitude: center.lng
      })
  }

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDNGcTEWBAE3kyDFxXAtw4J0vdeLuicLNk" }}
        center={{
          lat: currentLocation && currentLocation.latitude,
          lng: currentLocation && currentLocation.longitude
        }}
        defaultZoom={11}
        onBoundsChange={_onBoundsChange}
      >
        {messages &&
          messages.map(message => {
            return (
              <AnyReactComponent
                lat={message.geoLock.latitude}
                lng={message.geoLock.longitude}
              />
            );
          })}
      </GoogleMapReact>
    </div>
  );
};

const Marker = styled(Room)`
  color: red;
  width: 50px;
  height: 50px;
`;

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true
  },
  userDecisionTimeout: 5000
})(MessageMap);
