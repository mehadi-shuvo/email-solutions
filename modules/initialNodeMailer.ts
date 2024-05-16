import { MainEmail } from "..";

/*
################################################
In this demo code show how to use this package.
 ###############################################
*/

const demoInfo = {
  senderEmail: "",
  receiverEmail: "",
  gamilAppPassword: "", // for the generate Gmail app password visit this  documentation: https://documentation.provar.com/documentation/applications-testing/email-testing/gmail-connection-in-provar-with-app-password/
  frontEndBaseURL: "",
  subject: "",
  message: ``,
  /*
  write the message by following instruction: 
  <p>Hello there, </p> 
  <p>Welcome to xyz Ltd. We are verifying your email because we are not allow any unauthorized account.</p>
  .....
  */
};

// test function is just for testing. This function should not use in your project.
const test = async () => {
  const EmailSolution = new MainEmail(
    demoInfo.senderEmail,
    demoInfo.receiverEmail,
    demoInfo.gamilAppPassword,
    demoInfo.frontEndBaseURL,
    demoInfo.subject,
    demoInfo.message
  );

  // send OTP  to the mail===
  const otp = EmailSolution.OTPGenerator(6); // 4 0r 6 digit OTP send by parameter 4/6;
  // verification link send to the email
  const verificationLink = EmailSolution.EmailVerificationLink();
};

test();
