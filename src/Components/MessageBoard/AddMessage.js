import React from 'react';
import { useForm } from 'react-hook-form';
import{ useDispatch, useSelector } from 'react-redux';

export default () => {
    const { handleSubmit, register, errors } = useForm();

    const submitForm = (data) => {
        console.log('submitting', data);
    };

    return (
        <div>
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
            {/* Errors go here */}
        </div>
    )
}