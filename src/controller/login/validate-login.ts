import { Auth } from "@/auth/auth";
import { ok, serverError, unauthorized } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";

export class ValidateLoginController implements IController {
    async handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>> {
        try {
            const authorization = httpRequest.headers.authorization

            const token = authorization.replace('Bearer ', '')

            const validate = Auth.validate(token)

            return ok<string>(validate)
        } catch (error: any) {
            if (error.message && error.message === 'invalid token') {
                return unauthorized()
            } else {
                return serverError()
            }
        }
    }

}