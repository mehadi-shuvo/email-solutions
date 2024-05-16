"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
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
const test = () => __awaiter(void 0, void 0, void 0, function* () {
    const EmailSolution = new __1.MainEmail("mehadihasanshuvo88@gmail.com", "lzoon28@gmail.com", "iwwh grfk ptor iiaw", " http://www.google.com", "You are passed in the exam", `<p>Hello there, </p> <p>Welcome to xyz Ltd. We are verifying your email because we are not allow any unauthorized account.</p>`);
    // send OTP  to the mail===
    const otp = EmailSolution.OTPGenerator(6); // 4 0r 6 digit OTP send by parameter 4/6;
    // verification link send to the email
    const verificationLink = EmailSolution.EmailVerificationLink();
});
test();
