import { IdGenerator } from "@/generators/idGenerator";
import { badRequest, created, serverError } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { ICreateProductRepository, IProduct } from "@/interfaces/product";
import { FormatedDatas } from "@/utils/FormatedDatas";

export class CreateSingleProductController implements IController{
    constructor(private readonly createProductRepository: ICreateProductRepository){}

    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<IProduct | string>> {
        try {
            if (!httpRequest.body) {
                return badRequest(`Please specify a body`)
            }
            const dataProduct = httpRequest.body
    
            const formatedDatas = FormatedDatas.formatedDatasToProduct(dataProduct)
    
            const idProduct = await IdGenerator.generator()
    
            formatedDatas.id_product = idProduct
    
            const product = await this.createProductRepository.createProduct(formatedDatas)
    
            return created<IProduct>(product)
            
        } catch (error) {
            return serverError()
        }
    }

}