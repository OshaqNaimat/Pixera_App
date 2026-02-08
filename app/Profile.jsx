import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from "react-native";
import BottomNavbar from "./BottomNavbar";
import { Foundation } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const posts = [
  { id: "1", image: "https://picsum.photos/200?1" },
  { id: "2", image: "https://picsum.photos/200?2" },
  { id: "3", image: "https://picsum.photos/200?3" },
  { id: "4", image: "https://picsum.photos/200?4" },
  { id: "5", image: "https://picsum.photos/200?5" },
  { id: "6", image: "https://picsum.photos/200?6" },
  { id: "7", image: "https://picsum.photos/200?6" },
  { id: "8", image: "https://picsum.photos/200?6" },
  { id: "9", image: "https://picsum.photos/200?6" },
  { id: "10", image: "https://picsum.photos/200?6" },
  { id: "11", image: "https://picsum.photos/200?6" },
  { id: "12", image: "https://picsum.photos/200?6" },
  { id: "13", image: "https://picsum.photos/200?6" },
];

const ProfilePage = () => {
  const [logout, setLogout] = useState(false);

  const getData = async () => {
    try {
      const response = await axios.get("http://192.168.18.82:5000/test");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(AsyncStorage.getItem("user"));

  return (
    <View style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={{ paddingBottom: 70 }}
      >
        {/* Profile Header */}
        <View style={styles.header}>
          <Image
            style={styles.profileImage}
            source={{ uri: "https://picsum.photos/100" }}
          />
          <View style={styles.userInfo}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.username}>username</Text>
            </View>
            <View style={styles.stats}>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>123</Text>
                <Text style={styles.statLabel}>Posts</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>456k</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>789</Text>
                <Text style={styles.statLabel}>Following</Text>
              </View>
            </View>
          </View>
          <Pressable
            onPress={() => {
              AsyncStorage.removeItem("user");
              router.push("/");
            }}
          >
            <Foundation
              name="list"
              size={25}
              color="black"
              style={{ marginBottom: 50, position: "relative" }}
            />
          </Pressable>

          {logout && (
            <Pressable style={styles.overlay} onPress={() => setLogout(false)}>
              <Pressable
                style={styles.popup}
                onPress={(e) => e.stopPropagation()}
              >
                <Text>Logout</Text>
              </Pressable>
            </Pressable>
          )}
        </View>

        {/* Bio */}
        <View style={styles.bio}>
          <Text style={{ fontWeight: "bold" }}>Full Name</Text>
          <Text>Just a simple React Native profile page.</Text>
        </View>

        {/* Posts */}
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          numColumns={3}
          renderItem={({ item }) => (
            <Image source={{ uri: item.image }} style={styles.postImage} />
          )}
          scrollEnabled={false} // Disable FlatList scroll, ScrollView handles it
          style={{ marginTop: 10 }}
        />
      </ScrollView>

      {/* Sticky Bottom Navbar */}
      <View style={styles.bottomNavbar}>
        <BottomNavbar />
      </View>
    </View>
  );
};

export default function App() {
  return <ProfilePage />;
}

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  userInfo: {
    flex: 1,
    marginLeft: 15,
  },
  username: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  stat: {
    alignItems: "center",
  },
  statNumber: {
    fontWeight: "bold",
    fontSize: 16,
  },
  statLabel: {
    color: "gray",
  },
  bio: {
    paddingHorizontal: 15,
  },
  postImage: {
    width: windowWidth / 3,
    height: windowWidth / 3,
    borderWidth: 1,
    borderColor: "#fff",
  },
  //   bottomNavbar: {
  //     position: "absolute",
  //     bottom: 0,
  //     left: 0,
  //     right: 0,
  //     height: 60,
  //     backgroundColor: "#fff",
  //     borderTopWidth: 1,
  //     borderTopColor: "#ddd",
  //   },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  popup: {
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 25,
    right: 12,
    padding: 15,
    borderRadius: 10,
    elevation: 6,
  },
});
