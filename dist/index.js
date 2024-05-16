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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const crypto_1 = __importDefault(require("crypto"));
class MainEmail {
    constructor(sender, receiver, authKey, frontendBaseURL, subject, message) {
        this.sender = sender;
        this.receiver = receiver;
        this.authKey = authKey;
        this.frontendBaseURL = frontendBaseURL;
        this.subject = subject;
        this.message = message;
        //=========================== initializing the transporter ============================
        this.transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            service: "Gmail",
            port: 465,
            secure: true, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: this.sender,
                pass: this.authKey,
            },
        });
        //============== email verification link generator and its's  return token and url; =================
        this.EmailVerificationLink = () => __awaiter(this, void 0, void 0, function* () {
            this.token = crypto_1.default.randomBytes(32).toString("hex"); // generate token
            this.URL = `${this.frontendBaseURL}/verify/${this.token}`; // generate verification url
            const info = yield this.transporter.sendMail({
                from: this.sender,
                to: this.receiver,
                subject: this.subject,
                html: ` <div>${this.message} 
      <div>
      <p>Here is the verification link: </p>
      ${this.URL} 
      </div>
      <div>
      Thank you, Please visit by the link and get verified your Email.
      </div>
      </div>`,
            });
            return { token: this.token, url: this.URL };
        });
        // ================ OTP ================ //
        //otp send message
        this.OTPMessageSend = (otp) => __awaiter(this, void 0, void 0, function* () {
            const info = yield this.transporter.sendMail({
                from: this.sender,
                to: this.receiver,
                subject: this.subject,
                html: ` <div>${this.message} 
      <div>
      <p style="font-weight: bold;">Here is the OTP: ${otp} </p>
      
      </div>
      <div>
    <p>Verify your E-mail by this OTP.</p>
    Thank you
      </div>
      </div>`,
            });
        });
        this.OTPGenerator = (digitNumber) => {
            const modulus = BigInt(Math.pow(10, digitNumber));
            const cryptoString = crypto_1.default.randomBytes(16).toString("hex");
            const fullNumber = BigInt(`0x${cryptoString}`);
            let otp = Number(fullNumber % modulus);
            if (digitNumber === 4) {
                if (otp >= 1000) {
                    //for ensuring 4 digit by minimum number of 4 digit
                    this.OTPMessageSend(otp);
                    return { otp };
                }
                else {
                    otp = Math.floor(Math.random() * 9000 + 1000);
                    this.OTPMessageSend(otp);
                    return { otp };
                }
            }
            else if (digitNumber === 6) {
                if (otp >= 100000) {
                    //for ensuring 6 digit by minimum number of 6 digit
                    this.OTPMessageSend(otp);
                    return { otp };
                }
                else {
                    otp = Math.floor(Math.random() * 900000 + 100000);
                    this.OTPMessageSend(otp);
                    return { otp };
                }
            }
        };
        this.sender = sender;
        this.receiver = receiver;
        this.message = message;
        this.authKey = authKey;
    }
}
exports.MainEmail = MainEmail;
