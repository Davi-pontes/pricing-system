import { badRequest, ok, serverError } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { ICreateUserRepository, IUser } from "@/interfaces/user";
import { IdGenerator } from "@/generators/idGenerator";
import { MySqlGetUserRepository } from "@/repository/user/get-user";
import { GetUserController } from "./get-user";
import { Hash } from "@/utils/hash";

export class CreateUserController implements IController {
    constructor(private readonly createUserRespository: ICreateUserRepository) { }

    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<IUser | string>> {
        try {
            if (!httpRequest.body) {
                return badRequest('Please specify a body')
            }
            let dataForCreateUser = httpRequest.body

            dataForCreateUser.id = await IdGenerator.generator()

            dataForCreateUser.password = Hash.create(dataForCreateUser.password)

            let userCreated = await this.createUserRespository.createUser(dataForCreateUser)

            const getUserRepository = new MySqlGetUserRepository()

            const getUserController = new GetUserController(getUserRepository)

            userCreated = await getUserController.getUserById(dataForCreateUser.id)

            return ok<IUser>(userCreated)

        } catch (error) {
            console.log(error);
            
            return serverError()
        }
    }
}