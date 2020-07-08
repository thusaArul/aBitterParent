import React, { Component, Fragment } from "react";
import UserResults from "./UserResults";

class Breakfast extends Component {
  render() {
    return (
		<Fragment>
			<form>
				<label htmlFor="foodMenu">Select what you would Like</label>
				<select id="foodMenu" onChange={this.props.handleChange} defaultValue>
					<option disabled value>
						Choose your food
					</option>
					<option value="oreos">Oreos</option>
					<option value="chocolate waffles">Chocolate Waffles</option>
					<option value="captain crunch cereal">
						Captain Crunch Cereal
					</option>
					<option value="nutella sandwich">Nutella Sandwich</option>
					<option value="yogurt">Yogurt</option>
					<option value="muffin">Muffin</option>
					<option value="egg tart">Egg Tart</option>
					<option value="banana bread">Banana Bread</option>
					<option value="breakfast drink">Breakfast Drink</option>
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

export default Breakfast;
