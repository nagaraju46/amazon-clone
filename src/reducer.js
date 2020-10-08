export const initialState = {
  basket: [],
  user: null,
};

export const getTotal = (basket) => {
  const getSum = (value, { price }) => {
    return value + price;
  };

  return basket.reduce(getSum, 0);
};

const reducer = (state, action) => {
  //   console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      return { ...state, basket: [...state.basket, action.item] };
    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex((item) => item.id === action.id);
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.log("cant remove item");
      }

      return { ...state, basket: newBasket };

    case "EMPTY_BASKET":
      return { ...state, basket: [] };
    case "SET_USER":
      return { ...state, user: action.user };
    default:
      return state;
  }
};

export default reducer;
