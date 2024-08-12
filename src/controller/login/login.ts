import { Auth } from "@/auth/auth";
import { ok, serverError, unauthorized } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { IGetLogin, ILogin } from "@/interfaces/login";
import { Hash } from "@/utils/hash";

export class LoginController implements IController {
    constructor(private readonly mysqlLoginRepository: IGetLogin) { }
    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
        try {
            const dataForLogin = httpRequest.body

            dataForLogin.password = Hash.create(dataForLogin.password)

            const getLogin = await this.mysqlLoginRepository.getLogin(dataForLogin)

            if (!getLogin) {
                return unauthorized()
            }

            const createToken = new Auth(getLogin)

            const token = createToken.create()

            const datasUser = {
                user: {
                    id: getLogin.id,
                    name: getLogin.name
                },
                token: token
            }

            return ok<ILogin>(datasUser)

        } catch (error) {
            return serverError()
        }
    }

}