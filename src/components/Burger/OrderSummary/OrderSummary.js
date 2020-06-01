import React from "react";
import Button from "../../UI/Button/Button";

export default class OrderSummary extends React.Component {
  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  render() {
    let ingredientSummary = null;
    if (this.props.ingredients) {
      ingredientSummary = Object.keys(this.props.ingredients).map((igKey) => {
        return this.props.ingredients[igKey] > 0 ? (
          <li key={igKey}>
            <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
            {this.props.ingredients[igKey]}
          </li>
        ) : null;
      });
    }

    return (
      <>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          Total price: <strong>{this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to checkout?</p>
        <Button btnType="Success" clicked={this.props.continue}>
          CONTINUE
        </Button>
        <Button btnType="Danger" clicked={this.props.cancel}>
          CANCEL
        </Button>
      </>
    );
  }
}
