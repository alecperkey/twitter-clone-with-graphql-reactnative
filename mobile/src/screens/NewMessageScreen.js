import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Platform, Keyboard } from 'react-native';
import Touchable from '@appandflow/touchable';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';

import { colors, language } from '../utils/constants';
// import CREATE_CONVERSATION_MUTATION from '../graphql/mutations/createConversation';
// import CREATE_MESSAGE_MUTATION from '../graphql/mutations/createMessage';
// import UPDATE_CONVERSATION_MUTATION from '../graphql/mutations/updateConversation';

const Root = styled.View`
  backgroundColor: ${props => props.theme.WHITE};
  flex: 1;
  alignItems: center;
`;

const Wrapper = styled.View`
  height: 80%;
  width: 90%;
  paddingTop: 5;
  position: relative;
`;

const Input = styled.TextInput.attrs({
  multiline: true,
  placeholder: "What's happening?",
  maxLength: 140,
  selectionColor: Platform.OS === 'ios' && colors.PRIMARY || colors.PRIMARY,
  autoFocus: true,
})`
  height: 40%;
  width: 100%;
  fontSize: 18;
  color: ${props => props.theme.SECONDARY};
`;

const TweetButton = styled(Touchable).attrs({
  feedback: 'opacity',
  hitSlop: { top: 20, left: 20, right: 20, bottom: 20 },
})`
  backgroundColor: ${props => props.theme.PRIMARY};
  justifyContent: center;
  alignItems: center;
  width: 80;
  height: 40;
  borderRadius: 20;
  position: absolute;
  top: 60%;
  right: 0;
`;

const TweetButtonText = styled.Text`
  color: ${props => props.theme.WHITE};
  fontSize: 16;
`;

const TextLength = styled.Text`
  fontSize: 18;
  color: ${props => props.theme.PRIMARY};
  position: absolute;
  top: 45%;
  right: 5%;
`;

class NewMessageScreen extends Component {
  state = {
    text: '',
  };

  _onChangeText = text => this.setState({ text });

  _onCreateTweetPress = async () => {
    // const { user } = this.props;

    // await this.props.mutate({
    //   variables: {
    //     text: this.state.text
    //   },
    //   optimisticResponse: {
    //     __typename: 'Mutation',
    //     createTweet: {
    //       __typename: 'Tweet',
    //       text: this.state.text,
    //       favoriteCount: 0,
    //       _id: Math.round(Math.random() * -1000000),
    //       createdAt: new Date(),
    //       isFavorited: false,
    //       user: {
    //         __typename: 'User',
    //         username: user.username,
    //         firstName: user.firstName,
    //         lastName: user.lastName,
    //         avatar: user.avatar
    //       }
    //     },
    //   },
    //   update: (store, { data: { createTweet } }) => {
    //     const data = store.readQuery({ query: GET_TWEETS_QUERY });
    //     if (!data.getTweets.find(t => t._id === createTweet._id)) {
    //       store.writeQuery({ query: GET_TWEETS_QUERY, data: { getTweets: [{ ...createTweet }, ...data.getTweets] } });
    //     }
    //   }
    // });

    Keyboard.dismiss();
    this.props.navigation.goBack(null);
  }

  get _textLength() {
    return this.state.text.length;
  }

  get _buttonDisabled() {
    return this.state.text.length < 5;
  }

  render() {
    return (
      <Root>
        <Wrapper>
          <Input value={this.state.text} onChangeText={this._onChangeText} />
          <TextLength>
            {this._textLength}
          </TextLength>
          <TweetButton onPress={this._onCreateTweetPress} disabled={this._buttonDisabled}>
            <TweetButtonText>{`${language.SEND_MESSAGE}`}</TweetButtonText>
          </TweetButton>
        </Wrapper>
      </Root>
    );
  }
}

export default compose(
  // graphql(CREATE_CONVERSATION_MUTATION, {name: 'createConversation'}),
  // graphql(CREATE_MESSAGE_MUTATION, {name: 'createMessage'}),
  // graphql(UPDATE_CONVERSATION_MUTATION, {name: 'updateConversation'}),
  connect(state => ({ user: state.user.info }))
)(NewMessageScreen);
