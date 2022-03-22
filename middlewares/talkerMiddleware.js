const fs = require('fs');

const talkerPath = '/home/gblb/code/projetoTrybe/sd-016-a-project-talker-manager/talker.json';

const talkerMiddleware = (request, response) => {
 try {
  const { name } = request.body;
  if (!name && name === '') return response.status(200).json([]);
  const readFileString = fs.readFileSync(talkerPath, 'utf8');
  const readFileArray = JSON.parse(readFileString);
  return response.status(200).json(readFileArray);
 } catch (error) {
   console.log(error);
 }
};

module.exports = talkerMiddleware;