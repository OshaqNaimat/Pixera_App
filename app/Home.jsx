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

      const url = "http://192.168.100.127:5000/api/posts/get-post";
      console.log("Fetching:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      console.log("Status code:", response.status);

      const rawText = await response.text();
      console.log("Raw response (first 400 chars):", rawText.substring(0, 400));

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status} - ${rawText.substring(0, 150)}`,
        );
      }

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

  // Skeleton component for one post
  const SkeletonPost = () => (
    <View style={styles.postCard}>
      {/* Header skeleton */}
      <View style={styles.postHeader}>
        <View style={styles.skeletonAvatar} />
        <View style={styles.skeletonUsername} />
        <View style={styles.skeletonEllipsis} />
      </View>

      {/* Image skeleton */}
      <View style={styles.skeletonPostImage} />

      {/* Actions skeleton */}
      <View style={styles.postActions}>
        <View style={styles.skeletonIcon} />
        <View style={styles.skeletonIcon} />
        <View style={styles.skeletonIcon} />
      </View>

      {/* Likes & caption skeleton */}
      <View style={styles.skeletonLikes} />
      <View style={styles.skeletonCaptionLine} />
      <View style={styles.skeletonCaptionLineShort} />
    </View>
  );

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
          <>
            {/* Show 5 skeleton posts while loading */}
            {Array.from({ length: 5 }).map((_, index) => (
              <SkeletonPost key={`skeleton-${index}`} />
            ))}
          </>
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
          <Text style={styles.centerMessage}>No posts yet</Text>
        ) : (
          posts.map((post) => (
            <View
              key={post._id || post.id || Math.random()}
              style={styles.postCard}
            >
              {/* User row */}
              <View style={styles.postHeader}>
                <TouchableOpacity
                  style={styles.GoProfile}
                  onPress={() => router.push(`/Profile`)}
                >
                  <Image
                    source={{
                      uri:
                        post.user_id?.image || // your backend field for profile pic
                        post.user?.profilePicture || // alternative field names
                        post.user?.avatar ||
                        post.user?.image ||
                        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_wordcount_boost&w=740&q=80",
                    }}
                    style={styles.postUserImage}
                    defaultSource={{
                      // ← fallback while loading or if uri fails
                      uri: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_wordcount_boost&w=740&q=80",
                    }}
                  />

                  <Text style={styles.postUserName}>
                    {post.user_id?.username ||
                      post.user?.username ||
                      post.username ||
                      "User"}
                  </Text>
                </TouchableOpacity>

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
                    post.image ||
                    post.imageUrl ||
                    post.photoUrl ||
                    post.url ||
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
                  {post.user_id?.username ||
                    post.user?.username ||
                    post.username ||
                    "User"}{" "}
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
    backgroundColor: "#fff",
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

  // ─── Skeleton styles ────────────────────────────────────────
  skeletonAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#e0e0e0",
    marginRight: 10,
  },
  skeletonUsername: {
    width: 120,
    height: 16,
    borderRadius: 4,
    backgroundColor: "#e0e0e0",
  },
  skeletonEllipsis: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
    marginLeft: "auto",
  },
  skeletonPostImage: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#e0e0e0",
  },
  skeletonIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#e0e0e0",
    marginRight: 20,
  },
  skeletonLikes: {
    width: 80,
    height: 16,
    borderRadius: 4,
    backgroundColor: "#e0e0e0",
    marginLeft: 12,
    marginBottom: 8,
  },
  skeletonCaptionLine: {
    width: "85%",
    height: 14,
    borderRadius: 4,
    backgroundColor: "#e0e0e0",
    marginLeft: 12,
    marginBottom: 6,
  },
  skeletonCaptionLineShort: {
    width: "60%",
    height: 14,
    borderRadius: 4,
    backgroundColor: "#e0e0e0",
    marginLeft: 12,
    marginBottom: 12,
  },
  GoProfile: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
