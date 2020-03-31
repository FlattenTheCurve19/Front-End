import React from 'react';
import { Card } from './styles';

// Do a fetch to db to grab user avatar
export default ({ message }) => {
    return(
        <Card>
            <img src='https://images.unsplash.com/photo-1474978528675-4a50a4508dc3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80'/>
            <div className='content-container'>
                <h4>{message.displayName}</h4>
                <p>{message.postField}</p>
            </div>
        </Card>
    )
}