import GraphQLDate from 'graphql-date';

import TweetResolvers from './tweet-resolvers';
import UserResolvers from './user-resolvers';
import DMResolvers from './dm-resolvers';
import User from '../../models/User';

export default {
  Date: GraphQLDate,
  Tweet: {
    user: ({ user }) => User.findById(user),
  },
  DM: {
    author: ({ author }) => User.findById(author),
    recipient: ({ recipient }) => User.findById(recipient)
  },
  Query: {
    getTweet: TweetResolvers.getTweet,
    getTweets: TweetResolvers.getTweets,
    getUserTweets: TweetResolvers.getUserTweets,
    getDM: DMResolvers.getDM,
    getUserAuthoredDMs: DMResolvers.getUserAuthoredDMs,
    me: UserResolvers.me
  },
  Mutation: {
    createTweet: TweetResolvers.createTweet,
    createDM: DMResolvers.createDM,
    updateTweet: TweetResolvers.updateTweet,
    deleteTweet: TweetResolvers.deleteTweet,
    favoriteTweet: TweetResolvers.favoriteTweet,
    signup: UserResolvers.signup,
    login: UserResolvers.login
  },
  Subscription: {
    tweetAdded: TweetResolvers.tweetAdded,
    DMAdded: DMResolvers.DMAdded,
    tweetFavorited: TweetResolvers.tweetFavorited
  }
};
