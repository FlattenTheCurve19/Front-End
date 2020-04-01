import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { geolocated } from "react-geolocated";
import { GeoFirestore } from "geofirestore";
import * as firebase from "firebase";
import { getDistance } from "geolib";

<<<<<<< HEAD
import MapMarker from "./MapMarker";

=======
import LocationOnIcon from "@material-ui/icons/LocationOn";
>>>>>>> 09a8c675ca97fca4ed4921ce4e688dc759895ab1
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
  const [click, setClick] = useState(false);

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
        defaultZoom={5}
        onChange={({ center, zoom, bounds, marginBounds }) => {
          dispatch(fetchBounds(bounds));
          dispatch(fetchCenter(center));
        }}
        yesIWantToUseGoogleMapApiInternals
        options={{ draggableCursor: "default" }}
      >
        {msgs.length &&
          msgs.map(elem => {
            return elem.hasOwnProperty("geoLock") ? (
              <MapMarker
                className="location-icon"
                lat={elem.geoLock.latitude}
                lng={elem.geoLock.longitude}
                msg={elem.postField}
                firstNameInit={elem.displayName && elem.displayName.charAt(0)}
              />
            ) : (
              <MapMarker
                className="location-icon"
                lat={elem.d.geoLock.latitude}
                lng={elem.d.geoLock.longitude}
                msg={elem.d.postField}
                avatarUrl={elem.d.avatar}
                firstNameInit={elem.d.displayName.charAt(0)}

                // firstNameInit={
                //   elem.d.displayName && elem.d.displayName.charCodeAt(0)
                // }
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
