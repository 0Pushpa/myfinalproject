import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    FromID: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide Group"],
    },

    ToID: {
      type: mongoose.Types.ObjectId,
      ref: "Group",
      required: [true, "Please provide Group"],
    },
    userName: {
      type: String,
      required: [true, "Please provide Group"],
    },
    message: {
      type: String,
      required: [true, "Please provide Group"],
    },
    messageType: {
      type: String,
      enum: ["message", "notification"],
      default: "message",
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// module.exports = mongoose.model('Job', GroupSchema)
export default mongoose.model("Message", MessageSchema);
