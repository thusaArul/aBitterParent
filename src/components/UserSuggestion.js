import React, { Component } from "react";

class UserSuggestion extends Component {


  render() {
    return (
      <div className="userSuggestion">
        <div className="image">
          <img
            src={this.props.results.recoImage}
            alt={this.props.results.recoImageAlt}
          />
        </div>
        <div className="text">
          <h2>{this.props.results.recoFoodTitle}</h2>
          <ul>
            <li>
              <span>Fat Amount:</span> {this.props.results.recommendedFood[0]}g
            </li>
            <li>
              <span>Calories:</span> {this.props.results.recommendedFood[1]} kJ
            </li>
            <li>
              <span>Sugar:</span> {this.props.results.recommendedFood[2]}g
            </li>
            <li>
              <span>Protein:</span> {this.props.results.recommendedFood[3]}g
            </li>
            <li>
              <span>Carbohydrates:</span>{" "}
              {this.props.results.recommendedFood[4]}g
            </li>
          </ul>
        </div>
				{/* <div className="sugarCounter">
					<h4>The recommended item has <br/><span>{this.props.results.sugarDiff}g</span><br/>less sugar</h4>
        </div> */}
      </div>
    );
  }
}

export default UserSuggestion;
