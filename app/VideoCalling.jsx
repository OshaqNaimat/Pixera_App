import * as React from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
const socket = io.connect("http://192.168.100.127:5000");
function randomID(len) {
  let result = "";
  if (result) return result;
  var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

export default function VideoCallZego() {
  const { caller_id, receiver_id } = useParams();
  const roomID = getUrlParams().get("roomID") || randomID(5);
  let myMeeting = async (element) => {
    // generate Kit Token
    const appID = 410706962;
    const serverSecret =
      "6d3a4cddc01f199cd4c67f5c23fe0095914d5d4bcba9dca17d27c4d20441f08f";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      randomID(5),
      randomID(5),
    );

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    const shareableLink =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?roomID=" +
      roomID;

    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Personal link",
          url: shareableLink,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });

    socket.emit("answer_call", {
      caller_id,
      receiver_id,
      shareableLink,
    });
  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
}
