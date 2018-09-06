import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const getUserDetails = async (knex, id) => {
  const rows = await knex('users')
    .select('*')
    .where('id', id);

  return rows[0];
};

const login = async (knex, email, password) => {
  try {
    const rows = await knex
      .select('*')
      .from('users')
      .where('email', email);

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid email or password');
    }

    return {
      userId: user.id,
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET)
    };
  } catch (e) {
    throw new Error('Invalid email or password');
  }
};

const currentUser = async (knex, userId, token) => {
  try {
    // eslint-disable-next-line
    const rows = await knex
      .select('*')
      .from('users')
      .where('id', userId);

    // const user = rows[0];

    return {
      userId,
      token: token
    };
  } catch (e) {
    throw new Error('Invalid user');
  }
};

const signup = async (knex, args, ctx) => {
  const password = await bcrypt.hash(args.password, 10);
  const user = await ctx.db.mutation.createUser({
    data: { ...args, password }
  });

  return {
    userId: user.id,
    token: jwt.sign({ userId: user.id }, process.env.APP_SECRET)
  };
};

export { getUserDetails, login, currentUser, signup };
