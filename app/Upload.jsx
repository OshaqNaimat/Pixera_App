import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  ScrollView,
  Alert,
  Dimensions,
  Modal,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const { width } = Dimensions.get("window");

const UploadScreen = () => {
  const [selectedTab, setSelectedTab] = useState("post"); // "reel" or "post"
  const [mediaUri, setMediaUri] = useState(null);
  const [caption, setCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("normal");

  // Filters data (kept but currently not used in preview)
  const filters = [
    { id: "normal", name: "Normal", icon: "🟣" },
    { id: "clarendon", name: "Clarendon", icon: "🟢" },
    { id: "gingham", name: "Gingham", icon: "🟡" },
    { id: "moon", name: "Moon", icon: "⚪" },
    { id: "lark", name: "Lark", icon: "🔴" },
    { id: "reyes", name: "Reyes", icon: "🟠" },
  ];

  const handleGallery = async () => {
    // Ask permission first (important on real devices)
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Please allow access to your photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectedTab === "reel"
          ? ImagePicker.MediaTypeOptions.Videos
          : ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const uri = result.assets[0].uri;
      setMediaUri(uri);
    } else {
      console.log("User cancelled gallery");
    }
  };

  const handleUpload = async () => {
    if (!mediaUri) {
      Alert.alert("No Media", "Please choose media from gallery first");
      return;
    }

    setIsUploading(true);

    // ────────────────────────────────
    // For now → simulation (replace later with real axios + FormData upload)
    setTimeout(() => {
      setIsUploading(false);
      Alert.alert(
        "Success!",
        `${selectedTab === "reel" ? "Reel" : "Post"} uploaded successfully!`,
        [
          {
            text: "OK",
            onPress: () => {
              setMediaUri(null);
              setCaption("");
              setShowFilters(false);
              setSelectedFilter("normal");
            },
          },
        ],
      );
    }, 2000);
    // ────────────────────────────────
  };

  const renderMediaPreview = () => {
    if (!mediaUri) {
      return (
        <View style={styles.mediaPlaceholder}>
          <Text style={styles.placeholderIcon}>
            {selectedTab === "reel" ? "🎥" : "📷"}
          </Text>
          <Text style={styles.placeholderText}>Choose from Gallery</Text>
          <Text style={{ fontSize: 13, color: "#888", marginTop: 8 }}>
            (Camera temporarily disabled)
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.mediaPreview}>
        <Image
          source={{ uri: mediaUri }}
          style={[
            styles.previewImage,
            selectedFilter !== "normal" && styles[selectedFilter],
          ]}
          resizeMode="cover"
        />

        {selectedTab === "reel" && (
          <View style={styles.videoControls}>
            <Text style={styles.videoIcon}>▶️</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => Alert.alert("Cancel", "Discard changes?")}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          New {selectedTab === "reel" ? "Reel" : "Post"}
        </Text>

        <TouchableOpacity
          onPress={handleUpload}
          disabled={isUploading || !mediaUri}
          style={styles.shareButton}
        >
          {isUploading ? (
            <ActivityIndicator color="#0095f6" />
          ) : (
            <Text
              style={[
                styles.shareText,
                (!mediaUri || isUploading) && styles.shareTextDisabled,
              ]}
            >
              Share
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Tab Selector */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === "reel" && styles.activeTab]}
            onPress={() => setSelectedTab("reel")}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === "reel" && styles.activeTabText,
              ]}
            >
              🎥 Reel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, selectedTab === "post" && styles.activeTab]}
            onPress={() => setSelectedTab("post")}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === "post" && styles.activeTabText,
              ]}
            >
              📷 Post
            </Text>
          </TouchableOpacity>
        </View>

        {/* Media Preview Section */}
        <View style={styles.previewSection}>
          {renderMediaPreview()}

          {/* Only Gallery Button */}
          <View style={styles.mediaButtons}>
            <TouchableOpacity
              style={[styles.mediaButton, { minWidth: "80%" }]}
              onPress={handleGallery}
            >
              <Text style={styles.buttonIcon}>🖼️</Text>
              <Text style={styles.buttonText}>Choose from Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Caption Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Caption</Text>
          <TextInput
            style={styles.captionInput}
            placeholder="Write a caption..."
            placeholderTextColor="#999"
            multiline
            value={caption}
            onChangeText={setCaption}
            maxLength={2200}
          />
          <Text style={styles.charCount}>{caption.length}/2200</Text>
        </View>

        {/* You can re-add advanced options / filters later */}
      </ScrollView>

      {/* Loading Modal */}
      <Modal transparent visible={isUploading} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color="#0095f6" />
            <Text style={styles.uploadingText}>
              Uploading {selectedTab === "reel" ? "Reel" : "Post"}...
            </Text>
          </View>
        </View>
      </Modal>
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
    borderBottomColor: "#eee",
  },
  cancelText: {
    fontSize: 16,
    color: "#666",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  shareButton: {
    paddingHorizontal: 10,
  },
  shareText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0095f6",
  },
  shareTextDisabled: {
    color: "#ccc",
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#000",
  },
  tabText: {
    fontSize: 16,
    color: "#666",
  },
  activeTabText: {
    color: "#000",
    fontWeight: "600",
  },
  previewSection: {
    padding: 15,
    alignItems: "center",
  },
  mediaPlaceholder: {
    width: width - 30,
    height: width - 30,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  placeholderIcon: {
    fontSize: 60,
    marginBottom: 10,
  },
  placeholderText: {
    fontSize: 16,
    color: "#666",
  },
  mediaPreview: {
    width: width - 30,
    height: width - 30,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    position: "relative",
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  videoControls: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  videoIcon: {
    fontSize: 40,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 30,
    padding: 10,
  },
  mediaButtons: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  mediaButton: {
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
  },
  buttonIcon: {
    fontSize: 30,
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  section: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#000",
  },
  captionInput: {
    minHeight: 100,
    fontSize: 16,
    textAlignVertical: "top",
  },
  charCount: {
    textAlign: "right",
    color: "#999",
    fontSize: 12,
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 15,
    alignItems: "center",
  },
  uploadingText: {
    marginTop: 15,
    fontSize: 16,
    color: "#000",
  },
  // Filter effects (simplified)
  clarendon: { opacity: 1 },
  gingham: { opacity: 0.9 },
  moon: { opacity: 0.8 },
  lark: { opacity: 0.95 },
  reyes: { opacity: 0.85 },
});

export default UploadScreen;
