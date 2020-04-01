import {
  FETCHING_MESSAGES_START,
  FETCHING_MESSAGES_SUCCESS,
  FETCHING_MESSAGES_ERROR,
  FETCHING_USER_COORDS,
  FETCHING_USER_BOUNDS,
  FETCH_CENTER
} from "../Actions/messageActions";

const initalState = {
  messages: [],
  error: "",
  isFetching: "",
  userInfo: {
    latitude: 39.164144105,
    longitude: -98.876935313,
    bounds: {},
    center: {}
  }
};

export const messageBoard = (state = initalState, { type, payload }) => {
  switch (type) {
    case FETCHING_MESSAGES_START:
      return {
        ...state,
        isFetching: true
      };
    case FETCHING_MESSAGES_SUCCESS:
      return {
        ...state,
        error: "",
        messages: payload,
        isFetching: false
      };
    case FETCHING_MESSAGES_ERROR:
      return {
        ...state,
        isFetching: false,
        error: "sorry there are no messages near your current location",
        messages: []
      };

    case FETCHING_USER_COORDS:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          latitude: payload.latitude,
          longitude: payload.longitude
        }
      };
    case FETCHING_USER_BOUNDS:
      return {
        ...state,
        userInfo: { ...state.userInfo, bounds: payload }
      };
    case FETCH_CENTER:
      return {
        ...state,
        userInfo: { ...state.userInfo, center: payload }
      };
    default:
      return state;
  }
};
