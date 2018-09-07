import { PubSub } from 'apollo-server';
// import { PubSub } from 'graphql-subscriptions';
import jwt from 'jsonwebtoken';
import Knex from 'knex';

export const getMe = async req => {
  try {
    const Authorization = req.get('Authorization');
    const token = Authorization.replace('Bearer ', '');
    const { userId } = await jwt.verify(token, process.env.APP_SECRET);
    return { userId, token };
  } catch (e) {
    throw new AuthError();
  }
};

export class AuthError extends Error {
  constructor() {
    super('Not authorized');
  }
}

export const pubsub = new PubSub();

export const knex = Knex({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'appuser',
    password: 'appuserpw',
    database: 'doapp'
  }
});
