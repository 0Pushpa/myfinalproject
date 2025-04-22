import mongoose from 'mongoose'

const SectorSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: [true, 'Please provide Sector name'],
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
    
  },
  { timestamps: true }
)

// module.exports = mongoose.model('Job', GroupSchema)
export default mongoose.model('Sector', SectorSchema);