import { ILoginAuthorized } from "@/interfaces/login";
import 'dotenv/config'
import JWT from 'jsonwebtoken'

export class Auth {
    private secret: string
    private informationUser: ILoginAuthorized

    constructor(informationUser: ILoginAuthorized) {
        this.secret = process.env.SECRET || 'testeprocessenv'
        this.informationUser = informationUser
    }

    create(): string {
        try {
            const payload = {
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 8),
                iat: Math.floor(Date.now() / 1000),
                data: this.informationUser
            }
            const token = JWT.sign(payload, this.secret, { algorithm: 'HS256' })

            return token
        } catch (error) {
            throw new Error('Not created token.')
        }
    }

    static validate(token: string): string | JWT.JwtPayload {
        const secret = process.env.SECRET || crypto.randomUUID()
        
        const validate = JWT.verify(token, secret)

        return validate
    }
}