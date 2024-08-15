import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  catId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cat',
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
