import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
/* import Input from "@material-ui/core/Input";*/
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// Add the Firebase services that you want to use
import { gProvider } from "../../_utils/firebase";
import fire from "../../_utils/firebase";
import "firebase/auth";

const Login = () => {
  const history = useHistory();
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = values => {
    console.log(values);
    fire
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(res => {
        history.push("/");
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
  };

  const googleSignUp = () => {
    fire
      .auth()
      .signInWithPopup(gProvider)
      .then(() => {
        history.push("/");
      })
      .catch(error => {
        console.log(error)
      });
  };

  return (
    <div>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="inner-form">
          <h1>Welcome Back</h1>
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            inputRef={register({
              required: <p className="errText">Please enter your Email</p>
            })}
            placeholder="email"
          />
          {errors.email && errors.email.message}
          <br />

          <TextField
            label="Password"
            variant="outlined"
            name="password"
            type="password"
            inputRef={register({
              required: <p className="errText">Please enter your password</p>
            })}
            placeholder="Password"
          />
          {errors.password && errors.password.message}
          <br />

          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
          <br />
          <div className="googleLogin" onClick={() => googleSignUp()}>
            <img alt='Profile' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
            <p>Sign in with Google</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
