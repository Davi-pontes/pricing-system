import { z } from 'zod'
import { ICreateProductIngredientParams } from "@/interfaces/productIngredients";

export class VProductIngredient {

    static async ValidatePropsProductIngredient(params: Array<ICreateProductIngredientParams>): Promise<any>{
        try {
            const productIngredientSchema = z.object({
                name: z.string().max(150, {message: 'O maximo de caracteres para o nome é 150'}),
                weight: z.number({message: 'Tipo do weight deve ser number'}),
                unit1: z.string().max(45, {message: 'O maximo de caracteres para unidade é 45'}),
                price: z.number({message: 'Tipo do price deve ser number'}),
                unit2: z.string().max(45,{message: 'O maximo de caracteres para unidade é 45'}),
                ingredient_cost: z.number({message: 'Tipo do price deve ser number'}),
                product_id_product: z.string()
            })
    
            //const productIngredientsArraySchema = z.array(productIngredientSchema);
    
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