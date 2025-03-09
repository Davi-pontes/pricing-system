import { Auth } from "@/auth/auth";
import { badRequest, ok, serverError, unauthorized } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { MySqlGetUserRepository } from "@/repository/user/get-user";
import { GetUserService } from "@/service/user/get-user";
import type {Request} from "express"
export class AuthController implements IController {
  async handle(
    httpRequest: HttpRequest<unknown>
  ): Promise<HttpResponse<unknown>> {
    try {
      const token =
        httpRequest.cookies?.token ||
        httpRequest.headers.authorization?.split(" ")[1];

      if (!token) {
        return unauthorized();
      }

      const authValidate = Auth.validate(token);

      return ok<string>(authValidate);
    } catch (error: any) {
      error;
      if (error.message && error.message === "invalid token") {
        return unauthorized();
      } else {
        return serverError();
      }
    }
  }
  async userIsAdmin(
    httpRequest: Request
  ): Promise<HttpResponse<unknown>> {
    try {
      const query = httpRequest.query 

      const idUser = query.idUser as string;

      if(!idUser){
        return badRequest('Id user is required.')
      }

      const getUserRepository = new MySqlGetUserRepository();

      const getUserService = new GetUserService(getUserRepository);

      const user = await getUserService.getUserById(idUser);

      if (!user.is_admin) {
        return unauthorized();
      } else {
        return ok<string>(true);
      }
    } catch (error: any) {
      return serverError();
    }
  }
}
