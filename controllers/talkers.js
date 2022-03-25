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
    const token = await talkerServices.generateToken(email, password);    
    response.status(200).json(token);
  } catch (error) {
    console.error(`o erro foi: ${error.message}`);  
  }
};

module.exports = {
  getAll,
  getById,
  login,  
};