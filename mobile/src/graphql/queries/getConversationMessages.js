import { gql } from 'react-apollo';

export default gql`
  {
    getConversationMessages {
      _id
      text
      createdAt
      author {
        _id
        firstName
        lastName
        avatar
        username
      }
      recipient {
        _id
        firstName
        lastName
        avatar
        username
      }
    }
  }
`;

/**
 * Entities
 *  User
 *    m signup (...args)
 *    m login ()
 *    q me
 *    > q getUserFollowing
 *  UserFollower
 *    > q getUserFollowers
 *    > m updateUserFollowing
 *
 *  Post
 *    q getPost(_postID)
 *    q --getPosts--
 *    q getUserPosts(_userID)
 *    m createPost(...args)
 *    m updatePost(_postID, ...rest)
 *    m deletePost(_postID)
 *    s postAdded
 *    s postFavorited
 *  PostComment
 *    > m createComment()
 *    > m
 *  FavoritePost => USER
 *    m favoritePost(_postID)
 *  Conversation
 *    q getUserConversations(_userID)
 *    > m createConversation(_userID:recipient)
 *    > m updateConversation(_conversationID, _messageID, ...rest)
 *    > m
 *  Message
 *    > q getConversationMessages(_conversationID)
 *    > m createMessage(_conversationID)
 */
