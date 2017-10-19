import * as lo from 'lodash';
import Conversation from '../../models/Conversation';
import Message from '../../models/Message';
import { requireAuth } from '../../services/auth';
import { pubsub } from '../../config/pubsub';

export const CONVERSATION_ADDED = 'conversationAdded';
export const MESSAGE_ADDED = 'messageAdded';

export default {
  getConversation: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      return Conversation.findById(_id);
    } catch (error) {
      throw error;
    }
  },
  getUserConversations: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      const p1 = Conversation.find({ sender: user._id });
      const p2 = Conversation.find({ recipient: user._id });
      const [sentConversations, receivedConversations] = await Promise.all([p1, p2]);
      console.log(receivedConversations);
      return [...sentConversations, ...receivedConversations];
      // return {sent: sentConversations, received: receivedConversations}
    } catch (error) {
      throw error;
    }
  },
  getMyConversations: async (_, args, { user }) => {
    const formatSenderConversation = c => ({
      contact: c.recipient,
      inboxFlags: c.senderFlags,
      ...c._doc
    });
    const formatRecipientConversation = c => ({
      contact: c.sender,
      inboxFlags: c.recipientFlags,
      ...c._doc
    });
    try {
      await requireAuth(user);
      const p1 = Conversation.find({ sender: user._id });
      const p2 = Conversation.find({ recipient: user._id });
      const [sentConversations, receivedConversations] = await Promise.all([p1, p2]);
      const formattedConversations = [
        ...(lo.map(sentConversations, formatSenderConversation)),
        ...(lo.map(receivedConversations, formatRecipientConversation))
      ];      
      console.log('@@@@@@@@@@@@');
      console.log(formattedConversations);
      const sortedConversations = lo.sortBy(formattedConversations, 'latestMessageCreatedAt');
      return sortedConversations;
      // sort by latestMessage.createdAt
      /**
       * formatting
       *  i'm sender: 
       *    contact = recipient
       *    inboxFlags = senderFlags
       *  i'm recipient: 
       *    contact = sender
       *    inboxFlags = recipientFlags
       */
      // return {sent: sentConversations, received: receivedConversations}
    } catch (error) {
      throw error;
    }
  },
  createConversation: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      const conversation = await Conversation.create({ ...args, sender: user._id });

      pubsub.publish(CONVERSATION_ADDED, { [CONVERSATION_ADDED]: Conversation });

      return conversation;
    } catch (error) {
      throw error;
    }
  },
  updateConversation: async (_, { _id, ...rest }, { user }) => {
    try {
      await requireAuth(user);
      const conversation = await Conversation.findOne({ _id, user: user._id });

      if (!conversation) {
        throw new Error('Not found!');
      }

      Object.entries(rest).forEach(([key, value]) => {
        conversation[key] = value;
      });

      return conversation.save();
    } catch (error) {
      throw error;
    }
  },
  deleteConversation: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      const conversation = await Conversation.findOne({ _id, user: user._id });

      if (!conversation) {
        throw new Error('Not found!');
      }
      await conversation.remove();
      return {
        conversation: 'Delete Success!'
      }
    } catch (error) {
      throw error;
    }
  },
  getConversationMessages: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      return Message.find({ conversation: _id }).sort({ createdAt: -1 })
    } catch (error) {
      throw error;
    }
  },
  createMessage: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      const message = await Message.create({ ...args, sender: user._id });

      pubsub.publish(MESSAGE_ADDED, { [MESSAGE_ADDED]: Message });

      return message;
    } catch (error) {
      throw error;
    }
  },
  conversationAdded: {
    subscribe: () => pubsub.asyncIterator(CONVERSATION_ADDED)
  },
  messageAdded: {
    subscribe: () => pubsub.asyncIterator(MESSAGE_ADDED)
  }
};
