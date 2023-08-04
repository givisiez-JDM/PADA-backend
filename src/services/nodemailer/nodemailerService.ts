import 'dotenv/config';
import nodemailer, { TransportOptions } from 'nodemailer';

export default class NodemailerService {
  sendMail = (email: string, name: string, userId: string) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
      }
    } as TransportOptions);
  
    const mailer = {
      from: process.env.MAIL_USERNAME,
      to: email,
      subject: 'Olá, conta criada com sucesso! Cadastre sua senha!',
      text: `
Olá ${name},
sua conta foi criada com sucesso!

Agora você precisa cadastrar sua senha de acesso.
Para isso, acesse o link abaixo:

www.link.legal.com/patient/set-password/${userId}

Abraços,

Equipe App Vacina - Time Backend`
    }
  
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailer)
        .then(response => {
          transporter.close();
          console.log('Email sent successfully');
          return resolve(response);
        })
        .catch(error => {
          transporter.close();
          console.log(`Error: ${error}`);
          return reject(error);
        });
    });
  } 
}
