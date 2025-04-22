import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide event name"],
      maxlength: 50,
    },
    allDay: {
      type: Boolean,
      default: false,
    },
    start: {
      type: Date,
      required: [true, "Please provide start date"],
    },
    end: {
      type: Date,
      required: [true, "Please provide end date"],
    },
    groupId: {
      type: mongoose.Types.ObjectId,
      ref: "Group",
      required: [true, "Please provide group "],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

// module.exports = mongoose.model('Job', GroupSchema)
export default mongoose.model("Schedule", ScheduleSchema);
