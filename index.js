const express = require('express');
const bodyParser = require('body-parser');
const talker = require('./controllers/talkers');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
app.get('/talker', talker.getAll);
app.get('/talker/:id', talker.getById);
app.post('/login', talker.login);
app.post('/talker', talker.authMiddleware, talker.nameVerifyMiddleware,
  talker.ageVerifyMiddleware, talker.talkVerifyMiddleware, talker.rateVerifyMiddleware,
    talker.watchedAtVerifyMiddleware, talker.creatTalker);

app.put('/talker/:id', talker.authMiddleware, talker.nameVerifyMiddleware,
talker.ageVerifyMiddleware, talker.talkVerifyMiddleware, talker.rateVerifyMiddleware, 
 talker.watchedAtVerifyMiddleware, talker.updateById);

app.delete('/talker/:id', talker.authMiddleware, talker.deleteById);
 
app.listen(PORT, () => {
  console.log('Online');
});
