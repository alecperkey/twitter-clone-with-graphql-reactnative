import { gql } from 'react-apollo';

export default gql`
  {
    getUserConversations {
      _id
      senderFlags {
        isFavorited
        latestMessageUnread
      }
      recipientFlags {
        isFavorited
        latestMessageUnread
      }
      messageCount
      createdAt
      latestMessage {
        content
        type
        sender {
          _id
          firstName
          lastName
          avatar
          username
        }
        createdAt
        updatedAt
      }
      sender {
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
      createdAt
    }
  }
`;
