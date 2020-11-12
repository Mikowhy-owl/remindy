import { StatusBar } from "expo-status-bar";
import React, { FC, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Input, RButton } from "../components";
import firebase from "../constants/firebase";

interface Props {
  navigation: any;
}

const This: FC<Props> = (props) => {
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const signup = async () => {
    if (name && email && password) {
      try {
        const { user } = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        if (user) {
          await firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .set({ name, email, password });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert("Error", "Missing Fields");
    }
  };

  return (
    <>
      <StatusBar style='dark' />
      <View style={styles.container}>
        <Text>Sign up Screen</Text>
        <Input placeholder='Name' onChangeText={(text) => setName(text)} />
        <Input placeholder='Email' onChangeText={(text) => setEmail(text)} />
        <Input
          placeholder='Password'
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <RButton title='Sign up' onPress={signup} />
        <View style={styles.loginText}>
          <Text style={{ marginHorizontal: 5 }}>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("login")}
            style={{ marginHorizontal: 5 }}
          >
            <Text style={{ color: "rgba(81,135,200,1)" }}>Login here</Text>
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
