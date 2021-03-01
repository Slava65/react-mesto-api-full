const cardRouter = require('express').Router();

const {
  getCards,
  postCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardRouter.get('/', getCards);

cardRouter.post('/', postCard);

cardRouter.delete('/:cardId', deleteCard);

cardRouter.put('/likes/:cardId', likeCard);

cardRouter.delete('/likes/:cardId', dislikeCard);

module.exports = cardRouter
