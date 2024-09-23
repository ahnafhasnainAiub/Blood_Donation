const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema, model } = mongoose;

const donorSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
  },
  password: {
    type: String,
    required: true
 },
  address: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 1
  },
  bloodGroup: {
    type: String,
    required: true,
    enum: ["O+", "A+", "B+", "AB+", "A-", "O-", "B-", "AB-"] 
  },
  district: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  pincode: {
    type: String,
    required: true,
    trim: true
  },

  lastDonationMonth: {
    type: String,
    required: true,
    trim: true
  },
  
  lastDonationYear: {
    type: String,
    required: true,
    trim: true
  },
  verified: {
    type:Boolean,
    default:false
  },
  termsAccepted: {
    type: Boolean,
    required: true,
    default: false
  }
}, { timestamps: true });


//Secure the password with the bcrypt
donorSchema.pre("save", async function(next){
  const user = this;

  if(!user.isModified("password")){
     next();
  }
   
  try{
     const saltRound = await bcrypt.genSalt(10);
     const hash_password = await bcrypt.hash(user.password, saltRound);
     user.password = hash_password;

  } catch(err){
     next(err);
  }


});

const Donor = model('Donor', donorSchema);

module.exports = Donor;
