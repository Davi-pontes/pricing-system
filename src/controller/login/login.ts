import { badRequest, forbidden, ok, serverError, unauthorized } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { ILogin } from "@/interfaces/login";
import { MySqlLoginRepository } from "@/repository/login/login";
import { MySqlUpdateUserRepository } from "@/repository/user/update-user";
import { UnauthorizedError } from "@/service/login/errors/unuathorizedUserError";
import { LoginService } from "@/service/login/login";
import { UpdateUserService } from "@/service/user/update-user";

export class LoginController implements IController {
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    try {
      if (!httpRequest.body) return badRequest("Informe o email e a senha.");

      const mysqlLoginRepository = new MySqlLoginRepository();

      const mySqlUpdateUserRepository = new MySqlUpdateUserRepository();

      const updateUserService = new UpdateUserService(
        mySqlUpdateUserRepository
      );

      const loginController = new LoginService(
        mysqlLoginRepository,
        updateUserService
      );

      const datasUser = await loginController.loginService(httpRequest.body);

      return ok<ILogin>(datasUser);
    } catch (error:unknown) {
      if(error instanceof UnauthorizedError){
        return forbidden('Seu usuario está desativado.')
      }else{
        return serverError();
      }
    }
  }
}
