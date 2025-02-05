import connection from "@/database/connectionKnex";
import { IGetUserRepository, IUser } from "@/interfaces/user";

export class MySqlGetUserRepository implements IGetUserRepository {
  async getUser(): Promise<any> {
    try {
      const user = await connection
        .select("u.id", "u.name", "u.phone_number", "u.email", "u.is_admin","u.first_access","u.last_access","u.active").count("p.name as product_count")
        .from("users as u")
        .leftJoin("category as c", "u.id", "c.user_id")
        .leftJoin("product as p", "c.id", "p.id_category")
        .groupBy("u.id");

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
