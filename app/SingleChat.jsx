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

  const handleSend = () => {
    if (newMessage.trim() === "") return;

    const newMsg = {
      id: Date.now().toString(),
      text: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isSent: true,
      isRead: false,
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");

    // Simulate typing and response
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        const response = {
          id: (Date.now() + 1).toString(),
          text: getRandomResponse(),
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isSent: false,
          isRead: false,
        };
        setMessages((prev) => [...prev, response]);
        setIsTyping(false);
      }, 1500);
    }, 1000);
  };

  const getRandomResponse = () => {
    const responses = [
      "Sounds good!",
      "I agree with that",
      "Let me think about it",
      "What about you?",
      "Great idea! 💡",
      "LOL 😂",
      "I know right!",
      "Can't wait!",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.isSent ? styles.sentMessage : styles.receivedMessage,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          item.isSent ? styles.sentMessageText : styles.receivedMessageText,
        ]}
      >
        {item.text}
      </Text>
      <View style={styles.messageFooter}>
        <Text style={styles.messageTime}>{item.time}</Text>
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
  }, [messages]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
            {user.isOnline && <View style={styles.onlineIndicator} />}
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userStatus}>
              {isTyping ? "typing..." : "Active today"}
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

      {/* Messages List */}
      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
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

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.inputIcon}>
            <Text style={styles.iconText}>➕</Text>
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
                <Text style={styles.iconText}>🎤</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.inputIcon}>
                <Text style={styles.iconText}>📷</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>📷</Text>
          <Text style={styles.actionText}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>❤️</Text>
          <Text style={styles.actionText}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>📎</Text>
          <Text style={styles.actionText}>Attachment</Text>
        </TouchableOpacity>
      </View>
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
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#dbdbdb",
  },
  backButton: {
    padding: 8,
  },
  backArrow: {
    fontSize: 24,
  },
  userInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  avatarContainer: {
    position: "relative",
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 0,
    right: 0,
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
    fontSize: 16,
    fontWeight: "600",
    color: "#262626",
  },
  userStatus: {
    fontSize: 13,
    color: "#8e8e8e",
  },
  headerButton: {
    padding: 8,
    marginLeft: 5,
  },
  headerIcon: {
    fontSize: 24,
  },
  chatContainer: {
    flex: 1,
  },
  messagesList: {
    paddingHorizontal: 12,
    paddingVertical: 15,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 20,
    marginBottom: 8,
  },
  sentMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#0095f6",
    borderBottomRightRadius: 4,
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#f0f0f0",
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  sentMessageText: {
    color: "#fff",
  },
  receivedMessageText: {
    color: "#262626",
  },
  messageFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 4,
  },
  messageTime: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.7)",
    marginRight: 4,
  },
  readStatus: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.7)",
  },
  //   receivedMessage .messageTime {
  //     color: '#8e8e8e',
  //   },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#dbdbdb",
    backgroundColor: "#fff",
  },
  messageInput: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    maxHeight: 100,
    marginHorizontal: 8,
  },
  inputIcon: {
    padding: 8,
  },
  iconText: {
    fontSize: 24,
  },
  sendButton: {
    backgroundColor: "#0095f6",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  bottomActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#dbdbdb",
    backgroundColor: "#fff",
  },
  actionButton: {
    alignItems: "center",
    padding: 8,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  actionText: {
    fontSize: 12,
    color: "#262626",
  },
  typingBubble: {
    padding: 10,
  },
  typingDots: {
    flexDirection: "row",
    alignItems: "center",
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#8e8e8e",
    marginHorizontal: 2,
  },
  typingDot2: {
    opacity: 0.7,
  },
  typingDot3: {
    opacity: 0.4,
  },
});

export default ChatPage;
