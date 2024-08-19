import connection from "@/database/connectionKnex";
import { ICategory, IGetCategoryRepository } from "@/interfaces/category";

export class MySqlGetCategoryRepository implements IGetCategoryRepository{
    async getSpecificCategory(id_category: string): Promise<ICategory> {
        const specificCategory = await connection.select('*').table('category').where({id: id_category})

        return specificCategory[0]
    }

    async getCategory(user_id: string): Promise<ICategory[]> {
        const allCategory = await connection.select('*').table('category').where({user_id})

        return allCategory
    }

}