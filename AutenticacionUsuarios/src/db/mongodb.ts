import mongoose from 'mongoose';
import errorHelper from '../helpers/error.helper';

export const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGO_URI || 'mongodb://localhost:27017/autenticacion';
    await mongoose.connect(mongoURI);
    console.log('Database connected');
  } catch (error) {
    errorHelper.internalServerError('Database connection error');
  }
};
