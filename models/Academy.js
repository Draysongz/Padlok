const mongoose = require('mongoose')



const courses = new mongoose.Schema({
    title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, required: true },
}, {timestamps:true})


module.exports = mongoose.model('Courses', courses)