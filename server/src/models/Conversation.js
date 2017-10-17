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
  senderFlags: {
    isFavorited: Boolean,
    latestMessageUnread: Boolean,
  },
  recipientFlags: {
    isFavorited: Boolean,
    latestMessageUnread: Boolean,
  },
  messageCount: Number,
  isRandom: Boolean,
  latestMessage: {
    type: mongoose.Schema.ObjectId,
    ref: 'Message'
  },
}, { timestamps: true });

export default mongoose.model('Conversation', CoversationSchema);
