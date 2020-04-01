import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { geolocated } from "react-geolocated";
import { GeoFirestore } from "geofirestore";
import * as firebase from "firebase";
import { getDistance } from "geolib";

import MapMarker from "./MapMarker";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { fireDB } from "../../_utils/firebase";
import Tooltip from "@material-ui/core/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCoords,
  fetchBounds,
  fetchCenter
} from "../../Store/Actions/messageActions";

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
  }, [props.coords]);

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
            ( getDistance(
              {
                latitude: coords.center.lat,
                longitude: coords.center.lng
              },
              {
                latitude: coords.bounds.nw.lat,
                longitude: coords.bounds.nw.lng
              }) / 1000)
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
    <div style={{ height: "100vh", width: "100%", margin: "auto" }}>
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
        defaultZoom={5}
        onChange={({ center, zoom, bounds, marginBounds }) => {
          console.log(
          {
            latitude: center.lat,
            longitude: center.lng
          },
          {
            latitude: bounds.nw.lat,
            longitude: bounds.nw.lng
          });
          console.log(getDistance(
            {
              latitude: center.lat,
              longitude: center.lng
            },
            {
              latitude: bounds.nw.lat,
              longitude: bounds.nw.lng
            }) / 1000);
          dispatch(fetchBounds(bounds));
          dispatch(fetchCenter(center));
          console.log(coords);
        }}
        yesIWantToUseGoogleMapApiInternals
      >
        {msgs.length &&
          msgs.map(elem => {
            console.log(elem.hasOwnProperty("geoLock"));
            return elem.hasOwnProperty("geoLock") ? (
              <LocationOnIcon
                lat={elem.geoLock.latitude}
                lng={elem.geoLock.longitude}
              />
            ) : (
              <LocationOnIcon
                lat={elem.d.geoLock.latitude}
                lng={elem.d.geoLock.longitude}
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
