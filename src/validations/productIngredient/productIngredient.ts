import { z } from 'zod'
import { ICreateProductIngredientParams } from "@/interfaces/productIngredients";

export class VProductIngredient {

    static async ValidatePropsProductIngredient(params: Array<ICreateProductIngredientParams>): Promise<any> {
        try {
            const productIngredientSchema = z.array(z.object({
                name: z.string({message: "Nome do ingredient é obrigatorio."}).max(150, { message: 'O maximo de caracteres para o nome do ingredient é 150' }),
                weight: z.number({ message: 'Peso do ingrediente é obrigatório.' }),
                unit1: z.enum(['GRAMAS', 'UNIDADE', 'ML'], { message: 'Selecione uma unidade válida.' }),
                quantity: z.number({message: "Quantidade do ingrediente é obrigatório."}),
                price: z.number({ message: 'Preço do ingrediente é obrigatório' }),
                ingredient_cost: z.number({ message: 'Custo do ingrediente é obrigatório.' }),
            }))

            const result = productIngredientSchema.safeParse(params)

            if (result.success) {
                return {
                    success: true,
                    data: result.data
                };
            } else {
                return {
                    success: false,
                    error: result.error
                };
            }

        } catch (error) {
            console.log(error);
            return error

        }
    }
}