// App.js
import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons"; // For icons, install expo/vector-icons or react-native-vector-icons

const storiesData = [
  { id: "1", name: "Alice", image: "https://i.pravatar.cc/100?img=1" },
  { id: "2", name: "Bob", image: "https://i.pravatar.cc/100?img=2" },
  { id: "3", name: "Carol", image: "https://i.pravatar.cc/100?img=3" },
  { id: "4", name: "David", image: "https://i.pravatar.cc/100?img=4" },
];

const postsData = [
  {
    id: "1",
    user: "Alice",
    userImage: "https://i.pravatar.cc/100?img=1",
    postImage: "https://picsum.photos/400/400?random=1",
    likes: 120,
    caption: "Beautiful day!",
  },
  {
    id: "2",
    user: "Bob",
    userImage: "https://i.pravatar.cc/100?img=2",
    postImage: "https://picsum.photos/400/400?random=2",
    likes: 200,
    caption: "Love this view!",
  },
];

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>𝓟𝓲𝔁𝓮𝓵𝓪</Text>
        </View>
        <View
          style={{ justifyContent: "center", flexDirection: "row", gap: 10 }}
        >
          <Ionicons name="paper-plane-outline" size={28} />
          <Ionicons name="heart-outline" size={28} />
        </View>
      </View>

      {/* Stories */}

      {/* Feed */}
      <ScrollView>
        {postsData.map((post) => (
          <View key={post.id} style={styles.postCard}>
            {/* Post header */}
            <View style={styles.postHeader}>
              <Image
                source={{ uri: post.userImage }}
                style={styles.postUserImage}
              />
              <Text style={styles.postUserName}>{post.user}</Text>
              <Ionicons
                name="ellipsis-horizontal"
                size={20}
                style={{ marginLeft: "auto" }}
              />
            </View>

            {/* Post image */}
            <Image source={{ uri: post.postImage }} style={styles.postImage} />

            {/* Actions */}
            <View style={styles.postActions}>
              <Ionicons
                name="heart-outline"
                size={28}
                style={styles.actionIcon}
              />
              <Ionicons
                name="chatbubble-outline"
                size={28}
                style={styles.actionIcon}
              />
              <Ionicons
                name="paper-plane-outline"
                size={28}
                style={styles.actionIcon}
              />
            </View>

            {/* Likes */}
            <Text style={styles.likes}>{post.likes} likes</Text>

            {/* Caption */}
            <Text style={styles.caption}>
              <Text style={{ fontWeight: "bold" }}>{post.user} </Text>
              {post.caption}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Bottom navigation */}
      <View style={styles.bottomNav}>
        <Ionicons name="home" size={28} />
        <Ionicons name="search-outline" size={28} />
        <Ionicons name="add-circle-outline" size={28} />
        <Ionicons name="play-outline" size={28} />
        <AntDesign name="shopping-cart" size={24} color="black" />
        <Ionicons name="person-outline" size={28} />
      </View>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 90,
    paddingHorizontal: 15,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  logo: {
    fontSize: 50,
    // textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Helvetica",
    marginVertical: 10,
    // justifyContent: "center",
    margin: "auto",
  },
  storiesContainer: {
    height: 100,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  story: {
    alignItems: "center",
    marginHorizontal: 8,
  },
  storyImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#ff8501",
  },
  storyName: {
    fontSize: 12,
    marginTop: 4,
  },
  postCard: {
    marginVertical: 20,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  postUserImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  postUserName: {
    fontWeight: "bold",
    marginLeft: 10,
    fontSize: 14,
  },
  postImage: {
    width: "100%",
    height: 400,
  },
  postActions: {
    flexDirection: "row",
    padding: 10,
  },
  actionIcon: {
    marginRight: 15,
  },
  likes: {
    fontWeight: "bold",
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  caption: {
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  bottomNav: {
    height: 100,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 0.5,
    borderTopColor: "#ccc",
    marginVertical: 10,
    // overflow: "scroll",
  },
});
