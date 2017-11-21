import { gql } from 'react-apollo';

// import FeedCard from '../../components/FeedCard/FeedCard';

export default gql`
  subscription {
    conversationAdded {
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
