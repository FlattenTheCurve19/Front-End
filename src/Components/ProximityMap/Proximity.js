import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { geolocated } from "react-geolocated";
import { GeoFirestore } from "geofirestore";
import * as firebase from "firebase";
import { getDistance } from "geolib";

import LocationOnIcon from "@material-ui/icons/LocationOn";
import { fireDB } from "../../_utils/firebase";
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
  }, [props.coords, dispatch]);

  useEffect(() => {
    console.log(coords.center.lng % 180, 180 % coords.center.lng );
    if (coords.center.lat) {
      let centerLat;
      let centerLng;

      if(coords.center.lat >= 0 && coords.center.lat <= 180){
        centerLat = coords.center.lat;
      }

      if(coords.center.lng >= 0 && coords.center.lng <= 180){
        centerLng = coords.center.lng;
      }
      geoCollection
        .near({
          center: new firebase.firestore.GeoPoint(
            coords.center.lat > 0 ? coords.center.lat % 180 : coords.center.lat % -180,
            coords.center.lng > 0 ? coords.center.lng % 180 : coords.center.lng % -180
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
        });
    }
  }, [coords]);

  return (
    <div style={{ height: "100%", width: "100%", margin: "auto" }}>
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
          dispatch(fetchBounds(bounds));
          dispatch(fetchCenter(center));
        }}
        yesIWantToUseGoogleMapApiInternals
      >
        {msgs.length &&
          msgs.map(elem => {
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
