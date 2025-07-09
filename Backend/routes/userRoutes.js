const express = require("express");
const router = express.Router();
const {getLeaderboard,getCurrentUser} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");


router.get("/leaderboard",getLeaderboard);
// routes/userRoutes.js
router.get("/me", protect, getCurrentUser);


module.exports=router;