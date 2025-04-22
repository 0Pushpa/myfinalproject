import mongoose from "mongoose";

const AttendanceReport = new mongoose.Schema(
  {
    attendanceId: {
      type: mongoose.Types.ObjectId,
      ref: "Attendance",
      required: [true, "Please provide attendance id"],
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user id"],
    },
    joined: {
      type: Date,
      required: [true, "Please provide joined date id"],
    },
    left: {
      type: Date,
      required: [true, "Please provide left date id"],
    },
  },
  { timestamps: true }
);

// module.exports = mongoose.model('Job', GroupSchema)
export default mongoose.model("AttendanceDetails", AttendanceReport);
