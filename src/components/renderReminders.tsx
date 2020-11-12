import React, { FC, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import moment from "moment";
import { TouchableOpacity } from "react-native-gesture-handler";
import firebase from "firebase";
import Icon from "react-native-vector-icons/FontAwesome5";
import Modal from "react-native-modal";
import RButton from "./RButton";

const { width, height } = Dimensions.get("screen");

interface Props {
  id: string;
  item: any;
  navigation: any;
}

const This: FC<Props> = (props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showText, setShowText] = useState<boolean>(false);

  const removeReminder = async (id: string) => {
    try {
      await firebase.firestore().collection("reminders").doc(id).delete();
      setShowModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles(props).container}>
      <View>
        <Modal
          isVisible={showModal}
          onBackdropPress={() => setShowModal(false)}
          // animationIn='zoomIn'
        >
          <View
            style={{
              backgroundColor: "#fff",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <Text>Are you sure you want to delete the reminder?</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 30,
              }}
            >
              <RButton
                title='Delete'
                onPress={() => removeReminder(props.id)}
                type='danger'
              />
              <RButton title='Back' onPress={() => setShowModal(false)} />
            </View>
          </View>
        </Modal>
      </View>
      <View style={{ flex: 0.85 }}>
        <TouchableOpacity
          {...props}
          onPress={
            props.item.showed
              ? () => setShowText(!showText)
              : () => {
                  setShowText(false);
                  props.navigation.navigate("editReminder", {
                    id: props.id,
                    item: props.item,
                  });
                }
          }
        >
          <View style={styles(props).reminderContainer}>
            <View style={{ flex: 0.12, justifyContent: "center" }}>
              <Icon
                name='bell'
                size={props.item.showed ? 15 : 18}
                color='#000'
                solid={props.item.showed}
              />
            </View>
            <View style={{ flex: 0.88 }}>
              <View style={styles(props).reminderInformationContainer}>
                <Text
                  style={{
                    marginRight: 5,
                    color: "grey",
                    fontSize: 15,
                    marginTop: 5,
                  }}
                >
                  {moment(props.item.reminderTime).format("DD MMM")}:
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontStyle: "italic",
                    marginTop: 5,
                  }}
                >
                  {moment(props.item.reminderTime).format("hh:mm")}
                </Text>
              </View>
              {!props.item.showed || showText ? (
                <Text
                  style={{
                    fontSize: props.item.showed ? 14 : 18,
                  }}
                >
                  {props.item.reminderText}
                </Text>
              ) : null}
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 0.15,
          marginHorizontal: 20,
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <Icon
            name='minus-square'
            size={props.item.showed ? 20 : 25}
            color='red'
            solid
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default This;

const styles = (props: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: width / 1.1,
      alignSelf: "center",
      marginVertical: 10,
      marginHorizontal: 20,
      overflow: "hidden",
      borderRadius: 10,
      backgroundColor: props.item.showed ? "lightgrey" : "#fff",
      shadowOffset: {
        width: 3,
        height: 3,
      },
      shadowColor: "#ccc",
      shadowOpacity: 0.9,
    },
    reminderContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: props.item.showed ? 10 : 15,
      marginBottom: props.item.showed ? 0 : 10,
    },
    reminderInformationContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: props.item.showed ? 4 : 6,
    },
  });
