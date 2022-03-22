const express = require('express');
const bodyParser = require('body-parser');
const talkerMiddleware = require('./middlewares/talkerMiddleware');
const talkerIdMiddleware = require('./middlewares/talkerIdMiddleware');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
app.get('/talker', talkerMiddleware);
app.get('/talker/:id', talkerIdMiddleware);

app.listen(PORT, () => {
  console.log('Online');
});
