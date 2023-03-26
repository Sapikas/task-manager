const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

let msg = { };

const sendWelcomeEmail = (email, name) => {
  msg = {
    to: email,
    from: 'sapikas@thinkdesquared.com',
    subject: 'Thanks for joining in!',
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
    // html: '<strong>Welcome to the app, ${name}. Let me know how you get along with the app.</strong>',
  }
  sgMail
  .send(msg);
}

const sendCancelationEmail = (email, name) => {
  msg = {
    to: email,
    from: 'sapikas@thinkdesquared.com',
    subject: 'Cancelation Email',
    text: `Hi, ${name}. Let me know why you decide to cancel your account please.`,
    // html: '<strong>Welcome to the app, ${name}. Let me know how you get along with the app.</strong>',
  }
  sgMail
  .send(msg);
}
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   });
module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail
}