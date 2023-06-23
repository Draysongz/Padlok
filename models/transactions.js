const mongoose = require('mongoose')



const transactionSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
}, {timestamps:true})



module.exports = mongoose.model('Transaction', transactionSchema)