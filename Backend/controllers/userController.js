const User = require("../models/User");

exports.getLeaderboard = async(req,res)=>{
    try{
        const topUsers= await User.find({})
        .sort({points:-1})
        .limit(10)
        .select("name email points");

        res.json(topUsers);
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

// controllers/userController.js
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("name email points");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
