import faker from 'faker';

import Tweet from '../models/Tweet';
import User from '../models/User';
import Message from '../models/Message';
import Conversation from '../models/Conversation';

const TWEETS_TOTAL = 1;
const USERS_TOTAL = 5;
const MESSAGES_TOTAL = 2;
const CONVERSATIONS_TOTAL = 2;

export default {
  createUsers: async () => {
    try {
      await Tweet.remove();
      await User.remove();
      await Conversation.remove();
      await Message.remove();

      await Array.from({ length: USERS_TOTAL }).forEach(async (_, i) => {
        const user = createUser(i);

        await Array.from({ length: TWEETS_TOTAL }).forEach(async () => {
          createTweet(user);
        });
      });

    } catch (error) {
      throw error;
    }

    async function createUser(i) {
      const p = await User.create({
        username: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        avatar: `https://randomuser.me/api/portraits/women/${i}.jpg`,
        password: 'password123'
      });
      return p;
    }

    async function createTweet(user) {
      const p = await Tweet.create({ text: faker.lorem.sentence(), user: user._id })
      return p;
    }

  },
  createConversations: async () => {
    try {
      findUsers().then((users) => {
        console.log('####################');
        console.log(users);
        Array.from({ length: users.length - 1 }).forEach(async (_, i) => {

          const sender = users[i];
          const recipient = users[i + 1];

          createConversation(sender, recipient).then(conv => {
            console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
            console.log(conv);
          });

        });
      });

    } catch (error) {
      throw error;
    }

    async function findUsers() {
      const p = await User.find({})
      return p;
    }

    async function createConversation(sender, recipient) {

      const p = await Conversation.create({
        sender,
        recipient,
        // latestMessage: faker.lorem.sentence
      });
      return p;
    }
  }
};
