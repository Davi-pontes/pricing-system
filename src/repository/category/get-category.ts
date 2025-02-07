import connection from "@/database/connectionKnex";
import { ICategory, IGetCategoryRepository } from "@/interfaces/category";

export class MySqlGetCategoryRepository implements IGetCategoryRepository{
    async getSpecificCategory(id_category: string): Promise<ICategory> {
        const specificCategory = await connection.select('*').table('category').where({id: id_category})

        return specificCategory[0]
    }

    async getCategory(user_id: string): Promise<ICategory[]> {
        const specificCategory = await connection
        .select("c.id", "c.name", "c.user_id")
        .count("p.name as product_count") // Adicionando alias
        .from("category as c")
        .leftJoin("product as p", "c.id", "p.id_category")
        .where("c.user_id", user_id)
        .groupBy("c.id", "c.name", "c.user_id"); // Agrupar pela categoria

    return specificCategory;
    }

}