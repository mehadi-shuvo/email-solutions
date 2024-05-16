# email-solutions

This package is used for sending email verification link and OTP.

## Features

- **Email Verification**: Sends a verification link to the user's email.
- **OTP Verification**: Sends an OTP to the user's email and verifies it.

## Technologies

- **Node.js**
- **TypeScript**
- **NodeMailer & @types/nodemailer**
- **JavaScript ES6**

## Installation

```bash
npm i email-solutions
```

## How to use?

### Initialize

```typescript
const EmailSolution = new MainEmail(
  "senderEmail@gmail.com",
  "receiverEmail@gmail.com",
  "trea hewwe sseer demo", // for the generate Gmail app password visit this  documentation: https://documentation.provar.com/documentation/applications-testing/email-testing/gmail-connection-in-provar-with-app-password/
  "http://www.google.com/",
  "Your email subject",
  "example message"
  /*
  write the message by following instruction: 
  <p>Hello there, </p> 
  <p>Welcome to xyz Ltd. We are verifying your email because we are not allow any unauthorized account.</p>
  .....
  */
);
```

### Send Verification Link

```typescript
const verificationLink = EmailSolution.EmailVerificationLink();
```

### Send OTP

```typescript
const otp = EmailSolution.OTPGenerator(6); // 4 0r 6 digit OTP send by parameter 4/6;
```
