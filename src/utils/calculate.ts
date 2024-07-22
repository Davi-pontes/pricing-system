import { IProduct } from "@/interfaces/product";
import { IProductIngredient } from "@/interfaces/productIngredients";

export class Calculate {
    private datasProduct: IProduct;
    private ingredientPreviousProduct: IProductIngredient;
    private currentProductIngredient: IProductIngredient;

    constructor(datasProduct: IProduct, ingredientPreviousProduct: IProductIngredient, currentProductIngredient: IProductIngredient) {
        this.datasProduct = datasProduct;
        this.ingredientPreviousProduct = ingredientPreviousProduct;
        this.currentProductIngredient = currentProductIngredient
    }
    updateAllNumbersProductAndIngredients() {
        this.currentProductIngredient.ingredient_cost = this.calculateIngredientCost(this.currentProductIngredient)
        this.datasProduct.cost_of_all_ingredients = this.calculatecostOfAllIngredients(this.currentProductIngredient, this.datasProduct,this.ingredientPreviousProduct)
        this.datasProduct.fixed_cost = this.calculateCostFixed(this.datasProduct)
        this.datasProduct.profit = this.calculateProfit(this.datasProduct)
        this.datasProduct.revenue_cost = this.calculateFinalRevenuePrice(this.datasProduct)
        this.datasProduct.price_per_unit = this.calculatePricePerUnit(this.datasProduct)

        return { datasProduct: this.datasProduct, currentProductIngredient: this.currentProductIngredient }
    }
    private calculateIngredientCost(currentProductIngredient: IProductIngredient,): number{
        const totalCost = (currentProductIngredient.price / currentProductIngredient.weight) * currentProductIngredient.quantity

        return parseFloat(totalCost.toFixed(2))
    }
    private calculatecostOfAllIngredients(currentProductIngredient: IProductIngredient,datasProduct: IProduct,ingredientPreviousProduct: IProductIngredient): number {
        const renyLessIngredientPreviousProduct = datasProduct.cost_of_all_ingredients - ingredientPreviousProduct.ingredient_cost

        const moreCurrentProductIngredient = renyLessIngredientPreviousProduct + currentProductIngredient.ingredient_cost

        return parseFloat(moreCurrentProductIngredient.toFixed(2))
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
        const finalRevenuePrice = datasProduct.cost_of_all_ingredients + datasProduct.fixed_cost + datasProduct.profit

        return parseFloat(finalRevenuePrice.toFixed(2))
    }
    private calculatePricePerUnit(datasProduct: IProduct): number {
        const preicePerUnit = datasProduct.revenue_cost / datasProduct.income

        return parseFloat(preicePerUnit.toFixed(2))
    }
}