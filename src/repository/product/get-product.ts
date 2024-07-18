import connection from "@/database/connectionKnex";
import { IGetProductRepository, IProduct } from "@/interfaces/product";

export class MySqlGetProductRepository implements IGetProductRepository {
   async getProduct(): Promise<IProduct[]> {
      const allProduct = await connection.select('*').table('product')

      return allProduct
   }

   async getProductById(id_product: string): Promise<IProduct> {
      const Product = await connection.select('*').table('product').where({ id_product })

      return Product[0]
   }

   async getProductByIdCategory(id_category: string): Promise<IProduct[]> {
      const Product = await connection.select('*').table('product').where({ id_category })

      return Product
   }

   async getProductJoker():  Promise<IProduct[] | null>{
      const Product = await connection.select('*').table('product').where({ is_joker: 1 })

      return Product
   }

}