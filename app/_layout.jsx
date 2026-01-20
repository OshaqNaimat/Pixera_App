import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="Signup" />
      <Stack.Screen name="Login" />
      <Stack.Screen name="Home" />
      <Stack.Screen name="MarketPlace" />
      <Stack.Screen name="ExploreSection" />
    </Stack>
  );
}
