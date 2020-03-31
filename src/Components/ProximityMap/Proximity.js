import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import distance from "../../_utils/distance";
import { geolocated } from "react-geolocated";
import { GeoFirestore } from 'geofirestore';
import * as firebase from 'firebase';


import MapMarker from "./MapMarker";
import { fireDB } from "../../_utils/firebase";

const Proximity = props => {
  const geofirestore = new GeoFirestore(fireDB);
  const geoCollection = geofirestore.collection('post');
  const arr = [];

  const [msgs, setMsgs] = useState([]);
  const [currentLocation, setCurrentLocation] = useState();

  useEffect(() => {
    if(currentLocation){
      geoCollection.near({
        center: new firebase.firestore.GeoPoint(
          currentLocation.latitude,
          currentLocation.longitude
        ),
        radius: 300000
      })
      .get()
      .then(res => {
        res.forEach(item => {
          arr.push(item.data())
        });
        console.log(arr);
        setMsgs(arr);
      });
    }
  }, []);

  useEffect(() => {
    if (props.coords && props.coords.latitude) {
      setCurrentLocation(props.coords);
    }
  }, [props.coords]);

  useEffect(() => {
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
        {msgs.map(elem => {
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
        })}
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
