import { badRequest, ok, serverError } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { IUser } from "@/interfaces/user";
import { MySqlCreateUserRepository } from "@/repository/user/create-user";
import { CreateUserService } from "@/service/user/create-user";

export class CreateUserController implements IController {
    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<IUser | string>> {
        try {
            if (!httpRequest.body) {
                return badRequest('Please specify a body')
            }
            let dataForCreateUser = httpRequest.body

            const createUserRepository = new MySqlCreateUserRepository()

            const createUserService = new CreateUserService(createUserRepository)

            const userCreated = await createUserService.createUser(dataForCreateUser)

            return ok<IUser>(userCreated)

        } catch (error) {
            return serverError()
        }
    }
}