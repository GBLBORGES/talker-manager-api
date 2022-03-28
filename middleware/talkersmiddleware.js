const authMiddleware = (request, response, next) => {     
  const { authorization } = request.headers;      
  if (!authorization) {
    return response.status(401).json({ message: 'Token não encontrado' });
  } if (authorization.length !== 16) {
      return response.status(401).json({ message: 'Token inválido' });
  }     
  next();     
};

const nameVerifyMiddleware = (request, response, next) => {  
  const { name } = request.body;    
  if (!name || name === '') {
   return response.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return response.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  } next(); 
};
const ageVerifyMiddleware = (request, response, next) => {  
  const { age } = request.body;  
    if (!age || age.length < 1) {
   return response.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (+age < 18) {
    return response.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  } next();  
};

const talkVerifyMiddleware = (request, response, next) => {  
const { talk } = request.body;   
if (!talk || talk === '' || !talk.watchedAt || talk.rate === undefined) {    
  return response.status(400)
  .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
}  
next();   
};

const rateVerifyMiddleware = (request, response, next) => {
const { talk } = request.body;  
if (talk.rate === null) {
  return response.status(400)
  .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
} 
if (!Number.isInteger(talk.rate) || talk.rate > 5 || talk.rate < 1) {    
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

module.exports = {
  nameVerifyMiddleware,
  ageVerifyMiddleware,
  talkVerifyMiddleware,
  rateVerifyMiddleware,
  watchedAtVerifyMiddleware,
  authMiddleware,
};