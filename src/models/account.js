const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const getUserDetails = async(knex, id) => {
  const rows = await knex.select({
      id: 'id', firstName: 'first_name', lastName: 'last_name', email: 'email'
    })
    .from('users').where('id', id);

  return rows[0];
} 

const getAuth = async(knex, email, password) => {
  try{
    const rows = await knex.select({
        id: 'id', firstName: 'first_name', lastName: 'last_name', email: 'email',
        password: 'password'
      })
      .from('users').where('email', email);

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password)
    if (!valid){
      throw new Error('Invalid email or password');
    }

    return {
      token: jwt.sign({ userId: user.id, test: "asc" }, process.env.APP_SECRET),
      user
    }
  } catch(e){
      throw new Error('Invalid email or password');
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
  getAuth
}