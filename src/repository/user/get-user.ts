import connection from "@/database/connectionKnex";
import {IGetUserRepository, IUser, } from "@/interfaces/user";

export class MySqlGetUserRepository implements IGetUserRepository{
    async getUser(): Promise<IUser[]> {
        const user = await connection.select('id','name','phone_number', 'email','is_admin').table('users')

        return user
    }
    
    async getUserById(id_User: string): Promise<IUser> {
        const user = await connection.select('id','name','phone_number', 'email','is_admin').table('users').where({id: id_User})

        return user[0]
    }

}