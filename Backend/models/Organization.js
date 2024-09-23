const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema, model } = mongoose;


const organizationSchema = new mongoose.Schema({
  
  organizationName: {
    type: String,
    required: [true, 'Organization name is required!'],
    trim: true,
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
    required: [true, 'Address is required!'],
    trim: true,
  },
  headOfOrganization: {
    type: String,
    required: [true, 'Head of organization is required!'],
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required!'],
    validate: {
      validator: function(v) {
        return /^[0-9\b]+$/.test(v); 
      },
      message: props => `${props.value} is not a valid phone number!`
    },
  },
});

//Secure the password with the bcrypt
organizationSchema.pre("save", async function(next){
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


// Create the model
const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;
