import React from 'react';
import { Card } from './styles';
import { useDispatch } from 'react-redux';
import { fetchCenter } from '../../Store/Actions/messageActions';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

// Do a fetch to db to grab user avatar
export default ({ message }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const gotToMessage = () => {
        const center = {
            lat: message.geoLock.latitude,
            lng: message.geoLock.longitude
        }
        dispatch(fetchCenter(center))
    }

    return(
        <Card onClick={gotToMessage}>
            {message.avatar && <img alt={message.displayName} src={message.avatar}/>}
            {!message.avatar && <Avatar className={classes.orange}>{message.displayName ? message.displayName.charAt(0) : null}</Avatar>}
            <div className='content-container'>
                <h4>{message.displayName}</h4>
                <p>{message.postField}</p>
            </div>
        </Card>
    )
}