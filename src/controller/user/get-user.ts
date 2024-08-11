import { serverError } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { IGetUserRepository, IUser } from "@/interfaces/user";

export class GetUserController implements IController{
    constructor(private readonly getUserRepository: IGetUserRepository){}

    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
        throw new Error("Method not implemented.");
    }

    async getUserById(id_user:string): Promise<IUser | any>{
        try {
            const user = await this.getUserRepository.getUserById(id_user)

            return user
        } catch (error) {
            return error
        }
    }

}