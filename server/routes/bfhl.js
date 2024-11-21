const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const validateInput = require("../middleware/validateInput");

const dbPath = path.join(__dirname, "../db/database.json");

router.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

router.post("/bfhl", validateInput, (req, res) => {
  try {
    // Load user data from JSON database
    const db = JSON.parse(fs.readFileSync(dbPath));
    const user = db.user;

    const { data, file_b64 } = req.body;

    // Extract numbers and alphabets
    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => /^[A-Za-z]$/.test(item));

    // Find highest lowercase alphabet
    const lowercaseAlphabets = alphabets.filter((ch) => /^[a-z]$/.test(ch));
    const highestLowercaseAlphabet =
      lowercaseAlphabets.length > 0
        ? [lowercaseAlphabets.sort().pop()]
        : [];

    // Check for primes
    const isPrime = (num) => {
      num = parseInt(num);
      if (num < 2) return false;
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
      }
      return true;
    };
    const isPrimeFound = numbers.some((num) => isPrime(num));

    // Handle file validation
    let fileValid = false;
    let fileMimeType = null;
    let fileSizeKb = null;

    if (file_b64) {
      try {
        const buffer = Buffer.from(file_b64, "base64");
        fileSizeKb = (buffer.length / 1024).toFixed(2);
        fileMimeType = "unknown"; // Placeholder for MIME type detection logic
        fileValid = true;
      } catch (err) {
        fileValid = false;
      }
    }

    // Send response
    res.status(200).json({
      is_success: true,
      user_id: user.user_id,
      email: user.email,
      roll_number: user.roll_number,
      numbers,
      alphabets,
      highest_lowercase_alphabet: highestLowercaseAlphabet,
      is_prime_found: isPrimeFound,
      file_valid: fileValid,
      file_mime_type: fileMimeType,
      file_size_kb: fileSizeKb,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ is_success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
