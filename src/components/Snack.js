import React, { Component, Fragment } from "react";
import UserResults from "./UserResults";

class Snack extends Component {
  render() {
    return (
      <Fragment>
        <form>
          <label htmlFor="foodMenu">Select what you would Like</label>
          <select id="foodMenu" onChange={this.props.handleChange} defaultValue>
          <option disabled value>
              Choose your food
            </option>
            <option value="cheesecake">Cheesecake</option>
            <option value="candy corn">Candy Corn</option>
            <option value="ice cream cake">Ice Cream Sandwiches</option>
            <option value="sweetened iced tea">Sweetened Iced Tea</option>
            <option value="apple sauce">Applesauce</option>
            <option value="milkshake">Milkshake</option>
            <option value="salted caramel pie">Salted Caramel Pie</option>
            <option value="chocolate milk">Chocolate Milk</option>
            <option value="vanilla cupcake">Vanilla Cupcakes</option>
            <option value="cake">Cake</option>
          </select>
        </form>
        <UserResults
          results={this.props.results}
          subClick={this.props.subClick}
        />
      </Fragment>
    );
  }
}

export default Snack;
