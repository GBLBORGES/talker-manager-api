const talkerServices = require('../services/creatTalkerService');
const loginVerify = require('../services/validateLoginService');

const getAll = async (request, response) => {
 try {  
   const allTalkers = await talkerServices.getAll(); 
  return response.status(200).json(allTalkers);
 } catch (error) {
   console.log(error);
 }
};

const getById = async (request, response) => {
try {
  const { id } = request.params; 
  const talker = await talkerServices.getById(id);    
  if (talker) return response.status(200).json(talker);  
  return response.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 
} catch (error) {
  console.log(error);
}
};

const login = async (request, response) => {
  try {
    const { email, password } = request.body;     
    const statusLogin = loginVerify(email, password);      
       if (statusLogin.message) return response.status(400).json(statusLogin);    
    const cryptoToken = talkerServices.generateToken();    
    return response.status(200).json({ token: cryptoToken });    
  } catch (error) {
    console.error(`o erro foi: ${error}`);  
  }
};

const creatTalker = async (request, response) => {
  try {    
    const { name, age, talk } = request.body;     
    const objTalker = await talkerServices.creatTalker(name, age, talk);   
    response.status(201).json(objTalker); 
  } catch (err) {
    console.log(`creatTalker error: ${err}`);
  }
};

const updateById = async (request, response) => {
 const { name, age, talk } = request.body; 
 const { id } = request.params; 
 const talker = await talkerServices.updateTalker(name, age, talk, id);
 return response.status(200).json(talker);
};

const deleteById = async (request, response) => {
  const { id } = request.params;  
  await talkerServices.deleteById(id);
  return response.status(204).end();
};
const validateQuery = async (request, response, next) => {
try {
  const { q } = request.query;  
  if (q === '' || !q) {
    const allTalkers = await talkerServices.getAll(); 
    return response.status(200).json(allTalkers);
  }
  next();
} catch (err) {
  console.log(err);
}
};
const searchByQuery = async (request, response) => {
  const { q } = request.query;  
  const arrayWithTalkers = await talkerServices.searchByQuery(q);
  return response.status(200).json(arrayWithTalkers); 
};

module.exports = {
  getAll,
  getById,
  login,  
  creatTalker,  
  updateById,
  deleteById,
  validateQuery,   
  searchByQuery, 
};