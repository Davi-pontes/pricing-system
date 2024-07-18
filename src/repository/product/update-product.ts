import connection from "@/database/connectionKnex";
import { IProduct, IUpdateProductParams, IUpdateProductRepository } from "@/interfaces/product";

export class MySqlUpdateProductRepository implements IUpdateProductRepository{
    async updateProduct(id_product: string, params: IUpdateProductParams): Promise<IProduct> {
        try {
            const updateDataBase = await connection.update(params).table('product').where({id_product})

            if(updateDataBase === 0){
                throw new Error('Product not update')
            }

            const product = await connection.select('*').table('product').where({id_product})

            if(!product){
                throw new Error('Product not update')
            }
            return product[0]
        } catch (error) {
            throw new Error('Product not update')
        }
    }


}