import mongoose from 'mongoose'

const GroupSectorSchema = new mongoose.Schema(
  {
    GroupID: {
        type: mongoose.Types.ObjectId,
        ref: 'Group',
        required: [true, 'Please provide Group'],
      },
      SectorID: {
        type: mongoose.Types.ObjectId,
        ref: 'Sector',
        required: [true, 'Please provide Sector'],
      },
    status: {
      type: Boolean,
      default: true,
    },
    
  },
  { timestamps: true }
)

// module.exports = mongoose.model('Job', GroupSchema)
export default mongoose.model('GroupSector', GroupSectorSchema);