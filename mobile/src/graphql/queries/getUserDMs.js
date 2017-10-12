import { gql } from 'react-apollo';

export default gql`
  {
    getUserDMs {
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
