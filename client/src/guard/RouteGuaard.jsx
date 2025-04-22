import { useSelector } from "react-redux";

export const IsLoggedIn = (to, from, next) => {
  const state = useSelector((state) => state.user);
  console.log(state);
  if (state && state.details && state.isLoggedIn) {
    return "children"; //next
  } else {
    return "deny";
  }
};
