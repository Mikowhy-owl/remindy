import React, { FC } from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  title?: string;
  onPress: () => void;
  size?: string;
  type?: string;
}

const This: FC<Props> = (props) => {
  return (
    <TouchableOpacity
      style={
        props.size === "small"
          ? styles(props).smallContainer
          : styles(props).container
      }
      onPress={props.onPress}
    >
      <Text style={styles(props).text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default This;

const styles = (props: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: props.type === "danger" ? "red" : "#000",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 8,
      marginVertical: 10,
    },
    smallContainer: {
      backgroundColor: "#000",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      height: 40,
      width: 40,
      borderRadius: 8,
    },
    text: {
      color: "#fff",
    },
  });
