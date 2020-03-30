import React from 'react';
import { Card } from './styles';

// Do a fetch to db to grab user avatar
export default ({ message }) => {
    return(
        <Card>
            <img src={message.avatar}/>
            <h4>{message.firstName} {message.lastName && message.lastName}</h4>
            <p>{message.message}</p>
        </Card>
    )
}