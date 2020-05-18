const express = require("express");
const router = express.Router();
var nodemailer = require('nodemailer');
const creds = require('./config');
const bodyParser = require('body-parser');

var jsonParser = bodyParser.json()
console.log(creds.USER)
console.log(creds.PASS)

var transport = {
  host: 'smtp.gmail.com',
  auth: {
    user: creds.USER,
    pass: creds.PASS
  }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});


router.post('/send-report', jsonParser, (req, res, next) => {
  console.log(req.body)
  var name = req.body.name
  var email = req.body.email
  var message = req.body.message
  var content = `name: ${name} \n email: ${email} \n message: ${message} `

  var mail = {
    from: name,
    to: 'report-bugs@matchywords.com',  //Change to email address that you want to receive messages on
    subject: 'New Message from Contact Form',
    text: content
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail'
      })
    } else {
      res.json({
        msg: 'success'
      })
    }
  })
})


router.get("/chat", (req, res) => {
  res.redirect('/' );
});


module.exports = router;
