const rankRouter = require('express').Router();
const rankController = require('../controllers/rank')

rankRouter.post('/', rankController.getRank)

module.exports = rankRouter