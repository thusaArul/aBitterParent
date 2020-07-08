import React, {Component, Fragment} from 'react'
import firebase from '../firebase'

class DisplaySavedFoods extends Component {

    constructor() {
        super();
        this.state = {
          foods: [],
        };
    }

    componentDidMount() {
        const dbRef = firebase.database().ref();
        dbRef.on("value", (response) => {
          const newState = [];
          const data = response.val();
          for (let key in data) {
            newState.push({
              food: data[key],
              key: key,
            });
          }
          this.setState({
            foods: newState,
        });
        });
    }

    deleteActivity = (key) => {
        const dbRef = firebase.database().ref();
        dbRef.child(key).remove();
    };

    render() {
        return (
            <div className="showFoodPairs">
                <h3>Your Suggestions:</h3>
                {this.state.foods.map(({ key, food }) => {                  
                    return (
                        <Fragment>
                            <div key={key} className="food">
                                <ul className="savedFood text">
                                    <li><h2>
                                        {food.food1.userFoodName}
                                    </h2></li>
                                    <li>
                                        <ul>
                                            <li><span>Fat Amount:</span> {food.food1.userFoodOption[0]}g</li>
                                            <li><span>Calories:</span> {food.food1.userFoodOption[1]}kJ</li>
                                            <li><span>Sugar:</span> {food.food1.userFoodOption[2]}g</li>
                                            <li><span>Protein:</span> {food.food1.userFoodOption[3]}g</li>
                                            <li><span>Carbohydrates:</span> {food.food1.userFoodOption[4]}g</li>
                                        </ul>
                                    </li>
                                </ul>

                                <ul className="savedFood text">
                                    <li><h2>
                                        {food.food2.userRecoName}
                                    </h2></li>
                                    <li>
                                        <ul>
                                            <li><span>Fat Amount:</span> {food.food2.userRecoOption[0]}g</li>
                                            <li><span>Calories:</span> {food.food2.userRecoOption[1]}kJ</li>
                                            <li><span>Sugar: </span>{food.food2.userRecoOption[2]}g</li>
                                            <li><span>Protein: </span>{food.food2.userRecoOption[3]}g</li>
                                            <li><span>Carbohydrates:</span> {food.food2.userRecoOption[4]}g</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>

                            <div className="button"><button onClick={() => {
                            this.deleteActivity(key);
                            }}>Delete</button></div>
                        </Fragment>
                    );
                })}
            </div>
        )
    }
}

export default DisplaySavedFoods