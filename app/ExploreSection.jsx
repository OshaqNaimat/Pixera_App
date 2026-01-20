import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TextInput,
} from "react-native";
import BottomNavbar from "./BottomNavbar";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = (width - 33) / 3; // 3 items per row with 8px gap each side

const SimpleGridLayout = () => {
  // Dummy image URLs
  const images = [
    "https://picsum.photos/300/300?random=1",
    "https://picsum.photos/300/300?random=2",
    "https://picsum.photos/300/300?random=3",
    "https://picsum.photos/300/300?random=4",
    "https://picsum.photos/300/300?random=5",
    "https://picsum.photos/300/300?random=6",
    "https://picsum.photos/300/300?random=7",
    "https://picsum.photos/300/300?random=8",
    "https://picsum.photos/300/300?random=9",
    "https://picsum.photos/300/300?random=10",
    "https://picsum.photos/300/300?random=11",
    "https://picsum.photos/300/300?random=12",
    "https://picsum.photos/300/300?random=12",
    "https://picsum.photos/300/300?random=12",
    "https://picsum.photos/300/300?random=12",
    "https://picsum.photos/300/300?random=12",
    "https://picsum.photos/300/300?random=12",
    "https://picsum.photos/300/300?random=12",
    "https://picsum.photos/300/300?random=12",
    "https://picsum.photos/300/300?random=12",
  ];

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
          {images.map((imageUrl, index) => (
            <View
              key={index}
              style={[styles.gridItem, index % 3 === 1 && styles.middleItem]}
            >
              <Image source={{ uri: imageUrl }} style={styles.image} />
            </View>
          ))}
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
    width: 108,
    height: 109,
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
