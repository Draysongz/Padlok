const mongoose = require('mongoose')


const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    tags: [{ type: String }],
    collaborators: [{ type: String }],
  }, {timestamps:true});


  module.exports = mongoose.model('Projects', ProjectSchema)