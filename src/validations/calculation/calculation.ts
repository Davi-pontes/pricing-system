import { IBasesCalculation, ValidationResult } from "@/interfaces/calculate";
import { z } from "zod";

export class VPropsToCalculation {
  static ValidadePropsBasesCalculation(props: IBasesCalculation): any {
    const schemaBasesCalculation = z.object({
      tax: z.number({message: 'Valor invalido.'}),
      fixedCost: z.number({message: 'Valor invalido.'}),
      freigth: z.number({message: 'Valor invalido.'}),
      priceProduct: z.number({message: 'Valor invalido.'}).nonnegative({message: 'Preço de venda não pode ser negativo.'}),
      qtyInBox: z.number({message: 'Valor invalido.'}).min(1,{message: 'Quantidade em caixa não pode ser 0.'}),
      sellingPrice: z.number({message: 'Valor invalido.'}).nonnegative({message: 'Preço de venda não pode ser negativo.'}),
      profitPercentage: z.number({message: 'Valor invalido.'}),
    });

    const validationResult = schemaBasesCalculation.safeParse(props)
    
    if (validationResult.success) {
        return {
          success: true,
          data: validationResult.data,
        };
      } else {
        return {
          success: false,
          error: validationResult.error,
        };
      }
  }
}
