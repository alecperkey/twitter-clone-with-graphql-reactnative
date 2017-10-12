import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema({
    conversation: {
        type: mongoose.Schema.ObjectId,
        ref: 'Conversation',
    },
    content: String,
    type: String,
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    }
}, { timestamps: true });

export default mongoose.model('Message', MessageSchema);

/**
 * 1.   user compose msg
 * 2.   user select recipient user (follower or universe)
 * 3.   user creates msg via 'send' button
 *   
 *   // CASE A: Client knows conversation._id
 * 
 * 4A.  createMessageForConversation mutation
 * 5A.    Message.create(...args, sender: user.id, conversation: conv._id)
 * 6A.      Conversation.update(...args, latestMessage: message_id)
 *   
 * 
 *   // CASE B: Conversation must be created along with message
 * 
 * 4B.  createConversationWithMessage mutation 
 * 5B     Conversation.create(...args, sender: user.id, recipient: recip._id)
 * 6B.    Message.create(...args, sender: user.id, conversation: conv._id)
 * 7B.      Conversation.update(...args, latestMessage: message_id)
 */
