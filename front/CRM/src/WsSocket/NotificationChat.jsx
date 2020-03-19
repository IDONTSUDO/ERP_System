import React from "react";
import { isAuthenticated } from "../Api/Auth";

import io from "socket.io-client";
const socket = io.connect("http://localhost:4000", {
  query: {
    token: isAuthenticated().direct._id
  }
});

export default function NotificationChat() {
  return <></>;
}
