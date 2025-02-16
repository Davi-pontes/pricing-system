import { IProductIngredient } from "@/interfaces/productIngredients";

export class CalculatorCostOfAnIngredient{
    static calculate(ingredient: any){
        return ingredient.quantity * ingredient.price / ingredient.weight
    }
}