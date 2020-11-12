import React from "react";
import "./src/constants/firebase";
import MainNav from "./src/navigation/mainNav";
import { Provider } from "react-redux";

import store from "./src/redux/store";

const ReduxWrapper = () => (
  <Provider store={store}>
    <MainNav />
  </Provider>
);

export default function App() {
  return <ReduxWrapper />;
}
