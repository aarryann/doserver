const getBoardMembers = async(knex, boardId) => {
  const rows = await knex.from('users as u')
    .innerJoin('user_boards as ub', 'ub.user_id', 'u.id')
    .where('ub.board_id', boardId)
    .select('u.*');

  return rows;
} 

const getCardMembers = async(knex, cardId) => {
  const rows = await knex.from('users as u')
    .innerJoin('user_boards as ub', 'ub.user_id', 'u.id')
    .innerJoin('card_members as cm', 'cm.user_board_id', 'ub.id')
    .where('cm.card_id', cardId)
    .select('u.*');

  return rows;
} 

const getBoardDetails = async(knex, boardId) => {
  const rows = await knex.select('*')
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

const getMemberBoards = async(knex, userId) => {
  const rows = await knex.from('boards as b')
    .innerJoin('user_boards as ub', 'ub.board_id', 'b.id')
    .where('ub.user_id', userId)
    .select({
      id: 'b.id', name: 'name', slug: 'slug', userId: 'b.user_id', 
      updatedAt: 'b.updated_at'
    });

  return rows;
} 

const getOtherBoards = async(knex, userId) => {
  const subquery = knex('user_boards').where('user_id', userId)
  .select('board_id');
  const rows = await knex.select({
      id: 'id', name: 'name', slug: 'slug', userId: 'user_id', 
      updatedAt: 'updated_at'
    })
    .from('boards').where('id', 'not in', subquery);

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
  return knex.transaction( async (trx) => {
    try {
      const insertedBoard = await trx.into('boards').insert({ 
          name: boardName, 
          slug: boardName.toLowerCase().replace(/[^\w-]+/g, '-'),
          user_id: userId, updated_at: knex.fn.now()
        });
      
      await trx.into('user_boards').insert({ 
          user_id: userId, 
          board_id: insertedBoard[0], updated_at: knex.fn.now()
        });

      const rows = await trx.select({
          id: 'id', name: 'name', slug: 'slug', userId: 'user_id', 
          updatedAt: 'updated_at'
        }).from('boards').where('id', insertedBoard[0]);

      return rows;

    } catch(e) {
      throw new Error('Board add failed');
    }
  })
  .then(function(boardResultSet) {
    return boardResultSet[0];
  })
  .catch(function(error) {
    throw new Error('Board add failed');
  });  
} 

const createList = async(knex, listName, boardId) => {
  return knex.transaction( async (trx) => {
    try {
      const maxPos = await trx('lists').max('position as a')
        .where('board_id', boardId);
      let position = 1024;
      try {
        if(maxPos[0].a !== null){
          position += parseInt(maxPos[0].a);
        }
      } catch(e){}

      const insertedList = await trx.into('lists').insert({ 
          name: listName, position: position,
          board_id: boardId, updated_at: knex.fn.now()
        });

      const rows = await trx.select({
          id: 'id', name: 'name', position: 'position', 
          boardId: 'board_id', updatedAt: 'updated_at'
        }).from('lists').where('id', insertedList[0]);

      return rows;

    } catch(e) {
      throw new Error('List add failed');
    }
  })
  .then(function(listResultSet) {
    return listResultSet[0];
  })
  .catch(function(error) {
    throw new Error('List add failed');
  });  
} 

const createCard = async(knex, cardName, description, tags, listId) => {
  return knex.transaction( async (trx) => {
    try {
      const maxPos = await trx.max('position')
        .from('cards').where('list_id', listId);

      let position = 1024;
      try {
        position += parseInt(maxPos[0]);
      } catch(e){}

      const insertedCard = await trx.into('cards').insert({ 
          name: cardName, position: position, description: description,
          tags: tags, list_id: listId, updated_at: knex.fn.now()
        });

      const rows = await trx.select({
          id: 'id', name: 'name', description: 'description', tags: 'tags',
          position: 'position', listId: 'list_id', updatedAt: 'updated_at'
        }).from('cards').where('id', insertedCard[0]);

      return rows;

    } catch(e) {
      throw new Error('Card add failed');
    }
  })
  .then(function(cardResultSet) {
    return cardResultSet[0];
  })
  .catch(function(error) {
    throw new Error('Card add failed');
  });  
} 

const addCardComment = async(knex, text, userId, cardId) => {
  return knex.transaction( async (trx) => {
    try {
      const insertedComment = await trx.into('comments').insert({ 
          text: text, userId: userId, cardId: cardId, updated_at: knex.fn.now()
        });

      const rows = await trx.select({
          id: 'id', name: 'name', description: 'description', tags: 'tags',
          position: 'position', listId: 'list_id', updatedAt: 'updated_at'
        }).from('cards').where('id', insertedCard[0]);

      return rows;

    } catch(e) {
      throw new Error('Comment add failed');
    }
  })
  .then(function(cardResultSet) {
    return cardResultSet[0];
  })
  .catch(function(error) {
    throw new Error('Comment add failed');
  });  
} 

const addBoardMember = async(knex, email, boardId) => {
  return knex.transaction( async (trx) => {
    try {
      const rows = await trx.select({
          id: 'u.id', firstName: 'first_name', lastName: 'last_name', 
          email: 'email', updatedAt: 'u.updated_at'
        }).from('users').where('email', email);

      const insertedCard = await trx.into('user_boards').insert({ 
          user_id: rows[0].id, board_id: boardId, updated_at: knex.fn.now()
        });

      return rows;

    } catch(e) {
      throw new Error('Add Board member failed');
    }
  })
  .then(function(memberResultSet) {
    return memberResultSet[0];
  })
  .catch(function(error) {
    throw new Error('Add Board member failed');
  });  
} 

const addCardMember = async(knex, userId, boardId, cardId) => {
  return knex.transaction( async (trx) => {
    try {
      let rows = await trx.from('user_boards as ub')
        .where('ub.board_id', boardId).andWhere('ub.user_id', userId)
        .select({ id: 'ub.id' })

      await trx.into('card_members').insert({ 
          card_id: cardId, user_board_id: rows[0].id, updated_at: knex.fn.now()
        });

      rows = await trx.select({
          id: 'id', name: 'name', description: 'description', tags: 'tags',
          position: 'position', listId: 'list_id', updatedAt: 'updated_at'
        }).from('cards').where('id', cardId);

      return rows;

    } catch(e) {
      throw new Error('Add card member failed');
    }
  })
  .then(function(cardResultSet) {
    return cardResultSet[0];
  })
  .catch(function(error) {
    throw new Error('Add card member failed');
  });  
} 

const removeCardMember = async(knex, userId, boardId, cardId) => {
  return knex.transaction( async (trx) => {
    try {
      const rows = await trx.from('user_boards as ub')
        .innerJoin('card_members as cm', 'cm.user_board_id', 'ub.id')
        .where('ub.board_id', boardId).andWhere('ub.user_id', userId)
        .andWhere('cm.card_id', cardId)
        .select({ id: 'cm.id' })

      await trx.from('card_members')
        .where('cm.id', rows[0].id).del();

      rows = await trx.select({
          id: 'id', name: 'name', description: 'description', tags: 'tags',
          position: 'position', listId: 'list_id', updatedAt: 'updated_at'
        }).from('cards').where('id', cardId);

      return rows;

    } catch(e) {
      throw new Error('Remove card member failed');
    }
  })
  .then(function(cardResultSet) {
    return cardResultSet[0];
  })
  .catch(function(error) {
    throw new Error('Remove card member failed');
  });  
} 

module.exports = {
  getBoardDetails,
  getBoardMembers,
  getCardMembers,
  getOwnedBoards,
  getMemberBoards,
  getOtherBoards,
  getListDetails,
  getListsForBoard,
  getCardDetails,
  getCardsForList,
  getCommentsForCard,

  createBoard,
  createList,
  createCard,
  addBoardMember,
  addCardMember,
  addCardComment,
  removeCardMember,
}