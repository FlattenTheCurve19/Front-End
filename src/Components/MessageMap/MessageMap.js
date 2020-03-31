import React, { useState, useEffect } from "react";
import { Room } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import styled from "styled-components";
import GoogleMapReact from "google-map-react";
import { geolocated } from "react-geolocated";
import { fireDB } from "../../_utils/firebase";
import distance from "../../_utils/distance";

const AnyReactComponent = ({ text }) => (
  <IconButton>
    <Marker />
  </IconButton>
);

const MessageMap = props => {
  const [messages, setMessages] = useState();
  const [currentLocation, setCurrentLocation] = useState();

  useEffect(() => {
    // const item = collection.onSnapshot(item => {
    //     console.log('ITEM', item);
    // })
    if (currentLocation) {
      const posts = fireDB
        .collection("post")
        .get()
        .then(res => {
          const data = [];
          res.forEach(item => {
            console.log("*&*&*", item.data());
            let message = item.data();
            if (distance(currentLocation, message.geoLock) < 80467.2){ 
                console.log(distance(currentLocation, message.geoLock));
                data.push(item.data());
            }
          });
          console.log(data);
          setMessages(data);
        });
    }
  }, [currentLocation]);

  useEffect(() => {
    if (props.coords) {
      setCurrentLocation(props.coords);
      console.log(currentLocation);
    }
  }, [props.coords]);

  const _onBoundsChange = (center, zoom, bounds, marginBounds) => {
      console.log('CENTER', center);
      console.log('BOUNDS', bounds);
      setCurrentLocation({
          latitude: center.Lat,
          longitude: center.Lng
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
