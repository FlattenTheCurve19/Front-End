import React, { useEffect } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux'; 
import { messageGetter } from '../../Store/Actions/messageActions';

// Component imports
import Card from './Card';
import AddMessage from './AddMessage';

const MessageBoard = () => {
    // Will need userId to fetch avatar
    const messages = useSelector(state => state.messages);
    const error = useSelector(state => state.error);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(messageGetter())
    }, [])

    const dummyData = [
        {
            userId: null,
            firstName: 'Josiah',
            lastName: 'Roa',
            location: {
                lat: 0,
                long: 0,
            },
            message: 'I need help with groceries',
            timeStamp: moment().format("HH:mm")
        },
        {
            userId: null,
            firstName: 'Kamryn',
            lastName: '',
            location: {
                lat: 0,
                long: 0,
            },
            message: 'King Soopers just re-stocked on groceries!',
            timeStamp: moment().format("HH:mm")
        }
    ]

    return(
        <section>
            <h1>Reach out to your community</h1>
            <p>Whether you are in need of assitance, or can offer a helping hand.</p>
            {dummyData.map(message => {
                return <Card message={message}/>
            })}
            <AddMessage/>
        </section>
    );
}

export default MessageBoard;