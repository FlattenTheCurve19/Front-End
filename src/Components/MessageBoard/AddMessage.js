import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import * as firebase from "firebase/app";
import "firebase/auth";
import { messageSetter } from '../../Store/Actions/messageActions';

// Component Imports
import { Form } from './styles';

export default ({ forceRender }) => {
    const { handleSubmit, register, errors } = useForm();
    const [ user, setUser ] = useState(null);
    const history = useHistory();

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                setUser(user);
            }else{
                setUser(null);
            }
        });
    }, [])

    const submitForm = (data) => {
        // Also check to see if a location has been added
        if(user){
            console.log('success', data);
            messageSetter({
                displayName: user.displayName,
                UUID: user.uid,
                postField: data.message,
                geoLock: {
                    longitude: 0,
                    latitude: 0
                }
            })
            forceRender();
        }else{
            history.push('/login');
        }
    };

    return (
        <Form>
            <form onSubmit={handleSubmit(submitForm)}>
                <label>Add Message</label>
                <input
                    name='message'
                    ref={register({
                        required: true,
                        minLength: 3,
                        maxLength: 100
                    })}
                />
                <input type='submit' value='Submit'/>
            </form>
            {errors.message && errors.message.type === 'required' && (
                <p>Please enter a message</p>
            )}
            {errors.message && errors.message.type === 'minLength' && (
                <p>Message must be at least 3 characters long</p>
            )}
            {errors.message && errors.message.type === 'maxLength' && (
                <p>Message cannot exceed 100 characters</p>
            )}
        </Form>
    )
}