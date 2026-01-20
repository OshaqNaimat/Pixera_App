import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "./store";
// import { store } from "expo-router/build/global-state/router-store";

export default function RootLayout() {
  return (
    // <Provider store={store}>
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="Signup" />
      <Stack.Screen name="Login" />
      <Stack.Screen name="Home" />
      <Stack.Screen name="MarketPlace" />
      <Stack.Screen name="ExploreSection" />
      <Stack.Screen name="Profile" />
      <Stack.Screen name="Messages" />
      <Stack.Screen name="Logout" />
      <Stack.Screen name="Reels" />
      <Stack.Screen name="Upload" />
    </Stack>
    // </Provider>
  );
}
