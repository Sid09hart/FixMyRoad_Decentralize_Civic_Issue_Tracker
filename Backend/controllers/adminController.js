const Pothole = require("../models/Pothole");

exports.getAllReports = async(req,res)=>{
    try{
        const status = req.query.status;
        const query = status? {status}:{};
        const reports = await Pothole.find(query)
        .populate("reportedBy", "name email")
        .sort({createdAt:-1});
        res.json(reports);
    }catch(err){
        res.status(500).json({message:err.message});
    }
};
const sendEmail = require("../utils/sendEmail");

exports.updateReportStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const report = await Pothole.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("reportedBy", "name email");

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    // ✅ Notify user about the status change
    await sendEmail({
      to: report.reportedBy.email,
      subject: `Your pothole report has been ${status.toLowerCase()}`,
      html: `
        <p>Hi ${report.reportedBy.name},</p>
        <p>Your report has been <strong>${status}</strong>.</p>
        <p><strong>Description:</strong> ${report.description}</p>
        <p>Thanks for helping improve road safety.</p>
      `,
    });

    // ✅ Notify authority if approved AND NOT already sent by validations
    if (status === "approved" && !report.isSentToAuthority) {
      const googleMapsLink = `https://www.google.com/maps?q=${report.location?.lat},${report.location?.lng}`;

      await sendEmail({
        
        subject: "🚧 New Pothole Report Approved",
        html: `
          <h2>A pothole report was just approved</h2>
          <p><strong>Description:</strong> ${report.description}</p>
          <p><strong>Reported By:</strong> ${report.reportedBy.name} (${report.reportedBy.email})</p>
          <p><strong>Reported On:</strong> ${new Date(report.createdAt).toLocaleString()}</p>
          ${report.photoUrl ? `<img src="${report.photoUrl}" width="300" alt="Pothole Photo" />` : ""}
          ${
            report.location
              ? `<p><strong>Location:</strong> <a href="${googleMapsLink}">${googleMapsLink}</a></p>`
              : ""
          }
          <p>Please take necessary action.</p>
        `,
      });
        console.log("Email sent");


      // Mark as sent to prevent duplicate authority notifications
      report.isSentToAuthority = true;
      await report.save();
    }

   return res.json({ report, emailSent: true });

  } catch (err) {
    console.error("Update status error:", err);
    res.status(500).json({ message: err.message });
  }
};


exports.updateRewardPoints =async(req,res)=>{
    try{
        const{rewardPoints}= req.body;

        const report= await Pothole.findByIdAndUpdate(
            req.params.id,
            {rewardPoints},
            {new:true}
        ).populate("reportedBy", "name email");

            if (!report) return res.status(404).json({ message: "Report not found" });

            //update user points
            await User.findByIdAndUpdate(report.reportedBy._id,{
                  $set: { points: rewardPoints },
            })
            res.json(report);
    }catch(err){
    res.status(500).json({ message: err.message });

    }
}