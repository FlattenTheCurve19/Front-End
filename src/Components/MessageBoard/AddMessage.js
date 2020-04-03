import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/auth";
import { messageSetter } from "../../Store/Actions/messageActions";
import { useSelector } from "react-redux";

// Component Imports
import { Form } from "./styles";

// Material UI Imports
import {
  FormControl,
  Input,
  InputLabel,
  IconButton,
  InputAdornment
} from "@material-ui/core";
import { Send } from "@material-ui/icons";

export default ({ forceRender }) => {
  const { handleSubmit, errors, control, reset } = useForm({ message: "" });
  const [user, setUser] = useState(null);
  const history = useHistory();
  const { userInfo } = useSelector(state => state.messageBoard);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const submitForm = data => {
    reset({
      message: ""
    });
    // Also check to see if a location has been added
    // const lat = userInfo.latitude;
    // const long = userInfo.longitude;
    // if(!lat || !long){
    //     console.log('Please allow location');
    // }
    if (user) {
      messageSetter({
        displayName: user.displayName,
        UUID: user.uid,
        postField: data.message,
        geoLock: {
          longitude: userInfo.longitude,
          latitude: userInfo.latitude
        },
        avatar: user.photoURL
      });
      forceRender();
    } else {
      history.push("/login");
    }
  };

  return (
    <Form>
      {errors.message && errors.message.type === "required" && (
        <p>Please enter a message</p>
      )}
      {errors.message && errors.message.type === "minLength" && (
        <p>Message must be at least 3 characters long</p>
      )}
      {errors.message && errors.message.type === "maxLength" && (
        <p>Message cannot exceed 100 characters</p>
      )}
      <form onSubmit={handleSubmit(submitForm)}>
        <FormControl>
          <InputLabel htmlFor="message">Message</InputLabel>
          <div style={{ display: "flex", flexWrap: "nowrap" }}>
            <Controller
              style={{ width: "100%" }}
              id="message"
              as={<Input />}
              name="message"
              rules={{
                required: true,
                minLength: 3,
                maxLength: 50
              }}
              control={control}
            />
            <IconButton aria-label="toggle password visibility" type="submit">
              <Send />
            </IconButton>
          </div>
        </FormControl>
      </form>
    </Form>
  );
};
