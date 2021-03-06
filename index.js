const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/routesTalkers');

const app = express();
app.use(bodyParser.json());
app.use('/', route);
const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
 
app.listen(PORT, () => {
  console.log('Online');
});
