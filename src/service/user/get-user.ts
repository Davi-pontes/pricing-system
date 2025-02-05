import { IGetUserRepository, IGetUserService, IUser } from "@/interfaces/user";
import { ValidationErrorpasswordDivergent } from "./error/validationError";
import { Hash } from "@/utils/hash";
import { FormatePropsUser } from "@/utils/formateUser";

export class GetUserService implements IGetUserService {
  constructor(private readonly getUserRepository: IGetUserRepository) {}

  async getAllUser(): Promise<IUser[]> {
    try {
      const allUsers = await this.getUserRepository.getUser();
      
      const dataFormated = FormatePropsUser.formatPropertiesForGetUser(allUsers)
      
      return dataFormated;
    } catch (error) {
      throw new Error("Not possible get user.");
    }
  }
  async getUserById(idUser: string): Promise<IUser> {
    try {
      const user = await this.getUserRepository.getUserById(idUser);

      return user;
    } catch (error) {
      throw new Error("Not possible get user.");
    }
  }
  async validateUserPassword(idUser: string, oldPassword: string) {
    try {
      const result = await this.getUserRepository.getUserPassword(
        idUser,
      );

      const validatePassword = Hash.validate(oldPassword, result.password);

      if (!validatePassword) {
        throw new ValidationErrorpasswordDivergent("Password divergente.");
      }

      return true;
    } catch (error: unknown) {
      if (error instanceof ValidationErrorpasswordDivergent) {
        throw new ValidationErrorpasswordDivergent("Password divergente.");
      } else {
        throw new Error("Not possible get user.");
      }
    }
  }
}
