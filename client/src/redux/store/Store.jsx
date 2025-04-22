import { compose, createStore } from "redux";
import { rootReducers } from "../reducer/Reducers";
// import { loadState, saveState } from "./LoadState";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["messages", "groups"],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const enhancers = [
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
];
const store = createStore(persistedReducer, compose(...enhancers));

const persister = persistStore(store);

export { store, persister };
