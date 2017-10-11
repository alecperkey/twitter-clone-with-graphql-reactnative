import React, { Component } from 'react';
import {
  addNavigationHelpers,
  StackNavigator,
  TabNavigator,
} from 'react-navigation';
import { Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { FontAwesome, SimpleLineIcons, EvilIcons, Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import ExploreScreen from './screens/ExploreScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ProfileScreen from './screens/ProfileScreen';
import AuthenticationScreen from './screens/AuthenticationScreen';
import NewTweetScreen from './screens/NewTweetScreen';
import NewDMScreen from './screens/NewDMScreen';

import HeaderAvatar from './components/HeaderAvatar';
import ButtonHeader from './components/ButtonHeader';

import { colors, language } from './utils/constants';

const TAB_ICON_SIZE = 20;

const Tabs = TabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        headerTitle: language.FOLLOWING_FEED,
        tabBarIcon: ({ tintColor }) =>
          // <FontAwesome size={TAB_ICON_SIZE} color={tintColor} name="md-planet" />,
          <Ionicons size={TAB_ICON_SIZE} color={tintColor} name="md-planet" />,
      }),
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: () => ({
        headerTitle: language.MY_FEED,
        tabBarIcon: ({ tintColor }) =>
          <FontAwesome size={TAB_ICON_SIZE} color={tintColor} name="user" />,
      }),
    },
    Notifications: {
      screen: NotificationsScreen,
      navigationOptions: () => ({
        headerTitle: language.NOTIFICATIONS,
        tabBarIcon: ({ tintColor }) =>
          <FontAwesome size={TAB_ICON_SIZE} color={tintColor} name="bell" />,
      }),
    },
    Explore: {
      screen: ExploreScreen,
      navigationOptions: () => ({
        headerTitle: language.DM_INBOX,
        tabBarIcon: ({ tintColor }) =>
          <FontAwesome size={TAB_ICON_SIZE} color={tintColor} name="search" />,
      }),
    },
  },
  {
    lazy: true,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: colors.PRIMARY,
      inactiveTintColor: colors.LIGHT_GRAY,
      style: {
        backgroundColor: colors.WHITE,
        height: 50,
        paddingVertical: 5,
      },
    },
  },
);

const NewTweetModal = StackNavigator(
  {
    NewTweet: {
      screen: NewTweetScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: language.COMPOSE_POST,
        headerTitleStyle: {
          color: "#000000",
        },
        headerLeft: <HeaderAvatar />,
        headerRight: (
          <ButtonHeader
            side="right"
            onPress={() => {
              Keyboard.dismiss();
              navigation.goBack(null);
            }}
          >
            <EvilIcons color={colors.PRIMARY} size={25} name="close" />
          </ButtonHeader>
        ),
      }),
    },
  },
  {
    headerMode: 'none',
  },
);

const NewDMModal = StackNavigator(
  {
    NewTweet: {
      screen: NewDMScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: language.COMPOSE_DM,
        headerTitleStyle: {
          color: "#000000",
        },
        headerLeft: <HeaderAvatar />,
        headerRight: (
          <ButtonHeader
            side="right"
            onPress={() => {
              Keyboard.dismiss();
              navigation.goBack(null);
            }}
          >
            <EvilIcons color={colors.PRIMARY} size={25} name="close" />
          </ButtonHeader>
        ),
      }),
    },
  },
  {
    headerMode: 'none',
  },
);

const AppMainNav = StackNavigator(
  {
    Home: {
      screen: Tabs,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <HeaderAvatar />,
        headerRight: (
          <ButtonHeader
            side="right"
            onPress={() => {
              if (navigation.state.index === 0){
                return navigation.navigate('NewTweet')
              } else if (navigation.state.index === 3){
                return navigation.navigate('NewDM')
              } else {
              return navigation.navigate('Home')
              }
            }
          }
          >
            <SimpleLineIcons color={colors.PRIMARY} size={20} name="pencil" />
          </ButtonHeader>
        ),
      }),
    },
    NewTweet: {
      screen: NewTweetModal,
    },
    NewDM: {
      screen: NewDMModal,
    },
  },
  {
    cardStyle: {
      backgroundColor: '#F1F6FA',
    },
    navigationOptions: () => ({
      headerStyle: {
        backgroundColor: colors.WHITE,
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        color: colors.SECONDARY,
      },
    }),
  },
);

class AppNavigator extends Component {
  render() {
    const nav = addNavigationHelpers({
      dispatch: this.props.dispatch,
      state: this.props.nav,
    });
    if (!this.props.user.isAuthenticated) {
      return <AuthenticationScreen />;
    }
    return <AppMainNav navigation={nav} />;
  }
}

export default connect(state => ({
  nav: state.nav,
  user: state.user,
}))(AppNavigator);

export const router = AppMainNav.router;
