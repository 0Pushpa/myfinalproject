import { combineReducers } from "redux";
import { loginReducers } from "./LoginReducer";
import { chatReducers } from "./ChatReducer";
import { groupReducer } from "./CreateGroupReducer";
import { CallReducer } from "./CallReducer";
// import notificationReducer from "../slice/NotificationSlice";

export const rootReducers = combineReducers({
  user: loginReducers,
  messages: chatReducers,
  groups: groupReducer,
  caller: CallReducer,
  // notification: notificationReducer,
});
