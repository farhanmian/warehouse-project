import React from "react";
import classes from "./Navigation.module.css";
import { Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { warehouseAction } from "../../store/store";

const Navigation = () => {
  const dispatch = useDispatch();

  return (
    <nav className={classes.nav}>
      <div className={classes.navContainer}>
        <Typography variant="h2">Your 2nd home</Typography>
        <div className={classes.searchBox}>
          <input
            onChange={(e) => {
              dispatch(warehouseAction.searchName(e.target.value));
            }}
            placeholder="serch"
          ></input>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
