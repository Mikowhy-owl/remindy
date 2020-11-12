import React, { FC, useState } from "react";
import { View, Text, Alert, StyleSheet, SafeAreaView } from "react-native";
import { RButton, DateTime, Input } from "../components";
import firebase from "firebase";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome5";

interface Props {
  navigation: any;
  item: any;
  route: any;
}

const This: FC<Props> = (props) => {
  const [reminderText, setReminderText] = useState<string>(
    props.route.params.item.reminderText
  );
  const [reminderTime, setReminderTime] = useState<any>(
    props.route.params.item.reminderTime
  );

  const editReminder = async () => {
    if (reminderText) {
      const data = {
        reminderText,
        dateUpdated: Date.now(),
        reminderTime,
      };
      try {
        await firebase
          .firestore()
          .collection("reminders")
          .doc(props.route.params.id)
          .set(data);
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
    setReminderTime(currentDate.getTime());
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
          <Text style={{ fontSize: 25 }}>Edit reminder</Text>
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
        <RButton title='Update' onPress={editReminder} />
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
