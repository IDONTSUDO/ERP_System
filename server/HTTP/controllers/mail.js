const EmailImg = require("../database/Email/Images");
const EmailSnipet = require("../database/Email/EmailSnipet");
const ContrAgent = require("../database/Agent/ContrAgent");
const nodemailer = require("nodemailer");
require("dotenv").config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${process.env.EMAIL_LOGIN}`,
    pass: `${process.env.EMAIL_PASSWORD}`
  }
});

exports.unscribe = async (req, res) => {
  let agent = req.agent;

  agent.mailing = false;
  agent.save((err, result) => {});
};

exports.emailId = async (req, res, next, id) => {
  EmailImg.findById(id).exec((err, result) => {
    if (err || !result) {
      return res.status(400).json({
        error: "Img not found"
      });
    }
    req.img = result;
    next();
  });
};

exports.SnipetId = async (req, res, next, id) => {
  EmailSnipet.findById(id).exec((err, result) => {
    if (err || !result) {
      return res.status(400).json({
        error: "Snipets not found"
      });
    }
    req.snip = result;
    console.log(result);
    next();
  });
};
exports.MailPaginationGetImage = async (req, res) => {
  const currentPage = req.query.page || 1;

  const perPage = 24;
  var totalItems;

  const img = EmailImg.find()

    .countDocuments()
    .then(count => {
      totalItems = count;
      return EmailImg.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => console.log(err));
};
exports.MailDeleteCollection = async (req, res) => {
  let img = req.img;

  await img.remove((err, img) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    res.json({ message: "Img delete!" });
  });
};

exports.SnipetsDelete = async (req, res) => {
  let snip = req.snip;
  console.log(snip);
  await snip.remove((err, snip) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    res.json({ message: "Snipet delete!" });
  });
};

exports.SaveEmailSnipet = async (req, res) => {
  //TODO Validation
  let { payload } = req.body;
  let snip = new EmailSnipet(payload);

  snip.name = payload.snipetName;
  snip.disign = payload.design;
  snip.dateCreated = Date.now();
  snip.html = payload.html;
  snip.save().then(result => {
    console.log(result);
    res.status(200).json({
      result
    });
  });
};
exports.getEmailSnipet = async (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = 50;
  var totalItems;

  const snipets = await EmailSnipet.find()

    .countDocuments()
    .then(count => {
      totalItems = count;
      return EmailSnipet.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then(snipets => {
      res.status(200).json(snipets);
    })
    .catch(err => console.log(err));
};
exports.getDisign = async (req, res) => {
  let disign = req.snip;

  return res.status(200).json(disign.disign);
};
exports.SimpelEmail = async (req, res, next) => {
  let setting = req.body;

  let { resultSimpelAgentGeo, resultSimpelAgentSpec } = setting;

  let requests = resultSimpelAgentGeo.map(geoData =>
    ContrAgent.find({ agentGeo: geoData }).then(data => {
      return data;
    })
  );

  let spec_coincidence;
  let spec_coincidence_LIST = [];
  Promise.all(requests).then(responses =>
    responses.map((result, i) => {
      for (agent of result) {
        if (
          agent.specialications != "none" &&
          agent.email != "none" &&
          agent.email == ""
        ) {
          for (spec of agent.specialications) {
            if (resultSimpelAgentSpec.includes(`${spec}`)) {
              spec_coincidence_LIST.push(agent);
            }
          }
        }
      }
    })
  );

  // TODO валидации по повторениям

  req.emailList = spec_coincidence_LIST;
  res.status(200).json({ status: "ok" });
  return next();
};
exports.EmailingLists = async (req, res) => {
  console.log(req.body);
};
async function HTMLexpoter(html, agent) {
  return;
}

exports.EmailSending = async (req, res) => {
  let emailSendList = req.emailList;
  let { html } = req.body;
  let MyLovingRexExp = /agentLinkToUnsubscribe/gi;
  let agentId;
  // TODO

  let finalyHtml = html.replace(
    MyLovingRexExp,
    `${process.env.ServerAdress}/unscribe/${agentId}`
  );
  console.log(finalyHtml);
  // TODO валидация email регуляркой

  // let mailOptions = {
  //     from: `${user.email}`,
  //     to: `${user.email}`,
  //     subject: 'Sending Email using Node.js',
  //     text: `${process.env.URL_CONFIRUM}${user._id}`
  //   };

  // transporter.sendMail(mailOptions, function(error, info){
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       console.log('Email sent: ' + info.response);
  //     }
  //   })
};
