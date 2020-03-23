const Chanel = require("../database/Messages/Chanel");
const Message = require("../database/Messages/Message");
const _ = require("lodash");
const Unread = require("../database/Messages/uReader.js");
exports.MessageId = async (req, res, next, id) => {
  Message.findById(id).exec((err, result) => {
    if (err || !result) {
      return res.status(400).json({
        error: "Message not found"
      });
    }
    req.message = result;

    next();
  });
};

exports.ChanelList = async (req, res) => {
  let userId = req.body.userId;
  const currentPage = req.query.page || 1;
  const perPage = 20;
  var totalItems;

  const chanels = await Chanel.find({ User: userId })

    .countDocuments()
    .then(count => {
      totalItems = count;
      return Chanel.find({ User: userId })
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then(data => {
      let requests = data.map(one =>
        Message.find({ DialogId: one._id })
          .sort({ _id: -1 })
          .limit(1)
          .then(data => {
            return { message: data, dialog: one };
          })
      );

      Promise.all(requests).then(responses => res.status(200).json(responses));
    })
    .catch(err => console.log(err));
};
exports.GetMessages = async (req, res) => {};
exports.ChanelNew = async (req, res, next) => {
  const chanel = new Chanel(req.body);

  chanel.save().then(result => {
    res.status(200).json({
      result
    });
    req.dilogData = result;

    result.users.forEach(user => {
      let unread = new Unread();
      unread.chanel = result._id;
      unread.user = user;
      unread.save();
    });
    return next();
  });
};
exports.ChanelDelete = async (req, res) => {};
exports.newMessage = async (req, res, next) => {
  let { userBy } = req.body;
  const message = new Message(req.body);

  message.save((err, result) => {
    req.message = result;
    res.status(200).json("OK");
    return next();
  });
};
exports.EditMessage = async (req, res, next) => {
  let msg = req.message;

  msg = _.extend(msg, req.body);

  await msg.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }

    res.json(result);

    req.messageData = result;
    return next();
  });
};

exports.DeleteMessage = async (req, res, next) => {
  let msg = req.message;
  msg.remove().then(result => {
    res.status(200).json(result);
    req.messageData = result;
    return next();
  });
};
exports.ChanelGetDialog = async (req, res) => {
  const currentPage = req.query.page || 1;
  const dialogsId = req.body.dialogsId;
  const perPage = 50;
  var totalItems;

  const dialogs = Message.find({ DialogId: dialogsId })

    .countDocuments()
    .then(count => {
      totalItems = count;
      return Message.find({ DialogId: dialogsId })
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => console.log(err));
};
exports.CounterUnread = req => {
  let { userBy, DialogId } = req.message;
  userBy.forEach(user => {
    Unread.findOneAndUpdate({ user: `${user._id}`, chanel: DialogId },{ $inc: { num: +1} }).then(data =>
      console.log(data)
    );
  });
};
