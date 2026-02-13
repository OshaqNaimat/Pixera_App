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
} from "react-native";
import BottomNavbar from "./BottomNavbar";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = (width - 33) / 3; // ≈108px on most phones

const API_URL = "http://192.168.18.77:5000/api/posts/get-post";

const SimpleGridLayout = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }

        const data = await response.json();

        // Adjust this line depending on your actual API response shape
        // Examples:
        //   setPosts(data);                      // if array directly
        //   setPosts(data.posts);                // if { posts: [...] }
        //   setPosts(data.data);                 // if { data: [...] }
        setPosts(Array.isArray(data) ? data : data.posts || data.data || []);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Optional: refresh when coming back to screen (if using react-navigation)
  // useFocusEffect(useCallback(() => { fetchPosts(); }, []));

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#000" />
          <Text style={{ marginTop: 16 }}>Loading posts...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Text style={{ color: "red", textAlign: "center" }}>
            Error: {error}
          </Text>
          <Text style={{ marginTop: 8, color: "#666" }}>
            Make sure your backend server is running at {API_URL}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#999"
        />
      </View>

      {/* Grid Layout */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.gridContainer}>
          {posts.length === 0 ? (
            <Text style={{ textAlign: "center", marginTop: 40, color: "#777" }}>
              No posts found
            </Text>
          ) : (
            posts.map((post, index) => {
              // IMPORTANT: Replace with your actual image field name
              // Common names: post.image, post.imageUrl, post.photo, post.media, post.url, ...
              const imageUrl =
                post.imageUrl || post.image || post.photo || post.url || "";

              if (!imageUrl) return null; // skip items without image

              return (
                <View
                  key={post.id || index} // use real id if available!
                  style={[
                    styles.gridItem,
                    index % 3 === 1 && styles.middleItem,
                  ]}
                >
                  <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </View>
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
    width: ITEM_WIDTH, // better than hard-coded 108
    height: ITEM_WIDTH, // square items
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
});

export default SimpleGridLayout;
