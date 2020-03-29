import * as actionTypes from '../actionHelper'

const initialState = {

}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case actionTypes.AUTHORIZE_USER_LOGIN:
    return {
      ...state,
      ...payload
    }

  default:
    return state
  }
}
