import React, { Component } from "react";
import axios from "axios";
import UserInput from "./components/UserInput";
import firebase from "./firebase";
import DisplaySavedFoods from "./components/DisplaySavedFoods";

class ApiCalls extends Component {
  constructor() {
    super();
    // setting initial state values
    this.state = {
      userInput: "",
      recoFoodTitle: "",
      sugarValue: "",
      sugarDiff: "",
      recoSugarValue: "",
      usersFood: [],
      recommendedFood: [],
      checkReco: false,
      checkUserChoice: false,
      breakfast: false,
      lunch: false,
      dinner: false,
      snack: false,
      userImage: "",
      userImageAlt: "",
      recoImage: "",
      recoImageAlt: "",
      firebaseObj: {},
      unsplashKey: "XOIxVf1JifM9_NSItXssxrkEDz917Vsu03WTP2T6nbA",
      //to swtich between keys when it reaches limit
      // unsplashKey: 'wPc_7irjVjTU9ez7gjehFg6qAyrOd2HEkx_YY397uts',
      sugarAllowed: 0,
    };
  }

  // function that upon call makes an API request to get the food images
  unsplashCall = (query) => {
    axios({
      url: "https://api.unsplash.com/photos/random",
      method: "GET",
      responseType: "JSON",
      params: {
        client_id: this.state.unsplashKey,
        query: `${query}`,
        orientation: "squarish",
      },
    }).then((response) => {
      let unsplashUrl = response.data.urls.regular;
      let altTag = response.data.alt_description;

      this.setState({
        userImage: unsplashUrl,
        userImageAlt: altTag,
      });
    });
  };

  // function that upon call makes an API request to get information about the food
  nutritionixCall = (query, sugar) => {
    axios({
      url: "https://trackapi.nutritionix.com/v2/search/instant",
      method: "POST",
      responseType: "JSON",
      headers: {
        "Content-Type": "application/json",
        "x-app-id": "2f61b616",
        "x-app-key": "3c2af909b8bc091e21372b59a9e4b835",
        "x-remote-user-id": "0",
      },
      data: {
        query: query,
        detailed: true,
        full_nutrients: {
          "269": {
            lte: sugar,
          },
        },
      },
    }).then((response) => {
      // variable that contains the response from the API call
      const nutObj = response.data.common[0].full_nutrients;
      let sugarAmount;
      let fatAmount;
      let calorieAmount;
      let proteinAmount;
      let carbohydratesAmount;

      // looping through the response to extract the nutrition values
      for (let i = 0; i < nutObj.length; i++) {
        if (nutObj[i].attr_id === 269) {
          sugarAmount = Math.round(nutObj[i].value);
        } else if (nutObj[i].attr_id === 204) {
          fatAmount = Math.round(nutObj[i].value);
        } else if (nutObj[i].attr_id === 208) {
          calorieAmount = Math.round(nutObj[i].value);
        } else if (nutObj[i].attr_id === 203) {
          proteinAmount = Math.round(nutObj[i].value);
        } else if (nutObj[i].attr_id === 205) {
          carbohydratesAmount = Math.round(nutObj[i].value);
        }
      }

      // conditional statement to change the value from udefined to 0 for better visual user experience
      if (fatAmount === undefined) {
        fatAmount = 0;
      } else if (calorieAmount === undefined) {
        calorieAmount = 0;
      } else if (proteinAmount === undefined) {
        proteinAmount = 0;
      } else if (carbohydratesAmount === undefined) {
        carbohydratesAmount = 0;
      }

      const newObj = [
        fatAmount,
        calorieAmount,
        sugarAmount,
        proteinAmount,
        carbohydratesAmount,
      ];

      this.setState({
        usersFood: newObj,
        sugarValue: sugarAmount,
      });

      const isWild = Math.floor(Math.random() * 10);
      if (isWild === 0) {
        this.setState({
          sugarAllowed: this.state.sugarValue - 5,
        });
      } else {
        this.setState({
          sugarAllowed: this.state.sugarValue - 10,
        });
      }
    });
  };

  handleChange = (event) => {
    event.preventDefault();

    let userInput = this.state.userInput;
    let value = event.target.value;

    userInput = value;

    this.setState({
      userInput: userInput,
      checkUserChoice: false,
    });
  };

  // functions to set the state for sections and render the section when the respective button is clicked
  handleBreakfastClick = () => {
    this.setState({
      breakfast: true,
      lunch: false,
      dinner: false,
      snack: false,
      checkUserChoice: false,
      checkReco: false,
    });
  };
  handleLunchClick = () => {
    this.setState({
      breakfast: false,
      lunch: true,
      dinner: false,
      snack: false,
      checkUserChoice: false,
      checkReco: false,
    });
  };
  handleDinnerClick = () => {
    this.setState({
      breakfast: false,
      lunch: false,
      dinner: true,
      snack: false,
      checkUserChoice: false,
      checkReco: false,
    });
  };

