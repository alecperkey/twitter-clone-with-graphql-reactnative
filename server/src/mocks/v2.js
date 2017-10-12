import faker from 'faker';

import Tweet from '../models/Tweet';
import User from '../models/User';
import Message from '../models/Message';
import Conversation from '../models/Conversation';

const TWEETS_TOTAL = 1;
const USERS_TOTAL = 5;
const MESSAGES_TOTAL = 2;
const CONVERSATIONS_TOTAL = 2;

const mocks = {
  async clearDB() {
    try {
      const p1 = await Tweet.remove();
      const p2 = await User.remove();
      const p3 = await Conversation.remove();
      const p4 = await Message.remove();
      const [v1, v2, v3, v4] = await Promise.all([p1, p2, p3, p4]);
      console.log(v1,v2,v3,v4);
      return '------------DB CLEARED------------';
    } catch (error) {
      throw error;
    }
  },
  createUsers: async () => {
    try {
      mocks.clearDB()

    } catch (error) {
      throw error;
    }
  },
  createUser: async (i) => {
    try {
      const p = await User.create({
        username: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        avatar: `https://randomuser.me/api/portraits/women/${i}.jpg`,
        password: 'password123'
      });
      return p;

    } catch (error) {
      throw error;
    }
  },
  createTweet: async (user) => {
    try {
      const p = await Tweet.create({ text: faker.lorem.sentence(), user: user._id })
      return p;
    } catch (error) {
      throw error;
    }
  },
}