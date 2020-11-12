import * as actions from "../actions/actionTypes";
import { ActionTypes } from "../actions/actionTypes";

export interface UserState {
  user: any;
}

const initialState = {
  user: null,
};

export default function userReducer(
  state: UserState = initialState,
  action: ActionTypes
) {
  switch (action.type) {
    case actions.SET_USER:
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      return state;
  }
}
