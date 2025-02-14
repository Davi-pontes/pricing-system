import { ZodError } from "zod";
import { ICreateProductParams } from "./product";
import { ICreateProductIngredientParams } from "./productIngredients";

export interface IBasesCalculation {
  tax: number;
  fixedCost: number;
  freigth: number;
  priceProduct: number;
  qtyInBox: number;
  sellingPrice: number;
  profitPercentage: number;
}
interface IBasesCalculationProductWithIngredientParams {
  income: number;
  recipe_time: number;
  profit_percentage: number;
  labor: number;
  operacional_cost: number;
  cost_of_all_ingredients: number;
}
export interface IBasesCalculationProductWithIngredient {
  productInformation: IBasesCalculationProductWithIngredientParams;
  productIngredients: Array<ICreateProductIngredientParams>;
}
export interface ICalculationResultProductWithIngredient {
  fixed_cost: number;
  revenue_cost: number;
  profit: number;
  final_recipe_price: number;
  price_per_unit: number;
  cost_of_all_ingredients: number;
}
export interface ICalculationResult {
  costProduct: number;
  pricePerUnit: number;
  priceWithProfit: number;
  profit: number;
  profitPercentage: number;
}

export interface IPricingCalculator {
  getTotalCost(data: any): number;
  getPricePerUnit(costProduct: number, qtyInBox: number): number;
  getPricePerUnitWithProfit(
    costProduct: number,
    profit: number,
    qtyInBox: number
  ): number;
  getProfit(costProduct: number, profitPercentage: number): number;
  getProfitPercentage(costProduct: number, sellingPrice: number): number;
}
export interface IPricingProductWithIngredientCalculator {
  getTotalCostAllIngredients(data: any): number;
  getCostFixed(costAllIngredient: number, operationalCost: number): number;
  getPricePerUnit(cost: number, qtyInBox: number): number;
  getRevenueCost(costAllIngredient: number, fixedCost: number): number;
  getFinalRevenuePrice(profit: number, revenueCost: number): number;
  getProfit(cost: number, profitPercentage: number): number;
  getProfitPercentage(cost: number, sellingPrice: number): number;
}

export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; error: ZodError };
