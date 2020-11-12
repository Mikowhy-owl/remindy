import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home, NewReminder, EditReminder } from "../screens";
const { Navigator, Screen } = createStackNavigator();

const AppStack: FC = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='home' component={Home} />
      <Screen name='newReminder' component={NewReminder} />
      <Screen name='editReminder' component={EditReminder} />
    </Navigator>
  );
};

export default AppStack;
