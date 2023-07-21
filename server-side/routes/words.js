const wordsRouter = require('express').Router();
const wordsController = require('../controllers/words')

wordsRouter.get('/', wordsController.getSelectedWords)

module.exports = wordsRouter