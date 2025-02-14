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
export interface IBasesCalculationProductWithIngredient {
  productInformation: ICreateProductParams;
  productIngredients: Array<ICreateProductIngredientParams>;
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
  getRevenueCost(
    costAllIngredient: number,
    fixedCost: number,
  ): number;
  getFinalRevenuePrice(profit: number, revenueCost: number): number;
  getProfit(cost: number, profitPercentage: number): number;
  getProfitPercentage(cost: number, sellingPrice: number): number;
}

export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; error: ZodError };
