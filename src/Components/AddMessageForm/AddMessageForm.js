import React from 'react';
import {useForm, F} from 'react-hook-form';
import {} from '../../_utils/firedbHelper';

export default () => {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: '',
            message: '', 
            image: null
        }
    });

    const onSubmit = data => {
        console.log(data);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name">Name</label>
                <input ref={register} id="name" name="name" />
                <label htmlFor="image">Image</label>
                <input ref={register} type="file" id="image" name="image" />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}