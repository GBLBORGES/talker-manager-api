const fs = require('fs/promises');

const talkerDataBasePath = './talker.json';

const readFile = async () => {
const buffer = await fs.readFile(talkerDataBasePath);
const allTalkers = JSON.parse(buffer);
return allTalkers;
};

const writeFile = async (objTalker) => {   
  const stringData = JSON.stringify(objTalker);
  fs.writeFile(talkerDataBasePath, stringData);   
};

module.exports = {
  readFile,
  writeFile,
};