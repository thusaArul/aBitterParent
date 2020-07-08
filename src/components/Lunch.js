import React, { Component, Fragment } from "react";
import UserResults from "./UserResults";

class Lunch extends Component {
  render() {
    return (
      <Fragment>
        <form className="foodSelector">
          <label htmlFor="foodMenu">Select what you would Like</label>
          <select id="foodMenu" onChange={this.props.handleChange} defaultValue>
          <option disabled value>
              Choose your food
            </option>
            <option value="teriyaki steak">Teriyaki Steak</option>
            <option value="jelly sandwich">Jelly Sandwich</option>
            <option value="baconator">Baconator</option>
            <option value="thai noodles">Thai Noodles</option>
            <option value="Caesar Salad">Caesar Salad</option>
            <option value="apple dumplings">Apple Dumplings</option>
            <option value="grilled peach">Grilled Peaches</option>
            <option value="mochi">Mochi</option>
            <option value="pork bbq burrito">Pork BBQ Burrito</option>
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

export default Lunch;
