import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./Store/Reducers";

const enhancers = compose(applyMiddleware(thunk));

// Redux Store Init //
const store = createStore(rootReducer, enhancers);

ReactDOM.render(
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>,
  document.getElementById("root")
);
