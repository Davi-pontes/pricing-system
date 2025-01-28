import { IUpdateUserParams, IUpdateUserService, IUser } from "@/interfaces/user";
import { MySqlGetUserRepository } from "@/repository/user/get-user";
import { MySqlUpdateUserRepository } from "@/repository/user/update-user";
import { GetUserService } from "./get-user";
import { Hash } from "@/utils/hash";

export class UpdateUserService implements IUpdateUserService {
    constructor(private readonly mySqlUpdateUserRepository: MySqlUpdateUserRepository) { }

    async updateUser(dataUserToUpdate: IUpdateUserParams, idUser: string): Promise<IUser> {
        try {
            await this.mySqlUpdateUserRepository.updateUser(dataUserToUpdate, idUser)

            if (dataUserToUpdate.password) dataUserToUpdate.password = Hash.create(dataUserToUpdate.password)

            const getUserRepository = new MySqlGetUserRepository()

            const getUserService = new GetUserService(getUserRepository)

            const updatedUser = await getUserService.getUserById(idUser)

            return updatedUser
        } catch (error) {
            throw new Error("Not update user.");
        }
    }

}