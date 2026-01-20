import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const BottomNavbar = () => {
  return (
    <View style={styles.bottomNav}>
      {/* Home page */}
      <TouchableOpacity onPress={() => router.push("/Home")}>
        <Ionicons name="home" size={28} />
      </TouchableOpacity>
      {/* Explore and search */}
      <TouchableOpacity onPress={() => router.push("/ExploreSection")}>
        <Ionicons name="search-outline" size={28} />
      </TouchableOpacity>
      <Ionicons name="add-circle-outline" size={28} />
      <Ionicons name="play-outline" size={28} />
      {/* market place */}
      <TouchableOpacity onPress={() => router.push("/MarketPlace")}>
        <AntDesign name="shopping-cart" size={24} color="black" />
      </TouchableOpacity>
      {/* profile page */}
      <TouchableOpacity onPress={() => router.push("/Profile")}>
        <Ionicons name="person-outline" size={28} />
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavbar;

const styles = StyleSheet.create({
  bottomNav: {
    height: 100,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    // borderTopWidth: 0.5,
    borderTopColor: "#ccc",
    marginVertical: 10,
    position: "fixed",
    bottom: 0,
  },
});
