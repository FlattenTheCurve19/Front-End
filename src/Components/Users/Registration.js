import React from "react";
import { useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";


const Registration = () => {
  const history = useHistory()
  const { handleSubmit, register, errors, watch } = useForm();

  const onSubmit = values => {
    console.log(values);
    firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
    .then(res => {
      console.log(res)
      history.push('/login')
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(`Firebase Auth encountered a error @ `,errorCode, errorMessage)
      // ...
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
      {/* <Input
        name="username"
        inputRef={register({
          required: 'Please enter a username.'
        })}
        placeholder = "Username"
      />
      {errors.username && errors.username.message}
      <br/> */}

      <Input
        name="email"
        inputRef={register({
          required: 'Please enter an email.',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: "Invalid email address."
          }
        })}
        placeholder = "Email"
      />
      {errors.email && errors.email.message}
      <br/>

      <Input
        name="passwordOne"
        type = "password"
        inputRef={register({
          required: 'Please enter a password.',
          validate: value => value.length >= 8 || "Password must be at least 8 characters."
        })}
        placeholder = "Password"
      />
      {errors.passwordOne && errors.passwordOne.message}
      <br/>

      <Input
        name="passwordTwo"
        type = "password"
        inputRef={register({
          required: 'Please re-enter the password.',
          validate: value => value === watch("passwordOne") || "Passwords do not match."
        })}
        placeholder = "Re-enter password"
      />
      {errors.passwordTwo && errors.passwordTwo.message}
      <br/>

        {/* Location isnt something we should be asking for at signup, we ask for it aws they use the coreApp */}


      {/* <Input
        name="location"
        inputRef={register({
          required: 'Please enter a location.',
          // We can enforce a pattern for the location (like a 5-digit zip code). For reference, see email pattern above ^
          pattern: {
            value: null,
            message: "Invalid location."
          }
        })}
        placeholder = "Location"
      />
      {errors.location && errors.location.message}
      <br/> */}

      <Button variant="contained" color="primary" type="submit">Register</Button>
    </form>
      
    </div>
  )
};

export default Registration;
