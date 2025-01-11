import { ICreateOrderItems, ICreateOrderItemsRepository, ICreateOrderItemsService } from "@/interfaces/orderItems";
import { MySqlUpdateStockRepository } from "@/repository/productIngredient/update-stock";
import { MySqlGetStockRepository } from "@/repository/stock/get-byIdStock";
import { MySqlOutPutStockRepository } from "@/repository/stock/output-stock";
import { StockOutPutService } from "../stock/output-stock";

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

            const createdOrderItems = await this.createOrderItemsRepository.createOrderItems(item)
            
        }

        return ''
    }

}