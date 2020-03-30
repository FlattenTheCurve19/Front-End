import React, { useEffect } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux'; 
import { messageGetter } from '../../Store/Actions/messageActions';

// Component imports
import Card from './Card';
import AddMessage from './AddMessage';

const MessageBoard = () => {
    // Will need userId to fetch avatar
    const { messagesBoard , isFetching, error } = useSelector(state => state.messageBoard)
    const dispatch = useDispatch();
    console.log(isFetching , error, messagesBoard)

    useEffect(() => {
        dispatch(messageGetter())
    }, [])

    
    return(
        <section>
            <h1>Reach out to your community</h1>
    <p>Whether you are in need of assitance, or can offer a helping hand</p>
            
            { messagesBoard ? messagesBoard.map(message => {
                return <Card message={message} key={message.timeOfPost.seconds}/>
            }) : null
        }{/*you have access to this key value pairs inside this map 
        displayName: "Kevin Mocha"
        geoLock: t {V: 34.0250981, U: -118.4290418}
        postField: "This store is really stocked!"
        timeOfPost: t {seconds: 1585555500, nanoseconds: 0}
        */}
            <AddMessage/>
        </section>
    );
}

export default MessageBoard;

// / const dummyData = [
    //     {
    //         userId: null,
    //         firstName: 'Josiah',
    //         lastName: 'Roa',
    //         location: {
    //             lat: 0,
    //             long: 0,
    //         },
    //         message: 'I need help with groceries',
    //         timeStamp: moment().format("HH:mm")
    //     },
    //     {
    //         userId: null,
    //         firstName: 'Kamryn',
    //         lastName: '',
    //         location: {
    //             lat: 0,
    //             long: 0,
    //         },
    //         message: 'King Soopers just re-stocked on groceries!',
    //         timeStamp: moment().format("HH:mm")
    //     }
    // ]