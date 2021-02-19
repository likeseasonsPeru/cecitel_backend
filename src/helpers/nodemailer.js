const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const {
  mailName,
  mailPassword,
  mailhost,
  mailport,
  mailuser
} = require("../config");

const sendMail = ({ email, name }, hash) => {
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
      from: '"Cecitel" <admincecitel@soporte.com.pe>',
      to: email,
      subject: "Cecitel - Restablecimiento de contraseña",
      template: "forgot-password-email",
      context: {
        url: `https://cecitel.com/api/reset_password/${hash}`,
        name: name
      }
    },
    async (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    }
  );

};

module.exports = sendMail;
