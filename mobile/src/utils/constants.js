export const colors = {
  PRIMARY: '#55ACEE',
  SECONDARY: '#444B52',
  WHITE: '#FFFFFF',
  LIGHT_GRAY: '#CAD0D6',
};

export const language = {
  MY_FEED: 'Youniverse',
  FOLLOWING_FEED: 'Universe',
  FOLLOWER_LIST: 'Your Connections',
  MESSAGE_INBOX: 'Private Nods',
  COMPOSE_MESSAGE: 'Share a positive message',
  SEND_MESSAGE: 'Send Nod',
  COMPOSE_POST: 'Share a positive message',
  POST: 'Nod',
  PROFILE: 'Profile',
  PODCAST_FEED: 'Podcasts',
  MY_SETTINGS: 'Settings',
  NOTIFICATIONS: 'Notifications',
};

export const fakeAvatar = 'https://pbs.twimg.com/profile_images/835144746217664515/oxBgzjRA_bigger.jpg';


// export const REACT_NATIVE_PACKAGER_HOSTNAME = 'localhost';

// fix for windows android for using exp start --lan
// - using tunnel  on android with debugging is unusable
// - using exp start --localhost  may work with 'localhost',
//     submit a pull if you test this
// - more info:
// https://docs.expo.io/versions/latest/guides/debugging.html#to-ensure-the-best-debugging-experience-first-change-your-host-type-in-xde-to-lan-or-localhost-if-you-use-tunnel-with-debugging-enabled-you-are-likely-to-experience-so-much-latency-that-your-app-is-unusable-while-here-also-ensure-that-development-mode-is-checked
// https://github.com/react-community/create-react-native-app/issues/81
// setx REACT_NATIVE_PACKAGER_HOSTNAME 192.168.1.2 /M
export const REACT_NATIVE_PACKAGER_HOSTNAME = '192.168.1.80';
