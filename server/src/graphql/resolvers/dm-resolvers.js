import DM from '../../models/DM';
import { requireAuth } from '../../services/auth';
import { pubsub } from '../../config/pubsub';

const DM_ADDED = 'DMAdded';

export default {
  getDM: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      return DM.findById(_id);
    } catch (error) {
      throw error;
    }
  },
  getUserAuthoredDMs: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      return DM.find({ author: user._id }).sort({ createdAt: -1 })
    } catch (error) {
      throw error;
    }
  },
  createDM: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      const dm = await DM.create({ ...args, author: user._id });

      pubsub.publish(DM_ADDED, { [DM_ADDED]: DM });

      return dm;
    } catch (error) {
      throw error;
    }
  },
  updateDM: async (_, { _id, ...rest }, { user }) => {
    try {
      await requireAuth(user);
      const dm = await DM.findOne({ _id, user: user._id });

      if (!dm) {
        throw new Error('Not found!');
      }

      Object.entries(rest).forEach(([key, value]) => {
        dm[key] = value;
      });

      return dm.save();
    } catch (error) {
      throw error;
    }
  },
  deleteDM: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      const dm = await DM.findOne({ _id, user: user._id });

      if (!dm) {
        throw new Error('Not found!');
      }
      await dm.remove();
      return {
        message: 'Delete Success!'
      }
    } catch (error) {
      throw error;
    }
  },
  DMAdded: {
    subscribe: () => pubsub.asyncIterator(DM_ADDED)
  }
};
