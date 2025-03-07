import React from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

const modal = (props) => (
  <>
    <Backdrop show={props.show} clicked={props.modalClosed} />
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0",
      }}
    >
      {props.children}
    </div>
  </>
);

export default React.memo(
  modal,
  (prevProps, nextProps) =>
    prevProps.show === nextProps.show &&
    prevProps.children === nextProps.children
);
