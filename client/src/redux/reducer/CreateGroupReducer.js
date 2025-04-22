
const initialState = {
  data: [],
  status: "",
};

export const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_GROUPS":
      return {
        ...state,
        data: [...action.payload],
        status: "GROUP_RECEIVED_SUCCESSFULLY",
      };

    case "SET_GROUP":
      return {
        ...state,
        data: [...state.data, action.payload],
        status: "GROUP_ADDED_SUCCESSFULLY",
      };
      case "REMOVE_GROUP":
        return {
          ...state,
          data: state.data.filter((g) => g?.GroupID?._id !== action.payload),
          status: "GROUP_REMOVED_SUCCESSFULLY",
        };
  

    case "ERROR_GROUP":
      return {
        ...state,
        status: "GROUP_ERROR",
      };

    default:
      return state;
  }
};
