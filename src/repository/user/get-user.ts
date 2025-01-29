import connection from "@/database/connectionKnex";
import { IGetUserRepository, IUser } from "@/interfaces/user";

export class MySqlGetUserRepository implements IGetUserRepository {
  async getUser(): Promise<IUser[]> {
    try {
      const user = await connection
        .select("id", "name", "phone_number", "email", "is_admin")
        .table("users");

      return user;
    } catch (error) {
      throw new Error("Not possible get user.");
    }
  }

  async getUserById(id_User: string): Promise<IUser> {
    try {
      const user = await connection
        .select("id", "name", "phone_number", "email", "is_admin")
        .table("users")
        .where({ id: id_User });

      return user[0];
    } catch (error) {
      console.log(error);
      
      throw new Error("Not possible get user.");
    }
  }
  async getUserPassword(idUser: string): Promise<{id: string; password: string}> {
    try {
        const user = await connection
        .select("id", "password")
        .table("users")
        .where("id", idUser)

        return user[0]
      } catch (error) {
        throw new Error('Not possible get user.')
    }
  }
}
