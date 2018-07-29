exports.getUserDetails = async(knex, id) => {
  const rows = await knex.select({
      id: 'id',
      firstName: 'first_name', 
      lastName: 'last_name', 
      email: 'email'
    })
  .from('users').where('id', id);
  return rows[0];
} 