const User = require('../models/User');
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

async function register(req, res) {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: cryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
      firstName: req.body.firstName,
      lastName: req.body.lastName
    });
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

module.exports = {
  register,
  login
};
