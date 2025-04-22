import mongoose from "mongoose";

const FileSchema = new mongoose.Schema(
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

    fileName: {
      type: String,
      required: [true, "Please provide file to upload"],
    },
    fileType: {
      type: String,
      required: [true, "Please provide file to upload"],
    },
  },
  { timestamps: true }
);

// module.exports = mongoose.model('Job', GroupSchema)
export default mongoose.model("Files", FileSchema);
