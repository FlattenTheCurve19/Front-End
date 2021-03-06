import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
// import Link from "@material-ui/core/Link";
//import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import { useHistory } from "react-router-dom";
import { ReactComponent as Logo } from "../../images/finallogo.svg";
import fire from "../../_utils/firebase";
import Avatar from "@material-ui/core/Avatar";

import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > *": {
      margin: theme.spacing(0)
    },
    backgroundColor: "#44CDCD"
  },
  links: {
    textDecoration: "none",
    width: "",
    margin: "0 0.5rem"
  },
  medTitle: {
    marginLeft: 10,
    color: "#2F5973"
  },
  orange: {
    marginRight: 10,
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500]
  }
}));

const NavigationBar = props => {
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  const [userIsLogged, setUserIsLogged] = useState(false);

  useEffect(() => {
    props.user && props.user.user !== null && setUserIsLogged(true);
  }, [props.user]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {!userIsLogged ? (
              <MenuItem
                onClick={() => {
                  handleClose();
                  history.push("register");
                }}
              >
                Register
              </MenuItem>
            ) : (
              <MenuItem
                onClick={() => {
                  handleClose();
                  setUserIsLogged(false);
                  fire.auth().signOut();
                  history.push("/");
                }}
              >
                Log Out
              </MenuItem>
            )}

            <MenuItem
              onClick={() => {
                handleClose();
                history.push("message-map-page");
              }}
            >
              Chat Near You
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                history.push("twitter-feed");
              }}
            >
              Live Tweets
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                history.push("/about");
              }}
            >
              About Us
            </MenuItem>
          </Menu>
          <div className="logo-div">
            <NavLink className={classes.links} to="/">
              <Logo height={28} />
            </NavLink>

            <NavLink className={classes.links} to="/">
              <Typography>Flatten The Curve</Typography>
            </NavLink>
          </div>
          <div className="navLinks-div">
            {!userIsLogged ? (
              <div>
                <NavLink className={classes.links} to="/login">
                  Login
                </NavLink>
              </div>
            ) : props.user.user ? (
              <div className="profile-sec">
                <p>
                  {props.user.user.displayName
                    ? props.user.user.displayName
                        .split(" ")
                        .splice(0, 1)
                        .join()
                    : null}
                </p>
                <img
                  className="google-pic"
                  src={props.user.user.photoURL}
                  alt="dashboard link"
                />
              </div>
            ) : (
              <NavLink className={classes.links} to="/dashboard">
                <Avatar />
              </NavLink>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavigationBar;
