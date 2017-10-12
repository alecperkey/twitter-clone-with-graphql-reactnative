export default `
  scalar Date

  type Status {
    message: String!
  }

  type Auth {
    token: String!
  }

  type User {
    _id: ID!
    username: String
    email: String!
    firstName: String
    lastName: String
    avatar: String
    createdAt: Date!
    updatedAt: Date!
  }

  type Me {
    _id: ID!
    username: String
    email: String!
    firstName: String
    lastName: String
    avatar: String
    createdAt: Date!
    updatedAt: Date!
  }

  type Tweet {
    _id: ID!
    text: String!
    user: User!
    favoriteCount: Int!
    isFavorited: Boolean
    createdAt: Date!
    updatedAt: Date!
  }

  type Message {
    _id: ID!
    text: String!
    author: User!
    recipient: User!
    createdAt: Date!
    updatedAt: Date!
  }

  type Query {
    getTweet(_id: ID!): Tweet
    getTweets: [Tweet]
    getUserTweets: [Tweet]
    getMessage(_id: ID!): Message
    getUserAuthoredMessages: [Message]
    me: Me
  }

  type Mutation {
    createTweet(text: String!): Tweet
    createMessage(text: String!): Message
    updateTweet(_id: ID!, text: String): Tweet
    deleteTweet(_id: ID!): Status
    favoriteTweet(_id: ID!): Tweet
    signup(email: String!, fullName: String!, password: String!, avatar: String, username: String): Auth
    login(email: String!, password: String!): Auth
  }

  type Subscription {
    tweetAdded: Tweet
    MessageAdded: Message
    tweetFavorited: Tweet
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;
