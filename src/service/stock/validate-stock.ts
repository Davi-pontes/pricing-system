import { IOrderItemsParams } from "@/interfaces/orderItems";
import { IGetStockRepository } from "@/interfaces/stock";
import { InsufficientStockError } from "./errors/insufficientStockError";

export class ValidateStock {
    constructor(private readonly getStockRepository: IGetStockRepository) { }

    async validateStock(orderItems: IOrderItemsParams[]): Promise<any> {
        try {
            const approvedOrderItems = []
            for (let item of orderItems) {
                const productInStock = await this.getStockRepository.getByIdProduct(item.id_product)

                if (!productInStock || productInStock.quantity < item.quantity) {
                    throw new InsufficientStockError(`Insufficient stock for product ${item.id_product}`);
                }
                approvedOrderItems.push({ ...item, id_stock:productInStock.id })
            }
            return approvedOrderItems
        } catch (error) {
            throw new InsufficientStockError("Insufficient stock for output");
        }
    }
}