import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../components/hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasing: false,
    loading: false,
  };

  componentDidMount() {
    axios.get("/ingredients.json").then((response) => {
      this.setState({ ingredients: response.data });
    });
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedControls = oldCount + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedControls;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedControls = oldCount > 0 ? oldCount - 1 : 0;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedControls;
    const priceReduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldCount > 0 ? oldPrice - priceReduction : oldPrice;

    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: "Alexey",
    //     address: "920 Tex street",
    //   },
    //   email: "bav@kemtel.ru",
    //   deliveyMethod: "fastest",
    // };
    // this.setState({ loading: true });
    // axios
    //   .post("/orders.json", order)
    //   .then((response) => {
    //     this.setState({ loading: false, purchasing: false });
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     this.setState({ loading: false, purchasing: false });
    //     console.log(error);
    //   });
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0;
    }
    let burger = <Spinner />;

    if (this.state.ingredients) {
      burger = (
        <>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabledInfo={disabledInfo}
            price={this.state.totalPrice}
            ordered={this.purchaseHandler}
          />
        </>
      );
    }

    return (
      <>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {!this.state.loading ? (
            <OrderSummary
              ingredients={this.state.ingredients}
              cancel={this.purchaseCancelHandler}
              continue={this.purchaseContinueHandler}
              price={this.state.totalPrice}
            />
          ) : (
            <Spinner />
          )}
        </Modal>
        {burger}
      </>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
