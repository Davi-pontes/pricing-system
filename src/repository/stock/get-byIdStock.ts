import { IGetStockRepository, IStockProduct } from "@/interfaces/stock";
import connection from "@/database/connectionKnex";

export class MySqlGetStockRepository implements IGetStockRepository{
    async getStockProductByIdUser(idUser: string): Promise<IStockProduct[]> {
        try {
            const allProductsWithRegisteredStock = await connection
            .select('product.id_product','product.name','stock.id as id_stock','stock.quantity')
            .table('category')
            .innerJoin('product', 'product.id_category','category.id')
            .innerJoin('stock', 'stock.id_product','product.id_product')
            .where('category.user_id', idUser)

            return allProductsWithRegisteredStock
        } catch (error) {
            console.log(error);
            
            throw new Error("Method not implemented.");
        }
    }
    async getByIdProduct(idProduct: string): Promise<IStockProduct> {
        try {
            const stock = await connection
            .select('id', 'quantity', 'id_product')
            .table('stock')
            .where({id_product: idProduct})

            return stock[0]
        } catch (error) {
            throw new Error("Method not implemented.");
        }
    }
    
    async getById(idStock: number): Promise<IStockProduct> {
        try {
            const stock = await connection
            .select('id', 'quantity', 'id_product')
            .table('stock')
            .where({id: idStock})

            return stock[0]
        } catch (error) {
            throw new Error("Method not implemented.");
        }
    }
}