  handleSnackClick = () => {
    this.setState({
      breakfast: false,
      lunch: false,
      dinner: false,
      snack: true,
      checkUserChoice: false,
      checkReco: false,
    });
  };

  // upon the component update, calling the images and nutritions functions
  componentDidUpdate(prevProps, prevState) {
    if (prevState.userInput !== this.state.userInput) {
      this.setState({
        checkReco: false,
        checkUserChoice: true,
      });

      this.unsplashCall(this.state.userInput);

      this.nutritionixCall(this.state.userInput, 10000);
    }
  }

  // function that pushes the chosen food pair to firebase
  handleSave = (event) => {
    event.preventDefault();
    const dbRef = firebase.database().ref();
    let userFoodOption = this.state.usersFood;
    let userRecoOption = this.state.recommendedFood;
    let userFoodName = this.state.userInput;
    let userRecoName = this.state.recoFoodTitle;

    const firebaseObj = {
      food1: { userFoodName, userFoodOption },
      food2: { userRecoName, userRecoOption },
    };
    dbRef.push(firebaseObj);
  };

  // function that sets state to render the alternative food for the user
  subClick = () => {
    this.setState({
      checkReco: true,
    });

    const isWild = Math.floor(Math.random() * 10);
    if (isWild === 0) {
      this.setState({
        sugarAllowed: this.state.sugarValue - 5,
      });
    } else {
      this.setState({
        sugarAllowed: this.state.sugarValue - 10,
      });
    }
    // an API call to get the nutrition values for the substitute food that meets the condition of less amount of sugar
    axios({
      url: "https://trackapi.nutritionix.com/v2/search/instant",
      method: "POST",
      responseType: "JSON",
      headers: {
        "Content-Type": "application/json",
        "x-app-id": "2f61b616",
        "x-app-key": "3c2af909b8bc091e21372b59a9e4b835",
        "x-remote-user-id": "0",
      },
      data: {
        query: "vegetables || fruits || grains",
        detailed: true,
        full_nutrients: {
          "269": {
            lte: this.state.sugarAllowed,
          },
        },
      },
    }).then((response) => {
      let randItem;
      let noOfRes = response.data.common.length;
      randItem = Math.floor(Math.random() * noOfRes);

      const nutObj = response.data.common[randItem].full_nutrients;
      let sugarAmount;
      let fatAmount;
      let calorieAmount;
      let proteinAmount;
      let carbohydratesAmount;
      for (let i = 0; i < nutObj.length; i++) {
        if (nutObj[i].attr_id === 269) {
          sugarAmount = Math.round(nutObj[i].value);
        } else if (nutObj[i].attr_id === 204) {
          fatAmount = Math.round(nutObj[i].value);
        } else if (nutObj[i].attr_id === 208) {
          calorieAmount = Math.round(nutObj[i].value);
        } else if (nutObj[i].attr_id === 203) {
          proteinAmount = Math.round(nutObj[i].value);
        } else if (nutObj[i].attr_id === 205) {
          carbohydratesAmount = Math.round(nutObj[i].value);
        }
      }

      if (fatAmount === undefined) {
        fatAmount = 0;
      } else if (calorieAmount === undefined) {
        calorieAmount = 0;
      } else if (proteinAmount === undefined) {
        proteinAmount = 0;
      } else if (carbohydratesAmount === undefined) {
        carbohydratesAmount = 0;
      }

      const newObj = [
        fatAmount,
        calorieAmount,
        sugarAmount,
        proteinAmount,
        carbohydratesAmount,
      ];

      this.setState({
        recommendedFood: newObj,
        recoFoodTitle: response.data.common[randItem].food_name,
        sugarDiff: this.state.sugarValue - newObj[2],
      });

      // an API call that returns the image for the substitute food
      axios({
        url: "https://api.unsplash.com/photos/random",
        method: "GET",
        responseType: "JSON",
        params: {
          client_id: this.state.unsplashKey,
          query: this.state.recoFoodTitle,
          orientation: "squarish",
        },
      }).then((response) => {
        let unsplashUrl = response.data.urls.small;
        let altTag = response.data.alt_description;

        this.setState({
          recoImage: unsplashUrl,
          recoImageAlt: altTag,
        });
      });
    });
  };
  render() {
    return (
      <div className="wrapper">
        <UserInput
          results={this.state}
          handleChange={this.handleChange}
          subClick={this.subClick}
          handleBreakfastClick={this.handleBreakfastClick}
          handleLunchClick={this.handleLunchClick}
          handleDinnerClick={this.handleDinnerClick}
          handleSnackClick={this.handleSnackClick}
          handleSave={this.handleSave}
        />

        {this.state.checkReco ? (
          <div className="button">
            <button className="saveBtn" onClick={this.handleSave}>
              Save selection
            </button>
          </div>
        ) : null}
        {this.state.checkReco ? <DisplaySavedFoods /> : null}
      </div>
    );
  }
}

export default ApiCalls;
