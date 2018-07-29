const getUserDetails = async(knex, id) => {
  const rows = await knex.select({
      id: 'id', firstName: 'first_name', lastName: 'last_name', email: 'email'
    })
    .from('users').where('id', id);
  console.log(JSON.stringify(rows, null, 4));
  return rows[0];
} 

const getAuth = async(knex, email, password) => {
  const rows = await knex.select({
      id: 'id', firstName: 'first_name', lastName: 'last_name', email: 'email'
    })
    .from('users').where('email', email);
  console.log(JSON.stringify(rows, null, 4));
  if (rows.length > 0 && compareHash(password, rows[0].password)){
    return {
      user: {
        id: rows[0].id,
        firstName: rows[0].firstName,
        lastName: rows[0].lastName,
        email: rows[0].email,
        password : encrypt(password)
      }
    }
  } else {
    throw new Error('Invalid email or password');
  }
}

module.exports = {
  getUserDetails,
  //getAuth
}