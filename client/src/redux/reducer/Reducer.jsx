const initialData = {
  isLoggedIn: [],
};
export const loginReducers = (state = initialData, action) => {
  switch (action.type) {
    case "ADD_USER_DATA":
      state.isLoggedIn = action.payload; //mathi banako state value change gareko
      return state;
    default:
      return state;
  }
};
