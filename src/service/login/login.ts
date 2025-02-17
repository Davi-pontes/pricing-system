import { Auth } from "@/auth/auth";
import { IGetLoginRepository, ILogin, ILoginService } from "@/interfaces/login";
import { MySqlUpdateUserRepository } from "@/repository/user/update-user";
import { Hash } from "@/utils/hash";
import { UpdateUserService } from "../user/update-user";
import { ValidationError } from "@/global/errors/validationError";
import { UnauthorizedError } from "./errors/unuathorizedUserError";

export class LoginService implements ILoginService {
  constructor(
    private readonly getLoginRepository: IGetLoginRepository,
    private readonly updateUserService: UpdateUserService
  ) {}

  async loginService(dataForLogin: ILogin): Promise<any> {
    try {
      dataForLogin.password = Hash.create(dataForLogin.password);

      const getLogin = await this.getLoginRepository.getLogin(dataForLogin);

      if (!getLogin) {
        throw new ValidationError("Login ou senha incorreto.");
      }
      if(getLogin && getLogin.active === 0){
        throw new UnauthorizedError('Unauthorized user.')
      }
      const token = Auth.create(getLogin);

      const firstAccess = !getLogin.first_access;

      await this.updateUserService.updateLastAccessUser(getLogin.id);

      if (firstAccess) {
        await this.updateUserService.updateFirstAccessUser(getLogin.id);
      }

      const datasUser = {
        user: {
          id: getLogin.id,
          name: getLogin.name,
          firstAccess: firstAccess,
        },
        token: token,
      };
      return datasUser;
    } catch (error:unknown) {
      if(error instanceof UnauthorizedError){
        throw new UnauthorizedError('Unauthorized user.')
      }else{
        throw new Error("Method not implemented.");
      }
    }
  }
}
