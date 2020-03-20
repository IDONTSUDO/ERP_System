import React from "react";
import { isAuthenticated } from "../Api/Auth";
import { v4 as uuidv4 } from "uuid";

import io from "socket.io-client";
let Session = uuidv4();

const socket = io.connect("http://localhost:4000", {
  query: {
    id: isAuthenticated().direct._id,
    session: Session
  }
});
socket.on("message", timestamp => console.log(timestamp));
socket.emit("chat", 1000);
socket.on('disconnect', function(){
  
});
export default function NotificationChat() {
  return <></>;
}
