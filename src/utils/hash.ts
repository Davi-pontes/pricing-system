import { createHash } from 'crypto'

export class Hash{
    static create(password: string){
        return createHash('sha256').update(password).digest('hex')
    }
    static validate(password: string, hashedPassword: string): boolean {
        return this.create(password) === hashedPassword
    }
}

// const t = Hash.create('Davi8693')

// console.log(t);
