const User = require('../models/User');
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const {sendResetPasswordEmail} = require('./sendMail')

async function register(req, res) {
    try {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: cryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
        firstName: req.body.firstName,
        lastName: req.body.lastName
      });
  
      const isUsername = await User.findOne({ username: req.body.username });
      const isEmail = await User.findOne({ email: req.body.email });
  
      if (isUsername) {
        return res.status(401).json('Username exists');
      }
      if (isEmail) {
        return res.status(401).json('Email exists');
      }
  
      const savedUser = await newUser.save();
      console.log(savedUser);
      res.status(200).json(savedUser); // Send the saved user as the response
    } catch (error) {
      res.status(503).json(error);
    }
  }
  
async function login(req, res) {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(401).json('User not found');
    } else {
      const hashedPassword = cryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
      const originalPassword = hashedPassword.toString(cryptoJS.enc.Utf8);
      
      if (originalPassword !== req.body.password) {
        return res.status(401).json('Wrong password');
      } else {
        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SEC, { expiresIn: '3d' });
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
}
async function sendresetPassword(req, res) {
    try {
      console.log('Sending reset password request');
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        console.log('User not found');
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Generate a reset token and expiry date
      user.resetPasswordToken = crypto.randomBytes(32).toString('hex');
      user.resetPasswordExpiry = Date.now() + 3600; // 1 hour
  
      try {
        await user.save();
        // Send an email to the user with a link to reset their password
        console.log('Sending reset password email');
        const sent = await sendResetPasswordEmail(user.email, user.username, user.resetPasswordToken);
        res.status(200).json({ message: 'Reset password email sent' });
      } catch (error) {
        console.log('Error saving user:', error);
        res.status(400).send(error);
      }
    } catch (error) {
      console.log('Internal server error:', error);
      res.status(500).json(error);
    }
  }
  
  
async function resetPassword(req, res){
    try {
        User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpiry: {
              $gt: Date.now()
            }
          }, (err, user) => {
            if (err) {
              res.status(400).send(err);
            } else if (user) {
              user.password = req.body.password;
              user.resetPasswordToken = null;
              user.resetPasswordExpiry = null;
              user.save((err) => {
                if (err) {
                  res.status(400).send(err);
                } else {
                  res.send();
                }
              });
            } else {
              res.status(401).send();
            }
          });
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
  register,
  login,
  sendresetPassword,
  resetPassword,

};
