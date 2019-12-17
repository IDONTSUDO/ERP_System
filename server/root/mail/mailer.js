 
let nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: `${process.env.EMAIL_LOGIN}`,
    pass: `${process.env.EMAIL_PASSWORD}`
  }
});

let mailOptions = {
  from: 'youremail@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};



exports.MailToUser = (req,res) =>{
     
    
    user = req.email
    let mailOptions = {
        from: `${user.email}`,
        to: `${user.email}`,
        subject: 'Sending Email using Node.js',
        text: `${process.env.URL_CONFIRUM}${user._id}`
      };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      })


}