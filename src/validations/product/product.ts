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
  ): Promise<any> {
    const productSchema = z.object({
      name: z
        .string({ message: "Nome do produto é obrigatório." })
        .max(150, { message: "O máximo de caracteres para o produto é 150." }),
      income: z.number({ message: "Rendimento é obrigatório." }).min(1,{message: "O minimo para o rendimeto é 1."}),
      description: z.string().max(150,{message: 'Descrição muito longa.'}).optional(),
      recipe_time: z.number({ message: "Tempo de receita é obrigatório." }),
      profit_percentage: z.number({
        message: "Porcentagem de lucro é obrigatório.",
      }),
      revenue_cost: z.number({ message: "Custo da receita é obrigatório." }),
      fixed_cost: z.number({ message: "Custo fixo é obrigatório" }),
      labor: z.number({ message: "Mão de obra é obrigatório." }),
      profit: z.number({ message: "Lucro é obrigatório." }),
      final_recipe_price: z.number({
        message: "Preço final de venda é obrigatório",
      }),
      price_per_unit: z.number({
        message: "Preço da unidade é obrigatório.",
      }),
      cost_of_all_ingredients:z.number({message: "Custo do igrediente é obrigatorio."}),
      id_category: z.string({message: 'Id category é obrigatório'})
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
