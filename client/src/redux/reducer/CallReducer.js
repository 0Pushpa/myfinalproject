const initialState = {
  isCalling: false,
  callerId: null,
  callerName: null,
  groupId: null,
};

export const CallReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCOMING_CALL":
      return {
        ...state,
        isCalling: true,
        callerId: action.payload.uid,
        callerName: action.payload.name,
        groupId: action.payload.groupId,
      };
    case "CLOSE_CALL":
      return {
        ...state,
        isCalling: false,
        callerId: null,
        callerName: null,
        groupId: null,
      };
    default:
      return state;
  }
};
