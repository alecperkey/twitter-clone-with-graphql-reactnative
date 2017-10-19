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
      email: 'w',
      avatar: `https://randomuser.me/api/portraits/men/0.jpg`,
      password: 'w'
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
        email: `${i}`,
        avatar: `https://randomuser.me/api/portraits/women/${i}.jpg`,
        password: 'w'
      });

      const userIsFollowing = await UserIsFollowing.create({
        userId: user._id,
        isFollowing: [phead._id]
      });

      await Array.from({ length: TWEETS_TOTAL }).forEach(
        async () => await Tweet.create({ text: faker.lorem.sentence(), user: user._id }),
      );

      const conversation = await Conversation.create({
        sender: user._id,
        recipient: phead._id,
        senderFlags: {
          isFavorited: true,
          latestMessageUnread: false,
        },
        recipientFlags: {
          isFavorited: false,
          latestMessageUnread: true,
        },
        messageCount: 0,
        isRandom: false,
        latestMessage: null,
        latestMessageTimestamp: null
      });

      const message = await Message.create({
        conversation: conversation._id,
        content: faker.lorem.paragraph(),
        type: 'String',
        sender: user._id
      });

      conversation.set({
        latestMessage: message,
        latestMessageCreatedAt: message.createdAt,
        messageCount: conversation.messageCount + 1
      });
      await conversation.save();

    });


  } catch (error) {
    throw error;
  }
};

/**
 * Follower/Following/Conversation Permissions Logic
 * 
 * WHAT TO INCENTIVIZE: 
 *  quality nods and posts from content creators
 * 
 * UNIQUE DYNAMICS:
 *  gain many followers by:
 *    compose likable random nods
 *      hope for algorithm to show many users
 *    compose likable comments on posts from popular users (algorithm for comment sorting?)
 *      hope people see your comment and follow you
 *    follow people manually and send idC (could limit to prevent spam?)
 *      hope they see your idC and follow back
 *  
 * (i)rC = (Initial) Random[nod] Conversation
 * (i)dC = (Initial) Direct[nod] Conversation
 * USER = the user logged in
 * user = any other user
 * 
 * any USER:
 *  may search for any user
 * 
 *  may be followed by any user
 * 
 *  may follow any user
 * 
 *  may send irC once per day to random user(s), which...
 *    ? EITHER: `will be *sent to* 1 user` OR `will be *responded to* by 1 user`
 *      ?! Suggested: SHOULD TRY ENSURE AT LEAST ONE RESPONSE FOR EACH irC
 *      may pass high quality content algorithm in server
 *        will be sent to 1+ more user(s)
 * 
 *  will receive 1 irC once per day 
 *    may rate irC quality 1-100 magic meter
 *    may follow sender
 *      ? EITHER: `may` OR `must`... respond to irC
 *        ?! Suggested: SHOULD NOT REQUIRE RESPONSE TO FOLLOW. DISCOURAGES FOLLOWING. INCENTIVIZES RESPONSE-SEEKING irC CONTENT.
 * 
 *  ? may send idC to... EITHER: `any user` OR `any user the current USER is following`
 *    ?! Suggested: DEFAULT FOLLOW WITH OPT-OUT WHEN SENDING idC
 * 
 *  may recieve idCs from any following him
 *    may respond to idC
 *      ? EITHER: `may` OR `must`... follow sender (default unless uncheck autofollow)
 *        ?! Suggested: DEFAULT FOLLOW WITH OPT-OUT. SHOULD NOT FORCE RECIPIENT TO FOLLOW, DISCOURAGES RESPONSE RATE OF CONVERSATION.
 * 
 *  will have inbox with many possible states of C:
 * 
 *    C[initial|ongoing][direct|random][latestNodSender|latestNodReceiver][read|unread][favorite]
 * 
 *      [initial|ongoing] -> message count indicator
 *      [random|direct] -> TabA/TabB
 *      [favorite] -> TabC
 *      [latestNodSender|latestNodReceiver] -> avatar = me/they/universe
 *      [read|unread] -> bold/unbold
 *    
 * 
 * 
 * 
 */
