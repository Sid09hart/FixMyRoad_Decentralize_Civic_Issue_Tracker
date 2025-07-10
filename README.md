# 🛣️ FixMyRoad – Report Potholes, Improve Roads

FixMyRoad is a modern civic-tech platform that empowers citizens to report potholes in their locality and incentivizes participation through a reward-based crowd validation system. Admins can manage reports, validate claims, and notify local authorities.

<br/>

![FixMyRoad Screenshot](./screenshot.png)

---

## 🚀 Live Demo

👉 [View Live App](fix-my-road-decentralize-civic-issue-tr-siddharth-negi-projects.vercel.app)

---

## ✨ Features

### 👥 Users
- 📸 Report potholes with description and geolocation
- 🗺️ View personal dashboard with submitted reports
- 🧠 Validate nearby pothole reports to earn more points
- 🎁 Track earned reward points

### 🛡️ Admins
- 📂 View, filter, and manage all user reports
- ✅ Approve / ❌ Reject reports with one click
- 🗑️ Delete spam or irrelevant reports
- ✏️ Edit reward points manually
- ✉️ Automatically email users on approval/rejection

---

## 🧰 Tech Stack

- **Frontend:** Next.js 14, TypeScript, TailwindCSS, Shadcn UI  
- **Backend:** Node.js, Express.js, MongoDB, Mongoose  
- **Auth:** JWT-based authentication with role check (`isAdmin`)  
- **File Upload:** Cloudinary  
- **Email:** Resend API  
- **Geolocation:** MongoDB Geospatial Index + User Coordinates

---

## 📦 Installation

```bash
# 1. Clone the repo
git clone https://github.com/your-username/fixmyroad.git
cd fixmyroad

# 2. Install dependencies
npm install

# 3. Set environment variables
# .env (both frontend and backend)
MONGODB_URI=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
RESEND_API_KEY=

# 4. Run the app
npm run dev
