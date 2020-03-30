import * as actionType from '../actionHelper'

export const actionName = (payload) => ({
  type: actionType.AUTHORIZE_USER_LOGIN,
  payload
})
