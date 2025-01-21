import { ok, serverError } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import { HttpResponse } from "@/interfaces/http";
import { IUser } from "@/interfaces/user";
import { MySqlGetUserRepository } from "@/repository/user/get-user";
import { GetUserService } from "@/service/user/get-user";

export class GetUserController implements IController {
    async handle(): Promise<HttpResponse<any>> {
        try {
            const getUserRepository = new MySqlGetUserRepository()

            const getUserService = new GetUserService(getUserRepository)

            const allUsers = await getUserService.getAllUser()

            return ok<IUser>(allUsers)
        } catch (error) {
            return serverError()
        }
    }

    async getUserById(idUser: string): Promise<HttpResponse<IUser[] | string>> {
        try {
            const getUserRepository = new MySqlGetUserRepository()

            const getUserService = new GetUserService(getUserRepository)

            const user = await getUserService.getUserById(idUser)

            return ok<IUser[]>(user)
        } catch (error) {
            return serverError()
        }
    }

}