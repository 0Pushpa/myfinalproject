export const getCallerInfo = () => {
  return {
    type: "GET_CALLER_INFO",
  };
};

export const setCallerInfo = (payload) => {
  return {
    type: "SET_CALLER_INFO",
    payload,
  };
};
