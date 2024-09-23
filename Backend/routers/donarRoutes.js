const express = require('express');
const router = express.Router();
const Donor = require('./../models/Donor');  // Adjust path as necessary
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { authMiddleware } = require('./../middlewares/authMiddleware');

const generateToken = require("./../utils/generateToken");


// Registration Route
router.post('/signup', async (req, res, next) => {
  try {
    const {
      firstName, lastName, phone, email, password, address, age, bloodGroup,
      district, city, pincode, lastDonationMonth, lastDonationYear, termsAccepted
    } = req.body;

    const userExist = await Donor.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const donor = await Donor.create({
      firstName, lastName, phone, email, password, address, age, bloodGroup,
      district, city, pincode, lastDonationMonth, lastDonationYear, termsAccepted
    });

    const token = generateToken(donor._id, donor.email);
    res.status(200).json({
      message: "Registration Successful. Please verify your email.",
      token,
      data: { ...donor._doc, password: undefined }
    });
  } catch (error) {
    next(error);
  }
});

// Login Route
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const donor = await Donor.findOne({ email });

    if (!donor) {
      return res.status(400).json({ msg: "User not found. Please sign up first." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, donor.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ msg: "Invalid credentials." });
    }

    const token = generateToken(donor._id, donor.email);
    res.status(200).json({
      message: "Login Successful",
      token,
      data: { ...donor._doc, password: undefined }
    });
  } catch (error) {
    next(error);
  }
});

// Logout Route
router.post('/logout', (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  res.status(200).json({ message: 'Logged out successfully' });
});


// GET /donor/profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const donor = await Donor.findById(req?.user?.userId); 
    console.log(req.user);

    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }
    res.json({ data: donor });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Search Route
router.get('/search', async (req, res) => {
  try {
    const { bloodGroup, district, city } = req.query;
    
    // Build the query object
    const query = {};
    if (bloodGroup) query.bloodGroup = bloodGroup;
    if (district) query.district = district;
    if (city) query.city = city;

    const donors = await Donor.find(query);
    
    res.status(200).json({ donors });
  } catch (error) {
    console.error('Error during search:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



// PUT /donor/update
// router.put('/update', authMiddleware, async (req, res) => {
//   try {
//     const donor = await Donor.findById(req.user.userId);

//     if (!donor) {
//       return res.status(404).json({ message: 'Donor not found' });
//     }

//     const {
//       firstName, lastName, phone, email, address, age, bloodGroup,
//       district, city, pincode, lastDonationMonth, lastDonationYear, termsAccepted
//     } = req.body;

//     // Update donor fields
//     donor.firstName = firstName || donor.firstName;
//     donor.lastName = lastName || donor.lastName;
//     donor.phone = phone || donor.phone;
//     donor.email = email || donor.email;
//     donor.address = address || donor.address;
//     donor.age = age || donor.age;
//     donor.bloodGroup = bloodGroup || donor.bloodGroup;
//     donor.district = district || donor.district;
//     donor.city = city || donor.city;
//     donor.pincode = pincode || donor.pincode;
//     donor.lastDonationMonth = lastDonationMonth || donor.lastDonationMonth;
//     donor.lastDonationYear = lastDonationYear || donor.lastDonationYear;
//     donor.termsAccepted = termsAccepted !== undefined ? termsAccepted : donor.termsAccepted;

//     // Save updated donor
//     await donor.save();
//     res.status(200).json({ message: 'Profile updated successfully', data: donor });
//   } catch (error) {
//     console.error('Error updating profile:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });


router.patch('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find donor by ID
    const donor = await Donor.findById(id);
    
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }
    
    // Destructure fields from request body
    const {
      firstName, lastName, phone, email, address, age, bloodGroup,
      district, city, pincode, lastDonationMonth, lastDonationYear, termsAccepted
    } = req.body;

    // Update donor fields with validation or checks as necessary
    donor.firstName = firstName || donor.firstName;
    donor.lastName = lastName || donor.lastName;
    donor.phone = phone || donor.phone;
    donor.email = email || donor.email;
    donor.address = address || donor.address;
    donor.age = age || donor.age;
    donor.bloodGroup = bloodGroup || donor.bloodGroup;
    donor.district = district || donor.district;
    donor.city = city || donor.city;
    donor.pincode = pincode || donor.pincode;
    donor.lastDonationMonth = lastDonationMonth || donor.lastDonationMonth;
    donor.lastDonationYear = lastDonationYear || donor.lastDonationYear;
    donor.termsAccepted = termsAccepted !== undefined ? termsAccepted : donor.termsAccepted;

    // Save updated donor
    await donor.save();

    // Return the updated donor
    res.status(200).json({ message: 'Profile updated successfully', data: donor });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



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
