import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
// import Link from "@material-ui/core/Link";
// import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > *": {
      margin: theme.spacing(1)
    },
    borderBottom: "solid 1px grey"
  },
  links: {
    textDecoration: "none",
    width: "",
    margin: "0 0.3rem",
    color: "#2F5973"
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
  const classes = useStyles();
  const [userIsLogged, setUserIsLogged] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("authkey")) {
      setUserIsLogged(true);
    }
  }, [userIsLogged]);

  return (
    <div className={classes.root}>
      <div>
        <NavLink className={classes.links} to="/">
          <Typography className={classes.medTitle}>Flatten The Curve</Typography>
        </NavLink>
      </div>
      <div>
        {!userIsLogged ? (
          <div>
            <NavLink className={classes.links} to="/login">
              Login
            </NavLink>
            <NavLink className={classes.links} to="/register">
              Register
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
    </div>
  );
};

export default NavigationBar;
