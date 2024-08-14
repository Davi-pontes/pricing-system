import { z } from 'zod'

export class VCategory{
    static async ValidatePropsCategory(params: object): Promise<any>{
        const categorySchema = z.object({
            name: z.string({message: 'Name é necessario ser uma string'}).max(150, {message: 'O maximo de caracteres é 150'}),
            user_id: z.string({message: 'Necessario enviar o id do usuario.'})
        })

        const result = categorySchema.safeParse(params)

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
    }
}