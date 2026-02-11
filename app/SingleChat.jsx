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
  Keyboard,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { Ionicons } from "@expo/vector-icons";

const ChatPage = ({ route, navigation }) => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hey! How are you doing?",
      time: "10:30 AM",
      isSent: false,
      isRead: true,
    },
    {
      id: "2",
      text: "I'm good! Just got back from the trip. Check out my new post!",
      time: "10:31 AM",
      isSent: false,
      isRead: true,
    },
    {
      id: "3",
      text: "That's awesome! I saw your photos, looks amazing!",
      time: "10:32 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "4",
      text: "Thanks! Are you free this weekend?",
      time: "10:33 AM",
      isSent: false,
      isRead: true,
    },
    {
      id: "5",
      text: "Yes, I am! Let's grab coffee ☕️",
      time: "10:34 AM",
      isSent: true,
      isRead: true,
    },
    {
      id: "6",
      text: "Perfect! How about Saturday 2 PM?",
      time: "10:35 AM",
      isSent: false,
      isRead: true,
    },
    {
      id: "7",
      text: "Sounds great! See you then 😊",
      time: "10:36 AM",
      isSent: true,
      isRead: false,
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef(null);

  const user = {
    id: "user1",
    username: "alex_johnson",
    name: "Alex Johnson",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    isOnline: true,
  };

  const responses = [
    "Haha yeah that would be fun! 😄",
    "Sure thing! What time works for you?",
    "OMG those pictures are insane 🔥",
    "I'm down! Where should we meet?",
    "Aww thanks! You're too sweet 😊",
    "Coffee sounds perfect right now ☕",
    "Let me check my schedule real quick...",
    "Yesss let's do it! 🎉",
  ];

  const getRandomResponse = () => {
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSend = () => {
    if (newMessage.trim() === "") return;

    const newMsg = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isSent: true,
      isRead: false,
      type: "text",
    };

    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");

    // Simulate reply
    setTimeout(() => {
      setIsTyping(true);

      setTimeout(
        () => {
          const response = {
            id: (Date.now() + 1).toString(),
            text: getRandomResponse(),
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            isSent: false,
            isRead: false,
            type: "text",
          };
          setMessages((prev) => [...prev, response]);
          setIsTyping(false);
        },
        1200 + Math.random() * 800,
      ); // 1.2–2 seconds random delay
    }, 600);
  };

  const handlePickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    });
    if (result.canceled) return;

    const asset = result.assets[0];
    const isImage = asset.mimeType.startsWith("image/");
    const newMsg = {
      id: Date.now().toString(),
      uri: asset.uri,
      name: asset.name,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isSent: true,
      isRead: false,
      type: isImage ? "image" : "file",
    };

    setMessages((prev) => [...prev, newMsg]);

    // Simulate reply
    setTimeout(() => {
      setIsTyping(true);

      setTimeout(
        () => {
          const response = {
            id: (Date.now() + 1).toString(),
            text: getRandomResponse(),
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            isSent: false,
            isRead: false,
            type: "text",
          };
          setMessages((prev) => [...prev, response]);
          setIsTyping(false);
        },
        1200 + Math.random() * 800,
      );
    }, 600);
  };

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
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isSent: true,
      isRead: false,
      type: "image",
    };

    setMessages((prev) => [...prev, newMsg]);

    // Simulate reply
    setTimeout(() => {
      setIsTyping(true);

      setTimeout(
        () => {
          const response = {
            id: (Date.now() + 1).toString(),
            text: getRandomResponse(),
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            isSent: false,
            isRead: false,
            type: "text",
          };
          setMessages((prev) => [...prev, response]);
          setIsTyping(false);
        },
        1200 + Math.random() * 800,
      );
    }, 600);
  };

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
        <Text
          style={[
            styles.messageText,
            item.isSent ? styles.sentMessageText : styles.receivedMessageText,
          ]}
        >
          File: {item.name}
        </Text>
      ) : (
        <Text
          style={[
            styles.messageText,
            item.isSent ? styles.sentMessageText : styles.receivedMessageText,
          ]}
        >
          {item.text}
        </Text>
      )}
      <View style={styles.messageFooter}>
        <Text
          style={[styles.messageTime, !item.isSent && { color: "#8e8e8e" }]}
        >
          {item.time}
        </Text>
        {item.isSent && (
          <Text style={styles.readStatus}>{item.isRead ? "✓✓" : "✓"}</Text>
        )}
      </View>
    </View>
  );

  const scrollToBottom = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation?.goBack?.()}
        >
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
            {user.isOnline && <View style={styles.onlineIndicator} />}
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userStatus}>
              {isTyping
                ? "typing..."
                : user.isOnline
                  ? "Active now"
                  : "Active today"}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerIcon}>📞</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerIcon}>⋯</Text>
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.messagesList}
          onContentSizeChange={scrollToBottom}
          ListFooterComponent={
            isTyping ? (
              <View
                style={[
                  styles.messageBubble,
                  styles.receivedMessage,
                  styles.typingBubble,
                ]}
              >
                <View style={styles.typingDots}>
                  <View style={styles.typingDot} />
                  <View style={[styles.typingDot, styles.typingDot2]} />
                  <View style={[styles.typingDot, styles.typingDot3]} />
                </View>
              </View>
            ) : null
          }
        />

        {/* Input */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.inputIcon} onPress={handlePickFile}>
            <Ionicons name="add-outline" size={26} color="#555" />
          </TouchableOpacity>

          <TextInput
            style={styles.messageInput}
            placeholder="Message..."
            placeholderTextColor="#8e8e8e"
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
            maxLength={500}
          />

          {newMessage.trim() === "" ? (
            <>
              <TouchableOpacity style={styles.inputIcon}>
                <Ionicons name="mic-outline" size={26} color="#555" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.inputIcon}
                onPress={handleTakePicture}
              >
                <Ionicons name="camera-outline" size={26} color="#555" />
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
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
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#dbdbdb",
  },
  backButton: {
    padding: 8,
  },
  backArrow: {
    fontSize: 28,
    fontWeight: "600",
  },
  userInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  avatarContainer: {
    position: "relative",
  },
  userAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 1,
    right: 1,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#4cd964",
    borderWidth: 2,
    borderColor: "#fff",
  },
  userDetails: {
    marginLeft: 12,
  },
  userName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000",
  },
  userStatus: {
    fontSize: 13,
    color: "#6e6e6e",
  },
  headerButton: {
    padding: 10,
    marginLeft: 4,
  },
  headerIcon: {
    fontSize: 24,
  },
  chatContainer: {
    flex: 1,
  },
  messagesList: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  messageBubble: {
    maxWidth: "78%",
    padding: 12,
    borderRadius: 20,
    marginVertical: 4,
  },
  sentMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#0095f6",
    borderBottomRightRadius: 4,
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#f1f1f1",
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  sentMessageText: {
    color: "#fff",
  },
  receivedMessageText: {
    color: "#000",
  },
  messageFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 4,
  },
  messageTime: {
    fontSize: 11,
    color: "rgba(255,255,255,0.7)",
    marginRight: 6,
  },
  readStatus: {
    fontSize: 13,
    color: "rgba(255,255,255,0.9)",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    backgroundColor: "#fff",
  },
  messageInput: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    maxHeight: 120,
    marginHorizontal: 8,
  },
  inputIcon: {
    padding: 8,
  },
  iconText: {
    fontSize: 26,
  },
  sendButton: {
    backgroundColor: "#0095f6",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  typingBubble: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  typingDots: {
    flexDirection: "row",
    alignItems: "center",
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#999",
    marginHorizontal: 3,
  },
  typingDot2: { opacity: 0.7 },
  typingDot3: { opacity: 0.4 },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});

export default ChatPage;
