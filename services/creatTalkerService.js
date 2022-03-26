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

const generateToken = async () => {
  try {      
    const token = crypto.randomBytes(8).toString('hex');    
    return token;
  } catch (err) {
    console.error(`o erro foi: ${err.message}`);  
  }
};

module.exports = {
  getAll,
  getById,
  generateToken,  
};
