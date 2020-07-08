import React, { Component, Fragment } from "react";
import UserResults from "./UserResults";

class Dinner extends Component {
  render() {
    return (
      <Fragment>
        <form>
          <label htmlFor="foodMenu">Select what you would Like</label>
          <select id="foodMenu" onChange={this.props.handleChange} defaultValue>
          <option disabled value>
              Choose your food
            </option>
            <option value="bbq 0ribs">BBQ Ribs</option>
            <option value="walnut shrimp">Walnut Shrimp</option>
            <option value="sesame chicken">Sesame Chicken</option>
            <option value="vermicelli noodles with pork">Vermicelli Noodles with Pork</option>
            <option value="jelly donuts">Jelly Donuts</option>
            <option value="cinnamon bun">Cinnamon Buns</option>
            <option value="fried apple pie">Fried Apple Pie</option>
            <option value="pulled pork">Pulled Pork</option>
            <option value="banana split">Banana Split</option>
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

export default Dinner;
