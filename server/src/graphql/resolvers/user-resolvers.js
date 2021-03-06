import { pubsub } from '../../config/pubsub';

import User from '../../models/User';
import FavoriteTweet from '../../models/FavoriteTweet';
// import UserHasFollowers from '../../models/UserHasFollowers';
import UserIsFollowing from '../../models/UserIsFollowing';
import { requireAuth } from '../../services/auth';

export const USER_IS_FOLLOWING = 'userIsFollowingChange';

export default {
  signup: async (_, { fullName, ...rest }) => {
    try {
      const [firstName, ...lastName] = fullName.split(' ');
      const user = await User.create({ firstName, lastName, ...rest });
      await FavoriteTweet.create({ userId: user._id });
      // await UserHasFollowers.create({ userId: user._id });
      await UserIsFollowing.create({ userId: user._id });

      return {
        token: user.createToken(),
      };
    } catch (error) {
      throw error;
    }
  },

  login: async (_, { email, password }) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('User not exist!');
      }

      if (!user.authenticateUser(password)) {
        throw new Error('Password not match!');
      }

      return {
        token: user.createToken()
      };
    } catch (error) {
      throw error;
    }
  },

  me: async (_, args, { user }) => {
    try {
      const me = await requireAuth(user);

      return me;
    } catch (error) {
      throw error;
    }
  },
  getUserIsFollowing: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      const p1 = User.find({}).sort({ createdAt: -1 });
      const p2 = UserIsFollowing.findOne({ userId: user._id });
      const [allUsers, userIsFollowing] = await Promise.all([p1, p2]);

      const usersToSend = allUsers.reduce((arr, anyUser) => {
        const userToSend = anyUser.toJSON();

        if (userIsFollowing && userIsFollowing.isFollowing.some(u => u.equals(anyUser._id))) {
          arr.push({
            ...userToSend,
            isFollowing: true,
          });
        } else {
          // arr.push({
          //   ...userToSend,
          //   isFollowing: false,
          // })
        }

        return arr;
      }, []);

      return usersToSend;
    } catch (error) {
      throw error;
    }
  },
  userIsFollowingChange: {
    subscribe: () => pubsub.asyncIterator(USER_IS_FOLLOWING),
  }
};
