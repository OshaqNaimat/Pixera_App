import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import LoginScreen from "./Login";

const index = () => {
  const router = useRouter();
  return (
    <>
      {/* <LoginScreen /> */}
      <View>
        <TouchableOpacity onPress={() => router.push("/Home")}>
          <Text style={{ fontSize: 50, textAlign: "center" }}>Home</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default index;

const styles = StyleSheet.create({});
