import mongoose from 'mongoose'

const DataStatSchema = new mongoose.Schema(
  {
    GroupID: {
        type: mongoose.Types.ObjectId,
        ref: 'Group',
        required: [true, 'Please provide Group'],
      },
      beforeCompression: {
        type: Number,
        require: true,
      },
      afterCompression: {
        type: Number,
        require: true,
      },
  },
  { timestamps: true }
)

// module.exports = mongoose.model('Job', GroupSchema)
export default mongoose.model('DataStat', DataStatSchema);