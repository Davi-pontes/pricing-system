import { IProduct } from "@/interfaces/product";
import { IProductIngredient } from "@/interfaces/productIngredients";

export class Calculate {
    private datasProduct: IProduct;
    private ingredientPreviousProduct: IProductIngredient;
    private currentPrice: number;
    private ingredientCost:number

    constructor(datasProduct: IProduct, ingredientPreviousProduct: IProductIngredient, currentPrice: number) {
        this.datasProduct = datasProduct;
        this.ingredientPreviousProduct = ingredientPreviousProduct;
        this.currentPrice = currentPrice
        this.ingredientCost = 0
    }
    updateAllNumbersProductAndIngredients() {
        this.ingredientCost= this.calculateIngredientCost()
        this.datasProduct.cost_of_all_ingredients = this.calculatecostOfAllIngredients(this.datasProduct,this.ingredientPreviousProduct)
        this.datasProduct.fixed_cost = this.calculateCostFixed(this.datasProduct)
        this.datasProduct.profit = this.calculateProfit(this.datasProduct)
        this.datasProduct.revenue_cost = this.calculateFinalRevenuePrice(this.datasProduct)
        this.datasProduct.price_per_unit = this.calculatePricePerUnit(this.datasProduct)

        return { datasProduct: this.datasProduct, currentPrice: this.currentPrice, updatedIngredientCost: this.ingredientCost }
    }
    private calculateIngredientCost(): number{
        const totalCost = (this.currentPrice / this.ingredientPreviousProduct.weight) * this.ingredientPreviousProduct.quantity

        return parseFloat(totalCost.toFixed(2))
    }
    private calculatecostOfAllIngredients(datasProduct: IProduct,ingredientPreviousProduct: IProductIngredient): number {
        const renyLessIngredientPreviousProduct = datasProduct.cost_of_all_ingredients - ingredientPreviousProduct.ingredient_cost

        const morecurrentPrice = renyLessIngredientPreviousProduct + this.ingredientCost

        return parseFloat(morecurrentPrice.toFixed(2))
    }
    private calculateCostFixed(datasProduct: IProduct): number {
        const costFixed = datasProduct.cost_of_all_ingredients * datasProduct.operacional_cost / 100

        return parseFloat(costFixed.toFixed(2))
    }
    private calculateProfit(datasProduct: IProduct): number {
        const profit = (datasProduct.cost_of_all_ingredients + datasProduct.fixed_cost) * datasProduct.profit_percentage / 100

        return parseFloat(profit.toFixed(2))
    }
    private calculateFinalRevenuePrice(datasProduct: IProduct): number {
        const finalRevenuePrice = datasProduct.cost_of_all_ingredients + datasProduct.fixed_cost

        return parseFloat(finalRevenuePrice.toFixed(2))
    }
    private calculatePricePerUnit(datasProduct: IProduct): number {
        const preicePerUnit = datasProduct.revenue_cost / datasProduct.income

        return parseFloat(preicePerUnit.toFixed(2))
    }
}