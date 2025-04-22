export const authData = (data) => {
  return {
    type: "LOGIN_SUCCESSFULL",
    payload: data,
  };
};

export const logoutUser = () => {
  return {
    type: "LOGOUT",
  };
};

export const userMessage = (msg) => {
  return {
    type: "USER_MSG",
    payload: msg,
  };
};
export const groupData = (gdata) => {
  return {
    type: "GROUP_STORE",
    payload: gdata,
  };
};
