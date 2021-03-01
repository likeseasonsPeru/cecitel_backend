const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const {
  mailName,
  mailPassword,
  mailhost,
  mailport,
  mailuser
} = require("../config");

const sendMail = (data, template) => {

  try {
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
        defaultLayout: `${template}`, // name of main template
        partialsDir: "src/assets/templates/"
      },
      viewPath: "src/assets/templates",
      extName: ".hbs"
    };

    transporter.use("compile", hbs(options));

    console.log(data.email)

    transporter.sendMail(
      {
        from: '"Cecitel" <admincecitel@soporte.com.pe>',
        to: data.email,
        subject: "Cecitel - Restablecimiento de contraseña",
        template: `${template}`,
        context: {
          data
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
  } catch (err) {
    console.log(err);
  }
};

module.exports = sendMail;
