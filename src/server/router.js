const express = require("express");
const router = express.Router();

router.get("/chat", (req, res) => {
  res.redirect('/' );
});

module.exports = router;
