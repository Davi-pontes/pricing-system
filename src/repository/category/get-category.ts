import connection from "@/database/connectionKnex";
import { ICategory, IGetCategoryRepository } from "@/interfaces/category";

export class MySqlGetCategoryRepository implements IGetCategoryRepository{

    async getCategory(): Promise<ICategory[]> {
        const allCategory = await connection.select('*').table('category')

        return allCategory
    }

}