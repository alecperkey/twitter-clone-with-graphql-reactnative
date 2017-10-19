import GraphQLDate from 'graphql-date';

import TweetResolvers from './tweet-resolvers';
import UserResolvers from './user-resolvers';
import ConversationResolvers from './conversation-resolvers';
import User from '../../models/User';
import Message from '../../models/Message';

export default {
  Date: GraphQLDate,
  Tweet: {
    user: ({ user }) => User.findById(user),
  },
  Message: {
    sender: ({ sender }) => User.findById(sender)
  },
  Conversation: {
    sender: ({ sender }) => User.findById(sender),
    recipient: ({ recipient }) => User.findById(recipient),
    latestMessage: ({ latestMessage }) => Message.findById(latestMessage),
  },
  MyConversation: {
    sender: ({ sender }) => User.findById(sender),
    recipient: ({ recipient }) => User.findById(recipient),
    latestMessage: ({ latestMessage }) => Message.findById(latestMessage),
    contact: ({contact}) => User.findById(contact)
  },
  Query: {
    getTweet: TweetResolvers.getTweet,
    getTweets: TweetResolvers.getTweets,
    getUserTweets: TweetResolvers.getUserTweets,

    me: UserResolvers.me,
    getUserIsFollowing: UserResolvers.getUserIsFollowing,

    getConversation: ConversationResolvers.getConversation,
    getConversationMessages: ConversationResolvers.getConversationMessages,
    getUserConversations: ConversationResolvers.getUserConversations,
    getMyConversations: ConversationResolvers.getMyConversations,
  },
  Mutation: {
    createTweet: TweetResolvers.createTweet,
    updateTweet: TweetResolvers.updateTweet,
    deleteTweet: TweetResolvers.deleteTweet,
    favoriteTweet: TweetResolvers.favoriteTweet,

    signup: UserResolvers.signup,
    login: UserResolvers.login,

    createMessage: ConversationResolvers.createMessage
  },
  Subscription: {
    tweetAdded: TweetResolvers.tweetAdded,
    tweetFavorited: TweetResolvers.tweetFavorited,

    messageAdded: ConversationResolvers.messageAdded,
    conversationAdded: ConversationResolvers.conversationAdded
  }
};
