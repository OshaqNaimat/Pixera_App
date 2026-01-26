import { router } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";

const SocialActivityFeed = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Activity</Text>
      </View>

      {/* Last 7 Days Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Last 7 days</Text>

        {/* First Activity Item */}
        <View style={styles.activityItem}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>A</Text>
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityText}>
              <Text style={styles.username}>ayyan_only </Text> started following
              you.
            </Text>
            <Text style={styles.timeStamp}>2d</Text>
          </View>
        </View>

        {/* Follow Suggestion */}
        {/* <View style={styles.activityItem}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>M</Text>
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityText}>
              New follow suggestion:{" "}
              <Text style={styles.username}>
                starslitsoul07 (Muhmmad Areeb)
              </Text>
            </Text>
            <Text style={styles.subText}>You have 5 mutuals</Text>
            <Text style={styles.timeStamp}>3d</Text>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.messageButton}>
              <Text style={styles.messageButtonText}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
          </View>
        </View> */}
      </View>

      {/* Last 30 Days Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Last 30 days</Text>

        {/* Thread Post */}
        <View style={styles.activityItem}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>P</Text>
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityText}>
              <Text style={styles.username}>ptacfficlajpk </Text> posted a
              thread you might like:
            </Text>

            <Text style={styles.timeStamp}>2w</Text>
          </View>
        </View>

        {/* Follow Suggestion */}
        <View style={styles.activityItem}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>K</Text>
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityText}>
              New follow suggestion:{" "}
              <Text style={styles.username}>khana_sarkar_t</Text>
            </Text>
            <Text style={styles.timeStamp}>2w</Text>
          </View>
          <TouchableOpacity style={styles.smallFollowButton}>
            <Text style={styles.followButtonText}>Follow</Text>
          </TouchableOpacity>
        </View>

        {/* Follow Request Accepted */}
        <View style={styles.activityItem}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>M</Text>
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityText}>
              <Text style={styles.username}>muziiilbaloch </Text> accepted your
              follow request.
            </Text>
            <Text style={styles.timeStamp}>2w</Text>
          </View>
          <TouchableOpacity style={styles.messageButton}>
            <TouchableOpacity onPress={() => router.push("/Messages")}>
              <Text style={styles.messageButtonText}>Message</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        {/* Started Following */}
        {/* <View style={styles.activityItem}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>M</Text>
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityText}>
              <Text style={styles.username}>muziiilbaloch </Text> started
              following you.
            </Text>
            <Text style={styles.timeStamp}>2w</Text>
          </View>
          <TouchableOpacity style={styles.messageButton}>
            <Text style={styles.messageButtonText}>Message</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  section: {
    marginTop: 10,
    backgroundColor: "white",
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#4a90e2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "white",
    fontWeight: "bold",
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  username: {
    fontWeight: "600",
  },
  subText: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  threadTags: {
    fontSize: 13,
    color: "#4a90e2",
    marginTop: 4,
    lineHeight: 18,
  },
  timeStamp: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: "row",
    marginLeft: 8,
  },
  messageButton: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
  },
  messageButtonText: {
    color: "#333",
    fontSize: 13,
    fontWeight: "500",
  },
  followButton: {
    backgroundColor: "#4a90e2",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  smallFollowButton: {
    backgroundColor: "#4a90e2",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 8,
  },
  followButtonText: {
    color: "white",
    fontSize: 13,
    fontWeight: "500",
  },
};

export default SocialActivityFeed;
