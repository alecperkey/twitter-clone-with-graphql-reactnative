import GraphQLDate from 'graphql-date';

import TweetResolvers from './tweet-resolvers';
import UserResolvers from './user-resolvers';
import MessageResolvers from './message-resolvers';
import User from '../../models/User';

export default {
  Date: GraphQLDate,
  Tweet: {
    user: ({ user }) => User.findById(user),
  },
  Message: {
    author: ({ author }) => User.findById(author),
    recipient: ({ recipient }) => User.findById(recipient)
  },
  Query: {
    getTweet: TweetResolvers.getTweet,
    getTweets: TweetResolvers.getTweets,
    getUserTweets: TweetResolvers.getUserTweets,
    getMessage: MessageResolvers.getMessage,
    getUserAuthoredMessages: MessageResolvers.getUserAuthoredMessages,
    me: UserResolvers.me
  },
  Mutation: {
    createTweet: TweetResolvers.createTweet,
    createMessage: MessageResolvers.createMessage,
    updateTweet: TweetResolvers.updateTweet,
    deleteTweet: TweetResolvers.deleteTweet,
    favoriteTweet: TweetResolvers.favoriteTweet,
    signup: UserResolvers.signup,
    login: UserResolvers.login
  },
  Subscription: {
    tweetAdded: TweetResolvers.tweetAdded,
    MessageAdded: MessageResolvers.MessageAdded,
    tweetFavorited: TweetResolvers.tweetFavorited
  }
};
