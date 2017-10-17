import React from 'react';
import styled from 'styled-components/native';
import Placeholder from 'rn-placeholder';

import FollowerCardHeader from './FollowerCardHeader';

const Root = styled.View`
  minHeight: 180;
  backgroundColor: ${props => props.theme.WHITE};
  width: 100%;
  padding: 7px;
  shadowColor: ${props => props.theme.SECONDARY};
  shadowOffset: 0px 2px;
  shadowRadius: 2;
  shadowOpacity: 0.1;
  marginVertical: 5;
`;

const CardContentContainer = styled.View`
  flex: 1;
  padding: 10px 20px 10px 0px;
`;

const CardContentText = styled.Text`
  fontSize: 14;
  textAlign: left;
  fontWeight: 500;
  color: ${props => props.theme.SECONDARY};
`;

const Wrapper = styled.View`flex: 1`;

function FollowerCard({
  createdAt,
  placeholder,
  isLoaded,
  ...args
}) {
  if (placeholder) {
    return (
      <Root>
        <Placeholder.ImageContent
          onReady={!isLoaded}
          lineNumber={2}
          animate="shine"
          lastLineWidth="40%"
        >
          <Wrapper />
        </Placeholder.ImageContent>
      </Root>
    )
  }

  return (
    <Root>
      <FollowerCardHeader {...args} createdAt={createdAt} />
    </Root>
  );
}

// FollowerCard.fragments = {
//   tweet: gql`
//     fragment FollowerCard on User {
//       text
//       _id
//       createdAt
//       isFavorited
//       favoriteCount
//       user {
//         username
//         avatar
//         lastName
//         firstName
//       }
//     }
//   `
// }

export default FollowerCard;
