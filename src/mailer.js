const nodemailer = require('nodemailer');

module.exports = {
  send: (settings, emailContent) => {
    let transporter = nodemailer.createTransport({
      host: settings.host,
      port: settings.port,
      secure: true, // secure:true for port 465, secure:false for port 587
      auth: {
        user: settings.auth.user,
        pass: settings.auth.password
      }
    });

    let mailOptions = {
      from: settings.from,
      to: settings.to,
      subject: settings.subject, // Subject line
      text: '', // plain text body
      html: emailContent
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
    });
  }
}