import React, {useState, useEffect} from 'react';
import {Room} from '@material-ui/icons';
import {IconButton} from '@material-ui/core';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';
import {fireDB} from '../../_utils/firebase';

const AnyReactComponent = ({ text }) => <IconButton><Marker /></IconButton>;

const MessageMap = () => {
    const [messages, setMessages] = useState();

    useEffect(() => {
        // const item = collection.onSnapshot(item => {
        //     console.log('ITEM', item);
        // })
        const posts = fireDB.collection("post").get().then(res => {
            const data = [];
            res.forEach(item => {
                console.log('*&*&*',item.data())
                data.push(item.data());
            })
            console.log(data);
            setMessages(data);
          });
          
        
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
            {messages && messages.map(message => {
                return (
                    <AnyReactComponent
                        lat={message.geoLock.latitude}
                        lng={message.geoLock.longitude}
                    />
                )
            })}
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