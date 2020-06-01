import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildContol/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <h2>
      Current Price: <strong>{props.price.toFixed(2)}</strong>
    </h2>
    {controls.map((ctrl) => (
      <BuildControl
        key={ctrl.type}
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabledInfo[ctrl.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={props.price.toFixed(2) < 4.01}
      onClick={props.ordered}
    >
      ORDER NOW
    </button>
  </div>
);
export default buildControls;
