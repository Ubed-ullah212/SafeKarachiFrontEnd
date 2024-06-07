import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { RootReducer } from "./rootReducer";
export const store = createStore(RootReducer, applyMiddleware(thunk));
