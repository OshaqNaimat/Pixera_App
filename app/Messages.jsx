import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import BottomNavbar from "./BottomNavbar";
import { router } from "expo-router";

// Backend API
const USERS_API = "http://192.168.100.127:5000/api/users/get-all-users";

const MessagesPage = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users only when there's search text
  const filteredUsers = searchText.trim()
    ? users.filter(
        (user) =>
          (user.username || "")
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          (user.fullName || user.name || "")
            .toLowerCase()
            .includes(searchText.toLowerCase()),
      )
    : [];

  const renderUserItem = ({ item }) => {
    const imageUrl =
      item.profilePic ||
      "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_user_personalization&w=740&q=80";

    // Highlight matching parts of username
    let usernameDisplay = item.username || "";

    if (searchText.trim() && item.username) {
      const regex = new RegExp(`(${searchText})`, "gi");
      usernameDisplay = item.username.split(regex).map((part, index) =>
        regex.test(part) ? (
          <View key={index} style={styles.highlightWrapper}>
            <Text style={styles.highlightText}>{part}</Text>
          </View>
        ) : (
          <Text key={index}>{part}</Text>
        ),
      );
    }

    return (
      <TouchableOpacity
        style={styles.messageItem}
        onPress={() => {
          router.push({
            pathname: "/SingleChat",
            params: { userId: item._id, username: item.username },
          });
        }}
      >
        <View style={styles.avatarContainer}>
          <Image source={{ uri: imageUrl }} style={styles.avatar} />
        </View>

        <View style={styles.messageContent}>
          <Text style={styles.username} numberOfLines={1} ellipsizeMode="tail">
            {usernameDisplay}
          </Text>

          <Text style={styles.lastMessage}>
            {item.fullName || item.name || "User"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search users..."
          placeholderTextColor="#8e8e8e"
          value={searchText}
          onChangeText={setSearchText}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      {/* Loading / Content */}
      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : filteredUsers.length === 0 && searchText.trim() ? (
        <View style={styles.centerContainer}>
          <Text style={styles.noResultsText}>No users found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredUsers}
          renderItem={renderUserItem}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      )}

      <BottomNavbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#dbdbdb",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
  },
  searchContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#dbdbdb",
  },
  searchInput: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noResultsText: {
    fontSize: 16,
    color: "#8e8e8e",
  },
  listContainer: {
    paddingBottom: 90, // space for bottom nav
  },
  messageItem: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  avatarContainer: {
    marginRight: 14,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  messageContent: {
    flex: 1,
    justifyContent: "center",
  },
  username: {
    fontSize: 16,
    fontWeight: "600",
    color: "#262626",
  },
  lastMessage: {
    fontSize: 14,
    color: "#8e8e8e",
    marginTop: 2,
  },
  // ── Highlight styles ──
  highlightWrapper: {
    backgroundColor: "#d4f4dd", // light pleasant green
    borderRadius: 4,
    paddingHorizontal: 3,
    paddingVertical: 1,
    marginHorizontal: 1,
  },
  highlightText: {
    color: "#000000", // black text on light green = very readable
    fontWeight: "700",
  },

  // Alternative Instagram-like style (uncomment if preferred):
  /*
  highlightWrapper: {
    backgroundColor: "#34C759",
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  highlightText: {
    color: "#ffffff",
    fontWeight: "600",
  }
  */
});

export default MessagesPage;
