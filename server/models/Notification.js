import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    UserID: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide User"],
    },
    message: {
      type: String,
      required: [true, "Notification message is required"],
      maxlength: 100,
      minlength: 3,
    },
    type: {
      type: String,
      enum: ["normal", "confirmation", "reference"],
      default: "normal",
    },
    url: {
      type: String,
      required: false,
      maxlength: 255,
      minlength: 5,
    },
    rejectUrl: {
      type: String,
      required: false,
      maxlength: 255,
      minlength: 5,
    },
    remark: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
      required: false,
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// module.exports = mongoose.model('Job', GroupSchema)
export default mongoose.model("Notification", NotificationSchema);
