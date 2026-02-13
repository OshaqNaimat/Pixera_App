import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import io from "socket.io-client";

// ⚠️ Replace with your server URL
const socket = io.connect("http://192.168.100.127:5000");

const CallComponent = ({ user, clickedUser }) => {
  const [incomingCall, setIncomingCall] = useState(false);
  const [callData, setCallData] = useState(null);
  const [callLink, setCallLink] = useState(null);

  // Listen to incoming call events
  useEffect(() => {
    socket.on("call_arahi_hai", (data) => {
      // Only show if the call is for the logged-in user
      if (user._id === data.receiver_id) {
        setIncomingCall(true);
        setCallData(data);
      }
    });

    socket.on("nahi_uthai", (data) => {
      alert("Call Declined");
      setIncomingCall(false);
      setCallLink(null);
    });

    socket.on("utha_li_ha", (data) => {
      setCallLink(data.shareableLink);
      setIncomingCall(false);
    });

    return () => {
      socket.off("call_arahi_hai");
      socket.off("nahi_uthai");
      socket.off("utha_li_ha");
    };
  }, []);

  // Outgoing call
  const handleVideoCall = () => {
    socket.emit("calling", {
      caller_id: user._id,
      receiver_id: clickedUser._id,
    });
    alert("Calling " + clickedUser.username);
  };

  // Accept call
  const handleAccept = () => {
    if (callData?.shareableLink) {
      Linking.openURL(callData.shareableLink);
    } else {
      alert("Call link not generated yet");
    }
    setIncomingCall(false);
  };

  // Decline call
  const handleDecline = () => {
    socket.emit("call_declined", {
      caller_id: callData.caller_id,
      receiver_id: callData.receiver_id,
    });
    setIncomingCall(false);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Outgoing Call Button */}
      <TouchableOpacity style={styles.callButton} onPress={handleVideoCall}>
        <Ionicons name="videocam" size={24} color="#fff" />
        <Text style={{ color: "#fff", marginLeft: 5 }}>Video Call</Text>
      </TouchableOpacity>

      {/* Incoming Call Modal */}
      <Modal visible={incomingCall} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.callModal}>
            <Text style={styles.callTitle}>Incoming Call</Text>
            <View style={styles.userInfo}>
              <Image
                source={{
                  uri:
                    clickedUser.avatar ||
                    "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
                }}
                style={styles.avatar}
              />
              <Text style={styles.username}>{clickedUser.username}</Text>
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "red" }]}
                onPress={handleDecline}
              >
                <MaterialIcons name="call-end" size={30} color="#fff" />
                <Text style={styles.buttonText}>Decline</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "green" }]}
                onPress={handleAccept}
              >
                <MaterialIcons name="call" size={30} color="#fff" />
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CallComponent;

const styles = StyleSheet.create({
  callButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0095f6",
    padding: 10,
    borderRadius: 10,
    margin: 10,
    alignSelf: "flex-start",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  callModal: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  callTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  userInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  username: { fontWeight: "bold", fontSize: 16 },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", marginTop: 5 },
});
