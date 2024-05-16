import nodemailer from "nodemailer";
import crypto from "crypto";

export class MainEmail {
  private URL!: string;
  private token!: string;
  constructor(
    public sender: string,
    public receiver: string,
    public authKey: string,
    public frontendBaseURL: string,
    public subject: string,
    public message: string
  ) {
    this.sender = sender;
    this.receiver = receiver;
    this.message = message;
    this.authKey = authKey;
  }

  //=========================== initializing the transporter ============================

  private transporter = nodemailer.createTransport({
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

  public EmailVerificationLink = async (): Promise<{
    token: string;
    url: string;
  }> => {
    this.token = crypto.randomBytes(32).toString("hex"); // generate token

    this.URL = `${this.frontendBaseURL}/verify/${this.token}`; // generate verification url

    const info = await this.transporter.sendMail({
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
  };

  // ================ OTP ================ //

  //otp send message

  private OTPMessageSend = async (otp: number) => {
    const info = await this.transporter.sendMail({
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
  };

  public OTPGenerator = (digitNumber: 4 | 6) => {
    const modulus = BigInt(Math.pow(10, digitNumber));
    const cryptoString = crypto.randomBytes(16).toString("hex");
    const fullNumber = BigInt(`0x${cryptoString}`);

    let otp = Number(fullNumber % modulus);
    if (digitNumber === 4) {
      if (otp >= 1000) {
        //for ensuring 4 digit by minimum number of 4 digit
        this.OTPMessageSend(otp);
        return { otp };
      } else {
        otp = Math.floor(Math.random() * 9000 + 1000);
        this.OTPMessageSend(otp);
        return { otp };
      }
    } else if (digitNumber === 6) {
      if (otp >= 100000) {
        //for ensuring 6 digit by minimum number of 6 digit
        this.OTPMessageSend(otp);
        return { otp };
      } else {
        otp = Math.floor(Math.random() * 900000 + 100000);
        this.OTPMessageSend(otp);
        return { otp };
      }
    }
  };
}
