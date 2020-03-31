import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import * as firebase from "firebase/app";
import "firebase/auth";

// Component Imports
import { Form } from './styles';

// User ID, message, display name, user location, post time
// {
//     userId: 0,
//     displayName: '',
//     message: '',
//     location: {
//         lat: 0,
//         long: 0
//     },
//     postTime: ''
// }

export default () => {
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

    useEffect(() => {
        console.log(errors);
    }, [errors]);

    const submitForm = (data) => {
        if(user){
            console.log('success');
            // Dispatch message here
            console.log(user.uid);
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