import connection from "@/database/connectionKnex";
import {IGetUserRepository, IUser, } from "@/interfaces/user";

export class MySqlGetUserRepository implements IGetUserRepository{
    
    async getUserById(id_User: string): Promise<IUser> {
        const user = await connection.select('*').table('users').where({id: id_User})

        return user[0]
    }

}