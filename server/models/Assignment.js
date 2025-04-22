import mongoose from "mongoose";

const AssignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide event name"],
      maxlength: 50,
    },
    deadline: {
      type: Date,
      required: [true, "Please provide end date"],
    },
    groupId: {
      type: mongoose.Types.ObjectId,
      ref: "Group",
      required: [true, "Please provide group "],
    },
    description: {
      type: String,
      required: [true, "Please provide description "],
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
export default mongoose.model("Assignment", AssignmentSchema);
