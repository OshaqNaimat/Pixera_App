import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
// import { TbSettingsFilled } from "react-icons/tb"; // For React Native, use react-native-vector-icons
// import { IoAddCircleOutline } from "react-icons/io5";
// import { FaCamera, FaRegBookmark, FaTable } from "react-icons/fa6";
// import { BsPersonSquare } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
// import { findMyUser } from "../features/users/userSlice";
// import { getRelaventPosts } from "../features/posts/postSlice";
import { useRoute } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const ProfileScreen = ({ navigation }) => {
  const [active, setActive] = useState(false);

  const route = useRoute();
  const { user_id } = route.params;

  //   const dispatch = useDispatch();
  //   const { foundUser, user } = useSelector((state) => state.auth);
  //   const { myPost } = useSelector((state) => state.daak);

  //   useEffect(() => {
  //     dispatch(findMyUser(user_id));
  //     dispatch(getRelaventPosts(user_id));
  //   }, [user_id]);

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <Image source={{ uri: item.image }} style={styles.postImage} />
      <View style={styles.overlay} />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Profile Info */}
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80",
          }}
          style={styles.profileImage}
        />
        <View style={styles.infoContainer}>
          <View style={styles.usernameRow}>
            <Text style={styles.username}>{foundUser?.username}</Text>
            {/* Replace with RN icon */}
            <Text style={{ fontSize: 24 }}>⚙️</Text>
          </View>
          <Text style={styles.fullName}>{foundUser?.fullName}</Text>
          <View style={styles.statsRow}>
            <Text style={styles.statsText}>0 Posts</Text>
            <Text style={styles.statsText}>0 Followers</Text>
            <Text style={styles.statsText}>0 Following</Text>
          </View>
          <Text style={styles.bio}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio et
            illum, unde fugit magnam, provident similique est repudiandae
            tenetur voluptatum ex ad architecto expedita asperiores nihil
          </Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button}>
          <Text>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>View Archive</Text>
        </TouchableOpacity>
      </View>

      {/* New Post */}
      <View style={styles.newPostContainer}>
        <Text style={{ fontSize: 80 }}>➕</Text>
        <Text>New</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        <TouchableOpacity style={styles.tab}>
          <Text>📋</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text>🔖</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text>👤</Text>
        </TouchableOpacity>
      </View>

      {/* No posts placeholder */}
      {user_id === user._id && myPost.length === 0 && (
        <View style={styles.noPostContainer}>
          <Text style={{ fontSize: 50 }}>📷</Text>
          <Text style={styles.noPostTitle}>Share Photos</Text>
          <Text style={styles.noPostText}>
            When you share photos, they will appear on your profile.
          </Text>
          <TouchableOpacity>
            <Text style={styles.sharePhoto}>Share your first photo</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Posts Grid */}
      <FlatList
        data={myPost}
        renderItem={renderPost}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profileContainer: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  usernameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  username: {
    fontSize: 20,
    fontWeight: "600",
    marginRight: 8,
  },
  fullName: {
    fontSize: 16,
    marginBottom: 4,
  },
  statsRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 8,
  },
  statsText: {
    fontSize: 14,
  },
  bio: {
    fontSize: 14,
    color: "#555",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 12,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#ddd",
    borderRadius: 24,
  },
  newPostContainer: {
    alignItems: "center",
    marginVertical: 24,
  },
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 8,
  },
  tab: {
    padding: 8,
    borderBottomWidth: 3,
    borderBottomColor: "#000",
    width: 50,
    alignItems: "center",
  },
  noPostContainer: {
    alignItems: "center",
    padding: 32,
  },
  noPostTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 8,
  },
  noPostText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 8,
  },
  sharePhoto: {
    color: "#1e90ff",
    fontWeight: "600",
  },
  postContainer: {
    width: width / 3 - 4,
    height: width / 3 - 4,
    marginBottom: 2,
    position: "relative",
  },
  postImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
});

export default ProfileScreen;
