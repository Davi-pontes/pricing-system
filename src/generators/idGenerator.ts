import shortid from 'shortid'

export class IdGenerator{
    static async generator(){
        const newId = shortid.generate()

        return newId
    }
}