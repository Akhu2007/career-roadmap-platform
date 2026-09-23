const express = require("express");

const router = express.Router();

const multer = require("multer");

const { uploadResume } = require("../controllers/resumeController");

const protect = require("../middleware/authMiddleware");

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Multer upload middleware
const upload = multer({
  storage: storage,
});

// Resume upload route
router.post("/upload", protect, upload.single("resume"), uploadResume);

module.exports = router;
