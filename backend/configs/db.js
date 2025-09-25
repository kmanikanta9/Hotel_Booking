



import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booing`)
    console.log("✅ MongoDB Database connected")
  } catch (err) {
    console.error("❌ MongoDB error:", err.message)
    process.exit(1)
  }
}

export default connectDB
