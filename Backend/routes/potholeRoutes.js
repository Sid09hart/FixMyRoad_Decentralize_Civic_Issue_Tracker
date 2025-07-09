const express = require("express");
const router = express.Router();
const {createReport ,  getMyReports ,getReports,validateReport} =  require("../controllers/potholeController");
const{protect} =require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const { getNearbyReports } = require("../controllers/potholeController");
const { deleteReport } = require("../controllers/potholeController");


router.post("/",protect,upload.single("photo"),createReport);
router.get("/",getReports);
router.put("/:id/validate", protect, validateReport);
router.get("/nearby", getNearbyReports);
router.get("/me", protect, getMyReports);
router.delete("/:id", protect, deleteReport);



module.exports = router;