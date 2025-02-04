import {
  IGetLoginRepository,
  ILogin,
  ILoginAuthorized,
} from "@/interfaces/login";
import connection from "@/database/connectionKnex";

export class MySqlLoginRepository implements IGetLoginRepository {
  async getLogin(params: ILogin): Promise<ILoginAuthorized> {
    try {
      const login = await connection
        .select("id", "name","first_access")
        .table("users")
        .where({ email: params.email })
        .andWhere({ password: params.password });

      return login[0];
    } catch (error) {
      throw new Error("Login not done.");
    }
  }
}