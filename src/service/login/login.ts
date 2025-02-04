import { Auth } from "@/auth/auth";
import { IGetLoginRepository, ILogin, ILoginService } from "@/interfaces/login";
import { Hash } from "@/utils/hash";

export class LoginService implements ILoginService {
    constructor(private readonly getLoginRepository: IGetLoginRepository) { }

    async loginService(dataForLogin: ILogin): Promise<any> {
        try {
            dataForLogin.password = Hash.create(dataForLogin.password)

            const getLogin = await this.getLoginRepository.getLogin(dataForLogin)

            if (!getLogin) {
                throw new Error("Method not implemented.");
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
            return datasUser
        } catch (error) {
            throw new Error("Method not implemented.");
        }
    }

}