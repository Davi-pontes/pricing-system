import { IGrossProfitMarginCalculator } from "@/interfaces/calculate";
import { IProduct } from "@/interfaces/product";

export class GrossProfitMarginCalculator implements IGrossProfitMarginCalculator {
    grossProfitMargin(calculationBasis: IProduct) {
        const profitMargin = calculationBasis.profit / calculationBasis.revenue_cost
        return profitMargin
    }
}