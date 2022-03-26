 const passwordVerify = (password) => {  
  try {      
    if (!password || password === '') {
      return { message: 'O campo "password" é obrigatório' };
    } if (password.length < 6) {
      return { message: 'O "password" deve ter pelo menos 6 caracteres' };
    } return password;
  } catch (err) {
    console.error(`erro na senha: ${err}`);
  }
}; 
 // validate regex tirado de https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript 
const loginVerify = (email, password) => {  
  try {    
    const validateRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email || email === '') {
      return { message: 'O campo "email" é obrigatório' };   
    } if (!email.match(validateRegex)) {
      return { message: 'O "email" deve ter o formato "email@email.com"' };
    } return passwordVerify(password);    
  } catch (err) {
    console.log(`erro no login ${err}`);
  }
  };  

module.exports = loginVerify;