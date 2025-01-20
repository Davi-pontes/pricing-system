import { IGetStockProductService, IGetStockRepository, IStockProduct } from "@/interfaces/stock";
import { MySqlGetStockRepository } from "@/repository/stock/get-byIdStock";
import { CustomDateUtils } from "@/utils/date";

export class GetStockProductService implements IGetStockProductService{
    constructor (private readonly getStockRepository: IGetStockRepository){}

    async getStockProductByIdUser(idUser: string): Promise<IStockProduct[]> {
        try {
            const allStockProduct = await this.getStockRepository.getStockProductByIdUser(idUser)
            
            const formatEveryDayForAllOrders = allStockProduct.map((it) => {
                  return {
                    ...it,
                    updated_at: CustomDateUtils.formatToTableFrontEnd(it.updated_at),
                  };
                });
            return formatEveryDayForAllOrders
        } catch (error) {
            throw new Error("Not get stock product.")
        }
    }
}