import { IGetProductRepository } from "@/interfaces/product";
import { CalculateAverage } from "../calculation/calculation-averageProfit";
import { IDashboard, IDashboardService } from "@/interfaces/dashboard";

export class DashboardService implements IDashboardService{
    constructor(
        private readonly getProductRepository: IGetProductRepository
    ){}

    async assembleDatasToDashboard(idUser: string): Promise<IDashboard>{
        try {
            const allProduct = await this.getProductRepository.getProduct(idUser)
    
            const countAllProduct = allProduct.length
    
            const averageProfit = CalculateAverage.calculateAverageProductProfit(allProduct)
    
            return {averageProfit,totalProduct:countAllProduct}
        } catch (error) {
            throw new Error('Not possible assemble data to dashboard.')
        }
    }
}