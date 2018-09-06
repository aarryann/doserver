import pubsub from '../../helpers/pubsub';

const BoardSubscription = {
  boardCreated: {
    subscribe: () => pubsub.asyncIterator('boardCreated')
  }
};

export { BoardSubscription };
