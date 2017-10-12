import Message from '../../models/Message';
import Conversation from '../../models/Conversation';
import { requireAuth } from '../../services/auth';
import { pubsub } from '../../config/pubsub';

const Message_ADDED = 'MessageAdded';

export default {
  getMessage: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      return Message.findById(_id);
    } catch (error) {
      throw error;
    }
  },
  getUserAuthoredMessages: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      return Message.find({ sender: user._id }).sort({ createdAt: -1 })
    } catch (error) {
      throw error;
    }
  },
  createMessage: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      const message = await Message.create({ ...args, sender: user._id });

      pubsub.publish(Message_ADDED, { [Message_ADDED]: Message });

      return message;
    } catch (error) {
      throw error;
    }
  },
  // createConversationWithMessage: async (_, {message, recipient, ...rest}, { user }) => {
  //   try {
  //     await requireAuth(user);

  //     const tempConversation = await Conversation.create({ ...rest, 
  //       sender: user._id,
  //       recipient,
  //       latestMessage: null
  //     });

  //     const msg = await Message.create({ ...message,
  //       sender: user._id,
  //       conversation: tempConversation._id 
  //     });

  //     const conversation = {...tempConversation, latestMessage: msg._id};

  //     pubsub.publish(Message_ADDED, { [Message_ADDED]: Message });

  //     return conversation;
  //   } catch (error) {
  //     throw error;
  //   }
  // },
  updateMessage: async (_, { _id, ...rest }, { user }) => {
    try {
      await requireAuth(user);
      const message = await Message.findOne({ _id, user: user._id });

      if (!message) {
        throw new Error('Not found!');
      }

      Object.entries(rest).forEach(([key, value]) => {
        message[key] = value;
      });

      return message.save();
    } catch (error) {
      throw error;
    }
  },
  deleteMessage: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      const message = await Message.findOne({ _id, user: user._id });

      if (!message) {
        throw new Error('Not found!');
      }
      await message.remove();
      return {
        message: 'Delete Success!'
      }
    } catch (error) {
      throw error;
    }
  },
  MessageAdded: {
    subscribe: () => pubsub.asyncIterator(Message_ADDED)
  }
};
