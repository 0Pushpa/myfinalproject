import mongoose from "mongoose";

const GroupUserSchema = new mongoose.Schema(
  {
    GroupID: {
      type: mongoose.Types.ObjectId,
      ref: "Group",
      required: [true, "Please provide Group"],
    },
    UserID: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide User"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// module.exports = mongoose.model('Job', GroupSchema)
export default mongoose.model("GroupUser", GroupUserSchema);
