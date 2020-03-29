import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
// Reducer Imports
import userAuthReducer from './Store/Reducers/userAuthReducer'

// Combined Reducers //
const rootReducer = combineReducers({
  auth: userAuthReducer
})


// Redux Store Init //
const store = createStore(rootReducer)

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
