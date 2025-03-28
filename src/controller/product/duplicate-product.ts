import { ok, serverError } from "@/helper/helper";
import { GetProductController } from "./get-product";
import { MySqlGetProductRepository } from "@/repository/product/get-product";
import { IProduct } from "@/interfaces/product";
import { MySqlGetProductIngredientRepository } from "@/repository/productIngredient/get-ingredient";
import { GetProductIngredientByIdController } from "../productIngredien/get-productIngredient";
import { IProductIngredient } from "@/interfaces/productIngredients";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { MySqlCreateProductRepository } from "@/repository/product/create-product";
import { CreateProductController } from "./create-product";

export class DuplicateProductController implements IController {
    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
        try {

            const idProduct = httpRequest.params.id

            const productToDuplicate = await this.assembleProduct(idProduct)

            const productIngredientToDuplicate = await this.assembleProductIngredient(idProduct)

            if (typeof productToDuplicate !== 'string') {
                productToDuplicate.name = productToDuplicate.name + '(copia)'
            }

            let productWithoutId

            if (typeof productIngredientToDuplicate !== 'string') {
                productWithoutId = productIngredientToDuplicate.map(({ id, ...ingredients }) => ingredients)
            }

            const dataToDuplicate = {
                productInformation: productToDuplicate,
                productIngredients: productWithoutId
            }

            const mySqlCreateProductRepository = new MySqlCreateProductRepository()

            const createNewProduct = new CreateProductController(mySqlCreateProductRepository)

            const {body} = await createNewProduct.handle({
                body: dataToDuplicate
            })

            return ok<any>(body)

        } catch (error) {
            return serverError()
        }
    }

    private async assembleProduct(idProduct: string): Promise<IProduct | string> {
        const mySqlGetProductRepository = new MySqlGetProductRepository()

        const getProductController = new GetProductController(mySqlGetProductRepository)

        const { body } = await getProductController.getProductById(idProduct)

        return body
    }

    private async assembleProductIngredient(idProduct: string): Promise<IProductIngredient[] | string> {
        const mySqlGetProductIngredientRepository = new MySqlGetProductIngredientRepository()

        const getProductIngredientController = new GetProductIngredientByIdController(mySqlGetProductIngredientRepository)

        const { body } = await getProductIngredientController.handle({
            params: { id: idProduct }
        })

        return body
    }
}