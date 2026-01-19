import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const index = () => {
  const router = useRouter();
  return (
    <View>
      <TouchableOpacity onPress={() => router.push("/signup")}>
        <Text style={{ fontSize: 50 }}>INDEX</Text>
      </TouchableOpacity>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
