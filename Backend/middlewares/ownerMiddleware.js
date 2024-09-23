const jwt = require("jsonwebtoken");
const Donor = require("./../models/Donor");

const authMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"]; // Changed to req.headers

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid or missing token" });
  }

  const jwtToken = token.replace("Bearer ", "").trim();
  console.log("Token from auth Middleware:", jwtToken);

  try {
    // Verify the JWT token
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

    // Find the donor by ID from the decoded token
    const donorData = await Donor.findById(decoded._id).select({
      password: 0, // Exclude the password field
    });

    if (!donorData) {
      return res.status(401).json({ message: "Invalid token, donor not found" });
    }

    // Attach donor data to request object
    req.donor = donorData;
    req.token = token;
    req.donorID = donorData._id;

    next();
  } catch (err) {
    console.error("Error in authMiddleware:", err); // Improved error logging
    return res.status(401).json({ message: "Unauthorized, invalid token provided" });
  }
};

const isOwner = async (req, res, next) => {
  const { donorID } = req.params; // Assuming donor ID is passed as a route parameter

  if (req.donorID.toString() !== donorID) {
    return res.status(403).json({ message: "Access denied, you are not the owner of this profile" });
  }

  next();
};

module.exports = { authMiddleware, isOwner };
