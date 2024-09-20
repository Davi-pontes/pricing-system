import connection from "@/database/connectionKnex";
import { ICategory, IDeleteCategoryRepository } from "@/interfaces/category";

export class MySqlDeleteCategoryRepository implements IDeleteCategoryRepository{
    async deleteCategory(id_category: string): Promise<number> {
        try {
            const categoryDeleted = await connection('category').where({ id:id_category }).del()
            return categoryDeleted
        } catch (error) {
            throw new Error("Method not implemented.");
        }
    }

}