import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// Add the Firebase services that you want to use
import fire from "../../_utils/firebase";
import { gProvider } from "../../_utils/firebase";
import "firebase/auth";

const Registration = () => {
  const history = useHistory();
  const { handleSubmit, register, errors, watch } = useForm();

  const onSubmit = values => {
    console.log(values);
    if (values.passwordOne === values.passwordTwo) {
      fire
        .auth()
        .createUserWithEmailAndPassword(values.email, values.passwordTwo)
        .then(res => {
          console.log(res);
          history.push("/login");
        })
        .catch(function(error) {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(
            `Firebase Auth encountered a error @ `,
            errorCode,
            errorMessage
          );
          // ...
        });
    } else {
      console.error("Passwords don't match");
    }
  };

  const googleSignUp = () => {
    fire
      .auth()
      .signInWithPopup(gProvider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        console.log("google user logged in", result);

        history.push("/");
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        // ...
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="register-form">
        <div className="inner-form">
          <h1>Join the Movement</h1>
          {/* <Input
        name="username"
        inputRef={register({
          required: 'Please enter a username.'
        })}
        placeholder = "Username"
      />
      {errors.username && errors.username.message}
      <br/> */}

          <TextField
            label="Email"
            constiant="outlined"
            name="email"
            inputRef={register({
              required: "Please enter an email.",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address."
              }
            })}
            placeholder="Email"
          />
          {errors.email && errors.email.message}
          <br />

          <TextField
            label="Password"
            constiant="outlined"
            name="passwordOne"
            type="password"
            inputRef={register({
              required: "Please enter a password.",
              validate: value =>
                value.length >= 8 || "Password must be at least 8 characters."
            })}
            placeholder="Password"
          />
          {errors.passwordOne && errors.passwordOne.message}
          <br />

          <TextField
            label="Confirm Password"
            constiant="outlined"
            name="passwordTwo"
            type="password"
            inputRef={register({
              required: "Please re-enter the password.",
              validate: value =>
                value === watch("passwordOne") || "Passwords do not match."
            })}
            placeholder="Re-enter password"
          />
          {errors.passwordTwo && errors.passwordTwo.message}
          <br />

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

          <Button constiant="contained" color="primary" type="submit">
            Register
          </Button>
          <div className="googleLogin" onClick={() => googleSignUp()}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
            <p>Sign Up with Google</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Registration;
