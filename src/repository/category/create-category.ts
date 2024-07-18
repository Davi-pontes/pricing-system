import connection from "@/database/connectionKnex";
import { ICategory, ICreateCategoryRepository } from "@/interfaces/category";

export class MySqlCreateCategoryRepository implements ICreateCategoryRepository{
    async createCategory(params: ICategory): Promise<ICategory> {
        try {
            await connection.insert(params).table('category')

            const category = await connection.select('*').table('category').where({id: params.id})

            if(!category){
                throw new Error('Category not created.')
            }
            return category[0]
            
        } catch (error) {
           throw new Error("Category not created.") 
        }
    }

}