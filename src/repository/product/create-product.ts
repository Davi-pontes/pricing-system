import { ICreateProductRepository, IProduct } from "@/interfaces/product";
import connection from "@/database/connectionKnex";

export class MySqlCreateProductRepository implements ICreateProductRepository {
    async createProduct(params: IProduct): Promise<IProduct> {
        try {
            await connection.insert(params).table('product')

            const product = await connection.select('*').table('product').where({id_product: params.id_product})

            if(!product){
                throw new Error('product not created')
            }
            return product[0]

        } catch (error) {
            console.log(error)
            throw new Error("Product not created")
        }

    }
}