import { badRequest, ok, serverError, unauthorized } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { ILogin } from "@/interfaces/login";
import { MySqlLoginRepository } from "@/repository/login/login";
import { LoginService } from "@/service/login/login";

export class LoginController implements IController {

    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
        try {
            if (!httpRequest.body) return badRequest('Informe o email e a senha.')

            const mysqlLoginRepository = new MySqlLoginRepository()

            const loginController = new LoginService(mysqlLoginRepository)

            const datasUser = await loginController.loginService(httpRequest.body)

            return ok<ILogin>(datasUser)
        } catch (error) {
            return serverError()
        }
    }

}