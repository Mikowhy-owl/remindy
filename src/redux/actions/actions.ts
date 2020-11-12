import * as actions from "./actionTypes";
import { ActionTypes } from "./actionTypes";

export function setUser(user: any): ActionTypes {
  return {
    type: actions.SET_USER,
    payload: {
      user,
    },
  };
}

export function setAppIsLoading(isLoading: boolean): ActionTypes {
  return {
    type: actions.SET_APP_IS_LOADING,
    payload: {
      isLoading,
    },
  };
}
