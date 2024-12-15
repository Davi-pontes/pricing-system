import {
  ICreateProductParams,
  ISingleProduct,
  IValidatePropsOnlyProduct,
  IValidatePropsProduct,
} from "@/interfaces/product";
import { z } from "zod";

export class VProduct {
  static async ValidatePropsProduct(
    params: ICreateProductParams
  ): Promise<IValidatePropsProduct> {
    const productSchema = z.object({
      name: z
        .string({ message: "Name é necessario ser uma string" })
        .max(150, { message: "O maximo de caracteres é 150" }),
      income: z.number({ message: "Tipo de dado income errado" }),
      recipe_time: z.number({ message: "Tipo de dado recipe_time errado" }),
      profit_percentage: z.number({
        message: "Tipo de dado profit_percentage errado",
      }),
      revenue_cost: z.number({ message: "Tipo de dado revenue_cost errado" }),
      fixed_cost: z.number({ message: "Tipo de dado fixed_cost errado" }),
      labor: z.number({ message: "Tipo de dado labor errado" }),
      profit: z.number({ message: "Tipo de dado profit errado" }),
      final_recipe_price: z.number({
        message: "Tipo de dado final_recipe_price errado",
      }),
      price_per_unit: z.number({
        message: "Tipo de dado price_per_unit errado",
      }),
    });

    const result = productSchema.safeParse(params);

    if (result.success) {
      return {
        success: true,
        data: result.data,
      };
    } else {
      return {
        success: false,
        error: result.error,
      };
    }
  }

  static ValidatePropsSetOnlyProduct(params: ISingleProduct): IValidatePropsOnlyProduct {
    const productOnlySchema = z.object({
      nameProduct: z.string().min(1, "Nome não pode está vazio"),
      priceProduct: z.number().gt(0, "Preço do produto não pode ser 0"),
    });

    const result = productOnlySchema.safeParse(params);

    if (result.success) {
      return {
        success: true,
        data: params,
      };
    } else {
      return {
        success: false,
        error: result.error,
      };
    }
  }
}
