const express = require("express");
const {
  ChanelList,
  ChanelNew,
  ChanelDelete,
  newMessage,
  EditMessage,
  DeleteMessage,
  ChanelGetDialog,
  MessageId
} = require("../controllers/Messages");

const { jwtTokenUserId } = require("../middleware/middleware.js");

const router = express.Router({ mergeParams: true });
const {
  NewMessageSendWebSocketServer,
  NewDialogSendWebSocketServer,
  DeleteMessageSendWebSocketServer,
  EditMessageSendWebSocketServer
} = require("../socket/publisher.js");

router.post("/chanel/list", ChanelList);
router.post("/chanel/dialog", ChanelGetDialog);
router.post("/chanel/new", ChanelNew, NewDialogSendWebSocketServer);
router.delete("/chanel/delete", ChanelDelete);

router.post("/new/message", newMessage, NewMessageSendWebSocketServer);
router.put(
  "/message/put/:messageId",
  EditMessage,
  EditMessageSendWebSocketServer
);
router.delete(
  "/message/delete/:messageId",
  DeleteMessage,
  DeleteMessageSendWebSocketServer
);

router.param("messageId", MessageId);
module.exports = router;
3