import mongoose, { Schema } from 'mongoose';

const CoversationSchema = new Schema({
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  recipient: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  // latestMessage: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'Message'
  // },
}, { timestamps: true });

export default mongoose.model('Conversation', CoversationSchema);
