const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const getUserDetails = async(knex, id) => {
  const rows = await knex('users').select('*')
    .where('id', id);

  return rows[0];
} 

const login = async(knex, email, password) => {
  try {
    const rows = await knex.select('*')
      .from('users').where('email', email);

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password)
    if (!valid){
      throw new Error('Invalid email or password');
    }

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user
    }
  } catch(e){
      throw new Error('Invalid email or password');
  }
}

const currentUser = async(knex, userId, token) => {
  try {
    //console.log(userId);
    //console.log(token);
    const rows = await knex.select('*')
      .from('users').where('id', userId);

    const user = rows[0];

    return {
      token: token,
      user
    }
  } catch(e){
      throw new Error('Invalid user');
  }
}

const signup = async(knex, args, ctx, info) => {
  const password = await bcrypt.hash(args.password, 10)
  const user = await ctx.db.mutation.createUser({
    data: { ...args, password },
  })

  return {
    token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
    user,
  }
}

module.exports = {
  getUserDetails,
  login,
  currentUser,
  signup
}