export const SET_USER = "setUser";
export const SET_APP_IS_LOADING = "setAppIsLoading";

export interface SetUserAction {
  type: typeof SET_USER;
  payload: {
    user: any;
  };
}

export interface SetAppIsLoadingAction {
  type: typeof SET_APP_IS_LOADING;
  payload: {
    isLoading: boolean;
  };
}

// export type ActionTypes = UserLoggedInAction | UserLoggedOutAction;
export type ActionTypes = SetUserAction | SetAppIsLoadingAction;
