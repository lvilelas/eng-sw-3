const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "esquilosfatec@gmail.com",
        pass: "fatecesquilos"
    },
    tls: { rejectUnauthorized: false }
  });

  function enviaEmail(mailOptions){
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email enviado: ' + info.response);
        }
      });
  }

  /*example
  const mailOptions = {
  from: 'no-reply@diegopinho.com',
  to: 'destinatario@yahoo.com',
  subject: 'E-mail enviado usando Node!',
  text: 'Bem fácil, não? ;)'
};*/