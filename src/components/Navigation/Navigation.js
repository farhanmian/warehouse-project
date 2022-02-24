import React from "react";
import classes from "./Navigation.module.css";
import { Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { warehouseSearchAction } from "../../store/store";
import logo from "../../assets/img/logo.png";

const Navigation = () => {
  const dispatch = useDispatch();

  return (
    <nav className={classes.nav}>
      <div className={classes.navContainer}>
        <div className={classes.logoContainer}>
          <img src={logo} alt="logo" className={classes.logo} />
        </div>
        <div className={classes.searchBox}>
          <input
            className={classes.searchInput}
            onChange={(e) => {
              dispatch(warehouseSearchAction.searchName(e.target.value));
            }}
            placeholder="Serch"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
