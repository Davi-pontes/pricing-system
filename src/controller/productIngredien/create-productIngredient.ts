import { ICreateProductController, ICreateProductIngredientParams, ICreateProductIngredientRepository, IProductIngredient } from "@/interfaces/productIngredients";
import { VProductIngredient } from "@/validations/productIngredient/productIngredient";

export class CreateProductIngredientController implements ICreateProductController{
    constructor(private readonly createProductIngredientRepository: ICreateProductIngredientRepository) {}
    
    async handle(params: Array<ICreateProductIngredientParams>, id_product:string): Promise<IProductIngredient> {
        try {
            if (!params) {
                throw new Error('Please specify the params')
            }
            const dataProductIngredient = params

            //const validatePropsProducrIngredient = await VProductIngredient.ValidatePropsProductIngredient(dataProductIngredient)

            // if(!validatePropsProducrIngredient.success){
            //     throw new Error('Error in validation')
            // }
            const enrichedParams = params.map(param => ({ ...param, id_product: id_product }));
            
            const productsIngrents = await this.createProductIngredientRepository.createProductIngredient(enrichedParams)

            return  productsIngrents
        } catch (error) {
            throw new Error('Not created ProductIngredient')
        }
    }

}