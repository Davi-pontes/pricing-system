import connection from "@/database/connectionKnex";
import {
  IUpdateCategoryParams,
  IUpdateCategoryRepository,
} from "@/interfaces/category";

export class MySqlUpdateCategoryRepository
  implements IUpdateCategoryRepository
{
  async updateCategory(
    idCategory: string,
    params: IUpdateCategoryParams
  ): Promise<number> {
    try {
      const updateDataBase = await connection
        .update({
          ...params,
          updated_at: connection.fn.now(),
        })
        .table("category")
        .where("id", idCategory);

      return updateDataBase;
    } catch (error) {
      throw new Error("Category not updated.");
    }
  }
}
