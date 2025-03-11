import { IGetProductRepository, IProduct } from "@/interfaces/product";
import { CalculateAverage } from "../calculation/calculation-averageProfit";
import { IDashboard, IDashboardService } from "@/interfaces/dashboard";

export class DashboardService implements IDashboardService {
    constructor(
        private readonly getProductRepository: IGetProductRepository
    ) { }

    async assembleDatasToDashboard(idUser: string): Promise<IDashboard> {
        try {
            const allProducts = await this.getProductRepository.getProduct(idUser)

            const allProductsCopy = [...allProducts]

            const threeProductsWithHiguerProfit = this.getThreeProductsWithHiguerProfit(allProductsCopy)

            const countAllProducts = allProducts.length

            const averageProfit = CalculateAverage.calculateAverageProductProfit(allProducts)

            return { averageProfit, totalProduct: countAllProducts, productsWithHiguerProfit: threeProductsWithHiguerProfit }
        } catch (error) {
            throw new Error('Not possible assemble data to dashboard.')
        }
    }
    private getThreeProductsWithHiguerProfit(allProducts: Array<IProduct>): Array<IProduct> {
        try {
            const threeHighestValues: Array<IProduct> = allProducts.sort((a, b) => b.profit - a.profit).slice(0, 3)

            return threeHighestValues
        } catch (error) {
            throw new Error('Not possible assemble data to dashboard.')
        }
    }
}