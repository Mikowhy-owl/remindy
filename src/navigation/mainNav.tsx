import React, { FC, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import firebase from "firebase";
import AppStack from "./appStack";
import AuthStack from "./authStack";
import { useDispatch, useSelector } from "react-redux";
import { UserState } from "../redux/reducers/userReducer";
import { AppLoadingState } from "../redux/reducers/appLoadingReducer";
import * as actions from "../redux/actions/actions";

const MainNav: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector<UserState>((state: any) => state.userReducer.user);
  const isLoading = useSelector<AppLoadingState>(
    (state: any) => state.appLoadingReducer.isLoading
  );

  const authenticate = () => {
    firebase.auth().onAuthStateChanged((userObject) => {
      if (userObject) {
        dispatch(actions.setUser(userObject));
        dispatch(actions.setAppIsLoading(false));
      }
    });
  };

  useEffect(() => {
    authenticate();
  }, []);

  return (
    <NavigationContainer>
      {!isLoading ? (
        user && user !== null ? (
          <AppStack />
        ) : (
          <AuthStack />
        )
      ) : (
        <View style={styles.container}>
          <ActivityIndicator size='large' color='#000' />
        </View>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default MainNav;
