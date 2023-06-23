const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username:{ type: String, required: true, unique:true },
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true },
    uploadedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Projects' }],
    uploadedItemsForSale: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MarketPlace' }],
    uploadedEducationalMaterials: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Courses' }],
    transactionHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
    purchases: {
      education: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Courses' }],
      musicAndBeats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MarketPlace' }],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
