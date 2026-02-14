import React, { useEffect } from "react";
import { View } from "react-native";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-rn";
import io from "socket.io-client";
import { useRoute } from "@react-navigation/native";

const socket = io("http://192.168.100.127:5000");

function randomID(len = 5) {
  const chars =
    "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP";
  let result = "";
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default function VideoCallZego() {
  const route = useRoute();
  const { caller_id, receiver_id, roomID } = route.params;

  useEffect(() => {
    startCall();
  }, []);

  const startCall = async () => {
    const appID = 410706962;
    const serverSecret =
      "6d3a4cddc01f199cd4c67f5c23fe0095914d5d4bcba9dca17d27c4d20441f08f"; // ⚠️ NEVER expose in production
    const userID = randomID(5);
    const userName = randomID(5);

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID || randomID(5),
      userID,
      userName,
    );

    ZegoUIKitPrebuilt.joinRoom({
      appID,
      userID,
      userName,
      roomID,
      token: kitToken,
      config: {
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
      },
    });

    socket.emit("answer_call", {
      caller_id,
      receiver_id,
      roomID,
    });
  };

  return <View style={{ flex: 1 }} />;
}
