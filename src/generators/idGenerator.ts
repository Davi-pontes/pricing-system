import shortid from 'shortid'

export class IdGenerator{
    static generator(): string{
        const newId = shortid.generate()

        return newId
    }
}