import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { fireDB } from "../../_utils/firebase";
import Tooltip from "@material-ui/core/Tooltip";
import { geolocated } from "react-geolocated";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCoords,
  fetchBounds,
  fetchCenter
} from "../../Store/Actions/messageActions";
import { GeoFirestore } from "geofirestore";
import * as firebase from "firebase";

const Proximity = props => {
  const coords = useSelector(state => state.messageBoard.userInfo);
  const dispatch = useDispatch();
  const [msgs, setMsgs] = useState([]);

  const geofirestore = new GeoFirestore(fireDB);
  const geoCollection = geofirestore.collection("post");

  useEffect(() => {
    props.coords &&
      props.coords.latitude &&
      dispatch(fetchCoords(props.coords));
  }, [props.coords]);

  useEffect(() => {
    geoCollection
      .near({
        center: new firebase.firestore.GeoPoint(
          coords.latitude,
          coords.longitude
        ),
        radius: 1000
      })
      .get()
      .then(res => {
        const arr = [];
        res.forEach(item => arr.push(item.data()));
        setMsgs(arr);
        console.log(arr);
      });
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%", margin: "auto" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAe3rBv5NMNdFBGgkeFYUvgquo2qqjMgnc" }}
        defaultCenter={{
          lat: coords && coords.latitude,
          lng: coords && coords.longitude
        }}
        defaultZoom={5}
        onChange={({ center, zoom, bounds, marginBounds }) => {
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
