import { AntDesign, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import BottomNavbar from "./BottomNavbar";

export default function App() {
  // Current screen: "list" or "chat"
  const [currentScreen, setCurrentScreen] = useState("list");
  const [selectedChat, setSelectedChat] = useState(null);

  const chats = [
    { id: "1", name: "Alice", lastMessage: "Hey! How are you?" },
    { id: "2", name: "Bob", lastMessage: "Did you see the game?" },
    { id: "3", name: "Charlie", lastMessage: "Let’s meet tomorrow." },
    { id: "3", name: "Charlie", lastMessage: "Let’s meet tomorrow." },
    { id: "3", name: "Charlie", lastMessage: "Let’s meet tomorrow." },
    { id: "3", name: "Charlie", lastMessage: "Let’s meet tomorrow." },
    { id: "3", name: "Charlie", lastMessage: "Let’s meet tomorrow." },
    { id: "3", name: "Charlie", lastMessage: "Let’s meet tomorrow." },
    { id: "3", name: "Charlie", lastMessage: "Let’s meet tomorrow." },
    { id: "3", name: "Charlie", lastMessage: "Let’s meet tomorrow." },
    { id: "3", name: "Charlie", lastMessage: "Let’s meet tomorrow." },
    { id: "3", name: "Charlie", lastMessage: "Let’s meet tomorrow." },
    { id: "3", name: "Charlie", lastMessage: "Let’s meet tomorrow." },
    { id: "3", name: "Charlie", lastMessage: "Let’s meet tomorrow." },
  ];

  const [messages, setMessages] = useState({
    1: [
      { id: "1", text: "Hey! How are you?", type: "received" },
      { id: "2", text: "I’m good, thanks!", type: "sent" },
    ],
    2: [
      { id: "1", text: "Did you see the game?", type: "received" },
      { id: "2", text: "Yes! It was awesome!", type: "sent" },
    ],
    3: [
      { id: "1", text: "Let’s meet tomorrow.", type: "received" },
      { id: "2", text: "Sure, what time?", type: "sent" },
    ],
  });

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;
    const newMsg = { id: Date.now().toString(), text: input, type: "sent" };
    setMessages({
      ...messages,
      [selectedChat.id]: [...messages[selectedChat.id], newMsg],
    });
    setInput("");
  };

  // Render Chat List
  if (currentScreen === "list") {
    return (
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() => {
              setSelectedChat(item);
              setCurrentScreen("chat");
            }}
          >
            <View>
              <Ionicons name="person-circle-sharp" size={24} color="black" />
            </View>
            <Text style={styles.chatName}>{item.name}</Text>
            <Text style={styles.lastMessage}>{item.lastMessage}</Text>
          </TouchableOpacity>
        )}
      />
    );
  }

  // Render Chat Screen
  const chatMessages = messages[selectedChat.id];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setCurrentScreen("list")}>
          <Text style={{ color: "#0078fe" }}>
            <AntDesign name="caret-left" size={24} color="black" />
          </Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{selectedChat.name}</Text>
      </View>

      {/* Messages */}
      <FlatList
        data={chatMessages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageBubble,
              item.type === "sent" ? styles.sent : styles.received,
            ]}
          >
            <Text
              style={
                item.type === "sent" ? styles.sentText : styles.receivedText
              }
            >
              {item.text}
            </Text>
          </View>
        )}
        contentContainerStyle={{ padding: 10 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Input Bar */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  chatItem: {
    padding: 15,
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
    marginBottom: 100,
  },
  chatName: { fontWeight: "bold", fontSize: 16 },
  lastMessage: { color: "gray", marginTop: 3 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 20,
  },

  messageBubble: {
    maxWidth: "70%",
    padding: 10,
    marginVertical: 5,
    borderRadius: 20,
  },
  sent: {
    backgroundColor: "#0078fe",
    alignSelf: "flex-end",
    borderTopRightRadius: 0,
  },
  received: {
    backgroundColor: "#e5e5ea",
    alignSelf: "flex-start",
    borderTopLeftRadius: 0,
  },
  sentText: { color: "#fff" },
  receivedText: { color: "#000" },

  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#f9f9f9",
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#0078fe",
    paddingHorizontal: 15,
    justifyContent: "center",
    borderRadius: 20,
  },
});
