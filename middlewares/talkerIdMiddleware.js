const fs = require('fs');

const talkerPath = './talker.json';

const talkerIdMiddleware = (request, response) => {
try {
  const { id } = request.params;   
  const readFileString = fs.readFileSync(talkerPath, 'utf8');
  const readFileArray = JSON.parse(readFileString);  
  if (readFileArray.some((user) => +id === user.id)) {     
     return response.status(200).json(readFileArray.find((user) => +id === user.id));
  } 
  return response.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 
} catch (error) {
  console.log(error);
}
};

module.exports = talkerIdMiddleware;