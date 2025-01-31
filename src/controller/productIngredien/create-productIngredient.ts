import { ICreateProductController, ICreateProductIngredientParams, ICreateProductIngredientRepository, IProductIngredient } from "@/interfaces/productIngredients";
import { VProductIngredient } from "@/validations/productIngredient/productIngredient";
import { ValidationErrorProductIngredient } from "./errors/validationError";

export class CreateProductIngredientController implements ICreateProductController{
    constructor(private readonly createProductIngredientRepository: ICreateProductIngredientRepository) {}
    
    async handle(params: Array<ICreateProductIngredientParams>): Promise<IProductIngredient> {
        try {
            if (!params) {
                throw new Error('Please specify the params')
            }
            const dataProductIngredient = params

            const validatePropsProducrIngredient = await VProductIngredient.ValidatePropsProductIngredient(dataProductIngredient)

            if(!validatePropsProducrIngredient.success){
                throw new ValidationErrorProductIngredient(validatePropsProducrIngredient.error.issues[0].message)
            }
            
            const productsIngrents = await this.createProductIngredientRepository.createProductIngredient(params)

            return  productsIngrents
        } catch (error: unknown) {
            if(error instanceof ValidationErrorProductIngredient){
                throw new ValidationErrorProductIngredient(error.message)
            }
            throw new Error('Not created ProductIngredient')
        }
    }

}