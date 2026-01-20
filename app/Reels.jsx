import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  Easing,
} from "react-native";

const { width, height } = Dimensions.get("window");

const InstagramReels = () => {
  //   const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [likedReels, setLikedReels] = useState({});
  const [followingUsers, setFollowingUsers] = useState({});
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Reels data
  const reelsData = [
    {
      id: "1",
      username: "john_doe",
      caption: "Beautiful sunset at the beach 🌅 #sunset #beach #vacation",
      likes: "12.5k",
      comments: "245",
      shares: "89",
      music: "Original Audio - john_doe",
      isFollowing: true,
      videoUrl: "https://picsum.photos/400/800?random=1",
      userAvatar: "https://picsum.photos/50?random=1",
    },
    {
      id: "2",
      username: "travel_guru",
      caption:
        "Mountain adventures in Switzerland 🏔️ #travel #adventure #mountains",
      likes: "45.2k",
      comments: "1.2k",
      shares: "345",
      music: "Nature Sounds - Peaceful",
      isFollowing: false,
      videoUrl: "https://picsum.photos/400/800?random=2",
      userAvatar: "https://picsum.photos/50?random=2",
    },
    {
      id: "3",
      username: "fitness_freak",
      caption: "Morning workout routine 💪 #fitness #workout #gym",
      likes: "23.7k",
      comments: "890",
      shares: "156",
      music: "Workout Mix - Energy Boost",
      isFollowing: false,
      videoUrl: "https://picsum.photos/400/800?random=3",
      userAvatar: "https://picsum.photos/50?random=3",
    },
    {
      id: "4",
      username: "foodie_queen",
      caption: "Homemade pasta from scratch! 🍝 #food #cooking #recipe",
      likes: "18.9k",
      comments: "567",
      shares: "234",
      music: "Italian Kitchen Vibes",
      isFollowing: true,
      videoUrl: "https://picsum.photos/400/800?random=4",
      userAvatar: "https://picsum.photos/50?random=4",
    },
    {
      id: "5",
      username: "art_lover",
      caption: "Creating my latest painting 🎨 #art #painting #creative",
      likes: "32.1k",
      comments: "1.5k",
      shares: "456",
      music: "Creative Process - LoFi",
      isFollowing: false,
      videoUrl: "https://picsum.photos/400/800?random=5",
      userAvatar: "https://picsum.photos/50?random=5",
    },
  ];

  const handleLike = (reelId) => {
    setLikedReels((prev) => ({
      ...prev,
      [reelId]: !prev[reelId],
    }));

    // Heart animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleFollow = (username) => {
    setFollowingUsers((prev) => ({
      ...prev,
      [username]: !prev[username],
    }));
  };

  const renderReel = ({ item, index }) => {
    const isLiked = likedReels[item.id];
    const isFollowing =
      followingUsers[item.username] !== undefined
        ? followingUsers[item.username]
        : item.isFollowing;

    return (
      <View style={styles.reelContainer}>
        {/* Video/Image placeholder */}
        <Image source={{ uri: item.videoUrl }} style={styles.video} />

        {/* Dark overlay gradient */}
        {/* <View style={styles.gradientOverlay} /> */}

        {/* Top Bar */}
        <View style={styles.topBar}>
          <Text style={styles.reelsText}>Reels</Text>
        </View>

        {/* Left Side - User Info & Caption */}
        <View style={styles.leftContainer}>
          {/* User Info */}
          <View style={styles.userContainer}>
            <Image source={{ uri: item.userAvatar }} style={styles.avatar} />
            <Text style={styles.username}>@{item.username}</Text>
            <TouchableOpacity
              style={[
                styles.followButton,
                isFollowing && styles.followingButton,
              ]}
              onPress={() => handleFollow(item.username)}
            >
              <Text
                style={[styles.followText, isFollowing && styles.followingText]}
              >
                {isFollowing ? "Following" : "Follow"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Caption */}
          <Text style={styles.caption} numberOfLines={3}>
            {item.caption}
          </Text>

          {/* Music */}
          <View style={styles.musicContainer}>
            <Text style={styles.musicIcon}>🎵</Text>
            <Text style={styles.musicText}>{item.music}</Text>
          </View>
        </View>

        {/* Right Side - Action Buttons */}
        <View style={styles.rightContainer}>
          {/* Like Button */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleLike(item.id)}
          >
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <Text style={styles.actionIcon}>{isLiked ? "❤️" : "🤍"}</Text>
            </Animated.View>
            <Text style={styles.actionCount}>{item.likes}</Text>
          </TouchableOpacity>

          {/* Comment Button */}
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>💬</Text>
            <Text style={styles.actionCount}>{item.comments}</Text>
          </TouchableOpacity>

          {/* Share Button */}
          {/* <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>🔄</Text>
            <Text style={styles.actionCount}>{item.shares}</Text>
          </TouchableOpacity> */}

          {/* More Options */}
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>⋯</Text>
          </TouchableOpacity>

          {/* Album Icon */}
          <View style={styles.albumContainer}>
            <Image
              source={{ uri: item.userAvatar }}
              style={styles.albumImage}
            />
          </View>
        </View>

        {/* Bottom Progress Bar */}
        <View style={styles.progressBarContainer}>
          {reelsData.map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.progressBar,
                idx === index && styles.activeProgressBar,
                idx < index && styles.watchedProgressBar,
              ]}
            />
          ))}
        </View>
      </View>
    );
  };

  //   const handleViewableItemsChanged = useRef(({ viewableItems }) => {
  //     if (viewableItems.length > 0) {
  //       setCurrentReelIndex(viewableItems[0].index);
  //     }
  //   }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <FlatList
        data={reelsData}
        renderItem={renderReel}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={height}
        snapToAlignment="start"
        // onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  reelContainer: {
    width: width,
    height: height,
    position: "relative",
  },
  video: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  topBar: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    zIndex: 10,
  },
  reelsText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  cameraButton: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 8,
    borderRadius: 20,
  },
  cameraIcon: {
    fontSize: 20,
  },
  leftContainer: {
    position: "absolute",
    bottom: 100,
    left: 15,
    right: 100,
    zIndex: 10,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#fff",
    marginRight: 10,
  },
  username: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  followButton: {
    backgroundColor: "#0095f6",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
  },
  followingButton: {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  followText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  followingText: {
    color: "#fff",
  },
  caption: {
    color: "#fff",
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 10,
  },
  musicContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  musicIcon: {
    fontSize: 14,
    marginRight: 5,
  },
  musicText: {
    color: "#fff",
    fontSize: 14,
    opacity: 0.9,
  },
  rightContainer: {
    position: "absolute",
    right: 15,
    bottom: 150,
    alignItems: "center",
    zIndex: 10,
  },
  actionButton: {
    alignItems: "center",
    marginBottom: 25,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 5,
  },
  actionCount: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  albumContainer: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 10,
    padding: 2,
  },
  albumImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  progressBarContainer: {
    position: "absolute",
    top: 50,
    left: 15,
    right: 15,
    flexDirection: "row",
    zIndex: 10,
  },
  progressBar: {
    flex: 1,
    height: 2,
    backgroundColor: "rgba(255,255,255,0.3)",
    marginHorizontal: 2,
    borderRadius: 1,
  },
  activeProgressBar: {
    backgroundColor: "#fff",
  },
  watchedProgressBar: {
    backgroundColor: "#fff",
  },
});

export default InstagramReels;
