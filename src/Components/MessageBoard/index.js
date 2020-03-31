import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { messageGetter } from '../../Store/Actions/messageActions';

// Component Imports
import Card from './Card';
import AddMessage from './AddMessage';
import { Board } from './styles';

// Material UI Imports
import CircularProgress from '@material-ui/core/CircularProgress';

const MessageBoard = () => {
    const { messages , isFetching, error } = useSelector(state => state.messageBoard);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(messageGetter());
    }, [])

    return(
        <Board>
            <h1>Reach out to your community</h1>
            {/* <p>Whether you are in need of assitance, or can offer a helping hand</p> */}
            <h2>Chat Near You</h2>
            {isFetching && (
                <div className='spinner'> 
                    <CircularProgress color="inherit" />
                </div>
            )}
            {messages.length > 1 && (
                <>
                    {messages.map(message => {
                        return <Card message={message} key={message.postId}/>
                    })}
                    <AddMessage/>
                </>
            )}
            {error && (
                <p className='error'>There was an error fetching the data: {error}</p>
            )}
        </Board>
    );
}

export default MessageBoard;
