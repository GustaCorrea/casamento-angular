const fs = require('fs');
require('dotenv').config();

const dirPath = './src/environments';
const targetPath = `${dirPath}/environment.prod.ts`;
const targetDevPath = `${dirPath}/environment.ts`;

// --- CORREÇÃO: Garante que a árvore de pastas 'src/environments' exista antes de criar os arquivos ---
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
  console.log(`Pasta criada com sucesso em: ${dirPath}`);
}

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

// Escreve os arquivos com segurança
fs.writeFileSync(targetPath, envConfigFile);
fs.writeFileSync(targetDevPath, envConfigDevFile);

console.log(`Ambiente Angular gerado com sucesso através do .env no host.`);
