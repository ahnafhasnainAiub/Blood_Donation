const express = require("express");
const router = express.Router();
const Donor = require("../models/Donor");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const dotenv = require("dotenv");
const generateToken = require("./../utils/generateToken");

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "maddison53@ethereal.email",
      pass: "jn7jnAPss4f63QBp6D",
    },
  });
  
// Registration route
router.post("/signup", async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      email,
      password,
      address,
      age,
      bloodGroup,
      district,
      city,
      pincode,
      lastDonationMonth,
      lastDonationYear,
      termsAccepted,
    } = req.body;

    const userExist = await Donor.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const donor = await Donor.create({
      firstName,
      lastName,
      phone,
      email,
      password,
      address,
      age,
      bloodGroup,
      district,
      city,
      pincode,
      lastDonationMonth,
      lastDonationYear,
      termsAccepted,
    });

    // Generate token
    const token = crypto.randomBytes(20).toString("hex");

    // Save the verification token to the donor record
    donor.verificationToken = token;
    await donor.save();

    // Send verification email
    const verificationUrl = `http://localhost:8000/donor/verify/${token}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification",
      text: `Please verify your email by clicking the following link: ${verificationUrl}`,
    };
    console.log("send", mailOptions)
    await transporter.sendMail(mailOptions);

    // Return success response
    const { password: _, ...donorData } = donor._doc;
    res.status(200).json({
      message:
        "Congratulations! Registration Successful. Please check your email to verify your account.",
      data: donorData,
    });
  } catch (error) {
    next(error);
  }
});

// Email verification route
router.get("/verify/:token", async (req, res, next) => {
  try {
    const { token } = req.params;

    const donor = await Donor.findOne({ verificationToken: token });
    if (!donor) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    donor.verified = true;
    donor.verificationToken = undefined;
    await donor.save();

    res.status(200).json({ message: "Email successfully verified" });
  } catch (error) {
    next(error);
  }
});

// Donor Registration
// router.post('/', async (req, res, next) => {
//     try {
//         const data = req.body;
//         const newDonor = new Donor(data);
//         const addDonor = await newDonor.save();
//         res.status(201).json(addDonor);
//     } catch(err){
//         next(err);
//     }
// });

// Show All Donors
router.get("/", async (req, res, next) => {
  try {
    const donors = await Donor.find();
    res.status(200).json({ donors });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
