const express = require('express');
const router = express.Router();
const Organization = require('./../models/Organization');
const Donor = require('./../models/Donor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require("../middlewares/authMiddleware");
const generateToken = require("./../utils/generateToken");

// Signup for Organization
router.post('/orgsignup', async (req, res, next) => {
  try {
    const { organizationName, email, password, address, headOfOrganization, phoneNumber } = req.body;

    const userExist = await Organization.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const organization = await Organization.create({
      organizationName,
      email,
      password,
      address,
      headOfOrganization,
      phoneNumber,
    });

    const token = generateToken(organization._id, organization.email);
    res.status(200).json({
      message: "Registration Successful.",
      token,
      data: { ...organization._doc, password: undefined }
    });
  } catch (error) {
    next(error);
  }
});

// Unified Login Route
// router.post('/login', async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     let user = await Donor.findOne({ email });
//     let userType = 'donor';

//     if (!user) {
//       user = await Organization.findOne({ email });
//       userType = 'organization';
//     }

//     if (!user) {
//       return res.status(400).json({ msg: "User not found. Please sign up first." });
//     }

//     const isPasswordCorrect = await bcrypt.compare(password, user.password);
//     if (!isPasswordCorrect) {
//       return res.status(400).json({ msg: "Invalid credentials." });
//     }

//     const token = generateToken(user._id, user.email, userType);
//     res.status(200).json({
//       message: "Login Successful",
//       token,
//       data: { ...user._doc, password: undefined }
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// Unified Login Route
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await Donor.findOne({ email });
    let userType = 'donor';

    if (!user) {
      user = await Organization.findOne({ email });
      userType = 'organization';
    }

    if (!user) {
      return res.status(400).json({ msg: "User not found. Please sign up first." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ msg: "Invalid credentials." });
    }

    const token = generateToken(user._id, user.email, userType);
    res.status(200).json({
      message: "Login Successful",
      token,
      data: { ...user._doc, password: undefined, userType } // Include userType in the response
    });
  } catch (error) {
    next(error);
  }
});


// Get profile information by ID
router.get('/profile', authMiddleware, async (req, res, next) => {
  try {
    const userId = req.user._id;

    let user = await Donor.findById(userId);
    if (!user) {
      user = await Organization.findById(userId);
    }

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json({ data: { ...user.toObject(), password: undefined } });
  } catch (error) {
    next(error);
  }
});

// Get profile information by ID (alternative route)
router.get('/:id', authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    let user = await Donor.findById(id);

    if (!user) {
      user = await Organization.findById(id);
    }

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json({ data: { ...user._doc, password: undefined } });
  } catch (error) {
    next(error);
  }
});

// Edit profile
router.put('/update', authMiddleware, async (req, res, next) => {
  try {
    const { organizationName, address, headOfOrganization, phoneNumber } = req.body;

    const organization = await Organization.findByIdAndUpdate(
      req.user._id,
      {
        organizationName,
        address,
        headOfOrganization,
        phoneNumber,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Profile updated successfully",
      data: { ...organization._doc, password: undefined }
    });
  } catch (error) {
    next(error);
  }
});

// Logout
router.post('/logout', (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

// Show All Organizations
router.get("/", async (req, res, next) => {
  try {
    const organizations = await Organization.find();
    res.status(200).json({ organizations });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
