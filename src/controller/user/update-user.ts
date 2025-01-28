import { badRequest, ok, serverError } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { IUpdateUserParams, IUser } from "@/interfaces/user";
import { MySqlUpdateUserRepository } from "@/repository/user/update-user";
import { UpdateUserService } from "@/service/user/update-user";

export class UpdateUserController implements IController {
    async handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>> {
        try {
            if (!httpRequest.params) return badRequest('Specify user id.')

            if (!httpRequest.body) return badRequest('Specify information the user.')

            const idUser = httpRequest.params.idUser

            const dataUserToUpdate = httpRequest.body

            const updateUserRepository = new MySqlUpdateUserRepository()

            const updateUserService = new UpdateUserService(updateUserRepository)

            const updatedUser = await updateUserService.updateUser(dataUserToUpdate as IUpdateUserParams, idUser)

            return ok<IUser>(updatedUser)
        } catch (error) {
            return serverError()
        }
    }

}