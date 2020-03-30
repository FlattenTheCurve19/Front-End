export const SET_CENTER_LOCATION = "SET_CENTER_LOCATION";

export const setCenterLocation = (location) => dispatch => {
    dispatch({
        type: SET_CENTER_LOCATION,
        payload: location
    });
}

