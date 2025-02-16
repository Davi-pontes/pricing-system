import connection from "@/database/connectionKnex";
import { IProduct, IUpdateProductParams, IUpdateProductRepository } from "@/interfaces/product";

export class MySqlUpdateProductRepository implements IUpdateProductRepository {
    async updateProduct(id_product: string, params: IUpdateProductParams): Promise<IProduct> {
        try {
            await connection.update(params).table('product').where({ id_product })

            const product = await connection.select('*').table('product').where({ id_product })

            return product[0]
        } catch (error) {
            throw new Error('Product not update')
        }
    }
}