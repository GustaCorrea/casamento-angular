const fs = require('fs');
require('dotenv').config(); // Instale com: npm install dotenv --save-dev

const targetPath = './src/environments/environment.prod.ts';
const targetDevPath = './src/environments/environment.ts';

const envConfigFile = `export const environment = {
  production: true,
  apiUrl: '${process.env.API_URL || "http://localhost:8080/api/"}'
};
`;

const envConfigDevFile = `export const environment = {
  production: false,
  apiUrl: '${process.env.API_URL || "http://localhost:8080/api/"}'
};
`;

// Garante que a pasta existe e escreve os arquivos
fs.writeFileSync(targetPath, envConfigFile);
fs.writeFileSync(targetDevPath, envConfigDevFile);
console.log(`Ambiente Angular gerado com sucesso através do .env no host.`);
