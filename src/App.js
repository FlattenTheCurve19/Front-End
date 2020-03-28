import React from 'react';
import { Route } from 'react-router';
import NaviBar from './Components/NavigationBar/NaviBar'

function App() {
  return (
    <div className="App">
      <Route>
        <NaviBar />
      </Route>
    </div>
  );
}

export default App;
