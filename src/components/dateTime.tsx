import React, { FC } from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";

const { height, width } = Dimensions.get("screen");

interface Props {
  onChange: (event: any, value: any) => void;
  value?: any;
}

const Input: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <DateTimePicker
        value={new Date(props.value)}
        mode={"datetime"}
        display='spinner'
        onChange={props.onChange}
        style={{ height: 45, width: "100%" }}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    width: width / 1.1,
    alignSelf: "center",
    backgroundColor: "#e3e3e3",
    borderRadius: 5,
    marginVertical: 10,
  },
});
