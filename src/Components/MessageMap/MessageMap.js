import React, {useState, useEffect} from 'react';
import {Room} from '@material-ui/icons';
import {IconButton} from '@material-ui/core';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';
import {fireDB} from '../../_utils/firebase';

const AnyReactComponent = ({ text }) => <IconButton><Marker /></IconButton>;
const collection = fireDB.collection("users").doc("z6F3tq6LFV9BLEWuzxE8");

const MessageMap = () => {
    const [messages, setMessages] = useState();

    useEffect(() => {
        // const item = collection.onSnapshot(item => {
        //     console.log('ITEM', item);
        // })
        const item = collection
        .get()
        .then(res => {
            console.log(res.data());
            setMessages(res.data());
        })
    }, [])

    

    return (
        <div style={{width: '100%', height: '100vh'}}>
        <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyDNGcTEWBAE3kyDFxXAtw4J0vdeLuicLNk'}}
            defaultCenter={{
                lat: 59.95,
                lng: 30.33
            }}
            defaultZoom={11}
        >
            <AnyReactComponent
                lat={messages ? messages.geoLock.latitude : null}
                lng={messages ? messages.geoLock.longitude : null}
            />
        </GoogleMapReact>
        </div>
    )
}

const Marker = styled(Room)`
    color: red;
    width: 50px;
    height: 50px;
`;

export default MessageMap;