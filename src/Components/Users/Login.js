import React from "react";
import { useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";

const Login = () => {
  const history = useHistory()
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = values => {
    console.log(values);
    firebase.auth().signInWithEmailAndPassword(values.email, values.password)
    .then(res => {
      console.log(res)
      history.push('/')
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
      <Input
        name="email"
        inputRef={register({
          required: 'Please enter your Email.'
        })}
        placeholder = "email"
      />
      {errors.email && errors.email.message}
      <br/>

      <Input
        name="password"
        type = "password"
        inputRef={register({
          required: 'Please enter your password.'
        })}
        placeholder = "Password"
      />
      {errors.password && errors.password.message}
      <br/>

      <Button variant="contained" color="primary" type="submit">Login</Button>
    </form>
    </div>
  )
};

export default Login;
