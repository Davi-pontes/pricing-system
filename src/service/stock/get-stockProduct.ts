import { IGetStockProductService, IGetStockRepository, IStockProduct } from "@/interfaces/stock";
import { MySqlGetStockRepository } from "@/repository/stock/get-byIdStock";

export class GetStockProductService implements IGetStockProductService{
    constructor (private readonly getStockRepository: IGetStockRepository){}

    async getStockProductByIdUser(idUser: string): Promise<IStockProduct[]> {
        try {
            const allStockProduct = await this.getStockRepository.getStockProductByIdUser(idUser)

            return allStockProduct
        } catch (error) {
            throw new Error("Not get stock product.")
        }
    }
}

// const repository = new MySqlGetStockRepository()

// const service = new GetStockProductService(repository)

// service.getStockProductByIdUser('8oZ_9G8At')