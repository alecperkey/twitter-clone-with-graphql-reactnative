import faker from 'faker';

import Tweet from '../models/Tweet';
import User from '../models/User';
import Conversation from '../models/Conversation';
import Message from '../models/Message';
import FavoriteTweet from '../models/FavoriteTweet';
import UserIsFollowing from '../models/UserIsFollowing';

const TWEETS_TOTAL = 3;
const USERS_TOTAL = 3;

export default async () => {
  try {
    await Tweet.remove();
    await User.remove();
    await Conversation.remove();
    await Message.remove();
    await FavoriteTweet.remove();
    await UserIsFollowing.remove();

    const phead = await User.create({
      username: 'phead',
      firstName: 'Brandon',
      lastName: 'B',
      email: 'e',
      avatar: `https://randomuser.me/api/portraits/men/0.jpg`,
      password: 'pw'
    });
    const phFavs = await FavoriteTweet.create({
      userId: phead._id
    });
    const phUserIsFollowing = await UserIsFollowing.create({
      userId: phead._id
    });

    await Array.from({ length: USERS_TOTAL }).forEach(async (_, i) => {
      const user = await User.create({
        username: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        avatar: `https://randomuser.me/api/portraits/women/${i}.jpg`,
        password: 'password123'
      });

      const userIsFollowing = await UserIsFollowing.create({
        userId: user._id,
        isFollowing: [phead._id]
      });

      await Array.from({ length: TWEETS_TOTAL }).forEach(
        async () => await Tweet.create({ text: faker.lorem.sentence(), user: user._id }),
      );
    });
  } catch (error) {
    throw error;
  }
};
