import { IProduct } from "@/interfaces/product";
import { BaseCalculator } from "./baseCalculator";
import { IProductIngredient } from "@/interfaces/productIngredients";
import { IPricingProductWithIngredientCalculator } from "@/interfaces/calculate";

export class PricingProductWithIngredientService {
constructor (
    private readonly basesCalculation: any,
    private readonly calculator: IPricingProductWithIngredientCalculator
) {}
}
