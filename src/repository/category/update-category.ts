import connection from "@/database/connectionKnex";
import { IUpdateCategoryParams, IUpdateCategoryRepository } from "@/interfaces/category";

export class MySqlUpdateCategoryRepository implements IUpdateCategoryRepository{
    async updateCategory(id_category: string, params: IUpdateCategoryParams): Promise<number> {
        try {
            const updateDataBase = await connection.update(params).table('category').where({ id:id_category })

            return updateDataBase
        } catch (error) {
            throw new Error("Category not updated.");    
        }
    }
    
}