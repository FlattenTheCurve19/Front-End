import React from 'react';

// Component Imports
import MessageBoard from '../Components/MessageBoard';
import MessageMap from '../Components/ProximityMap/Proximity';

export default () => {
    return(
        <div style={{display: 'flex', height: 'calc(100vh - 81px)'}}>
            <MessageBoard/>
            <MessageMap/>
        </div>
    );
}