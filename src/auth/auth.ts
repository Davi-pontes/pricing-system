import { ILoginAuthorized } from "@/interfaces/login";
import 'dotenv/config';
import JWT from 'jsonwebtoken';

export class Auth {
    private static secret: string = process.env.SECRET || 'testeprocessenv';

    static create(informationUser: ILoginAuthorized): string {
        try {
            const payload = {
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 8), // 8 horas
                iat: Math.floor(Date.now() / 1000),
                data: informationUser
            };
            return JWT.sign(payload, Auth.secret, { algorithm: 'HS256' });
        } catch (error) {
            throw new Error("Falha ao criar token.");
        }
    }

    static validate(token: string): string | JWT.JwtPayload {
        try {
            return JWT.verify(token, Auth.secret);
        } catch (error) {
            throw new Error("Token inválido.");
        }
    }
}
