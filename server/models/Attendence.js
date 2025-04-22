import mongoose from "mongoose";

const AttendanceReport = new mongoose.Schema(
  {
    groupId: {
      type: mongoose.Types.ObjectId,
      ref: "Group",
      required: [true, "Please provide Group"],
    },
    file_name: {
      type: String,
      required: [true, "Please provide file name"],
    },
  },
  { timestamps: true }
);

// module.exports = mongoose.model('Job', GroupSchema)
export default mongoose.model("Attendence", AttendanceReport);
