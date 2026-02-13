// ReelsViewer.js
import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Video from "react-native-video"; // npm install react-native-video

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const ReelsViewer = ({ route, navigation }) => {
  const { posts, initialIndex = 0 } = route.params || {};
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 70, // trigger when 70% visible
  });

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const visibleIndex = viewableItems[0].index;
      setCurrentIndex(visibleIndex);
    }
  }).current;

  const renderItem = ({ item, index }) => {
    const isVideo = item.videoUrl || item.type === "video"; // adjust field name
    const mediaUrl = item.videoUrl || item.imageUrl || item.url || "";

    return (
      <View style={styles.fullScreenItem}>
        {isVideo ? (
          <Video
            source={{ uri: mediaUrl }}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
            repeat
            paused={index !== currentIndex}
            muted={false} // or add toggle later
            onError={(e) => console.log("Video error:", e)}
          />
        ) : (
          <Image
            source={{ uri: mediaUrl }}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
          />
        )}

        {/* Overlay UI - like Instagram */}
        <View style={styles.overlay}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ color: "white", fontSize: 24 }}>×</Text>
          </TouchableOpacity>

          <View style={styles.bottomInfo}>
            <Text style={styles.username}>@{item.username || "user"}</Text>
            <Text style={styles.caption} numberOfLines={2}>
              {item.caption || ""}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  if (!posts || posts.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No posts available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item, idx) => item.id?.toString() || idx.toString()}
        pagingEnabled
        snapToInterval={SCREEN_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        initialScrollIndex={initialIndex}
        getItemLayout={(data, index) => ({
          length: SCREEN_HEIGHT,
          offset: SCREEN_HEIGHT * index,
          index,
        })}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig.current}
        removeClippedSubviews // performance
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  fullScreenItem: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
    padding: 20,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
  bottomInfo: {
    position: "absolute",
    bottom: 60,
    left: 20,
    right: 20,
  },
  username: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8,
  },
  caption: {
    color: "white",
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});

export default ReelsViewer;
