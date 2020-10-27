const nodemailer = require("nodemailer");
const {mailName, mailPassword, mailhost, mailport, mailuser} = require('../config');

const sendMail = email => {
  let transporter = nodemailer.createTransport({
    name: mailName,
    host: mailhost,
    port: mailport,
    secure: true,
    auth: {
      user: mailuser,
      pass: mailPassword
    }
  });

  var options = {
    viewEngine: {
      extname: ".hbs", // handlebars extension
      layoutsDir: "src/assets/templates/", // location of handlebars templates
      defaultLayout: "forgot-password-email", // name of main template
      partialsDir: "src/assets/templates/"
    },
    viewPath: "src/assets/templates",
    extName: '.hbs'
  };

  transporter.use("compile", hbs(options));

  transporter.sendMail(
    {
      from: '"Cecitel" <cecitel@gmail.com.pe>',
      to: email,
      subject: "Cecitel - Restablecimiento de contraseña",
      template: "forgot-password-email",
      context: {
        /* url: `https://wasipetapp.com/api/reset_password/${token}`, */
        /* codigo: codigo, */
        /* name: user.name */
      }
    },
    async (err, info) => {
      if (err) {
        console.log(err);
        return false;
      } else {
        console.log(info);
        return true;
      }
    }
  );
};

module.exports = sendMail;
