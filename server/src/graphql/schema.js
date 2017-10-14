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

  type Conversation {
    _id: ID!
    sender: User!
    recipient: User!
    latestMessage: Message
    createdAt: Date!
    updatedAt: Date!
  }

  type Message {
    _id: ID!
    text: String!
    sender: User!
    recipient: User!
    createdAt: Date!
    updatedAt: Date!
  }

  type Query {
    getTweet(_id: ID!): Tweet
    getTweets: [Tweet]
    getUserTweets: [Tweet]

    me: Me

    getConversation(_id: ID!): Conversation
    getConversationMessages(_id: ID!): [Message]
    getUserConversations(_id: ID!): [Conversation]
  }

  type Mutation {
    createTweet(text: String!): Tweet
    updateTweet(_id: ID!, text: String): Tweet
    deleteTweet(_id: ID!): Status
    favoriteTweet(_id: ID!): Tweet

    signup(email: String!, fullName: String!, password: String!, avatar: String, username: String): Auth
    login(email: String!, password: String!): Auth

    createMessage(text: String!): Message
  }

  type Subscription {
    tweetAdded: Tweet
    tweetFavorited: Tweet
    
    messageAdded: Message
    conversationAdded: Conversation
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;
