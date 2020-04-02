import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { geolocated } from "react-geolocated";
import { GeoFirestore } from "geofirestore";
import * as firebase from "firebase";
import { getDistance } from "geolib";

import MapMarker from "./MapMarker";

import { fireDB } from "../../_utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCoords,
  fetchBounds,
  fetchCenter
} from "../../Store/Actions/messageActions";
import { ComposableMap } from "react-simple-maps";

const Proximity = props => {
  const geofirestore = new GeoFirestore(fireDB);
  const geoCollection = geofirestore.collection("post");

  const coords = useSelector(state => state.messageBoard.userInfo);
  const dispatch = useDispatch();
  const [msgs, setMsgs] = useState([]);

  useEffect(() => {
    props.coords &&
      props.coords.latitude &&
      dispatch(fetchCoords(props.coords));
  }, [props.coords, dispatch]);

  useEffect(() => {
    console.log(coords);
    if (coords.center.lat) {
      geoCollection
        .near({
          center: new firebase.firestore.GeoPoint(
            coords.center.lat,
            coords.center.lng
          ),
          radius:
            getDistance(
              {
                latitude: coords.center.lat,
                longitude: coords.center.lng
              },
              {
                latitude: coords.bounds.nw.lat,
                longitude: coords.bounds.nw.lng
              }
            ) / 1000
        })
        .get()
        .then(res => {
          const arr = [];
          res.forEach(item => arr.push(item.data()));
          setMsgs(arr);
          console.log(arr);
        });
    }
  }, [coords]);

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        margin: "auto"
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAe3rBv5NMNdFBGgkeFYUvgquo2qqjMgnc" }}
        defaultCenter={{
          lat: coords && coords.latitude,
          lng: coords && coords.longitude
        }}
        center={{
          lat: coords && coords.center.lat,
          lng: coords && coords.center.lng
        }}
        defaultZoom={4}
        onChange={({ center, zoom, bounds, marginBounds }) => {
          dispatch(fetchBounds(bounds));
          dispatch(fetchCenter(center));
        }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => {
          new maps.Circle({
            strokeColor: "#FF0000",
            strokeOpacity: 0.7,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.3,
            map,
            center: {
              lat: coords.latitude,
              lng: coords.longitude
            },
            radius: 1000
          });
        }}
        options={{ draggableCursor: "default" }}
      >
        {msgs.length &&
          msgs.map(elem => {
            return (
              <MapMarker
                className="location-icon"
                lat={elem.geoLock.latitude}
                lng={elem.geoLock.longitude}
                msg={elem.postField}
                avatarUrl={elem.avatar}
                firstNameInit={elem.displayName && elem.displayName.charAt(0)}
                time={elem.timeOfPost.seconds}
              />
            );
          })}
      </GoogleMapReact>
    </div>
  );
};

export default geolocated({
  positionOptions: { enableHighAccuracy: true },
  userDecisionTimeout: 10000
})(Proximity);
