import React, { createContext, useContext, useReducer } from "react";

//prepare your Data layer
export const StateContext = createContext();

//wrap our app and provider in Data layer
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

//pull information from the Data layer
export const useStateValue = () => useContext(StateContext);

/*
  usage
  wrap our App with StateProvider

  usage of useStateValue
  the useStateValue can be called as
  const [state, reducer] = useStateValue()


  define a reducer.js
  initialState = {
    //normal reactjs state variable
  }

  const reducer = (state, action) => {
    action is a kind of JSON data
    return value of new state base up on action
  }

  //example
  export const initialState = {
    basket: [],
  };

  const reducer = (state, action) => {
    //   console.log(action);
    switch (action.type) {
      case "ADD_TO_BASKET":
        return { ...state, basket: [...state.basket, action.item] };
      default:
        return state;
    }
  };

  export default reducer;

*/
