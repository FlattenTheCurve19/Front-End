import React from 'react';

// Component Imports
import MessageBoard from '../Components/MessageBoard';
import MessageMap from '../Components/ProximityMap/Proximity';

export default () => {
    return(
        <div style={{display: 'flex'}}>
            <MessageBoard/>
            <MessageMap/>
        </div>
    );
}