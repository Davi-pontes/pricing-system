import { IdGenerator } from "@/generators/idGenerator";
import { badRequest, created, serverError } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { ICreateProductRepository, IProduct } from "@/interfaces/product";
import { MySqlCreateProductIngredientRepository } from "@/repository/productIngredient/create-productIngredient";
import { VProduct } from "@/validations/product/product";
import { CreateProductIngredientController } from "../productIngredien/create-productIngredient";

export class CreateProductController implements IController {
    constructor(private readonly createProductRepository: ICreateProductRepository) { }

    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<IProduct | string>> {
        try {
            if (!httpRequest.body) {
                return badRequest(`Please specify a body`)
            }
            const dataProduct = httpRequest.body
            
            const validatePropsProduct = await VProduct.ValidatePropsProduct(dataProduct.productInformation)

            if (!validatePropsProduct.success) {
                return badRequest(`Error in validation`)
            }
            const idProduct = await IdGenerator.generator()

            dataProduct.productInformation.id_product = idProduct

            const product = await this.createProductRepository.createProduct(dataProduct.productInformation)

            const createProductIngredientRepository = new MySqlCreateProductIngredientRepository()

            const createProductIngredientController = new CreateProductIngredientController(createProductIngredientRepository)

            const resultCreateProductIngredientController = await createProductIngredientController.handle(dataProduct.productIngredients, idProduct )

            return created<IProduct>(product)
        } catch (error) {
            return serverError()
        }
    }


}