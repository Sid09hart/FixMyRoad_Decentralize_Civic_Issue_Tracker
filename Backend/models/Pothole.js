const mongoose = require("mongoose");

const potholeSchema = new mongoose.Schema(
  {
    photoUrl: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
        default: "Point",
      },
      coordinates: {
        type: [Number], // [lng, lat]
        required: true,
      },
    },
    description: String,
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    validations: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    isSentToAuthority: {
      type: Boolean,
      default: false,
    },
    points: {
      type: Number,
      default: 0,
    },
    rewardPoints: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Add geospatial index
potholeSchema.index({ location: "2dsphere" });

potholeSchema.virtual("lat").get(function () {
  return Array.isArray(this.location?.coordinates) ? this.location.coordinates[1] : null;
});

potholeSchema.virtual("lng").get(function () {
  return Array.isArray(this.location?.coordinates) ? this.location.coordinates[0] : null;
});


module.exports = mongoose.model("Pothole", potholeSchema);
