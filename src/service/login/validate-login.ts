import { Auth } from "@/auth/auth";
import { IValidateTokenService } from "@/interfaces/login";
import type { JwtPayload } from "jsonwebtoken";

export class ValidateLoginService implements IValidateTokenService {
    validateToken(token: string): string | JwtPayload {
        const tokenFormated = token.replace('Bearer ', '')

        const validate = Auth.validate(tokenFormated)

        return validate
    }

}