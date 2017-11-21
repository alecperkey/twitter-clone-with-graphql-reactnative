import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { FlatList } from 'react-native';

import ProfileHeader from '../components/ProfileHeader';
import ConversationCard from '../components/ConversationCard/ConversationCard';

// import GET_USER_IS_FOLLOWING_QUERY from '../graphql/queries/getUserIsFollowing';
import GET_MY_CONVERSATIONS_QUERY from '../graphql/queries/getMyConversations';
import CONVERSATION_ADDED_SUBSCRIPTION from '../graphql/subscriptions/conversationAdded';
// import TWEET_FAVORITED_SUBSCRIPTION from '../graphql/subscriptions/tweetFavorited';

const Root = styled.View`
  flex: 1;
  backgroundColor: #f1f6fa;
`;

const T = styled.Text``

class ExploreScreen extends Component {
  state = {  }
  componentWillMount() {
    this.props.data.subscribeToMore({
      document: CONVERSATION_ADDED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const newConversation = subscriptionData.data.conversationAdded;

        if (!prev.getMyConversations.find(t => t._id === newConversation._id)) {
          return {
            ...prev,
            getTweets: [{ ...newConversation }, ...prev.getMyConversations],
          };
        }

        return prev;
      },
    });

    // this.props.data.subscribeToMore({
    //   document: CONVERSATION_ADDED_SUBSCRIPTION,
    //   updateQuery: (prev, { subscriptionData }) => {
    //     if (!subscriptionData.data) {
    //       return prev;
    //     }

    //     const newTweet = subscriptionData.data.tweetFavorited;
    //     return {
    //       ...prev,
    //       getTweets: prev.getTweets.map(
    //         tweet =>
    //           tweet._id === newTweet._id
    //             ? {
    //                 ...tweet,
    //                 favoriteCount: newTweet.favoriteCount,
    //               }
    //             : tweet,
    //       ),
    //     };
    //   },
    // });
  }

  componentDidMount() {
    // this._getUserInfo();
  }

  _renderItem = ({ item }) => <ConversationCard {...item} />;

  _renderPlaceholder = () => (
    <ConversationCard
      placeholder
      isLoaded={this.props.data.loading}
    />
  )

  render() {
    const { info, data } = this.props;

    return (
      <Root>
        {data.loading ? (
          <FlatList
            data={[1, 2, 3]}
            renderItem={this._renderPlaceholder}
            keyExtractor={item => item}
            contentContainerStyle={{ alignSelf: 'stretch' }}
          />
        ) : (
          <FlatList
            data={data.getMyConversations}
            renderItem={this._renderItem}
            keyExtractor={item => item._id}
            contentContainerStyle={{ alignSelf: 'stretch' }}
          />
        )}
      </Root>
    );
  }
}

export default compose(
  graphql(GET_MY_CONVERSATIONS_QUERY),
  connect(state => ({ info: state.user.info }),
))(ExploreScreen);
