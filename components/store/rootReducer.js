import { combineReducers } from "redux";
import UserReducer from "./reducers/reducer";
import  PostReducer  from "./reducers/postReducer";
import CrimeReducer from "./reducers/crimeReducer";

const reducers = combineReducers({
  userReducer: UserReducer,
  postReducer: PostReducer,
  crimeReducer: CrimeReducer
});

export const RootReducer = (state, action) => {
  //Reset Global state
  // if (action.type === '[Auth] LOGOUT_USER') {
  //   return reducers(undefined, action);
  // }

  return reducers(state, action);
};
