import {
  IUpdateUserParams,
  IUpdateUserService,
  IUser,
} from "@/interfaces/user";
import { MySqlGetUserRepository } from "@/repository/user/get-user";
import { MySqlUpdateUserRepository } from "@/repository/user/update-user";
import { GetUserService } from "./get-user";
import { Hash } from "@/utils/hash";
import { ValidationErrorpasswordDivergent } from "./error/validationError";

export class UpdateUserService implements IUpdateUserService {
  constructor(
    private readonly mySqlUpdateUserRepository: MySqlUpdateUserRepository
  ) {}

  async updateUser(
    dataUserToUpdate: IUpdateUserParams,
    idUser: string
  ): Promise<IUser> {
    try {
      const getUserRepository = new MySqlGetUserRepository();

      const getUserService = new GetUserService(getUserRepository);

      if (dataUserToUpdate.password) {
        //const passwordWithHash = Hash.create(dataUserToUpdate.password.oldPassword);
        
        await getUserService.validateUserPassword(dataUserToUpdate.password.oldPassword, idUser)
        
        dataUserToUpdate.password = dataUserToUpdate.password?.newPassword
      }

      await this.mySqlUpdateUserRepository.updateUser(dataUserToUpdate, idUser);

      const updatedUser = await getUserService.getUserById(idUser);

      return updatedUser;
    } catch (error: unknown) {
      if (error instanceof ValidationErrorpasswordDivergent) {
        throw new ValidationErrorpasswordDivergent("Senha atual não está correta.");
      } else {
        throw new Error("Not possible get user.");
      }
    }
  }
}
