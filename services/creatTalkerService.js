const crypto = require('crypto');
const talkerModel = require('../models/talkerModel');

const getAll = async () => {
  try {
    const allTalkers = await talkerModel.readFile();
    if (allTalkers.length < 1) return [];
    return allTalkers;
 } catch (err) {
   console.log(err);
 }
};

const getById = async (id) => {
try {   
  const allTalkers = await talkerModel.readFile();  
  const talkerGetById = allTalkers.find((talker) => talker.id === +id);    
  if (!talkerGetById) return false; 
return talkerGetById; 
} catch (err) {
  console.log(err);
}
};

const generateToken = () => {       
    const token = crypto.randomBytes(8).toString('hex');    
    return token; 
};

const creatTalker = async (name, age, talk) => {
  const allTalkers = await talkerModel.readFile();
  const { rate, watchedAt } = talk;
  const newId = allTalkers.length + 1;
  const objTalker = {
    name,
    age,
    id: newId,
    talk: {
      rate,
      watchedAt,
    },
  };
  allTalkers.push(objTalker);    
  await talkerModel.writeFile(allTalkers);
  console.log(objTalker);
  return objTalker;
};

module.exports = {
  getAll,
  getById,
  generateToken,
  creatTalker,  
};