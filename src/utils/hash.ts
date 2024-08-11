import { createHash } from 'crypto'

export class Hash{
    static create(password: string){
        return createHash('sha256').update(password).digest('hex')
    }
}