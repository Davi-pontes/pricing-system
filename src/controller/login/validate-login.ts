import { ok, serverError, unauthorized } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { ValidateLoginService } from "@/service/login/validate-login";

export class ValidateLoginController implements IController {
    async handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>> {
        try {
            const authorization = httpRequest.cookies.token

            if (!authorization) return unauthorized()

            const validateToken = new ValidateLoginService()

            const result = validateToken.validateToken(authorization)

            return ok<string>(result)
        } catch (error: any) {
            if (error.message && error.message === 'invalid token') {
                return unauthorized()
            } else {
                return serverError()
            }
        }
    }

}