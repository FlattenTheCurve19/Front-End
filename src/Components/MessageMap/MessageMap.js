import React, { useState, useEffect } from "react";
import { Room } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import styled from "styled-components";
import GoogleMapReact from "google-map-react";
import { geolocated } from "react-geolocated";
import { fireDB } from "../../_utils/firebase";
import { GeoFirestore} from "geofirestore";
import { createPost } from "../../_utils/firedbHelper";
import * as firebase from "firebase";

const AnyReactComponent = ({ text }) => (
  <IconButton>
    <Marker />
  </IconButton>
);

const MessageMap = props => {
  const [messages, setMessages] = useState();
  const [currentLocation, setCurrentLocation] = useState();
  const geofirestore = new GeoFirestore(fireDB);
  const geoCollection = geofirestore.collection("post");

  useEffect(() => {
    // const item = collection.onSnapshot(item => {
    //     console.log('ITEM', item);
    // })
    if (currentLocation) {
      geoCollection.near({
        center: new firebase.firestore.GeoPoint(20,20), 
        radius: 1000
      })
      .get()
        .then(res => {
          const data = [];
          res.forEach(item => {
            data.push(item.data());
          });
          setMessages(data);
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
    });
  };

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
                lat={message && message.geoLock && message.geoLock.latitude}
                lng={message && message.geoLock && message.geoLock.longitude}
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
