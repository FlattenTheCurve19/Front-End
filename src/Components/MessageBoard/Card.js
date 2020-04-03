import React, { useState, useEffect } from "react";
import { Card } from "./styles";
import { useDispatch } from "react-redux";
import { fetchCenter, fetchZoom } from "../../Store/Actions/messageActions";
import * as firebase from "firebase/app";
import "firebase/auth";
import { deletePost } from "../../_utils/firedbHelper";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

// Menu Dropdown
const options = ["Delete"];
const ITEM_HEIGHT = 48;

// No profile photo avatar
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500]
  }
}));

// Do a fetch to db to grab user avatar
export default ({ message, forceRender, setToggled }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const gotToMessage = () => {
      setToggled(false);
    const center = {
      lat: message.geoLock.latitude,
      lng: message.geoLock.longitude
    };
    dispatch(fetchCenter(center));
    dispatch(fetchZoom(13))
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    deletePost(message.postId);
    forceRender();
  };

  return (
    <Card>
      <div className="container" onClick={gotToMessage}>
        {message.avatar && (
          <img alt={message.displayName} src={message.avatar} />
        )}
        {!message.avatar && (
          <Avatar className={classes.orange}>
            {message.displayName ? message.displayName.charAt(0) : null}
          </Avatar>
        )}
        <div className="content-container">
          {message.displayName ? (<h4>{message.displayName}</h4>) : <h4>Anonymous</h4>}
          <p>{message.postField}</p>
        </div>
      </div>
      {user && user.uid === message.userUUID && (
        <div className="delete">
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch"
              }
            }}
          >
            {options.map(option => (
              <MenuItem key={option} onClick={handleDelete}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
      )}
    </Card>
  );
};
