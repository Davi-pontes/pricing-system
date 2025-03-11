import { IProduct } from "./product"

export interface IDashboard {
    averageProfit: number
    totalProduct: number
    productsWithHiguerProfit: Array<IProduct>
}

export interface IDashboardService {
    assembleDatasToDashboard(idUser: string): Promise<IDashboard>
}