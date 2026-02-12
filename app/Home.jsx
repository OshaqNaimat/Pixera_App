import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import BottomNavbar from "./BottomNavbar";

export default function FeedScreen() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      const userId = "694d59d991bad16b4cb2fead"; // ← keep or change

      const url = `http://192.168.100.127:5000/api/posts/get-post`;
      console.log("Fetching:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      console.log("Status code:", response.status);

      const rawText = await response.text(); // ← get as text first!
      console.log("Raw response (first 400 chars):", rawText.substring(0, 400));

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status} - ${rawText.substring(0, 150)}`,
        );
      }

      // Only try to parse if it looks like JSON
      if (!rawText.trim().startsWith("{") && !rawText.trim().startsWith("[")) {
        throw new Error("Response is not JSON. See raw output above.");
      }

      const data = JSON.parse(rawText);
      console.log("Parsed successfully. Type:", typeof data);

      const postsArray = Array.isArray(data)
        ? data
        : data.posts || data.data || [];
      setPosts(postsArray);
    } catch (err) {
      console.error("Fetch / parse failed:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>𝓟𝓲𝔁𝓮𝓵𝓪</Text>
        <View style={{ flexDirection: "row", gap: 16 }}>
          <TouchableOpacity onPress={() => router.push("/messages")}>
            <Ionicons name="paper-plane-outline" size={26} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/notifications")}>
            <Ionicons name="heart-outline" size={26} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        {loading ? (
          <View style={styles.centerMessage}>
            <ActivityIndicator size="large" color="#000" />
            <Text style={{ marginTop: 12, color: "#555" }}>
              Loading feed...
            </Text>
          </View>
        ) : error ? (
          <View style={styles.centerMessage}>
            <Text
              style={{
                color: "red",
                textAlign: "center",
                paddingHorizontal: 20,
              }}
            >
              {error}
            </Text>
            <TouchableOpacity onPress={fetchPosts} style={{ marginTop: 16 }}>
              <Text style={{ color: "#0066cc", fontWeight: "600" }}>
                Try Again
              </Text>
            </TouchableOpacity>
          </View>
        ) : posts.length === 0 ? (
          <Text style={styles.centerMessage}>No posts found for this user</Text>
        ) : (
          posts.map((post) => (
            <View
              key={post._id || post.id || Math.random()}
              style={styles.postCard}
            >
              {/* User row */}
              <View style={styles.postHeader}>
                <Image
                  source={{
                    uri:
                      post.user?.profilePicture ||
                      post.user?.avatar ||
                      post.avatar ||
                      post.profilePic ||
                      `https://i.pravatar.cc/100?u=${post.user?._id || post.userId || "default"}`,
                  }}
                  style={styles.postUserImage}
                />
                <Text style={styles.postUserName}>
                  {post.user?.username ||
                    post.username ||
                    post.user?.name ||
                    "User"}
                </Text>
                <Ionicons
                  name="ellipsis-horizontal"
                  size={20}
                  style={{ marginLeft: "auto" }}
                />
              </View>

              {/* Main image */}
              <Image
                source={{
                  uri:
                    post.imageUrl ||
                    post.photoUrl ||
                    post.url ||
                    post.image ||
                    post.postImage ||
                    "https://picsum.photos/400/500?random=88",
                }}
                style={styles.postImage}
              />

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

              {/* Likes & caption */}
              <Text style={styles.likes}>
                {post.likesCount || post.likes || post.likeCount || 0} likes
              </Text>

              <Text style={styles.caption}>
                <Text style={{ fontWeight: "700" }}>
                  {post.user?.username || post.username || "User"}{" "}
                </Text>
                {post.caption ||
                  post.description ||
                  post.text ||
                  post.content ||
                  ""}
              </Text>
            </View>
          ))
        )}
      </ScrollView>

      <BottomNavbar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ddd",
  },
  logo: {
    fontSize: 42,
    fontWeight: "bold",
    letterSpacing: -1,
  },
  postCard: {
    marginVertical: 8,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    paddingBottom: 8,
  },
  postUserImage: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 10,
  },
  postUserName: {
    fontWeight: "700",
    fontSize: 15,
  },
  postImage: {
    width: "100%",
    aspectRatio: 1,
  },
  postActions: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  actionIcon: {
    marginRight: 20,
  },
  likes: {
    fontWeight: "700",
    paddingHorizontal: 12,
    marginBottom: 4,
  },
  caption: {
    paddingHorizontal: 12,
    lineHeight: 20,
    marginBottom: 12,
  },
  centerMessage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 400,
    color: "#777",
    fontSize: 16,
  },
});
