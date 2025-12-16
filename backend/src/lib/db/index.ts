import mongoose from 'mongoose'

export const connectDb = async () => {
  try {
    mongoose.set('strictQuery', false)
    const uri = process.env.MONGO_URI!;
    await mongoose.connect(uri, {
      autoIndex: true,
      maxPoolSize: 10,
      minPoolSize: 5,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      family: 4, // Use IPv4, skip trying IPv6
    })
    console.log(`🤝 MongoDB Connected`)
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error)
    throw error
  }
}