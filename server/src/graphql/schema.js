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

  type ConversationFlags {
    isFavorited: Boolean
    latestMessageUnread: Boolean
  }

  type Conversation {
    _id: ID!
    sender: User!
    recipient: User!
    senderFlags: ConversationFlags!
    recipientFlags: ConversationFlags!
    messageCount: Int!
    isRandom: Boolean!
    latestMessage: Message!
    createdAt: Date!
    updatedAt: Date!
  }

  type MyConversation {
    _id: ID!
    inboxFlags: ConversationFlags!
    contact: User!
    sender: User!
    recipient: User!
    senderFlags: ConversationFlags!
    recipientFlags: ConversationFlags!
    messageCount: Int!
    isRandom: Boolean!
    latestMessage: Message!
    latestMessageCreatedAt: Date!
    createdAt: Date!
    updatedAt: Date!
  }

  type Message {
    _id: ID!
    conversation: Conversation!
    content: String!
    type: String!
    sender: User!
    createdAt: Date!
    updatedAt: Date!
  }

  type Query {
    getTweet(_id: ID!): Tweet
    getTweets: [Tweet]
    getUserTweets: [Tweet]

    me: Me
    getUserIsFollowing: [User]

    getConversation(_id: ID!): Conversation
    getConversationMessages(_id: ID!): [Message]
    getUserConversations: [Conversation]
    getMyConversations: [MyConversation]
  }

  type Mutation {
    createTweet(text: String!): Tweet
    updateTweet(_id: ID!, text: String): Tweet
    deleteTweet(_id: ID!): Status
    favoriteTweet(_id: ID!): Tweet

    signup(email: String!, fullName: String!, password: String!, avatar: String, username: String): Auth
    login(email: String!, password: String!): Auth

    createMessage(text: String!): Message
    createConversation(text: String!): Conversation
  }

  type Subscription {
    tweetAdded: Tweet
    tweetFavorited: Tweet
    
    messageAdded: Message
    conversationAdded: MyConversation
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;
