import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
// import Link from "@material-ui/core/Link";
//import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";

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
    margin: "0 0.7rem"
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

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  const [userIsLogged, setUserIsLogged] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("authkey")) {
      setUserIsLogged(true);
    }
  }, [userIsLogged]);

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
            <MenuItem onClick={handleClose}><NavLink to='/register'>Register</NavLink></MenuItem>
            {!userIsLogged && (
              <MenuItem onClick={handleClose}>About us</MenuItem>
            )}
            <MenuItem onClick={handleClose}>Contact us</MenuItem>
          </Menu>

          <NavLink className={classes.links} to="/">
            <Typography className={classes.medTitle}>
              Flatten The Curve
            </Typography>
          </NavLink>

          <div className="navLinks-div">
            {!userIsLogged ? (
              <div>
                <NavLink className={classes.links} to="/login">
                  Login
                </NavLink>
              </div>
            ) : null}
          </div>
          {userIsLogged ? (
            <NavLink className={classes.links} to="/dashboard">
              Dashboard
            </NavLink>
          ) : null}
          {userIsLogged ? <Avatar className={classes.orange} /> : null}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavigationBar;
