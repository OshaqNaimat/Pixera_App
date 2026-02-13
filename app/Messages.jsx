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
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // ================= FILTER USERS =================
  const filteredUsers =
    searchText.trim() === ""
      ? [] // no users initially
      : users.filter(
          (user) =>
            user.username?.toLowerCase().includes(searchText.toLowerCase()) ||
            user.fullName?.toLowerCase().includes(searchText.toLowerCase()) ||
            user.name?.toLowerCase().includes(searchText.toLowerCase()),
        );

  // ================= RENDER EACH USER =================
  const renderUserItem = ({ item }) => {
    const imageUrl =
      item.profilePic ||
      "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_user_personalization&w=740&q=80";

    // Highlight search text in username
    const usernameParts = item.username
      ?.split(new RegExp(`(${searchText})`, "gi"))
      .map((part, i) =>
        part.toLowerCase() === searchText.toLowerCase() ? (
          <Text key={i} style={styles.usernameHighlightBg}>
            {part}
          </Text>
        ) : (
          <Text key={i}>{part}</Text>
        ),
      );

    return (
      <TouchableOpacity
        key={item._id}
        style={styles.messageItem}
        onPress={() => {
          // Navigate to SingleChat with userId and username
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
          <Text style={styles.username}>{usernameParts}</Text>
          <Text style={styles.lastMessage}>{item.fullName || item.name}</Text>
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

      {/* Users List */}
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : filteredUsers.length === 0 && searchText.trim() !== "" ? (
        <Text style={{ textAlign: "center", marginTop: 40 }}>
          No users found
        </Text>
      ) : (
        <FlatList
          data={filteredUsers}
          renderItem={renderUserItem}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {/* Bottom Navigation */}
      <BottomNavbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#dbdbdb",
  },
  headerTitle: { fontSize: 28, fontWeight: "bold" },
  searchContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#dbdbdb",
  },
  searchInput: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
  },
  listContainer: { paddingBottom: 80 },
  messageItem: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  avatarContainer: { marginRight: 12 },
  avatar: { width: 60, height: 60, borderRadius: 30 },
  messageContent: { flex: 1, justifyContent: "center" },
  username: { fontSize: 16, fontWeight: "600", color: "#262626" },
  lastMessage: { fontSize: 14, color: "#8e8e8e", marginTop: 2 },
  usernameHighlightBg: {
    backgroundColor: "#0bbd54",
    color: "#fff",
    fontWeight: "bold",
    paddingHorizontal: 4,
    borderRadius: 4,
  },
});

export default MessagesPage;
