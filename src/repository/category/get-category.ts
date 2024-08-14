import connection from "@/database/connectionKnex";
import { ICategory, IGetCategoryRepository } from "@/interfaces/category";

export class MySqlGetCategoryRepository implements IGetCategoryRepository{

    async getCategory(user_id: string): Promise<ICategory[]> {
        const allCategory = await connection.select('*').table('category').where({user_id})

        return allCategory
    }

}