import React from "react"
import { useForm } from "react-hook-form"
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

const Login = () => {
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = values => {
    console.log(values);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        name="username"
        inputRef={register({
          required: 'Please enter your username.'
        })}
        placeholder = "Username"
      />
      {errors.username && errors.username.message}
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
}

export default Login;
