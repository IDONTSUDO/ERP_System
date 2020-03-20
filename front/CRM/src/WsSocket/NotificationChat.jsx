import React from "react";
import { isAuthenticated } from "../Api/Auth";
import { v4 as uuidv4 } from "uuid";
import { notification } from "antd";

import io from "socket.io-client";
let Session = uuidv4();

const socket = io.connect("http://localhost:4000", {
  query: {
    id: isAuthenticated().direct._id,
    session: Session
  }
});
socket.on("message", data => {
  console.log(data);

  if (window.location.pathname != "/message") {
    if (data.message == "NM") {
      openNotificationNewDialog();
    }
  } else {
  }
  // console.log(data), window.location.pathname != "/message" ? null : null;
  // console.log(window.location.pathname)
});
socket.emit("chat", 1000);
socket.on("disconnect", function() {
  console.log(200);
});

const openNotificationNewDialog = () => {
  notification.open({
    message: "У вас новый диалог",
    onClick: () => {
      console.log("Notification Clicked!");
    }
  });
};

export default function NotificationChat() {
  return <></>;
}
