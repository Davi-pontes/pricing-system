import connection from "@/database/connectionKnex";
import { IDeleteProductRepository, IProduct } from "@/interfaces/product";

export class MySqlDeleteProductRepository implements IDeleteProductRepository{
    async deleteProduct(id_product: string): Promise<IProduct> {
        try {
            const product = await connection.select('*').table('product').where({ id_product })

            await connection('product').where({ id_product }).del()

            return product[0]
            
        } catch (error) {
            throw new Error('Product not deleted')
        }
    }
    
}