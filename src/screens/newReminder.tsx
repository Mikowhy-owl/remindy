import React, { FC, useState } from "react";
import { View, Text, Alert, StyleSheet, SafeAreaView } from "react-native";
import { RButton, DateTime, Input } from "../components";
import firebase from "firebase";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome5";

interface Props {
  navigation: any;
}

const This: FC<Props> = (props) => {
  const [reminderText, setReminderText] = useState<string | null>("");
  const [reminderTime, setReminderTime] = useState<any>(new Date());

  const addReminder = async () => {
    if (reminderText) {
      const data = {
        reminderText,
        dateUpdated: Date.now(),
        reminderTime: reminderTime.getTime(),
        showed: false,
      };
      try {
        await firebase.firestore().collection("reminders").add(data);
        props.navigation.navigate("home");
      } catch (err) {
        console.log(err);
      }
    } else {
      Alert.alert("Missing fields");
    }
  };

  const onDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || reminderTime;
    setReminderTime(currentDate);
  };

  return (
    <>
      <SafeAreaView />
      <View style={styles.header}>
        <View style={{ flex: 0.2 }}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => props.navigation.goBack("")}
          >
            <Icon name='chevron-left' size={15} color='#fff' />
          </TouchableOpacity>
        </View>
        <View style={styles.headerTitleContainer}>
          <Text style={{ fontSize: 25 }}>New reminder</Text>
        </View>
        <View style={{ flex: 0.2 }}></View>
      </View>
      <View style={styles.container}>
        <Input
          placeholder='Name of reminder'
          onChangeText={(text) => setReminderText(text)}
          value={reminderText}
        />
        <DateTime onChange={onDateChange} value={reminderTime} />
        <RButton title='Add' onPress={addReminder} />
      </View>
    </>
  );
};
export default This;

const styles = StyleSheet.create({
  header: {
    flex: 0.08,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitleContainer: {
    flex: 0.6,
    alignItems: "center",
    justifyContent: "center",
  },
  navButton: {
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    height: 40,
    width: 40,
    borderRadius: 8,
  },
  container: {
    flex: 0.92,
    marginHorizontal: 20,
    alignItems: "center",
  },
});
