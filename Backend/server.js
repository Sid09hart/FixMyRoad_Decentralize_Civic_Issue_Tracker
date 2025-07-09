const express = require("express");
const mongoose = require("mongoose");
const dotenv  = require("dotenv");
const cors = require("cors");
dotenv.config();


// 🧪 DEBUG Cloudinary .env values
console.log("✅ MONGO:", process.env.MONGO_URI);
console.log("✅ CLOUDINARY NAME:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("✅ CLOUDINARY KEY:", process.env.CLOUDINARY_API_KEY);
console.log("✅ CLOUDINARY SECRET:", process.env.CLOUDINARY_API_SECRET ? "✅" : "❌");






const app = express();

app.use(cors({
    origin: "http://localhost:3001", // frontend URL
    credentials: true,
  }));
app.use(express.json());



const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const potholeRoutes = require("./routes/potholeRoutes");
app.use("/api/potholes",potholeRoutes);

const userRoutes= require("./routes/userRoutes");
app.use("/api/users",userRoutes);

const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin",adminRoutes);



app.get("/",(req,res)=>{
    res.send("✅ FixMyRoad API is running");
})

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected successfully"))
.catch((err) => console.error("❌ MongoDB connection failed:", err));

// Start the server
const PORT = process.env.PORT ||3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


