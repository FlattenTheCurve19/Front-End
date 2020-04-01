import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import * as firebase from "firebase/app";
import "firebase/auth";
import { messageSetter } from '../../Store/Actions/messageActions';
import { useSelector } from 'react-redux';

// Component Imports
import { Form } from './styles';

// Material UI Imports
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
}));

export default ({ forceRender }) => {
    const { handleSubmit, register, errors, control } = useForm({ message: '' });
    const [ user, setUser ] = useState(null);
    const history = useHistory();
    const { userInfo } = useSelector(state => state.messageBoard);
    const classes = useStyles();

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                setUser(user);
            }else{
                setUser(null);
            }
        });
    }, [])

    useEffect(() => {
        console.log(errors);
    }, [errors])

    const submitForm = (data) => {
        // Also check to see if a location has been added
        console.log(data);
        // const lat = userInfo.latitude;
        // const long = userInfo.longitude;
        // if(!lat || !long){
        //     console.log('Please allow location');
        // }
        // if(user){
        //     messageSetter({
        //         displayName: user.displayName,
        //         UUID: user.uid,
        //         postField: data.message,
        //         geoLock: {
        //             longitude: 0,
        //             latitude: 0
        //         }
        //     })
        //     forceRender();
        // }else{
        //     history.push('/login');
        // }
    };

    return (
        <Form>
            {errors.message && errors.message.type === 'required' && (
                <p>Please enter a message</p>
            )}
            {errors.message && errors.message.type === 'minLength' && (
                <p>Message must be at least 3 characters long</p>
            )}
            {errors.message && errors.message.type === 'maxLength' && (
                <p>Message cannot exceed 100 characters</p>
            )}
            <form onSubmit={handleSubmit(submitForm)}>
                <Controller
                    id="standard-basic" 
                    label="Standard" 
                    as={<TextField/>}
                    name='message'
                    rules={{
                        required: true,
                        minLength: 3,
                        maxLength: 100
                    }}
                    ref={register}
                    control={control}
                />
                <div className='btn-container'>
                    <button type='submit'>Add Message</button>
                </div>
            </form>
        </Form>
    )
}