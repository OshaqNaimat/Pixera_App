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
import { useRoute, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

// ⚠️ Replace with your server IP if using real device
const socket = io.connect("http://192.168.100.127:5000");

const SingleChat = () => {
  const route = useRoute();
  const navigation = useNavigation();

  // ---------- Get userId & username from params ----------
  const userId = route.params?.userId;
  const username = route.params?.username;

  // ---------- STATE ----------
  const [user, setUser] = useState(null); // logged-in user
  const [sentMessages, setSentMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messagesByUser, setMessagesByUser] = useState({}); // <-- add this

  const flatListRef = useRef(null);

  // Load on mount
  useEffect(() => {
    const loadMessages = async () => {
      const stored = await AsyncStorage.getItem("messagesByUser");
      if (stored) setMessagesByUser(JSON.parse(stored));
    };
    loadMessages();
  }, []);

  // ---------- Load logged-in user (mock or AsyncStorage) ----------
  useEffect(() => {
    const loadLoggedInUser = async () => {
      setUser({
        _id: "user1",
        username: "alex_johnson",
        fullName: "Alex Johnson",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      });
    };
    loadLoggedInUser();
  }, []);

  // ---------- Merge messages ----------
  const myMessages = [...sentMessages, ...receivedMessages].sort(
    (a, b) => a.time - b.time,
  );

  // ---------- SOCKET LISTENERS ----------
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

  // ---------- Send message ----------
  const handleSend = () => {
    if (!newMessage.trim() || !user || !userId) return;

    const msgObj = {
      id: Date.now().toString(),
      text: newMessage,
      sender_id: user._id,
      receiver_id: userId,
      time: Date.now(),
      isSent: true,
      type: "text",
    };

    socket.emit("sent_message", msgObj);
    setSentMessages((prev) => [...prev, msgObj]);
    setNewMessage("");
  };

  // ---------- Pick file ----------
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

  // ---------- Take picture ----------
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

  // ---------- Render message ----------
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

  // ---------- Auto scroll ----------
  const scrollToBottom = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [myMessages, isTyping]);

  // ---------- No user selected ----------
  if (!userId || !username) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          No user selected for chat.
        </Text>
      </SafeAreaView>
    );
  }

  const clickedUserAvatar =
    "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_user_personalization&w=740&q=80";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>

        {/* // Inside your header view */}
        <View style={styles.userInfo}>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() =>
              router.push("Profile", {
                user: {
                  _id: userId,
                  username: username,
                  fullName: username,
                  avatar: clickedUserAvatar,
                },
              })
            }
          >
            <Image source={{ uri: clickedUserAvatar }} style={styles.avatar} />
            <View>
              <Text style={styles.username}>
                {clickedUser?.username || username}
              </Text>
              <Text style={styles.status}>
                {isTyping ? "typing..." : "Active now"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View></View>
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

export default SingleChat;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
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
