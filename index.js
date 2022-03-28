const express = require('express');
const bodyParser = require('body-parser');
const talker = require('./controllers/talkers');
const middleware = require('./middleware/talkersmiddleware');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
app.get('/talker', talker.getAll);
app.get('/talker/search/', middleware.authMiddleware, talker.validateQuery, talker.searchByQuery);
app.get('/talker/:id', talker.getById);
app.post('/login', talker.login);
app.post('/talker', middleware.authMiddleware, middleware.nameVerifyMiddleware,
middleware.ageVerifyMiddleware, middleware.talkVerifyMiddleware, middleware.rateVerifyMiddleware,
middleware.watchedAtVerifyMiddleware, talker.creatTalker);
app.put('/talker/:id', middleware.authMiddleware, middleware.nameVerifyMiddleware,
middleware.ageVerifyMiddleware, middleware.talkVerifyMiddleware, middleware.rateVerifyMiddleware, 
middleware.watchedAtVerifyMiddleware, talker.updateById);
  app.delete('/talker/:id', middleware.authMiddleware, talker.deleteById);
 
app.listen(PORT, () => {
  console.log('Online');
});
