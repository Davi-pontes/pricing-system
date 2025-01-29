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
        await getUserService.validateUserPassword(idUser,dataUserToUpdate.password.oldPassword)
        
        dataUserToUpdate.password = Hash.create(dataUserToUpdate.password?.newPassword)
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
