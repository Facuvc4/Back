import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: [3, 'Username must be at least 3 characters long'],
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);
