import { randomBytes } from 'crypto';

function generateSecretKey(length: number = 32): string {
    return randomBytes(length).toString('hex');
}

const secretKey = generateSecretKey(32);
console.log('Generated Secret Key:', secretKey);
