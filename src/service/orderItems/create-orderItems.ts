import { ICreateOrderItems, ICreateOrderItemsRepository, ICreateOrderItemsService, IOrderItemsParams } from "@/interfaces/orderItems";
import { MySqlGetStockRepository } from "@/repository/stockProduct/get-stock";
import { MySqlOutPutStockRepository } from "@/repository/stockProduct/output-stock";
import { StockOutPutService } from "../stock/output-stock";
import { MySqlUpdateStockRepository } from "@/repository/stockProduct/update-stock";

export class CreateOrderItemsService implements ICreateOrderItemsService {

    constructor(private readonly createOrderItemsRepository: ICreateOrderItemsRepository) { }

    async createOrderItems(params: ICreateOrderItems[]): Promise<any> {
        const getStockRepository = new MySqlGetStockRepository();

        const outputStockRepository = new MySqlOutPutStockRepository();

        const updateStockRepository = new MySqlUpdateStockRepository();

        const outputService = new StockOutPutService(
            getStockRepository,
            outputStockRepository,
            updateStockRepository
        );
        for (let item of params) {
            await outputService.addOutput(item)

            await this.createOrderItemsRepository.createOrderItems(
                { quantity: item.quantity, id_product: item.id_product, id_order: item.id_order }
            )
        }

        return ''
    }

}