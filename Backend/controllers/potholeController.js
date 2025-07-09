const Pothole = require("../models/Pothole");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
exports.createReport = async(req,res)=>{
    try{

         const {description, lat, lng} =req.body;
    
              if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Image upload failed" });
    }
    const newReport = await Pothole.create({
        photoUrl:req.file.path,
        location:{
          type:"Point",
           coordinates: [parseFloat(lng), parseFloat(lat)],
        },
        description,
        reportedBy:req.user._id,
        rewardPoints: 10, 
    });
      console.log("✅ Report Saved:", newReport);

    await User.findByIdAndUpdate(req.user._id, {
        $inc:{points:10}
    });

    res.status(201).json(newReport);
}catch(err){
      console.error("🚨 BACKEND ERROR:", err);
    res.status(500).json({message:err.message});
}
};

exports.getReports =async(req,res)=>{
    try{
        const reports = await Pothole.find().populate("reportedBy","name email");
         res.json(reports);
    }catch(err){
            res.status(500).json({ message: err.message });
    }
};

exports.validateReport = async (req, res) => {
  try {
    const pothole = await Pothole.findById(req.params.id);
    if (!pothole)
      return res.status(404).json({ message: "Pothole not found" });

    // Prevent duplicate validations
    if (pothole.validations.includes(req.user._id)) {
      return res.status(400).json({
        message: "You have already validated this report",
      });
    }

    pothole.validations.push(req.user._id);

    // 🚨 Auto-send if 3 validations
    if (
      pothole.validations.length >= 3 &&
      !pothole.isSentToAuthority
    ) {
      pothole.isSentToAuthority = true;

      const googleMapsLink = `https://www.google.com/maps?q=${pothole.location.lat},${pothole.location.lng}`;

      await sendEmail({
        subject: "🚧 Confirmed Pothole – Action Required",
        html: `
          <h2>🚨 Pothole Confirmed by Citizens</h2>
          <p><strong>Description:</strong> ${pothole.description}</p>
          <p><strong>Location:</strong> <a href="${googleMapsLink}">${googleMapsLink}</a></p>
          <img src="${pothole.photoUrl}" width="400" />
          <p><strong>Confirmed by:</strong> ${pothole.validations.length} users</p>
        `
      });

      console.log("📬 Email sent to authority.");
    }

    await pothole.save();

    await User.findByIdAndUpdate(req.user._id, {
      $inc: { points: 5 },
    });

    res.json(pothole);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getNearbyReports = async(req,res)=>{
    const{lat,lng,radius=5}=req.query;

    if(!lat || !lng){
        return res.status(400).json({message:"Latitude and longitude required"});
    }

    try{
        const reports = await Pothole.find({
            location:{
                $nearSphere:{
                    $geometry:{
                    type:"Point",
                     coordinates:[parseFloat(lng), parseFloat(lat)],
                    },
                    $maxDistance:radius*1000,
                },
            },
        }).populate("reportedBy", "name email");
        res.json(reports);

    }catch(err){
        res.status(500).json({message:err.message});
    }
}

exports.getMyReports = async (req, res) => {
  try {
    console.log("🧪 Authenticated User:", req.user);
     if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const myReports = await Pothole.find({ reportedBy: req.user._id })
      .populate("reportedBy", "name email")
      .sort({ createdAt: -1 });

    // No need to overwrite rewardPoints unless you want to ensure it always exists
    const reportsWithPoints = myReports.map((report) => {
      const obj = report.toObject();
      obj.rewardPoints = typeof obj.rewardPoints === "number" ? obj.rewardPoints : 10;
      return obj;
    });

    res.json(reportsWithPoints);
  } catch (err) {
    console.error("🔥 getMyReports Error:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.deleteReport = async (req, res) => {
  try {
    const pothole = await Pothole.findById(req.params.id);

    if (!pothole) {
      return res.status(404).json({ message: "Report not found" });
    }

    const rewardToRemove = pothole.rewardPoints || 10;

    // Only the owner or admin can delete
    const isOwner = pothole.reportedBy.toString() === req.user._id.toString();
    const isAdmin = req.user.isAdmin;

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await pothole.deleteOne();

    // Only reduce points if owner deletes
    if (isOwner) {
      await User.findByIdAndUpdate(req.user._id, {
        $inc: { points: -rewardToRemove },
      });
    }

    res.json({ message: "Report deleted successfully, points adjusted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

