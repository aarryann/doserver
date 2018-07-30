const getBoardDetails = async(knex, boardId) => {
  const rows = await knex.select({
      id: 'id', name: 'name', slug: 'slug', userId: 'user_id', 
      updatedAt: 'updated_at'
    })
    .from('boards').where('id', boardId);

  return rows[0];
} 

const getOwnedBoards = async(knex, userId) => {
  const rows = await knex.select({
      id: 'id', name: 'name', slug: 'slug', userId: 'user_id', 
      updatedAt: 'updated_at'
    })
    .from('boards').where('user_id', userId);

  return rows;
} 

const getUserBoards = async(knex, userId) => {
  const rows = await knex.from('boards as b')
    .innerJoin('user_boards as ub', 'ub.board_id', 'b.id')
    .where('ub.user_id', userId)
    .select({
      id: 'b.id', name: 'name', slug: 'slug', userId: 'user_id', 
      updatedAt: 'b.updated_at'
    })

  return rows;
} 

const getOtherBoards = async(knex, userId) => {
  const rows = await knex.select({
      id: 'id', name: 'name', slug: 'slug', userId: 'user_id', 
      updatedAt: 'updated_at'
    })
    .from('boards').where('user_id', userId);

  return rows;
} 

const getListDetails = async(knex, listId) => {
  const rows = await knex.select({
      id: 'id', name: 'name', position: 'position', boardId: 'board_id', 
      updatedAt: 'updated_at'
    })
    .from('lists').where('id', listId);

  return rows[0];
} 

const getListsForBoard = async(knex, boardId) => {
  const rows = await knex.select({
      id: 'id', name: 'name', position: 'position', boardId: 'board_id', 
      updatedAt: 'updated_at'
    })
    .from('lists').where('board_id', boardId);

  return rows;
} 

const getCardDetails = async(knex, cardId) => {
  const rows = await knex.select({
      id: 'id', name: 'name', description: 'description', position: 'position', 
      tags: 'tags', listId: 'list_id', updatedAt: 'updated_at'
    })
    .from('cards').where('id', cardId);

  return rows[0];
} 

const getCardsForList = async(knex, listId) => {
  const rows = await knex.select({
      id: 'id', name: 'name', description: 'description', position: 'position', 
      tags: 'tags', listId: 'list_id', updatedAt: 'updated_at'
    })
    .from('cards').where('list_id', listId);

  return rows;
} 

const getCommentsForCard = async(knex, cardId) => {
  const rows = await knex.select({
      id: 'id', text: 'text', cardId: 'card_id', userId: 'user_id', 
      updatedAt: 'updated_at'
    })
    .from('comments').where('card_id', cardId);

  return rows;
} 

const createBoard = async(knex, boardName, userId) => {
  knex.transaction( async (trx) => {
    try {
      const insertedId = await trx.into('boards').insert(
        { name: boardName, 
          slug: boardName.toLowerCase().replace(/[^\w-]+/g, '-'),
          user_id: userId, updated_at: knex.fn.now()
        });
      const rows = await trx.select({
          id: 'id', name: 'name', slug: 'slug', userId: 'user_id', 
          updatedAt: 'updated_at'
        })
        .from('boards').where('id', insertedId[0]);
      return rows[0];
    } catch(e) {
      throw new Error('Board add failed');
    }
  });
} 

module.exports = {
  getBoardDetails,
  getOwnedBoards,
  getUserBoards,
  getOtherBoards,
  getListDetails,
  getListsForBoard,
  getCardDetails,
  getCardsForList,
  getCommentsForCard,
  createBoard
}