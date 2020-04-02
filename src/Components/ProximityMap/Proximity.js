import React, { useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { geolocated } from "react-geolocated";

import LocationOnIcon from "@material-ui/icons/LocationOn";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCoords,
  fetchBounds,
  fetchCenter
} from "../../Store/Actions/messageActions";

const Proximity = props => {

  const coords = useSelector(state => state.messageBoard.userInfo);
  const msgs = useSelector(state => state.messageBoard.messages)
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(props.coords);
    props.coords &&
      props.coords.latitude &&
      dispatch(fetchCoords(props.coords));
  }, [props.coords, dispatch]);

  const Marker = props => (
    <div
      lat={props.lat}
      lng={props.lng}
    >
      <LocationOnIcon />
    </div>
  )

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
          if(center.lng > 180){
            dispatch(fetchCenter({
              lat: center.lat,
              lng: 180
            }))
          } else if(center.lng < -180){
            dispatch(fetchCenter({
              lat: center.lat,
              lng: -180
            }))
          } else{
            dispatch(fetchCenter(center));
          }
          dispatch(fetchBounds(bounds));
          
        }}
        yesIWantToUseGoogleMapApiInternals
      >
        {msgs.length &&
          msgs.map(elem => {
            return (
              <Marker
                key={elem.postId}
                lat={elem.geoLock.latitude}
                lng={elem.geoLock.longitude}
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
