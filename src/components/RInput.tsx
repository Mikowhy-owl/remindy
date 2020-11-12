import React, { FC } from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const { height, width } = Dimensions.get("screen");

interface Props {
  placeholder: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  value?: any;
}

const RInput: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        secureTextEntry={props.secureTextEntry || false}
        onChangeText={props.onChangeText}
        value={props.value}
      />
    </View>
  );
};

export default RInput;

const styles = StyleSheet.create({
  container: {
    width: width / 1.1,
    alignSelf: "center",
    backgroundColor: "#e3e3e3",
    borderRadius: 5,
    marginVertical: 10,
  },
  input: {
    padding: 10,
    fontSize: 20,
  },
});
