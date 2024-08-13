const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  province: { type: String },  
  district: { type: String },  
  ward: { type: String },    
  detailedAddress: { type: String },   
  gender: { type: String },
  dob: { type: Date },
  avatar: { type: String }
});

module.exports = mongoose.model('User', userSchema);
