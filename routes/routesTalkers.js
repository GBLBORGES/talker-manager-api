const express = require('express');
const talker = require('../controllers/talkers');
const middleware = require('../middleware/talkersmiddleware');

const route = express.Router();

route.get('/talker', talker.getAll);
route.get('/talker/search/', middleware.authMiddleware, talker.validateQuery, talker.searchByQuery);
route.get('/talker/:id', talker.getById);
route.post('/login', talker.login);
route.post('/talker', middleware.authMiddleware, middleware.nameVerifyMiddleware,
middleware.ageVerifyMiddleware, middleware.talkVerifyMiddleware, middleware.rateVerifyMiddleware,
middleware.watchedAtVerifyMiddleware, talker.creatTalker);
route.put('/talker/:id', middleware.authMiddleware, middleware.nameVerifyMiddleware,
middleware.ageVerifyMiddleware, middleware.talkVerifyMiddleware, middleware.rateVerifyMiddleware, 
middleware.watchedAtVerifyMiddleware, talker.updateById);
  route.delete('/talker/:id', middleware.authMiddleware, talker.deleteById);

module.exports = route;