const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authControllers");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me",protect,async(req,res)=>{
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
})

module.exports = router;
