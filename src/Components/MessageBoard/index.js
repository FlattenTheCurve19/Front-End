import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { messageGetter } from '../../Store/Actions/messageActions';

// Component imports
import Card from './Card';
import AddMessage from './AddMessage';
import { Board } from './styles';

const MessageBoard = () => {
    const { messages , isFetching, error } = useSelector(state => state.messageBoard);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(messageGetter())
    }, [])

    console.log(messages);

    return(
        <Board>
            <h1>Reach out to your community</h1>
            {/* <p>Whether you are in need of assitance, or can offer a helping hand</p> */}
            <h2>Chat Near You</h2>
            {messages && (
                messages.map(message => {
                    return <Card message={message} key={message.postId}/>
                })
            )}
            <AddMessage/>
        </Board>
    );
}

export default MessageBoard;
