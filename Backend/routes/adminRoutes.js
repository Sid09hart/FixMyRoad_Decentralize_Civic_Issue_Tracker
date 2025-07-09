const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");
const{
    getAllReports,
    updateReportStatus,updateRewardPoints
}=require("../controllers/adminController");

router.get("/reports", protect,isAdmin,getAllReports);
router.put("/reports/:id/status",protect,isAdmin,updateReportStatus);
router.patch("/reports/:id/reward", protect, isAdmin, updateRewardPoints);

module.exports=router;
