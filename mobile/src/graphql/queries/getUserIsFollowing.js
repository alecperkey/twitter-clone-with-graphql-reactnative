import { gql } from 'react-apollo';

export default gql`
  {
    getUserIsFollowing {
      _id
      avatar
      username
      firstName
      lastName
      email
    }
  }
`;
