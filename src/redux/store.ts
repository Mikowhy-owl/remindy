import { createStore, combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import appLoadingReducer from "./reducers/appLoadingReducer";

const rootReducer = combineReducers({
  userReducer,
  appLoadingReducer, 
});

const store = createStore(rootReducer);

export default store;
