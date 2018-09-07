import { pubsub } from '../../helpers/utils';

const BoardSubscription = {
  boardCreated: {
    subscribe: () => pubsub.asyncIterator('boardCreated')
  }
};

export { BoardSubscription };
