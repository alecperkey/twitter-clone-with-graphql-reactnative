import mongoose, { Schema } from 'mongoose';

import User from './User';
import { USER_IS_FOLLOWING } from '../graphql/resolvers/user-resolvers';
import { pubsub } from '../config/pubsub';

const UserIsFollowingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  isFollowing: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

UserIsFollowingSchema.methods = {
  async userAFollowUserB(userAId, userBId) {
    if (this.followers.some(f => f.equals(userBId))) {
      // userA unfollow userB
      this.followers.pull(userBId);
      await this.save();

      const userA = await User.decUserIsFollowingCount(userAId);

      const u = userA.toJSON();

      pubsub.publish(USER_IS_FOLLOWING, { [USER_IS_FOLLOWING]: { ...u } });

      return {
        ...u,
      };
    }

    const userA = await User.incUserIsFollowingCount(userAId);

    const u = userA.toJSON();

    this.followers.push(userBId);
    await this.save();
    pubsub.publish(USER_IS_FOLLOWING, { [USER_IS_FOLLOWING]: { ...u } });
    return {
      ...u,
    };
  },
};

UserIsFollowingSchema.index({ userId: 1 }, { unique: true });

export default mongoose.model('UserIsFollowing', UserIsFollowingSchema);