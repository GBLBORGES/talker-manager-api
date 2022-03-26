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
    const cryptoToken = talkerServices.generateToken();    
    return response.status(200).json({ token: cryptoToken });    
  } catch (error) {
    console.error(`o erro foi: ${error}`);  
  }
};

const authMiddleware = (request, response, next) => {
  try {
    const { authorization } = request.headers;
    console.log(authorization);
    if (!authorization) {
      return response.status(401).json({ message: 'Token não encontrado' });
    } if (authorization.length !== 16) {
        return response.status(401).json({ message: 'Token inválido' });
    } 
    next();
  } catch (err) {
    console.log(`erro na autentificação: ${err}`);
  }
};

const nameVerifyMiddleware = (request, response, next) => {  
    const { name } = request.body;
    console.log(name);
    if (!name || name === '') {
     return response.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) {
      return response.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    } next(); 
};
const ageVerifyMiddleware = (request, response, next) => {  
    const { age } = request.body;  
    console.log(age);
    if (!age || age.length < 1) {
     return response.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (+age < 18) {
      return response.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    } next();  
};

const talkVerifyMiddleware = (request, response, next) => {  
  const { talk } = request.body; 
  console.log(talk);
  if (!talk || talk === '' || !talk.watchedAt || !talk.rate) {
    return response.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();   
};

const rateVerifyMiddleware = (request, response, next) => {
  const { talk: { rate } } = request.body;
  console.log(rate);
  if (!Number.isInteger(rate) || rate > 5 || rate < 1) {
    return response.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  } 
  next();
};

const watchedAtVerifyMiddleware = (resquest, response, next) => {  
  const { talk: { watchedAt } } = resquest.body;
  const arrayNumbers = watchedAt.split('/');  
  if (!(arrayNumbers[0] && arrayNumbers[1] && arrayNumbers[2])) {   
    return response.status(400)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

/*   const authorization = request.headers['authorization '];   */ 
/* const token = talkerServices.generateToken();   */      
const creatTalker = async (request, response) => {
  try {    
    const { name, age, talk } = request.body;     
    const objTalker = await talkerServices.creatTalker(name, age, talk);   
    response.status(201).json(objTalker); 
  } catch (err) {
    console.log(`creatTalker error: ${err}`);
  }
};

module.exports = {
  getAll,
  getById,
  login,  
  creatTalker,  
  authMiddleware,
  nameVerifyMiddleware,
  ageVerifyMiddleware,
  talkVerifyMiddleware,
  rateVerifyMiddleware,
  watchedAtVerifyMiddleware,
};