import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from "react-native";
import BottomNavbar from "./BottomNavbar";
import { Foundation } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      try {
        // Get logged-in user
        const storedUser = await AsyncStorage.getItem("user");
        if (!storedUser) {
          router.replace("/login");
          return;
        }

        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        // Fetch only THIS user's posts
        const res = await axios.get(
          `http://192.168.100.127:5000/relaventPosts/${parsedUser._id}`,
          // or → `http://192.168.100.127:5000/posts/user/${parsedUser._id}`
          // choose whichever route you actually created/implemented
        );

        setUserPosts(res.data || []);
      } catch (error) {
        console.log("Error loading profile/posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndPosts();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={{ paddingBottom: 70 }}
      >
        {/* Profile Header - unchanged */}
        <View style={styles.header}>
          <Image
            style={styles.profileImage}
            source={{ uri: "https://picsum.photos/100" }}
          />

          <View style={styles.userInfo}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.username}>
                {user ? user.username || user.mobile : "Loading..."}
              </Text>
            </View>

            <View style={styles.stats}>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>{userPosts.length}</Text>
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
            onPress={async () => {
              await AsyncStorage.removeItem("user");
              router.replace("/");
            }}
          >
            <Foundation
              name="list"
              size={25}
              color="black"
              style={{ marginBottom: 50, position: "relative" }}
            />
          </Pressable>
        </View>

        {/* following and message - unchanged */}
        <View style={styles.followmessage}>
          <Pressable
            style={isFollowing ? styles.followActive : styles.follow}
            onPress={() => setIsFollowing(!isFollowing)}
          >
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>
              {isFollowing ? "Following" : "Follow"}
            </Text>
          </Pressable>

          <Text style={styles.message}>Message</Text>
        </View>

        {/* Bio - unchanged */}
        <View style={styles.bio}>
          <Text style={{ fontWeight: "bold" }}>
            {user ? user.fullName || "Full Name" : "Loading..."}
          </Text>
          <Text>Just a simple React Native profile page.</Text>
        </View>

        {/* Posts grid - this is the only changed part */}
        {userPosts.length === 0 ? (
          <View
            style={{
              marginTop: 40,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 18, color: "#888" }}>No posts yet</Text>
          </View>
        ) : (
          <FlatList
            data={userPosts}
            keyExtractor={(item) => item._id}
            numColumns={3}
            renderItem={({ item }) => (
              <Image source={{ uri: item.image }} style={styles.postImage} />
            )}
            scrollEnabled={false}
            style={{ marginTop: 10 }}
          />
        )}
      </ScrollView>

      {/* Sticky Bottom Navbar - unchanged */}
      <View style={styles.bottomNavbar}>
        <BottomNavbar />
      </View>
    </View>
  );
};

export default ProfilePage;

// ──────────────────────────────────────────────
// Your existing styles remain 100% unchanged
const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
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
  followmessage: {
    flexDirection: "row",
    width: "100%",
    gap: 5,
    padding: 10,
    marginVertical: 5,
  },
  follow: {
    backgroundColor: "cyan",
    borderRadius: 10,
    padding: 10,
    width: "50%",
    textAlign: "center",
    fontWeight: "bold",
  },
  followActive: {
    backgroundColor: "#909090",
    borderRadius: 10,
    padding: 10,
    width: "50%",
    textAlign: "center",
    fontWeight: "bold",
  },
  message: {
    backgroundColor: "#909090",
    borderRadius: 10,
    padding: 10,
    width: "50%",
    textAlign: "center",
    fontWeight: "bold",
  },
  bottomNavbar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
