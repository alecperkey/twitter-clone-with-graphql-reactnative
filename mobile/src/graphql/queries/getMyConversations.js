import { gql } from 'react-apollo';

export default gql`
{
  getMyConversations {
    _id
    inboxFlags {
      isFavorited
      latestMessageUnread
    }
    contact {
      _id
      firstName
      lastName
      avatar
      username
    }
    messageCount
    latestMessage {
      content
      createdAt
    }
  }
}
`;
