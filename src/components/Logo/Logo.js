import React from "react";
import burgerLogo from "../../assets/images/original.png";
import classes from "./Logo.module.css";

const logo = () => {
  return (
    <div className={classes.Logo}>
      <img src={burgerLogo} alt="Logo" />
    </div>
  );
};

export default logo;
