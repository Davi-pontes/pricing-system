import { ok, serverError, unauthorized } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { IGetLogin, ILogin } from "@/interfaces/login";
import { Hash } from "@/utils/hash";

export class LoginController implements IController{
    constructor(private readonly mysqlLoginRepository: IGetLogin){}
    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
        try {
            const dataForLogin = httpRequest.body

            dataForLogin.password = Hash.create(dataForLogin.password)

            const getLogin = await this.mysqlLoginRepository.getLogin(dataForLogin)

            if(!getLogin){
                return unauthorized()
            }

            return ok<ILogin>(getLogin)
            
        } catch (error) {
            return serverError()
        }
        throw new Error("Method not implemented.");
    }

}