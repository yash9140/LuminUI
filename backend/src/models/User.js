import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    name: { type: String, default: '' }
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);


