import * as actions from "../actions/actionTypes";
import { ActionTypes } from "../actions/actionTypes";

export interface AppLoadingState {
  isLoading: boolean;
}

const initialState = {
  isLoading: false,
};

export default function appLoadingReducer(
  state: AppLoadingState = initialState,
  action: ActionTypes
) {
  switch (action.type) {
    case actions.SET_APP_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    default:
      return state;
  }
}
