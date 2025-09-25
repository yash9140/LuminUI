import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    status: { type: String, enum: ['todo', 'in_progress', 'done'], default: 'todo' }
  },
  { timestamps: true }
);

taskSchema.index({ title: 'text', description: 'text' });

export default mongoose.model('Task', taskSchema);


