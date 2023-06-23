
const nodemailer = require('nodemailer');

// Function to send the reset password email
async function sendResetPasswordEmail(email, username, resetPasswordToken) {
  try {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      // Configure the transporter settings based on your email service/provider
      // For example, for Gmail:
      service: 'Gmail',
      auth: {
        user: 'jonemil234',
        pass: 'Pels2001'
      }
    });

    // Compose the email
    const mailOptions = {
      from: 'dharmiegra4@gmail.com', // Sender address
      to: email, // Recipient address (user's email)
      subject: 'Reset Your Password', // Email subject
      html: `<p>Dear ${username},</p>
             <p>We have received a request to reset your password. Please click the link below to reset your password:</p>
             <a href="http://localhost:3001/auth/password-reset:${resetPasswordToken}">Reset Password</a>
             your code is ${resetPasswordToken}
             <p>If you did not request this password reset, please ignore this email.</p>
             <p>Regards,<br>Padlok Team</p>`
    };

    // Send the email
    const result = await transporter.sendMail(mailOptions);
    console.log('Reset password email sent:', result);
  } catch (error) {
    console.error('Error sending reset password email:', error);
  }
}

module.exports = {
  sendResetPasswordEmail
};