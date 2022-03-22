const fs = require('fs');

const talkerPath = 'talker.json';

const talkerMiddleware = (request, response) => {
  const { name } = request.body;
  if (!name && name === '') return response.status(200).json([]);
  const readFileString = fs.readFileSync(talkerPath, 'utf8');
  const readFileArray = JSON.parse(readFileString);
  return response.status(200).json(readFileArray);
};

module.exports = talkerMiddleware;