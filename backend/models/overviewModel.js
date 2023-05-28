import mongoose from 'mongoose'

const overviewSchema = mongoose.Schema(
  {
    users: {
      type: Number,
      required: true,
      default: 0,
    },
    vendors: {
      type: Number,
      required: true,
      default: 0,
    },
    vendorcreations: {
      type: Number,
      required: true,
      default: 0,
    },
    products: {
      type: Number,
      required: true,
      default: 0,
    },
    orders: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Overview = mongoose.model('Overview', overviewSchema)

export default Overview