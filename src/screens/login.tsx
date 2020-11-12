import { StatusBar } from "expo-status-bar";
import React, { FC, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Input, RButton } from "../components";
import firebase from "firebase";
import * as actions from "../redux/actions/actions";
import { useDispatch } from "react-redux";

interface Props {
  navigation: any;
}

const This: FC<Props> = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const login = async () => {
    dispatch(actions.setAppIsLoading(true));
    if (email && password) {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      dispatch(actions.setAppIsLoading(false));
    } else {
      Alert.alert("Missing fields");
    }
  };

  return (
    <>
      <StatusBar style='dark' />
      <View style={styles.container}>
        <Text>Login Screen</Text>
        <Input placeholder='Email' onChangeText={(text) => setEmail(text)} />
        <Input
          placeholder='Password'
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <RButton title='Login' onPress={login} />
        <View style={styles.loginText}>
          <Text style={{ marginHorizontal: 5 }}>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("signup")}
            style={{ marginHorizontal: 5 }}
          >
            <Text style={{ color: "rgba(81,135,200,1)" }}>Signup here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default This;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    flexDirection: "row",
    marginVertical: 20,
  },
});
