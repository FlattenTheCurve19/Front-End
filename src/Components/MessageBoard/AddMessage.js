import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/auth";
import { messageSetter } from "../../Store/Actions/messageActions";
import { useSelector } from "react-redux";

// Component Imports
import { Form, AddMessageInput } from "./styles";

// Material UI Imports
import {
  ButtonGroup,
  Button,
  TextField,
  Input,
  InputBase,
  withStyles,
  fade
} from "@material-ui/core";
import { Send, ImageOutlined } from "@material-ui/icons";

const FileInput = withStyles(theme => ({
  root: {
    display: "none"
  }
}))(InputBase);

const FileUploadButton = withStyles(theme => ({
  root: {
    borderRadius: "0"
  }
}))(Button);

export default ({ forceRender }) => {
  const { register, handleSubmit, errors, control, reset } = useForm({
    message: ""
  });
  const [user, setUser] = useState(null);
  const history = useHistory();
  const { userInfo } = useSelector(state => state.messageBoard);
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    register({ name: "upload" }, { required: false });
  }, [register]);

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
      console.log(imageUrl);
      messageSetter({
        displayName: user.displayName,
        UUID: user.uid,
        postField: data.message,
        geoLock: {
          longitude: userInfo.longitude,
          latitude: userInfo.latitude
        },
        avatar: user.photoURL,
        image: imageUrl
      });
      forceRender();
    } else {
      history.push("/login");
    }
  };

  const handleFileChange = e => {
    console.log(e);
    e.persist();
    if (e.target.files[0].type.includes("image")) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = res => {
        console.log(res);
        setImageUrl(res.target.result);
      };
    } else {
      console.error("Error", "Not supported image format");
    }
  };

  const imageUpload = () => {
    document.querySelector("#upload").click();
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
        <div style={{ display: "flex", flexWrap: "nowrap" }}>
          <Controller
            style={{ width: "100%" }}
            label="Message"
            id="message"
            variant="outlined"
            as={AddMessageInput}
            name="message"
            rules={{
              required: true,
              minLength: 3,
              maxLength: 50
            }}
            control={control}
          />
          <FileInput
            onChange={handleFileChange}
            id="upload"
            name="upload"
            type="file"
          />
          <ButtonGroup size="small" aria-label="toggle password visibility">
            <FileUploadButton onClick={imageUpload}>
              <ImageOutlined />
            </FileUploadButton>
            <Button type="submit">
              <Send />
            </Button>
          </ButtonGroup>
        </div>
      </form>
    </Form>
  );
};
