import { ok, serverError } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import {  HttpResponse } from "@/interfaces/http";
import { IGetUserRepository, IUser } from "@/interfaces/user";

export class GetUserController implements IController{
    constructor(private readonly getUserRepository: IGetUserRepository){}

    async handle(): Promise<HttpResponse<any>> {
        try {
            const allUsers = await this.getUserRepository.getUser()

            return ok<IUser>(allUsers)
        } catch (error) {
            return serverError()
        }
    }

    async getUserById(id_user:string): Promise<IUser | any>{
        try {
            const user = await this.getUserRepository.getUserById(id_user)

            return ok<IUser>(user)
        } catch (error) {
            return serverError()
        }
    }

}