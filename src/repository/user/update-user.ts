import { IUpdateUserParams, IUpdateUserRepository } from "@/interfaces/user";
import connection from "@/database/connectionKnex";

export class MySqlUpdateUserRepository implements IUpdateUserRepository {
    async updateUser(dataUserToUpdate: IUpdateUserParams, idUser: string): Promise<number> {
        try {
            const result = await connection
                .update(dataUserToUpdate)
                .table('users')
                .where('id', idUser)

            return result
        } catch (error) {
            throw new Error("Not update user.");
        }
    }

}