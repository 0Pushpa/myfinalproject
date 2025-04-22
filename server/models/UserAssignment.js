import mongoose from "mongoose";

const UserAssignmentSchema = new mongoose.Schema(
  {
    assignmentId: {
      type: mongoose.Types.ObjectId,
      ref: "Assignment",
      required: [true, "Please provide assignment"],
      maxlength: 50,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    name: {
      type: String,
      required: [true, "Please provide file"],
    },
  },
  { timestamps: true }
);

// module.exports = mongoose.model('Job', GroupSchema)
export default mongoose.model("UserAssignment", UserAssignmentSchema);
