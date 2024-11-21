const validateInput = (req, res, next) => {
    const { data } = req.body;
    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, error: "Invalid input" });
    }
    next();
  };
  
  module.exports = validateInput;
  