// import mongoose, { Schema } from 'mongoose';

// import User from './User';
// import { USER_HAS_FOLLOWERS } from '../graphql/resolvers/user-resolvers';
// import { pubsub } from '../config/pubsub';

// const UserHasFollowersSchema = new Schema({
//   userId: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//   },
//   followers: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: 'Tweet',
//     },
//   ],
// });

// UserHasFollowersSchema.methods = {
//   async userAFollowUserB(userAId, userBId) {
//     if (this.followers.some(f => f.equals(userBId))) {
//       // userA unfollow userB
//       this.followers.pull(userBId);
//       await this.save();

//       const userA = await User.decFollowerCount(userAId);

//       const u = userA.toJSON();

//       pubsub.publish(USER_HAS_FOLLOWERS, { [USER_HAS_FOLLOWERS]: { ...u } });

//       return {
//         ...u,
//       };
//     }

//     const userA = await User.incFollowerCount(userAId);

//     const u = userA.toJSON();

//     this.followers.push(userBId);
//     await this.save();
//     pubsub.publish(USER_FOLLOWED, { [USER_FOLLOWED]: { ...u } });
//     return {
//       ...u,
//     };
//   },
// };

// UserHasFollowersSchema.index({ userId: 1 }, { unique: true });

// export default mongoose.model('UserHasFollowers', UserHasFollowersSchema);
