import nodemailer from 'nodemailer';

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmailTestService(to: string[], from: string, subject: string, body: string) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();
//   console.log("testAccount:" + JSON.stringify(testAccount));


  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "mariam.kshlerin30@ethereal.email",
      pass: "password", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    // from: '"Joe Doe👻" <joe.doe@example.com>', // sender address
    // to: "bar@example.com, baz@example.com", // list of receivers
    from,
    to,
    subject,
    text: body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
