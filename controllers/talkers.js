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
    console.log(statusLogin);    
       if (statusLogin.message) return response.status(400).json(statusLogin);    
    const cryptoToken = await talkerServices.generateToken();    
    return response.status(200).json({ token: cryptoToken });    
  } catch (error) {
    console.error(`o erro foi: ${error}`);  
  }
};

module.exports = {
  getAll,
  getById,
  login,  
};