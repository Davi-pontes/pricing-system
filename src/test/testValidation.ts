import { randomBytes } from 'crypto';

// Função para gerar uma chave secreta
function generateSecretKey(length: number = 32): string {
    return randomBytes(length).toString('hex');
}

// Exemplo de uso
const secretKey = generateSecretKey(32); // Gera uma chave secreta de 32 bytes
console.log('Generated Secret Key:', secretKey);
