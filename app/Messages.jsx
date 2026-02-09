import React, { useState } from "react";
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
} from "react-native";
import BottomNavbar from "./BottomNavbar";

const MessagesPage = () => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      username: "alex_johnson",
      name: "Alex Johnson",
      lastMessage: "Check out my new post!",
      time: "2m ago",
      unread: true,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: "2",
      username: "sarah_williams",
      name: "Sarah Williams",
      lastMessage: "Thanks for the follow!",
      time: "1h ago",
      unread: false,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: "3",
      username: "mike_chen",
      name: "Mike Chen",
      lastMessage: "See you tomorrow!",
      time: "3h ago",
      unread: true,
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    },
    {
      id: "4",
      username: "emma_davis",
      name: "Emma Davis",
      lastMessage: "❤️ your latest photo",
      time: "6h ago",
      unread: false,
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      id: "5",
      username: "david_miller",
      name: "David Miller",
      lastMessage: "Are you coming to the party?",
      time: "1d ago",
      unread: false,
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    },
  ]);

  const [searchText, setSearchText] = useState("");

  const renderMessageItem = ({ item }) => (
    <TouchableOpacity style={styles.messageItem}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        {item.unread && <View style={styles.unreadBadge} />}
      </View>
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <View style={styles.messagePreview}>
          <Text
            style={[styles.lastMessage, item.unread && styles.unreadMessage]}
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>
          {item.unread && <View style={styles.unreadDot} />}
        </View>
      </View>
    </TouchableOpacity>
  );

  const filteredMessages = messages.filter(
    (item) =>
      item.username.toLowerCase().includes(searchText.toLowerCase()) ||
      item.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Messages</Text>
          <TouchableOpacity style={styles.requestButton}>
            {/* <Text style={styles.requestButtonText}>Requests</Text> */}
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          {/* <Text style={styles.newMessage}>✏️</Text> */}
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#8e8e8e"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Messages List */}
      <FlatList
        data={filteredMessages}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

      {/* Bottom Navigation */}
      {/* <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🔍</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>➕</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={[styles.navIcon, styles.activeNavIcon]}>💬</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>👤</Text>
        </TouchableOpacity>
      </View> */}
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#dbdbdb",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginRight: 15,
  },
  // requestButton: {
  //   backgroundColor: "#f0f0f0",
  //   paddingHorizontal: 12,
  //   paddingVertical: 6,
  //   borderRadius: 20,
  // },
  requestButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#262626",
  },
  newMessage: {
    fontSize: 24,
  },
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
  listContainer: {
    paddingBottom: 80,
  },
  messageItem: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  avatarContainer: {
    position: "relative",
    marginRight: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  unreadBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#0095f6",
    borderWidth: 2,
    borderColor: "#fff",
  },
  messageContent: {
    flex: 1,
    justifyContent: "center",
  },
  messageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    fontWeight: "600",
    color: "#262626",
  },
  time: {
    fontSize: 13,
    color: "#8e8e8e",
  },
  messagePreview: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  lastMessage: {
    fontSize: 15,
    color: "#8e8e8e",
    flex: 1,
  },
  unreadMessage: {
    color: "#262626",
    fontWeight: "500",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#0095f6",
    marginLeft: 8,
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#dbdbdb",
    backgroundColor: "#fff",
  },
  navItem: {
    alignItems: "center",
  },
  navIcon: {
    fontSize: 24,
    opacity: 0.5,
  },
  activeNavIcon: {
    opacity: 1,
  },
});

export default MessagesPage;
