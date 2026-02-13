import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { Ionicons } from "@expo/vector-icons";
import io from "socket.io-client";
import { router } from "expo-router";

// ⚠️ IMPORTANT: Replace with YOUR machine IP if using real phone
const socket = io.connect("http://localhost:5000");

const ChatPage = () => {
  const flatListRef = useRef(null);

  // ---------- USERS (same idea as your web app) ----------
  const user = {
    _id: "user1",
    username: "alex_johnson",
    name: "Alex Johnson",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    isOnline: true,
  };

  const ClickedUser = {
    _id: "user2",
    username: "friend_user",
    name: "Friend",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  };

  // ---------- STATE (mirrors your web logic) ----------
  const [sentMessages, setSentMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Merge sent + received like your web app
  const myMessages = [...sentMessages, ...receivedMessages].sort(
    (a, b) => a.time - b.time,
  );

  // ---------- SOCKET LISTENERS (same as web) ----------
  useEffect(() => {
    socket.on("received_message", (data) => {
      setReceivedMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: data.message || data.text,
          sender_id: data.sender_id,
          receiver_id: data.receiver_id,
          time: Date.now(),
          isSent: false,
          type: "text",
        },
      ]);
    });

    socket.on("likh_raha_ha", () => setIsTyping(true));
    socket.on("nahi_likh_raha", () => setIsTyping(false));

    return () => {
      socket.off("received_message");
      socket.off("likh_raha_ha");
      socket.off("nahi_likh_raha");
    };
  }, []);

  // ---------- SEND MESSAGE (same as web) ----------
  const handleSend = () => {
    if (!newMessage.trim()) return;

    const msgObj = {
      id: Date.now().toString(),
      text: newMessage, // ✅ CORRECT
      sender_id: user._id,
      receiver_id: ClickedUser._id,
      time: Date.now(),
      isSent: true,
      type: "text",
    };

    socket.emit("sent_message", msgObj);

    setSentMessages((prev) => [...prev, msgObj]);
    setNewMessage("");
  };

  // ---------- PICK FILE ----------
  const handlePickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    });

    if (result.canceled) return;

    const asset = result.assets[0];

    const newMsg = {
      id: Date.now().toString(),
      uri: asset.uri,
      name: asset.name,
      time: Date.now(),
      isSent: true,
      type: asset.mimeType.startsWith("image/") ? "image" : "file",
    };

    setSentMessages((prev) => [...prev, newMsg]);
  };

  // ---------- CAMERA ----------
  const handleTakePicture = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
    });

    if (result.canceled) return;

    const asset = result.assets[0];

    const newMsg = {
      id: Date.now().toString(),
      uri: asset.uri,
      time: Date.now(),
      isSent: true,
      type: "image",
    };

    setSentMessages((prev) => [...prev, newMsg]);
  };

  // ---------- RENDER MESSAGE ----------
  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.isSent ? styles.sentMessage : styles.receivedMessage,
      ]}
    >
      {item.type === "image" ? (
        <Image source={{ uri: item.uri }} style={styles.messageImage} />
      ) : item.type === "file" ? (
        <Text style={styles.messageText}>File: {item.name}</Text>
      ) : (
        <Text style={styles.messageText}>{item.text}</Text>
      )}
    </View>
  );

  // ---------- AUTO SCROLL ----------
  const scrollToBottom = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [myMessages, isTyping]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push("./Messages")}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>

        <View style={styles.userInfo}>
          <Image source={{ uri: ClickedUser.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.username}>{ClickedUser.username}</Text>
            <Text style={styles.status}>
              {isTyping ? "typing..." : "Active now"}
            </Text>
          </View>
        </View>
      </View>

      {/* CHAT BODY */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <FlatList
          ref={flatListRef}
          data={myMessages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />

        {/* INPUT */}

        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={handlePickFile}>
            <Ionicons name="add-outline" size={26} color="#555" />
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Message..."
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
            onFocus={() => socket.emit("likh_raha_ha")}
            onBlur={() => socket.emit("nahi_likh_raha")}
          />

          {newMessage.trim() === "" ? (
            <TouchableOpacity onPress={handleTakePicture}>
              <Ionicons name="camera-outline" size={26} color="#555" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
              <Text style={{ color: "white" }}>Send</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", marginVertical: 50 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  backButton: { marginRight: 10 },
  userInfo: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  username: { fontWeight: "bold", fontSize: 16 },
  status: { color: "gray", fontSize: 12 },

  list: { padding: 10 },

  messageBubble: {
    maxWidth: "75%",
    padding: 10,
    borderRadius: 15,
    marginVertical: 4,
  },
  sentMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#0095f6",
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#f1f1f1",
  },
  messageText: { fontSize: 16 },

  messageImage: { width: 200, height: 200, borderRadius: 10 },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  input: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 8,
  },
  sendBtn: {
    backgroundColor: "#0095f6",
    padding: 10,
    borderRadius: 20,
  },
});

export default ChatPage;
