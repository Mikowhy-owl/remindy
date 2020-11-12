import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Keyboard } from "react-native";
import { RButton, RenderReminders } from "../components";
import firebase from "firebase";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/FontAwesome5";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import moment from "moment";
import { useDispatch } from "react-redux";
import * as actions from "../redux/actions/actions";

interface Props {
  navigation: any;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const This: FC<Props> = (props) => {
  const dispatch = useDispatch();
  const [reminders, setReminders] = useState<any>([]);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();
  let timeInterval: any;

  const signOut = async () => {
    dispatch(actions.setAppIsLoading(true));
    await firebase.auth().signOut();
    dispatch(actions.setUser(null));
    dispatch(actions.setAppIsLoading(false));
  };

  const fetchReminders = async () => {
    await firebase
      .firestore()
      .collection("reminders")
      .orderBy("reminderTime")
      .onSnapshot((querySnapshot) => {
        const documents = querySnapshot.docs;
        setReminders(documents);
      });
  };

  const checkRemindersTime = async () => {
    const remindersRef = firebase.firestore().collection("reminders");
    const data = await remindersRef.get();

    data.forEach(async (item: any) => {
      const actualTime = moment.now();
      const reminderTime = item.data().reminderTime;

      // 172 800 000 is 2 days
      if (actualTime - reminderTime > 172800000) {
        await firebase
          .firestore()
          .collection("reminders")
          .doc(item.id)
          .delete();
      } else if (
        actualTime - reminderTime < 172800000 &&
        actualTime - reminderTime > 0
      ) {
        await firebase
          .firestore()
          .collection("reminders")
          .doc(item.id)
          .set({
            ...item.data(),
            showed: true,
          });
      } else if (reminderTime - actualTime < 30000 && !item.data().showed) {
        await schedulePushNotification(item.data());

        const data = {
          ...item.data(),
          showed: true,
        };

        await firebase
          .firestore()
          .collection("reminders")
          .doc(item.id)
          .set(data);
      }
    });
  };

  const countTime = () => {
    timeInterval = setInterval(() => {
      checkRemindersTime();
    }, 5000);
  };

  useEffect(() => {
    fetchReminders();
    countTime();

    registerForPushNotificationsAsync().then((token: any) => {
      setExpoPushToken(token);
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification: any) => {
        setNotification(notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        // console.log(response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
      clearInterval(timeInterval);
    };
  }, []);

  async function schedulePushNotification(item: any) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "New notification! 🗂",
        body: `${item.reminderText}: ${moment(item.reminderTime).format(
          "hh:mm"
        )}`,
        data: { data: "goes here" },
      },
      trigger: { seconds: 1 },
    });
  }

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      // console.log(token);
    }
    //  else {
    //   alert("Must use physical device for Push Notifications");
    // }

    return token;
  }

  return (
    <Fragment>
      <StatusBar style='dark' />
      <SafeAreaView />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.appName}>|Logo|</Text>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => props.navigation.navigate("newReminder")}
          >
            <Icon name='plus' size={15} color='#fff' />
          </TouchableOpacity>
        </View>
        <ScrollView style={{ flex: 0.8 }} alwaysBounceVertical={false}>
          {reminders.length > 0 ? (
            reminders.map((reminder: any, idx: number) => (
              <RenderReminders
                key={idx}
                id={reminder.id}
                item={reminder.data()}
                navigation={props.navigation}
              />
            ))
          ) : (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text>No reminders</Text>
            </View>
          )}
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <RButton title='Sign out' onPress={signOut} />
      </View>
    </Fragment>
  );
};

export default This;

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
  },
  header: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  appName: {
    fontSize: 30,
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
  footer: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
  },
});
