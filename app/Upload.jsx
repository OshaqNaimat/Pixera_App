import React, { useState, useRef } from "react";
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
import * as ImagePicker from "react-native-image-picker";
import Slider from "@react-native-community/slider";

const { width, height } = Dimensions.get("window");

const UploadScreen = () => {
  const [selectedTab, setSelectedTab] = useState("reel"); // 'reel' or 'post'
  const [mediaUri, setMediaUri] = useState(null);
  const [caption, setCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("normal");
  const [volume, setVolume] = useState(1);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(1);
  const [taggedUsers, setTaggedUsers] = useState([]);
  const [location, setLocation] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Filters data
  const filters = [
    { id: "normal", name: "Normal", icon: "🟣" },
    { id: "clarendon", name: "Clarendon", icon: "🟢" },
    { id: "gingham", name: "Gingham", icon: "🟡" },
    { id: "moon", name: "Moon", icon: "⚪" },
    { id: "lark", name: "Lark", icon: "🔴" },
    { id: "reyes", name: "Reyes", icon: "🟠" },
  ];

  const handleCamera = () => {
    const options = {
      mediaType: selectedTab === "reel" ? "video" : "photo",
      videoQuality: "high",
      durationLimit: selectedTab === "reel" ? 60 : 0, // 60 seconds for reels
      saveToPhotos: true,
    };

    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled camera");
      } else if (response.error) {
        Alert.alert("Error", response.error);
      } else {
        const uri = response.assets?.[0]?.uri;
        if (uri) {
          setMediaUri(uri);
        }
      }
    });
  };

  const handleGallery = () => {
    const options = {
      mediaType: selectedTab === "reel" ? "video" : "photo",
      selectionLimit: selectedTab === "reel" ? 1 : 10,
      videoQuality: "high",
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled gallery");
      } else if (response.error) {
        Alert.alert("Error", response.error);
      } else {
        const uri = response.assets?.[0]?.uri;
        if (uri) {
          setMediaUri(uri);
        }
      }
    });
  };

  const handleUpload = async () => {
    if (!mediaUri) {
      Alert.alert("No Media", "Please select or capture media first");
      return;
    }

    setIsUploading(true);

    // Simulate upload process
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
  };

  const renderMediaPreview = () => {
    if (!mediaUri) {
      return (
        <View style={styles.mediaPlaceholder}>
          <Text style={styles.placeholderIcon}>
            {selectedTab === "reel" ? "🎥" : "📷"}
          </Text>
          <Text style={styles.placeholderText}>
            {selectedTab === "reel"
              ? "Select or Record a Video"
              : "Select or Take a Photo"}
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
        />

        {selectedTab === "reel" && (
          <View style={styles.videoControls}>
            <Text style={styles.videoIcon}>▶️</Text>
          </View>
        )}

        {showFilters && (
          <View style={styles.filterBadge}>
            <Text style={styles.filterText}>
              Filter: {filters.find((f) => f.id === selectedFilter)?.name}
            </Text>
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
          // disabled={isUploading}
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

          {/* Media Selection Buttons */}
          <View style={styles.mediaButtons}>
            <TouchableOpacity style={styles.mediaButton} onPress={handleCamera}>
              <Text style={styles.buttonIcon}>📸</Text>
              <Text style={styles.buttonText}>Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.mediaButton}
              onPress={handleGallery}
            >
              <Text style={styles.buttonIcon}>🖼️</Text>
              <Text style={styles.buttonText}>Gallery</Text>
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

        {/* Advanced Options */}
        {/* <TouchableOpacity
          style={styles.advancedHeader}
          onPress={() => setShowAdvanced(!showAdvanced)}
        >
          <Text style={styles.advancedTitle}>
            {showAdvanced ? "▼" : "▶"} Advanced Options
          </Text>
        </TouchableOpacity> */}

        {/* {showAdvanced && ( */}
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
  filterBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  filterText: {
    color: "#fff",
    fontSize: 12,
  },
  mediaButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  mediaButton: {
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    minWidth: 120,
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
  advancedHeader: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  advancedTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  advancedSection: {
    paddingHorizontal: 15,
  },
  filterScroll: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  filterOption: {
    alignItems: "center",
    marginRight: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
  },
  selectedFilter: {
    backgroundColor: "#e3f2fd",
    borderWidth: 2,
    borderColor: "#0095f6",
  },
  filterIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  filterName: {
    fontSize: 12,
    color: "#000",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  trimContainer: {
    marginTop: 10,
  },
  trimText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    color: "#000",
  },
  optionSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  optionArrow: {
    fontSize: 20,
    color: "#999",
  },
  guidelines: {
    padding: 15,
    backgroundColor: "#f9f9f9",
    margin: 15,
    borderRadius: 10,
  },
  guidelinesTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#000",
  },
  guideline: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
    lineHeight: 20,
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
