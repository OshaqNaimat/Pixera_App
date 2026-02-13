import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import BottomNavbar from "./BottomNavbar";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = (width - 33) / 3;

const API_URL = "http://192.168.100.127:5000/api/posts/get-post";
const USERS_API = "http://192.168.100.127:5000/api/users/get-all-users";

const SimpleGridLayout = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigation = useNavigation();

  // ================= FETCH POSTS =================
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const postArray = Array.isArray(data)
          ? data
          : data.posts || data.data || [];

        setPosts(postArray);
      } catch (err) {
        console.error("Posts fetch error:", err);
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // ================= FETCH USERS =================
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(USERS_API);
        const data = await response.json();

        const userArray = Array.isArray(data)
          ? data
          : data.users || data.allUsers || data.data || [];

        setUsers(userArray);
      } catch (err) {
        console.error("Users fetch error:", err);
      }
    };

    fetchUsers();
  }, []);

  // ================= FILTER USERS =================
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredUsers([]);
      return;
    }

    const filtered = users.filter((item) =>
      item.username?.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredUsers(filtered);
  }, [search, users]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#000" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* ================= SEARCH BAR ================= */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search users..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.gridContainer}>
          {/* ================= WHEN SEARCHING → SHOW USERS ================= */}
          {search.trim() !== "" ? (
            filteredUsers.length === 0 ? (
              <Text style={{ textAlign: "center", marginTop: 40 }}>
                No users found
              </Text>
            ) : (
              <View style={{ paddingHorizontal: 16, paddingTop: 10 }}>
                {filteredUsers.map((user, index) => {
                  const imageUrl =
                    user.profilePic ||
                    "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_user_personalization&w=740&q=80";

                  // Highlight search text in username
                  const usernameParts = user.username
                    ?.split(new RegExp(`(${search})`, "gi"))
                    .map((part, i) => {
                      if (part.toLowerCase() === search.toLowerCase()) {
                        return (
                          <Text key={i} style={styles.usernameHighlightBg}>
                            {part}
                          </Text>
                        );
                      } else {
                        return <Text key={i}>{part}</Text>;
                      }
                    });

                  return (
                    <TouchableOpacity
                      key={user._id || index}
                      style={styles.userItem}
                      onPress={
                        () =>
                          navigation.navigate("Profile", { clickedUser: user }) // pass full user object
                      }
                    >
                      <Image
                        source={{ uri: imageUrl }}
                        style={styles.userImage}
                      />

                      <View
                        style={{ marginLeft: 12, justifyContent: "center" }}
                      >
                        <Text style={styles.username}>{usernameParts}</Text>
                        <Text style={styles.fullname}>
                          {user.fullName || user.name || ""}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )
          ) : (
            /* ================= DEFAULT → SHOW POSTS ================= */
            posts.map((post, index) => {
              const imageUrl =
                post.imageUrl || post.image || post.photo || post.url;

              if (!imageUrl) return null;

              return (
                <TouchableOpacity
                  key={post._id || index}
                  style={[
                    styles.gridItem,
                    index % 3 === 1 && styles.middleItem,
                  ]}
                  onPress={() =>
                    navigation.navigate("Reels", {
                      posts: posts,
                      initialIndex: index,
                    })
                  }
                >
                  <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              );
            })
          )}
        </View>
      </ScrollView>

      <BottomNavbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 30,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  searchInput: {
    height: 40,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#333",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 8,
  },
  gridItem: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    marginBottom: 5,
  },
  middleItem: {
    marginHorizontal: 8,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },

  userImage: {
    width: 55,
    height: 55,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  username: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },

  usernameHighlight: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#0bbd54", // green highlight
  },

  fullname: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  usernameHighlightBg: {
    backgroundColor: "", // green background
    color: "#fff", // white text
    fontWeight: "bold",
    paddingHorizontal: 4,
    borderRadius: 4,
  },
});

export default SimpleGridLayout;
