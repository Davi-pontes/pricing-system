import{ICreateUserParams, ICreateUserRepository, IUser} from '@/interfaces/user'
import connection from "@/database/connectionKnex";

export class MySqlCreateUserRepository implements ICreateUserRepository{
    async createUser(params: ICreateUserParams): Promise<number> {
        try {
            const createdUser = await connection.insert(params).table('users')

            return createdUser[0]
        } catch (error) {
            throw new Error("User not created")
        }
    }

}