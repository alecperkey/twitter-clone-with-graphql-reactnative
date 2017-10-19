import React from 'react';
import styled from 'styled-components/native';

import { fakeAvatar } from '../../utils/constants';
import { truncateWithEllipses } from '../../utils/formatters';

const AVATAR_SIZE = 60;
const AVATAR_RADIUS = AVATAR_SIZE / 2;

const Root = styled.View`
  height: 80;
  flexDirection: row;
  alignItems: center;
`;

const AvatarContainer = styled.View`
  flex: 0.25;
  justifyContent: center;
  alignSelf: stretch;
`;

const Avatar = styled.Image`
  height: ${AVATAR_SIZE};
  width: ${AVATAR_SIZE};
  borderRadius: ${AVATAR_RADIUS};
`;

const MetaContainer = styled.View`
  flex: 1;
  alignSelf: stretch;
  padding: 10px 10px 15px 10px;
`;

const MetaTopContainer = styled.View`
  flex: 1;
  alignSelf: stretch;
  flexDirection: row;
  alignItems: center;
  justifyContent: flex-start;
`;

const MetaBottomContainer = styled.View`
  flex: 1;
  alignSelf: stretch;
  alignItems: flex-start;
  justifyContent: center;
`;

const MetaFullName = styled.Text`
  fontSize: 16;
  fontWeight: bold;
  color: ${props => props.theme.SECONDARY};
`;

const MetaText = styled.Text`
  fontSize: 14;
  fontWeight: 400;
  color: ${props => props.theme.LIGHT_GRAY};
`;

const LatestMessageUnread = styled.Text`
  fontSize: 14;
  fontWeight: 400;
  color: ${props => props.theme.SECONDARY};
`;

const LatestMessageRead = styled.Text`
  fontSize: 14;
  fontWeight: 400;
  color: ${props => props.theme.LIGHT_GRAY};
`;

function renderLatestMessagePreview(
  isUnread,
  latestMessage
) {
  if (!latestMessage) return;

  if (isUnread) {
    return (
      <LatestMessageUnread>
        {truncateWithEllipses(latestMessage.content, 40)}
      </LatestMessageUnread>
    )
  }

  return (
    <LatestMessageRead>
      {truncateWithEllipses(latestMessage.content, 40)}
    </LatestMessageRead>
  )
}

function ConversationCardHeader({
  _id,
  inboxFlags,
  contact,
  messageCount,
  latestMessage,
}) {
  return (
    <Root>
      <AvatarContainer>
        <Avatar source={{ uri: contact.avatar || fakeAvatar }} />
      </AvatarContainer>
      <MetaContainer>
        <MetaTopContainer>
          <MetaFullName>
            {contact.firstName} {contact.lastName}
          </MetaFullName>
          <MetaText style={{ marginLeft: 5, fontSize: 12 }}>
            @{contact.username}
          </MetaText>
        </MetaTopContainer>
        <MetaBottomContainer>
          {renderLatestMessagePreview(inboxFlags.latestMessageUnread, latestMessage)}
        </MetaBottomContainer>
      </MetaContainer>
    </Root>
  )
}

export default ConversationCardHeader;
