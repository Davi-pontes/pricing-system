import { badRequest, ok, serverError } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { IUpdateUserParams, IUser } from "@/interfaces/user";
import { MySqlUpdateUserRepository } from "@/repository/user/update-user";
import { ValidationErrorpasswordDivergent } from "@/service/user/error/validationError";
import { UpdateUserService } from "@/service/user/update-user";

export class UpdateUserController implements IController {
  async handle(
    httpRequest: HttpRequest<unknown>
  ): Promise<HttpResponse<unknown>> {
    try {
      if (!httpRequest.params) return badRequest("Specify user id.");

      if (!httpRequest.body) return badRequest("Specify information the user.");

      const idUser = httpRequest.params.idUser;

      const dataUserToUpdate = httpRequest.body;

      const updateUserRepository = new MySqlUpdateUserRepository();

      const updateUserService = new UpdateUserService(updateUserRepository);

      const updatedUser = await updateUserService.updateUser(
        dataUserToUpdate as IUpdateUserParams,
        idUser
      );

      return ok<IUser>(updatedUser);
    } catch (error) {
      if (error instanceof ValidationErrorpasswordDivergent) {
        return badRequest(error.message)
      } else {
        return serverError();
      }
    }
  }
  async deactivateUser(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>{
    try {
      if (!httpRequest.params) return badRequest("Specify user id.");

      const idUser = httpRequest.params.idUser;

      const updateUserRepository = new MySqlUpdateUserRepository();

      const updateUserService = new UpdateUserService(updateUserRepository);

      await updateUserService.updateDeactivateUser(idUser)

      return ok<number>("Usuario desativado com sucesso!")
    } catch (error) {
      return serverError()
    }
  }
  async activateUser(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>{
    try {
      if (!httpRequest.params) return badRequest("Specify user id.");

      const idUser = httpRequest.params.idUser;

      const updateUserRepository = new MySqlUpdateUserRepository();

      const updateUserService = new UpdateUserService(updateUserRepository);

      await updateUserService.updateActivateUser(idUser)

      return ok<number>("Usuario ativado com sucesso!")
    } catch (error) {
      return serverError()
    }
  }
}
