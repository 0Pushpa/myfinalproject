import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide group name"],
      maxlength: 50,
    },
    description: {
      type: String,
      required: [false],
      maxlength: 100,
    },
    status: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      enum: ["private", "public"],
      default: "private",
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
export default mongoose.model("Group", GroupSchema);
