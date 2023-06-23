const mongoose = require('mongoose')


const MarketSchema=  new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    seller: { type: String, required: true },
  }, {timestamps:true});


  module.exports = mongoose.model('MarketPlace', MarketSchema)