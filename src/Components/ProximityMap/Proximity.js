import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { geolocated } from "react-geolocated";
import MapMarker from "./MapMarker";
import {
  Paper,
  InputBase,
  IconButton,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import { Search, MyLocation } from "@material-ui/icons";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCoords,
  fetchBounds,
  fetchCenter,
  fetchZoom
} from "../../Store/Actions/messageActions";

const Proximity = props => {
  const coords = useSelector(state => state.messageBoard.userInfo);
  const msgs = useSelector(state => state.messageBoard.messages);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.coords && props.coords.latitude && props.coords.longitude) {
      dispatch(fetchCoords(props.coords));
      setTimeout(() => {
        dispatch(
          fetchCenter({
            lat: props.coords.latitude,
            lng: props.coords.longitude
          })
        );
        dispatch(fetchZoom(11));
      }, 1000);
    }
  }, [props.coords, dispatch]);

  useEffect(() => {
    if (search) {
    }
  }, [search]);

  const searchHandler = e => {
    setSearch(e);
  };

  const handleSelect = e => {
    setSearch(e);
    geocodeByAddress(e)
      .then(results => {
        console.log(results[0]);
        return getLatLng(results[0]);
      })
      .then(latLng => {
        console.log("Success", latLng);
        latLng && dispatch(fetchCenter(latLng));
        latLng && dispatch(fetchZoom(14));
      })
      .catch(error => console.error("Error", error));
  };

  const handleSubmit = e => {
    e.preventDefault();
    geocodeByAddress(search)
      .then(results => {
        console.log(results[0]);
        return getLatLng(results[0]);
      })
      .then(latLng => {
        console.log("Success", latLng);
        latLng && dispatch(fetchCenter(latLng));
        latLng && dispatch(fetchZoom(14));
      })
      .catch(error => console.error("Error", error));
  };

  const goToMyLocation = () => {
    dispatch(
      fetchCenter({
        lat: props.coords.latitude,
        lng: props.coords.longitude
      })
    );
    dispatch(fetchZoom(12));
  };

  return (
    <StyledMap>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAe3rBv5NMNdFBGgkeFYUvgquo2qqjMgnc" }}
        defaultCenter={{
          lat: 36.9645056048637,
          lng: -99.68471236809506
        }}
        center={{
          lat: coords && coords.center.lat,
          lng: coords && coords.center.lng
        }}
        defaultZoom={3}
        zoom={coords && coords.zoom}
        onChange={({ center, zoom, bounds, marginBounds }) => {
          dispatch(fetchZoom(zoom));
          if (center.lng > 180) {
            dispatch(
              fetchCenter({
                lat: center.lat,
                lng: 180
              })
            );
          } else if (center.lng < -180) {
            dispatch(
              fetchCenter({
                lat: center.lat,
                lng: -180
              })
            );
          } else {
            dispatch(fetchCenter(center));
          }
          dispatch(fetchBounds(bounds));
        }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => {
          new maps.Marker({
            icon: {
              strokeColor: "#FFFFFF",
              strokeOpacity: 0.7,
              strokeWeight: 2,
              fillColor: "#4285F4",
              fillOpacity: 1,
              path: maps.SymbolPath.CIRCLE,
              scale: 8,
              anchor: new maps.Point(0, 0)
            },
            map,
            position: {
              lat: coords.latitude,
              lng: coords.longitude
            },
            zIndex: -1
          });
          new maps.Marker({
            icon: {
              strokeColor: "transparent",
              strokeOpacity: 0.7,
              strokeWeight: 0,
              fillColor: "#4285F4",
              fillOpacity: 0.2,
              path: maps.SymbolPath.CIRCLE,
              scale: 20,
              anchor: new maps.Point(0, 0)
            },
            map,
            position: {
              lat: coords.latitude,
              lng: coords.longitude
            },
            zIndex: -1
          });
        }}
        options={{ draggableCursor: "default" }}
      >
        {msgs.length &&
          msgs.map(elem => {
            return (
              <MapMarker
                key={Math.floor(Math.random() * 1000000)}
                className="location-icon"
                lat={elem.geoLock.latitude}
                lng={elem.geoLock.longitude}
                msg={elem.postField}
                avatarUrl={elem.avatar}
                firstNameInit={elem.displayName && elem.displayName.charAt(0)}
                time={elem.timeOfPost.seconds}
                id={elem.postId}
              />
            );
          })}
      </GoogleMapReact>
      <SearchBarWrapper>
        <Paper component="form" onSubmit={handleSubmit}>
          <PlacesAutocomplete
            value={search}
            onChange={searchHandler}
            onSelect={handleSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
            }) => (
              <div>
                <InputWrapper
                  {...getInputProps({
                    placeholder: "Search Places ...",
                    className: "location-search-input"
                  })}
                />
                <IconButton type="submit" aria-label="search">
                  <Search />
                </IconButton>
                <div className="autocomplete-dropdown-container">
                  {suggestions.length > 0 && (
                    <List>
                      {suggestions.map(suggestion => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: "#fafafa", cursor: "pointer" }
                          : { backgroundColor: "#ffffff", cursor: "pointer" };
                        return (
                          <ListItem
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style
                            })}
                          >
                            <ListItemText primary={suggestion.description} />
                          </ListItem>
                        );
                      })}
                    </List>
                  )}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </Paper>
      </SearchBarWrapper>
      {props.isGeolocationEnabled && <MyLocationWrapper>
        <Paper>
          <IconButton onClick={goToMyLocation}>
            <MyLocation />
          </IconButton>
        </Paper>
      </MyLocationWrapper>}
    </StyledMap>
  );
};

const StyledMap = styled.div`
  height:100%;
  width: 100%;
  margin: auto;
`;

const SearchBarWrapper = styled.div`
  position: absolute;
  top: 74px;
  left: 410px;

  @media all and (max-width: 500px) {
    top: 64px;
    left: 10px;
    z-index: 1;
    width: calc(100% - 71px);
  }
`;

const InputWrapper = styled(InputBase)`
  width: calc(100% - 48px);
`;

const MyLocationWrapper = styled.div`
  position: fixed;
  right: 11px;
  bottom: 121px;
  width: 38px;
  height: 38px;

  button {
    padding: 7px;
  }
`;

export default geolocated({
  positionOptions: { enableHighAccuracy: true },
  userDecisionTimeout: 10000
})(Proximity);
