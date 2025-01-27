import { Auth } from "@/auth/auth";
import { ok, serverError, unauthorized } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";

export class AuthController implements IController {
    async handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>> {
        try {
            const token = httpRequest.cookies?.token || httpRequest.headers.authorization?.split(' ')[1];

            if (!token) {
                return unauthorized()
            }

            const authValidate = Auth.validate(token)

            return ok<string>(authValidate)
        } catch (error: any) {
            if (error.message && error.message === 'invalid token') {
                return unauthorized()
            } else {
                return serverError()
            }
        }
    }

}