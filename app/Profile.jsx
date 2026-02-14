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
  TouchableOpacity,
} from "react-native";
import BottomNavbar from "./BottomNavbar";
import { Foundation } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute, useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

const windowWidth = Dimensions.get("window").width;

const ProfilePage = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { clickedUser } = route.params || {};

  const [user, setUser] = useState(null); // Profile being viewed
  const [loggedInUser, setLoggedInUser] = useState(null); // Current logged-in user
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      try {
        // Get logged-in user
        const storedUser = await AsyncStorage.getItem("user");
        if (!storedUser) {
          navigation.replace("/login");
          return;
        }
        const parsedLoggedInUser = JSON.parse(storedUser);
        setLoggedInUser(parsedLoggedInUser);

        // Decide which profile to show
        const userToShow = clickedUser || parsedLoggedInUser;
        setUser(userToShow);

        // Fetch posts for this profile
        const res = await axios.get(
          `http://192.168.100.127:5000/api/posts/relaventPosts/${userToShow._id}`,
        );
        setUserPosts(res.data || []);
      } catch (error) {
        console.log("Error loading profile/posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndPosts();
  }, [clickedUser]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>User not found</Text>
      </View>
    );
  }

  const profilePic =
    user.profilePic ||
    "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_user_personalization&w=740&q=80";

  // Determine if this profile is the logged-in user
  const isOwnProfile = loggedInUser?._id === user._id;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={{ paddingBottom: 70 }}
      >
        {/* Profile Header */}
        <View style={styles.header}>
          <Image style={styles.profileImage} source={{ uri: profilePic }} />

          <View style={styles.userInfo}>
            <Text style={styles.username}>{user.username || user.mobile}</Text>

            <View style={styles.stats}>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>{userPosts.length}</Text>
                <Text style={styles.statLabel}>Posts</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>{followersCount}</Text>
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
              navigation.replace("/");
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

        {/* Buttons */}
        <View style={styles.followmessage}>
          {isOwnProfile ? (
            <TouchableOpacity
              style={styles.editProfile}
              onPress={() => router.push("/Edit_Profile")}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                Edit Profile
              </Text>
            </TouchableOpacity>
          ) : (
            <>
              <Pressable
                style={isFollowing ? styles.followActive : styles.follow}
                onPress={() => {
                  if (isOwnProfile) return; // 🚨 prevent self-follow

                  if (isFollowing) {
                    setFollowersCount((prev) => Math.max(prev - 1, 0));
                  } else {
                    setFollowersCount((prev) => prev + 1);
                  }

                  setIsFollowing(!isFollowing);
                }}
              >
                <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                  {isFollowing ? "Following" : "Follow"}
                </Text>
              </Pressable>

              <TouchableOpacity
                style={styles.message}
                onPress={() =>
                  navigation.navigate("SingleChat", { clickedUser: user })
                }
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                >
                  Message
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Bio */}
        <View style={styles.bio}>
          <Text style={{ fontWeight: "bold" }}>
            {user.fullName || "Full Name"}
          </Text>
        </View>

        {/* Posts */}
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

      {/* Bottom Navbar */}
      <View style={styles.bottomNavbar}>
        <BottomNavbar />
      </View>
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
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
    gap: 10,
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
  editProfile: {
    backgroundColor: "#0095f6",
    borderRadius: 10,
    padding: 10,
    width: "100%",
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
